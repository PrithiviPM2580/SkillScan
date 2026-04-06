import { z } from "zod/v3";

export const interviewReportSchema = z.object({
  title: z
    .string()
    .describe(
      "A descriptive title for the interview report, e.g., 'Software Engineer Interview Report'",
    ),
  matchScore: z
    .number()
    .describe(
      "A numeric score representing how well the candidate matches the job requirements",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked during the interview"),
        intension: z
          .string()
          .describe(
            "The intention behind asking the question, e.g., to assess problem-solving skills, coding ability, etc.",
          ),
        answer: z
          .string()
          .describe("The candidate's answer to the technical question"),
      }),
    )
    .describe("An array of technical questions asked during the interview"),
  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview"),
        intension: z
          .string()
          .describe(
            "The intention behind asking the question, e.g., to assess communication skills, teamwork, etc.",
          ),
        answer: z
          .string()
          .describe("The candidate's answer to the behavioral question"),
      }),
    )
    .describe("An array of behavioral questions asked during the interview"),
  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe("The specific skill gap identified during the interview"),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of the skill gap, indicating how critical it is for the candidate to improve in this area",
          ),
      }),
    )
    .describe("An array of skill gaps identified during the interview"),
  preparationPlan: z
    .array(
      z.object({
        day: z.number().describe("The day number of the preparation plan"),
        focus: z
          .string()
          .describe("The main focus area for this day of preparation"),
        tasks: z
          .array(z.string())
          .describe("A list of tasks to complete on this day"),
      }),
    )
    .describe("An array of preparation plan items for the candidate"),
});

export type InterviewReportType = z.infer<typeof interviewReportSchema>;
