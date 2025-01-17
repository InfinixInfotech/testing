import React from "react";

const handleEdit = () => {
  console.log("this is handle Edit");
  alert("Edit Succesfully");
};
export const EditButton = ({
  onClick = handleEdit,

  className = "btn px-0 py-0 m-0  d-print-none ",
}) => {
  return (
    <button onClick={onClick} className={className} style={{
      fontWeight: "600",
      borderRadius: "0",
      backgroundColor: "#1F68B1",
      fontSize: "12px",
        border: "1px solid grey",
        color : "white"
    }}>
    Edit
    </button>
  );
};
