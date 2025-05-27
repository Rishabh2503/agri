import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import logo from '../../img/logo.png';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Land Leasing', path: '/land-leasing' },
    { name: 'Rental Equipment', path: '/rental-equipment' },
    { name: 'Crop Prediction', path: '/crop-prediction' },
    { name: 'Chat', path: '/chat' }
  ];

  return (
    <nav className='relative top-0 left-0 right-0 bg-white shadow-md z-50'>
      <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo Section */}
          <div className='flex-shrink-0 flex items-center'>
            <div
              className='flex items-center cursor-pointer gap-3'
              onClick={() => navigate('/')}
              role='button'
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && navigate('/')}>
              <img
                src={logo}
                className='h-10 w-auto object-contain'
                alt='Krishi Mart Logo'
              />
              <h3 className='text-xl font-bold text-green-600 hidden sm:block'>
                Krishi Mart
              </h3>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <div className='hidden lg:flex lg:items-center lg:space-x-8'>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className='text-base font-medium text-gray-700 hover:text-green-600 transition-colors duration-200'>
                {item.name}
              </Link>
            ))}
            {isAuthenticated && (
              <Link
                to='/dashboard'
                className='text-base font-medium text-gray-700 hover:text-green-600 transition-colors duration-200'>
                {t('Dashboard')}
              </Link>
            )}
          </div>

          {/* Right Section - Desktop */}
          <div className='hidden lg:flex lg:items-center lg:space-x-4'>
            {isAuthenticated ? (
              <div
                className='relative ml-4'
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}>
                <button className='flex items-center space-x-3 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 rounded-full py-2 px-4'>
                  <img
                    className='h-8 w-8 rounded-full object-cover border-2 border-green-500'
                    src={user?.avatar || '/path/to/default-avatar.png'}
                    alt='User Avatar'
                  />
                  <span className='text-sm font-medium text-gray-700'>
                    {user?.name ? `Hi, ${user.name}` : 'Hi, User'}
                  </span>
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className='absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5'>
                      <Link
                        to='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        {t('Profile')}
                      </Link>
                      <Link
                        to='/cart'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        {t('Cart')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        {t('Logout')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <button
                  onClick={() => navigate('/login')}
                  className='inline-flex items-center px-4 py-2 border border-green-600 text-sm font-medium rounded-md text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200'>
                  {t('Login')}
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200'>
                  {t('Register')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className='flex items-center lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'>
              <span className='sr-only'>Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  className='h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='lg:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'
                  onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <Link
                    to='/dashboard'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    onClick={() => setIsMenuOpen(false)}>
                    {t('dashboard')}
                  </Link>
                  <Link
                    to='/profile'
                    className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'
                    onClick={() => setIsMenuOpen(false)}>
                    {t('profile')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className='block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'>
                    {t('logout')}
                  </button>
                </>
              )}
              {!isAuthenticated && (
                <div className='px-3 py-2 space-y-2'>
                  <button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className='w-full px-4 py-2 text-center border border-green-600 rounded-md text-green-600 hover:bg-green-600 hover:text-white transition-colors duration-200'>
                    {t('Login')}
                  </button>
                  <button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className='w-full px-4 py-2 text-center border border-transparent rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200'>
                    {t('Register')}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
