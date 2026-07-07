import api from "./axios";

export const getUserTasks = () => {
  return api.get("/tasks");
};

export const getProjectTasks = (projectId) => {
  return api.get("/tasks");
};

export const createTask = (projectId, data) => {
  return api.post(`/projects/${projectId}/tasks`, data);
};

export const getTaskById = (taskId) => {
  return api.get(`/tasks/${taskId}`);
};

export const updateTask = (taskId, data) => {
  return api.put(`/tasks/${taskId}`, data);
};

export const deleteTask = (taskId) => {
  return api.delete(`/tasks/${taskId}`);
};

export const createSubTask = (taskId, data) => {
  return api.post(`/tasks/${taskId}/subtasks`, data);
};

export const updateSubTask = (subtaskId, data) => {
  return api.put(`/subtasks/${subtaskId}`, data);
};

export const deleteSubTask = (subtaskId) => {
  return api.delete(`/subtasks/${subtaskId}`);
};  

export const getSubTasksByTaskId = (taskId) => {
  return api.get(`/subtasks/${taskId}`);
};

export const addAttachments = (taskId, data) => {
  return api.post(`/tasks/${taskId}/attachments`, data);
};

export const removeAttachment = (taskId, attachmentId) => {
  return api.delete(`/tasks/${taskId}/attachments/${attachmentId}`);
};  