/**
 * Analytics events for tracking user interactions.
 * Currently logs to console. replace with actual analytics implementation implementation (e.g. GA4, Segment) later.
 */

const trackEvent = (eventName: string, payload: Record<string, any>) => {
    console.log(`[Analytics] ${eventName}`, payload);
};

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
    CULTURE_OPEN: (section: string) => trackEvent('culture_open', { section }),
    FESTIVAL_CLICK: (slug: string) => trackEvent('festival_click', { slug }),
    FESTIVAL_PLACE_CLICK: (festival_slug: string, place_id: string) => trackEvent('festival_place_click', { festival_slug, place_id }),
    FESTIVAL_SHARE: (slug: string) => trackEvent('festival_share', { slug }),
    FAQ_OPEN: (slug: string, question: string) => trackEvent('faq_open', { slug, question }),

    // Dance Events
    DANCE_CLICK: (slug: string) => trackEvent('dance_click', { slug }),
    DANCE_VIEW: (slug: string, title: string) => trackEvent('dance_view', { slug, title }),
    DANCE_WORKSHOP_CLICK: (slug: string) => trackEvent('dance_workshop_click', { slug }),
    DANCE_PLACE_CLICK: (dance_slug: string, place_id: string) => trackEvent('dance_place_click', { dance_slug, place_id }),

    // Art & Craft
    ART_OPEN: (section: string) => trackEvent('culture_art_open', { section }),
    CRAFT_CLICK: (craft_slug: string) => trackEvent('culture_craft_click', { craft_slug }),
    CRAFT_VIEW: (craft_slug: string) => trackEvent('culture_craft_view', { craft_slug }),
    CRAFT_WORKSHOP_CLICK: (craft_slug: string) => trackEvent('culture_craft_workshop_click', { craft_slug }),
    CRAFT_PLACE_CLICK: (craft_slug: string, place_id: string) => trackEvent('culture_craft_place_click', { craft_slug, place_id }),

    // Cuisine
    CUISINE_CLICK: (slug: string) => trackEvent('culture_cuisine_click', { slug }),
    CUISINE_VIEW: (slug: string, title?: string) => trackEvent('culture_cuisine_view', { slug, title }),
    CUISINE_RECIPE_CLICK: (slug: string, recipe_name: string) => trackEvent('culture_cuisine_recipe_click', { slug, recipe_name }),

    // Region Highlights
    REGION_HIGHLIGHTS_OPEN: (region_slug: string) => trackEvent('region_highlights_open', { region_slug }),
    REGION_HIGHLIGHT_CLICK: (region_slug: string, highlight_id: string) => trackEvent('region_highlight_click', { region_slug, highlight_id }),
    REGION_HIGHLIGHT_SHARE: (region_slug: string, highlight_id: string, channel: string) => trackEvent('region_highlight_share', { region_slug, highlight_id, channel }),
};

export const region_highlights_open = (payload: { region_slug: string }) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
        (window as any).dataLayer.push({ event: "region_highlights_open", ...payload });
    }
    trackEvent('region_highlights_open', payload);
};

export const region_highlight_click = (payload: { region_slug: string; highlight_id: string }) => {
    trackEvent('region_highlight_click', payload);
};

export const region_highlight_share = (payload: { region_slug: string; highlight_id: string; channel: string }) => {
    trackEvent('region_highlight_share', payload);
};
