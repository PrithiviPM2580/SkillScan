import { generateInterviewReport, generateResumePdf } from "@/ai/index.ai";
import { AppError } from "@/utils/error.util";
import { parsePdf } from "@/utils/parse-pdf.util";
import { CreateInterviewInput } from "@/validation/interview.validation";
import {
  createInterview,
  getInterviewReport,
  getAllInterview,
  getInterviewReportById,
} from "@/repositories/interview.repository";
import { interviewReportSchema } from "@/validation/ai.validation";
import { generatePdfFromHtml } from "@/utils/generate-pdf-from-html";

export const createInterviewService = async (
  interviewData: CreateInterviewInput,
  file: Express.Multer.File | undefined,
  userId?: string,
) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  if (!file) {
    throw new AppError("Resume file is required", 400);
  }

  const parsePDF = await parsePdf(file.buffer);
  const interviewReport = await generateInterviewReport({
    resume: parsePDF.text,
    selfDescription: interviewData.selfDescription,
    jobDescription: interviewData.jobDescription,
  });

  const reportValidation = interviewReportSchema.safeParse(interviewReport);

  if (!reportValidation.success) {
    throw new AppError("AI generated an invalid interview report", 502);
  }

  const interview = await createInterview({
    user: userId,
    resume: parsePDF.text,
    selfDescription: interviewData.selfDescription,
    jobDescription: interviewData.jobDescription,
    interviewReport: reportValidation.data,
  });

  return interview;
};

export const getInterviewService = async (
  interviewId: string,
  userId?: string,
) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const interviewReport = await getInterviewReport(interviewId, userId);

  if (!interviewReport) {
    throw new AppError("Interview report not found", 404);
  }

  return interviewReport;
};

export const getAllInterviewService = async (userId?: string) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const interviews = await getAllInterview(userId);

  if (interviews.length === 0) {
    throw new AppError("No interview reports found", 404);
  }

  return interviews;
};

export const generateResumePdfService = async (
  interviewId: string,
  userId?: string,
) => {
  if (!userId) {
    throw new AppError("Unauthorized", 401);
  }

  const interviewReport = await getInterviewReportById(interviewId, userId);
  if (!interviewReport) {
    throw new AppError("Interview report not found", 404);
  }
  const { resume, selfDescription, jobDescription } = interviewReport;

  if (!resume || !selfDescription || !jobDescription) {
    throw new AppError("Incomplete interview report", 400);
  }

  const pdfBuffer = await generateResumePdf({
    resume,
    selfDescription,
    jobDescription,
  });
  return pdfBuffer;
};
