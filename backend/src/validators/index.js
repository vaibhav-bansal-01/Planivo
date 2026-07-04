import { body } from "express-validator";
import { AvailableRoles } from "../utils/constants.js";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .isLowercase()
      .withMessage("Username must be in lower case")
      .isLength({ min: 3 })
      .withMessage("Username must be of atleast 3 characters long"),
    body("password").trim().notEmpty().withMessage("Password is required"),
    body("fullname").optional().trim(),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ];
};

const userChangeCurrentPasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Old password is required"),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New Password is required"),
  ];
};

const userForgotPasswordvalidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
  ];
};

const userResetForgotPasswordValidator = () => {
  return [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New Password is required"),
  ];
};

const createProjectValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("description").optional(),
  ];
};

const addMemberToProjectValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("role")
      .notEmpty()
      .withMessage("Role is required")
      .isIn(AvailableRoles)
      .withMessage("Role is invalid"),
  ];
};

const createTaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").optional(),
  ];
};

const createSubtaskValidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("description").optional(),
  ];
};

const createNoteValidator = () => {
  return [body("content").trim().notEmpty().withMessage("Content is required")];
};

export {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordvalidator,
  userResetForgotPasswordValidator,
  addMemberToProjectValidator,
  createProjectValidator,
  createTaskValidator,
  createSubtaskValidator,
  createNoteValidator,
};
