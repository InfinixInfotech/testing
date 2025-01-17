import React from "react";

const handleDelete = () => {
  console.log("this is delete button");
  alert("Delete Succesfully");
};

export const DeleteButton = ({
  onClick = handleDelete,
  className = "btn px-0 py-0 d-print-none",
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
      style={{
        fontWeight: "600",
        borderRadius: "0",
        backgroundColor: "#D2322D",
        fontSize: "12px",
        border: "1px solid grey",
        color : "white"
      }}
    >
     Delete
    </button>
  );
};
