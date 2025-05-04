import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

// Same leasing options array for demo purposes (in a real app, you might fetch this from an API)
const leasingOptions = [
  {
    id: 1,
    img:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    title: 'Agricultural Land',
    description: 'Lease fertile farmland for seasonal crops',
    ownerContact: 'owner1@example.com'
  },
  {
    id: 2,
    img:
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000',
    title: 'Orchard Land',
    description: 'Perfect for fruit cultivation and long-term farming',
    ownerContact: 'owner2@example.com'
  },
  {
    id: 3,
    img:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    title: 'Paddy Fields',
    description: 'Specialized land for rice cultivation',
    ownerContact: 'owner3@example.com'
  },
  {
    id: 4,
    img:
      'https://images.unsplash.com/photo-1589328956162-4e2f54b36881?q=80&w=1000',
    title: 'Greenhouse Plots',
    description: 'Protected cultivation areas for high-value crops',
    ownerContact: 'owner4@example.com'
  },
  {
    id: 5,
    img:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1000',
    title: 'Mixed Farming Land',
    description: 'Suitable for diverse agricultural activities',
    ownerContact: 'owner5@example.com'
  },
  {
    id: 6,
    img:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000',
    title: 'Plantation Land',
    description: 'Ideal for commercial crop cultivation',
    ownerContact: 'owner6@example.com'
  }
];

const LandLeasingDetails = () => {
  const { id } = useParams();
  // Find the selected leasing option by id
  const option = leasingOptions.find(opt => opt.id === parseInt(id));

  // Order form state
  const [contact, setContact] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrderSubmit = e => {
    e.preventDefault();
    // In a real application, you might send the order details to your backend here.
    setOrderPlaced(true);
  };

  // if (!option) {
  //   return <p className="text-center mt-8 text-xl">Option not found.</p>;
  // }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Leasing Option Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-64 sm:h-80">
            <img
              className="w-full h-full object-cover"
              src={option.img}
              alt={option.title}
            />
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {option.title}
            </h2>
            <p className="text-gray-700 text-lg">
              {option.description}
            </p>
          </div>
        </div>

        {/* Order Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Place Your Order</h3>
          {!orderPlaced
            ? <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Your Contact Email
                </label>
                <input
                  type="email"
                  value={contact}
                  onChange={e => setContact(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <p className="text-gray-600">
                This order will be sent to the owner at:{' '}
                <strong>{option.ownerContact}</strong>
              </p>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Place Order
              </button>
            </form>
            : <div className="text-center">
              <h4 className="text-2xl font-bold text-green-600">
                Order Successful!
              </h4>
              <p className="text-gray-700 mt-2">
                Your order has been placed. The owner will contact you
                shortly.
              </p>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default LandLeasingDetails;
