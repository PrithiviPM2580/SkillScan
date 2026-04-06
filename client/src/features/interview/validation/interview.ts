import { z } from "zod";

export const createInterviewSchema = z.object({
  resume: z
    .instanceof(File, { message: "Resume is required" })
    .refine((file) => file.size > 0, "File cannot be empty")
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File must be less than 5MB",
    })
    .refine(
      (file) => file.type === "application/pdf",
      "Only PDF files are allowed",
    ),

  jobDescription: z.string().min(1, "Job description is required"),
  selfDescription: z.string().min(1, "Self description is required"),
});

export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
