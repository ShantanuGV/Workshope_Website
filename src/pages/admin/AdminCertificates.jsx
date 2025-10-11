import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import DownloadIcon from "@mui/icons-material/Download"; // ✅ import download icon
import IconButton from "@mui/material/IconButton"; // ✅ icon button
import Tooltip from "@mui/material/Tooltip";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import "./AdminCertificates.css";

export function AdminCertificates() {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleDownloadSheet = () => {
    const link = document.createElement("a");
    link.href = SHEET_URL;
    link.download = "Certificates.xlsx"; // file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
  
    if (!email.trim() || !url.trim()) {
      setStatus("⚠️ Please enter both email and certificate URL.");
      return;
    }
  
    // Convert Google Drive view link to download link automatically
    let downloadUrl = url.trim();
    const match = downloadUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      downloadUrl = `https://drive.google.com/uc?export=download&id=17zfCot-FlolQJ6EM80JRtKuQ06sorAOLZgpOwMZJVv8`;
    }
  
    try {
      await addDoc(collection(db, "certificates"), {
        email: email.trim().toLowerCase(),
        certificateUrl: downloadUrl, // save converted link
        createdAt: new Date(),
      });
  
      setStatus("✅ Certificate added successfully!");
      setEmail("");
      setUrl("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error adding certificate: " + err.message);
    }
  };
  

  return (
    <div className="admin-certificates-page">
      
      <div className="download-section" >
        
        <Tooltip title="Download Excel Sheet">
          <IconButton onClick={handleDownloadSheet} className="download-btn" color="#00ffff">
            <BsFileEarmarkSpreadsheetFill style={{ color: "#00ffff", fontSize: "28px" }} />
            </IconButton >
            
        </Tooltip>
        <p style={{ display: "inline", marginLeft: "8px", color: "#00ffff" }}>
          Download Excel Sheet
        </p>
      </div>

      <h2>Upload Certificate Links</h2>
      <div className="stat-card">
      <form onSubmit={handleSubmit} className="admin-certificates-form">
        <label>
          Recipient Email:
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Certificate URL:
          <input
            type="url"
            placeholder="https://..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>

        <button type="submit">Add Certificate</button>
      </form>
      </div>

      {status && <p className="status-message">{status}</p>}

      <div className="instructions">
        <h4>💡 Instructions:</h4>
        <ul>
          <li>Upload your PDF certificates to Google Drive, Dropbox, or any public host.</li>
          <li>Copy the <b>public shareable link</b> and paste it in the URL field.</li>
          <li>Enter the recipient’s email linked to that certificate.</li>
        </ul>
      </div>

      
    </div>
  );
}
