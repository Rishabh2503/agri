import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, {
      ...item,
      itemType: item.daily_rental ? 'equipment' : 'land',
      orderId: `ORD${Date.now()}`,
      timestamp: new Date().toISOString()
    }]);
  };

  const removeFromCart = (orderId) => {
    setCartItems(cartItems.filter(item => item.orderId !== orderId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);