
import { useTranslation } from 'react-i18next';

export interface TrekMaster {
    metadata: {
        subtitle: string;
        author: string;
    };
    treks: TrekSummary[];
}

export interface TrekSummary {
    id: string;
    slug: string;
    title: string;
    subtitle: string; // Was 'short'
    about: string;
    region: string;
    difficulty: string;
    duration: string;
    cover_image: string;
}

export interface TrekDetail extends TrekSummary {
    elevation_max_m: number;
    bestSeason: string[];
    highlights: string[];
    tags: string[];
    seo_title: string;
    seo_description: string;
    hubs: string[];
    images: string[];
    trek_places: TrekPlace[];
}

export interface TrekPlace {
    id: string;
    name: string;
    short: string;
    about: string;
    what_to_do: string[];
    coordinates: {
        lat: number;
        lon: number;
    };
    images: string[];
}

// Map of all trek JSONs
const masterModules = import.meta.glob('../data/*/himalayan-treks/himalayan-treks.json');
const trekModules = import.meta.glob('../data/*/himalayan-treks/*.json');

export async function getTreksMaster(lang: string = 'en'): Promise<TrekMaster> {
    let path = `../data/${lang}/himalayan-treks/himalayan-treks.json`;
    let loader = masterModules[path];

    if (!loader && lang !== 'en') {
        path = `../data/en/himalayan-treks/himalayan-treks.json`;
        loader = masterModules[path];
    }

    if (!loader) {
        throw new Error(`Master trek data not found for lang: ${lang}`);
    }

    const mod: any = await loader();
    return mod.default as TrekMaster;
}

export async function getTrekDetail(slug: string, lang: string = 'en'): Promise<TrekDetail | null> {
    let path = `../data/${lang}/himalayan-treks/${slug}.json`;
    let loader = trekModules[path];

    if (!loader && lang !== 'en') {
        path = `../data/en/himalayan-treks/${slug}.json`;
        loader = trekModules[path];
    }

    if (!loader) {
        console.error(`Trek not found: ${slug} (${lang})`);
        return null;
    }

    try {
        const mod: any = await loader();
        return mod.default as TrekDetail;
    } catch (e) {
        console.error(`Error loading trek ${slug}`, e);
        return null;
    }
}
