import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DraftEdit = () => {
  const { id } = useParams(); // Get the draft ID from the URL
  const [email, setEmail] = useState(null);

  useEffect(() => {
    // Fetch the email based on the ID (assuming emails are available in your state)
    const fetchedEmail = {
      id: Number(id),
      from: "John Doe",
      to: "admin@example.com",
      subject: "Meeting Schedule Update",
      date: "16 Dec 2024 10:00 am",
      message: "Here's the email content.",
      read: false,
    };
    setEmail(fetchedEmail); // Set the fetched email data
  }, [id]);

  if (!email) {
    return <div>Loading...</div>; // Show loading until email data is fetched
  }

  return (
    <div>
      <h2>Edit Draft</h2>
      <form>
        <div>
          <label>Subject</label>
          <input
            type="text"
            value={email.subject}
            onChange={(e) => setEmail({ ...email, subject: e.target.value })}
          />
        </div>
        <div>
          <label>From</label>
          <input
            type="text"
            value={email.from}
            onChange={(e) => setEmail({ ...email, from: e.target.value })}
          />
        </div>
        <div>
          <label>To</label>
          <input
            type="text"
            value={email.to}
            onChange={(e) => setEmail({ ...email, to: e.target.value })}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            value={email.message}
            onChange={(e) => setEmail({ ...email, message: e.target.value })}
          ></textarea>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default DraftEdit;
