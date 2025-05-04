// src/pages/Activation.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';


const Activation = () => {
    const { t } = useTranslation();
    const { activateAccount, sendActivationEmail, loading, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [activationCode, setActivationCode] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(''); // 'success' or 'error'
    const [countdown, setCountdown] = useState(0);
    const [email, setEmail] = useState('');

    // Extract activation code from URL if present
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const userEmail = searchParams.get('email');

        if (code) {
            setActivationCode(code);
            handleActivation(code);
        }

        if (userEmail) {
            setEmail(userEmail);
        } else {
            // Try to get email from localStorage if not in URL
            const storedEmail = localStorage.getItem('registrationEmail');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    }, [location]);

    const handleActivation = async (code = activationCode) => {
        if (!code.trim()) {
            setMessage(t('activation.enterCode'));
            setStatus('error');
            return;
        }

        try {
            await activateAccount(code, email);
            setMessage(t('activation.success'));
            setStatus('success');

            // Redirect to login after successful activation
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err) {
            setMessage(err.response?.data?.message || t('activation.failed'));
            setStatus('error');
        }
    };

    const handleResendCode = async () => {
        if (countdown > 0) return;

        try {
            await sendActivationEmail(email);
            setMessage(t('activation.codeSent'));
            setStatus('success');

            // Start countdown for resend button
            setCountdown(60);
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (err) {
            setMessage(err.response?.data?.message || t('activation.sendFailed'));
            setStatus('error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-12">
            <motion.div
                className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="p-8">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('activation.title')}</h2>
                        <p className="text-gray-600">{t('activation.subtitle')}</p>
                    </div>

                    {message && (
                        <div
                            className={`mb-6 p-4 rounded-lg ${status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    {!status || status === 'error' ? (
                        <div>
                            <div className="mb-6">
                                <label htmlFor="activationCode" className="block text-gray-700 mb-2">
                                    {t('activation.codeLabel')}
                                </label>
                                <input
                                    type="text"
                                    id="activationCode"
                                    value={activationCode}
                                    onChange={(e) => setActivationCode(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder={t('activation.codePlaceholder')}
                                />
                            </div>

                            <div className="space-y-4">
                                <Button
                                    type="button"
                                    onClick={() => handleActivation()}
                                    fullWidth
                                    loading={loading}
                                >
                                    {t('activation.activateButton')}
                                </Button>

                                <div className="text-center">
                                    <p className="text-gray-600 mb-2">{t('activation.noCode')}</p>
                                    <button
                                        type="button"
                                        onClick={handleResendCode}
                                        disabled={countdown > 0 || loading}
                                        className={`text-green-600 font-medium hover:text-green-700 ${countdown > 0 || loading ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {countdown > 0
                                            ? `${t('activation.resendIn')} ${countdown}s`
                                            : t('activation.resendButton')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </motion.div>
                            <p className="text-gray-600">{t('activation.redirecting')}</p>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-green-600 font-medium hover:text-green-700"
                        >
                            {t('activation.backToLogin')}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Activation;