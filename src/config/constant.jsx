// Central configuration constants for the application

// Get environment variables safely for Vite
const getEnvVariable = (key, defaultValue) => {
    return import.meta.env[key] || defaultValue;
};

// API configuration
export const API_URL = getEnvVariable('VITE_API_URL', 'h ps://krishimart-back.onrender.com/api/v2');
export const API_TIMEOUT = 30000; // 30 seconds

// Feature flags
export const FEATURES = {
    ENABLE_CHAT: true,
    ENABLE_REVIEWS: true,
    ENABLE_RECOMMENDATIONS: true,
};

// App configuration
export const APP_CONFIG = {
    MAX_PRODUCTS_PER_PAGE: 12,
    MAX_SEARCH_RESULTS: 50,
    IMAGE_QUALITY: 'high', // 'low', 'medium', 'high'
    CACHE_DURATION: 3600, // in seconds
};

// Social media links
export const SOCIAL_LINKS = {
    FACEBOOK: 'https://facebook.com/krishimart',
    TWITTER: 'https://twitter.com/krishimart',
    INSTAGRAM: 'https://instagram.com/krishimart',
    YOUTUBE: 'https://youtube.com/krishimart',
};

// Analytics
export const ANALYTICS = {
    TRACKING_ID: getEnvVariable('VITE_ANALYTICS_ID', 'UA-XXXXXXXXX-X'),
    ENABLE_TRACKING: import.meta.env.MODE === 'production',
};

// Content constants
export const CONTENT = {
    SITE_NAME: 'KrishiMart',
    TAG_LINE: 'Farm Fresh, Delivered Direct',
    COPYRIGHT: `© ${new Date().getFullYear()} KrishiMart. All rights reserved.`,
};

// Default export for convenience
export default {
    API_URL,
    API_TIMEOUT,
    FEATURES,
    APP_CONFIG,
    SOCIAL_LINKS,
    ANALYTICS,
    CONTENT,
};