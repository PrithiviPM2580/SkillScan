import { createInterviewController } from "@/controllers/interview.controller";
import asyncHandler from "@/middlewares/async-handler.middleware";
import authenticate from "@/middlewares/authenticate.middleware";
import upload from "@/middlewares/multer.middleware";
import { validateRequest } from "@/middlewares/validate-request.middleware";
import { createInterviewSchema } from "@/validation/interview.validation";
import { Router } from "express";

const interviewRouter: Router = Router();

interviewRouter
  .route("/")
  .post(
    authenticate,
    upload.single("resume"),
    validateRequest({ body: createInterviewSchema }),
    asyncHandler(createInterviewController),
  );

export default interviewRouter;
