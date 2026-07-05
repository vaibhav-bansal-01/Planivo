import React from "react";
import { useSelector } from "react-redux";

function Header({ title, subtitle }) {
  const { user } = useSelector((state) => state.auth);

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="flex h-24 items-center justify-between border-b border-gray-200 bg-white px-10">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {title || "Dashboard"}
        </h1>

        <p className="mt-1 text-gray-500">
          {subtitle
            ? subtitle
            : `${getGreeting()}, ${user?.username || "User"} 👋`}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}

        {/* Search */}

        {/* Profile */}
      </div>
    </header>
  );
}

export default Header;
