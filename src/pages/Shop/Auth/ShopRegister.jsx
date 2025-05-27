import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaStore,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const BASE_URL = 'https://krishimart-back.onrender.com/api/v2';

const ShopRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    zipCode: ''
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        formPayload.append(key, formData[key]);
      });
      if (avatar) {
        formPayload.append('avatar', avatar);
      }

      const response = await axios.post(
        `${BASE_URL}/shop/create-shop`,
        formPayload,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.success) {
        toast.success(
          'Registration successful! Please check your email for activation.'
        );
        navigate('/shop/activation');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-12'>
      <motion.div
        className='bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <div className='p-8'>
          <h2 className='text-3xl font-bold text-center text-green-600 mb-2'>
            Create Seller Account
          </h2>
          <p className='text-gray-500 text-center mb-8'>
            Start selling on our platform
          </p>

          <form
            onSubmit={handleSubmit}
            className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Store Information */}
              <div className='space-y-6'>
                <div className='relative'>
                  <FaStore className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Store Name'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>

                <div className='relative'>
                  <FaEnvelope className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='email'
                    placeholder='Email Address'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>

                <div className='relative'>
                  <FaLock className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='password'
                    placeholder='Password'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className='space-y-6'>
                <div className='relative'>
                  <FaPhone className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='tel'
                    placeholder='Phone Number'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        phoneNumber: e.target.value
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>

                <div className='relative'>
                  <FaMapMarkerAlt className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='Address'
                    value={formData.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: e.target.value
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>

                <div className='relative'>
                  <FaMapMarkerAlt className='absolute left-3 top-3.5 text-gray-400' />
                  <input
                    type='text'
                    placeholder='ZIP Code'
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500'
                    required
                  />
                </div>
              </div>
            </div>

            {/* Avatar Upload */}
            <div className='space-y-4'>
              <label className='block text-sm font-medium text-gray-700'>
                Store Logo/Avatar
              </label>
              <div className='flex items-center space-x-6'>
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt='Avatar Preview'
                    className='w-20 h-20 rounded-full object-cover'
                  />
                )}
                <input
                  type='file'
                  onChange={handleFileChange}
                  accept='image/*'
                  className='w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
                />
              </div>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300'>
              {loading ? 'Creating Account...' : 'Create Seller Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ShopRegister;
