
// src/lib/adventures-api.ts

// Define strict types matching the JSON schema we created
export interface AdventureActivity {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    locations: AdventureLocation[];
    ticket_options?: TicketOption[];
    opening_hours?: OpeningHour[];
    operating_season?: OperatingSeason;
    difficulty_level: 'Beginner' | 'Intermediate' | 'Advanced' | string;
    safety_guidelines: string[];
    equipment_checklist: string[];
    major_experiences: string[];
    highlights?: string[];
    booking_details?: BookingDetails;
    seo?: SeoMetadata;
    availability_flags?: AvailabilityFlags;
}

export interface AdventureLocation {
    location: string;
    state: string;
    best_months: string;
    price_from: number;
    summary: string;
    difficulty?: string;
}

export interface TicketOption {
    type: string;
    price_from: number;
    price_to: number;
    currency: string;
    price_type: string;
    booking_method: string;
    source_url: string;
    last_checked: string;
}

export interface OpeningHour {
    days: string;
    open_time: string;
    close_time: string;
    time_notes?: string;
    source_url?: string;
}

export interface OperatingSeason {
    best_months: string;
    peak_months: string;
    off_season: string;
    season_notes?: string;
}

export interface BookingDetails {
    booking_methods: string[];
    booking_url: string;
    suggested_stay: string;
    how_to_reach: string;
}

export interface SeoMetadata {
    seo_title: string;
    seo_description: string;
    tags: string[];
}

export interface AvailabilityFlags {
    is_seasonal: boolean;
    requires_permit: boolean;
    is_bookable_online: boolean;
}

export interface AdventureMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    theme_color: string;
    intro_title: string;
    intro_description: string;
    sections?: any[]; // Simplified for master
    activities_list: Array<{
        id: string;
        slug: string;
        title: string;
        card_subtitle: string;
        thumbnail_image: string;
        short_description: string;
        difficulty: string;
        category: 'Air' | 'Water' | 'Land' | 'Snow' | 'Overnight'; // Derived or explicit
    }>;
    seo_title?: string;
    seo_description?: string;
    keywords?: string[];
}

// Map of all activity JSONs using Vite's glob import
const activityModules = import.meta.glob('../data/adventures/*.json');

/**
 * Fetches the master adventures experience data.
 */
export async function getAdventuresMaster(): Promise<AdventureMaster> {
    // Directly import the known master file
    const mod = await import('../data/adventures/experience-adventures.json');
    // Vite loads JSON as default export
    return mod.default as AdventureMaster;
}

/**
 * Fetches a specific adventure activity by slug.
 * Uses lazy loading via Vite's dynamic import.
 */
export async function getAdventureActivity(slug: string): Promise<AdventureActivity | null> {
    const path = `../data/adventures/${slug}.json`;
    const loader = activityModules[path];

    if (!loader) {
        console.error(`Activity not found: ${slug}`);
        return null;
    }

    try {
        const mod: any = await loader();
        return mod.default as AdventureActivity;
    } catch (error) {
        console.error(`Error loading activity ${slug}:`, error);
        return null;
    }
}

/**
 * Helper to get all activities with full details (use sparingly!)
 */
export async function getAllActivities(): Promise<AdventureActivity[]> {
    const activities: AdventureActivity[] = [];
    for (const path in activityModules) {
        if (path.includes('experience-adventures.json')) continue;
        try {
            const loader = activityModules[path];
            const mod: any = await loader();
            activities.push(mod.default);
        } catch (e) {
            console.warn(`Failed to access ${path}`, e);
        }
    }
    return activities;
}
