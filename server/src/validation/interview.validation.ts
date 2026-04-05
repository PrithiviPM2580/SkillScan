import { z } from "zod";

export const createInterviewSchema = z.object({
  jobDescription: z.string().min(1, "Job description is required"),
  selfDescription: z.string().min(1, "Self description is required"),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
