import React from "react";
import { Card, SectionHeader, NoteItem } from "../index.js";
import { StickyNote } from "lucide-react";

function NoteCard({ notes = [] }) {
  return (
    <Card className="min-h-\[340px\] p-6 flex flex-col">
      <SectionHeader title="Notes" link="/notes" linkText="View all notes" />

      {notes.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <StickyNote className="h-8 w-8 text-orange-400" />
          </div>

          <h3 className="text-2xl font-semibold text-gray-900">No notes yet</h3>

          <p className="mt-2 max-w-xs text-sm text-gray-500">
            Create your first note to keep important project information in one
            place.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 flex-1 space-y-4">
            {notes.slice(0, 4).map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
          </div>

          {notes.length > 4 && (
            <button className="mt-6 text-sm font-semibold text-blue-600 hover:text-blue-700">
              + {notes.length - 4} more notes
            </button>
          )}
        </>
      )}
    </Card>
  );
}

export default NoteCard;
