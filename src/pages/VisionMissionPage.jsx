import { useState } from "react";
import QRCode from "qrcode";
import "./VisionMissionPage.css";

// Firebase imports
import { db } from "../../src/firebaseConfig";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

export function VisionMissionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Feedback answers stored as object
  const [feedback, setFeedback] = useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
    q5: "",
  });

  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleFeedbackChange = (question, value) => {
    setFeedback((prev) => ({ ...prev, [question]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");

    // Validate all fields
    if (!name.trim() || !email.trim() || Object.values(feedback).some((f) => !f)) {
      alert("⚠️ Please fill in all fields and feedback options.");
      return;
    }

    try {
      // Check if certificate exists for this email
      const q = query(
        collection(db, "certificates"),
        where("email", "==", email.trim().toLowerCase())
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setError("No certificates found for this email.");
        return;
      }

      const userCertData = snapshot.docs[0].data();
      const officialName = userCertData.name; // admin-entered name

      // Get template + text box config from Firestore
      const templateDoc = await getDoc(doc(db, "config", "certificateTemplate"));
      if (!templateDoc.exists()) {
        setError("No certificate template found. Contact admin.");
        return;
      }

      const {
        templateUrl,
        textX1 = 0,
        textY1 = 0,
        textX2 = 0,
        textY2 = 0,
        fontSize = 32,
        fontFamily = "Poppins",
        fontColor = "#000000",
      } = templateDoc.data();

      if (!templateUrl) {
        setError("Certificate template URL is empty. Contact admin.");
        return;
      }

      const certImage = new Image();
      certImage.crossOrigin = "anonymous";
      certImage.src = templateUrl;

      certImage.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = certImage.naturalWidth || certImage.width;
        canvas.height = certImage.naturalHeight || certImage.height;

        // Draw certificate background
        ctx.drawImage(certImage, 0, 0, canvas.width, canvas.height);

        // Draw name text
        ctx.fillStyle = fontColor;
        ctx.font = `bold ${fontSize}px ${fontFamily}, sans-serif`;
        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        const boxWidth = textX2 - textX1;
        const words = officialName.split(" ");
        let line = "";
        const lines = [];

        words.forEach((word) => {
          const testLine = line + word + " ";
          const metrics = ctx.measureText(testLine);
          if (metrics.width > boxWidth && line) {
            lines.push(line);
            line = word + " ";
          } else {
            line = testLine;
          }
        });
        lines.push(line);

        const lineHeight = fontSize * 1.2;
        let startY = textY1;
        lines.forEach((lineText) => {
          ctx.fillText(lineText.trim(), textX1, startY);
          startY += lineHeight;
        });

        // ✅ Generate and draw QR code
        const docId = snapshot.docs[0].id;
        const verifyUrl = `https://workshopewebsitegcoerc.vercel.app/#/VerifyPage?id=${docId}`;

        try {
          const { qrX = canvas.width - 250, qrY = canvas.height - 250, qrSize = 200 } = templateDoc.data();

          const qrDataUrl = await QRCode.toDataURL(verifyUrl, { width: qrSize });
          const qrImage = new Image();
          qrImage.src = qrDataUrl;

          await new Promise((resolve) => {
            qrImage.onload = () => {
              ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);
              resolve();
            };
          });
        } catch (qrError) {
          console.error("QR generation failed:", qrError);
        }

        // Trigger download
        const link = document.createElement("a");
        const safeName = officialName.replace(/[^a-z0-9_\- ]/gi, "");
        link.download = `${safeName || "certificate"}_certificate.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();

        // ✅ Send user data to Sheet.best after download
        try {
          const response = await fetch(import.meta.env.VITE_SHEET_BEST_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name.trim(),
              email: email.trim(),
              ...feedback,
            }),
          });

          if (response.ok) {
            setStatus("Certificate downloaded & data saved successfully!");
          } else {
            setStatus("Certificate downloaded but failed to save data.");
            console.error("Sheet.best response not OK:", response.statusText);
          }
        } catch (err) {
          setStatus("Certificate downloaded but error saving data.");
          console.error("Error sending data to Sheet.best:", err);
        }

        // Clear form
        setName("");
        setEmail("");
        setFeedback({ q1: "", q2: "", q3: "", q4: "", q5: "" });
      };

      certImage.onerror = (err) => {
        console.error("Image load error:", err);
        setError("Cannot load certificate template image. Check template URL or CORS.");
      };
    } catch (err) {
      console.error(err);
      setError("Error fetching certificate info. Try again.");
    }
  };

  return (
    <section className="vision-mission-page">
      <h1 className="page-title slide-in-up">Certificate Download</h1>
      <div className="content-grid">
        <div className="card card-item slide-in-up">
          <h2 className="card-title">Enter Your Details</h2>
          <form onSubmit={handleSubmit} className="download-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
{/* ✅ Updated Feedback Section */}
<div className="feedback-section">
  <div className="feedback-question">
    <p>1️⃣ How well did the course help you understand the basic concepts of Java?</p>
    {["Excellent", "Good", "Average", "Needs Improvement"].map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name="q1"
          value={opt}
          checked={feedback.q1 === opt}
          onChange={(e) => handleFeedbackChange("q1", e.target.value)}
        />
        {opt}
      </label>
    ))}
  </div>

  <div className="feedback-question">
    <p>2️⃣ How effectively did the course explain Object-Oriented Programming concepts?</p>
    {["Very effectively", "Effectively", "Moderately", "Not effectively"].map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name="q2"
          value={opt}
          checked={feedback.q2 === opt}
          onChange={(e) => handleFeedbackChange("q2", e.target.value)}
        />
        {opt}
      </label>
    ))}
  </div>

  <div className="feedback-question">
    <p>3️⃣ Were the practical sessions/lab exercises helpful?</p>
    {["Strongly Agree", "Agree", "Neutral", "Disagree"].map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name="q3"
          value={opt}
          checked={feedback.q3 === opt}
          onChange={(e) => handleFeedbackChange("q3", e.target.value)}
        />
        {opt}
      </label>
    ))}
  </div>

  <div className="feedback-question">
    <p>4️⃣ Do you feel the topics covered are relevant and useful for real-world software development?</p>
    {["Highly Relevant", "Relevant", "Somewhat Relevant", "Not Relevant"].map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name="q4"
          value={opt}
          checked={feedback.q4 === opt}
          onChange={(e) => handleFeedbackChange("q4", e.target.value)}
        />
        {opt}
      </label>
    ))}
  </div>

  <div className="feedback-question">
    <p>5️⃣ Overall, how satisfied are you with your learning experience in the Core Java Programming course?</p>
    {["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"].map((opt) => (
      <label key={opt}>
        <input
          type="radio"
          name="q5"
          value={opt}
          checked={feedback.q5 === opt}
          onChange={(e) => handleFeedbackChange("q5", e.target.value)}
        />
        {opt}
      </label>
    ))}
  </div>
</div>

            <button type="submit">Download Certificate</button>
          </form>

          {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
          {status && <p style={{ color: "#00ffff", marginTop: "10px" }}>{status}</p>}
        </div>
      </div>
    </section>
  );
}
