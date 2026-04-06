import { useCallback, useContext } from "react";
import { InterviewContext } from "../context/InterviewContext";
import {
  getAllInterviewReports,
  getInterviewReport,
  createInterviewReport,
  generateInterviewReportPdf,
} from "../services/interview";
import type { CreateInterviewInput } from "../validation/interview";

const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const {
    loading,
    setLoading,
    report,
    setReport,
    reports,
    setReports,
    error,
    setError,
  } = context;

  const createReport = useCallback(
    async (data: CreateInterviewInput) => {
      setLoading(true);
      try {
        const response = await createInterviewReport(data);
        console.log("Interview report created:", response);
        setReport(response.data.interview);
        return response;
      } catch (error) {
        setError("Failed to create interview report");
        console.error("Error creating interview report:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport, setError],
  );

  const getReportById = useCallback(
    async (interviewId: string) => {
      setLoading(true);
      try {
        const response = await getInterviewReport(interviewId);
        console.log("Fetched interview report:", response);
        setReport(response.data.interview);
      } catch (error) {
        setError("Failed to get interview report");
        console.error("Error getting interview report:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setReport, setError],
  );

  const getResumePdf = useCallback(
    async (interviewId: string) => {
      setLoading(true);
      try {
        const response = await generateInterviewReportPdf(interviewId);
        const blob = new Blob([response], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `resume_${interviewId}.html`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (error) {
        setError("Failed to download resume");
        console.error("Error downloading resume:", error);
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError],
  );

  const getAllReports = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getAllInterviewReports();
      console.log("Fetched all interview reports:", response);
      setReports(response.interviews);
    } catch (error) {
      setError("Failed to get interview reports");
      console.error("Error getting interview reports:", error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setReports, setError]);

  return {
    loading,
    report,
    reports,
    error,
    createReport,
    getReportById,
    getAllReports,
    getResumePdf,
  };
};

export default useInterview;
