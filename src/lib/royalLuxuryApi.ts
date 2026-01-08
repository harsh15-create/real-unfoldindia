
// Types
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

const masterDataModules = import.meta.glob('../data/en/royal-luxury/experience-royal-luxury.json');
const cityModules = import.meta.glob('../data/en/royal-luxury/cities/*.json');
const propertyModules = import.meta.glob('../data/en/royal-luxury/properties/*.json');

export const getMasterData = async (): Promise<MasterData | null> => {
    const path = `../data/en/royal-luxury/experience-royal-luxury.json`;
    const loader = masterDataModules[path];

    if (!loader) {
        console.error(`Royal Luxury Master Data not found`);
        return null;
    }

    try {
        const mod: any = await loader();
        return mod.default;
    } catch (e) {
        console.error(`Error loading Royal Luxury Master Data`, e);
        return null;
    }
};

export const getCityData = async (slug: string): Promise<CityData | null> => {
    const path = `../data/en/royal-luxury/cities/royal-city-${slug}.json`;
    const loader = cityModules[path];

    if (!loader) {
        console.error(`City data not found: ${slug}`);
        return null;
    }

    try {
        const data: any = await loader();
        return data.default;
    } catch (error) {
        console.error(`Failed to load city data for ${slug}`, error);
        return null;
    }
};

export const getPropertyData = async (slug: string): Promise<PropertyData | null> => {
    const path = `../data/en/royal-luxury/properties/royal-property-${slug}.json`;
    const loader = propertyModules[path];

    if (!loader) {
        console.error(`Property data not found: ${slug}`);
        return null;
    }

    try {
        const data: any = await loader();
        return data.default;
    } catch (error) {
        console.error(`Failed to load property data for ${slug}`, error);
        return null;
    }
};
