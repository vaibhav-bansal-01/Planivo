import React from "react";
import { Button, Input, Card, Logo } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../api/authApi.js";
import {
  loginSuccess,
  setError,
  setLoading,
  clearError,
} from "../features/authSlics.js";
import { Lock, Mail } from "lucide-react";

function Login() {
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      const response = await login(data);
      dispatch(loginSuccess(response.data.data.user));
      navigate("/");
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Something went wrong"),
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-xl rounded-[40px] px-10 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Logo className="w-52" />

          <p className="mt-8 text-center text-3xl font-medium text-gray-800">
            Welcome back! Sign in to continue managing your projects.
          </p>
        </div>

        {/* Form */}
        <form
          noValidate
          className="mt-10 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            autoFocus
            autoComplete="email"
            icon={Mail}
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />

          <Input
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            error={errors.password?.message}
            icon={Lock}
            {...register("password", {
              required: "Password is required",
            })}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-lg text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create One
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default Login;
