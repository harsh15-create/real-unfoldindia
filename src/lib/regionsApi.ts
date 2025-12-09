
import { RegionDetail } from './types';

// In a real Next.js app, this might run server-side or closer to build time.
// For client-side React (Vite), we fetch from the public directory.
const DATA_BASE_URL = '/src/data/regions';

// Cache for simulated ISR/SWR
const cache: Record<string, RegionDetail> = {};

export const getRegion = async (slug: string): Promise<RegionDetail | null> => {
    if (cache[slug]) return cache[slug];

    try {
        // Vite glob import to find the specific file
        // This ensures the data is included in the build or served correctly in dev
        const modules = import.meta.glob('/src/data/regions/*.json');
        const path = `/src/data/regions/${slug}.json`;

        if (modules[path]) {
            const mod = await modules[path]();
            const data = (mod as { default: RegionDetail }).default || mod as RegionDetail;
            cache[slug] = data;
            return data;
        } else {
            console.warn(`Region data not found for slug: ${slug}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching region ${slug}:`, error);
        return null;
    }
};
