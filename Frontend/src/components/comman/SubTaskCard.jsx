import React, { useState, useEffect } from "react";
import { Card, Button, Input, SubTaskItem } from "../index.js";
import { Plus, CheckCircle2 } from "lucide-react";

import { getSubTasksByTaskId, createSubTask } from "../../api/tasksApi";

function SubTaskCard({ projectId, taskId }) {
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchSubTasks = async () => {
    try {
      setLoading(true);

      const response = await getSubTasksByTaskId(projectId, taskId);

      setSubtasks(response.data.data.subtasks || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubTasks();
  }, [projectId, taskId]);

  const handleCreate = async () => {
    if (!title.trim()) return;

    try {
      await createSubTask(projectId, taskId, {
        title,
        description,
      });

      setTitle("");
      setDescription("");
      setShowForm(false);

      fetchSubTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const completed = subtasks.filter((subtask) => subtask.isCompleted).length;

  const percentage =
    subtasks.length === 0 ? 0 : (completed / subtasks.length) * 100;

  return (
    <Card>
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Subtasks</h2>

        <Button
          className="px-5 py-2 text-base"
          onClick={() => setShowForm((prev) => !prev)}
        >
          <Plus size={18} />
          Add
        </Button>
      </div>

      {/* Add Form */}

      {showForm && (
        <div className="mt-6 rounded-2xl border border-gray-200 p-5">
          <div className="space-y-4">
            <Input
              placeholder="Subtask title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
            />

            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  setDescription("");
                }}
              >
                Cancel
              </Button>

              <Button onClick={handleCreate}>Create</Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="py-8 text-center text-gray-500">
          Loading subtasks...
        </div>
      ) : subtasks.length === 0 ? (
        <div className="py-12 text-center">
          <CheckCircle2 size={42} className="mx-auto mb-3 text-gray-300" />

          <h3 className="text-lg font-semibold">No subtasks yet</h3>

          <p className="mt-2 text-sm text-gray-500">
            Break this task into smaller steps.
          </p>
        </div>
      ) : (
        <>
          {/* Progress */}

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-sm">
              <span>Progress</span>

              <span>
                {completed}/{subtasks.length}
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${percentage}%`,
                }}
              />
            </div>
          </div>

          {/* List */}

          <div className="mt-6 space-y-3">
            {subtasks.map((subtask) => (
              <SubTaskItem
                key={subtask._id}
                subtask={subtask}
                projectId={projectId}
                taskId={taskId}
                refresh={fetchSubTasks}
              />
            ))}
          </div>
        </>
      )}
    </Card>
  );
}
export default SubTaskCard;
