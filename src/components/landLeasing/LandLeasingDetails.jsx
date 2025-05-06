import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaMapMarkerAlt,
  FaRupeeSign,
  FaCalendarAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaWhatsapp,
  FaSeedling,
  FaHandHoldingWater,
  FaFileContract,
  FaLanguage
} from 'react-icons/fa';
import { useCart } from '../../context/CartContext';
import { useLeasingContext } from '../../context/LeasingContext';

const LandLeasingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { leasingOptions } = useLeasingContext();
  const [selectedDuration, setSelectedDuration] = useState('monthly');
  const [showContact, setShowContact] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showSubsidyInfo, setShowSubsidyInfo] = useState(false);

  // Find the selected leasing option by id
  const option = leasingOptions.find(opt => opt.id === parseInt(id));

  const handleAddToCart = () => {
    const cartItem = {
      id: option.id,
      type: 'land',
      title: option.title,
      description: option.description,
      location: option.location,
      price: option.price,
      duration: selectedDuration,
      image: option.img,
      leaseAmount: option.price,
      timestamp: new Date().toISOString()
    };

    addToCart(cartItem);
    navigate('/cart');
  };

  if (!option) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl text-gray-600">Land not found.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 py-12"
    >


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Images */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="space-y-4"
          >
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <img
                src={option.img}
                alt={option.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full">
                <div className="flex items-center">
                  <FaRupeeSign className="mr-1" />
                  <span>{option.price}/month</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-900">{option.title}</h1>
              <p className="mt-2 text-xl text-gray-600">{option.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <FaMapMarkerAlt className="mr-3 text-green-600" />
                <span>{option.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <FaCalendarAlt className="mr-3 text-green-600" />
                <span>{option.duration}</span>
              </div>
            </div>

            {/* Lease Duration Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Select Lease Duration</h3>
              <div className="grid grid-cols-3 gap-4">
                {['monthly', 'quarterly', 'yearly'].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSelectedDuration(duration)}
                    className={`py-2 px-4 rounded-lg border ${selectedDuration === duration
                      ? 'border-green-600 bg-green-50 text-green-600'
                      : 'border-gray-200 hover:border-green-600'
                      }`}
                  >
                    {duration.charAt(0).toUpperCase() + duration.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all transform hover:scale-105"
              >
                Add to Cart
              </button>
              <button
                onClick={() => setShowContact(true)}
                className="w-full border-2 border-green-600 text-green-600 py-3 rounded-xl hover:bg-green-50 transition-all transform hover:scale-105"
              >
                Contact Owner
              </button>
            </div>

            {/* Contact Information */}
            {showContact && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-lg font-semibold mb-4">Owner Contact</h3>
                <div className="space-y-3">
                  <a href={`tel:${option.ownerPhone}`} className="flex items-center text-gray-600 hover:text-green-600">
                    <FaPhoneAlt className="mr-3" />
                    <span>{option.ownerPhone}</span>
                  </a>
                  <a href={`mailto:${option.ownerEmail}`} className="flex items-center text-gray-600 hover:text-green-600">
                    <FaEnvelope className="mr-3" />
                    <span>{option.ownerEmail}</span>
                  </a>
                  <a
                    href={`https://wa.me/${option.ownerPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-green-600"
                  >
                    <FaWhatsapp className="mr-3" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </motion.div>
            )}

            {/* Crop Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Suitable Crops</h3>
              <div className="grid grid-cols-2 gap-4">
                {option.cropTypes.map((crop) => (
                  <div key={crop} className="flex items-center space-x-2">
                    <FaSeedling className="text-green-600" />
                    <span>{crop}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Land Features */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Land Features</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <FaHandHoldingWater className="mr-3 text-green-600" />
                  <span>Water Source: {option.waterSource}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {option.facilities.map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>{facility}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Government Schemes */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Available Subsidies</h3>
              <div className="space-y-3">
                {option.subsidySchemes.map((scheme) => (
                  <div key={scheme} className="flex items-center space-x-2">
                    <span className="text-green-600">•</span>
                    <span>{scheme}</span>
                  </div>
                ))}
                <button
                  onClick={() => setShowSubsidyInfo(true)}
                  className="text-green-600 text-sm hover:underline"
                >
                  Learn more about subsidies
                </button>
              </div>
            </div>

            {/* Required Documents */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
              <div className="space-y-2">
                {option.documents.map((doc) => (
                  <div key={doc} className="flex items-center space-x-2">
                    <FaFileContract className="text-green-600" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Actions */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="space-y-6"
          >
            {/* Availability Calendar */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Availability</h3>
              <p className="text-green-600 font-medium">{option.availability}</p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-sm hover:bg-green-50">
                <FaWhatsapp className="text-green-600" />
                <span>WhatsApp Inquiry</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white p-4 rounded-xl shadow-sm hover:bg-green-50">
                <FaFileContract className="text-green-600" />
                <span>Download Agreement</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Subsidy Information Modal */}
        {showSubsidyInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-xl p-6 max-w-lg">
              <h3 className="text-xl font-bold mb-4">Government Subsidies</h3>
              {/* Add detailed subsidy information here */}
              <button
                onClick={() => setShowSubsidyInfo(false)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default LandLeasingDetails;
