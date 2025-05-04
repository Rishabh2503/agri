import React from "react";
import { FaTractor, FaWarehouse, FaHandshake, FaTools } from "react-icons/fa";
import { MdAgriculture, MdLocationOn } from "react-icons/md";

const serviceCategories = [
  {
    icon: <FaTractor className="w-8 h-8" />,
    title: "Equipment Rental",
    description: "Access modern farming equipment without heavy investment",
    features: ["Wide range of machinery", "Flexible rental periods", "Maintenance included"]
  },
  {
    icon: <MdAgriculture className="w-8 h-8" />,
    title: "Land Leasing",
    description: "Find the perfect agricultural land for your farming needs",
    features: ["Verified landowners", "Legal documentation support", "Various land types"]
  },
  {
    icon: <FaHandshake className="w-8 h-8" />,
    title: "Partner Support",
    description: "Expert guidance throughout your farming journey",
    features: ["24/7 assistance", "Agricultural experts", "Technical support"]
  },
  {
    icon: <FaWarehouse className="w-8 h-8" />,
    title: "Storage Solutions",
    description: "Modern storage facilities for your crops and equipment",
    features: ["Climate controlled", "Secure facilities", "Flexible capacity"]
  }
];

const Services = () => {
  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Comprehensive Agricultural Solutions
          </h2>
          <p className="text-xl text-gray-600">
            Krishi Mart provides end-to-end services for modern farming needs across India
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {serviceCategories.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Service Header */}
              <div className="flex items-center mb-6">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold ml-4 text-gray-900">
                  {service.title}
                </h3>
              </div>

              {/* Service Description */}
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-green-600 rounded-2xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Farming Experience?
            </h3>
            <p className="mb-8 text-green-100">
              Join thousands of farmers who have already enhanced their agricultural productivity with Krishi Mart
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors duration-300">
                Explore Equipment
              </button>
              <button className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors duration-300">
                Find Land
              </button>
            </div>
          </div>
        </div>

        {/* Location Coverage */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center text-gray-600 mb-4">
            <MdLocationOn className="w-6 h-6 mr-2 text-green-600" />
            <span>Available across major agricultural regions in India</span>
          </div>
          <p className="text-sm text-gray-500">
            Maharashtra • Punjab • Haryana • Uttar Pradesh • Gujarat • Karnataka • More
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;