const PreviewModernPoster = ({ headerTitle, headerSubtitle, headerImage, bodyContent, ctaText, ctaLink, footerText }) => {
    return (
      <div style={{ fontFamily: "'Poppins', sans-serif", maxWidth: "800px", margin: "auto", border: "1px solid #ccc" }}>
        <div
          style={{
            position: "relative",
            height: "300px",
            textAlign: "center",
            background: headerImage ? `url(${headerImage})` : "linear-gradient(45deg, #6a11cb, #2575fc)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h1 style={{ fontSize: "36px", fontWeight: "700", paddingTop: "40px", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
            {headerTitle}
          </h1>
          <p style={{ fontSize: "18px", marginTop: "10px", textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)" }}>{headerSubtitle}</p>
        </div>
  
        <div style={{ padding: "20px", background: "#f7f9fc", borderRadius: "10px", marginTop: "20px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "15px", fontWeight: "600", color: "#333" }}>About the Event</h2>
          <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
        </div>
  
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "10px",
            background: "linear-gradient(45deg, #ff6a00, #ee0979)",
            color: "white",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Join Us Today!</h3>
          <a
            href={ctaLink}
            style={{
              display: "inline-block",
              padding: "15px 30px",
              background: "white",
              color: "#ee0979",
              textDecoration: "none",
              fontWeight: "700",
              borderRadius: "5px",
              transition: "transform 0.2s, background-color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#ffcccb")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "white")}
          >
            {ctaText}
          </a>
        </div>
  
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            marginTop: "20px",
            fontSize: "14px",
          }}
        >
          <p>{footerText}</p>
        </div>
      </div>
    );
  };
  