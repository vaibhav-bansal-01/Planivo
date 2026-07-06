import React from "react";
import { MoreHorizontal } from "lucide-react";

function NoteItem({ note }) {
  return (
    <div className="flex items-start justify-between rounded-xl p-4 transition hover:bg-gray-50">
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-sm leading-6 text-gray-700">
          {note.content}
        </p>

        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <span>{note.createdBy?.username}</span>

          <span>•</span>

          <span>{new Date(note.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <button className="rounded-lg p-2 transition hover:bg-gray-100">
        <MoreHorizontal size={18} />
      </button>
    </div>
  );
}

export default NoteItem;
