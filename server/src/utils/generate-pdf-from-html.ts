import puppeteer from "puppeteer";

export async function generatePdfFromHtml(html: string): Promise<Buffer> {
  try {
    if (!html || typeof html !== "string") {
      throw new Error("Invalid HTML input: must be a non-empty string");
    }

    console.log("Starting PDF generation from HTML...");
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    console.log("Browser launched successfully");

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });
    console.log("Page content set");

    const pdfBuffer = await page.pdf({
      format: "A4",
      margin: { top: "20mm", right: "15mm", bottom: "20mm", left: "15mm" },
    });
    console.log("PDF generated successfully, size:", pdfBuffer.length);

    await browser.close();
    return Buffer.from(pdfBuffer);
  } catch (error) {
    console.error("PDF generation failed:", error);
    throw error instanceof Error
      ? new Error(`PDF generation error: ${error.message}`)
      : new Error("Unknown error during PDF generation");
  }
}
