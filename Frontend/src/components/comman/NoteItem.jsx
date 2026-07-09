import React, { useState } from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button, Input } from "../index.js";
import { updateNote, deleteNote } from "../../api/notesApi.js";
import { canUpdateNote, canDeleteNote } from "../../utils/permissions.js";

function NoteItem({ note, projectId, refresh, project }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [content, setContent] = useState(note.content || "");

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      await updateNote(projectId, note._id, {
        content,
      });

      setIsEditing(false);
      refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteNote(projectId, note._id);
      refresh();
    } catch (error) {
      console.error(error);
    }
  };

  if (isEditing) {
    return (
      <div className="rounded-2xl border border-gray-200 p-5">
        <div className="space-y-4">
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 outline-none focus:border-blue-500"
          />

          <div className="flex justify-end gap-3">
            <Button
              className="bg-gray-200 text-black hover:bg-gray-300"
              onClick={() => {
                setTitle(note.title);
                setContent(note.content || "");
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>

            <Button onClick={handleSave} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 p-5 transition hover:border-blue-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>

          <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">
            {note.content}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
            <span>
              {note.createdBy?.fullName ||
                note.createdBy?.username ||
                "Unknown"}
            </span>

            <span>•</span>

            <span>{new Date(note.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="relative">
          {canUpdateNote(project?.currentUser.role) && (
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="rounded-lg p-2 transition hover:bg-gray-100"
            >
              <MoreHorizontal size={18} />
            </button>
          )}

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  setShowMenu(false);
                  setIsEditing(true);
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition hover:bg-gray-50"
              >
                <Pencil size={16} />
                Edit
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  handleDelete();
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
