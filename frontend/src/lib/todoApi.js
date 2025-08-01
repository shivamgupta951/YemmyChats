import { axiosInstance } from "./axios";

// ✅ GET all tasks for a shared todo list
export const fetchTodos = (userId) =>
  axiosInstance.get(`/todos/${userId}`).then(res => res.data);

// ✅ POST a new task to shared list (auto-creates list if it doesn't exist)
export const addTodo = (userId, data) =>
  axiosInstance.post(`/todos/${userId}`, data).then(res => res.data);

// ✅ PUT to edit an individual task by MongoID
export const editTodo = (userId, todoId, data) =>
  axiosInstance.put(`/todos/${userId}/${todoId}`, data).then(res => res.data);

// ✅ PATCH to toggle "done/pending" status of a task
export const toggleTodo = (userId, todoId, checked) =>
  axiosInstance.patch(`/todos/${userId}/${todoId}/toggle`, { checked }).then(res => res.data);

// ✅ DELETE a task from the shared list by ID
export const deleteTodo = (userId, todoId) =>
  axiosInstance.delete(`/todos/${userId}/${todoId}`).then(res => res.data);
