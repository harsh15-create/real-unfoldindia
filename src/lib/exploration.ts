import { supabase } from './supabaseClient';
import { Database } from '@/types/supabase';

type ExplorationEvent = Database['public']['Tables']['user_exploration_events']['Insert'];

// Weights for different signals
export const SIGNAL_WEIGHTS = {
    view: 2,   // Deep page view
    save: 4,   // Added to wishlist/saved
    trip: 6,   // Added to a trip
    route: 3,  // Included in a route
    ai: 1      // Asked AI about it
};

// Threshold to consider a city "explored"
export const EXPLORED_THRESHOLD = 5;

export const trackExplorationEvent = async (
    userId: string,
    entityType: 'city' | 'state' | 'region',
    entityId: string,
    signalType: keyof typeof SIGNAL_WEIGHTS
) => {
    try {
        const event: ExplorationEvent = {
            user_id: userId,
            entity_type: entityType,
            entity_id: entityId,
            signal_type: signalType,
            weight: SIGNAL_WEIGHTS[signalType]
        };

        const { error } = await supabase
            .from('user_exploration_events')
            .insert(event);

        if (error) throw error;

        // After tracking, check if this triggers any badges or updates progress
        // This could be done here or in the UI after the event
        return true;
    } catch (error) {
        console.error('Error tracking exploration event:', error);
        return false;
    }
};

import { CITY_REGION_MAP, REGION_TOTALS, TOTAL_APP_CITIES } from './regionMapping';

export const getExplorationProgress = async (userId: string) => {
    try {
        const { data: events, error } = await supabase
            .from('user_exploration_events')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;

        // Aggregate scores per city
        const cityScores: Record<string, number> = {};
        const exploredCities: Set<string> = new Set();

        // Region stats
        const regionCounts: Record<string, number> = {
            'North India': 0,
            'South India': 0,
            'East India': 0,
            'West India': 0
        };

        events?.forEach(event => {
            if (event.entity_type === 'city') {
                const currentScore = cityScores[event.entity_id] || 0;
                const newScore = currentScore + event.weight;
                cityScores[event.entity_id] = newScore;

                if (newScore >= EXPLORED_THRESHOLD) {
                    if (!exploredCities.has(event.entity_id)) {
                        exploredCities.add(event.entity_id);

                        // Update region count
                        const region = CITY_REGION_MAP[event.entity_id];
                        if (region && regionCounts[region] !== undefined) {
                            regionCounts[region]++;
                        }
                    }
                }
            }
        });

        const totalCitiesExplored = exploredCities.size;

        return {
            totalCitiesExplored,
            exploredCityIds: Array.from(exploredCities),
            rawScores: cityScores,
            regionProgress: regionCounts,
            totalAppCities: TOTAL_APP_CITIES,
            regionTotals: REGION_TOTALS
        };

    } catch (error) {
        console.error('Error calculating progress:', error);
        return null;
    }
};

export const BADGES = [
    { id: 'first_step', name: 'First Step', description: 'Explored your first city', icon: '🦶' },
    { id: 'explorer', name: 'Explorer', description: 'Explored 5 cities', icon: '🧭' },
    { id: 'pro_traveler', name: 'Pro Traveler', description: 'Explored 20 cities', icon: '🏆' },
    { id: 'planner', name: 'Master Planner', description: 'Created 5 trips', icon: '📅' }
];

export const checkAndUnlockBadges = async (userId: string, progress: any) => {
    const newBadges = [];

    // 1. First Step Badge
    if (progress.totalCitiesExplored >= 1) {
        newBadges.push('first_step');
    }

    // 2. Explorer Badge
    if (progress.totalCitiesExplored >= 5) {
        newBadges.push('explorer');
    }

    // 3. Pro Traveler Badge
    if (progress.totalCitiesExplored >= 20) {
        newBadges.push('pro_traveler');
    }

    // Check which ones are already unlocked
    const { data: existingBadges } = await supabase
        .from('user_badges')
        .select('badge_id')
        .eq('user_id', userId);

    const existingBadgeIds = new Set(existingBadges?.map(b => b.badge_id));

    for (const badgeId of newBadges) {
        if (!existingBadgeIds.has(badgeId)) {
            // Unlock new badge
            await supabase.from('user_badges').insert({
                user_id: userId,
                badge_id: badgeId
            });
            // Could show a toast here
        }
    }
};
