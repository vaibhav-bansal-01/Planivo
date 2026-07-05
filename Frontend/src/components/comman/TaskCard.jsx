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

  return (
    <Card className="p-6">
      <SectionHeader title={title || "Tasks"} link="/tasks" linkText="View all tasks" />

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
