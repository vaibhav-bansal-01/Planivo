import api from "./axios";

export const getUserTasks = () => {
  return api.get("/tasks");
};

export const getProjectTasks = (projectId) => {
  return api.get(`/tasks/${projectId}`);
};

export const createTask = (projectId, data) => {
  return api.post(`/tasks/${projectId}`, data);
};

export const getTaskById = (projectId, taskId) => {
  return api.get(`/tasks/${projectId}/t/${taskId}`);
};

export const updateTask = (projectId, taskId, data) => {
  return api.put(`/tasks/${projectId}/t/${taskId}`, data);
};

export const deleteTask = (projectId, taskId) => {
  return api.delete(`/tasks/${projectId}/t/${taskId}`);
};

export const createSubTask = (projectId, taskId, data) => {
  return api.post(`/tasks/${projectId}/t/${taskId}/subtasks`, data);
};

export const updateSubTask = (projectId, subtaskId, data) => {
  return api.put(`/tasks/${projectId}/st/${subtaskId}`, data);
};

export const deleteSubTask = (projectId, subtaskId) => {
  return api.delete(`/tasks/${projectId}/st/${subtaskId}`);
};

export const getSubTasksByTaskId = (taskId) => {
  return api.get(`/subtasks/${taskId}`);
};

export const addAttachments = (projectId, taskId, formData) => {
  return api.post(
    `/projects/${projectId}/tasks/${taskId}/attachments`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export const removeAttachment = (projectId, taskId, attachmentId) => {
  return api.delete(
    `/projects/${projectId}/tasks/${taskId}/attachments/${attachmentId}`,
  );
};
