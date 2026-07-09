import api from "./axios";

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

export const login = (data) => {
  return api.post("/auth/login", data);
};

export const logout = () => {
  return api.post("/auth/logout");
};

export const getCurrentUser = () => {
  return api.get("/auth/current-user");
};

export const refreshToken = () => {
  return api.post("/auth/refresh-token");
};

export const forgotPasswordRequest = (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetForgotPassword = (resetToken, data) =>
  api.post(`/auth/reset-password/${resetToken}`, data);

export const verifyEmail = (verificationToken) =>
  api.get(`/auth/verify-email/${verificationToken}`);

export const resendVerificationEmail = () => {
  return api.post("/auth/resened-email-verification");
};

export const changePassword = (data) => {
  return api.post("/auth/change-password", data);
};

export const updateUser = (data) => {
  return api.patch("/auth/update-account", data);
};

export const updateAvatar = (formData) => {
  return api.patch("/auth/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
