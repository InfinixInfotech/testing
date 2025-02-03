import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import React-Quill styles
import BackButton from "../../../Components/Button/BackButton/BackButton";
import "./Compose.css"
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { getAllEmpCodeNameThunk, postMailThunk } from "../../../Redux/Services/thunks/sendMailThunk";
import { empCode } from "../../../Redux/Services/apiServer/ApiServer";

const Compose = () => {

    const [headerTitle, setHeaderTitle] = useState(
        "Subject: Exciting Updates and Appreciation!"
    );
    const [headerSubtitle, setHeaderSubtitle] = useState(
        "Sharing Good News and Acknowledging Your Efforts"
    );
    const [document, setDocument] = useState("");
    const [headerDate, setHeaderDate] = useState("10 Dec 2024");
    const [bodyContent, setBodyContent] = useState(
        `<p><strong>Dear [Employee's Name],</strong><br/>
        I hope this email finds you well. I am thrilled to share some exciting updates and take this opportunity to acknowledge your invaluable contributions to [Company Name].<br /><br />
        <strong>Recent Achievements:</strong><br />
        We are pleased to announce that [describe the achievement, e.g., our team has successfully launched the new product line, surpassed sales targets, or received positive client feedback]. Your hard work and dedication have played a significant role in achieving this milestone.<br /><br />
        <strong>Your Contributions:</strong><br />
        Specifically, your efforts in [specific task or responsibility, e.g., leading the project, ensuring timely deliveries, or maintaining excellent customer relationships] have been instrumental in this success. Your commitment and professionalism are deeply appreciated.<br /><br />
        <strong>Looking Ahead:</strong><br />
        As we move forward, we are excited about the opportunities ahead and are confident in your continued support and dedication. Please don’t hesitate to share any ideas or feedback that can help us grow even further.<br /><br />
        <strong>Support and Collaboration:</strong><br />
        We remain committed to fostering a positive and collaborative work environment. If there’s anything you need or wish to discuss, feel free to reach out to [manager/HR representative].<br /><br />
        Once again, thank you for all that you do. Let’s continue to work together to achieve even greater heights!<br /><br />
        Best regards,<br />
        [Your Name]<br />
        [Your Position]<br />
        [Company Name]<br />
        [Contact Information]</p>`
    );
    const [ctaText, setCtaText] = useState("🌟 Keep up the great work! 🌟");
    const [ctaLink, setCtaLink] = useState("We’re proud to have you on the team and look forward to achieving more milestones together.");
    const [footerText, setFooterText] = useState(
        "© 2024 WinWealthAlgos Private Limited"
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

    const [selectedValues, setSelectedValues] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (data && typeof data === "object" && !Array.isArray(data) && data.data) {
            const groupMap = {};
            const individualOptions = [];

            // Process individual employees and group them by groupName
            data.data.forEach((item) => {
                const groupName = item.groupName;
                if (!groupMap[groupName]) {
                    groupMap[groupName] = [];
                }
                groupMap[groupName].push(item.employeeCode);

                individualOptions.push({
                    value: item.employeeCode,
                    label: `${item.employeeCode} - ${item.employeeName}`,
                });
            });

            // Create group-level options
            const groupOptions = Object.keys(groupMap).map((groupName) => ({
                value: groupName,
                label: `${groupName} (All Members)`,
                isGroup: true,
                members: groupMap[groupName],
            }));

            // Combine group and individual options
            const transformedOptions = [...groupOptions, ...individualOptions];

            setSelectedValues(transformedOptions);
        } else {
            console.log("data is not valid or data.data is undefined");
        }
    }, [data]);

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


    const handleSelect = (selectedOption) => {
        setFormData((prev) => ({
            ...prev,
            to: [],  // Clear 'to' field
        }));

        if (selectedOption.isGroup) {
            setFormData((prev) => ({
                ...prev,
                to: [...new Set([...prev.to, ...selectedOption.members])], // Add group members
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                to: [...new Set([...prev.to, selectedOption.value])], // Add single value
            }));
        }
    };

    // Filter options based on the search input
    const filteredOptions = selectedValues.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );



    const [formData, setFormData] = useState({
        to: [],
        cc: [],
        bcc: [],
        subject: "",
        message: "",
        createTime: "",
        createDate: "",
        from: empCode,
        templatetype: "general",
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
        console.log(formData);

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
                        background: "linear-gradient(45deg,rgb(0, 0, 0),rgb(95, 95, 95))",
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
            <div className="d-flex gap-3 " style={{ marginTop: "70px", position: "relative", width: "100%" }}>
                <div
                    className="container-fluid py-3"
                    style={{ padding: "1px 1px", width: "50%", marginLeft: "0" }}
                >
                    <div
                        className="lead-status-container mt-0 p-3"
                        style={{ background: "rgb(227,227,227)", border: "1px solid black" }}
                    >
                        <form onSubmit={handleMailSubmit}>
                            <div className="form-group mt-2" style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                                <label className="compose-label" style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px', color: '#333' }}>
                                    To:
                                </label>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        marginBottom: '10px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#555',
                                        backgroundColor: '#fff',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                />
                                <select
                                    className="custom-select"
                                    onChange={(e) => handleSelect(selectedValues.find(o => o.value === e.target.value))}
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '14px',
                                        color: '#555',
                                        backgroundColor: '#fff',
                                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#007bff'}
                                    onBlur={(e) => e.target.style.borderColor = '#ccc'}
                                >
                                    <option value="">Select an option</option>
                                    {filteredOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
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
                                            background: "linear-gradient(45deg,rgb(0, 0, 0),rgb(85, 85, 85))",
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



export default Compose;
