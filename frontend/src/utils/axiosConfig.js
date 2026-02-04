import axios from "axios";

const api_url = import.meta.env.VITE_API_URL || "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: api_url,
});

export default axiosInstance;
