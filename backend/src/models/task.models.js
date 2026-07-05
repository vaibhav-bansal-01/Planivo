import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatus, TaskStatusEnum, AvailableTasksPriority, TasksPriorityEnum } from "../utils/constants";

const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: AvailableTaskStatus,
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      type: [
        {
          url: String,
          mimeType: String,
          size: Number,
        },
      ],
      default: [],
    },
    priority: {
      type: String,
      enum: AvailableTasksPriority,
      default: TasksPriorityEnum.LOW,
    },
    dueDate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
