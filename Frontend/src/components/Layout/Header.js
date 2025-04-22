// src/components/layout/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-700 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Task Manager</Link>
        
        {currentUser ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Hello, {currentUser.name}</span>
            <button 
              onClick={handleLogout}
              className="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-3 rounded text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <Link to="/login" className="text-white hover:text-indigo-200">Login</Link>
            <Link to="/register" className="bg-indigo-800 hover:bg-indigo-900 text-white py-1 px-3 rounded text-sm">Register</Link>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;