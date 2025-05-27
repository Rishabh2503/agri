import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

const ShopActivation = () => {
  const navigate = useNavigate();
  const [activationToken, setActivationToken] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/shop/activation`,
        { activation_token: activationToken }
      );

      if (response.data.success) {
        toast.success('Account activated successfully!');
        navigate('/shop/login');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Activation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-green-600 mb-2">
          Activate Your Shop
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Enter the activation token sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Activation Token"
            value={activationToken}
            onChange={(e) => setActivationToken(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            {loading ? 'Activating...' : 'Activate Account'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ShopActivation;