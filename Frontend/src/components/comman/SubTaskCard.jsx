import React, { useState, useEffect } from "react";
import { Card, SectionHeader, SubTaskItem } from "../index.js";
import { getSubTasksByTaskId } from "../../api/tasksApi";

function SubTaskCard({ projectId, taskId }) {
  const [subtasks, setSubtasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSubTasks = async () => {
    try {
      const response = await getSubTasksByTaskId(projectId, taskId);
      setSubtasks(response.data.data.subtasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubTasks();
  }, [taskId]);

  return (
    <Card>
      <SectionHeader
        title="Subtasks"
        link="/tasks"
        linkText={subtasks.length > 3 ? "View all" : null}
      />

      {loading ? (
        <div className="py-8 text-center text-sm text-gray-500">
          Loading subtasks...
        </div>
      ) : subtasks.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          No subtasks yet.
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {subtasks.slice(0, 3).map((subtask) => (
              <SubTaskItem key={subtask._id} subtask={subtask} />
            ))}
          </div>

          {subtasks.length > 3 && (
            <p className="mt-4 text-center text-sm text-blue-600">
              + {subtasks.length - 3} more subtasks
            </p>
          )}
        </>
      )}
    </Card>
  );
}

export default SubTaskCard;
