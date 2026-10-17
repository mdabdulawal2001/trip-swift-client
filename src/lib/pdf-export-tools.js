export async function loadPdfExportTools() {
  const [jsPdfModule, autoTableModule, reportModule] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
    import("@/lib/pdf-report"),
  ]);

  return {
    jsPDF: jsPdfModule.default,
    autoTable: autoTableModule.default,
    ...reportModule,
  };
}
