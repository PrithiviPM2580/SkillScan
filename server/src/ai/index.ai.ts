import ai from "@/config/gemini.config";
import { InterviewReport } from "@/types";
import { MODEL } from "@/utils/constants.util";
import { zodToJsonSchema } from "zod-to-json-schema";
import { interviewReportSchema } from "@/validation/ai.validation";

export const generateInterviewReport = async (
  interviewReport: InterviewReport,
) => {
  const { resume, selfDescription, jobDescription } = interviewReport;

  const prompt = `Generate an interview report based on the following details:
                  Resume: ${resume}
                  Self description: ${selfDescription}
                  Job description: ${jobDescription}
  `;
  try {
    const response = await ai.models.generateContent({
      model: MODEL.GEMINI_2_5_FLASH,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(interviewReportSchema),
      },
    });

    if (!response.text) {
      throw new Error("AI returned an empty interview report");
    }

    const parsed = JSON.parse(response.text);
    return interviewReportSchema.parse(parsed);
  } catch (error) {
    throw new Error("Failed to generate interview report");
  }
};
