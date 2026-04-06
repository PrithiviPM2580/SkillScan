import sendResponse from "@/utils/send-response.util";
import type { Request, Response } from "express";
import {
  createInterviewService,
  getInterviewService,
  getAllInterviewService,
  generateResumePdfService,
} from "@/services/interview.service";
import { AppError } from "@/utils/error.util";

export const createInterviewController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const interview = await createInterviewService(
    req.body,
    req.file,
    req.user?.id,
  );

  sendResponse(res, 201, true, "Interview created successfully", { interview });
};

export const getInterviewController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const interviewId = req.params["id"];

  if (typeof interviewId !== "string") {
    throw new AppError("Invalid interview ID", 400);
  }

  const interview = await getInterviewService(interviewId, req.user?.id);

  sendResponse(res, 200, true, "Interview fetched successfully", { interview });
};

export const getAllInterviewController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const interviews = await getAllInterviewService(req.user?.id);

  sendResponse(res, 200, true, "Interviews fetched successfully", {
    interviews,
  });
};

export const generateResumePdfController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const interviewId = req.params["id"];

  if (typeof interviewId !== "string") {
    throw new AppError("Invalid interview ID", 400);
  }

  const htmlBuffer = await generateResumePdfService(interviewId, req.user?.id);

  res.set({
    "Content-Type": "text/html; charset=utf-8",
    "Content-Disposition": `attachment; filename="resume_${interviewId}.html"`,
  });
  res.send(htmlBuffer);
};
