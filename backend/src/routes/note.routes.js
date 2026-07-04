import { Router } from "express";
import {
  getNotes,
  getNotesById,
  createNotes,
  deleteNotes,
  updateNotes,
} from "../controllers/notes.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import { createNoteValidator } from "../validators/index.js";
import {
  verifyJWT,
  validateProjectPermission,
} from "../middlewares/auth.middleware.js";
import { AvailableRoles, UserRolesEnum } from "../utils/constants.js";

const router = Router();
router.use(verifyJWT);

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableRoles), getNotes)
  .post(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    createNotes,
  );

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableRoles), getNotesById)
  .put(
    validateProjectPermission([UserRolesEnum.ADMIN]),
    createNoteValidator(),
    updateNotes,
  )
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNotes);

export default router;
