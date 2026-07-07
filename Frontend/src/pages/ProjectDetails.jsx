import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  Button,
  StatsCard,
  Card,
  TaskCard,
  ProgressBar,
  NoteCard,
  ProjectHero,
} from "../components/index.js";
import { ListTodo, Clock3, CircleCheck } from "lucide-react";
import {
  getProjectById,
  getProjectTasks,
  getProjectMembers,
} from "../api/projectApi";
import TASK_STATUS from "../constants/taskStatus";

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

        const fetchedProject = projectRes.data.data.project;

        setProject(fetchedProject);
        setTasks(tasksRes.data.data.tasks);
        setMembers(membersRes.data.data.members);
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
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
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
    <div className="space-y-8">
      <Header />

      {/* Hero */}
      <ProjectHero
        project={project}
        projectId={projectId}
        members={members}
        setProject={setProject}
      />

      {/* Stats */}
      <section className="grid grid-cols-3 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </section>

      {/* Progress */}
      <Card>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Overall Progress</h2>

            <span className="text-lg font-bold text-blue-600">{progress}%</span>
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

      {/* Tasks */}
      <div className="grid grid-cols-2 gap-6">
        <TaskCard
          title="In Progress"
          tasks={tasks}
          status={TASK_STATUS.IN_PROGRESS}
        />

        <TaskCard title="Completed" tasks={tasks} status={TASK_STATUS.DONE} />
      </div>

      {/* Notes */}
      <NoteCard projectId={projectId} />
    </div>
  );
}

export default ProjectDetails;
