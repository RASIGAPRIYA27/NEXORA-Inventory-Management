
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Add interceptors for better debugging
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout to prevent hanging requests
  timeout: 10000,
});

// Request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Starting API Request:', request.method, request.url, request.data);
  return request;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Response interceptor for debugging
api.interceptors.response.use(response => {
  console.log('API Response:', response.status, response.config.url, response.data);
  return response;
}, error => {
  // Enhanced error logging
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response Error:', error.response.status, error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No Response Received:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request Setup Error:', error.message);
  }
  return Promise.reject(error);
});

export default api;
