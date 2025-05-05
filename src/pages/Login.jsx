import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { loginUser } from '../services/authService';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }

    if (!formData.password) {
      newErrors.password = t('validation.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('validation.passwordLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setAuthError('');

    try {
      const response = await loginUser(formData.email, formData.password);
      console.log('Login successful:', response);

      // Save token or user data if needed
      localStorage.setItem('accessToken', response.token);

      // Get the redirect path from location state or default to home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
        {t('login.title')}
      </h2>

      <form onSubmit={handleSubmit}>
        <Input
          id='email'
          name='email'
          type='email'
          label={t('login.email')}
          placeholder={t('login.emailPlaceholder')}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
          leftIcon={
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
              <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
            </svg>
          }
        />

        <Input
          id='password'
          name='password'
          type='password'
          label={t('login.password')}
          placeholder={t('login.passwordPlaceholder')}
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          required
          leftIcon={
            <svg
              className='h-5 w-5 text-gray-400'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                clipRule='evenodd'
              />
            </svg>
          }
        />

        {authError && (
          <motion.div
            className='mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded-md'
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}>
            {authError}
          </motion.div>
        )}

        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center'>
            <input
              id='remember-me'
              name='remember-me'
              type='checkbox'
              className='h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded'
            />
            <label
              htmlFor='remember-me'
              className='ml-2 block text-sm text-gray-700'>
              {t('login.rememberMe')}
            </label>
          </div>

          <div className='text-sm'>
            <Link
              to='/forgot-password'
              className='text-green-600 hover:text-green-500'>
              {t('login.forgotPassword')}
            </Link>
          </div>
        </div>

        <Button
          type='submit'
          variant='primary'
          className='w-full'
          isLoading={loading}>
          {t('login.signIn')}
        </Button>
      </form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          {t('login.noAccount')}{' '}
          <Link
            to='/register'
            className='text-green-600 hover:text-green-500 font-medium'>
            {t('login.signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
