import { Router } from "express";
import {
  registerUser,
  login,
  logoutUser,
  verifyEmail,
  getcurrentUser,
  resendEmailVerification,
  refreshAccessToken,
  forgotPasswordRequest,
  resetForgotPassword,
  changePassword,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validators.middleware.js";
import {
  userRegisterValidator,
  userLoginValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordvalidator,
  userResetForgotPasswordValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

//unsecured
router.route("/register").post(userRegisterValidator(), validate, registerUser);

router.route("/login").post(userLoginValidator(), validate, login);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/refresh-token").post(refreshAccessToken);

router
  .route("/forgot-password")
  .post(userForgotPasswordvalidator(), validate, forgotPasswordRequest);

router
  .route("/reset-password/:resetToken")
  .post(userResetForgotPasswordValidator(), validate, resetForgotPassword);

//secured
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/current-user").get(verifyJWT, getcurrentUser);

router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changePassword,
  );

router
  .route("/resened-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;
