import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
    const { t } = useTranslation();
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-xl font-bold text-green-600">KrishiMart</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="border-transparent text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 hover:border-green-400"
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                to="/products"
                                className="border-transparent text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 hover:border-green-400"
                            >
                                {t('nav.products')}
                            </Link>
                            <Link
                                to="/services"
                                className="border-transparent text-gray-700 hover:text-green-600 inline-flex items-center px-1 pt-1 border-b-2 hover:border-green-400"
                            >
                                {t('nav.services')}
                            </Link>
                        </div>
                    </div>

                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        <LanguageSelector />

                        {isAuthenticated ? (
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-700 font-medium">{user?.name?.charAt(0)}</span>
                                        </div>
                                        <span className="ml-2 text-gray-700">{user?.name}</span>
                                    </button>
                                </div>

                                <AnimatePresence>
                                    {isProfileOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                                        >
                                            <div className="py-1">
                                                <Link
                                                    to="/profile"
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    {t('nav.profile')}
                                                </Link>
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {t('nav.logout')}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    {t('nav.login')}
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                    {t('nav.register')}
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg
                                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="sm:hidden"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                    >
                        <div className="pt-2 pb-3 space-y-1">
                            <Link
                                to="/"
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-400 hover:text-green-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nav.home')}
                            </Link>
                            <Link
                                to="/products"
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-400 hover:text-green-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nav.products')}
                            </Link>
                            <Link
                                to="/services"
                                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-gray-700 hover:bg-gray-50 hover:border-green-400 hover:text-green-600"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {t('nav.services')}
                            </Link>
                        </div>

                        <div className="pt-4 pb-3 border-t border-gray-200">
                            {isAuthenticated ? (
                                <div>
                                    <div className="flex items-center px-4">
                                        <div className="flex-shrink-0">
                                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                <span className="text-green-700 font-medium">{user?.name?.charAt(0)}</span>
                                            </div>
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium text-gray-800">{user?.name}</div>
                                            <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {t('nav.profile')}
                                        </Link>
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsMenuOpen(false);
                                            }}
                                            className="w-full text-left block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                                        >
                                            {t('nav.logout')}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-1 px-4">
                                    <Link
                                        to="/login"
                                        className="block text-base font-medium text-gray-700 hover:bg-gray-100 px-4 py-2"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {t('nav.login')}
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block text-base font-medium bg-green-600 text-white hover:bg-green-700 px-4 py-2 rounded-md"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {t('nav.register')}
                                    </Link>
                                </div>
                            )}
                            <div className="mt-4 px-4">
                                <LanguageSelector />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};
export default Navbar;