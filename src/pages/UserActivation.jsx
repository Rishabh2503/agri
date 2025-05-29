import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import axiosInstance from '../utils/axios';
import { toast } from 'react-hot-toast';

const UserActivation = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [email, setEmail] = useState('');
  const MAX_RETRIES = 3;

  useEffect(() => {
    // Get email from localStorage
    const storedEmail = localStorage.getItem('registrationEmail');
    if (storedEmail) {
      setEmail(storedEmail);
    }

    if (!activation_token) {
      setStatus('error');
      setMessage('Invalid activation link. Please check your email for the correct link.');
      toast.error('Invalid activation link');
      return;
    }

    const activateAccount = async () => {
      try {
        const response = await axiosInstance.post('/user/activation', {
          activation_token
        });

        if (response.data.success) {
          setStatus('success');
          setMessage('Your account has been activated successfully!');
          localStorage.setItem('accountActivated', 'true');
          localStorage.removeItem('registrationEmail'); // Clear stored email
          
          toast.success('Account activated successfully!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/login', { 
              state: { 
                message: 'Account activated successfully! Please login to continue.',
                email: email // Pass email to login page
              }
            });
          }, 3000);
        } else {
          throw new Error(response.data.message || 'Activation failed');
        }
      } catch (error) {
        console.error('Activation error:', error);
        setStatus('error');
        const errorMessage = error.response?.data?.message || 'Activation failed. Please try again.';
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
  }, [activation_token, navigate, retryCount, email]);

  const handleRetry = async () => {
    if (retryCount >= MAX_RETRIES) {
      setMessage('Maximum retry attempts reached. Please try registering again.');
      return;
    }

    setStatus('loading');
    setRetryCount(prev => prev + 1);

    try {
      const response = await axiosInstance.post('/user/activation', {
        activation_token
      });

      if (response.data.success) {
        setStatus('success');
        setMessage('Your account has been activated successfully!');
        localStorage.setItem('accountActivated', 'true');
        localStorage.removeItem('registrationEmail');
        
        toast.success('Account activated successfully!');
        
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Account activated successfully! Please login to continue.',
              email: email
            }
          });
        }, 3000);
      } else {
        throw new Error(response.data.message || 'Activation failed');
      }
    } catch (error) {
      console.error('Retry activation error:', error);
      setStatus('error');
      const errorMessage = error.response?.data?.message || 'Activation failed. Please try again.';
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center">
            <div className="flex justify-center mb-4">
              <FiRefreshCw className="w-12 h-12 text-blue-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Activating your account...
            </h2>
            <p className="text-gray-600">
              {retryCount > 0 ? `Retry attempt ${retryCount} of ${MAX_RETRIES}` : 'Please wait while we verify your account'}
            </p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center">
            <div className="flex justify-center mb-4">
              <FiCheckCircle className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Activation Successful!
            </h2>
            <p className="text-gray-600 mb-4">
              {message}
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center">
            <div className="flex justify-center mb-4">
              <FiAlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Activation Failed
            </h2>
            <p className="text-gray-600 mb-6">
              {message}
            </p>
            <div className="space-y-4">
              {retryCount < MAX_RETRIES && (
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Try Again
                </button>
              )}
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                Go to Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors">
                Register Again
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

export default UserActivation;
