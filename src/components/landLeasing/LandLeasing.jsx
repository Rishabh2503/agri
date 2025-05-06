import React, { useState } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useLeasingContext } from '../../context/LeasingContext';

import landImage from '../../img/background/land.jpg';

const LandLeasing = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { leasingOptions } = useLeasingContext();
  const [searchInput, setSearchInput] = useState('');

  const handleLeasingClick = (id) => {
    navigate(`/land-leasing/${id}`);
  };

  const handleAddToCart = (item) => {
    const cartItem = {
      id: item.vergara,
      type: 'land',
      title: item.title,
      description: item.description,
      location: item.location,
      price: item.price,
      area: item.area,
      duration: item.duration,
      image: item.img,
      leaseAmount: item.price,
      timestamp: new Date().toISOString()
    };

    addToCart(cartItem);
    alert('Added to cart successfully!');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div
        className='relative h-[60vh] bg-cover bg-center bg-no-repeat'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${landImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}>
        <div className='absolute inset-0  bg-opacity-50'>
          <div className='h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              Land Leasing
            </h1>
            <p className='text-xl text-white mb-8 max-w-2xl'>
              Discover the perfect agricultural land for your next venture.
            </p>
            <button className='bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-fit'
              onClick={() => navigate('/land-leasing')}>
              Explore Land Leasing
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='max-w-3xl mx-auto my-8'>
          <div className='flex items-center bg-white rounded-lg shadow-lg p-2 h-12'>
            <FaSearch className='text-gray-400 ml-3' />
            <input
              type='search'
              className='w-full px-4 py-2 outline-none h-full'
              placeholder='Search land options...'
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'>
              Search
            </button>
          </div>
        </div>

        {/* Leasing Options Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {leasingOptions
            .filter((option) =>
              option.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((option) => (
              <div
                key={option.id} // Changed from vergara to id
                className='cursor-pointer group'>
                <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden'>
                  <div className='relative'>
                    <img
                      src={option.img}
                      alt={option.title}
                      className='w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm'>
                      ₹{option.price}/month
                    </div>
                  </div>
                  <div className='p-6'>
                    <h3 className='text-xl font-bold text-gray-900'>
                      {option.title}
                    </h3>
                    <p className='text-gray-600 mb-2'>{option.description}</p>
                    <div className='space-y-2'>
                      <div className='flex items-center text-gray-600'>
                        <FaMapMarkerAlt className='mr-2' />
                        <span>{option.location}</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <span className='mr-2'>Area:</span>
                        <span>{option.area}</span>
                      </div>
                      <div className='flex items-center text-gray-600'>
                        <span className='mr-2'>Duration:</span>
                        <span>{option.duration}</span>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-4'>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(option);
                        }}
                        className='flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300'>
                        Add to Cart
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLeasingClick(option.id); // Changed from vergara to id
                        }}
                        className='flex-1 border border-green-600 text-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition-colors duration-300'>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LandLeasing;
