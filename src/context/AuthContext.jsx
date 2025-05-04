import { createContext, useState, useEffect } from 'react';
import { getStoredAuth, setStoredAuth, removeStoredAuth } from '../utils/localStorage';
import {
    loginUser,
    registerUser,
    activateUser,
    logoutUser,
} from '../services/authService';
import React from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedAuth = getStoredAuth();
        if (storedAuth) {
            setUser(storedAuth.user);
            setToken(storedAuth.token);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(email, password);
            const { success, user, token } = response;

            if (success && user && token) {
                setUser(user);
                setToken(token);
                setStoredAuth({ user, token });
                return true;
            }

            setError('Invalid login credentials');
            return false;
        } catch (err) {
            setError(err.message || 'Login failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerUser(userData);
            return response.success;
        } catch (err) {
            setError(err.message || 'Registration failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const activate = async (activationToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await activateUser(activationToken);
            return response.success;
        } catch (err) {
            setError(err.message || 'Activation failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setToken(null);
            removeStoredAuth();
            return true;
        } catch (err) {
            setError(err.message || 'Logout failed');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        loading,
        error,
        login,
        register,
        activate,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
