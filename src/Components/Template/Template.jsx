import React, { useState } from "react";
import TemplateSelector from "./TemplateSelector/TemplateSelector";
import EmailEditor from "./EmailEditor/EmailEditor";
import { Preview } from "@mui/icons-material";
import SendEmail from "./SendEmail/SendEmail";
import ModernPoster from "./ModernPoster/ModernPoster";
import "bootstrap/dist/css/bootstrap.min.css";

const Template = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [content, setContent] = useState("");

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setContent(template.content);
  };

  return (
    <div>
      <ModernPoster content={content}/>
    </div>
  );
};

export default Template;
