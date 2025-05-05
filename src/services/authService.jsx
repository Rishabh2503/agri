import axios from 'axios';

const API_URL = 'https://krishimart-back.onrender.com/api/v2';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

// Add interceptor to add token to requests
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

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/user/login-user', {
      email,
      password
    });

    if (response.data.token) {
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/user/getuser'); // Changed from /user/me to /user/getuser
    return response.data;
  } catch (error) {
    // If unauthorized, clear storage
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    throw new Error(error.response?.data?.message || 'Failed to get user');
  }
};

// Register user (uses multipart/form-data if uploading files)
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/create-user', userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

// Activate user account (uses JSON content type)
export const activateUser = async (activationToken) => {
  try {
    const response = await axiosInstance.post(
      '/user/activation',
      { activation_token: activationToken },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Activation failed');
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.get('/user/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
