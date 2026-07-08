import api from "./axios";

export const getUserProjects = () => {
  return api.get("/projects/");
};

export const createProject = (data) => {
  return api.post("/projects/", data);
};

export const getProjectById = (projectId) => {
  return api.get(`/projects/${projectId}`);
};

export const updateProject = (projectId, data) => {
  return api.put(`/projects/${projectId}`, data);
};

export const deleteProject = (projectId) => {
  return api.delete(`/projects/${projectId}`);
};

export const addMemberToProject = (projectId, data) => {
  return api.post(`/projects/${projectId}/members`, data);
};

export const removeMemberFromProject = (projectId, memberId) => {
  return api.delete(`/projects/${projectId}/members/${memberId}`);
};

export const getProjectMembers = (projectId) => {
  return api.get(`/projects/${projectId}/members`);
};

export const updateMemberRole = (projectId, userId, role) => {
  return api.put(`/projects/${projectId}/members/${userId}`, {
    newRole: role,
  });
};
