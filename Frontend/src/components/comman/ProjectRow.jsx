import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import TASK_STATUS from "../utils/constants";

function ProjectRow({ project, progress }) {
  const totalTasks = project.tasks?.length || 0;
  const completedTasks =
    project.tasks?.filter((task) => task.status === TASK_STATUS.DONE).length ||
    0;

  const status =
    progress === 100
      ? "Completed"
      : progress === 0
        ? "Not Started"
        : "In Progress";

  return (
    <tr className="border-b border-gray-100 transition hover:bg-gray-50">
      {/* Project */}
      <td className="px-6 py-5">
        <Link
          to={`/projects/${project._id}`}
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-semibold text-blue-600">
            {project.title?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {project.title}
            </h3>

            <p className="line-clamp-2 text-sm text-gray-500">
              {project.description || "No description"}
            </p>
          </div>
        </Link>
      </td>

      {/* Description */}
      <td className="max-w-xs px-6 py-5 text-sm text-gray-600">
        <p className="line-clamp-2">{project.description || "-"}</p>
      </td>

      {/* Members */}
      <td className="px-6 py-5 text-center">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
          {project.members?.length || 0}
        </span>
      </td>

      {/* Tasks */}
      <td className="px-6 py-5 text-center">
        <span className="font-medium">
          {completedTasks}/{totalTasks}
        </span>
      </td>

      {/* Progress */}
      <td className="w-56 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-blue-600"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-sm font-semibold text-blue-600">
            {progress}%
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-5">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === "Completed"
              ? "bg-green-100 text-green-700"
              : status === "In Progress"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      </td>

      {/* Updated */}
      <td className="px-6 py-5 text-sm text-gray-500">
        {new Date(project.updatedAt).toLocaleDateString()}
      </td>

      {/* Actions */}
      <td className="px-6 py-5 text-right">
        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <MoreHorizontal size={18} />
        </button>
      </td>
    </tr>
  );
}

export default ProjectRow;
