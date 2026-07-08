import React, { useEffect, useState } from "react";
import { Card } from "../index.js";
import { getProjectById } from "../../api/projectApi.js";

function TaskInfoCard({ task, projectId }) {
  const statusColors = {
    todo: "bg-gray-100 text-gray-700",
    in_progress: "bg-yellow-100 text-yellow-700",
    done: "bg-green-100 text-green-700",
  };

  const priorityColors = {
    low: "bg-green-100 text-green-700",
    medium: "bg-yellow-100 text-yellow-700",
    high: "bg-red-100 text-red-700",
  };

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        const [projectRes] = await Promise.all([getProjectById(projectId)]);

        setProject(projectRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  return (
    <Card className="p-6">
      <h2 className="mb-6 text-xl font-bold text-gray-900">Task Information</h2>

      <div className="space-y-5">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Status</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              statusColors[task.status] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Priority</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
              priorityColors[task.priority] || "bg-gray-100 text-gray-700"
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Assignee */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Assignee</span>

          <span className="text-sm font-medium text-gray-900">
            {task.assignedTo?.fullName || task.assignedTo?.username || "-"}
          </span>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Due Date</span>

          <span className="text-sm font-medium text-gray-900">
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No due date"}
          </span>
        </div>

        <hr className="border-gray-200" />

        {/* Project */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Project</span>

          <span className="text-sm font-medium text-gray-900">
            {project?.name}
          </span>
        </div>

        {/* Assigned By */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Assigned By</span>

          <span className="text-sm font-medium text-gray-900">
            {task.assignedBy?.fullName || task.assignedBy?.username}
          </span>
        </div>

        {/* Created */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Created</span>

          <span className="text-sm font-medium text-gray-900">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Updated */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Updated</span>

          <span className="text-sm font-medium text-gray-900">
            {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default TaskInfoCard;
