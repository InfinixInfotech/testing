import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { useParams } from "react-router-dom";
import { getSmsByIdThunk, updateMailThunk } from "../../Redux/Services/thunks/sendMailThunk";
import { useDispatch, useSelector } from "react-redux";
import { FaRegStar, FaStar } from "react-icons/fa";
import { staticToken, updateSMSByIdUrl } from "../../Redux/Services/apiServer/ApiServer";

const EmailDetails = () => {
  const { id } = useParams();

  const [headerTitle, setHeaderTitle] = useState(
    "Happy Birthday [Employee's Name]!"
  );
  const [headerSubtitle, setHeaderSubtitle] = useState(
    "🎂 Enjoy every moment of your special day! 🎂"
  );
  const [headerDate, setHeaderDate] = useState("10 Dec 2024");
  const [headerImage, setHeaderImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bodyContent, setBodyContent] = useState(
    ""
  );
  const [ctaText, setCtaText] = useState("🎂 Enjoy every moment of your special day! 🎂");
  const [ctaLink, setCtaLink] = useState("Thank you for everything you do for Infinix Infotech. We hope your birthday is as amazing as you are!");
  const [footerText, setFooterText] = useState(
    "© 2024 Infinix Infotech Private Limited"
  );
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.sendMail);


  useEffect(() => {
    dispatch(getSmsByIdThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (data && typeof data === "object" && !Array.isArray(data) && data.data) {
      setAllData(data.data); // Directly set the data
    } else {
      setAllData([]); // Reset state if data is invalid
    }
  }, [data]);


  useEffect(() => {
    console.log("allData.templatetype-------------------------" + allData.templatetype);

    if (allData.templatetype === 'birthday') {
      setHeaderImage('https://plus.unsplash.com/premium_photo-1683140472983-e72b689c8c6d?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');  // Add appropriate image path
    } else if (allData.templatetype === 'promotion') {
      setHeaderImage('https://img.freepik.com/free-vector/realistic-class-2023-background_52683-109953.jpg?t=st=1734679186~exp=1734682786~hmac=ae1bbddb3519022cc31f3345b2da92bdf2b3d792d0254442c7b2817e2c2373d9&w=1380');  // Add appropriate image path
    } else if (allData.templatetype === 'targetAchieved') {
      setHeaderImage('https://img.freepik.com/premium-vector/falling-confetti-blue-background_257584-927.jpg?ga=GA1.1.2127501896.1730961765&semt=ais_hybrid');  // Add appropriate image path
    }
  }, [allData.templatetype]);


  const subjectParts = typeof allData.subject === 'string' ? allData.subject.split('<br>') : [];

  const renderAttachments = (attachments) => {
    if (!attachments || attachments.length === 0) {
      return <p>No attachments available</p>;
    }

    return (
      <div
        className="attachments-container"
        style={{ marginTop: "40px", marginBottom: "20px" }}
      >
        {attachments.map((attachment, index) => {
          // Get the file content type and name for each attachment
          const { contentType, fileData, fileName } = attachment;
          const previewUrl = `data:${contentType};base64,${fileData}`;
          return (
            <div
              key={index}
              className="attachment-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {/* Image Preview */}
              {contentType && contentType.startsWith("image/") && (
                <div style={{ position: "relative", width: "30%" }}>
                  <img
                    src={previewUrl}
                    alt={fileName}
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      background: "rgb(0, 0, 0)",
                      color: "white",
                      padding: "5px 10px",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>{fileName}</span>
                    <button
                      onClick={() => downloadAttachment(attachment)}
                      style={{
                        background: "none",
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    >
                      <i className="bi bi-download"></i>
                    </button>

                  </div>
                </div>
              )}

              {/* PDF Preview */}
              {contentType === "application/pdf" && (
                <div style={{ width: "50%", position: "relative" }}>
                  <iframe
                    src={previewUrl}
                    style={{
                      width: "100%",
                      height: "400px",
                      border: "none",
                      borderRadius: "6px",
                    }}
                    title="PDF Preview"
                  ></iframe>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      background: "rgb(0, 0, 0)",
                      color: "white",
                      padding: "5px 10px",
                      borderBottomLeftRadius: "6px",
                      borderBottomRightRadius: "6px",
                    }}
                  >
                    <span style={{ fontSize: "14px" }}>{fileName}</span>
                    <button
                      onClick={() => downloadAttachment(attachment)}
                      style={{
                        background: "none",
                        border: "none",
                        borderRadius: "4px",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "20px",
                      }}
                    >
                      <i className="bi bi-download"></i>
                    </button>
                  </div>
                </div>
              )}

              {/* Unsupported File Types */}
              {!contentType.startsWith("image/") &&
                contentType !== "application/pdf" && (
                  <div
                    style={{
                      padding: "12px",
                      background: "#fff",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      textAlign: "center",
                    }}
                  >
                    <strong>Preview not available for this file type.</strong>
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => downloadAttachment(attachment)}
                        style={{
                          padding: "10px 15px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#007bff",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        Download
                      </button>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    );
  };


  const downloadAttachment = (attachment) => {
    const link = document.createElement("a");
    link.href = `data:${attachment.contentType};base64,${attachment.fileData}`;
    link.download = attachment.fileName;
    link.click();
  };

  const [importantStatus, setImportantStatus] = useState(allData.important); // Track the important status

  async function apiPutCallWithAuth(endpoint, data, token) {
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Add Bearer token
        },
        body: data, // Directly pass FormData object
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
        return data;
      } else {
        console.error('Error:', response.status, response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  const handleMarkImportant = () => {
    console.log("allData------------------------------------", allData);

    // Calculate the updated status
    const updatedImportantStatus = !importantStatus;

    // Update state
    setImportantStatus(updatedImportantStatus);
    console.log("importantStatus------------------------------------", updatedImportantStatus);

    const sendformdata = new FormData();
    sendformdata.append("Id", allData.id);
    sendformdata.append("isImportant", updatedImportantStatus);
    sendformdata.append("CC", allData.cc || []);
    sendformdata.append("To", allData.to || []);
    sendformdata.append("BCC", allData.bcc || []);
    sendformdata.append("From", allData.from || "");
    sendformdata.append("Message", allData.message || "");
    sendformdata.append("Subject", allData.subject || "");
    sendformdata.append("EmployeeCode", allData.employeeCode || "");
    sendformdata.append("TemplateType", allData.templatetype || "");

    //dispatch(updateMailThunk(sendformdata));

    apiPutCallWithAuth(updateSMSByIdUrl, sendformdata, staticToken);



  };






  const PreviewModernPoster = ({
    headerTitle,
    bodyContent,
    footerText,
    attachments,
  }) => {
    return (
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            textAlign: "center",
            background: "linear-gradient(45deg, rgb(0, 0, 0), rgb(95, 95, 95))",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1
            style={{
              fontSize: `20px`,
              fontWeight: "700",
              padding: "8px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {headerTitle}
          </h1>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Arial', sans-serif",
            lineHeight: "1.6",
          }}
        >
          <ReactQuill value={bodyContent} readOnly={true} theme="snow" />
          <style>
            {`
           .ql-container.ql-snow {
             overflow-x: hidden;
             overflow-y: scroll;
           }
           .ql-container.ql-snow::-webkit-scrollbar {
             display: none;
           }
           .ql-container.ql-snow {
             -ms-overflow-style: none;
             scrollbar-width: none;
           }
         `}
          </style>
        </div>

        <div
          style={{
            textAlign: "center",
            background: "#333",
            color: "#fff",
            marginTop: "20px",
            marginBottom: "0",
            fontSize: "14px",
          }}
        >
          <p>{footerText}</p>
        </div>
      </div>
    );
  };



  const PreviewWarningMail = ({
    headerTitle,
    bodyContent,
    footerText,
    attachments,
  }) => {
    return (
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "800px",
          margin: "auto",
        }}
      >
        <div
          style={{
            position: "relative",
            textAlign: "center",
            background: "linear-gradient(45deg,rgb(255, 0, 0),rgb(180, 0, 0))",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1
            style={{
              fontSize: `20px`,
              fontWeight: "700",
              padding: "8px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            {headerTitle}
          </h1>
        </div>

        <div
          style={{
            padding: "20px",
            background: "#ffffff",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "'Arial', sans-serif",
            lineHeight: "1.6",
          }}
        >
          <ReactQuill value={bodyContent} readOnly={true} theme="snow" />
          <style>
            {`
           .ql-container.ql-snow {
             overflow-x: hidden;
             overflow-y: scroll;
           }
           .ql-container.ql-snow::-webkit-scrollbar {
             display: none;
           }
           .ql-container.ql-snow {
             -ms-overflow-style: none;
             scrollbar-width: none;
           }
         `}
          </style>
        </div>

        <div
          style={{
            textAlign: "center",
            background: "#333",
            color: "#fff",
            marginTop: "20px",
            marginBottom: "0",
            fontSize: "14px",
          }}
        >
          <p>{footerText}</p>
        </div>
      </div>
    );
  };


  const PreviewCelebrationPoster = ({
    headerTitle,
    headerSubtitle,
    headerDate,
    headerImage,
    profileImage,
    bodyContent,
    ctaText,
    ctaLink,
    footerText,
  }) => {
    return (
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          maxWidth: "800px",
          margin: "auto",
          padding: "0px",
          backgroundColor: "#dcdcdc"
        }}
      >
        <div
          style={{
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "white"
          }}
        >
          <div
            style={{
              position: "relative",
              height: "300px",
              textAlign: "center",
              background: headerImage
                ? `url(${headerImage})`
                : "linear-gradient(45deg, #6a11cb, #2575fc)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              borderRadius: "0px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1
              style={{
                fontWeight: "700",
                paddingTop: "40px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {headerTitle}
            </h1>
            <p
              style={{
                fontSize: "18px",
                marginTop: "10px",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              {headerSubtitle}
            </p>
            <h1
              style={{
                fontSize: "36px",
                fontWeight: "700",
                paddingTop: "0px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              {headerDate}
            </h1>
            {profileImage.map((profileImg, index) => (
              <div
                key={index}
                className="attachment-item"
                style={{
                  position: "absolute",
                  bottom: "-40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid white",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {profileImg.contentType.startsWith("image/") ? (
                  <img
                    src={`data:${profileImg.contentType};base64,${profileImg.fileData}`}
                    alt={profileImg.fileName}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <p style={{ marginBottom: "10px" }}>{profileImg.fileName}</p>
                )}
                <button
                  onClick={() => downloadAttachment(profileImg)}
                  style={{
                    padding: "10px 15px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor: "#007bff",
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  Download
                </button>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "20px",
              background: "white",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
          </div>

          <div
            style={{
              textAlign: "center",
              padding: "20px",
              marginTop: "20px",

              background: "linear-gradient(45deg, #ff6a00, #ee0979)",
              color: "white",
            }}
          >
            <h3
              style={{
                marginBottom: "15px",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                background: "transparent",
                color: "white",
                textAlign: "center",
                fontWeight: "600",
                fontSize: "24px"
              }}
            >
              {ctaText}
            </h3>
            <p
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                background: "transparent",
                color: "white",
                textAlign: "center",
                fontWeight: "400",
                fontSize: "16px"
              }}
            >
              {ctaLink}
            </p>
          </div>

          <div
            style={{
              textAlign: "center",
              background: "#333",
              color: "#fff",
              marginTop: "20px",
              marginBottom: "0",
              fontSize: "14px",
            }}
          >
            <p>{footerText}</p>
          </div>
        </div>
      </div>
    );
  };



  return (
    <div className="data-container d-flex gap-2 justify-center align-center w-100" style={{ marginTop: "70px" }}>

      <div className="container-fluid py-3" style={{ padding: "1px 1px", width: "40%", }}>
        <div className="lead-status-container mt-0 p-3" style={{ background: "rgb(227,227,227)", border: "1px solid black" }}>
          <div className="form-group mt-2">
            {/* Displaying To field data */}
            <div className="form-control" style={{ border: "1px solid #ccc", padding: "6px 12px", borderRadius: "4px" }}>
              {/* {allData.to ? allData.to.join(', ') : "No recipients"} */}
              <p><strong>To:</strong> {allData.employeeCode?.length ? allData.employeeCode.join(', ') : 'N/A'}</p>
            </div>
          </div>

          <div className="form-group mt-2">
            {/* Displaying CC field data */}
            <div className="form-control" style={{ border: "1px solid #ccc", padding: "6px 12px", borderRadius: "4px" }}>
              {/* {allData.cc ? allData.cc.join(', ') : "No CC recipients"} */}
              <p><strong>CC:</strong> {allData.cc?.length ? allData.cc.join(', ') : 'N/A'}</p>
            </div>
          </div>

          <div className="form-group mt-2">
            {/* Displaying BCC field data */}
            <div className="form-control" style={{ border: "1px solid #ccc", padding: "6px 12px", borderRadius: "4px" }}>
              {/* {allData.bcc ? allData.bcc.join(', ') : "No BCC recipients"} */}
              <p><strong>BCC:</strong> {allData.bcc?.length ? allData.bcc.join(', ') : 'N/A'}</p>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center justify-center gap-2 mt-3">
            <button
              className="btn p-0 mb-2"
              onClick={() => handleMarkImportant()}
              title={importantStatus ? "Remove from important" : "Mark as important"}
            >
              {importantStatus ? (
                <FaStar size={20} color="gold" />
              ) : (
                <FaRegStar size={20} color="gray" />
              )}
            </button>
            <p className="card-text gap-2 mb-0 d-flex flex-row align-items-center">
              <small className="text-muted">{allData.createDate}</small>
              <small className="text-muted">{allData.createTime}</small>
            </p>
          </div>



        </div>


        <div>{renderAttachments(allData.attachment)}</div>

        {/* Image Preview */}
        {allData.fileData && allData.fileType.startsWith("image/") && (
          <div style={{ marginTop: "8px" }}>
            <img
              src={allData.fileData}
              alt="Selected"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "6px", border: "1px solid #ddd" }}
            />
          </div>
        )}

        {/* PDF Preview */}
        {allData.fileData && allData.fileType === "application/pdf" && (
          <div style={{ marginTop: "8px" }}>
            <iframe
              src={allData.fileData}
              style={{ width: "100%", height: "500px", border: "none", borderRadius: "6px" }}
              title="PDF Preview"
            ></iframe>
          </div>
        )}




      </div>
      <div className="container-fluid py-3" style={{ width: "50%", marginLeft: "0" }}>
        <div className="lead-status-container mt-0 p-3 w-100 h-100 border border-secondary" style={{ backgroundColor: '#E3E3E3' }}>
          <div className="data-container">
            {allData ? (
              (() => {
                switch (allData.templatetype) {
                  case 'warning':
                    return (
                      <PreviewWarningMail
                        headerTitle={allData.subject}
                        bodyContent={allData.message}
                        footerText={footerText}
                        attachments={allData.attachment}
                      />
                    );

                  case 'general':
                    return (
                      <PreviewModernPoster
                        headerTitle={allData.subject}
                        bodyContent={allData.message}
                        footerText={footerText}
                        attachments={allData.attachment}
                      />
                    );

                  case 'promotion':
                  case 'birthday':
                  case 'targetAchieved':
                    return (
                      <PreviewCelebrationPoster
                        headerTitle={subjectParts[0] || ''}
                        bodyContent={allData.message}
                        footerText={footerText}
                        attachments={allData.attachment}
                        headerDate={subjectParts[2] || ''}
                        headerSubtitle={subjectParts[1] || ''}
                        headerImage={headerImage}
                        profileImage={allData.photoFiles}
                        ctaText={ctaText}
                        ctaLink={ctaLink}
                      />
                    );

                  default:
                    return <p>No data available to display.</p>;
                }
              })()
            ) : (
              <p>No data available to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );




};

export default EmailDetails;
