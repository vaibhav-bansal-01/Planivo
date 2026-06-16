import { Router } from "express";
import {
  addMembersToProject,
  createProject,
  deleteMembers,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMembersRole,
  updateProject,
  deleteProject,
} from "../controllers/projects.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import {
  addMemberToProjectValidator,
  createProjectValidator,
} from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router  
    .route("/")
    .get(getProjects)
    .post(createProjectValidator(), validate, createProject)

router  
    .route("/:projectId")
    .get(validateProjectPermission(AvailableRoles), getProjectById)
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), createProjectValidator(), updateProject)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject)

router
    .route("/:projectId/members")
    .get(getProjectMembers)
    .post(validateProjectPermission([UserRolesEnum.ADMIN]), addMemberToProjectValidator(), validate, addMembersToProject)

router
    .route("/:projectId/members/:userId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateMembersRole)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteMembers)

export default router;
