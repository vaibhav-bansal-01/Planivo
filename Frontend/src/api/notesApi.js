import api from "./axios";

export const getProjectNotes = async (projectId) => {
  return api.get(`/notes/${projectId}`);
};

export const createNote = async (projectId, data) => {
  return api.post(`/notes/${projectId}`, data);
};

export const getNoteById = async (projectId, noteId) => {
  return api.get(`/notes/${projectId}/n/${noteId}`);
};

export const updateNote = async (projectId, noteId, data) => {
  return api.put(`/notes/${projectId}/n/${noteId}`, data);
};

export const deleteNote = async (projectId, noteId) => {
  return api.delete(`/notes/${projectId}/n/${noteId}`);
};
