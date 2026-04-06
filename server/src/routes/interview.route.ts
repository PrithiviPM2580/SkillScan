import {
  createInterviewController,
  getInterviewController,
  getAllInterviewController,
} from "@/controllers/interview.controller";
import asyncHandler from "@/middlewares/async-handler.middleware";
import authenticate from "@/middlewares/authenticate.middleware";
import upload from "@/middlewares/multer.middleware";
import { validateRequest } from "@/middlewares/validate-request.middleware";
import {
  createInterviewSchema,
  interviewIdParamSchema,
} from "@/validation/interview.validation";
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

interviewRouter
  .route("/report/:id")
  .get(
    authenticate,
    validateRequest({ params: interviewIdParamSchema }),
    asyncHandler(getInterviewController),
  );

interviewRouter
  .route("/")
  .get(authenticate, asyncHandler(getAllInterviewController));

export default interviewRouter;
