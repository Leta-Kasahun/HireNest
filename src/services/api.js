import axios from 'axios';
import { API_CONFIG, HTTP_STATUS } from '../config/constants';
import { getAccessToken, setAccessToken, clearAccessToken, isTokenExpired } from '../utils/tokenUtils';

/**
 * Axios instance with interceptors for authentication
 */
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true, // Important for HttpOnly cookies
  headers: {},
});

/**
 * Request interceptor to add auth token
 */
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      if (!isTokenExpired(token)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } else {
      // Don't warn for refresh endpoint or public endpoints
      const isPublic = [
        '/api/v1/auth/refresh',
        '/api/v1/auth/login',
        '/api/v1/auth/register',
        '/api/v1/public/'
      ].some(path => config.url && config.url.includes(path));

      if (!isPublic) {
        console.warn('No token found in memory for request to:', config.url);
      }
    }

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response interceptor for error handling and token refresh
 */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized - attempt token refresh
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry && !originalRequest.url.includes('/auth/refresh')) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = response.data;

        if (accessToken) {
          setAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        clearAccessToken();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
      console.error('Access forbidden');
    }

    return Promise.reject(error);
  }
);

/**
 * Generic API error handler
 * @param {Error} error - Axios error object
 * @returns {Object} Formatted error object
 */
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
      errors: error.response.data?.errors || null,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: 'No response from server. Please check your connection.',
      status: null,
    };
  } else {
    // Error in request setup
    return {
      message: error.message || 'An unexpected error occurred',
      status: null,
    };
  }
};

export default api;
