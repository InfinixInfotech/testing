import React, { useState } from "react";

const Preview = ({ content }) => {
  const [view, setView] = useState("desktop");

  return (
    <div>
      <h3>Preview</h3>
      <button onClick={() => setView("desktop")}>Desktop View</button>
      <button onClick={() => setView("mobile")}>Mobile View</button>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          background: "#f9f9f9",
          width: view === "desktop" ? "600px" : "375px",
          margin: "auto",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default Preview;
