import jsPDF from "jspdf";

async function loadFontAsBase64(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load font: ${url}`);
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return btoa(binary);
}

export async function createPdfReport(title, orientation = "landscape") {
  const doc = new jsPDF({ orientation, unit: "mm", format: "a4" });
  const regularFont = await loadFontAsBase64("/fonts/NotoSans-Regular.ttf");
  const boldFont = await loadFontAsBase64("/fonts/NotoSans-Bold.ttf");

  doc.addFileToVFS("NotoSans-Regular.ttf", regularFont);
  doc.addFont("NotoSans-Regular.ttf", "NotoSans", "normal", "Identity-H");
  doc.addFileToVFS("NotoSans-Bold.ttf", boldFont);
  doc.addFont("NotoSans-Bold.ttf", "NotoSans", "bold", "Identity-H");

  const pageWidth = doc.internal.pageSize.getWidth();
  doc.setFont("NotoSans", "bold");
  doc.setFontSize(22);
  doc.setTextColor(27, 142, 217);
  doc.text("TripSwift", 25, 18);

  doc.setFont("NotoSans", "normal");
  doc.setFontSize(12);
  doc.setTextColor(80, 90, 105);
  doc.text(title, 25, 26);

  doc.setFontSize(9);
  doc.setTextColor(100, 110, 120);
  doc.text(`Generated: ${formatPdfDate(new Date())}`, pageWidth - 25, 18, {
    align: "right",
  });

  return doc;
}

export function formatPdfDate(dateValue) {
  if (!dateValue) return "N/A";

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return "N/A";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function addPdfReportFooter(doc, title) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageCount = doc.internal.getNumberOfPages();

  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setFont("NotoSans", "normal");
    doc.setFontSize(8);
    doc.setTextColor(120, 125, 130);
    doc.text(
      `TripSwift - ${title} - Page ${page} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: "center" },
    );
  }
}
