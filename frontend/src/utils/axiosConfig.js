import axios from "axios";

// Determine the API URL based on environment
// For production: use VITE_PRODUCTION_API_URL if set, otherwise use relative URL
// For development: use VITE_API_URL or fallback to localhost
const isProduction = import.meta.env.PROD;
const isVercel = import.meta.env.VITE_VERCEL === "true";

let api_url;
if (isProduction || isVercel) {
  // In production, prioritize VITE_PRODUCTION_API_URL, then VITE_API_URL, then use relative
  api_url =
    import.meta.env.VITE_PRODUCTION_API_URL ||
    import.meta.env.VITE_API_URL ||
    "";
} else {
  // In development, use VITE_API_URL or fallback to localhost
  api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";
}

const axiosInstance = axios.create({
  baseURL: api_url,
});

export default axiosInstance;
