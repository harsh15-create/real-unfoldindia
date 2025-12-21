import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { getExplorationProgress, checkAndUnlockBadges, trackExplorationEvent } from '@/lib/exploration';
import { supabase } from '@/lib/supabaseClient';

interface ExplorationContextType {
    progress: {
        totalCitiesExplored: number;
        exploredCityIds: string[];
        rawScores: Record<string, number>;
        regionProgress: Record<string, number>;
        totalAppCities: number;
        regionTotals: Record<string, number>;
    } | null;
    badges: string[];
    loading: boolean;
    refreshProgress: () => Promise<void>;
    trackEvent: (entityType: 'city' | 'state' | 'region', entityId: string, signalType: 'view' | 'save' | 'trip' | 'route' | 'ai') => Promise<void>;
}

const ExplorationContext = createContext<ExplorationContextType | undefined>(undefined);

export function ExplorationProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [progress, setProgress] = useState<ExplorationContextType['progress']>(null);
    const [badges, setBadges] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProgress = async () => {
        if (!user) return;

        const stats = await getExplorationProgress(user.id);
        if (stats) {
            setProgress(stats);
            // Check for badges whenever we refresh progress
            await checkAndUnlockBadges(user.id, stats);
            fetchBadges();
        }
        setLoading(false);
    };

    const fetchBadges = async () => {
        if (!user) return;
        const { data } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', user.id);

        if (data) {
            setBadges(data.map(b => b.badge_id));
        }
    };

    useEffect(() => {
        if (user) {
            fetchProgress();
        } else {
            setProgress(null);
            setBadges([]);
            setLoading(false);
        }
    }, [user]);

    const trackEvent = async (
        entityType: 'city' | 'state' | 'region',
        entityId: string,
        signalType: 'view' | 'save' | 'trip' | 'route' | 'ai'
    ) => {
        if (!user) return;

        await trackExplorationEvent(user.id, entityType, entityId, signalType);
        // Optimistically update or just refresh
        // For now, let's refresh to be accurate
        await fetchProgress();
    };

    return (
        <ExplorationContext.Provider value={{ progress, badges, loading, refreshProgress: fetchProgress, trackEvent }}>
            {children}
        </ExplorationContext.Provider>
    );
}

export const useExploration = () => {
    const context = useContext(ExplorationContext);
    if (context === undefined) {
        throw new Error('useExploration must be used within an ExplorationProvider');
    }
    return context;
};
