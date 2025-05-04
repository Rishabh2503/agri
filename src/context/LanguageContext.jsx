import { createContext, useState, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    useEffect(() => {
        // Initialize i18next
        i18n
            .use(Backend)
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                fallbackLng: 'en',
                debug: false,
                detection: {
                    order: ['localStorage', 'navigator'],
                    caches: ['localStorage'],
                },
                interpolation: {
                    escapeValue: false,
                },
                backend: {
                    loadPath: '/locales/{{lng}}/{{ns}}.json',
                },
            });

        // Set initial language
        setCurrentLanguage(i18n.language || 'en');

        // Listen for language changes
        const handleLanguageChanged = (lng) => {
            setCurrentLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChanged);

        return () => {
            i18n.off('languageChanged', handleLanguageChanged);
        };
    }, []);

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const value = {
        currentLanguage,
        changeLanguage,
        t: i18n.t,
    };

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};