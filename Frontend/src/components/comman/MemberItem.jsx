import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, UserCog, UserMinus } from "lucide-react";

function MemberItem({ member, onRoleChange, onRemove }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const user = member.user || {};

  const roleColors = {
    admin: "bg-red-100 text-red-700",
    project_admin: "bg-blue-100 text-blue-700",
    member: "bg-gray-100 text-gray-700",
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-blue-200 hover:shadow-sm">
      {/* Left */}
      <div className="flex items-center gap-4">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
            {(user.fullName || user.username || "U").charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="font-semibold text-gray-900">
            {user.fullName || user.username}
          </h3>

          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            roleColors[member.role] || roleColors.member
          }`}
        >
          {member.role.replace("_", " ")}
        </span>

        {member.role !== "admin" && (
          <div ref={menuRef} className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu((prev) => !prev);
              }}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <MoreVertical size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                {member.role !== "project_admin" && (
                  <button
                    onClick={() => {
                      onRoleChange(member.user._id, "project_admin");
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50"
                  >
                    <UserCog size={16} />
                    Make Project Admin
                  </button>
                )}

                {member.role !== "member" && (
                  <button
                    onClick={() => {
                      onRoleChange(member.user._id, "member");
                      setShowMenu(false);
                    }}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition hover:bg-gray-50"
                  >
                    <UserCog size={16} />
                    Make Member
                  </button>
                )}

                <div className="my-1 border-t border-gray-100" />

                <button
                  onClick={() => {
                    onRemove(member.user._id);
                    setShowMenu(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
                >
                  <UserMinus size={16} />
                  Remove Member
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MemberItem;
