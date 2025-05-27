// src/components/layout/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';
import { useTranslation } from 'react-i18next';
import React from 'react';
import Navbar from '../common/Navbar';

const AuthLayout = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-amber-50  items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
           
        <Navbar />
            <motion.div
                className="w-full "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
            

                <div className="bg-white shadow-xl rounded-xl p-8">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
};
export default AuthLayout;