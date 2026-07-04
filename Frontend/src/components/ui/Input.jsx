import React from "react";
import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      placeholder = "",
      icon: Icon,
      error,
      className = "",
      inputClassName = "",
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={`w-full ${className}`}>
        {label && (
          <label className="mb-2 block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}

        <div
          className={`
            flex items-center gap-4
            rounded-3xl
            border
            bg-white
            px-6
            py-4
            transition-all
            duration-200

            ${
              error
                ? "border-red-500"
                : "border-gray-300 focus-within:border-black"
            }

            focus-within:ring-2
            focus-within:ring-black/10

            ${disabled ? "cursor-not-allowed opacity-60" : ""}
          `}
        >
          {Icon && <Icon size={24} className="text-gray-400" />}

          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`
              w-full
              bg-transparent
              text-lg
              text-gray-800
              placeholder:text-gray-400
              outline-none
              ${inputClassName}
            `}
            {...props}
          />
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
