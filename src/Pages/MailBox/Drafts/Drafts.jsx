import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Drafts = () => {
  const emailsPerPage = 5;
  const [emails, setEmails] = useState([
    {
      id: 1,
      from: "John Doe",
      to: "admin@example.com",
      subject: "Meeting Schedule Update",
      date: "16 Dec 2024 10:00 am",
      read: false,
    },
    {
      id: 2,
      from: "Jane Smith",
      to: "admin@example.com",
      subject: "Invoice Submission Reminder",
      date: "15 Dec 2024 03:15 pm",
      read: true,
    },
    {
      id: 3,
      from: "HR Department",
      to: "admin@example.com",
      subject: "Policy Update: Leave Management",
      date: "15 Dec 2024 11:45 am",
      read: false,
    },
    {
      id: 4,
      from: "Marketing Team",
      to: "admin@example.com",
      subject: "Quarterly Campaign Plan",
      date: "14 Dec 2024 02:30 pm",
      read: true,
    },
    {
      id: 5,
      from: "Alice Johnson",
      to: "admin@example.com",
      subject: "Product Launch Update",
      date: "13 Dec 2024 12:00 pm",
      read: false,
    },
    {
      id: 6,
      from: "Bob Brown",
      to: "admin@example.com",
      subject: "Weekly Report",
      date: "12 Dec 2024 04:00 pm",
      read: true,
    },
    {
      id: 7,
      from: "IT Support",
      to: "admin@example.com",
      subject: "Server Maintenance Notification",
      date: "12 Dec 2024 09:30 am",
      read: false,
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const currentEmails = emails.slice(startIndex, endIndex);

  const handleDelete = (id) => {
    const updatedEmails = emails.filter((email) => email.id !== id);
    setEmails(updatedEmails);
    alert(`Email with ID: ${id} deleted.`);
  };

  const markAsRead = (id) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, read: true } : email
    );
    setEmails(updatedEmails);
  };

  const totalPages = Math.ceil(emails.length / emailsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="container" style={{marginTop: "70px"}}>
        {currentEmails.map((email) => (
          <div
            key={email.id}
            className={`card mb-2 ${email.read ? "bg-light" : "bg-white"}`}
          >
            <div className="card-body d-flex justify-content-between align-items-center">
              {/* Email Content */}
              <Link
                to={`/email/${email.id}`}
                className="text-decoration-none text-dark"
                onClick={() => markAsRead(email.id)}
              >
                <div>
                  <h5 className="card-title">{email.subject}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    From: {email.from} | To: {email.to}
                  </h6>
                </div>
              </Link>
              {/* Date and Button on Right */}
              <div className="text-end">
                <p className="card-text mb-1">
                  <small className="text-muted">{email.date}</small>
                </p>
                <Link
                  to={`/edit/${email.id}`} // Passing the ID as a URL parameter
                  className="btn btn-sm btn-primary"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center mt-4">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => goToPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => goToPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li
              className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => goToPage(currentPage + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Drafts;
