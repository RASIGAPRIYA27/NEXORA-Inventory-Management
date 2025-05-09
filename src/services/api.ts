
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const API_URL = 'http://localhost:5000/api';

// Add interceptors for better debugging
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Extend timeout to prevent hanging requests
  timeout: 30000,
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
    console.error('Request that caused error:', error.config.method, error.config.url, error.config.data);
    
    // User-friendly error messages based on status codes
    const status = error.response.status;
    let errorMessage = 'An error occurred';
    
    if (status === 400) {
      errorMessage = error.response.data.message || 'Invalid request data';
    } else if (status === 401) {
      errorMessage = 'Authentication required. Please login.';
    } else if (status === 403) {
      errorMessage = 'You do not have permission to perform this action';
    } else if (status === 404) {
      errorMessage = 'The requested resource was not found';
    } else if (status === 409) {
      errorMessage = error.response.data.message || 'Conflict with existing data';
    } else if (status >= 500) {
      errorMessage = 'Server error. Please try again later';
    }
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive"
    });
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No Response Received:', error.request);
    console.error('Request that timed out:', error.config.method, error.config.url);
    toast({
      title: "Connection Error",
      description: "Could not connect to the server. Please check your internet connection.",
      variant: "destructive"
    });
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Request Setup Error:', error.message);
    toast({
      title: "Request Error",
      description: error.message || "An unexpected error occurred",
      variant: "destructive"
    });
  }
  return Promise.reject(error);
});

export default api;
