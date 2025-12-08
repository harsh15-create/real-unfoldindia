
import { useState, useEffect } from 'react';

// Types definition matching the JSON structure
export interface DanceMaster {
    id: string;
    slug: string;
    title: string;
    hero_image: string;
    intro_title: string;
    intro_description: string;
    seo_title: string;
    seo_description: string;
    last_updated: string;
    cards: DanceCardData[];
    order: string[];
}

export interface DanceCardData {
    id: string;
    slug: string;
    title: string;
    card_subtitle: string;
    thumbnail: string;
    short_description: string;
}

export interface DanceDetail {
    id: string;
    slug: string;
    title: string;
    alt_title?: string;
    origin_state: string;
    hero_image: string;
    hero_image_alt: string;
    gallery_images: string[];
    short_description: string;
    long_description: string;
    performance_style: 'classical' | 'folk' | 'tribal' | 'fusion' | 'ritual' | 'semi-classical';
    music_and_instruments: string[];
    costume_and_makeup: string;
    choreography_elements: string[];
    typical_duration: string;
    where_to_watch: string[];
    where_to_learn: string[];
    recommended_experience: 'performance' | 'workshop' | 'ritual';
    key_traditions: string[];
    common_festivals_or_events: string[];
    top_places?: PlaceData[];
    practical_info: {
        audience_tips: string;
        accessibility_notes: string;
        typical_ticket_range?: {
            currency: string;
            from: number;
            to: number;
            price_type: string;
            source_url?: string | null;
            last_checked?: string;
        };
        suggested_attire_for_viewers: string;
    };
    teaching_workshop_details?: {
        beginner_workshop_duration_options: string[];
        workshop_price_from: number;
        currency: string;
        booking_info: string;
    };
    media_references?: {
        notable_practitioners: string[];
        canonical_references: Array<{ title: string; source_url: string }>;
    };
    tags: string[];
    seo_title: string;
    seo_description: string;
    last_updated: string;
    is_live: boolean;
    json_ld_template: Record<string, unknown>;
}

export interface PlaceData {
    place_id: string;
    title: string;
    summary: string;
    best_time_to_see: string;
    how_to_reach: string;
    is_bookable: boolean;
    related_content_slugs: string[];
}

// Map cache to simulate SWR
const cache: Record<string, unknown> = {};

export async function getDanceMaster(): Promise<DanceMaster> {
    if (cache['master']) return cache['master'] as DanceMaster;

    // Dynamic import for Vite
    const data = await import('../data/culture-dance-forms.json');
    cache['master'] = data.default || data;
    return cache['master'] as DanceMaster;
}

export async function getDanceForm(slug: string): Promise<DanceDetail | null> {
    if (cache[slug]) return cache[slug] as DanceDetail;

    try {
        // Vite glob import to find the specific file
        const modules = import.meta.glob('../data/dance-forms/*.json');
        const path = `../data/dance-forms/${slug}.json`;

        if (modules[path]) {
            const mod = await modules[path]();
            const data = (mod as { default: DanceDetail }).default || mod;
            cache[slug] = data;
            return data as DanceDetail;
        }
    } catch (error) {
        console.error(`Failed to load dance form: ${slug}`, error);
    }
    return null;
}
