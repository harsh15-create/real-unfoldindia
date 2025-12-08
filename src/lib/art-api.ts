
import cultureArtAndCraft from '../data/culture-art-and-craft.json';

export interface ArtCategory {
    id: string;
    title: string;
}

export interface ArtCard {
    id: string;
    slug: string;
    title: string;
    category: string;
    card_subtitle: string;
    thumbnail: string;
    short_description: string;
    tags: string[];
    order: number;
}

export interface ArtMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    intro_title: string;
    intro_description: string;
    categories: ArtCategory[];
    cards: ArtCard[];
    seo_title: string;
    seo_description: string;
    total_count: number;
    last_updated: string;
}

export interface CraftPlace {
    place_id: string;
    title: string;
    summary: string;
    best_time_to_visit: string;
    how_to_reach: string;
    workshop_availability: boolean;
    workshop_contact_placeholder: string | null;
}

export interface CraftWorkshop {
    duration: string;
    typical_price: number;
    booking_info_placeholder: string;
}

export interface CraftVisitorExperiences {
    workshop_options: CraftWorkshop[];
    demonstrations: boolean;
    studio_visits: boolean;
}

export interface CraftPriceRange {
    currency: string;
    from: number | null;
    to: number | null;
    price_type: "exact" | "estimated";
    source_url: string | null;
    last_checked: string;
}

export interface NotableArtisan {
    name: string;
    note: string;
}

export interface MuseumCollection {
    name: string;
    location: string;
    source_url: string | null;
}

export interface CraftDetail {
    id: string;
    slug: string;
    title: string;
    category_id: string;
    alt_titles: string[];
    origin_state_or_region: string;
    hero_image: string;
    hero_image_alt: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    materials_used: string[];
    traditional_methods: string[];
    typical_products: string[];
    motifs_and_meanings: string[];
    major_centres: CraftPlace[];
    visitor_experiences: CraftVisitorExperiences;
    recommended_visit_length: string;
    where_to_buy: string[];
    shipping_and_packaging_tips: string;
    typical_price_range: CraftPriceRange;
    authenticity_tips: string;
    sustainability_notes: string;
    local_economy_note: string;
    notable_artisans: NotableArtisan[];
    museums_collections: MuseumCollection[];
    canonical_references: any[];
    tags: string[];
    seo_title: string;
    seo_description: string;
    json_ld_template: any;
    last_updated: string;
    is_live: boolean;
}

export async function getArtMaster(): Promise<ArtMaster> {
    // Simulate API delay
    // In a real app, this would fetch from an endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cultureArtAndCraft as ArtMaster);
        }, 100);
    });
}

export async function getCraft(slug: string): Promise<CraftDetail | null> {
    try {
        const craftData = await import(`../data/crafts/${slug}.json`);
        return craftData.default as CraftDetail;
    } catch (e) {
        console.error(`Error loading craft data for slug: ${slug}`, e);
        return null;
    }
}
