// src/components/layout/AuthLayout.jsx
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import LanguageSelector from '../common/LanguageSelector';
import { useTranslation } from 'react-i18next';
import React from 'react';

const AuthLayout = () => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="absolute top-4 right-4">
                <LanguageSelector />
            </div>

            <motion.div
                className="w-full "
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-green-700">
                        KrishiMart
                    </h1>
                    <p className="mt-2 text-gray-600">
                        {t('auth.tagline', 'Connecting Farmers with Resources')}
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-xl p-8">
                    <Outlet />
                </div>
            </motion.div>
        </div>
    );
};
export default AuthLayout;