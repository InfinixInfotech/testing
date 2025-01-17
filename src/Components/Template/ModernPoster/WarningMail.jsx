import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React-Quill styles
import BackButton from "../../../Components/Button/BackButton/BackButton";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmpCodeNameThunk, postMailThunk } from "../../../Redux/Services/thunks/sendMailThunk";

const WarningMail = () => {

    const [headerTitle, setHeaderTitle] = useState(
        "Formal Warning Regarding Conduct/Performance"
    );
    const [headerSubtitle, setHeaderSubtitle] = useState(
        "Addressing Recent Performance/Behavioral Issues"
    );
    const [document, setDocument] = useState("");
    const [headerDate, setHeaderDate] = useState("10 Dec 2024");
    const [bodyContent, setBodyContent] = useState(
        "<p><strong>Dear [Employee's Name],</strong><br />I hope this email finds you well. I am writing to formally address certain concerns regarding your [conduct/performance] at [Company Name].<br /><br /><strong>Issue Summary:</strong><br />On [specific date(s)], it was observed that [describe the behavior or performance issue briefly, e.g., you were late to work on multiple occasions, your recent project submissions have not met the expected standards, or there was an incident involving unprofessional behavior].<br /><br /><strong>Impact:</strong><br />This [behavior/performance] has negatively impacted [team morale/workflow/customer satisfaction/company goals], and it is important that we address this matter promptly to ensure a productive and professional work environment for everyone.<br /><br /><strong>Expected Improvement:</strong><br />We expect you to take the following actions to rectify the situation:<br />[Specific action item, e.g., Ensure punctuality and adherence to work schedules.]<br />[Specific action item, e.g., Maintain professionalism when interacting with colleagues and clients.]<br />[Specific action item, e.g., Meet the deadlines and quality standards for your projects.]<br /><br /><strong>Support and Next Steps:</strong><br />We are committed to supporting your success at [Company Name]. If there are challenges or concerns you’re facing that may be contributing to this issue, please do not hesitate to discuss them with [manager/HR representative]. We can explore resources or training opportunities to assist you in improving your performance.<br /><br /><strong>Consequences:</strong><br />Please note that failure to address and improve upon these concerns may result in further disciplinary action, up to and including termination of employment, as outlined in the company policy.<br /><br />I trust that you will take this feedback seriously and work diligently to make the necessary improvements. Please confirm receipt of this email and let me know if you have any questions or require clarification.<br /><br />Best regards,<br />[Your Name]<br />[Your Position]<br />[Company Name]<br />[Contact Information]</p>"
    );
    const [ctaText, setCtaText] = useState("🎂 Enjoy every moment of your special day! 🎂");
    const [ctaLink, setCtaLink] = useState("Thank you for everything you do for [Company Name]. We hope your birthday is as amazing as you are!");
    const [footerText, setFooterText] = useState(
        "© 2024 Infinix Infotech Private Limited"
    );
    const [isPreview, setIsPreview] = useState(false);
    const [fontSize, setFontSize] = useState(36);

    const [editorContent, setEditorContent] = useState(bodyContent);

    const [options, setOptions] = useState([]);

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
                    value: item.employeeCode,
                    label: `${item.employeeCode} ${item && item.employeeName ? `- ${item.employeeName}` : ''}`
                };
            });
            setOptions(transformedOptions);
        } else {
            console.log("data is not valid or data.data is undefined");
        }
    }, [data]);
    
    

    const [formData, setFormData] = useState({
        to: [],
        cc: [],
        bcc: [],
        subject: "",
        message: "",
        createTime: "",
        createDate: "",
        from: "INFADMIN2801",
        templatetype: "warning",
        isImportant: false,
        employeeCode: "",
      });
      const [file, setFile] = useState(null);
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
    
      const sendSMS = async () => {
        const sendformdata = new FormData();
    
        formData.to.forEach((to) => sendformdata.append("To", to));
        formData.cc.forEach((cc) => sendformdata.append("CC", cc));
        formData.bcc.forEach((bcc) => sendformdata.append("BCC", bcc));
        sendformdata.append("Subject", headerTitle);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Email sent successfully!");
        console.log(formData); 
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "code-block"],
            ["clean"],
        ],
    };

    const PreviewModernPoster = ({
        headerTitle,
        headerSubtitle,
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
                            fontSize: `24px`,
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
                    <ReactQuill
                        value={editorContent}
                        readOnly={true}
                        theme="snow"

                    />
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

    return (
        <>
            <div className="d-flex gap-3" style={{marginTop: "70px"}}>
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
                                    className="compose-btn btn btn-secondary py-2"
                                    onClick={() => alert("Email saved as draft!")}
                                >
                                    Save
                                </button>
                                <button onClick={sendSMS} type="submit" className="compose-btn btn btn-primary py-2">
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

                <div className="container-fluid py-3" style={{ width: "50%", marginLeft: "0" }}>
                    <div className="lead-status-container mt-0 p-3 w-100 h-100 border border-secondary" style={{ backgroundColor: '#E3E3E3' }}>
                        <div
                            style={{
                                fontFamily: "'Poppins', sans-serif",
                                maxWidth: "800px",
                                margin: "20px auto",
                            }}
                        >
                            <div className="d-flex align-items-center justify-content-center">
                                <button
                                    onClick={() => setIsPreview(!isPreview)}
                                    style={{
                                        background: "#007bff",
                                        color: "white",
                                        border: "none",
                                        padding: "8px",
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {isPreview ? "Edit" : "Preview"}
                                </button>
                            </div>

                            {isPreview ? (
                                <PreviewModernPoster
                                    headerTitle={headerTitle}
                                    headerSubtitle={headerSubtitle}
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
                                            textAlign: "center",
                                            background: "linear-gradient(45deg,rgb(255, 0, 0),rgb(180, 0, 0))",
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            color: "white",
                                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                        }}
                                    >
                                        <input
                                            type="text"
                                            value={headerTitle}
                                            onChange={(e) => setHeaderTitle(e.target.value)}
                                            style={{
                                                fontSize: `20px`,
                                                fontWeight: "700",
                                                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                                                width: "80%",
                                                background: "transparent",
                                                border: "none",
                                                color: "white",
                                                textAlign: "center",
                                                outline: "none",
                                                padding: "8px"
                                            }}
                                        />
                                    </div>

                                    {/* Body Content Section */}
                                    <div>
                                        <ReactQuill
                                            value={bodyContent}
                                            onChange={setBodyContent}
                                            theme="snow"
                                            style={{
                                                minHeight: "150px",
                                                marginTop: "20px",
                                                background: "white",
                                                borderRadius: "10px",
                                                padding: "10px",
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
                                                borderRadius: "5px",
                                                marginTop: "20px",
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
};



export default WarningMail;
