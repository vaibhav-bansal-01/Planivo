import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../index.js";
import { MoreVertical } from "lucide-react";
import { deleteTask } from "../../api/tasksApi";

function TaskHero({ task }) {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task.project._id, task._id);

      navigate(`/projects/${task.project._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = () => {
    navigate(`/projects/${task.project._id}/tasks/${task._id}/edit`);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{task.title}</h1>

            <p className="mt-3 text-gray-600">
              {task.description || "No description yet."}
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="rounded-xl p-2 transition hover:bg-gray-100"
            >
              <MoreVertical size={20} />
            </button>

            {showMenu && (
              <div className="absolute right-0 z-10 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleEditTask();
                  }}
                  className="block w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                >
                  ✏ Edit Task
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowDeleteModal(true);
                  }}
                  className="block w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                >
                  🗑 Delete Task
                </button>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Delete Task</h2>

            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> {task.title}</span>? This action
              cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={handleDeleteTask}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskHero;
