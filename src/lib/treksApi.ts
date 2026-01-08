// Map of all trek JSONs
const masterModules = import.meta.glob('../data/en/himalayan-treks/himalayan-treks.json');
const trekModules = import.meta.glob('../data/en/himalayan-treks/*.json');

export interface TrekSummary {
    id: string;
    slug: string;
    title: string;
    thumbnail: string;
    duration: string;
    difficulty: string;
    elevation_max_m: number;
    short_description: string;
    about: string;      // Added property
    cover_image: string; // Added property
    region: string;     // Added property
}

export interface TrekMaster {
    id: string;
    title: string;
    intro_title: string;
    intro_description: string;
    hero_image: string;
    treks: TrekSummary[];
    metadata?: {        // Added property
        subtitle?: string;
    };
}

export interface TrekPlace {
    id: string;
    name: string;
    short: string;
    about: string;
    images: string[];
    what_to_do?: string[];
}

export interface TrekDetail {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    cover_image: string;
    elevation_max_m: number;
    duration: string;
    difficulty: string;
    tags: string[];
    about: string;
    highlights: string[];
    trek_places: TrekPlace[];
    bestSeason: string[];
    hubs: string[];
}

export async function getTreksMaster(): Promise<TrekMaster> {
    const path = `../data/en/himalayan-treks/himalayan-treks.json`;
    const loader = masterModules[path];

    if (!loader) {
        throw new Error(`Master trek data not found`);
    }

    const mod: any = await loader();
    return mod.default as TrekMaster;
}

export async function getTrekDetail(slug: string): Promise<TrekDetail | null> {
    const path = `../data/en/himalayan-treks/${slug}.json`;
    const loader = trekModules[path];

    if (!loader) {
        console.error(`Trek not found: ${slug}`);
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
