import api from "./axios";

export const registerUser = (data) => {
  return api.post("/users/register", data);
};

export const login = (data) => {
  return api.post("/users/login", data);
};

export const logout = () => {
  return api.post("/users/logout");
};

export const getCurrentUser = () => {
  return api.get("/users/current-user");
};

export const refreshToken = () => {
  return api.post("/users/refresh-token");
};

export const forgotPasswordRequest = (data) => {
  return api.post("/users/forgot-password", data);
};

export const resetForgotPassword = (resetToken, data) =>
  api.post(`/users/reset-password/${resetToken}`, data);

export const verifyEmail = (verificationToken) =>
  api.get(`/users/verify-email/${verificationToken}`);

export const changePassword = (data) => {
  return api.post("/users/change-password", data);
};
