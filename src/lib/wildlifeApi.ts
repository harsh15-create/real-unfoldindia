
export interface WildlifeMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    theme_color: string;
    subtitle: string;
    intro_title: string;
    intro_description: string;
    parks: WildlifeParkSummary[];
}

export interface WildlifeParkSummary {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail_image: string;
    short_description: string;
    category: string;
}

export interface WildlifeParkDetail extends WildlifeParkSummary {
    hero_image: string;
    long_desc: string;
    // parks field removed as it does not exist in detail
}

export interface EntryFee {
    category: string;
    price: number;
    currency: string;
    notes: string;
}

export interface TicketOption {
    type: string;
    price_from: number;
    price_to: number;
    currency: string;
    booking_method: string;
}

export interface WildlifeParkDetail {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    wildlife_significance: string;
    species_to_see: string[];
    habitat_types: string[];
    safari_types: string[];
    major_experiences: string[];
    guides_and_tips: string;
    how_to_reach: string;
    accommodation_recommendations: string[];
    permits_and_fees: string;
    conservation_notes: string;
    highlights: string[];
    sample_itinerary: string;
    safety_tips: string;
    tags: string[];
    is_bookable: boolean;
    entry_fees: EntryFee[];
    ticket_options: TicketOption[];
    opening_hours: {
        days: string;
        open_time: string;
        close_time: string;
    };
    operating_season: {
        best_months: string;
        peak_months: string;
        off_season: string;
        season_notes: string;
    };
}

// Glob imports for localized data
const masterModules = import.meta.glob('../data/*/wildlife-safaris/experience-wildlife-safaris.json');
const parkModules = import.meta.glob('../data/*/wildlife-safaris/*.json');

export const getWildlifeMaster = async (lang: string = 'en'): Promise<WildlifeMaster | null> => {
    let path = `../data/${lang}/wildlife-safaris/experience-wildlife-safaris.json`;
    let loader = masterModules[path];

    if (!loader && lang !== 'en') {
        // Fallback to English
        path = `../data/en/wildlife-safaris/experience-wildlife-safaris.json`;
        loader = masterModules[path];
    }

    if (!loader) {
        console.error(`Wildlife master data not found for language: ${lang} (and no English fallback)`);
        return null;
    }

    try {
        const mod: any = await loader();
        const data = mod.default;

        // Map JSON structure to our interface if needed, or just return as is if it matches
        // The JSON has `intro_block` and `destinations`.
        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            hero_image: data.hero_image,
            theme_color: data.theme_color,
            intro_title: data.intro_block.intro_title,
            subtitle: "Discover the Wild Heart of India", // Default or extracted
            intro_description: data.intro_block.intro_description,
            parks: data.destinations
        };
    } catch (error) {
        console.error("Error loading wildlife master data:", error);
        return null;
    }
};

export const getWildlifeDetail = async (slug: string, lang: string = 'en'): Promise<WildlifeParkDetail | null> => {
    let path = `../data/${lang}/wildlife-safaris/${slug}.json`;
    let loader = parkModules[path];

    if (!loader && lang !== 'en') {
        path = `../data/en/wildlife-safaris/${slug}.json`;
        loader = parkModules[path];
    }

    if (!loader) return null;

    try {
        const mod: any = await loader();
        return mod.default;
    } catch (error) {
        console.error(`Error loading wildlife park detail for ${slug}:`, error);
        return null;
    }
};
