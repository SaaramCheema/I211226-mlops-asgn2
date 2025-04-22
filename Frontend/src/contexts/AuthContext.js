import React, { createContext, useState, useEffect, useContext } from 'react';
import { getCurrentUser, login, logout, register } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const user = getCurrentUser();
        setCurrentUser(user);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const loginUser = async (email, password) => {
    setError('');
    try {
      const userData = await login(email, password);
      setCurrentUser(userData.user);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to login');
      throw err;
    }
  };

  const registerUser = async (name, email, password) => {
    setError('');
    try {
      const userData = await register(name, email, password);
      setCurrentUser(userData.user);
      return userData;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register');
      throw err;
    }
  };

  const logoutUser = () => {
    logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    error,
    login: loginUser,
    logout: logoutUser,
    register: registerUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);