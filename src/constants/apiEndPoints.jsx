// Centralized API endpoint definitions
// Makes it easy to switch between environments or update API paths

// Base API URLs for different environments
const API_BASE = {
    development: 'http://localhost:3000/api',
    staging: 'https://staging-api.example.com',
    production: 'https://api.example.com'
};

// Determine current environment
const currentEnv = process.env.NODE_ENV || 'development';
const BASE_URL = API_BASE[currentEnv];

const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: `${BASE_URL}/auth/login`,
        REGISTER: `${BASE_URL}/auth/register`,
        LOGOUT: `${BASE_URL}/auth/logout`,
        REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
    },

    // User endpoints
    USER: {
        PROFILE: `${BASE_URL}/user/profile`,
        UPDATE_PROFILE: `${BASE_URL}/user/update`,
        CHANGE_PASSWORD: `${BASE_URL}/user/change-password`,
    },

    // Projects endpoints
    PROJECTS: {
        LIST: `${BASE_URL}/projects`,
        DETAILS: (id) => `${BASE_URL}/projects/${id}`,
        CREATE: `${BASE_URL}/projects`,
        UPDATE: (id) => `${BASE_URL}/projects/${id}`,
        DELETE: (id) => `${BASE_URL}/projects/${id}`,
    },

    // Analytics endpoints
    ANALYTICS: {
        DASHBOARD: `${BASE_URL}/analytics/dashboard`,
        REPORTS: `${BASE_URL}/analytics/reports`,
        EXPORT: (format) => `${BASE_URL}/analytics/export/${format}`,
    },
};

export default API_ENDPOINTS;