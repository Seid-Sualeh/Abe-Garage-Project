import axios from "axios";

// Use relative URL for Vercel deployment (API will be proxied via vercel.json)
// Fallback to localhost for local development
const isVercel = import.meta.env.VITE_VERCEL === "true";
const api_url = isVercel
  ? ""
  : import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: api_url,
});

export default axiosInstance;
