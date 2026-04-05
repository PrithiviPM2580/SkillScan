import InterviewReport from "@/models/interview-report.model";
import { InterviewReportType } from "@/validation/ai.validation";

export const createInterview = async (interviewData: {
  user: string;
  resume: string;
  selfDescription: string;
  jobDescription: string;
  interviewReport: InterviewReportType;
}) => {
  const { interviewReport, ...baseInterviewData } = interviewData;

  return InterviewReport.create({
    ...baseInterviewData,
    ...interviewReport,
  });
};
