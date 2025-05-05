import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import tractorImage from '../../img/background/tractor.jpg';

const RentalEquipment = () => {
  const [equipments, setEquipments] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [priceRange, setPriceRange] = useState(15000);
  const navigate = useNavigate();

  // Using the same sample data from Dashboard
  const sampleEquipments = [
    {
      id: 1,
      title: 'Mahindra 575 DI Tractor',
      location: 'Ludhiana, Punjab',
      daily_rental: 2500,
      image:
        'https://images.unsplash.com/photo-1605338198618-d6c99f5a5e96?q=80',
      specifications: {
        model: '575 DI XP Plus',
        horsepower: '47 HP',
        condition: 'Excellent'
      },
      owner: 'Singh Agro Services',
      rating: 4.8,
      reviews: 156,
      available: true,
      featured: true
    },
    {
      id: 2,
      title: 'Swaraj 744 FE Tractor',
      location: 'Karnal, Haryana',
      daily_rental: 2200,
      image:
        'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80',
      specifications: {
        model: '744 FE',
        horsepower: '44 HP',
        condition: 'Good'
      },
      owner: 'Haryana Tractors',
      rating: 4.6,
      reviews: 98,
      available: true,
      featured: false
    },
    {
      id: 3,
      title: 'New Holland Combine Harvester',
      location: 'Bathinda, Punjab',
      daily_rental: 15000,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80',
      specifications: {
        model: 'TC5.30',
        width: '14 feet',
        condition: 'Excellent'
      },
      owner: 'Modern Agro Equipment',
      rating: 4.9,
      reviews: 87,
      available: true,
      featured: true
    },
    {
      id: 4,
      title: 'Sonalika Rotavator',
      location: 'Nashik, Maharashtra',
      daily_rental: 1200,
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80',
      specifications: {
        width: '7 feet',
        blades: '48',
        condition: 'New'
      },
      owner: 'Maharashtra Agro Tools',
      rating: 4.5,
      reviews: 45,
      available: true,
      featured: false
    },
    {
      id: 5,
      title: 'John Deere Seed Drill',
      location: 'Guntur, Andhra Pradesh',
      daily_rental: 1800,
      image:
        'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80',
      specifications: {
        rows: '15',
        type: 'Zero Till',
        condition: 'Good'
      },
      owner: 'AP Agri Solutions',
      rating: 4.7,
      reviews: 67,
      available: true,
      featured: false
    },
    {
      id: 6,
      title: 'Massey Ferguson Laser Leveler',
      location: 'Meerut, Uttar Pradesh',
      daily_rental: 3500,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80',
      specifications: {
        accuracy: '±2mm',
        range: '1000m',
        condition: 'Excellent'
      },
      owner: 'UP Farm Equipment',
      rating: 4.8,
      reviews: 92,
      available: true,
      featured: true
    },
    {
      id: 7,
      title: 'VST Power Weeder',
      location: 'Coimbatore, Tamil Nadu',
      daily_rental: 800,
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80',
      specifications: {
        engine: '160cc',
        width: '600mm',
        condition: 'Good'
      },
      owner: 'TN Agro Services',
      rating: 4.4,
      reviews: 34,
      available: true,
      featured: false
    },
    {
      id: 8,
      title: 'Kubota Rice Transplanter',
      location: 'Raipur, Chhattisgarh',
      daily_rental: 4500,
      image:
        'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80',
      specifications: {
        rows: '8',
        type: 'Riding',
        condition: 'Excellent'
      },
      owner: 'Chhattisgarh Agri Tools',
      rating: 4.9,
      reviews: 78,
      available: true,
      featured: true
    },
    {
      id: 9,
      title: 'TAFE Sprayer',
      location: 'Belgaum, Karnataka',
      daily_rental: 900,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80',
      specifications: {
        capacity: '400L',
        type: 'Boom',
        condition: 'Good'
      },
      owner: 'Karnataka Farm Solutions',
      rating: 4.6,
      reviews: 52,
      available: true,
      featured: false
    }
  ];

  useEffect(() => {
    setEquipments(sampleEquipments);
  }, []);

  const handleEquipmentClick = (equipmentId) => {
    navigate(`/rental-equipment/${equipmentId}`);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hero Section */}
      <div
        className='relative h-[60vh] bg-cover bg-center'
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${tractorImage})`
        }}>
        <div className='absolute inset-0  bg-opacity-50'>
          <div className='h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6'>
              Rental Equipment
            </h1>
            <p className='text-xl text-white mb-8 max-w-2xl'>
              Find the perfect agricultural equipment for rent. Cultivate
              success with our verified equipment listings across India.
            </p>
            <button className='bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-fit'>
              Explore Rental Equipment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-black mb-2'>
              Agricultural Equipment Rental
            </h1>
            <p className='text-xl text-gray-500'>
              Find and rent the best farming equipment for your needs
            </p>
          </div>

          {/* Search Bar */}
          <div className='max-w-3xl mx-auto my-8'>
            <div className='flex items-center bg-white rounded-lg shadow-lg p-2 h-12'>
              <FaSearch className='text-gray-400 ml-3' />
              <input
                type='search'
                className='w-full px-4 py-2 outline-none h-full'
                placeholder='Search equipment...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button className='bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors'>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className='flex gap-8'>
          {/* Filters Sidebar */}
          {/* <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Filters
                        </h3>
                        <div className="mb-6">
                            <label className="text-sm text-gray-600 block mb-2">
                                Price per day (₹)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="15000"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-gray-600 mt-2">
                                <span>₹0</span>
                                <span>₹{priceRange}</span>
                            </div>
                        </div>

                    </div> */}

          {/* Equipment Grid */}
          <div className='flex-1'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {equipments
                .filter(
                  (equipment) =>
                    equipment.title
                      .toLowerCase()
                      .includes(searchInput.toLowerCase()) &&
                    equipment.daily_rental <= priceRange
                )
                .map((equipment) => (
                  <div
                    key={equipment.id}
                    onClick={() => handleEquipmentClick(equipment.id)}
                    className='cursor-pointer'>
                    <div className='bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group'>
                      {/* Image Container */}
                      <div className='relative'>
                        <img
                          src={equipment.image}
                          alt={equipment.title}
                          className='w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300'
                        />
                        {equipment.featured && (
                          <div className='absolute top-4 left-4'>
                            <span className='bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium'>
                              Featured
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className='p-6'>
                        <div className='flex justify-between items-start mb-2'>
                          <h3 className='text-xl font-bold text-gray-900'>
                            {equipment.title}
                          </h3>
                          <div className='flex items-center bg-green-50 px-2 py-1 rounded-lg'>
                            <FaStar className='text-yellow-400 mr-1' />
                            <span>{equipment.rating}</span>
                          </div>
                        </div>

                        <div className='flex items-center text-gray-600 mb-4'>
                          <FaMapMarkerAlt className='mr-2' />
                          <span>{equipment.location}</span>
                        </div>

                        <div className='flex justify-between items-center'>
                          <div className='text-green-600 font-bold text-xl'>
                            ₹{equipment.daily_rental}/day
                          </div>
                          <button
                            className='bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEquipmentClick(equipment.id);
                            }}>
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalEquipment;
