import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaHome } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
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
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address1: "",
    city: "",
    zipCode: "",
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      address1: "",
      city: "",
      zipCode: "",
    });

    let isValid = true;
    const newErrors = {};

    // Validation logic for each field
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      isValid = false;
    }
    if (!address.address1) {
      newErrors.address1 = "Address Line 1 is required";
      isValid = false;
    }
    if (!address.city) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!address.zipCode) {
      newErrors.zipCode = "Zip Code is required";
      isValid = false;
    }

    setErrors(newErrors);

    if (isValid) {
      try {
        // Create FormData to send the data
        const formData = new FormData();
        if (avatar) {
          formData.append("file", avatar);
        }
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("phoneNumber", phoneNumber);

        // Create address object from the state and append to formData
        const addressObject = {
          ...address,
          zipCode: Number(address.zipCode), // Ensure zip code is a number
        };

        formData.append("addresses", JSON.stringify([addressObject]));

        const response = await register(formData);
        if (response) {
          toast.success("Registration successful! Please check your email for activation link.");
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
        }
      } catch (error) {
        console.error("Registration failed:", error);
        toast.error(error.message || "Registration failed. Please try again.");
      }
    } else {
      toast.error("Please fill out all required fields correctly.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 ">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 p-8 md:p-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-2">Register</h2>
            <p className="text-gray-600">Create a new account</p>
          </div>

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
              <label className="block text-gray-700 mb-2">Upload Avatar</label>
              <input type="file" onChange={handleFileInputChange} className="w-full text-green-500" />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Register'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
