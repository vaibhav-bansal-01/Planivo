import React, { useState } from "react";
import { Button, Input, Card, Logo } from "../components";
import { useForm } from "react-hook-form";
import { resetForgotPassword } from "../api/authApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock } from "lucide-react";

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { resetToken } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("newPassword");

  const onSubmit = async (data) => {
    setError("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const response = await resetForgotPassword(resetToken, data);
      setSuccessMessage(response.data.message);
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-xl rounded-[40px] px-10 py-12">
        <div className="flex flex-col items-center">
          <Logo className="w-52" />

          <h1 className="mt-8 text-4xl font-bold text-gray-900">
            Reset Password
          </h1>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-6"
        >
          <Input
            label="New Password"
            type="password"
            disabled={isLoading || !!successMessage}
            placeholder="Enter your new password"
            error={errors.newPassword?.message}
            icon={Lock}
            {...register("newPassword", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />

          <Input
            label="Confirm Password"
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
            <div className="text-center text-green-600 text-sm">
              <p>{successMessage}</p>
              <p>Redirecting to Sign In...</p>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !!successMessage}
          >
            {isLoading
              ? "Resetting..."
              : successMessage
                ? "Password Reset ✓"
                : "Reset Password"}
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

export default ResetPassword;
