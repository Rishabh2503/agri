import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMapMarkerAlt, FaCalendarAlt, FaRupeeSign } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const Cart = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart, clearCart } = useCart();

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const itemPrice = item.type === 'equipment' ? item.daily_rental : item.leaseAmount;
            return total + itemPrice;
        }, 0);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Browse our collection of lands and equipment for rent.</p>
                    <div className="space-x-4">
                        <button
                            onClick={() => navigate('/land-leasing')}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Browse Lands
                        </button>
                        <button
                            onClick={() => navigate('/rental-equipment')}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Browse Equipment
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex gap-4">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                        <p className="text-gray-600">{item.description}</p>
                                        <div className="mt-2 space-y-1">
                                            <div className="flex items-center text-gray-600">
                                                <FaMapMarkerAlt className="mr-2" />
                                                <span>{item.location}</span>
                                            </div>
                                            {item.duration && (
                                                <div className="flex items-center text-gray-600">
                                                    <FaCalendarAlt className="mr-2" />
                                                    <span>{item.duration}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-4 flex items-center text-green-600 font-semibold">
                                            <FaRupeeSign className="mr-1" />
                                            {item.type === 'equipment' ? item.daily_rental : item.leaseAmount}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-white rounded-xl shadow-md p-6 h-fit">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <div className="flex items-center">
                                    <FaRupeeSign className="mr-1" />
                                    {calculateTotal()}
                                </div>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (18%)</span>
                                <div className="flex items-center">
                                    <FaRupeeSign className="mr-1" />
                                    {(calculateTotal() * 0.18).toFixed(2)}
                                </div>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <div className="flex items-center text-green-600">
                                        <FaRupeeSign className="mr-1" />
                                        {(calculateTotal() * 1.18).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full mt-4 border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;