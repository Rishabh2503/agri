import axios from 'axios';

const API_URL = 'https://krishimart-back.onrender.com/api/v2';

// Create Axios instance with credentials enabled
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Ensures cookies (including token) are sent
});

// Get user information (token handled via cookie)
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/user/getuser');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

// Update user information (token handled via cookie)
export const updateUserInfo = async (userData) => {
  try {
    const response = await axiosInstance.put('/user/update-user-info', userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user data');
  }
};
