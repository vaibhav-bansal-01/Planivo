import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AvatarGroup } from "../index.js";
import { MoreVertical } from "lucide-react";
import { Card, Button, Input } from "../index.js";
import { updateProject, deleteProject } from "../../api/projectApi";

function ProjectHero({ project, projectId, members, setProject }) {
  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const hasChanges =
    projectName !== project.name ||
    projectDescription !== (project.description || "");

  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description || "");
    }
  }, [project]);

  const handleUpdateProject = async () => {
    try {
      if (!projectName.trim()) return;
      const response = await updateProject(projectId, {
        name: projectName,
        description: projectDescription,
      });

      const updatedProject = response.data.data.project;

      setProject(updatedProject);
      setProjectName(updatedProject.name);
      setProjectDescription(updatedProject.description || "");
      setIsEditing(false);
      setShowMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId);

      setShowDeleteModal(false);

      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card>
        <div className="flex items-start justify-between gap-8">
          <div className="flex-1">
            {isEditing ? (
              <>
                <Input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-3xl font-bold outline-none focus:border-blue-500"
                />

                <textarea
                  rows={5}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Add a description..."
                  className="mt-4 w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-gray-700 outline-none focus:border-blue-500"
                />
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {project.name}
                </h1>

                <p className="mt-3 text-gray-600">
                  {project.description || "No description yet."}
                </p>
              </>
            )}
          </div>

          {isEditing ? (
            <div className="ml-6 flex gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  setProjectName(project.name);
                  setProjectDescription(project.description || "");
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>

              <Button disabled={!hasChanges} onClick={handleUpdateProject}>
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                className="rounded-xl p-2 transition hover:bg-gray-100"
              >
                <MoreVertical size={20} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setIsEditing(true);
                    }}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-gray-50"
                  >
                    ✏ Edit Project
                  </button>

                  <button
                    onClick={() => {
                      setShowMenu(false);
                      setShowDeleteModal(true);
                    }}
                    className="block w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete Project
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <AvatarGroup members={members} count={4} />

          <Button>Manage Members</Button>
        </div>
      </Card>
      {/* Delete Project Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Delete Project</h2>

            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold"> {project.name}</span>? This
              action cannot be undone.
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={handleDeleteProject}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectHero;
