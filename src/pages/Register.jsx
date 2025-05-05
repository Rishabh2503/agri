import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiMapPin,
  FiImage,
  FiArrowRight,
  FiCheck,
  FiX,
  FiAlertCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const Register = () => {
  // Add animation variants before the state declarations
  const formVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.5 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' },
    blur: { scale: 1, boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)' }
  };

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeOut' }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2, ease: 'easeIn' }
    }
  };

  const { register, error: authError, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showActivationDialog, setShowActivationDialog] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    avatar: null,
    address: {
      address1: '',
      address2: '',
      zipCode: '',
      country: 'India',
      city: '',
      addressType: 'Home'
    }
  });

  const renderStep1 = () => (
    <motion.div
      key='step1'
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-4'>
      <div className='relative'>
        <FiUser className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type='text'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Full Name'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <FiMail className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email Address'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <FiLock className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type={showPassword ? 'text' : 'password'}
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-3 top-3.5 text-gray-400 hover:text-gray-600'>
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className='relative'>
        <FiPhone className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type='tel'
          name='phoneNumber'
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder='Phone Number'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <motion.button
        type='button'
        onClick={nextStep}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className='w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2 font-medium mt-6'>
        <span>Continue</span>
        <FiArrowRight />
      </motion.button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key='step2'
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>
        Address Information
      </h3>

      <div className='relative'>
        <FiMapPin className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type='text'
          name='addresses.country'
          value={formData.addresses[0].country}
          onChange={handleChange}
          placeholder='Country'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <motion.input
          type='text'
          name='addresses.city'
          value={formData.addresses[0].city}
          onChange={handleChange}
          placeholder='City'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <motion.input
          type='text'
          name='addresses.address1'
          value={formData.addresses[0].address1}
          onChange={handleChange}
          placeholder='Address Line 1'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <motion.input
          type='text'
          name='addresses.address2'
          value={formData.addresses[0].address2}
          onChange={handleChange}
          placeholder='Address Line 2 (Optional)'
          whileFocus='focus'
          variants={inputVariants}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='relative'>
        <motion.input
          type='text'
          name='addresses.zipCode'
          value={formData.addresses[0].zipCode}
          onChange={handleChange}
          placeholder='Zip Code'
          required
          whileFocus='focus'
          variants={inputVariants}
          className='w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>

      <div className='flex space-x-3 mt-6'>
        <motion.button
          type='button'
          onClick={prevStep}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='w-1/2 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition font-medium'>
          Back
        </motion.button>
        <motion.button
          type='button'
          onClick={nextStep}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='w-1/2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2 font-medium'>
          <span>Continue</span>
          <FiArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key='step3'
      variants={formVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
      className='space-y-4'>
      <h3 className='text-lg font-semibold text-gray-700 mb-4'>
        Profile Picture
      </h3>
      <div className='relative'>
        <FiImage className='absolute left-3 top-3.5 text-gray-400' />
        <motion.input
          type='file'
          accept='image/*'
          onChange={handleFileChange}
          className='w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all'
        />
      </div>
      {formData.avatar && (
        <div className='flex items-center space-x-2 text-green-500'>
          <FiCheck />
          <span>Image selected: {formData.avatar.name}</span>
        </div>
      )}
      <div className='flex space-x-3 mt-6'>
        <motion.button
          type='button'
          onClick={prevStep}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='w-1/2 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 transition font-medium'>
          Back
        </motion.button>
        <motion.button
          type='submit'
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className='w-1/2 bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center space-x-2 font-medium'
          disabled={loading}>
          <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
          {!loading && <FiCheck />}
        </motion.button>
      </div>
    </motion.div>
  );

  // Activation Dialog Component
  const ActivationDialog = () => (
    <AnimatePresence>
      {showActivationDialog && (
        <motion.div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className='bg-white rounded-lg p-6 max-w-md w-full shadow-xl'
            variants={dialogVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <div className='flex justify-end'>
              <button
                onClick={() => {
                  setShowActivationDialog(false);
                  navigate('/login');
                }}
                className='text-gray-500 hover:text-gray-700'>
                <FiX size={24} />
              </button>
            </div>

            <div className='flex flex-col items-center text-center mb-6'>
              <div className='bg-green-100 p-4 rounded-full mb-4'>
                <FiMail className='text-green-500 w-8 h-8' />
              </div>
              <h3 className='text-2xl font-bold text-green-600 mb-2'>
                Check Your Email
              </h3>
              <p className='text-gray-600 mb-4'>
                We've sent an activation link to{' '}
                <strong>{formData.email}</strong>
              </p>
              <div className='bg-yellow-50 border-l-4 border-yellow-500 p-4 text-left w-full mb-4'>
                <div className='flex'>
                  <div className='flex-shrink-0'>
                    <FiAlertCircle className='h-5 w-5 text-yellow-500' />
                  </div>
                  <div className='ml-3'>
                    <p className='text-sm text-yellow-700'>
                      Please activate your account by clicking the link in the
                      email before logging in.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <motion.button
                onClick={() => {
                  setShowActivationDialog(false);
                  navigate('/login');
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className='w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition font-medium'>
                Go to Login
              </motion.button>

              <p className='text-center text-sm text-gray-500'>
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={() => {
                    // Here you could implement a resend activation email function
                    alert('Resend feature would be implemented here');
                  }}
                  className='text-blue-500 hover:text-blue-600 font-medium'>
                  resend the activation link
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const addressField = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        avatar: file
      }));
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    let isValid = true;

    switch (currentStep) {
      case 1:
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.phoneNumber)
          newErrors.phoneNumber = 'Phone number is required';
        break;
      case 2:
        if (!formData.address.address1)
          newErrors.address1 = 'Address is required';
        if (!formData.address.city) newErrors.city = 'City is required';
        if (!formData.address.zipCode)
          newErrors.zipCode = 'ZIP code is required';
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) {
      return;
    }

    if (step !== 3) {
      nextStep();
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('phoneNumber', formData.phoneNumber);
      formDataToSend.append('addresses', JSON.stringify([formData.address]));

      if (formData.avatar) {
        formDataToSend.append('file', formData.avatar);
      }

      await register(formDataToSend);
      setShowActivationDialog(true);
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  // ... Keep your existing animation variants ...

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 to-blue-300 p-4'>
      <motion.div
        className='bg-white shadow-lg rounded-lg p-8 w-full max-w-md'
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <h2 className='text-3xl font-bold text-center text-green-600 mb-2'>
            Join KrishiMart
          </h2>
          <p className='text-gray-500 text-center mb-6'>
            Create your account in just a few steps
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className='flex items-center justify-between mb-8'>
          {[1, 2, 3].map((stepNumber) => (
            <div
              key={stepNumber}
              className='flex flex-col items-center'>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  stepNumber === step
                    ? 'bg-green-500 text-white'
                    : stepNumber < step
                    ? 'bg-green-200 text-green-700'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                {stepNumber < step ? <FiCheck /> : stepNumber}
              </div>
              <span className='text-xs mt-1 text-gray-500'>
                {stepNumber === 1
                  ? 'Basic Info'
                  : stepNumber === 2
                  ? 'Address'
                  : 'Profile'}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </form>

        {/* Login Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className='mt-6 text-center'>
          <p className='text-gray-600'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-500 hover:text-blue-600 font-medium'>
              Log In
            </Link>
          </p>
        </motion.div>
      </motion.div>

      {/* Activation Dialog */}
      <AnimatePresence>
        {showActivationDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
              <h3 className='text-lg font-bold mb-4'>Activation Required</h3>
              <p className='text-gray-600 mb-4'>
                Please check your email to activate your account.
              </p>
              <button
                onClick={() => setShowActivationDialog(false)}
                className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Register;
