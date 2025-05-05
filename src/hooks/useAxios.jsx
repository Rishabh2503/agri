import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

export const useAxios = () => {
  const { logout } = useAuth();

  const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // ✅ Important for sending cookies
    headers: {
      'Content-Type': 'application/json',
    },
  });

  useEffect(() => {
    // Intercept responses to handle auth errors
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Unauthorized - maybe session expired
          await logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [logout]);

  return api;
};
