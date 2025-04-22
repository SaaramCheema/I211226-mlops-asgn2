import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const AUTH_URL = process.env.REACT_APP_AUTH_URL || 'http://localhost:5001';

// Create axios instances
const apiClient = axios.create({
  baseURL: API_URL
});

const authClient = axios.create({
  baseURL: AUTH_URL
});

// Request interceptor to add auth token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { apiClient, authClient };
