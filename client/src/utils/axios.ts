import axios from "axios";
import {refreshToken, signOut} from './auth';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000", 
  withCredentials: true, 
});

api.interceptors.response.use(
    (response) => response, // Return response normally
    async (error) => {
      const originalRequest = error.config;
  
      // If unauthorized (401), try refreshing the token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loops
  
        try {
          await refreshToken(); // Call function to refresh token
          return api(originalRequest); // Retry the failed request
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          signOut(); // Logout user (optional)
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api;
