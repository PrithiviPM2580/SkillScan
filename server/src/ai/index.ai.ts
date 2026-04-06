import ai from "@/config/gemini.config";
import { InterviewReport } from "@/types";
import { MODEL } from "@/utils/constants.util";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  interviewReportSchema,
  resumePdfSchema,
} from "@/validation/ai.validation";

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

export const generateResumePdf = async (resumePdf: InterviewReport) => {
  const prompt = `Generate a professional resume in HTML format for a candidate based on the following details:
  Resume: ${resumePdf.resume}
  Self description: ${resumePdf.selfDescription}
  Job description: ${resumePdf.jobDescription}
  
  Important: Return ONLY a valid JSON object with a single field "html" containing complete, well-formatted HTML resume.
  The HTML should:
  - Include proper DOCTYPE, html, head, and body tags
  - Have CSS styling embedded in style tags for professional appearance
  - Be tailored to match the job description
  - Highlight relevant skills from the self-description
  - Be printable to PDF and fit on 1-2 pages
  - Use semantic HTML with proper structure
  - Include professional header, summary, skills, experience, education sections
  
  Do NOT include any markdown, code blocks, or text outside the JSON object.`;
  try {
    console.log("Requesting resume HTML generation from Gemini API...");
    const response = await ai.models.generateContent({
      model: MODEL.GEMINI_2_5_FLASH_LITE,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    });

    if (!response.text) {
      throw new Error("AI returned an empty resume response");
    }

    console.log("Gemini API response received, parsing...");
    const parsed = JSON.parse(response.text);
    const parseResult = resumePdfSchema.safeParse(parsed);

    if (!parseResult.success) {
      console.error(
        "Resume schema validation failed:",
        parseResult.error.errors,
      );
      throw new Error(
        `Invalid resume schema: ${JSON.stringify(parseResult.error.errors)}`,
      );
    }

    const html = parseResult.data.html;
    if (!html || typeof html !== "string" || html.trim().length === 0) {
      throw new Error("Resume HTML is empty or invalid");
    }

    console.log("Resume HTML generated successfully, length:", html.length);

    // Return HTML as UTF-8 Buffer (can be opened in browser or printed to PDF)
    return Buffer.from(html, "utf-8");
  } catch (error) {
    console.error("Error generating resume:", error);
    throw error instanceof Error
      ? error
      : new Error("Failed to generate resume");
  }
};
