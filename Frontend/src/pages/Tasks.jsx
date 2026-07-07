import React, { useState, useEffect } from "react";
import { getUserTasks } from "../api/tasksApi";
import { Button, Card, Header, StatsCard, TaskRow } from "../components";
import TASK_STATUS from "../utils/constants";
import { ListTodo, Clock3, CircleCheck, Clock } from "lucide-react";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const response = await getUserTasks();
      setTasks(response.data.data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalTasks = tasks.length || 0;

  const inProgressTasks =
    tasks.filter((task) => task.status === TASK_STATUS.IN_PROGRESS).length || 0;

  const completedTasks =
    tasks.filter((task) => task.status === TASK_STATUS.DONE).length || 0;

  const overdueTasks = tasks.filter(
    (task) =>
      task.dueDate &&
      new Date(task.dueDate) < new Date() &&
      task.status !== TASK_STATUS.DONE,
  ).length;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      description: "All tasks",
      icon: ListTodo,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      description: "Tasks in progress",
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completedTasks,
      description: "Completed tasks",
      icon: CircleCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Overdue",
      value: overdueTasks,
      description: "Overdue tasks",
      icon: Clock,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">No tasks found</h1>

          <p className="max-w-md text-gray-600">
            You don't have any assigned tasks yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header
        title="Tasks"
        subtitle="View and manage all your tasks across projects"
      />
      {/* Stats */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Tasks */}
      <Card className="overflow-hidden rounded-3xl">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">Task</th>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Assignee</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Due Date</th>
              <th className="w-12 px-6 py-4"></th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task._id} task={task} />
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}

export default Tasks;
