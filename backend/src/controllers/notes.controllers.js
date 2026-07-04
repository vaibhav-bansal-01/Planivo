import { User } from "../models/user.models.js";
import { Project } from "../models/project.models.js";
import { Note } from "../models/note.models.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import mongoose, { Aggregate } from "mongoose";

const getNotes = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const notes = await Note.find({
    project: new mongoose.Types.ObjectId(projectId),
  });

  return res
    .status(201)
    .json(new ApiResponse(201, notes, "Notes fetched successfully"));
});

const createNotes = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { projectId } = req.params;

  const project = await Project.findById(projectId);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const note = await Note.create({
    project: new mongoose.Types.ObjectId(projectId),
    createdBy: new mongoose.Types.ObjectId(req.user._id),
    content,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note created successfully"));
});

const getNotesById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(noteId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "createdBy",
        pipeline: [
          {
            $project: {
              _id: 1,
              username: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        createdBy: {
          $arrayElemAt: ["$assignedTo", 0],
        },
      },
    },
  ]);

  if (!note || note.length === 0) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note[0], "Notes fetched successfully"));
});

const updateNotes = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const { noteId } = req.params;

  const updateData = {};
  updateData.content = content;

  const note = await Note.findByIdAndUpdate(noteId, updateData, {
    new: true,
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, note, "Note updated successfully"));
});

const deleteNotes = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findByIdAndDelete(noteId);

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Note deleted successfully"));
});

export { getNotes, getNotesById, createNotes, deleteNotes, updateNotes };
