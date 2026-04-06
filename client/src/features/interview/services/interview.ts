import api from "@/lib/axios";
import type { CreateInterviewInput } from "../validation/interview";

export const createInterviewReport = async (data: CreateInterviewInput) => {
  const formData = new FormData();
  formData.append("resume", data.resume);
  formData.append("jobDescription", data.jobDescription);
  formData.append("selfDescription", data.selfDescription);

  const response = await api.post("/interview", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const getInterviewReport = async (interviewId: string) => {
  const response = await api.get(`/interview/report/${interviewId}`);
  return response.data;
};

export const getAllInterviewReports = async () => {
  const response = await api.get("/interview");
  return response.data;
};

export const generateInterviewReportPdf = async (interviewId: string) => {
  const response = await api.post(
    `/interview/resume/pdf/${interviewId}`,
    {},
    {
      responseType: "blob",
    },
  );
  return response.data;
};
