import React, { useState } from "react";
import {
  Header,
  ProjectCard,
  TaskCard,
  StatsCard,
  SectionHeader,
} from "../components";
import { FolderOpen, ListTodo, Clock3, CircleCheck } from "lucide-react";
import TASK_STATUS from "../utils/constants";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const fetchDashboard = async () => {
    try {
      const [tasksResponse, projectsResponse] = await Promise.all([
        getUserTasks(),
        getUserProjects(),
      ]);

      setTasks(tasksResponse.data.data.tasks);
      setProjects(projectsResponse.data.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      description: "Active projects",
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      description: "Tasks created",
      icon: ListTodo,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "In Progress",
      value: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS)
        .length,
      description: "Tasks in progress",
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Completed",
      value: tasks.filter((task) => task.status === TaskStatus.DONE).length,
      description: "Completed tasks",
      icon: CircleCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-10 p-8">
      <Header title="Dashboard" />

      {/* Stats */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Recent Projects */}
      <section className="space-y-6">
        <SectionHeader
          title="Recent Projects"
          link="/projects"
          linkText="View all projects"
        />

        <div className="grid grid-cols-2 gap-6">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>

      {/* Tasks */}
      <section className="grid grid-cols-2 gap-6">
        <TaskCard
          title="In Progress"
          tasks={tasks}
          status={TASK_STATUS.IN_PROGRESS}
        />

        <TaskCard title="Completed" tasks={tasks} status={TASK_STATUS.DONE} />
      </section>
    </div>
  );
}

export default Dashboard;
