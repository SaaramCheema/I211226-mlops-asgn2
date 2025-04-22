
// src/services/auth.js
import { authClient } from './api';

export const login = async (email, password) => {
  const response = await authClient.post('/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    
  }
  return response.data;
};

export const register = async (name, email, password) => {
  const response = await authClient.post('/register', { name, email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await authClient.post('/forgot-password', { email });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await authClient.post(`/reset-password/${token}`, { password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  return null;
};
