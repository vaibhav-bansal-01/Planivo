import { Routes, Route, Navigate } from "react-router-dom";

import {
  Dashboard,
  Login,
  SignUp,
  Profile,
  Projects,
  ProjectDetails,
  Tasks,
  TaskDetails,
  Calendar,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
} from "../pages/index.js";

import ProtectedRoute from "./ProtectedRoutes";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route path="/verify-email/:verificationToken" element={<VerifyEmail />}
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="profile" element={<Profile />} />

          <Route path="projects" element={<Projects />} />
          <Route path="projects/:projectId" element={<ProjectDetails />} />

          <Route path="tasks" element={<Tasks />} />
          <Route path="tasks/:taskId" element={<TaskDetails />} />

          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
