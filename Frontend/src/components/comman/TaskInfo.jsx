import React, { useEffect, useState } from "react";
import { Card } from "../index.js";
import { updateTask } from "../../api/tasksApi";
import TASK_STATUS from "../../utils/constants.js";

function TaskInfoCard({ task, setTask, members = [] }) {
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [assignee, setAssignee] = useState(task.assignedTo?._id || "");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? task.dueDate.slice(0, 10) : "",
  );

  useEffect(() => {
    setStatus(task.status);
    setPriority(task.priority);
    setAssignee(task.assignedTo?._id || "");
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
  }, [task]);

  const handleUpdate = async (field, value) => {
    try {
      const response = await updateTask(task._id, {
        [field]: value,
      });

      setTask(response.data.data.task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Task Information
      </h2>

      <div className="space-y-5">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Status</span>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              handleUpdate("status", e.target.value);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value={TASK_STATUS.TODO}>Todo</option>
            <option value={TASK_STATUS.IN_PROGRESS}>In Progress</option>
            <option value={TASK_STATUS.DONE}>Done</option>
          </select>
        </div>

        {/* Priority */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Priority</span>

          <select
            value={priority}
            onChange={(e) => {
              setPriority(e.target.value);
              handleUpdate("priority", e.target.value);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>

        {/* Assignee */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Assignee</span>

          <select
            value={assignee}
            onChange={(e) => {
              setAssignee(e.target.value);
              handleUpdate("assignedTo", e.target.value);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            {members.map((member) => (
              <option key={member.user._id} value={member.user._id}>
                {member.user.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Due Date</span>

          <input
            type="date"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value);
              handleUpdate("dueDate", e.target.value);
            }}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />
        </div>

        <hr />

        {/* Read Only */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Project</span>

          <span className="text-sm font-medium">{task.project?.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Assigned By</span>

          <span className="text-sm font-medium">
            {task.assignedBy?.fullName}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Created</span>

          <span className="text-sm font-medium">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">Updated</span>

          <span className="text-sm font-medium">
            {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default TaskInfoCard;
