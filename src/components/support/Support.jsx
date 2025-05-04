import React from "react";
import { FaHeadset, FaUserShield, FaRegClock } from "react-icons/fa";

const supportFeatures = [
  {
    icon: <FaHeadset className="w-12 h-12" />,
    title: "24/7 Customer Support",
    description: "Expert assistance available round the clock for all your farming needs",
    highlight: "Always here to help"
  },
  {
    icon: <FaUserShield className="w-12 h-12" />,
    title: "Verified Partners",
    description: "All sellers and buyers are thoroughly verified for your safety and trust",
    highlight: "100% Secure Platform"
  },
  {
    icon: <FaRegClock className="w-12 h-12" />,
    title: "Quick Processing",
    description: "Fast and efficient booking process for all agricultural services",
    highlight: "Save your time"
  }
];

const Support = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Why Choose Krishi Mart
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Experience the best agricultural marketplace with our premium services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {supportFeatures.map((feature, index) => (
            <div
              key={index}
              className="relative group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Accent Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ height: '4px', bottom: 'auto' }} />
              
              {/* Icon Container */}
              <div className="flex justify-center mb-6">
                <div className="text-green-600 p-3 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-4">
                {feature.description}
              </p>

              {/* Highlight Text */}
              <div className="text-center">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-medium">
                  {feature.highlight}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;