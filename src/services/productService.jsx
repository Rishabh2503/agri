import axios from 'axios';

const BASE_URL = '/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get all products for a shop
export const getShopProducts = async (shopId) => {
    try {
        const response = await axiosInstance.get(`/product/get-all-products-shop/${shopId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete a product
export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/product/delete-shop-product/${productId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Create a new product
export const createProduct = async (productData) => {
    try {
        const response = await axiosInstance.post('/product/create-product', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}; 