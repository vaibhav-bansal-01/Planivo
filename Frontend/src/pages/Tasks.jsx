import React, { useState, useEffect } from "react";
import { getUserTasks } from "../api/tasksApi";
import { Button, Card, Header, StatsCard, TaskRow } from "../components";
import TASK_STATUS from "../utils/constants";
import { ListTodo, Clock3, CircleCheck, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        <div className="flex flex-col items-center gap-3 text-center">
          <h1 className="text-4xl font-bold text-gray-900">No tasks found</h1>

          <p className="max-w-md text-gray-600 text-xl">
            You don't have any assigned tasks yet. Create your first task to get
            started.
          </p>

          <Button
            type="button"
            className="w-auto px-6 py-3 text-xl mt-6"
            onClick={() => navigate(`/tasks/new`)}
          >
            + Create Task
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 p-8">
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
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <TaskRow key={task._id} task={task} />
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex justify-end border-t border-gray-200 bg-white px-6 py-4">
          <Button className="px-6 py-3" onClick={() => navigate("/tasks/new")}>
            + Create Task
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Tasks;
