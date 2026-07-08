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
        rounded-2xl
        bg-zinc-900
        px-8
        py-5
        text-2xl
        font-bold
        text-white
        shadow-lg
        transition-all
        duration-300
        hover:bg-black
        hover:shadow-xl
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      <div className="flex items-center justify-center gap-3">
        {children}

        {showArrow && <ArrowRight size={34} strokeWidth={2.5} />}
      </div>
    </button>
  );
}

export default Button;
