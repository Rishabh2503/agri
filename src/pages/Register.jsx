import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError, loading } = useAuth();

  // Form states
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Address states
  const [address, setAddress] = useState({
    address1: "",
    address2: "",
    zipCode: "",
    country: "India",
    city: "",
    addressType: "Home"
  });

  // Error states
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Phone validation
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    // Address validation
    if (!address.address1.trim()) {
      newErrors.address1 = "Address Line 1 is required";
    }
    if (!address.city.trim()) {
      newErrors.city = "City is required";
    }
    if (!address.zipCode) {
      newErrors.zipCode = "Zip Code is required";
    } else if (!/^\d{6}$/.test(address.zipCode)) {
      newErrors.zipCode = "Please enter a valid 6-digit zip code";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }
      
      setAvatar(file);
      setErrors(prev => ({ ...prev, avatar: null }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData
      const formData = new FormData();
      
      // Append user data
      formData.append("name", name.trim());
      formData.append("email", email.trim().toLowerCase());
      formData.append("password", password);
      formData.append("phoneNumber", phoneNumber);
      
      // Append avatar if exists
      if (avatar) {
        formData.append("file", avatar);
      }

      // Create address object and append
      const addressObject = {
        ...address,
        zipCode: Number(address.zipCode),
      };
      formData.append("addresses", JSON.stringify([addressObject]));

      // Store email for activation
      localStorage.setItem('registrationEmail', email.trim().toLowerCase());

      const response = await register(formData);
      
      if (response.success) {
        // Clear form
        setName("");
        setEmail("");
        setPassword("");
        setPhoneNumber("");
        setAddress({
          address1: "",
          address2: "",
          zipCode: "",
          country: "India",
          city: "",
          addressType: "Home"
        });
        setAvatar(null);
        
        // Show success message
        toast.success("Registration successful! Please check your email for the activation link.");
        
        // Show activation instructions
        toast.custom((t) => (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h3 className="font-bold text-lg mb-2">Next Steps:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Check your email ({email}) for the activation link</li>
              <li>Click the activation link in the email</li>
              <li>Once activated, you can login to your account</li>
            </ol>
          </div>
        ), {
          duration: 8000,
          position: "top-center",
        });

        // Redirect to login page after 5 seconds
        setTimeout(() => {
          navigate('/login', { 
            state: { 
              message: 'Registration successful! Please check your email for activation.',
              email: email.trim().toLowerCase()
            }
          });
        }, 5000);
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      
      // Set specific field errors if available
      if (error.errors) {
        setErrors(error.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-8 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-2">Register</h2>
            <p className="text-gray-600">Create a new account</p>
          </div>

          {authError && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
              {authError}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <Input
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<FaUser className="text-green-600" />}
              placeholder="Enter your name"
              error={errors.name}
            />

            {/* Email Input */}
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<FaEnvelope className="text-green-600" />}
              placeholder="Enter your email"
              error={errors.email}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<FaLock className="text-green-600" />}
              placeholder="Enter your password"
              error={errors.password}
            />

            {/* Phone Number Input */}
            <Input
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              icon={<FaPhone className="text-green-600" />}
              placeholder="Enter your phone number"
              error={errors.phoneNumber}
            />

            {/* Address Inputs */}
            <Input
              label="Address Line 1"
              type="text"
              name="address1"
              value={address.address1}
              onChange={handleAddressChange}
              icon={<FaHome className="text-green-600" />}
              placeholder="Enter your address line 1"
              error={errors.address1}
            />

            <Input
              label="Address Line 2"
              type="text"
              name="address2"
              value={address.address2}
              onChange={handleAddressChange}
              icon={<FaHome className="text-green-600" />}
              placeholder="Enter your address line 2"
            />

            <Input
              label="City"
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              icon={<FaMapMarkerAlt className="text-green-600" />}
              placeholder="Enter your city"
              error={errors.city}
            />

            <Input
              label="Zip Code"
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleAddressChange}
              icon={<FaMapMarkerAlt className="text-green-600" />}
              placeholder="Enter your zip code"
              error={errors.zipCode}
            />

            {/* Avatar File Upload */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Upload Avatar (Optional)</label>
              <input 
                type="file" 
                onChange={handleFileInputChange} 
                accept="image/*"
                className="w-full text-green-500" 
              />
              <p className="text-sm text-gray-500 mt-1">Max file size: 5MB</p>
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
