
// src/analytics/events.ts

type EventPayload = Record<string, any>;

/**
 * Simple analytics wrapper. 
 * Replace console.log with actual GA4/Mixpanel calls in production.
 */
export const trackEvent = (eventName: string, payload: EventPayload = {}) => {
    // Add timestamp and common properties
    const enrichedPayload = {
        ...payload,
        timestamp: new Date().toISOString(),
        url: window.location.href,
    };

    // In a real app, you'd integrate window.gtag or mixpanel.track here
    if (import.meta.env.DEV) {
        console.log(`[Analytics] ${eventName}`, enrichedPayload);
    }
};

export const AdventureEvents = {
    EXPERIENCE_OPEN: (experience_id: string) =>
        trackEvent('experience_open', { experience_id }),

    ACTIVITY_QUICK_VIEW: (experience_id: string, activity_slug: string) =>
        trackEvent('activity_quick_view', { experience_id, activity_slug }),

    ACTIVITY_VIEW_DETAIL: (experience_id: string, activity_slug: string) =>
        trackEvent('activity_view_detail', { experience_id, activity_slug }),

    ACTIVITY_LOCATION_SELECT: (experience_id: string, activity_slug: string, location: string) =>
        trackEvent('activity_location_select', { experience_id, activity_slug, location }),

    ACTIVITY_BOOK_CTA: (payload: { experience_id: string; activity_slug: string; location?: string; ticket_type?: string }) =>
        trackEvent('activity_book_cta', payload),

    SEARCH_PERFORMED: (query: string, filters: any) =>
        trackEvent('search_performed', { query, filters }),

    FILTER_APPLIED: (filter_name: string, values: any) =>
        trackEvent('filter_applied', { filter_name, values }),
};
