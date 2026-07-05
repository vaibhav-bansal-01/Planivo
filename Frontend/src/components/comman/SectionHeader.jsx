import React from "react";
import { Link } from "react-router-dom";

function SectionHeader({ title, link, linkText }) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>

      {link && linkText && (
        <Link
          to={link}
          className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
        >
          {linkText}
        </Link>
      )}
    </div>
  );
}

export default SectionHeader;
