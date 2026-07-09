import React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../index.js";

function ProjectCard({ project }) {
  const navigate = useNavigate();

  const totalTasks = project.tasks?.length || 0;

  const completedTasks =
    project.tasks?.filter((task) => task.status === "done").length || 0;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <Card
      onClick={() => navigate(`/projects/${project._id}`)}
      className="cursor-pointer rounded-3xl border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-lg font-bold text-blue-600">
          {project.name?.charAt(0).toUpperCase()}
        </div>

        <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
      </div>

      {/* Description */}
      <p className="mt-5 min-h-\[48px\] text-sm leading-6 text-gray-600">
        {project.description || "No description provided."}
      </p>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium text-gray-600">Progress</span>

          <span className="text-sm font-semibold text-blue-600">
            {progress}%
          </span>
        </div>

        <div className="h-2 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-between border-t border-gray-100 pt-5">
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Tasks
          </p>

          <p className="mt-1 text-2xl font-bold">{totalTasks}</p>
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Members
          </p>

          <p className="mt-1 text-2xl font-bold">
            {project.members?.length || 0}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default ProjectCard;
