import React, { useState } from "react";
import { Button, Input, Card, Logo } from "../components";
import { useForm } from "react-hook-form";
import { Mail } from "lucide-react";
import { forgotPasswordRequest } from "../api/authApi";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await forgotPasswordRequest(data);
      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-xl rounded-[40px] px-10 py-12">
        <div className="flex flex-col items-center">
          <Logo className="w-52" />

          <h1 className="mt-8 text-4xl font-bold text-gray-900">
            Forgot Password
          </h1>

          <p className="mt-3 text-center text-lg text-gray-600">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            autoFocus
            disabled={isLoading || !!successMessage}
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

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          {successMessage && (
            <div className="text-center text-green-600 text-sm">
              <p>{successMessage}</p>
              <p>Please check your inbox and spam folder.</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !!successMessage}
          >
            {isLoading
              ? "Sending..."
              : successMessage
                ? "Email Sent ✓"
                : "Send Reset Link"}
          </Button>
        </form>
        <p className="mt-8 text-center text-lg text-gray-600">
          Remember your password?{" "}
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

export default ForgotPassword;
