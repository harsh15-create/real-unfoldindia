
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    console.log(`[Analytics] ${eventName}`, properties);
    // Send to GA/Mixpanel here
};

export const AdventureEvents = {
    EXPERIENCE_OPEN: (section: string) => trackEvent('experience_open', { section }),
    ACTIVITY_QUICK_VIEW: (section: string, slug: string) => trackEvent('activity_quick_view', { section, slug }),
    ACTIVITY_VIEW_DETAIL: (section: string, slug: string) => trackEvent('activity_view_detail', { section, slug }),
    ACTIVITY_BOOK_CTA: (props: any) => trackEvent('activity_book_cta', props),
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
};
