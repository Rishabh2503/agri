import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { getShopProducts, deleteProduct } from '../../../services/productService';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ShopProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getShopProducts(user._id);
            if (response.success) {
                setProducts(response.products);
            }
        } catch (error) {
            toast.error('Failed to fetch products');
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await deleteProduct(productId);
                if (response.success) {
                    toast.success('Product deleted successfully');
                    fetchProducts(); // Refresh the products list
                }
            } catch (error) {
                toast.error('Failed to delete product');
                console.error('Error deleting product:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Products</h1>
                    <Link
                        to="/shop/create-product"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        <FiPlus className="mr-2" />
                        Add New Product
                    </Link>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-2 text-sm text-gray-500">Get started by creating a new product.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white overflow-hidden shadow rounded-lg"
                            >
                                <div className="relative h-48">
                                    <img
                                        src={product.images[0]?.url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">₹{product.discountPrice}</p>
                                            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 text-red-600 hover:text-red-800"
                                            >
                                                <FiTrash2 className="w-5 h-5" />
                                            </button>
                                            <Link
                                                to={`/shop/edit-product/${product._id}`}
                                                className="p-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <FiEdit2 className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {product.category}
                                        </span>
                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopProducts; 