import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { activateUser } from '../services/authService';
import toast from 'react-hot-toast';

const ActivationPage = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [message, setMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    if (!activation_token) {
      setStatus('error');
      setMessage('Invalid activation link. Please check your email for the correct link.');
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await activateUser(activation_token);
        setStatus('success');
        setMessage(response.message || 'Your account has been activated successfully!');
        toast.success('Account activated successfully!');
        
        // Store activation status in localStorage
        localStorage.setItem('accountActivated', 'true');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Account activated successfully! Please login to continue.' 
            }
          });
        }, 3000);
      } catch (err) {
        console.error('Activation error:', err);
        setStatus('error');
        const errorMessage = err.message || 'Activation failed. Please try again or contact support.';
        setMessage(errorMessage);
        toast.error(errorMessage);

        // If we haven't exceeded max retries, try again
        if (retryCount < MAX_RETRIES) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            setStatus('loading');
            activateAccount();
          }, 2000);
        }
      }
    };

    activateAccount();
  }, [activation_token, navigate, retryCount]);

  const handleRetry = () => {
    setStatus('loading');
    setRetryCount(0);
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-blue-600 text-center"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Activating your account...</p>
            <p className="text-sm text-gray-500 mt-2">
              {retryCount > 0 ? `Retry attempt ${retryCount} of ${MAX_RETRIES}` : 'Please wait while we verify your account'}
            </p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-600 text-center"
          >
            <svg 
              className="w-16 h-16 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="text-xl font-semibold mb-2">Success!</p>
            <p className="mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to login page...</p>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-600 text-center"
          >
            <svg 
              className="w-16 h-16 mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <p className="text-xl font-semibold mb-2">Activation Failed</p>
            <p className="mb-4">{message}</p>
            <div className="space-y-3">
              {retryCount < MAX_RETRIES && (
                <button
                  onClick={handleRetry}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
              <button
                onClick={() => navigate('/login')}
                className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Go to Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="block w-full px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
              >
                Try Registering Again
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default ActivationPage;
