
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add interceptors for better debugging
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting API Request:', request.method, request.url);
  return request;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor for debugging
api.interceptors.response.use(response => {
  console.log('API Response:', response.status, response.config.url);
  return response;
}, error => {
  console.error('Response Error:', error.response ? error.response.data : error);
  return Promise.reject(error);
});

export default api;
