import { Router } from "express";
import { validateRequest } from "@/middlewares/validate-request.middleware";
import {
  getCurrentUserController,
  loginController,
  logoutController,
  registerController,
} from "@/controllers/auth.controller";
import { loginSchema, registerSchema } from "@/validation/auth.validation";
import authenticate from "@/middlewares/authenticate.middleware";
import asyncHandler from "@/middlewares/async-handler.middleware";

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post(
    validateRequest({ body: registerSchema }),
    asyncHandler(registerController),
  );

authRouter
  .route("/login")
  .post(validateRequest({ body: loginSchema }), asyncHandler(loginController));

authRouter.route("/logout").post(authenticate, asyncHandler(logoutController));

authRouter
  .route("/me")
  .get(authenticate, asyncHandler(getCurrentUserController));

export default authRouter;
