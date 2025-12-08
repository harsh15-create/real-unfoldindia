
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
};
