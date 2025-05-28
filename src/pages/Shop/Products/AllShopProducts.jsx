import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiFilter, FiShoppingCart, FiStar } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../utils/axios';
import { useAuth } from '../../../hooks/useAuth';

const AllShopProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
    const [sortBy, setSortBy] = useState('newest');
    const [ratingFilter, setRatingFilter] = useState(0);

    // Predefined categories
    const categories = ['Equipment', 'Land'];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/product/get-all-products');
            
            if (response.data.success) {
                const productsData = response.data.products || [];
                setProducts(productsData);
            } else {
                toast.error('Failed to fetch products');
                setProducts([]);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch products');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            const response = await axiosInstance.post('/cart/add-to-cart', {
                productId: product._id,
                quantity: 1
            });
            if (response.data.success) {
                toast.success(`${product.name} added to cart!`);
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(error.response?.data?.message || 'Failed to add to cart');
        }
    };

    const handleAddReview = async (productId, rating, comment) => {
        try {
            const response = await axiosInstance.put('/product/create-new-review', {
                productId,
                rating,
                comment
            });
            if (response.data.success) {
                toast.success('Review added successfully!');
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding review:', error);
            toast.error(error.response?.data?.message || 'Failed to add review');
        }
    };

    // Only apply filters if they are actively set
    const filteredAndSortedProducts = products
        .filter(product => {
            // Search filter
            const matchesSearch = !searchTerm || 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());

            // Category filter
            const matchesCategory = selectedCategory === 'all' || 
                product.category === selectedCategory;

            // Price range filter
            const matchesPrice = (priceRange.min === 0 && priceRange.max === 10000) || 
                (product.discountPrice >= priceRange.min && product.discountPrice <= priceRange.max);

            // Rating filter
            const matchesRating = ratingFilter === 0 || 
                product.ratings >= ratingFilter;

            return matchesSearch && matchesCategory && matchesPrice && matchesRating;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.discountPrice - b.discountPrice;
                case 'price-high':
                    return b.discountPrice - a.discountPrice;
                case 'rating':
                    return b.ratings - a.ratings;
                case 'newest':
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
                    <p className="mt-2 text-gray-600">Browse through our wide selection of agricultural products</p>
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <FiFilter className="absolute left-3 top-3 text-gray-400" />
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            >
                                <option value="all">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div className="relative">
                            <select
                                value={ratingFilter}
                                onChange={(e) => setRatingFilter(Number(e.target.value))}
                                className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                            >
                                <option value="0">All Ratings</option>
                                <option value="4">4★ & Above</option>
                                <option value="3">3★ & Above</option>
                                <option value="2">2★ & Above</option>
                                <option value="1">1★ & Above</option>
                            </select>
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mt-4 flex items-center space-x-4">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={priceRange.min}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={priceRange.max}
                            onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
                        />
                    </div>
                </div>

                {/* Products Grid */}
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                        <p className="mt-2 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredAndSortedProducts.map((product) => (
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
                                    <div className="absolute top-2 right-2">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            {product.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                    <div className="mt-2 flex items-center">
                                        <FiStar className="text-yellow-400" />
                                        <span className="ml-1 text-sm text-gray-600">
                                            {product.ratings} ({product.numOfReviews} reviews)
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-lg font-medium text-gray-900">₹{product.discountPrice}</p>
                                            <p className="text-sm text-gray-500 line-through">₹{product.originalPrice}</p>
                                        </div>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                        >
                                            <FiShoppingCart className="mr-2" />
                                            Add to Cart
                                        </button>
                                    </div>
                                    <div className="mt-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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

export default AllShopProducts; 