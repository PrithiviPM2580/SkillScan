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

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post(validateRequest({ body: registerSchema }), registerController);

authRouter
  .route("/login")
  .post(validateRequest({ body: loginSchema }), loginController);

authRouter.route("/logout").post(authenticate, logoutController);

authRouter.route("/me").get(authenticate, getCurrentUserController);

export default authRouter;
