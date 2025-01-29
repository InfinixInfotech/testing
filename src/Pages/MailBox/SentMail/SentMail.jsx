import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa";
import { getMailByEmpIdThunk } from "../../../Redux/Services/thunks/sendMailThunk";
import { useDispatch, useSelector } from "react-redux";
import { empCode } from "../../../Redux/Services/apiServer/ApiServer";

const SentMail = () => {
  const emailsPerPage = 5;
  const [emails, setEmails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data, loading, error } = useSelector((state) => state.sendMail);
  const dispatch = useDispatch();

  // Handle email pagination
  const startIndex = (currentPage - 1) * emailsPerPage;
  const endIndex = startIndex + emailsPerPage;
  const currentEmails = emails.slice(startIndex, endIndex);
  const totalPages = Math.ceil(emails.length / emailsPerPage);

  // Fetch emails data from API
  useEffect(() => {
    dispatch(getMailByEmpIdThunk(empCode));
  }, [dispatch]);

  useEffect(() => {
    if (data?.data) {
      const transformedData = Object.keys(data.data).map((key) => {
        const item = data.data[key];
        return { ...item };
      });
      setEmails(transformedData);
    }
  }, [data]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleMarkImportant = (id) => {
    setEmails((prevData) =>
      prevData.map((email) =>
        email.id === id ? { ...email, important: !email.important } : email
      )
    );
  };

  // Decode subject text if needed
  const decodeUnicodeAndHtml = (subject) => {
    if (!subject) return "";
    const decodedHtml = subject.replace(/<br>/g, "<br/>");
    return decodedHtml;
  };

  return (
    <div className="container" style={{ marginTop: "70px" }}>
      {currentEmails.map((email) => (
        <div key={email.id} className="card mb-2 bg-white position-relative">
          {/* Tag at the top-left corner */}
          <span
            className="badge bg-primary text-white position-absolute"
            style={{
              top: "10px",
              left: "10px",
              zIndex: 1,
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
           {email.subject && email.subject.split("<br>").length > 2
    ? email.subject.split("<br>")[2]
    : "Tag"}
    {/* {email.subject} */}
          </span>

          {/* Star Icon at the top-right corner */}
          <button
            className="btn p-0 position-absolute"
            style={{
              top: "10px",
              right: "10px",
              zIndex: 1,
            }}
            onClick={() => handleMarkImportant(email.id)}
            title={
              email.important ? "Remove from important" : "Mark as important"
            }
          >
            {email.important ? (
              <FaStar size={20} color="gold" />
            ) : (
              <FaRegStar size={20} color="gray" />
            )}
          </button>

          {/* Email Content */}
          <div className="card-body d-flex justify-content-between align-items-center mt-4">
            <Link to={`/email/${email.id}`} className="text-decoration-none text-dark">
              <div>
                <h5 className="card-title">
                  {decodeUnicodeAndHtml(email.subject?.split("<br>")[0]) || "No Subject"}
                </h5>
                <h6 className="card-subtitle text-muted mb-2">
                  {email.subject?.split("<br>")[1] || "No Additional Info"}
                </h6>
                <h6
                  className="card-subtitle mb-2 text-muted mt-3 small"
                  style={{ fontSize: "0.8rem" }}
                >
                  From: {email.from || "Unknown"} | To: {email.to || "Unknown"}
                </h6>
              </div>
            </Link>
          </div>

          {/* Date and Time at the bottom-right corner */}
          <div
            className="position-absolute"
            style={{
              bottom: "10px",
              right: "10px",
              zIndex: 1,
            }}
          >
            <p className="card-text mb-0">
              <small className="text-muted">{email.createDate || "N/A"}</small>
              <br />
              <small className="text-muted">{email.createTime || "N/A"}</small>
            </p>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center mt-4">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(currentPage - 1)}
              aria-label="Previous Page"
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
              aria-label="Next Page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SentMail;
