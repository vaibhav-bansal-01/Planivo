import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  Header,
  TaskHero,
  TaskInfoCard,
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

      const response = await getTaskById(taskId);

      setTask(response.data.data.task);
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
    <div className="space-y-8">
      <Header />

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          <TaskHero task={task} />

          <SubTaskCard taskId={taskId} projectId={projectId} />

          <AttachmentCard task={task} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <TaskInfoCard task={task} />

          <NoteCard projectId={projectId} />
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
