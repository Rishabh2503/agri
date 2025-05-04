import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const RentalEquipmentDetails = () => {
  const { equipmentId } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [orderEmail, setOrderEmail] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();

  // Sample equipment data (replace with your own source, e.g., API or state)
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

  useEffect(
    () => {
      const equipmentData = sampleEquipments.find(
        item => item.id === parseInt(equipmentId)
      );
      if (equipmentData) {
        setEquipment(equipmentData);
      } else {
        navigate('/rental-equipment'); // Redirect if equipment not found
      }
    },
    [equipmentId, navigate]
  );

  const handleOrderSubmit = () => {
    if (!orderEmail) {
      alert('Please provide an email to place an order.');
      return;
    }

    // Send email (simulation)
    alert(
      `Order placed successfully for ${equipment.title}. An email will be sent to ${orderEmail}.`
    );

    // Save order info locally
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({ equipmentId: equipment.id, email: orderEmail });
    localStorage.setItem('orders', JSON.stringify(orders));

    setOrderConfirmed(true);
  };

  if (!equipment) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Equipment Image and Details */}
        <div>
          <img
            src={equipment.image}
            alt={equipment.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-4">
            {equipment.title}
          </h2>
          <div className="flex items-center mb-4">
            <FaStar className="text-yellow-400 mr-1" />
            <span>
              {equipment.rating} ({equipment.reviews} reviews)
            </span>
          </div>
          <div className="flex items-center text-gray-600 mb-4">
            <FaMapMarkerAlt className="mr-2" />
            <span>
              {equipment.location}
            </span>
          </div>
          <p className="text-xl mb-4">
            Rental Price: ₹{equipment.daily_rental}/day
          </p>

          <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
          <ul className="mb-6">
            <li>
              <strong>Model:</strong> {equipment.specifications.model}
            </li>
            <li>
              <strong>Horsepower:</strong> {equipment.specifications.horsepower}
            </li>
            <li>
              <strong>Condition:</strong> {equipment.specifications.condition}
            </li>
          </ul>

          {/* Order Now Section */}
          {orderConfirmed
            ? <div className="bg-green-100 text-green-600 p-4 rounded-lg">
                <p>Thank you for your order! We will contact you soon.</p>
              </div>
            : <div>
                <h3 className="text-2xl font-semibold mb-4">Order Now</h3>
                <div className="flex flex-col space-y-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={orderEmail}
                    onChange={e => setOrderEmail(e.target.value)}
                    className="p-2 border rounded-lg"
                  />
                  <button
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    onClick={handleOrderSubmit}
                  >
                    <FaEnvelope className="mr-2 mt-5 " /> Place Order
                  </button>
                </div>
              </div>}
        </div>
      </div>
    </div>
  );
};

export default RentalEquipmentDetails;
