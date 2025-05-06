import React, { useState } from 'react';
import { FaHeart, FaMapMarkerAlt, FaStar, FaRupeeSign } from 'react-icons/fa';

const FavoriteItems = () => {
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'Premium Tractor',
      type: 'Equipment',
      image: 'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80&w=1000',
      price: 1200,
      rating: 4.5,
      location: 'Karnataka',
      reviews: 128
    },
    {
      id: 2,
      title: 'Fertile Farmland',
      type: 'Land',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
      price: 5000,
      rating: 4.8,
      location: 'Punjab',
      reviews: 89
    }
  ]);

  const removeFromFavorites = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Favorites</h1>

        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <FaHeart className="mx-auto text-4xl text-gray-300 mb-4" />
            <p className="text-gray-500">No favorites yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeFromFavorites(item.id)}
                    className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <FaHeart className="text-red-500" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-gray-500">{item.type}</span>
                    </div>
                    <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-green-700 font-medium">{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{item.location}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-green-600 font-semibold">
                      <FaRupeeSign className="mr-1" />
                      {item.price}/day
                    </div>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteItems;