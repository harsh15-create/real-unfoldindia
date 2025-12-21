export const CITY_REGION_MAP: Record<string, string> = {
    // North India
    'varanasi': 'North India',
    'agra': 'North India',
    'leh-ladakh': 'North India',
    'rishikesh': 'North India',
    // Jaipur is technically West (Rajasthan) but often in North circuits. 
    // We map it to West India as per standard geography, but it appears in both lists.

    // South India
    'kochi': 'South India',
    'chennai': 'South India',
    'bangalore': 'South India',
    'madurai': 'South India',
    'munnar': 'South India',
    'thiruvananthapuram': 'South India',

    // East India
    'kolkata': 'East India',
    'sikkim': 'East India',
    'darjeeling': 'East India',
    'mizoram': 'East India',
    'puri': 'East India',
    'imphal': 'East India',

    // West India
    'jaipur': 'West India',
    'jaisalmer': 'West India',
    'goa': 'West India',
    'surat': 'West India',
    'bhuj': 'West India',
    'mumbai': 'West India',
};

export const REGION_TOTALS = {
    'North India': 4, // Excludes Jaipur if mapped to West
    'South India': 6,
    'East India': 6,
    'West India': 6,
};

export const TOTAL_APP_CITIES = Object.keys(CITY_REGION_MAP).length;
