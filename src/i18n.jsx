import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// Initialize i18next
i18n
    // Load translations from a backend
    .use(Backend)
    // Detect user language
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize configuration
    .init({
        fallbackLng: 'en',
        debug: process.env.NODE_ENV === 'development',

        interpolation: {
            escapeValue: false, // not needed for React as it escapes by default
        },

        // Common namespaces for all components
        ns: ['common', 'home', 'products', 'cart', 'checkout'],
        defaultNS: 'common',

        react: {
            useSuspense: true,
        },
    });

export default i18n;