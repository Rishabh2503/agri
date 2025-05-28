// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://krishimart-back.onrender.com/api/v2';

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    TIMEOUT: 30000,
    HEADERS: {
        'Content-Type': 'application/json',
    },
    WITH_CREDENTIALS: true
};

export default API_CONFIG; 