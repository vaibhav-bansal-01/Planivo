import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "../components/index.js";
import { MoreVertical } from "lucide-react";
import { updateTask, deleteTask } from "../../api/tasksApi";

function TaskHero({ task, setTask }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
    }
  }, [task]);

  const hasChanges =
    title !== task.title || description !== (task.description || "");

  const handleUpdateTask = async () => {
    try {
      if (!title.trim()) return;

      const response = await updateTask(task._id, {
        title,
        description,
      });

      const updatedTask = response.data.data.task;

      setTask(updatedTask);
      setTitle(updatedTask.title);
      setDescription(updatedTask.description || "");

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(task._id);

      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-3xl font-bold outline-none focus:border-blue-500"
                />

                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Add a description..."
                  className="mt-4 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-500"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {task.title}
                </h1>

                <p className="mt-3 text-gray-600">
                  {task.description || "No description yet."}
                </p>
              </>
            )}
          </div>

          {isEditing ? (
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setTitle(task.title);
                  setDescription(task.description || "");
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button disabled={!hasChanges} onClick={handleUpdateTask}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="rounded-xl p-2 transition hover:bg-gray-100"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setIsEditing(true);
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
          )}
        </div>
      </Card>

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
                variant="secondary"
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
