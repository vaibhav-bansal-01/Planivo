import React from "react";
import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

function TaskItem({ task }) {
  const priorityClasses = {
    high: "bg-red-100 text-red-600",
    medium: "bg-yellow-100 text-yellow-600",
    low: "bg-green-100 text-green-600",
  };

  return (
    <>
      <Link to={`/projects/${task.project._id}/tasks/${task._id}`}>
        <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-4 transition hover:bg-gray-50">
          {/* Left */}
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <Wrench size={20} />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {task.title}
              </h3>

              <p className="text-sm text-gray-500">
                {task.project?.title || "No Project"}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Priority */}
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                priorityClasses[task.priority?.toLowerCase()] ||
                priorityClasses.low
              }`}
            >
              {task.priority}
            </span>

            {/* Avatar */}
            {task.assignedTo?.avatar ? (
              <img
                src={task.assignedTo.avatar}
                alt={task.assignedTo.username}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {task.assignedTo?.username?.charAt(0).toUpperCase() || "U"}
              </div>
            )}

            {/* Due Date */}
            <div className="text-right">
              <p className="text-xs text-gray-400">Due</p>

              <p className="text-sm font-medium text-gray-700">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No Due Date"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default TaskItem;
