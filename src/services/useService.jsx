import axios from 'axios';

const API_URL = 'https://krishimart-back.onrender.com/api/v2';

// Get user information
export const getUserInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/user/getuser`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Optional: only if backend requires cookies
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

// Update user information
export const updateUserInfo = async (userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/user/update-user-info`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true, // Optional
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update user data');
  }
};
