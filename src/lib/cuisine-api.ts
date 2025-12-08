
import cultureCuisine from '../data/culture-cuisine.json';

export interface CuisineCategory {
    id: string;
    title: string;
}

export interface CuisineCard {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail: string;
    short_description: string;
    tags: string[];
    order: number;
}

export interface CuisineMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    intro_title: string;
    intro_description: string;
    categories: CuisineCategory[];
    cards: CuisineCard[];
    seo_title: string;
    seo_description: string;
    total_count: number;
    last_updated: string;
}

export interface Dish {
    name: string;
    short_description: string;
    best_place_to_try: string;
    serving_style: string;
    approx_price: {
        currency: string;
        from: number | null;
        to: number | null;
        price_type: "exact" | "estimated";
        source_url: string | null;
        last_checked: string | null;
    };
}

export interface Restaurant {
    name: string;
    location: string;
    notes: string;
    price_range: string;
    booking_url: string | null;
}

export interface Market {
    name: string;
    location: string;
    what_to_try: string;
    how_to_reach: string;
}

export interface Workshop {
    title: string;
    provider_placeholder: string;
    duration: string;
    price_estimate: string;
}

export interface PlaceToEat {
    place_id: string;
    title: string;
    summary: string;
    best_where_to_eat: string;
    how_to_reach: string;
    is_bookable: boolean;
    related_experience_slugs: string[];
}

export interface CuisineDetail {
    id: string;
    slug: string;
    title: string;
    alt_titles: string[];
    origin_state_or_region: string;
    hero_image: string;
    hero_image_alt: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    signature_dishes: Dish[];
    top_restaurants: Restaurant[];
    best_markets_and_streets: Market[];
    recommended_home_cook_experiences_or_workshops: Workshop[];
    street_food_highlights: string[];
    festival_foods: string[];
    best_months_to_visit_for_food: string;
    vegetarian_friendly: boolean;
    common_allergens: string[];
    recommended_precautions_for_travellers: string;
    avg_meal_cost_range: {
        currency: string;
        from: number | null;
        to: number | null;
        price_type: "exact" | "estimated";
        last_checked: string | null;
    };
    how_to_order_guidelines: string;
    tipping_guidelines: string;
    cultural_significance: string;
    dining_etiquette: string;
    top_places_to_experience: PlaceToEat[];
    suggested_itineraries: string[];
    media_and_references: {
        notable_chefs_and_restaurants: { name: string; notes: string }[];
        canonical_references: any[];
        video_refs: any[];
    };
    tags: string[];
    seo_title: string;
    seo_description: string;
    json_ld_template: any;
    last_updated: string;
    is_live: boolean;
}

export async function getCuisineMaster(): Promise<CuisineMaster> {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cultureCuisine as CuisineMaster);
        }, 100);
    });
}

export async function getCuisine(slug: string): Promise<CuisineDetail | null> {
    try {
        const cuisineData = await import(`../data/cuisines/${slug}.json`);
        return cuisineData.default as CuisineDetail;
    } catch (e) {
        console.error(`Error loading cuisine data for slug: ${slug}`, e);
        return null;
    }
}
