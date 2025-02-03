import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getAllEmpCodeNameThunk, postMailThunk } from "../../../Redux/Services/thunks/sendMailThunk";
import { empCode } from "../../../Redux/Services/apiServer/ApiServer";

const Target = () => {
  const [messageType, setMessageType] = useState("target achieved");
  const [finalMessageType, setFinalMessageType] = useState('');

  const [headerTitle, setHeaderTitle] = useState('');
  const [headerSubtitle, setHeaderSubtitle] = useState('');
  const [headerDate, setHeaderDate] = useState('');
  const [headerImage, setHeaderImage] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [bodyContent, setBodyContent] = useState('');
  const [ctaText, setCtaText] = useState('');
  const [ctaLink, setCtaLink] = useState('');

  // Set message based on the selected type
  useEffect(() => {
   if (messageType.toLowerCase() === 'target achieved') {
      setHeaderTitle("Congratulations on Achieving Your Target, [Employee's Name]!");
      setHeaderSubtitle("🏆 Your hard work and dedication have paid off! 🏆");
      setHeaderDate("Target Achieved");
      setBodyContent("<p>Congratulations on reaching and surpassing your targets for this period at <strong>[Company Name]</strong>! Your commitment and determination have been exceptional, and this achievement reflects your outstanding efforts. <br><strong>We want to celebrate the following milestones you've achieved:</strong> <br>✨ [Target Achievement Details], <br>✨ [Specific Milestone]. <br> Your contributions have made a real difference, and we look forward to even greater accomplishments in the future. Well done, and keep up the fantastic work! 🎯🚀</p>");
      setCtaText("🏆 Here's to many more successes ahead! 🏆");
      setCtaLink("We are proud of your achievement and excited to see you continue to excel at [Company Name].");
      setHeaderImage('https://img.freepik.com/premium-vector/falling-confetti-blue-background_257584-927.jpg?ga=GA1.1.2127501896.1730961765&semt=ais_hybrid');  // Add appropriate image path
    }
  }, [messageType]);



  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value.toLowerCase(); // Normalize the selected value
    console.log("Selected message type:", selectedValue) // Log the selected value
    if(selectedValue=="promotion") {

    }
    setMessageType(selectedValue);
    console.log("messageType------------------------------"+messageType);
     // Set the normalized value in the state
  };



  const [footerText, setFooterText] = useState(
    "© 2024 Infinix Infotech Private Limited"
  );
  const [editorContent, setEditorContent] = useState(bodyContent);
  const [isPreview, setIsPreview] = useState(false);
  const [fontSize, setFontSize] = useState(36);
  const [options, setOptions] = useState([]);

  const combinedString = `${headerTitle}<br>${headerSubtitle}<br>${headerDate}`;

  useEffect(() => {
    setEditorContent(bodyContent);
  }, [bodyContent]);

  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.sendMail);

  useEffect(() => {
    dispatch(getAllEmpCodeNameThunk());
    console.log("data-----------------" + data);
  }, [dispatch]);

  useEffect(() => {
    if (data && typeof data === 'object' && !Array.isArray(data) && data.data) {
      console.log("data if-----------------", data);
      const transformedOptions = Object.keys(data.data).map((key) => {
        const item = data.data[key];
        return {
          value: item?.employeeCode || '',  // Default value if item is null
          label: item?.employeeCode ? `${item.employeeCode} ${item.employeeName ? `- ${item.employeeName}` : ''}` : 'No Data'
        };
      });
      setOptions(transformedOptions);
    } else {
      console.log("data is not valid or data.data is undefined");
    }
  }, [data]);




  const [file, setFile] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [zipContents, setZipContents] = useState([]);


  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);

      if (
        selectedFile.type === "application/zip" ||
        selectedFile.name.endsWith(".zip")
      ) {
        const zip = new JSZip();
        const zipFileContents = [];
        const fileReader = new FileReader();

        fileReader.onload = async (e) => {
          try {
            const zipData = await zip.loadAsync(e.target.result);
            zipData.forEach((relativePath) => {
              zipFileContents.push(relativePath);
            });
            setZipContents(zipFileContents);
          } catch (err) {
            console.error("Error reading zip file:", err);
          }
        };

        fileReader.readAsArrayBuffer(selectedFile);
        setPreviewUrl(null);
      } else if (
        selectedFile.type.startsWith("image/") ||
        selectedFile.type === "application/pdf"
      ) {
        setPreviewUrl(URL.createObjectURL(selectedFile));
        setZipContents([]);
      } else {
        setPreviewUrl(null);
        setZipContents([]);
      }
    }
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };


  const [formData, setFormData] = useState({
    to: [],
    cc: [],
    bcc: [],
    subject: "",
    message: "",
    createTime: "",
    createDate: "",
    from: empCode,
    templatetype: messageType,
    isImportant: false,
    employeeCode: "",
  });



  const sendSMS = async () => {
    const sendformdata = new FormData();

    formData.to.forEach((to) => sendformdata.append("To", to));
    formData.cc.forEach((cc) => sendformdata.append("CC", cc));
    formData.bcc.forEach((bcc) => sendformdata.append("BCC", bcc));
    sendformdata.append("Subject", combinedString);
    sendformdata.append("Message", bodyContent);
    sendformdata.append("CreateTime", formData.createTime);
    sendformdata.append("CreateDate", formData.createDate);
    sendformdata.append("From", formData.from);
    sendformdata.append("Templatetype", formData.templatetype);
    sendformdata.append("isImportant", formData.isImportant);
    sendformdata.append("EmployeeCode", formData.employeeCode);

    if (file) {
      sendformdata.append("Attachment", file);
    }
    if (photoFile) {
      sendformdata.append("PhotoFiles", photoFile);
    }

    dispatch(postMailThunk(sendformdata));
  };

  const handleMailSelectChange = (selectedOptions, action) => {
    const fieldName = action.name;
    setFormData({
      ...formData,
      [fieldName]: selectedOptions.map((option) => option.value),
    });
  };


  const handleMailSubmit = (e) => {
    e.preventDefault();
    alert("Email Sent Successfully!");
    console.log("Form Data: ", formData);
  };


  const PreviewModernPoster = ({
    headerTitle,
    headerSubtitle,
    headerImage,
    profileImage, // Pass profile image to preview
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
              fontSize: `${fontSize}px`,
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
          {/* Profile image display */}
          {profileImage && (
            <div
              style={{
                position: "absolute",
                bottom: "0px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "3px solid white",
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}
        </div>

        <div
          style={{
            padding: "20px",
            background: "#f7f9fc",
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
    );
  };

  return (
    <>
      <div className="d-flex gap-3" style={{ marginTop: "70px" }}>
        <div
          className="container-fluid py-3"
          style={{ padding: "1px 1px", width: "50%", marginLeft: "0" }}
        >
          <div
            className="lead-status-container mt-0 p-3"
            style={{ background: "rgb(227,227,227)", border: "1px solid black" }}
          >
            <form onSubmit={handleMailSubmit}>
              {/* TO Field with Multi-Select and Search */}
              <div className="form-group mt-2">
                <label className="compose-lable">To:</label>
                <Select
                  isMulti
                  name="to"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Add recipient emails"
                  onChange={handleMailSelectChange}
                />
              </div>

              {/* CC Field with Multi-Select and Search */}
              <div className="form-group mt-2">
                <label className="compose-lable">CC:</label>
                <Select
                  isMulti
                  name="cc"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Add CC emails"
                  onChange={handleMailSelectChange}
                />
              </div>

              {/* BCC Field with Multi-Select and Search */}
              <div className="form-group mt-2">
                <label className="compose-lable">BCC:</label>
                <Select
                  isMulti
                  name="bcc"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Add BCC emails"
                  onChange={handleMailSelectChange}
                />
              </div>

              {/* Submit Buttons */}
              <div className="form-group d-flex justify-content-between mt-4">
                <button
                  type="button"
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "6px 12px", // Reduced padding
                    fontSize: "12px", // Reduced font size
                    fontWeight: "500",
                    borderRadius: "4px", // Smaller border radius
                    cursor: "pointer",
                  }}
                  onClick={() => alert("Email saved as draft!")}
                >
                  Save
                </button>
                <button onClick={sendSMS} type="submit" style={{
                  background: "#007bff",
                  color: "white",
                  border: "none",
                  padding: "6px 12px", // Reduced padding
                  fontSize: "12px", // Reduced font size
                  fontWeight: "500",
                  borderRadius: "4px", // Smaller border radius
                  cursor: "pointer",
                }}>
                  Send
                </button>
              </div>
            </form>
          </div>



          <div
            className="lead-status-container p-4 mt-4"
            style={{
              background: "#f9f9f9",
              border: "1px solid #ddd",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div className="form-group mb-3">
              <label
                className="compose-label"
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: "#333",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Attachment:
              </label>
              <input
                type="file"
                className="form-control-file"
                name="attachment"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  padding: "6px 12px",
                  width: "100%",
                }}
                onChange={handleFileChange}
              />
            </div>
            {file && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  color: "#555",
                  wordWrap: "break-word",
                }}
              >
                <strong>Selected File:</strong> {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </div>
            )}
            {/* Image Preview */}
            {previewUrl && file.type.startsWith("image/") && (
              <div style={{ marginTop: "16px" }}>
                <img
                  src={previewUrl}
                  alt="Selected"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    borderRadius: "6px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
            {/* PDF Preview */}
            {previewUrl && file.type === "application/pdf" && (
              <div style={{ marginTop: "16px" }}>
                <iframe
                  src={previewUrl}
                  style={{
                    width: "100%",
                    height: "500px",
                    border: "none",
                    borderRadius: "6px",
                  }}
                  title="PDF Preview"
                ></iframe>
              </div>
            )}
            {/* Zip File Preview */}
            {file && (file.type === "application/zip" || file.name.endsWith(".zip")) && zipContents.length > 0 && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                }}
              >
                <strong>Zip File Contents:</strong>
                <ul style={{ marginTop: "8px", fontSize: "0.9rem", color: "#555" }}>
                  {zipContents.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {/* Unsupported File Types */}
            {file && !previewUrl && zipContents.length === 0 && (
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  textAlign: "center",
                }}
              >
                <strong>Preview not available for this file type.</strong>
              </div>
            )}
          </div>


        </div>

        <div
          className="lead-status-container p-3 mt-3 border border-secondary"
          style={{ backgroundColor: "#E3E3E3" }}
        >
          <div
            style={{
              fontFamily: "'Poppins', sans-serif",
              maxWidth: "800px",
              margin: "20px auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
              {/* Left Side - Dropdown */}
             

              {/* Right Side - Content */}
              <div>
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  style={{
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    padding: "6px 12px", // Reduced padding
                    fontSize: "12px", // Reduced font size
                    fontWeight: "500",
                    borderRadius: "4px", // Smaller border radius
                    cursor: "pointer",
                  }}
                >
                  {isPreview ? "Edit" : "Preview"}
                </button>
              </div>
            </div>





            {isPreview ? (
              <PreviewModernPoster
                headerTitle={headerTitle}
                headerSubtitle={headerSubtitle}
                headerImage={headerImage}
                profileImage={profileImage}
                bodyContent={bodyContent}
                ctaText={ctaText}
                ctaLink={ctaLink}
                footerText={footerText}
              />
            ) : (
              <>
                {/* Header Section */}
                <div
                   style={{
                    position: "relative",
                    height: "400px", // Adjust height based on content or set it dynamically
                    textAlign: "center",
                    background: `url(${headerImage}) center center`,
                    backgroundSize: "cover", // Ensures the full image is shown
                    backgroundRepeat: "no-repeat", // Avoid tiling
                    color: "white",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <input
                    type="text"
                    value={headerTitle}
                    onChange={(e) => setHeaderTitle(e.target.value)}
                    style={{
                      marginTop: "60px",
                      fontSize: `${fontSize}px`,
                      fontWeight: "700",
                      paddingTop: "40px",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      width: "80%",
                      padding: "0",
                      background: "transparent",
                      border: "none",
                      color: "white",
                      textAlign: "center",
                      outline: "none",
                    }}
                  />
                  <input
                    type="text"
                    value={headerSubtitle}
                    onChange={(e) => setHeaderSubtitle(e.target.value)}
                    style={{
                      fontSize: "18px",
                      marginTop: "5px",
                      textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                      width: "80%",
                      padding: "0",
                      background: "transparent",
                      border: "none",
                      color: "white",
                      textAlign: "center",
                      outline: "none",
                    }}
                  />
                  <input
                    type="text"
                    value={headerDate}
                    onChange={(e) => setHeaderDate(e.target.value)}
                    style={{
                      fontSize: `${fontSize}px`,
                      fontWeight: "700",
                      paddingTop: "40px",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      width: "80%",
                      padding: "0",
                      background: "transparent",
                      border: "none",
                      color: "white",
                      textAlign: "center",
                      outline: "none",
                    }}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                    style={{
                      position: "absolute",
                      bottom: "10px",
                      fontWeight: "700",
                      left: "50%",
                      transform: "translateX(-50%)",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      width: "80px",
                      fontSize: "10px",
                    }}
                  />

                  {/* Profile image display */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "40px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "3px solid white",
                    }}
                  >
                    <img
                      src={profileImage || "https://via.placeholder.com/80"}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>

                {/* Body Content Section */}
                <div>
                  <ReactQuill
                    value={bodyContent}
                    onChange={setBodyContent}
                    theme="snow"
                    style={{
                      minHeight: "150px",
                      marginTop: "8px",
                      background: "white",
                      padding: "10px",
                    }}
                  />
                </div>

                {/* Call-to-action Section */}
                <div>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      width: "100%",
                      padding: "10px",
                      background: "#f7f9fc",
                      border: "1px solid #ccc",
                      marginTop: "8px",
                    }}
                  />
                  <input
                    type="url"
                    value={ctaLink}
                    onChange={(e) => setCtaLink(e.target.value)}
                    style={{
                      fontSize: "18px",
                      fontWeight: "700",
                      width: "100%",
                      padding: "10px",
                      background: "#f7f9fc",
                      border: "1px solid #ccc",
                      marginTop: "8px",
                    }}
                  />
                </div>

                {/* Footer Section */}
                <div>
                  <input
                    type="text"
                    value={footerText}
                    onChange={(e) => setFooterText(e.target.value)}
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      width: "100%",
                      padding: "10px",
                      background: "#f7f9fc",
                      border: "1px solid #ccc",
                      marginTop: "8px",
                    }}
                  />
                </div>
              </>
            )}
          </div>
        </div>


      </div>

    </>
  );
};

export default Target;
