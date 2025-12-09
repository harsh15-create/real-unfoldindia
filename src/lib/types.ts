
export interface Highlight {
    id: string;
    image: string;
    image_alt: string;
    caption?: string;
    credit?: string | null;
    date_taken?: string | null;
    focal_point?: { x: number; y: number };
    tags?: string[];
}

export interface RegionDetail {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    hero_image_alt?: string;
    subtitle?: string;
    intro: string;
    last_updated?: string;
    is_live: boolean;
    best_time?: {
        peak_season: string;
        shoulder_season: string;
        off_season: string;
        notes: string;
    };
    top_experiences?: {
        id: string;
        title: string;
        summary: string;
        related_slug?: string;
    }[];
    top_cities?: {
        city_id: string;
        title: string;
        summary: string;
        thumbnail: string;
        how_to_reach_snippet: string;
        related_experiences?: string[];
    }[];
    cuisine_highlights?: {
        name: string;
        note: string;
        related_cuisine_slug?: string;
    }[];
    cultural_snapshot?: {
        languages?: string[];
        major_festivals?: string[];
        notable_dance_forms?: string[];
        popular_crafts?: string[];
    };
    travel_tips?: string[];
    sample_itineraries?: Record<string, string>;
    logistics?: {
        major_airports?: string[];
        rail_hubs?: string[];
        typical_internal_transport?: string;
        notes?: string;
    };
    related_experiences?: string[];
    related_culture_slugs?: string[];
    seo_title?: string;
    seo_description?: string;
    json_ld_template?: any;
    cache_hint?: {
        cache_control: string;
    };
    data_confidence?: string;
    highlights: Highlight[];
}
