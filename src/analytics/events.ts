/**
 * Analytics events for tracking user interactions.
 * Currently logs to console. replace with actual analytics implementation implementation (e.g. GA4, Segment) later.
 */

export const AdventureEvents = {
    EXPERIENCE_OPEN: (category: string) => {
        console.log(`[Analytics] Experience Open: ${category}`);
    },
    ACTIVITY_QUICK_VIEW: (category: string, slug: string | null) => {
        console.log(`[Analytics] Activity Quick View: ${category} - ${slug}`);
    },
    ACTIVITY_VIEW_DETAIL: (category: string, slug: string | null) => {
        console.log(`[Analytics] Activity View Detail: ${category} - ${slug}`);
    },
    ACTIVITY_BOOK_CTA: (payload: { experience_id: string; activity_slug: string }) => {
        console.log(`[Analytics] Activity Book CTA:`, payload);
    }
};

export const CultureEvents = {
    CULTURE_OPEN: (category: string) => {
        console.log(`[Analytics] Culture Open: ${category}`);
    },
    ART_OPEN: (context: string) => {
        console.log(`[Analytics] Art Open: ${context}`);
    },
    CRAFT_VIEW: (slug: string) => {
        console.log(`[Analytics] Craft View: ${slug}`);
    },
    CRAFT_CLICK: (slug: string) => {
        console.log(`[Analytics] Craft Click: ${slug}`);
    },
    CRAFT_PLACE_CLICK: (craftSlug: string, placeId: string) => {
        console.log(`[Analytics] Craft Place Click: ${craftSlug} - ${placeId}`);
    },
    CUISINE_VIEW: (slug: string, title?: string) => {
        console.log(`[Analytics] Cuisine View: ${slug} - ${title}`);
    },
    CUISINE_CLICK: (slug: string) => {
        console.log(`[Analytics] Cuisine Click: ${slug}`);
    },
    DANCE_VIEW: (slug: string, title?: string) => {
        console.log(`[Analytics] Dance View: ${slug} - ${title}`);
    },
    FESTIVAL_CLICK: (slug: string) => {
        console.log(`[Analytics] Festival Click: ${slug}`);
    },
    FESTIVAL_SHARE: (slug: string) => {
        console.log(`[Analytics] Festival Share: ${slug}`);
    }
};
