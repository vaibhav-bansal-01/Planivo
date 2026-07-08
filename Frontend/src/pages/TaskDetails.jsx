import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Header,
  TaskHero,
  TaskInfo,
  SubTaskCard,
  AttachmentCard,
  NoteCard,
} from "../components";

import { getTaskById } from "../api/tasksApi";

function TaskDetails() {
  const { projectId, taskId } = useParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {
    try {
      setLoading(true);

      const response = await getTaskById(projectId, taskId);

      setTask(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Task not found.
      </div>
    );
  }

  return (
    <div className="space-y-10 p-8">
      <Header title="Task Details" subtitle={task.title} />

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <TaskHero task={task} />

          <SubTaskCard taskId={taskId} projectId={projectId} />

          <AttachmentCard task={task} setTask={setTask} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TaskInfo task={task} projectId={projectId} />

          <NoteCard projectId={projectId} />
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
