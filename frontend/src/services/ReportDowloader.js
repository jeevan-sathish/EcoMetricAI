import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function ReportDownloader(
  element,
  fileName = "EcoMetric_AI_Report.pdf",
) {
  if (!element) return;

  const originalHeight = element.style.height;
  const originalOverflow = element.style.overflow;

  element.style.height = "auto";
  element.style.overflow = "visible";

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    width: element.scrollWidth,
    height: element.scrollHeight,
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
  });

  element.style.height = originalHeight;
  element.style.overflow = originalOverflow;

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const margin = 10;
  const usableWidth = pageWidth - margin * 2;

  const imgWidth = usableWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.setFontSize(18);
  pdf.text("EcoMetric AI Vehicle Report", margin, 10);

  pdf.addImage(imgData, "PNG", margin, 20, imgWidth, imgHeight);

  heightLeft -= pageHeight - 20;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;

    pdf.addPage();

    pdf.addImage(imgData, "PNG", margin, position + 20, imgWidth, imgHeight);

    heightLeft -= pageHeight;
  }

  pdf.save(fileName);
}
