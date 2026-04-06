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

export const getInterviewReport = async (
  interviewId: string,
  userId: string,
) => {
  return InterviewReport.findOne({
    _id: interviewId,
    user: userId,
  }).lean();
};

export const getAllInterview = async (userId: string) => {
  return InterviewReport.find({
    user: userId,
  })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan",
    )
    .lean();
};
export const getInterviewReportById = async (
  interviewId: string,
  userId: string,
) => {
  return InterviewReport.findOne({
    _id: interviewId,
    user: userId,
  });
};
