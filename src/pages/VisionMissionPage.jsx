import { useState } from 'react';
import './VisionMissionPage.css';

// Firebase imports
import { db } from '../../src/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export function VisionMissionPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [certificates, setCertificates] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setCertificates([]);

    // Validation
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    // 1️⃣ Save feedback to Google Sheet via Sheet.best
    const data = { name, email, feedback };
    try {
      const response = await fetch(import.meta.env.VITE_SHEET_BEST_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log("✅ Feedback saved!");
      } else {
        console.log("❌ Failed to save feedback.");
      }
    } catch (error) {
      console.error("⚠️ Error submitting feedback:", error);
    }

    // 2️⃣ Fetch certificates from Firebase
    try {
      const q = query(collection(db, "certificates"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("No certificates found for this email.");
        return;
      }

      const certs = snapshot.docs.map((doc) => doc.data());
      setCertificates(certs);

      certs.forEach((cert) => {
        const link = document.createElement("a");
        link.href = cert.certificateUrl;
        link.download = "";
        link.target = "_blank";
        link.click();
      });
    } catch (err) {
      console.error(err);
      setError("Error fetching certificates. Try again.");
    }

    // Clear form
    setName("");
    setEmail("");
    setFeedback("");
  };

  return (
    <section className="vision-mission-page">
      <h1 className="page-title slide-in-up">Certificate Download</h1>
      <div className="content-grid">
        <div className="card card-item slide-in-up">
          <h2 className="card-title">Enter Your Details</h2>

          {/* 👇 only one onSubmit */}
          <form onSubmit={handleSubmit} className="download-form">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button type="submit">Download Certificate</button>
          </form>

          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
      </div>
    </section>
  );
}
