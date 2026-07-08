import React from "react";
import { ArrowRight } from "lucide-react";

function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  showArrow = false,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : "w-fit"}
        inline-flex items-center justify-center gap-2
        rounded-2xl
        bg-zinc-900
        px-6
        py-3
        text-base
        font-semibold
        text-white
        shadow-lg
        transition-all
        duration-200
        hover:bg-black
        hover:shadow-xl
        hover:scale-110
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {children}

      {showArrow && <ArrowRight size={18} />}
    </button>
  );
}

export default Button;
