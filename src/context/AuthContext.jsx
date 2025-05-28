import React, { createContext, useState, useEffect } from 'react';
import { loginUser, getCurrentUser, logoutUser, registerUser, loginShop, getCurrentShop, logoutShop } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShop, setIsShop] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      const isShopUser = localStorage.getItem('isShop') === 'true';
      
      if (token) {
        if (isShopUser) {
          const shopData = await getCurrentShop();
          setUser(shopData.shop || shopData);
          setIsShop(true);
        } else {
          const userData = await getCurrentUser();
          setUser(userData.user || userData);
          setIsShop(false);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Clear auth state if token is invalid
      setUser(null);
      setIsShop(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isShop');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, isShopLogin = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (isShopLogin) {
        response = await loginShop({ email, password });
        setIsShop(true);
        localStorage.setItem('isShop', 'true');
      } else {
        response = await loginUser({ email, password });
        setIsShop(false);
        localStorage.setItem('isShop', 'false');
      }
      
      setUser(response.user || response.shop || response);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await registerUser(formData);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      if (isShop) {
        await logoutShop();
      } else {
        await logoutUser();
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
      setIsShop(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isShop');
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    register,
    isAuthenticated: !!user,
    isShop
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
