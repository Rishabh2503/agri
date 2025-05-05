import axios from 'axios';

const API_URL = 'https://krishimart-back.onrender.com/api/v2';

// Create an Axios instance with base config
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Enables sending cookies/session across domains
});

// Login user (uses JSON content type)
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(
      '/user/login-user',
      { email, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

// Register user (uses multipart/form-data if uploading files)
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/user/create-user', userData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
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
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Activation failed');
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.get('/user/logout');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};
