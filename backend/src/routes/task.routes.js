import { Router } from "express";
import {
  createSubTask,
  createTask,
  deleteSubTask,
  deleteTask,
  updateSubTask,
  updateTask,
  getTaskById,
  getTasks,
} from "../controllers/task.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import {
  createTaskValidator,
  createSubtaskValidator
} from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router  
    .route("/:projectId")
    .get(validateProjectPermission(AvailableRoles), getTasks)
    .post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), createTaskValidator(), createTask)

router
    .route("/:projectId/t/:taskId")
    .get(validateProjectPermission(AvailableRoles), getTaskById)
    .put(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), createTaskValidator(), updateTask)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteTask)

router
    .route("/:projectId/t/:taskId/subtasks")
    .post(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), createSubtaskValidator(), createSubTask)

router
    .route("/:projectId/st/:subtaskId")
    .put(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), createSubtaskValidator(), updateSubTask)
    .delete(validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteSubTask)

export default router;
