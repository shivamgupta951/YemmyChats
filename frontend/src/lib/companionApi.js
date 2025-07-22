// lib/companionApi.js
import { axiosInstance } from "./axios";

export const addCompanion = (username) =>
  axiosInstance.post("/companion/add", { username });

export const getCompanions = () => axiosInstance.get("/companion/list");

export const removeCompanion = (username) =>
  axiosInstance.delete(`/companion/remove/${username}`);
