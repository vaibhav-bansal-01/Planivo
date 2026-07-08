import React, { useState, useEffect } from "react";
import {
  Header,
  StatsCard,
  Card,
  ProjectRow,
  Button,
} from "../components/index.js";
import { getUserProjects } from "../api/projectApi";
import { FolderOpen, ListTodo, Clock3, CircleCheck } from "lucide-react";
import TASK_STATUS from "../utils/constants";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      const response = await getUserProjects();
      setProjects(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const progress = (project) => {
    const totalTasks = project.tasks?.length || 0;
    const completedTasks =
      project.tasks?.filter((task) => task.status === "TASK_STATUS.DONE")
        .length || 0;

    return totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    try {
      fetchProjects();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      setError(null);
    }
  }, []);

  const activeProjects = projects.filter(
    (project) => progress(project) !== 100,
  );
  const completedProjects = projects.filter(
    (project) => progress(project) === 100,
  );
  const recentProjects = projects.filter((project) => progress(project) < 25);

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      description: "Total Projects",
      icon: FolderOpen,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Active",
      value: activeProjects.length || 0,
      description: "Active Projects",
      icon: ListTodo,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      title: "Recently Started",
      value: recentProjects.length || 0,
      description: "Recently started Projects",
      icon: Clock3,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Completed",
      value: completedProjects.length || 0,
      description: "Completed Projects",
      icon: CircleCheck,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <FolderOpen className="h-16 w-16 text-gray-300" />

        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          No projects yet
        </h2>

        <p className="mt-2 text-gray-500">
          Create your first project to start organizing your work.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <p>Error: {error.message}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-8 p-8">
      <Header
        title="Projects"
        subtitle="Create and manage your projects in one place"
      />

      {/* Stats */}
      <section className="grid grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Projects Table */}
      <Card className="overflow-hidden rounded-3xl">
        <table className="w-full border-collapse">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-600">
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Members</th>
              <th className="px-6 py-4">Tasks</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Updated</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((project) => (
              <ProjectRow
                key={project._id}
                project={project}
                progress={progress(project)}
              />
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default Projects;
