import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, Input } from "../components";

import { getProjectMembers, getUserProjects } from "../api/projectApi.js";

import { createTask, updateTask, getTaskById } from "../api/tasksApi.js";

function CreateTask() {
  const navigate = useNavigate();

  const { projectId: routeProjectId, taskId } = useParams();

  const isEdit = Boolean(taskId);

  const [projectId, setProjectId] = useState(routeProjectId || "");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [projects, setProjects] = useState([]);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getUserProjects();

        setProjects(response.data.data);

        if (!isEdit && response.data.data.length > 0) {
          setProjectId(response.data.data[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!isEdit) return;

    const fetchTask = async () => {
      try {
        setLoading(true);

        const response = await getTaskById(routeProjectId, taskId);

        const task = response.data.data;

        setTitle(task.title);
        setDescription(task.description || "");
        setStatus(task.status);
        setPriority(task.priority);
        setAssignedTo(task.assignedTo?._id || "");

        setDueDate(
          task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "",
        );

        setProjectId(task.project._id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, routeProjectId]);

  useEffect(() => {
    if (!projectId) return;

    const fetchMembers = async () => {
      try {
        const response = await getProjectMembers(projectId);

        setMembers(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMembers();
  }, [projectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        title,
        description,
        assignedTo,
        status,
        priority,
        dueDate,
      };

      if (isEdit) {
        await updateTask(projectId, taskId, payload);
      } else {
        await createTask(projectId, payload);
      }

      navigate(`/projects/${projectId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 p-8">
      {/* Header */}

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 font-medium text-gray-500 transition hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          {isEdit ? "Edit Task" : "Create Task"}
        </h1>

        <p className="mt-2 text-gray-500">
          {isEdit
            ? "Update your task details."
            : "Add a new task to your project."}
        </p>
      </div>

      <Card className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}

          <div>
            <label className="mb-2 block font-semibold">Task Title</label>

            <Input
              placeholder="Design Landing Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}

          <div>
            <label className="mb-2 block font-semibold">Description</label>

            <textarea
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this task..."
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
            />
          </div>

          {/* Project */}

          <div>
            <label className="mb-2 block font-semibold">Project</label>

            <select
              disabled={isEdit}
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>

            {isEdit && (
              <p className="mt-2 text-sm text-gray-500">
                Project cannot be changed after task creation.
              </p>
            )}
          </div>

          {/* Grid */}

          <div className="grid grid-cols-2 gap-6">
            {/* Assignee */}

            <div>
              <label className="mb-2 block font-semibold">Assign To</label>

              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
              >
                <option value="">Select Member</option>

                {members.map((member) => (
                  <option key={member.user._id} value={member.user._id}>
                    {member.user.fullName ||
                      member.user.username ||
                      member.user.email}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date */}

            <div>
              <label className="mb-2 block font-semibold">Due Date</label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
              />
            </div>

            {/* Status */}

            <div>
              <label className="mb-2 block font-semibold">Status</label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
              >
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            {/* Priority */}

            <div>
              <label className="mb-2 block font-semibold">Priority</label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-2xl border border-gray-300 px-5 py-4 outline-none focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              className="bg-gray-200 text-black hover:bg-gray-300"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={loading}>
              {loading
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save Changes"
                  : "Create Task"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default CreateTask;
