import React from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import TASK_STATUS from "../../utils/constants.js";

function TaskRow({ task }) {
  return (
    <tr className="border-b border-gray-100 transition hover:bg-gray-50">
      {/* Task */}
      <td className="px-6 py-5 align-middle">
        <Link
          to={`/projects/${task.project._id}/tasks/${task._id}`}
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-lg font-semibold text-blue-600">
            {task.title?.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-gray-900">
              {task.title}
            </h3>

            <p className="line-clamp-2 text-sm text-gray-500">
              {task.description || "No description"}
            </p>
          </div>
        </Link>
      </td>

      {/* Project */}
      <td className="max-w-xs px-6 py-5 text-sm text-gray-600 align-middle">
        <p className="line-clamp-2">{task.project.name}</p>
      </td>

      {/* Assignee */}
      <td className="px-6 py-5 align-middle">
        <div className="flex items-center gap-3">
          {task.assignedTo?.avatar ? (
            <img
              src={task.assignedTo.avatar}
              alt={task.assignedTo.fullName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
              {task.assignedTo?.fullName?.charAt(0).toUpperCase()}
            </div>
          )}

          <span className="text-sm font-medium text-gray-800">
            {task.assignedTo?.username || task.assignedTo?.fullName}
          </span>
        </div>
      </td>

      {/* Priority */}
      <td className="px-6 py-5 align-middle text-center">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            task.priority === "high"
              ? "bg-red-100 text-red-700"
              : task.priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
      </td>

      {/* Status */}
      <td className="px-6 py-5 align-middle">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${
            task.status === TASK_STATUS.DONE
              ? "bg-green-100 text-green-700"
              : task.status === TASK_STATUS.IN_PROGRESS
                ? "bg-yellow-100 text-yellow-700"
                : "bg-gray-100 text-gray-700"
          }`}
        >
          {task.status.replace("_", " ")}
        </span>
      </td>

      {/* Due Date */}
      <td className="px-6 py-5 align-middle">
        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
      </td>
    </tr>
  );
}

export default TaskRow;
