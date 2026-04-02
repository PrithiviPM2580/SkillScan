import { Router } from "express";
import { validateRequest } from "@/middlewares/validate-request.middleware";
import { registerController } from "@/controllers/auth.controller";
import { registerSchema } from "@/validation/auth.validation";

const authRouter: Router = Router();

authRouter
  .route("/register")
  .post(validateRequest({ body: registerSchema }), registerController);

export default authRouter;
