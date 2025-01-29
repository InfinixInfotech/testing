import React, { useState } from "react";

const SendEmail = ({ content }) => {
  const [email, setEmail] = useState("");

  const handleSend = async () => {
    const response = await fetch("https://your-api-endpoint.com/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: email, htmlContent: content }),
    });
    alert(response.ok ? "Email sent successfully!" : "Failed to send email.");
  };

  return (
    <div>
      <h3>Send Email</h3>
      <input
        type="email"
        placeholder="Recipient Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default SendEmail;
