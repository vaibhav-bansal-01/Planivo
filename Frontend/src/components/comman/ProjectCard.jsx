import React from "react";
import { Card } from "../index.js";
import { MoreHorizontal } from "lucide-react";

function ProjectCard({ project }) {
  const totalTasks = project.tasks?.length || 0;
  const completedTasks =
    project.tasks?.filter((task) => task.status === "done").length || 0;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card className="rounded-3xl border border-gray-200 p-6 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
            {project.title?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {project.title}
            </h3>
          </div>
        </div>

        <button className="rounded-lg p-2 transition hover:bg-gray-100">
          <MoreHorizontal size={20} className="text-gray-500" />
        </button>
      </div>

      {/* Description */}
      <p className="mt-5 line-clamp-2 text-sm leading-6 text-gray-600">
        {project.description || "No description provided."}
      </p>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Progress</p>

          <span className="text-sm font-semibold text-blue-600">
            {progress}%
          </span>
        </div>

        <div className="h-2 w-full rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-gray-400">Tasks</p>

          <p className="text-lg font-semibold text-gray-900">
            {project.tasks?.length || 0}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wide text-gray-400">
            Members
          </p>

          <p className="text-lg font-semibold text-gray-900">
            {project.members?.length || 0}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
