import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5001/api" // local dev
      : "https://yemmychats-backend.onrender.com/api"
, // ✅ replace with actual Render backend URL
  withCredentials: true,
});
