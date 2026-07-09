import React, { useEffect, useState } from "react";
import { StickyNote, Plus } from "lucide-react";
import { Card, Button, Input, NoteItem } from "../index.js";
import { getProjectNotes, createNote } from "../../api/notesApi.js";
import { getProjectById } from "../../api/projectApi.js";
import { canCreateNote } from "../../utils/permissions.js";

function NoteCard({ projectId }) {
  const [project, setProject] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const [projectRes, notesRes] = await Promise.all([
        getProjectById(projectId),
        getProjectNotes(projectId),
      ]);
      setProject(projectRes.data.data);
      setNotes(notesRes.data.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      fetchNotes();
    }
  }, [projectId]);

  const handleCreate = async () => {
    try {
      await createNote(projectId, {
        content,
      });

      setContent("");
      setShowForm(false);

      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="p-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
        {canCreateNote(project?.currentUser.role) && (
          <Button
            className="px-5 py-2 text-base"
            onClick={() => setShowForm((prev) => !prev)}
          >
            <Plus size={18} />
            Add Note
          </Button>
        )}
      </div>

      {/* Add Form */}

      {showForm && (
        <div className="mt-6 rounded-2xl border border-gray-200 p-5">
          <div className="space-y-4">
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note..."
              className="w-full rounded-xl border border-gray-300 p-4 outline-none focus:border-blue-500"
            />

            <div className="flex justify-end gap-3">
              <Button
                className="bg-gray-200 text-black hover:bg-gray-300"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  setContent("");
                }}
              >
                Cancel
              </Button>

              <Button onClick={handleCreate}>Save Note</Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading */}

      {loading ? (
        <div className="py-10 text-center text-gray-500">Loading notes...</div>
      ) : notes.length === 0 && !showForm ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <StickyNote className="h-8 w-8 text-orange-400" />
          </div>

          <h3 className="text-xl font-semibold text-gray-900">No notes yet</h3>

          <p className="mt-2 max-w-xs text-sm text-gray-500">
            Keep important discussions, meeting minutes and project updates
            here.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {notes.map((note) => (
            <NoteItem
              key={note._id}
              note={note}
              projectId={projectId}
              project={project}
              refresh={fetchNotes}
            />
          ))}
        </div>
      )}
    </Card>
  );
}

export default NoteCard;
