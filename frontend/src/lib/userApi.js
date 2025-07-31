// src/lib/userApi.js
import { axiosInstance } from "./axios";

export const getNote = async (userId) =>
  axiosInstance.get(`/users/note/${userId}`).then((res) => res.data);

export const updateNote = async (userId, note) =>
  axiosInstance.put(`/users/note/${userId}`, { content: note }).then((res) => res.data);

export const deleteNote = async (userId) =>
  axiosInstance.delete(`/users/note/${userId}`).then((res) => res.data);
