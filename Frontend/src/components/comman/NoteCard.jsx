import React, { useState, useEffect } from "react";
import { getProjectNotes } from "../../api/notesApi";
import { Card, SectionHeader, NoteItem } from "../index.js";

function NoteCard({ projectId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await getProjectNotes(projectId);
      setNotes(response.data.data.notes);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [projectId]);

  return (
    <Card>
      <SectionHeader
        title="Notes"
        link="/notes"
        linkText={notes.length > 3 ? "View all notes" : ""}
      />

      {loading ? (
        <div className="py-8 text-center text-sm text-gray-500">
          Loading notes...
        </div>
      ) : notes.length === 0 ? (
        <div className="py-8 text-center text-sm text-gray-500">
          No notes yet.
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {notes.slice(0, 3).map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>

          {notes.length > 3 && (
            <p className="mt-4 text-center text-sm text-blue-600">
              + {notes.length - 3} more notes
            </p>
          )}
        </>
      )}
    </Card>
  );
}

export default NoteCard;
