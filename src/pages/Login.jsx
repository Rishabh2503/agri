import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      setErrors({ general: err.message || 'Login failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-green-50 to-green-100 '>
      <motion.div
        className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <h2 className='text-3xl font-bold text-center text-green-600 mb-2'>
            Welcome Back
          </h2>
          <p className='text-gray-500 text-center mb-6'>
            Login to access your account
          </p>
        </motion.div>

        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm'>
            {errors.general}
          </motion.div>
        )}

        <motion.form
          className='space-y-5'
          onSubmit={handleSubmit}
          noValidate>
          <div className='relative'>
            <FiMail className='absolute left-3 top-3.5 text-gray-400' />
            <motion.input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              required
              className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
            )}
          </div>

          <div className='relative'>
            <FiLock className='absolute left-3 top-3.5 text-gray-400' />
            <motion.input
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter your password'
              required
              className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600'>
              {showPassword ? 'Hide' : 'Show'}
            </button>
            {errors.password && (
              <p className='mt-1 text-sm text-red-600'>{errors.password}</p>
            )}
          </div>

          <div className='flex justify-between items-center text-sm'>
            <label className='flex items-center'>
              <input
                type='checkbox'
                className='mr-2 h-4 w-4 text-green-500 rounded border-gray-300 focus:ring-green-500'
              />
              <span className='text-gray-600'>Remember me</span>
            </label>
            <Link
              to='/forgot-password'
              className='text-green-600 hover:text-green-700'>
              Forgot password?
            </Link>
          </div>

          <motion.button
            type='submit'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className='w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center space-x-2 font-medium disabled:opacity-50'
            disabled={loading}>
            <span>{loading ? 'Logging in...' : 'Sign In'}</span>
            {!loading && <FiArrowRight />}
          </motion.button>
        </motion.form>

        <div className='mt-6 pt-6 border-t border-gray-200'>
          <p className='text-center text-gray-600'>
            Are you a shop owner?{' '}
            <Link
              to='/shop/login'
              className='text-green-600 hover:text-green-700 font-medium'>
              Login as Shop Owner
            </Link>
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-6 text-center'>
          <p className='text-gray-600'>
            Don't have an account?{' '}
            <Link
              to='/register'
              className='text-green-600 hover:text-green-700 font-medium'>
              Register Now
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
