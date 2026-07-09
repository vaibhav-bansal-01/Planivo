import React, { useEffect, useState } from "react";
import { Card, Logo, Button } from "../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../api/authApi";
import { useRef } from "react";

function VerifyEmail() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      if (hasVerified.current) return;
      hasVerified.current = true;
      setStatus("loading");
      try {
        const response = await verifyEmail(verificationToken);
        setStatus("success");
        setMessage(response.data.message);
      } catch (error) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "Unable to verify your email.",
        );
      }
    };

    verifyUser();
  }, [verificationToken, navigate]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white px-4">
      <Card className="w-full max-w-xl rounded-[40px] px-10 py-12">
        <div className="flex flex-col items-center">
          <Logo className="w-52" />

          <h1 className="mt-8 text-4xl font-bold text-gray-900">
            Email Verification
          </h1>

          {status === "loading" && (
            <p className="mt-8 text-lg text-gray-600">
              Verifying your email...
            </p>
          )}

          {status === "success" && (
            <>
              <div className="mt-8 space-y-2 text-center text-green-600">
                <p className="text-xl font-semibold">
                  ✓ Email Verified Successfully
                </p>
              </div>

              <Button
                className="mt-8 w-full"
                onClick={() => navigate("/login")}
              >
                Go to Sign In
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mt-8 space-y-2 text-center text-red-500">
                <p className="text-xl font-semibold">Verification Failed</p>
              </div>

              <Link
                to="/login"
                className="mt-8 font-semibold text-blue-600 hover:underline"
              >
                Back to Sign In
              </Link>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}

export default VerifyEmail;
