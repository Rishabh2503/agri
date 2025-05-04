import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import { getEquips, getEquipsList } from '../../api/equiment';
import { DateRangePicker } from 'react-date-range';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { FaSearch, FaMicrophone, FaMapMarkerAlt, FaTractor, FaRupeeSign, FaFilter, FaStar, FaCalendarAlt } from 'react-icons/fa';
import { MdAgriculture, MdVerified } from 'react-icons/md';
import { BiArea } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import Dropdown from '../../components/dropdown/Dropdown';


const Dashboard = () => {
    // State variables
    const [activeTab, setActiveTab] = useState('equipment');
    const [searchInput, setSearchInput] = useState('');
    const [change, setChange] = useState(false);
    const [perDay, setPerDay] = useState(50000);
    const [visible1, setVisible1] = useState(false);
    const [equipments, setEquipments] = useState([]);
    const [equipList, setEquipList] = useState([]);

    // Voice Recognition Setup
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Date Range Selection
    const [dateRange, setDateRange] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const selectionRange = {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        key: 'selection'
    };

    // Handle date selection
    const handleSelect = (ranges) => {
        setDateRange(ranges.selection);
    };

    // Sample land listings data (you can move this to API)
    const landListings = [
        {
            id: 1,
            title: "Fertile Farmland",
            location: "Karnataka",
            area: "25 Acres",
            daily_rental: 45000,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef"
        },
        {
            id: 2,
            title: "Paddy Fields",
            location: "Punjab",
            area: "30 Acres",
            daily_rental: 38000,
            image: "https://images.unsplash.com/photo-1589328956162-4e2f54b36881"
        },
        {
            id: 3,
            title: "Organic Farm Plot",
            location: "Maharashtra",
            area: "20 Acres",
            daily_rental: 42000,
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399"
        }
        // Add more land listings as needed
    ];

    // Enhanced sample equipment data with detailed Indian agricultural context
    const sampleEquipments = [
        {
            id: 1,
            title: "Mahindra 575 DI Tractor",
            location: "Ludhiana, Punjab",
            daily_rental: 2500,
            image: "https://images.unsplash.com/photo-1605338198618-d6c99f5a5e96?q=80",
            specifications: {
                model: "575 DI XP Plus",
                horsepower: "47 HP",
                condition: "Excellent"
            },
            owner: "Singh Agro Services",
            rating: 4.8,
            reviews: 156,
            available: true,
            featured: true
        },
        {
            id: 2,
            title: "Swaraj 744 FE Tractor",
            location: "Karnal, Haryana",
            daily_rental: 2200,
            image: "https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80",
            specifications: {
                model: "744 FE",
                horsepower: "44 HP",
                condition: "Good"
            },
            owner: "Haryana Tractors",
            rating: 4.6,
            reviews: 98,
            available: true,
            featured: false
        },
        {
            id: 3,
            title: "New Holland Combine Harvester",
            location: "Bathinda, Punjab",
            daily_rental: 15000,
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80",
            specifications: {
                model: "TC5.30",
                width: "14 feet",
                condition: "Excellent"
            },
            owner: "Modern Agro Equipment",
            rating: 4.9,
            reviews: 87,
            available: true,
            featured: true
        },
        {
            id: 4,
            title: "Sonalika Rotavator",
            location: "Nashik, Maharashtra",
            daily_rental: 1200,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80",
            specifications: {
                width: "7 feet",
                blades: "48",
                condition: "New"
            },
            owner: "Maharashtra Agro Tools",
            rating: 4.5,
            reviews: 45,
            available: true,
            featured: false
        },
        {
            id: 5,
            title: "John Deere Seed Drill",
            location: "Guntur, Andhra Pradesh",
            daily_rental: 1800,
            image: "https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80",
            specifications: {
                rows: "15",
                type: "Zero Till",
                condition: "Good"
            },
            owner: "AP Agri Solutions",
            rating: 4.7,
            reviews: 67,
            available: true,
            featured: false
        },
        {
            id: 6,
            title: "Massey Ferguson Laser Leveler",
            location: "Meerut, Uttar Pradesh",
            daily_rental: 3500,
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80",
            specifications: {
                accuracy: "±2mm",
                range: "1000m",
                condition: "Excellent"
            },
            owner: "UP Farm Equipment",
            rating: 4.8,
            reviews: 92,
            available: true,
            featured: true
        },
        {
            id: 7,
            title: "VST Power Weeder",
            location: "Coimbatore, Tamil Nadu",
            daily_rental: 800,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80",
            specifications: {
                engine: "160cc",
                width: "600mm",
                condition: "Good"
            },
            owner: "TN Agro Services",
            rating: 4.4,
            reviews: 34,
            available: true,
            featured: false
        },
        {
            id: 8,
            title: "Kubota Rice Transplanter",
            location: "Raipur, Chhattisgarh",
            daily_rental: 4500,
            image: "https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80",
            specifications: {
                rows: "8",
                type: "Riding",
                condition: "Excellent"
            },
            owner: "Chhattisgarh Agri Tools",
            rating: 4.9,
            reviews: 78,
            available: true,
            featured: true
        },
        {
            id: 9,
            title: "TAFE Sprayer",
            location: "Belgaum, Karnataka",
            daily_rental: 900,
            image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80",
            specifications: {
                capacity: "400L",
                type: "Boom",
                condition: "Good"
            },
            owner: "Karnataka Farm Solutions",
            rating: 4.6,
            reviews: 52,
            available: true,
            featured: false
        }
    ];

    // Enhanced Equipment Card Component
    const EquipmentCard = ({ equipment }) => (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* Image Container */}
            <div className="relative">
                <img 
                    src={equipment.image} 
                    alt={equipment.title}
                    className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                {equipment.featured && (
                    <div className="absolute top-4 left-4">
                        <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                            <FaStar className="mr-1" /> Featured
                        </span>
                    </div>
                )}
                {equipment.available && (
                    <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Available Now
                    </span>
                )}
            </div>

            {/* Content Container */}
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {equipment.title}
                        </h3>
                        <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-green-600" />
                            <span>{equipment.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center bg-green-50 px-3 py-1 rounded-lg">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-semibold text-green-700">{equipment.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({equipment.reviews})</span>
                    </div>
                </div>

                {/* Specifications */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Specifications</h4>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(equipment.specifications).map(([key, value]) => (
                            <div key={key} className="flex items-center text-sm">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                <span className="text-gray-600 capitalize">{key}:</span>
                                <span className="ml-1 font-medium text-gray-900">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Owner Info */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <MdVerified className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-900 font-medium">{equipment.owner}</p>
                            <p className="text-xs text-gray-500">Verified Seller</p>
                        </div>
                    </div>
                </div>

                {/* Price and Action */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div className="text-green-600 font-bold text-xl">
                            ₹{equipment.daily_rental.toLocaleString()}/day
                        </div>
                        <div className="text-gray-500 text-sm flex items-center">
                            <FaCalendarAlt className="mr-1" /> Immediate Booking
                        </div>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center group">
                        Book Now
                        <BsArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );

    // ... keeping all existing useEffect hooks ...

    useEffect(() => {
        if (transcript) {
            setSearchInput(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const equipmentsData = await getEquips();
                const equipListData = await getEquipsList();
                setEquipments(equipmentsData.length ? equipmentsData : sampleEquipments);
                setEquipList(equipListData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setEquipments(sampleEquipments); // Fallback to sample data
            }
        };
        fetchData();
    }, [change]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section with Enhanced Design */}
            <div className="bg-gradient-to-r from-green-600 via-green-500 to-green-600 py-8">
                <div className="max-w-full  px-4 sm:px-6 lg:px-4">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold text-white mb-6">
                            Krishi Mart Marketplace
                        </h1>
                        <p className="text-xl text-green-50 max-w-2xl mx-auto">
                            India's largest platform for agricultural equipment rentals and land leasing
                        </p>
                    </div>

                    {/* Enhanced Search Bar */}
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center bg-white rounded-xl shadow-lg p-2">
                            <div className="flex-1 flex items-center">
                                <FaSearch className="text-gray-400 ml-4 text-xl" />
                                <input
                                    type="search"
                                    className="w-full px-4 py-3 outline-none text-lg"
                                    placeholder="Search for equipment or land..."
                                    value={searchInput}
                                    onChange={(e) => {setSearchInput(e.target.value); setChange(!change)}}
                                />
                            </div>
                            <button 
                                onClick={SpeechRecognition.startListening}
                                className="p-3 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                                title="Voice Search"
                            >
                                <FaMicrophone className="w-5 h-5" />
                            </button>
                            <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors ml-2 font-medium">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Enhanced Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-2 inline-flex">
                        <button
                            className={`px-8 py-3 rounded-lg transition-all duration-300 flex items-center ${
                                activeTab === 'equipment' 
                                    ? 'bg-green-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('equipment')}
                        >
                            <FaTractor className={`mr-2 ${activeTab === 'equipment' ? 'text-white' : 'text-green-600'}`} />
                            Equipment Rental
                        </button>
                        <button
                            className={`px-8 py-3 rounded-lg transition-all duration-300 flex items-center ml-2 ${
                                activeTab === 'land' 
                                    ? 'bg-green-600 text-white shadow-md' 
                                    : 'text-gray-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveTab('land')}
                        >
                            <MdAgriculture className={`mr-2 ${activeTab === 'land' ? 'text-white' : 'text-green-600'}`} />
                            Land Leasing
                        </button>
                    </div>
                </div>

                <div className="flex gap-8">
                    {/* Filters Sidebar */}
                    <div className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                <FaFilter className="mr-2" />
                                Filters
                            </h3>
                            
                            {/* Categories */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">Categories</h4>
                                {equipList?.map(list => (
                                    <Dropdown key={list.id} title={list.name} />
                                ))}
                            </div>

                            {/* Price Range */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">Price Range</h4>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm text-gray-600">Price per day</label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="150000"
                                            value={perDay}
                                            onChange={(e) => {setPerDay(e.target.value); setChange(!change)}}
                                            className="w-full h-2 bg-green-200 rounded-lg appearance-none cursor-pointer"
                                        />
                                        <div className="flex justify-between text-sm text-gray-600">
                                            <span>₹0</span>
                                            <span>₹{perDay}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Range */}
                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">Availability</h4>
                                <button 
                                    onClick={() => setVisible1(!visible1)}
                                    className="w-full px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                                >
                                    Select Dates
                                </button>
                                {visible1 && (
                                    <div className="absolute z-10 mt-2">
                                        <DateRangePicker
                                            ranges={[selectionRange]}
                                            minDate={new Date()}
                                            rangeColors={["#16a34a"]}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Results Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activeTab === 'equipment' ? (
                                // Equipment Cards
                                equipments
                                    ?.filter(equipment => 
                                        equipment?.title?.toLowerCase().includes(searchInput.toLowerCase()) &&
                                        equipment?.daily_rental <= perDay
                                    )
                                    .map(equipment => (
                                        <EquipmentCard key={equipment.id} equipment={equipment} />
                                    ))
                            ) : (
                                // Land Listing Cards
                                landListings
                                    .filter(land => 
                                        land?.title?.toLowerCase().includes(searchInput.toLowerCase()) &&
                                        land?.daily_rental <= perDay
                                    )
                                    .map(land => (
                                        <div key={land.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                            <img 
                                                src={land.image} 
                                                alt={land.title}
                                                className="w-full h-48 object-cover"
                                            />
                                            <div className="p-4">
                                                <h3 className="text-lg font-semibold text-gray-900">{land.title}</h3>
                                                <div className="flex items-center text-gray-600 mt-2">
                                                    <FaMapMarkerAlt className="mr-1" />
                                                    <span>{land.location}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="text-green-600 font-semibold">
                                                        <FaRupeeSign className="inline" />
                                                        {land.daily_rental}/acre
                                                    </div>
                                                    <button className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;