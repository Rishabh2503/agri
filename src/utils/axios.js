import axios from 'axios';
import { API_CONFIG } from '../config/api';
import { toast } from 'react-hot-toast';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: API_CONFIG.HEADERS,
    withCredentials: API_CONFIG.WITH_CREDENTIALS
});

// Add request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // You can add auth token here if needed
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // Handle unauthorized
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 404:
                    toast.error('Resource not found');
                    break;
                case 500:
                    toast.error('Server error occurred');
                    break;
                default:
                    toast.error(error.response.data?.message || 'An error occurred');
            }
        } else if (error.request) {
            toast.error('No response from server');
        } else {
            toast.error('Error setting up request');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 