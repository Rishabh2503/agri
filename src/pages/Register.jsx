// src/pages/Register.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaHome } from 'react-icons/fa';

const Register = () => {
  const { t } = useTranslation();
  const { register, error: authError, loading } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    country: 'India',
    city: '',
    address1: '',
    address2: '',
    zipCode: '',
    addressType: 'Home',
  });
  
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
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
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('validation.nameRequired');
    }
    
    if (!formData.email) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('validation.passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('validation.passwordLength');
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('validation.passwordMatch');
    }
    
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = t('validation.phoneRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.country.trim()) {
      newErrors.country = t('validation.countryRequired');
    }
    
    if (!formData.city.trim()) {
      newErrors.city = t('validation.cityRequired');
    }
    
    if (!formData.address1.trim()) {
      newErrors.address1 = t('validation.addressRequired');
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = t('validation.zipRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  
  const prevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 1) {
      nextStep();
      return;
    }
    
    if (validateStep2()) {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (key !== 'confirmPassword') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add avatar if exists
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }
      
      try {
        await register(formDataToSend);
        navigate('/activation'); // Redirect to activation page after successful registration
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-12">
      <motion.div 
        className="-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left side - Form */}
        <div className="w-full md:w-3/5 p-8 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-2">{t('register.title')}</h2>
            <p className="text-gray-600">{t('register.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <motion.div
                key="step1"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-6">
                  <Input
                    label={t('register.name')}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    icon={<FaUser className="text-green-600" />}
                    placeholder={t('register.namePlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.email')}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    icon={<FaEnvelope className="text-green-600" />}
                    placeholder={t('register.emailPlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.password')}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    icon={<FaLock className="text-green-600" />}
                    placeholder={t('register.passwordPlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.confirmPassword')}
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    icon={<FaLock className="text-green-600" />}
                    placeholder={t('register.confirmPasswordPlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.phone')}
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                    icon={<FaPhone className="text-green-600" />}
                    placeholder={t('register.phonePlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">{t('register.avatar')}</label>
                  <div className="flex items-center">
                    <input 
                      type="file" 
                      onChange={handleFileChange}
                      className="hidden" 
                      id="avatar-upload" 
                      accept="image/*" 
                    />
                    <label 
                      htmlFor="avatar-upload" 
                      className="cursor-pointer bg-green-50 border border-green-200 rounded-lg px-4 py-2 text-green-700 hover:bg-green-100 transition"
                    >
                      {t('register.chooseFile')}
                    </label>
                    {avatarPreview && (
                      <div className="ml-4">
                        <img 
                          src={avatarPreview} 
                          alt="Avatar Preview" 
                          className="w-12 h-12 rounded-full object-cover border-2 border-green-500" 
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                <Button type="button" onClick={nextStep} fullWidth>
                  {t('register.next')}
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                variants={formVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">{t('register.country')}</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.country ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-green-500`}
                  >
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                  </select>
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
                </div>

                <div className="mb-6">
                  <Input
                    label={t('register.city')}
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    error={errors.city}
                    icon={<FaMapMarkerAlt className="text-green-600" />}
                    placeholder={t('register.cityPlaceholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.address1')}
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                    error={errors.address1}
                    icon={<FaHome className="text-green-600" />}
                    placeholder={t('register.address1Placeholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.address2')}
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                    error={errors.address2}
                    icon={<FaHome className="text-green-600" />}
                    placeholder={t('register.address2Placeholder')}
                  />
                </div>
                
                <div className="mb-6">
                  <Input
                    label={t('register.zipCode')}
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    error={errors.zipCode}
                    placeholder={t('register.zipCodePlaceholder')}
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-gray-700 mb-2">{t('register.addressType')}</label>
                  <div className="flex space-x-4">
                    {['Home', 'Office', 'Other'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="radio"
                          id={type}
                          name="addressType"
                          value={type}
                          checked={formData.addressType === type}
                          onChange={handleChange}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <label htmlFor={type} className="ml-2 text-gray-700">
                          {t(`register.${type.toLowerCase()}`)}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button type="button" onClick={prevStep} variant="outline" className="w-1/2">
                    {t('register.back')}
                  </Button>
                  <Button type="submit" className="w-1/2" loading={loading}>
                    {t('register.submit')}
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {t('register.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-green-600 font-medium hover:text-green-700">
                {t('register.signIn')}
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right side - Image/Info */}
        <div className="hidden md:block md:w-2/5 bg-green-600 p-10 text-white flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-6">{t('register.welcomeTitle')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 mt-1">✓</span>
                <span>{t('register.benefit1')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">✓</span>
                <span>{t('register.benefit2')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 mt-1">✓</span>
                <span>{t('register.benefit3')}</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-auto">
            <p className="text-green-200 text-sm">
              {t('register.termsText')}{' '}
              <Link to="/terms" className="underline hover:text-white">
                {t('register.termsLink')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;