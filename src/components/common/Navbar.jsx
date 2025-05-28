import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import LanguageSelector from './LanguageSelector';
import logo from '../../img/logo.png';
import { FiUser, FiShoppingBag } from 'react-icons/fi';

const Navbar = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout, isShop } = useAuth();
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
    { name: 'Chat', path: '/chat' },
    { name: 'Shop Products', path: '/shop/all-products' }
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
                to={isShop ? '/shop/dashboard' : '/dashboard'}
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
                      className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1'>
                      <Link
                        to={isShop ? '/shop/dashboard' : '/dashboard'}
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Dashboard
                      </Link>
                      <Link
                        to='/profile'
                        className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Profile
                      </Link>
                      <Link
                        to="/shop/all-products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Shop Products
                      </Link>
                      <button
                        onClick={handleLogout}
                        className='block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className='flex items-center space-x-4'>
                <Link
                  to='/login'
                  className='flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-green-600 transition-colors duration-200'>
                  <FiUser className='w-5 h-5' />
                  <span>Login as User</span>
                </Link>
                <Link
                  to='/shop/login'
                  className='flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors duration-200'>
                  <FiShoppingBag className='w-5 h-5' />
                  <span>Login as Shop</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className='flex items-center lg:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500'>
              <span className='sr-only'>Open main menu</span>
              {/* Menu icon */}
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
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
              {/* Close icon */}
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns='http://www.w3.org/2000/svg'
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='lg:hidden'>
            <div className='px-2 pt-2 pb-3 space-y-1'>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'>
                  {item.name}
                </Link>
              ))}
              {!isAuthenticated && (
                <>
                  <Link
                    to='/login'
                    className='flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50'>
                    <FiUser className='w-5 h-5' />
                    <span>Login as User</span>
                  </Link>
                  <Link
                    to='/shop/login'
                    className='flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700'>
                    <FiShoppingBag className='w-5 h-5' />
                    <span>Login as Shop</span>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
