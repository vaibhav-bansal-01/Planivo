import React from "react";

function Card({ children, className = "", padding = "p-8", onClick }) {
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
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Card;
