import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react';
import '../../DataButton/DataButton.css';

const handlePdf = (tableId) => {
  // Select the content of the table by its ID
  const content = document.getElementById(tableId);

  if (content) {
    // Use html2canvas to render the content into a canvas
    html2canvas(content, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png"); // Convert the canvas to an image

      // Initialize jsPDF and add the image to the PDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
      console.log("PDF generated successfully!");
    });
  } else {
    alert("Table not found!");
  }
};

export const PdfButton = ({
  tableId = "table-data", // Default to "table-data" if no tableId is provided
  onClick = () => handlePdf(tableId),
  className = "btn dataCopyButton btn-secondary btn-sm px-2 py-0  me-1 mt-3 no-print ",
}) => {
  return (
    <button
      onClick={() => handlePdf(tableId)}  // Call handlePdf with the dynamic tableId
      className={className}
      style={{fontWeight:"600" , borderRadius: "0" ,backgroundColor:"rgb(166, 174, 191)"  }}
    >
      Pdf
    </button>
  );
};
