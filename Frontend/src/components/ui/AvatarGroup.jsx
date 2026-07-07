import React from "react";

function AvatarGroup({ members = [], count = 4 }) {
  return (
    <div className="flex items-center -space-x-3">
      {members.slice(0, count).map((member) => (
        <div
          key={member.user._id}
          className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-blue-600 text-sm font-semibold text-white"
        >
          {member.user.avatar ? (
            <img
              src={member.user.avatar}
              alt={member.user.fullName}
              className="h-full w-full object-cover"
            />
          ) : (
            member.user.fullName.charAt(0).toUpperCase()
          )}
        </div>
      ))}

      {members.length > count && (
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-blue-50 text-sm font-semibold text-blue-600">
          +{members.length - count}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
