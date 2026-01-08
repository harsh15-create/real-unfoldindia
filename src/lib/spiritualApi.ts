
export interface SpiritualMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    theme_color: string;
    subtitle: string;
    intro_title: string;
    intro_description: string;
    cities: SpiritualCitySummary[];
}

export interface SpiritualCitySummary {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail_image: string;
    short_description: string;
}
export interface Temple {
    name: string;
    description: string;
}

export interface SpiritualCityDetail {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    spiritual_significance: string;
    major_temples_and_sites: Temple[];
    rituals_and_experiences: string[];
    highlights: string[];
    local_guides_available: boolean;
    best_months: string;
    how_to_reach: string;
    stay_recommendations: string;
    safety_tips: string;
    sample_itinerary: string;
    tags: string[];
    is_bookable: boolean;
}

// Glob imports for localized data
const masterModules = import.meta.glob('../data/en/spiritual-journeys/experience-spiritual-journeys.json');
const cityModules = import.meta.glob('../data/en/spiritual-journeys/*.json');

export const getSpiritualMaster = async (): Promise<SpiritualMaster | null> => {
    const path = `../data/en/spiritual-journeys/experience-spiritual-journeys.json`;
    const loader = masterModules[path];

    if (!loader) {
        console.error(`Spiritual master data not found`);
        return null;
    }

    try {
        const mod: any = await loader();
        const data = mod.default;

        return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            hero_image: data.hero_image,
            theme_color: data.theme_color,
            intro_title: data.intro_block.intro_title,
            subtitle: "Discover the Soul of India",
            intro_description: data.intro_block.intro_paragraph,
            cities: data.cities
        };
    } catch (error) {
        console.error("Error loading spiritual master data:", error);
        return null;
    }
};

export const getSpiritualDetail = async (slug: string): Promise<SpiritualCityDetail | null> => {
    const path = `../data/en/spiritual-journeys/${slug}.json`;
    const loader = cityModules[path];

    if (!loader) return null;

    try {
        const mod: any = await loader();
        return mod.default;
    } catch (error) {
        console.error(`Error loading spiritual city detail for ${slug}:`, error);
        return null;
    }
};
