import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    email: '',
    phone: ''
  });

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      return sum + (item.itemType === 'equipment' ? item.daily_rental : item.leaseAmount);
    }, 0);
    const tax = subtotal * 0.18;
    return { subtotal, tax, total: subtotal + tax };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Simulate payment processing
      const paymentResult = await simulatePayment();
      
      if (paymentResult.success) {
        // Clear cart and navigate to order summary
        clearCart();
        navigate('/order-summary', { 
          state: { 
            orderDetails: cartItems,
            paymentDetails: {
              method: paymentMethod,
              ...calculateTotal(),
              timestamp: new Date().toISOString()
            }
          }
        });
      }
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  // Simulate payment processing
  const simulatePayment = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: `TXN${Date.now()}` });
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
              <div className="flex items-center text-green-600">
                <FaLock className="mr-2" />
                <span className="text-sm">Secure Checkout</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Contact Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-3 border rounded-lg"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded-lg"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      paymentMethod === 'card' 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <FaCreditCard className="mr-2" />
                    Credit Card
                  </button>
                  <button
                    type="button"
                    className={`p-4 border rounded-lg flex items-center justify-center ${
                      paymentMethod === 'upi' 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <img src="/upi-icon.png" alt="UPI" className="h-6 w-6 mr-2" />
                    UPI
                  </button>
                </div>
              </div>

              {/* Payment Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="example@upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({...formData, upiId: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors"
              >
                Complete Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.orderId} className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.itemType === 'equipment' ? 'Equipment Rental' : 'Land Lease'}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaCalendarAlt className="mr-2" />
                      <span>{item.duration || 'Duration TBD'}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-900">
                    <FaRupeeSign className="mr-1" />
                    {item.itemType === 'equipment' ? item.daily_rental : item.leaseAmount}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Calculation */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <div className="flex items-center">
                  <FaRupeeSign className="mr-1" />
                  <span>{calculateTotal().subtotal}</span>
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tax (18%)</span>
                <div className="flex items-center">
                  <FaRupeeSign className="mr-1" />
                  <span>{calculateTotal().tax}</span>
                </div>
              </div>
              <div className="flex justify-between font-bold text-lg pt-2 border-t">
                <span>Total</span>
                <div className="flex items-center text-green-600">
                  <FaRupeeSign className="mr-1" />
                  <span>{calculateTotal().total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;