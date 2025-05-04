import axios from 'axios';

const API_URL = 'https://krishimart-back.onrender.com/api/v2';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/user/login-user`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/user/create-user`, userData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const activateUser = async (activationToken) => {
    try {
        const response = await axios.post(`${API_URL}/user/activation`, {
            activation_token: activationToken
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Activation failed');
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/logout`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Logout failed');
    }
};