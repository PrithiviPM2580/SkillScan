import { z } from "zod";
import mongoose from "mongoose";

export const createInterviewSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  selfDescription: z.string().min(1, "Self description is required"),
});

export const interviewIdParamSchema = z.object({
  id: z.string().refine((val) => mongoose.Types.ObjectId.isValid(val), {
    message: "Invalid interview ID (must be a valid ObjectId)",
  }),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
export type InterviewIdParam = z.infer<typeof interviewIdParamSchema>;
