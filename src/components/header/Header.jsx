import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <header className='bg-white shadow-sm sticky top-0 z-50'>
      <nav className='container mx-auto px-4 py-4'>
        <div className='flex items-center justify-between'>
          <Link to='/' className='flex items-center space-x-2'>
            <img src='/logo.png' alt='Logo' className='h-8 w-8' />
            <span className='text-xl font-bold text-green-600'>Krishimart</span>
          </Link>

          <div className='hidden md:flex items-center space-x-8'>
            <Link
              to='/'
              className='text-gray-600 hover:text-green-600 transition-colors'>
              Home
            </Link>
            <Link
              to='/land-leasing'
              className='text-gray-600 hover:text-green-600 transition-colors'>
              Land Leasing
            </Link>
            <Link
              to='/rental-equipment'
              className='text-gray-600 hover:text-green-600 transition-colors'>
              Rental Equipment
            </Link>
            <Link
              to='/crop-prediction'
              className='text-gray-600 hover:text-green-600 transition-colors'>
              Crop Prediction
            </Link>
          </div>

          <div className='hidden md:flex items-center space-x-4'>
            {user ? (
              <div className='relative'>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className='flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors'>
                  <img
                    src={user.avatar || '/default-avatar.png'}
                    alt='Profile'
                    className='h-8 w-8 rounded-full object-cover'
                  />
                  <span>{user.name}</span>
                </button>

                {isProfileOpen && (
                  <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2'>
                    <Link
                      to='/profile'
                      className='block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600'>
                      Profile
                    </Link>
                    <Link
                      to='/dashboard'
                      className='block px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600'>
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className='block w-full text-left px-4 py-2 text-gray-600 hover:bg-green-50 hover:text-green-600'>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to='/login'
                  className='text-gray-600 hover:text-green-600 transition-colors'>
                  Login
                </Link>
                <Link
                  to='/register'
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                  Register
                </Link>
                <div className='h-6 w-px bg-gray-300'></div>
                <Link
                  to='/shop/login'
                  className='text-gray-600 hover:text-green-600 transition-colors'>
                  Shop Login
                </Link>
                <Link
                  to='/shop/register'
                  className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                  Register Shop
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className='md:hidden text-gray-600 hover:text-green-600 transition-colors'>
            <svg
              className='h-6 w-6'
              fill='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              viewBox='0 0 24 24'
              stroke='currentColor'>
              {isMenuOpen ? (
                <path d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden mt-4 space-y-4'>
            <Link
              to='/'
              className='block text-gray-600 hover:text-green-600 transition-colors'>
              Home
            </Link>
            <Link
              to='/land-leasing'
              className='block text-gray-600 hover:text-green-600 transition-colors'>
              Land Leasing
            </Link>
            <Link
              to='/rental-equipment'
              className='block text-gray-600 hover:text-green-600 transition-colors'>
              Rental Equipment
            </Link>
            <Link
              to='/crop-prediction'
              className='block text-gray-600 hover:text-green-600 transition-colors'>
              Crop Prediction
            </Link>

            {user ? (
              <>
                <Link
                  to='/profile'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Profile
                </Link>
                <Link
                  to='/dashboard'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className='block w-full text-left text-gray-600 hover:text-green-600 transition-colors'>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Login
                </Link>
                <Link
                  to='/register'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Register
                </Link>
                <div className='h-px bg-gray-300'></div>
                <Link
                  to='/shop/login'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Shop Login
                </Link>
                <Link
                  to='/shop/register'
                  className='block text-gray-600 hover:text-green-600 transition-colors'>
                  Register Shop
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 