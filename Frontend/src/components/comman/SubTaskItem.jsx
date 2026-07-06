import React from "react";
import { MoreHorizontal } from "lucide-react";

function SubTaskItem({ subtask }) {
  return (
    <div className="flex items-start justify-between rounded-xl p-4 transition hover:bg-gray-50">
      <div className="flex flex-1 items-start gap-3">
        <input
          type="checkbox"
          checked={subtask.completed}
          readOnly
          className="mt-1 h-4 w-4 rounded border-gray-300 accent-blue-600"
        />

        <div className="min-w-0">
          <p
            className={`line-clamp-2 text-sm font-medium ${
              subtask.completed ? "text-gray-400 line-through" : "text-gray-700"
            }`}
          >
            {subtask.title}
          </p>

          <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
            <span>{subtask.createdBy?.username}</span>

            <span>•</span>

            <span>{new Date(subtask.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <button className="rounded-lg p-2 transition hover:bg-gray-100">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export default SubTaskItem;
