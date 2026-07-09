import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AvatarGroup,
  Button,
  Card,
  Input,
  ManageMembersModal,
} from "../index.js";
import { MoreVertical, Users } from "lucide-react";
import { canUpdateProject, canDeleteProject } from "../../utils/permissions.js";

import { updateProject, deleteProject } from "../../api/projectApi";

function ProjectHero({ project, projectId, members, setProject }) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMembersModal, setShowMembersModal] = useState(false);

  useEffect(() => {
    if (project) {
      setProjectName(project.name);
      setProjectDescription(project.description || "");
    }
  }, [project]);

  const hasChanges =
    projectName !== project.name ||
    projectDescription !== (project.description || "");

  const handleUpdateProject = async () => {
    try {
      if (!projectName.trim()) return;

      const response = await updateProject(projectId, {
        name: projectName,
        description: projectDescription,
      });

      setProject(response.data.data);

      setIsEditing(false);
      setShowMenu(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(projectId);

      navigate("/projects");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="h-full">
        <div className="flex h-full flex-col justify-between">
          {/* TOP */}
          <div className="flex justify-between gap-6">
            <div className="flex gap-5">
              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-4xl font-bold text-white shadow">
                {project.name.charAt(0).toUpperCase()}
              </div>

              {/* Name + Description */}
              <div className="flex-1">
                {isEditing ? (
                  <>
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="text-3xl font-bold"
                    />

                    <textarea
                      rows={4}
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="mt-4 w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500"
                      placeholder="Project description..."
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold text-gray-900">
                      {project.name}
                    </h1>

                    <p className="mt-4 max-w-lg text-lg leading-8 text-gray-600">
                      {project.description || "No description yet."}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* MENU */}
            {canUpdateProject(project?.currentUser?.role) && (
              <div className="relative">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setShowMenu((prev) => !prev)}
                      className="rounded-xl p-2 transition hover:bg-gray-100"
                    >
                      <MoreVertical size={22} />
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border bg-white shadow-lg">
                        <button
                          className="w-full px-4 py-3 text-left hover:bg-gray-100"
                          onClick={() => {
                            setShowMenu(false);
                            setIsEditing(true);
                          }}
                        >
                          ✏ Edit Project
                        </button>

                        <button
                          className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setShowMenu(false);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete Project
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex gap-3">
                    <Button
                      className="w-auto px-5 py-3 text-base"
                      onClick={() => {
                        setProjectName(project.name);
                        setProjectDescription(project.description || "");
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      className="w-auto px-5 py-3 text-base"
                      disabled={!hasChanges}
                      onClick={handleUpdateProject}
                    >
                      Save
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* BOTTOM */}
          <div className="mt-10 flex items-center justify-between">
            <AvatarGroup members={members} count={5} />
            {canUpdateProject(project.currentUser.role) && (
              <Button
                className="w-auto px-6 py-3 text-base font-semibold"
                onClick={() => setShowMembersModal(true)}
              >
                <div className="flex items-center gap-2">
                  <Users size={18} />
                  Manage Members
                </div>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold">Delete Project</h2>

            <p className="mt-4 text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{project.name}</span>?
            </p>

            <div className="mt-8 flex justify-end gap-3">
              <Button
                className="w-auto px-5 py-3 text-base"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>

              <Button
                className="w-auto bg-red-600 px-5 py-3 text-base hover:bg-red-700"
                onClick={handleDeleteProject}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* MEMBERS MODAL */}
      {showMembersModal && (
        <ManageMembersModal
          projectId={projectId}
          onClose={() => setShowMembersModal(false)}
        />
      )}
    </>
  );
}

export default ProjectHero;
