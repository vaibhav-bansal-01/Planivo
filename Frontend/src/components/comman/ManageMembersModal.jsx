import React, { useState, useEffect } from "react";
import { X, UserPlus, Users } from "lucide-react";
import { Button, MemberItem } from "../index.js";
import {
  getProjectMembers,
  addMemberToProject,
  updateMemberRole,
  removeMemberFromProject,
} from "../../api/projectApi.js";

function ManageMembersModal({ projectId, onClose }) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("member");
  const [inviting, setInviting] = useState(false);

  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await getProjectMembers(projectId);

      setMembers(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [projectId]);

  const handleInviteMember = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    try {
      setInviting(true);

      const response = await addMemberToProject(projectId, {
        email,
        role,
      });

      setMembers((prev) => [...prev, response.data.data]);

      setEmail("");
      setRole("member");
      setShowInviteForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setInviting(false);
    }
  };

  const handleRoleChange = async (userId, role) => {
    try {
      console.log("Changing role");
      console.log("project_admin");
      await updateMemberRole(projectId, userId, role);

      setMembers((prev) =>
        prev.map((member) =>
          member.user._id === userId ? { ...member, role } : member,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveMember = async (userId) => {
    try {
      await removeMemberFromProject(projectId, userId);

      setMembers((prev) => prev.filter((member) => member.user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6">
          <div>
            <h2 className="text-4xl font-bold text-gray-900">Manage Members</h2>

            <p className="mt-1 text-xl text-gray-500">
              Invite members, change their roles, or remove them from this
              project.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Invite Button */}
        <div className="border-b border-gray-100 px-8 py-5">
          {!showInviteForm && (
            <Button
              className="w-full px-6 py-3 text-base font-semibold"
              onClick={() => setShowInviteForm((prev) => !prev)}
            >
              <div className="flex items-center gap-2">
                <UserPlus size={18} />
                Invite Member
              </div>
            </Button>
          )}
          {showInviteForm && (
            <form
              onSubmit={handleInviteMember}
              className=" mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-6"
            >
              <div className="w-full">
                <input
                  type="email"
                  placeholder="Enter member email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-2 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 w-full h-16"
                />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-3 outline-none 
                  focus:border-blue-500 mt-6 w-full h-16"
              >
                <option value="member">Member</option>
                <option value="project_admin">Project Admin</option>
              </select>

              <div className="mt-5 flex justify-center gap-3">
                <Button
                  type="submit"
                  className="w-auto px-5 py-2"
                  disabled={inviting}
                >
                  {inviting ? "Inviting..." : "Invite"}
                </Button>

                <Button
                  type="button"
                  className="w-auto bg-gray-200 px-5 py-2 text-black hover:bg-gray-300"
                  onClick={() => {
                    setShowInviteForm(false);
                    setEmail("");
                    setRole("member");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-500">Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <Users className="h-10 w-10 text-blue-600" />
              </div>

              <h3 className="text-2xl font-semibold text-gray-900">
                No members yet
              </h3>

              <p className="mt-2 max-w-sm text-gray-500">
                Invite teammates to collaborate on this project.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {members.map((member) => (
                <MemberItem
                  key={member.user._id}
                  member={member}
                  onRoleChange={handleRoleChange}
                  onRemove={handleRemoveMember}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageMembersModal;
