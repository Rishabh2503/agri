// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaArrowRight, FaLeaf, FaShoppingBasket, FaTractor } from 'react-icons/fa';
import axios from 'axios';


// import ProductCard from '../components/products/ProductCard';
import { API_URL } from '../../config/constant';
import Banner from '../../components/banner/Banner';
import Support from '../../components/support/Support';
import Workflow from '../../components/workflow/Workflow';
import Services from '../../components/services/Services';
import Stats from '../../components/stats/Stats';
import Equipments from '../../components/equipments/Equipments';
import LandLeasing from '../../components/landLeasing/LandLeasing';

const Home = () => {
    const { t } = useTranslation();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch featured products
                const productsRes = await axios.get(`${API_URL}/api/products/featured`);
                setFeaturedProducts(productsRes.data.products || []);

                // Fetch categories
                const categoriesRes = await axios.get(`${API_URL}/api/categories`);
                setCategories(categoriesRes.data.categories || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const features = [
        {
            icon: <FaLeaf className="text-4xl text-green-600" />,
            title: t('home.feature1Title'),
            description: t('home.feature1Desc')
        },
        {
            icon: <FaShoppingBasket className="text-4xl text-green-600" />,
            title: t('home.feature2Title'),
            description: t('home.feature2Desc')
        },
        {
            icon: <FaTractor className="text-4xl text-green-600" />,
            title: t('home.feature3Title'),
            description: t('home.feature3Desc')
        }
    ];

    return (
        <div className="bg-gray-50">
            <Banner />
            <Support />
            <Workflow />
            <Services />
            <Stats />
            <Equipments />
            <LandLeasing />
            {/* Hero Section */}
            {/* <section className="relative h-[70vh] bg-green-600 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-20"
                    style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
                />
                <div className="container mx-auto px-4 h-full flex items-center">
                    <div className="">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-white"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {t('home.heroTitle')}
                            </h1>
                            <p className="text-xl mb-8">
                                {t('home.heroSubtitle')}
                            </p>
                            <Link
                                to="/products"
                                className="inline-flex items-center px-6 py-3 bg-white text-green-700 rounded-lg font-medium shadow-lg hover:bg-green-50 transition duration-300"
                            >
                                {t('home.shopNow')}
                                <FaArrowRight className="ml-2" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section> */}

            {/* Categories Section */}
            {/* <section className="py-16 container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('home.exploreCategories')}
                    </h2>
                    <p className="text-gray-600 mx-auto">
                        {t('home.categoriesSubtitle')}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-32">
                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.slice(0, 8).map((category) => (
                            <motion.div key={category._id} variants={itemVariants}>
                                <Link
                                    to={`/products?category=${category._id}`}
                                    className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300"
                                >
                                    <div className="h-40 bg-green-100 flex items-center justify-center">
                                        {category.image ? (
                                            <img
                                                src={category.image.url}
                                                alt={category.name}
                                                className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                                            />
                                        ) : (
                                            <FaLeaf className="text-5xl text-green-500" />
                                        )}
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-semibold text-gray-800">{category.name}</h3>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div variants={itemVariants}>
                            <Link
                                to="/categories"
                                className="block h-full bg-green-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 flex flex-col items-center justify-center p-6"
                            >
                                <span className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                                    <FaArrowRight className="text-green-600" />
                                </span>
                                <span className="font-medium text-green-700">{t('home.viewAll')}</span>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </section> */}

            {/* Features Section */}
            {/* <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {t('home.whyChooseUs')}
                        </h2>
                        <p className="text-gray-600 -lg mx-auto">
                            {t('home.chooseUsSubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="bg-green-50 rounded-xl p-8 text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Featured Products Section */}
            {/* <section className="py-16 container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {t('home.featuredProducts')}
                        </h2>
                        <p className="text-gray-600">
                            {t('home.featuredSubtitle')}
                        </p>
                    </div>

                    <Link
                        to="/products"
                        className="hidden md:inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition duration-300"
                    >
                        {t('home.viewAllProducts')}
                        <FaArrowRight className="ml-2" />
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {featuredProducts.map((product) => (
                                <motion.div key={product._id} variants={itemVariants}>
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </motion.div>

                        <div className="mt-8 text-center md:hidden">
                            <Link
                                to="/products"
                                className="inline-flex items-center px-6 py-3 bg-green-100 text-green-700 rounded-lg font-medium hover:bg-green-200 transition duration-300"
                            >
                                {t('home.viewAllProducts')}
                                <FaArrowRight className="ml-2" />
                            </Link>
                        </div>
                    </>
                )}
            </section> */}

            {/* Newsletter Section */}
            {/* <section className="py-16 bg-green-600 text-white">
                <div className="container mx-auto px-4">
                    <div className="-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            {t('home.stayUpdated')}
                        </h2>
                        <p className="text-green-100 mb-8">
                            {t('home.newsletterDesc')}
                        </p>

                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder={t('home.emailPlaceholder')}
                                className="flex-1 px-6 py-3 rounded-l-lg text-gray-800 outline-none focus:ring-2 focus:ring-green-300"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-white text-green-700 font-medium rounded-r-lg hover:bg-green-50 transition duration-300 sm:w-auto w-full"
                            >
                                {t('home.subscribe')}
                            </button>
                        </form>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default Home;