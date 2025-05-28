import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = '/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for handling rate limiting
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 429 (Too Many Requests) and we haven't exceeded max retries
    if (error.response?.status === 429) {
      const retryCount = originalRequest._retryCount || 0;
      const maxRetries = 3;
      
      if (retryCount < maxRetries) {
        // Calculate exponential backoff delay (2^retryCount * 1000ms)
        const delay = Math.min(1000 * Math.pow(2, retryCount), 10000); // Max 10 seconds
        
        // Show toast notification
        toast.error(`Rate limit exceeded. Retrying in ${delay/1000} seconds...`, {
          duration: delay,
        });
        
        // Wait for the calculated delay
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Increment retry count and retry the request
        originalRequest._retryCount = retryCount + 1;
        return axiosInstance(originalRequest);
      } else {
        toast.error('Maximum retry attempts reached. Please try again later.');
        return Promise.reject(error);
      }
    }
    
    // Handle other errors
    if (error.response?.status === 401) {
      toast.error('Session expired. Please login again.');
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isShop');
      window.location.href = '/login';
    } else {
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      toast.error(errorMessage);
    }
    
    return Promise.reject(error);
  }
);

// Add request interceptor to add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
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

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/login-user', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/create-user', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const activateUser = async (activation_token) => {
  try {
    const response = await axiosInstance.post('/user/activation', { activation_token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/user/getuser');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get('/user/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Shop related API calls
export const loginShop = async (shopData) => {
  try {
    const response = await axiosInstance.post('/shop/login-shop', shopData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isShop', 'true');
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const registerShop = async (shopData) => {
  try {
    const response = await axiosInstance.post('/shop/create-shop', shopData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const activateShop = async (activation_token) => {
  try {
    const response = await axiosInstance.post('/shop/activation', { activation_token });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCurrentShop = async () => {
  try {
    const response = await axiosInstance.get('/shop/get-shop');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutShop = async () => {
  try {
    const response = await axiosInstance.get('/shop/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('isShop');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
