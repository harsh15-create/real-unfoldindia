
import masterData from '@/data/royal-luxury/experience-royal-luxury.json';

// Types (You might want to move these to a types file later)
export interface MasterData {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    intro_title: string;
    intro_description: string;
    cities: CitySummary[];
}

export interface CitySummary {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail_image: string;
    short_description: string;
}

export interface CityData extends CitySummary {
    long_description: string;
    hero_image: string;
    gallery_images: string[];
    properties: PropertySummary[];
    how_to_reach: string;
    best_months: string[];
    tags: string[];
}

export interface PropertySummary {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail_image: string;
    short_description: string;
    source_reference: any[];
}

export interface PropertyData {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    amenities: string[];
    room_types: any[];
    event_spaces: any[];
    opening_hours: any;
    operating_season: any;
    availability_flags: any;
    room_price_from: number;
    price_currency: string;
    packages: any[];
    booking_methods: string[];
    booking_url?: string;
    signature_experiences: string[];
    sample_itineraries: any[];
    dining_options: any[];
    accessibility_info: any;
    heritage_history: string;
    conservation_notes: string;
    contact: any;
    tags: string[];
    highlights: string[];
    pricing_metadata: any;
    source_reference: any[];
}


export const getMasterData = async (): Promise<MasterData> => {
    // In a real API this would be a fetch. Here we just return the imported JSON.
    return masterData;
};

export const getCityData = async (slug: string): Promise<CityData | null> => {
    try {
        const data = await import(`@/data/royal-luxury/cities/royal-city-${slug}.json`);
        return data.default;
    } catch (error) {
        console.error(`Failed to load city data for ${slug}`, error);
        return null;
    }
};

export const getPropertyData = async (slug: string): Promise<PropertyData | null> => {
    try {
        const data = await import(`@/data/royal-luxury/properties/royal-property-${slug}.json`);
        return data.default;
    } catch (error) {
        console.error(`Failed to load property data for ${slug}`, error);
        return null;
    }
};
