import { useState, useEffect } from "react";
import { collection, addDoc, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import DownloadIcon from "@mui/icons-material/Download";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import "./AdminCertificates.css";

import "@fontsource/libre-baskerville";

export function AdminCertificates() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [templateUrl, setTemplateUrl] = useState("");
  const [textX1, setTextX1] = useState(0);
  const [textY1, setTextY1] = useState(0);
  const [textX2, setTextX2] = useState(0);
  const [textY2, setTextY2] = useState(0);
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Poppins");
  const [fontColor, setFontColor] = useState("#000000");

  // 🆕 QR Position + Size
  const [qrX, setQrX] = useState(50);
  const [qrY, setQrY] = useState(50);
  const [qrSize, setQrSize] = useState(100);

  const [status, setStatus] = useState("");

  // 🔁 Load config (reusable function)
  const loadConfig = async () => {
    const docRef = doc(db, "config", "certificateTemplate");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setTemplateUrl(data.templateUrl || "");
      setTextX1(data.textX1 || 0);
      setTextY1(data.textY1 || 0);
      setTextX2(data.textX2 || 0);
      setTextY2(data.textY2 || 0);
      setFontSize(data.fontSize || 32);
      setFontFamily(data.fontFamily || "Poppins");
      setFontColor(data.fontColor || "#000000");
      setQrX(data.qrX || 50);
      setQrY(data.qrY || 50);
      setQrSize(data.qrSize || 100);
    }
  };

  useEffect(() => {
    loadConfig();
  }, []);

  // Save template + text + QR options
  const handleTemplateSave = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!templateUrl.trim()) {
      setStatus("⚠️ Please enter template image URL");
      return;
    }
    try {
      await setDoc(doc(db, "config", "certificateTemplate"), {
        templateUrl: templateUrl.trim(),
        textX1,
        textY1,
        textX2,
        textY2,
        fontSize,
        fontFamily,
        fontColor,
        qrX,
        qrY,
        qrSize,
        updatedAt: new Date(),
      });
      setStatus("✅ Template + QR settings saved!");
      await loadConfig();
    } catch (err) {
      console.error(err);
      setStatus("❌ Error saving template: " + err.message);
    }
  };

  // Add user certificate
  const handleUserAdd = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!email.trim() || !name.trim()) {
      setStatus("⚠️ Please fill both name and email.");
      return;
    }
    try {
      await addDoc(collection(db, "certificates"), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        createdAt: new Date(),
      });
      setStatus("✅ User added!");
      setEmail("");
      setName("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error: " + err.message);
    }
  };

  return (
    <div className="admin-certificates-page">
      <div className="download-section">
        <Tooltip title="Download Excel Sheet">
          <IconButton
            component="a"
            href="https://docs.google.com/spreadsheets/d/17zfCot-FlolQJ6EM80JRtKuQ06sorAOLZgpOwMZJVv8/export?format=xlsx"
            download="Certificates.xlsx"
            style={{ color: "#00ffff" }}
          >
            <BsFileEarmarkSpreadsheetFill
              style={{ color: "#00ffff", fontSize: "28px" }}
            />
          </IconButton>
        </Tooltip>
        <p style={{ display: "inline", marginLeft: "8px", color: "#00ffff" }}>
          Download Excel Sheet
        </p>
      </div>

      <h2>➕ Add Certificate (Name & Email)</h2>
      <div className="stat-card">
        <form onSubmit={handleUserAdd} className="admin-certificates-form">
          <label>
            Recipient Name:
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
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
          <button type="submit">Add Certificate</button>
        </form>
      </div>

      {status && <p style={{ marginTop: "10px" }}>{status}</p>}

      <h2>🖼 Upload / Save Universal Certificate Template + Text + QR Options</h2>
      <div className="stat-card">
        <form onSubmit={handleTemplateSave} className="admin-certificates-form">
          <label>
            Template Image URL (PNG/JPG):
            <input
              type="url"
              placeholder="https://..."
              value={templateUrl}
              onChange={(e) => setTemplateUrl(e.target.value)}
              required
            />
          </label>

          <div className="coordinates-row">
            <div className="coordinate-left">
              <label>
                Top-Left X,Y:
                <div className="input-row">
                  <input
                    type="number"
                    value={textX1}
                    onChange={(e) => setTextX1(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={textY1}
                    onChange={(e) => setTextY1(Number(e.target.value))}
                  />
                </div>
              </label>
            </div>

            <div className="coordinate-right">
              <label>
                Bottom-Right X,Y:
                <div className="input-row">
                  <input
                    type="number"
                    value={textX2}
                    onChange={(e) => setTextX2(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    value={textY2}
                    onChange={(e) => setTextY2(Number(e.target.value))}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Font Options Row */}
          <div className="font-options-row">
            <div className="font-option">
              <label>
                Font Size:
                <input
                  type="number"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                />
              </label>
            </div>

            <div className="font-option">
              <label>
                Font Family:
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                >
                  <option value="Poppins">Poppins</option>
                  <option value="Arial">Arial</option>
                  <option value="Verdana">Verdana</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Libre Baskerville">Libre Baskerville</option>
                </select>
              </label>
            </div>

            <div className="font-option">
              <label>
                Font Color:
                <input
                  type="color"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </label>
            </div>
          </div>

          {/* 🆕 QR Placement Row */}
          <h3>📍 QR Code Placement</h3>
          <div className="qr-options-row">
            <div className="qr-option">
              <label>
                QR X Position:
                <input
                  type="number"
                  value={qrX}
                  onChange={(e) => setQrX(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="qr-option">
              <label>
                QR Y Position:
                <input
                  type="number"
                  value={qrY}
                  onChange={(e) => setQrY(Number(e.target.value))}
                />
              </label>
            </div>
            <div className="qr-option">
              <label>
                QR Size (px):
                <input
                  type="number"
                  value={qrSize}
                  onChange={(e) => setQrSize(Number(e.target.value))}
                />
              </label>
            </div>
          </div>

          <button type="submit">Save Template</button>
        </form>
      </div>

      <div className="instructions">
        <h4>💡 Instructions:</h4>
        <ul>
          <li>Paste a public image URL (PNG/JPG) as the certificate template.</li>
          <li>Set text area coordinates and font settings.</li>
          <li>
            Adjust QR position (X,Y) and size to match your template layout.
          </li>
          <li>
            Save all — these settings will apply globally for all generated
            certificates.
          </li>
        </ul>
      </div>
    </div>
  );
}
