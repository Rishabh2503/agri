import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

const OrderSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderDetails, paymentDetails } = location.state || {};

    if (!orderDetails) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900">No order details found</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Order Status Banner */}
                <div className="bg-green-600 rounded-t-xl p-6 text-white">
                    <div className="flex items-center">
                        <div className="bg-white rounded-full p-2 mr-4">
                            <FaCheck className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Order Confirmed!</h1>
                            <p className="text-green-100">Thank you for your order.</p>
                        </div>
                    </div>
                </div>

                {/* Order Details */}
                <div className="bg-white rounded-b-xl shadow-md">
                    {/* Items List */}
                    <div className="p-6 border-b">
                        <h2 className="text-xl font-semibold mb-4">Order Items</h2>
                        {orderDetails.map((item) => (
                            <div key={item.orderId} className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FaClock className="mr-2" />
                                        <span>{item.itemType === 'equipment' ? 'Equipment Rental' : 'Land Lease'}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>{item.duration || 'Duration TBD'}</span>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <FaMapMarkerAlt className="mr-2" />
                                        <span>{item.location}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-gray-900">
                                        ₹{item.itemType === 'equipment' ? item.daily_rental : item.leaseAmount}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Details */}
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
                        <div className="space-y-2 text-gray-600">
                            <p>Payment Method: {paymentDetails.method}</p>
                            <p>Transaction Date: {new Date(paymentDetails.timestamp).toLocaleDateString()}</p>
                        </div>

                        <div className="mt-6">
                            <div className="flex justify-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{paymentDetails.subtotal}</span>
                            </div>
                            <div className="flex justify-between mb-2">
                                <span>Tax (18%)</span>
                                <span>₹{paymentDetails.tax}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
                                <span>Total Paid</span>
                                <span className="text-green-600">₹{paymentDetails.total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-gray-50 rounded-b-xl">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Return to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;