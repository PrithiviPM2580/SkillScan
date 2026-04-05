import { PDFParse, TextResult } from "pdf-parse";

export const parsePdf = async (pdfBuffer: Buffer): Promise<TextResult> => {
  try {
    const data = await new PDFParse({ data: pdfBuffer });
    return data.getText();
  } catch (error) {
    throw new Error("Failed to parse PDF");
  }
};
