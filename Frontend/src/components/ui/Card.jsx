import React from "react";

function Card({ children, className = "", padding = "p-8" }) {
  return (
    <div
      className={`
        rounded-3xl
        bg-white
        shadow-lg
        border
        border-gray-200
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
