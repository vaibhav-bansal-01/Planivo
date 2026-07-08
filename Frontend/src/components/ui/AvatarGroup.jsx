import React from "react";

function AvatarGroup({ members = [], count = 4 }) {
  const visibleMembers = members.slice(0, count);
  const remaining = members.length - count;

  return (
    <div className="flex items-center">
      {visibleMembers.map((member, index) => {
        const name =
          member.user?.fullName ||
          member.user?.username ||
          member.fullName ||
          member.username ||
          "U";

        const letter = name.charAt(0).toUpperCase();

        return (
          <div
            key={member._id || index}
            className={`
              -ml-2 first:ml-0
              flex h-11 w-11 items-center justify-center
              rounded-full
              border-2 border-white
              bg-linear-to-br
              from-blue-500
              to-indigo-600
              text-sm
              font-semibold
              text-white
              shadow-md
            `}
            title={name}
          >
            {letter}
          </div>
        );
      })}

      {remaining > 0 && (
        <div
          className="
            -ml-2
            flex h-11 w-11 items-center justify-center
            rounded-full
            border-2 border-white
            bg-blue-50
            text-sm
            font-semibold
            text-blue-600
            shadow-md
          "
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
