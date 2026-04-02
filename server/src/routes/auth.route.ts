import { Router } from "express";
import { validateRequest } from "@/middlewares/validate-request.middleware";
import {
  loginController,
  registerController,
} from "@/controllers/auth.controller";
import { loginSchema, registerSchema } from "@/validation/auth.validation";

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post(validateRequest({ body: registerSchema }), registerController);

authRouter
  .route("/login")
  .post(validateRequest({ body: loginSchema }), loginController);

export default authRouter;
