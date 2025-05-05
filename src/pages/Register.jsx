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
