import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';
import axiosInstance from '../../../utils/axios';
import { toast } from 'react-hot-toast';

const ShopActivation = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    const activateShop = async () => {
      try {
        const response = await axiosInstance.post('/shop/activation', {
          activation_token
        });

        if (response.data.success) {
          setStatus('success');
          setMessage('Your shop account has been activated successfully!');
          localStorage.setItem('shopActivationStatus', 'success');
          
          toast.success('Shop activated successfully!');
          
          // Redirect to login after 3 seconds
          setTimeout(() => {
            navigate('/shop/login', { 
              state: { 
                message: 'Please login with your shop credentials',
                email: response.data.email // Pass email if available
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
      }
    };

    if (activation_token) {
      activateShop();
    } else {
      setStatus('error');
      setMessage('Invalid activation link');
      toast.error('Invalid activation link');
    }
  }, [activation_token, navigate]);

  const handleRetry = async () => {
    if (retryCount >= MAX_RETRIES) {
      setMessage('Maximum retry attempts reached. Please try registering again.');
      return;
    }

    setStatus('loading');
    setRetryCount(prev => prev + 1);

    try {
      const response = await axiosInstance.post('/shop/activation', {
        activation_token
      });

      if (response.data.success) {
        setStatus('success');
        setMessage('Your shop account has been activated successfully!');
        localStorage.setItem('shopActivationStatus', 'success');
        
        toast.success('Shop activated successfully!');
        
        setTimeout(() => {
          navigate('/shop/login', { 
            state: { 
              message: 'Please login with your shop credentials',
              email: response.data.email // Pass email if available
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
            className='text-center'>
            <div className='flex justify-center mb-4'>
              <FiRefreshCw className='w-12 h-12 text-blue-500 animate-spin' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Activating your shop account...
            </h2>
            <p className='text-gray-600'>
              Please wait while we activate your shop account.
            </p>
          </motion.div>
        );

      case 'success':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center'>
            <div className='flex justify-center mb-4'>
              <FiCheckCircle className='w-12 h-12 text-green-500' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Activation Successful!
            </h2>
            <p className='text-gray-600 mb-4'>
              {message}
            </p>
            <p className='text-sm text-gray-500'>
              Redirecting to login page...
            </p>
          </motion.div>
        );

      case 'error':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center'>
            <div className='flex justify-center mb-4'>
              <FiAlertCircle className='w-12 h-12 text-red-500' />
            </div>
            <h2 className='text-2xl font-semibold text-gray-800 mb-2'>
              Activation Failed
            </h2>
            <p className='text-gray-600 mb-6'>
              {message}
            </p>
            <div className='space-y-4'>
              {retryCount < MAX_RETRIES && (
                <button
                  onClick={handleRetry}
                  className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'>
                  Try Again
                </button>
              )}
              <button
                onClick={() => navigate('/shop/register')}
                className='w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors'>
                Register Again
              </button>
              <button
                onClick={() => navigate('/shop/login')}
                className='w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors'>
                Go to Login
              </button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ShopActivation;