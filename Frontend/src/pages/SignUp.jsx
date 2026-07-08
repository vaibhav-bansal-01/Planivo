import React, { useState } from "react";
import { Button, Input, Card, Logo } from "../components/index.js";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../api/authApi.js";
import { setError, setLoading, clearError } from "../features/authSlics.js";
import { Lock, Mail, User } from "lucide-react";

function SignUp() {
  const [successMessage, setSuccessMessage] = useState("");
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    dispatch(clearError());
    dispatch(setLoading(true));

    try {
      const response = await registerUser(data);
      console.log(response);
      dispatch(setLoading(false));
      setSuccessMessage(response.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      dispatch(
        setError(error.response?.data?.message || "Something went wrong"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-xl rounded-[40px] px-10 py-12">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Logo className="w-52" />

          <p className="mt-8 text-center text-3xl font-medium text-gray-800">
            Create your account to start managing projects
          </p>
        </div>

        {/* Form */}
        <form
          noValidate
          className="mt-10 space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="Enter your username"
            disabled={isLoading || !!successMessage}
            autoFocus
            icon={User}
            error={errors.username?.message}
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 30,
                message: "Username must be at most 30 characters",
              },
            })}
          />

          <Input
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            disabled={isLoading || !!successMessage}
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
            disabled={isLoading || !!successMessage}
            autoComplete="new-password"
            error={errors.password?.message}
            icon={Lock}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <Input
            type="password"
            disabled={isLoading || !!successMessage}
            placeholder="Confirm your new password"
            error={errors.confirmPassword?.message}
            icon={Lock}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          {successMessage && (
            <div className="space-y-1 text-center text-green-600 text-sm">
              <p>{successMessage}</p>
              <p>Please verify your email before signing in.</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !!successMessage}
          >
            {isLoading
              ? "Creating account..."
              : successMessage
                ? "Account Created ✓"
                : "Create account"}
          </Button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-lg text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </Card>
    </div>
  );
}

export default SignUp;
