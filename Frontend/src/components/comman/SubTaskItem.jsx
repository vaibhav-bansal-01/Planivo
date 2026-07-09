import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button, Input } from "../index.js";

import { updateSubTask, deleteSubTask } from "../../api/tasksApi";

function SubTaskItem({ subtask, projectId, taskId, refresh }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(subtask.title);
  const [description, setDescription] = useState(subtask.description || "");

  const handleToggle = async () => {
    try {
      await updateSubTask(projectId, subtask._id, {
        title,
        description,
        isCompleted: !subtask.isCompleted,
      });

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async () => {
    try {
      await updateSubTask(projectId, subtask._id, {
        title,
        description,
        isCompleted: subtask.isCompleted,
      });

      setIsEditing(false);

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteSubTask(projectId, subtask._id);

      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 p-4 transition hover:border-blue-300">
      {isEditing ? (
        <>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />

          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-3 w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <div className="mt-4 flex justify-end gap-3">
            <Button
              className="bg-gray-200 text-black hover:bg-gray-300"
              onClick={() => {
                setTitle(subtask.title);
                setDescription(subtask.description || "");
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>

            <Button onClick={handleSave}>Save</Button>
          </div>
        </>
      ) : (
        <div className="flex items-start justify-between">
          <div className="flex flex-1 items-start gap-3">
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={handleToggle}
              className="mt-1 h-5 w-5 accent-blue-600"
            />

            <div className="min-w-0">
              <p
                className={`font-medium ${
                  subtask.isCompleted
                    ? "text-gray-400 line-through"
                    : "text-gray-900"
                }`}
              >
                {subtask.title}
              </p>

              {subtask.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {subtask.description}
                </p>
              )}

              <div className="mt-2 text-xs text-gray-500">
                {subtask.createdBy?.fullName || subtask.createdBy?.username} •{" "}
                {new Date(subtask.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <MoreHorizontal size={18} />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border bg-white shadow-lg">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setIsEditing(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-gray-50"
                >
                  <Pencil size={16} />
                  Edit
                </button>

                <button
                  onClick={handleDelete}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubTaskItem;
