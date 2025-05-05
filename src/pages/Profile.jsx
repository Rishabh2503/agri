// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { t } = useTranslation();
  const { user, updateProfile, loading, error, getUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    address1: '',
    address2: '',
    zipCode: '',
    addressType: 'Home',
  });

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        await getUser();
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        navigate('/login');
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        country: user.address?.country || '',
        city: user.address?.city || '',
        address1: user.address?.address1 || '',
        address2: user.address?.address2 || '',
        zipCode: user.address?.zipCode || '',
        addressType: user.address?.addressType || 'Home',
      });
      if (user.avatar?.url) {
        setAvatarPreview(user.avatar.url);
      }
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(file);
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== 'email') {
        formDataToSend.append(key, formData[key]);
      }
    });

    formDataToSend.append(
      'address',
      JSON.stringify({
        country: formData.country,
        city: formData.city,
        address1: formData.address1,
        address2: formData.address2,
        zipCode: formData.zipCode,
        addressType: formData.addressType,
      })
    );

    if (avatar) {
      formDataToSend.append('avatar', avatar);
    }

    try {
      await updateProfile(formDataToSend);
      setMessage(t('profile.updateSuccess'));
      setStatus('success');
      setIsEditing(false);
      await getUser();
    } catch (err) {
      setMessage(err.response?.data?.message || t('profile.updateFailed'));
      setStatus('error');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600">{t('profile.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Profile Header */}
          <div className="relative bg-green-600 text-white p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white bg-white">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-green-200 flex items-center justify-center">
                      <FaUser className="text-green-600 text-4xl" />
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <label htmlFor="avatar-upload" className="cursor-pointer text-white hover:text-green-200">
                        <FaEdit className="text-xl" />
                      </label>
                      <input
                        type="file"
                        id="avatar-upload"
                        onChange={handleFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="md:ml-6 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-green-100">{user.email}</p>
                <p className="text-green-100">{user.phoneNumber}</p>
              </div>

              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button
                  type="button"
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'outline' : 'primary'}
                  className="bg-white text-green-600 hover:bg-green-50 hover:text-green-700"
                >
                  {isEditing ? t('profile.cancelEdit') : t('profile.editProfile')}
                </Button>
              </div>
            </div>
          </div>

          {message && (
            <div
              className={`mx-8 mt-6 p-4 rounded-lg ${
                status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          {/* Profile Content */}
          <div className="p-8">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left - Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('profile.personalInfo')}</h3>
                  <div className="space-y-4">
                    <Input
                      label={t('profile.name')}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      icon={<FaUser className="text-green-600" />}
                      disabled={!isEditing}
                    />
                    <Input
                      label={t('profile.email')}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      icon={<FaEnvelope className="text-green-600" />}
                      disabled={true}
                    />
                    <Input
                      label={t('profile.phone')}
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      icon={<FaPhone className="text-green-600" />}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Right - Address Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('profile.addressInfo')}</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-2">{t('profile.country')}</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="India">India</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="Canada">Canada</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                      <Input
                        label={t('profile.city')}
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <Input
                      label={t('profile.address1')}
                      type="text"
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      icon={<FaMapMarkerAlt className="text-green-600" />}
                      disabled={!isEditing}
                    />
                    <Input
                      label={t('profile.address2')}
                      type="text"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label={t('profile.zipCode')}
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      <div>
                        <label className="block text-gray-700 mb-2">{t('profile.addressType')}</label>
                        <select
                          name="addressType"
                          value={formData.addressType}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-500"
                        >
                          <option value="Home">{t('profile.home')}</option>
                          <option value="Office">{t('profile.office')}</option>
                          <option value="Other">{t('profile.other')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex justify-end">
                  <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                    {t('profile.saveChanges')}
                  </Button>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
