import React from "react";
import { FaUsers, FaStar, FaTractor, FaRupeeSign } from "react-icons/fa";
import { MdAgriculture } from "react-icons/md";
import CountUp from 'react-countup';

const Stats = () => {
  const stats = [
    {
      id: 1,
      icon: <FaUsers className="w-8 h-8 text-green-600" />,
      value: 156789,
      label: "Active Farmers",
      suffix: "+",
      description: "Trusted by farmers across India"
    },
    {
      id: 2,
      icon: <FaTractor className="w-8 h-8 text-green-600" />,
      value: 25000,
      label: "Equipment Listed",
      suffix: "+",
      description: "Wide range of farming equipment"
    },
    {
      id: 3,
      icon: <MdAgriculture className="w-8 h-8 text-green-600" />,
      value: 50000,
      label: "Acres Available",
      suffix: "+",
      description: "Premium agricultural land"
    },
    {
      id: 4,
      icon: <FaStar className="w-8 h-8 text-green-600" />,
      value: 98,
      label: "Customer Satisfaction",
      suffix: "%",
      description: "Rated by verified users"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Farmers Across India
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Empowering agricultural communities with modern solutions and reliable services
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Icon */}
              <div className="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                {stat.icon}
              </div>

              {/* Value */}
              <div className="text-center">
                <div className="flex items-center justify-center text-3xl font-bold text-gray-900 mb-2">
                  <CountUp
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    suffix={stat.suffix}
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="w-12 h-1 bg-green-600 mx-auto mt-4 rounded-full"></div>
            </div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <div className="mt-16 bg-green-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <FaRupeeSign className="inline-block mr-1" />
                <CountUp
                  end={250}
                  duration={2.5}
                  suffix="Cr+"
                />
              </div>
              <p className="text-green-100">Total Transaction Value</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <CountUp
                  end={18}
                  duration={2.5}
                  suffix="+"
                />
              </div>
              <p className="text-green-100">States Covered</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">
                <CountUp
                  end={5000}
                  duration={2.5}
                  suffix="+"
                />
              </div>
              <p className="text-green-100">Villages Reached</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
