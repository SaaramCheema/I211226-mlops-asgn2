// src/services/tasks.js
import { apiClient } from './api';

export const getAllTasks = async () => {
  const response = await apiClient.get('/tasks');
  return response.data;
};

export const createTask = async (taskData) => {
  const response = await apiClient.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id, taskData) => {
  const response = await apiClient.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id) => {
  const response = await apiClient.delete(`/tasks/${id}`);
  return response.data;
};