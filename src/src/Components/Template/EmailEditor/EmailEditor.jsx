import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EmailEditor = ({ content, setContent }) => {
  const [blocks, setBlocks] = useState([{ type: "text", value: content }]);

  const handleAddBlock = (type) => {
    const newBlock = type === "text" ? { type, value: "" } : { type, value: null };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockChange = (index, value) => {
    const updatedBlocks = blocks.map((block, i) => (i === index ? { ...block, value } : block));
    setBlocks(updatedBlocks);
    const combinedContent = updatedBlocks.map((block) =>
      block.type === "text" ? block.value : `<img src="${block.value}" alt="Image" />`
    ).join("");
    setContent(combinedContent);
  };

  return (
    <div>
      <h3>Edit Template</h3>
      <div>
        {blocks.map((block, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {block.type === "text" ? (
              <ReactQuill
                theme="snow"
                value={block.value}
                onChange={(value) => handleBlockChange(index, value)}
              />
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleBlockChange(index, URL.createObjectURL(e.target.files[0]))}
                />
                {block.value && <img src={block.value} alt="Uploaded" style={{ width: "100px" }} />}
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => handleAddBlock("text")}>Add Text Block</button>
      <button onClick={() => handleAddBlock("image")}>Add Image Block</button>
    </div>
  );
};

export default EmailEditor;
