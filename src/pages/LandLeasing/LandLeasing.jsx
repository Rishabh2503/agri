import React, { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import landImage from '../../img/background/land.jpg';

const LandLeasing = () => {
  const [leasingOptions, setLeasingOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  // Sample leasing options with vergara instead of id
  const sampleLeasingOptions = [
    {
      vergara: 1,
      img:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
      title: 'Agricultural Land',
      description: 'Lease fertile farmland for seasonal crops',
      location: 'Karnataka'
    },
    {
      vergara: 2,
      img:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000',
      title: 'Orchard Land',
      description: 'Perfect for fruit cultivation and long-term farming',
      location: 'Punjab'
    },
    {
      vergara: 3,
      img:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
      title: 'Paddy Fields',
      description: 'Specialized land for rice cultivation',
      location: 'West Bengal'
    },
    {
      vergara: 4,
      img:
        'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80&w=1000',
      title: 'Greenhouse Plots',
      description: 'Protected cultivation areas for high-value crops',
      location: 'Maharashtra'
    },
    {
      vergara: 5,
      img:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000',
      title: 'Mixed Farming Land',
      description: 'Suitable for diverse agricultural activities',
      location: 'Rajasthan'
    },
    {
      vergara: 6,
      img:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
      title: 'Plantation Land',
      description: 'Ideal for commercial crop cultivation',
      location: 'Kerala'
    }
  ];

  useEffect(() => {
    setLeasingOptions(sampleLeasingOptions);
  }, []);

  const handleLeasingClick = vergara => {
    // For debugging purposes you can log the vergara:
    console.log('Navigating to leasing details for vergara:', vergara);
    navigate(`/land-leasing/${vergara}`);
  };

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
        <div className="absolute inset-0 ">
          <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Land Leasing
            </h1>
            <p className="text-xl text-white mb-8 max-w-2xl">
              Discover the perfect agricultural land for your next venture.
            </p>
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-fit">
              Explore Land Leasing
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto my-8">
          <div className="flex items-center bg-white rounded-lg shadow-lg p-2 h-12">
            <FaSearch className="text-gray-400 ml-3" />
            <input
              type="search"
              className="w-full px-4 py-2 outline-none h-full"
              placeholder="Search land options..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
            />
            <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Leasing Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leasingOptions
            .filter(option =>
              option.title.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map(option =>
              <div
                key={option.vergara}
                onClick={() => handleLeasingClick(option.vergara)}
                className="cursor-pointer group"
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={option.img}
                      alt={option.title}
                      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {option.description}
                    </p>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>
                        {option.location}
                      </span>
                    </div>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleLeasingClick(option.vergara);
                      }}
                      className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default LandLeasing;
