import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import landImage from '../../img/background/land.jpg';
import { toast } from 'react-hot-toast';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

const LandLeasing = () => {
  const [lands, setLands] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLands();
  }, []);

  const fetchLands = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${BASE_URL}/product/get-all-products`);
      // Filter only land leasing products
      const landProducts = response.data.products.filter(
        product => product.category === 'Land'
      );
      setLands(landProducts);
    } catch (err) {
      setError('Failed to fetch land listings');
      toast.error('Error loading land listings');
    } finally {
      setLoading(false);
    }
  };

  const handleLandClick = (id) => {
    navigate(`/land-leasing/${id}`);
  };

  const filteredLands = lands.filter(land => 
    land.name.toLowerCase().includes(searchInput.toLowerCase()) ||
    land.description.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${landImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Land Leasing
              </h1>
              <p className="text-xl text-white mb-8 max-w-2xl">
                Discover the perfect agricultural land for your next venture.
              </p>
              <button 
                onClick={() => navigate('/land-leasing/list')}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-fit"
              >
                List Your Land
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto my-8">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2 h-12">
            <FaSearch className="text-gray-400 ml-3" />
            <input
              type="search"
              className="w-full px-4 py-2 outline-none h-full"
              placeholder="Search land listings..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-10">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchLands}
              className="mt-4 text-green-600 hover:text-green-700"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Land Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLands.map(land => (
            <motion.div
              key={land._id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="cursor-pointer group"
              onClick={() => handleLandClick(land._id)}
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={land.images[0]?.url || '/default-land-image.jpg'}
                    alt={land.name}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    ₹{land.discountPrice}/acre
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {land.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {land.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{land.shop?.address || 'Location not specified'}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLandClick(land._id);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredLands.length === 0 && !loading && !error && (
          <div className="text-center py-10">
            <p className="text-gray-600">No land listings found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandLeasing;
