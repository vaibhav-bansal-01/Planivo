import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FolderOpen } from "lucide-react";

function ProjectListItem({ project }) {
  const location = useLocation();

  const isActive = location.pathname === `/projects/${project._id}`;

  return (
    <Link
      to={`/projects/${project._id}`}
      className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition ${
        isActive
          ? "bg-blue-100 text-blue-600"
          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <FolderOpen size={18} />

      <span className="truncate">{project.name}</span>
    </Link>
  );
}

export default ProjectListItem;
