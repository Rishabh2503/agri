import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

export const useAxios = () => {
    const { token, logout } = useAuth();

    const api = axios.create({
        baseURL: BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    useEffect(() => {
        // Request interceptor
        const requestInterceptor = api.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // Response interceptor
        const responseInterceptor = api.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === 401) {
                    // Token expired or invalid
                    await logout();
                }
                return Promise.reject(error);
            }
        );

        // Clean up
        return () => {
            api.interceptors.request.eject(requestInterceptor);
            api.interceptors.response.eject(responseInterceptor);
        };
    }, [token, logout]);

    return api;
};