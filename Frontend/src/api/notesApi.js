import axios from "axios";

export const getProjectNotes = async (projectId) => {
  return axios.get(`/notes/${projectId}`);
};

export const createNote = async (projectId, data) => {
  return axios.post(`/notes/${projectId}`, data);
};

export const getNoteById = async (noteId) => {
  return axios.get(`/notes/${noteId}`);
};

export const updateNote = async (noteId, data) => {
  return axios.put(`/notes/${noteId}`, data);
};

export const deleteNote = async (noteId) => {
  return axios.delete(`/notes/${noteId}`);
};
