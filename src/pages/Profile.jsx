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
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
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
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { state: { from: '/profile' } });
    }

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
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user, loading, isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    // Add your update profile logic here
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!user) return null;

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
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt={formData.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-green-200 flex items-center justify-center">
                      <FaUser className="text-green-600 text-4xl" />
                    </div>
                  )}
                  {isEditing && (
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 cursor-pointer">
                      <FaEdit className="text-white text-xl" />
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="md:ml-6 text-center md:text-left">
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-green-100">{user.email}</p>
              </div>

              <div className="mt-4 md:mt-0 md:ml-auto">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-white text-green-600 hover:bg-green-50"
                >
                  {isEditing ? t('Cancel') : t('Edit Profile')}
                </Button>
              </div>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {t('Personal Information')}
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label={t('Name')}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<FaUser className="text-green-600" />}
                    />
                    <Input
                      label={t('Email')}
                      name="email"
                      value={formData.email}
                      disabled={true}
                      icon={<FaEnvelope className="text-green-600" />}
                    />
                    <Input
                      label={t('Phone')}
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<FaPhone className="text-green-600" />}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {t('Address Information')}
                  </h3>
                  <div className="space-y-4">
                    <Input
                      label={t('Address')}
                      name="address1"
                      value={formData.address1}
                      onChange={handleChange}
                      disabled={!isEditing}
                      icon={<FaMapMarkerAlt className="text-green-600" />}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label={t('City')}
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                      <Input
                        label={t('Country')}
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <Input
                      label={t('Postal Code')}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-6">
                  <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
                    {t('Save Changes')}
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
