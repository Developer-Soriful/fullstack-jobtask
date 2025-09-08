import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Add JWT token automatically for protected routes
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;

