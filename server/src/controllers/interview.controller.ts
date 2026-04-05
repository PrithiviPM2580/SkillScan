import sendResponse from "@/utils/send-response.util";
import type { Request, Response } from "express";
import { createInterviewService } from "@/services/interview.service";

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
