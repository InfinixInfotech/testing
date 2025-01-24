import React from "react";

const handlePrint = (tableId) => {
  // Get the table element by its ID
  const tableContent = document.getElementById(tableId)?.outerHTML;

  if (tableContent) {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f8d7da;
            }
          </style>
        </head>
        <body>
          ${tableContent}
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  } else {
    alert("Table not found!");
  }
};

export const PrintButton = ({ 
  tableId, 
  className = "btn dataCopyButton btn-secondary btn-sm px-2 py-0 mt-3 me-1 ms-0 no-print" 
}) => {
  return (
    <button 
      onClick={() => handlePrint(tableId)} 
      className={className} 
      style={{
        fontWeight: "600", 
        borderRadius: "0" ,
        backgroundColor:"rgb(166, 174, 191)" 
      }}
    >
      Print
    </button>
  );
};

