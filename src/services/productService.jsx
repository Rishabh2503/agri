import axiosInstance from '../utils/axios';

export const getAllProducts = async () => {
  try {
    const response = await axiosInstance.get('/product/get-all-products');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/product/get-product/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/product/create-product', productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/product/update-product/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/product/delete-product/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getShopProducts = async (shopId) => {
  try {
    const response = await axiosInstance.get(`/product/get-shop-products/${shopId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addProductReview = async (productId, reviewData) => {
  try {
    const response = await axiosInstance.put(`/product/create-new-review`, {
      productId,
      ...reviewData
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
}; 