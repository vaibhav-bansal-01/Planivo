import React, { useEffect, useState } from "react";
import {
  Header,
  StatsCard,
  Card,
  TaskCard,
  ProgressBar,
  NoteCard,
  ProjectHero,
} from "../components/index.js";
import { ListTodo, Clock3, CircleCheck } from "lucide-react";
import { useParams } from "react-router-dom";
import { getProjectById, getProjectMembers } from "../api/projectApi";
import { getProjectTasks } from "../api/tasksApi";
import TASK_STATUS from "../utils/constants.js";

function ProjectDetails() {
  const { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);

        const [projectRes, tasksRes, membersRes] = await Promise.all([
          getProjectById(projectId),
          getProjectTasks(projectId),
          getProjectMembers(projectId),
        ]);

        setProject(projectRes.data.data);
        setTasks(tasksRes.data.data);
        setMembers(membersRes.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex h-screen items-center justify-center">
        Project not found.
      </div>
    );
  }

  const totalTasks = tasks.length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === TASK_STATUS.IN_PROGRESS,
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === TASK_STATUS.DONE,
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

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
  ];

  return (
    <div className="space-y-10 p-8">
      <Header title="Project Details" subtitle={project.name} />

      {/* Hero + Stats */}
      <section className="grid grid-cols-12 gap-6">
        {/* Left Side - Project Hero */}
        <div className="col-span-5">
          <ProjectHero
            project={project}
            projectId={projectId}
            members={members}
            setProject={setProject}
          />
        </div>

        {/* Right Side */}
        <div className="col-span-7 flex flex-col gap-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat) => (
              <StatsCard key={stat.title} {...stat} />
            ))}
          </div>

          {/* Progress */}
          <Card>
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Overall Progress</h2>

                <span className="text-lg font-bold text-blue-600">
                  {progress}%
                </span>
              </div>

              <ProgressBar progress={progress} />

              <div className="flex justify-between text-sm text-gray-500">
                <span>
                  Started {new Date(project.createdAt).toLocaleDateString()}
                </span>

                <span>
                  Updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Bottom Row */}
      <section className="grid grid-cols-3 gap-6">
        <TaskCard
          title="In Progress"
          tasks={tasks}
          status={TASK_STATUS.IN_PROGRESS}
        />

        <TaskCard title="Completed" tasks={tasks} status={TASK_STATUS.DONE} />

        <NoteCard projectId={projectId} />
      </section>
    </div>
  );
}

export default ProjectDetails;
