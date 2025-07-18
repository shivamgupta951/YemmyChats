import axios from "axios";

// Remove trailing slashes from the backend base URL
const baseURL = import.meta.env.VITE_API_URL.replace(/\/+$/, "");

export const axiosInstance = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
});