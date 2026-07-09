import React, { useRef } from "react";
import { Card, Button } from "../index.js";
import { Paperclip, Trash2, Upload, ImageIcon, FileText } from "lucide-react";
import { addAttachments, removeAttachment } from "../../api/tasksApi";

function AttachmentCard({ task, setTask }) {
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    try {
      const files = Array.from(e.target.files);

      if (!files.length) return;

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("attachments", file);
      });

      const response = await addAttachments(
        task.project._id,
        task._id,
        formData,
      );

      setTask(response.data.data);

      e.target.value = "";
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (attachmentId) => {
    try {
      const response = await removeAttachment(
        task.project,
        task._id,
        attachmentId,
      );

      setTask(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFileIcon = (mimetype) => {
    if (mimetype.startsWith("image/")) return <ImageIcon />;
    if (mimetype === "application/pdf") return <FileText />;
    return <Paperclip />;
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Attachments</h2>

        <>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleUpload}
          />

          <Button type="button" onClick={() => fileInputRef.current?.click()}>
            <Upload size={16} />
            Upload
          </Button>
        </>
      </div>

      {task.attachments?.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 py-10 text-center">
          <Paperclip size={30} className="mx-auto mb-3 text-gray-400" />

          <p className="text-sm text-gray-500">No attachments yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {task.attachments.map((attachment) => (
            <div
              key={attachment._id}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                {getFileIcon(attachment.mimetype)}

                <div>
                  <p className="font-medium text-gray-900">
                    {attachment.name || attachment.url.split("/").pop()}
                  </p>

                  <p className="text-xs text-gray-500">
                    {formatFileSize(attachment.size)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={attachment.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                >
                  View
                </a>

                <button
                  onClick={() => handleDelete(attachment._id)}
                  className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default AttachmentCard;
