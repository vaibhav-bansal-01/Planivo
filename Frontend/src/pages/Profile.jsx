import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Camera,
  Mail,
  Calendar,
  CheckCircle2,
  ShieldAlert,
  Eye,
  EyeOff,
} from "lucide-react";
import { Card, Button, Input } from "../components";
import { changePassword, updateUser, updateAvatar } from "../api/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/authSlics";
import { resendVerificationEmail } from "../api/authApi";

function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [success, setSuccess] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    email: user?.email || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loadingPassword, setLoadingPassword] = useState(false);

  const handleChangePassword = async () => {
    setError(null);
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setError("Please fill all fields.");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoadingPassword(true);

      await changePassword({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to update password.");
    } finally {
      setError(null);
      setLoadingPassword(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("avatar", file);

      const response = await updateAvatar(formData);

      dispatch(loginSuccess(response.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  const [loadingProfile, setLoadingProfile] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setLoadingProfile(true);

      const response = await updateUser({
        fullName: profileData.fullName,
        username: profileData.username,
      });

      dispatch(loginSuccess(response.data.data));

      setIsEditing(false);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const [sendingEmail, setSendingEmail] = useState(false);

  const handleResendVerification = async () => {
    try {
      setSendingEmail(true);

      const response = await resendVerificationEmail();

      alert(response.data.message);
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message || "Unable to send verification email.",
      );
    } finally {
      setSendingEmail(false);
    }
  };

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [user?.avatar?.url]);

  return (
    <div className="space-y-10 p-8">
      {/* Heading */}

      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">Profile</h1>

        <p className="mt-2 text-gray-500">
          Manage your personal information and account settings.
        </p>
      </div>

      {/* Main Grid */}

      <div className="grid gap-8 lg:grid-cols-12">
        {/* LEFT PANEL */}
        <div className="lg:col-span-4 ">
          <Card className="p-8">
            <h2 className="mb-8 text-xl font-bold">Profile Overview</h2>

            {/* Avatar */}

            <div className="flex flex-col items-center">
              <div className="relative">
                {user?.avatar?.url && !imageError ? (
                  <img
                    src={`http://localhost:8000${user.avatar.url}`}
                    alt={user.username}
                    className="h-36 w-36 rounded-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex h-36 w-36 items-center justify-center rounded-full bg-blue-600 text-5xl font-bold text-white">
                    {(user?.fullName || user?.username)
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-white p-3 shadow-lg hover:bg-gray-100">
                  <Camera size={18} />

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleAvatarUpload(e)}
                  />
                </label>
              </div>

              <h2 className="mt-6 text-3xl font-bold">
                {user?.fullName || "No Name"}
              </h2>

              <p className="mt-2 text-lg text-gray-500">@{user?.username}</p>
            </div>

            <hr className="my-8" />

            {/* Email */}

            <div className="mb-8 flex items-start gap-4">
              <Mail className="mt-1 text-gray-500" />

              <div className="flex-1">
                <p className="text-sm text-gray-500">Email</p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="font-medium">{user?.email}</span>

                  {user?.isEmailVerified ? (
                    <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      <ShieldAlert size={14} />
                      Not Verified
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Joined */}

            <div className="flex items-start gap-4">
              <Calendar className="mt-1 text-gray-500" />

              <div>
                <p className="text-sm text-gray-500">Member Since</p>

                <p className="mt-2 font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT PANEL */}

        <div className="space-y-8 lg:col-span-8">
          {/* Personal Information */}

          <Card className="p-8">
            <h2 className="mb-8 text-2xl font-bold">Personal Information</h2>

            <div className="space-y-6">
              {/* Full Name */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full Name
                </label>

                <Input
                  value={profileData.fullName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      fullName: e.target.value,
                    })
                  }
                />
              </div>

              {/* Username */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Username
                </label>

                <Input
                  value={profileData.username}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      username: e.target.value,
                    })
                  }
                />

                <p className="mt-2 text-sm text-gray-500">
                  This is your unique username.
                </p>
              </div>

              {/* Email */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email
                </label>

                <div className="relative">
                  <Input value={profileData.email} disabled />

                  {user?.isEmailVerified ? (
                    <span className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      <CheckCircle2 size={14} />
                      Verified
                    </span>
                  ) : (
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-gray-500">
                        Please verify your email address.
                      </p>

                      <Button
                        type="button"
                        onClick={handleResendVerification}
                        disabled={sendingEmail}
                      >
                        {sendingEmail ? "Sending..." : "Resend Email"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {success && (
                <p className="mt-2 text-md text-green-600 flex justify-center">
                  Profile updated successfully.
                </p>
              )}

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-6">
                {isEditing ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setProfileData({
                          fullName: user?.fullName || "",
                          username: user?.username || "",
                          email: user?.email || "",
                        });

                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      onClick={handleSaveChanges}
                      disabled={loadingProfile}
                    >
                      {loadingProfile ? "Saving..." : "Save Changes"}
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)}>
                    Edit Information
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Change Password */}

          <Card className="p-8">
            <h2 className="mb-8 text-2xl font-bold">Change Password</h2>

            <div className="space-y-6">
              {/* Current Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Current Password
                </label>

                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  New Password
                </label>

                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Confirm New Password
                </label>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Password must be at least 8 characters long.
                </p>
              </div>

              {/* Buttons */}
              {error && (
                <p className="mt-2 text-md text-red-600 flex justify-center">
                  {error}
                </p>
              )}
              {success && (
                <p className="mt-2 text-md text-green-600 flex justify-center">
                  Password updated successfully.
                </p>
              )}
              <div className="flex justify-end pt-6">
                <Button
                  type="button"
                  onClick={() => {
                    console.log("clicked");
                    handleChangePassword();
                  }}
                  disabled={loadingPassword}
                >
                  {loadingPassword ? "Updating..." : "Update Password"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Profile;
