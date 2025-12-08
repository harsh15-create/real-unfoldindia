
import { useState, useEffect } from 'react';

export interface FestivalMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    intro_title: string;
    intro_description: string;
    seo_title: string;
    seo_description: string;
    last_updated: string;
    cards: FestivalCardData[];
    order: string[];
}

export interface FestivalCardData {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail: string;
    short_description: string;
}

export interface FestivalDetail {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    hero_image_alt: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    significance: string;
    key_rituals: string[];
    calendar: {
        typical_month: string;
        lunar_reference: string;
        festival_length: string;
        next_dates: Record<string, string>;
    };
    top_places: {
        place_id: string;
        title: string;
        summary: string;
        best_to_experience: string;
        how_to_reach: string;
        is_bookable: boolean;
    }[];
    practical_info: {
        dress_tips: string;
        safety_tips: string;
        accessibility_notes: string;
        avg_daily_costs: string;
    };
    faqs: {
        q: string;
        a: string;
    }[];
    tags: string[];
    seo_title: string;
    seo_description: string;
    last_updated: string;
    is_live: boolean;
    json_ld_template: any;
}

// Map cache to simulate SWR
const cache: Record<string, any> = {};

export async function getFestivalsMaster(): Promise<FestivalMaster> {
    if (cache['master']) return cache['master'];

    // Dynamic import for Vite
    const data = await import('../data/culture-festivals.json');
    cache['master'] = data.default || data;
    return cache['master'];
}

export async function getFestival(slug: string): Promise<FestivalDetail | null> {
    if (cache[slug]) return cache[slug];

    try {
        // Vite glob import to find the specific file
        const modules = import.meta.glob('../data/festivals/*.json');
        const path = `../data/festivals/${slug}.json`;

        if (modules[path]) {
            const mod: any = await modules[path]();
            const data = mod.default || mod;
            cache[slug] = data;
            return data;
        }
    } catch (error) {
        console.error(`Failed to load festival: ${slug}`, error);
    }
    return null;
}
