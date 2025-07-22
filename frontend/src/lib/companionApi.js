// src/lib/companionApi.js
import { axiosInstance } from "./axios";

// Add companion by username
export const addCompanion = (username) =>
  axiosInstance.post("/companions/add", { username });

// Get companion list
export const getCompanions = () =>
  axiosInstance.get("/companions/list");
