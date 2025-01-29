import React from "react";

const templates = [
  { id: 1, name: "Welcome Email", thumbnail: "welcome.jpg", content: "<h1>Welcome!</h1><p>This is a welcome email.</p>" },
  { id: 2, name: "Promotion Email", thumbnail: "promo.jpg", content: "<h1>Big Sale!</h1><p>Don't miss out.</p>" },
];

const TemplateSelector = ({ onSelect }) => {
  return (
    <div>
      <h3>Select a Template</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {templates.map((template) => (
          <div key={template.id} onClick={() => onSelect(template)} style={{ cursor: "pointer" }}>
            <img src={template.thumbnail} alt={template.name} style={{ width: "100px", height: "100px" }} />
            <p>{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
