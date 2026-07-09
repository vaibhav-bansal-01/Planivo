import React from "react";
import { Card, SectionHeader, TaskItem } from "../index.js";

function TaskCard({ tasks = [], status, title }) {
  const pendingTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "todo",
  );

  const inProgressTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "in_progress",
  );

  const doneTasks = tasks.filter(
    (task) => task.status.toLowerCase() === "done",
  );

  let taskArray = [];

  if (status === "pending") {
    taskArray = pendingTasks;
  } else if (status === "in_progress") {
    taskArray = inProgressTasks;
  } else if (status === "done") {
    taskArray = doneTasks;
  } else {
    taskArray = tasks;
  }

  if (taskArray.length === 0) {
    return (
      <Card className="flex flex-col">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>

          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View all tasks
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
            📋
          </div>

          <h3 className="text-lg font-semibold text-gray-800">No tasks yet</h3>

          <p className="mt-2 max-w-xs text-sm text-gray-500">
            Create your first task to start tracking progress.
          </p>
        </div>
      </Card>
    );
  }

  return (
      <Card className="p-6">
        <SectionHeader
          title={title || "Tasks"}
          link="/tasks"
          linkText="View all tasks"
        />

        <div className="mt-6 space-y-4">
          {taskArray.slice(0, 4).map((task) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>

        {taskArray.length > 4 && (
          <div className="mt-5 text-center text-sm font-medium text-blue-600">
            + {taskArray.length - 4} more tasks
          </div>
        )}
      </Card>
  );
}

export default TaskCard;
