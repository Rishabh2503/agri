import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

const ShopLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/shop/login-shop`,
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success('Login successful!');
        navigate('/shop/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4'>
      <motion.div
        className='bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className='p-8'>
          <h2 className='text-3xl font-bold text-center text-green-600 mb-2'>
            Seller Login
          </h2>
          <p className='text-gray-500 text-center mb-6'>
            Access your seller dashboard
          </p>

          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='relative'>
              <FiMail className='absolute left-3 top-3.5 text-gray-400' />
              <input
                type='email'
                placeholder='Email address'
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                required
              />
            </div>

            <div className='relative'>
              <FiLock className='absolute left-3 top-3.5 text-gray-400' />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Password'
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                className='w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                required
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600'>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center space-x-2'>
              <span>{loading ? 'Logging in...' : 'Login as Seller'}</span>
              {!loading && <FiArrowRight />}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-gray-600'>
              Don't have a seller account?{' '}
              <Link
                to='/shop/register'
                className='text-green-600 hover:text-green-700 font-medium'>
                Register as Seller
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ShopLogin;
