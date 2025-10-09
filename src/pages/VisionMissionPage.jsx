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

  const handleDownload = async (e) => {
    e.preventDefault();
    setError("");
    setCertificates([]);

    // Validation
    if (!name.trim() || !email.trim() || !feedback.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const q = query(collection(db, "certificates"), where("email", "==", email));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError("No certificates found for this email.");
        return;
      }

      // List of matching certificates
      const certs = snapshot.docs.map(doc => doc.data());
      setCertificates(certs);

      // Trigger download for each certificate
      certs.forEach(cert => {
        const link = document.createElement("a");
        link.href = cert.certificateUrl; // use certificateUrl
        link.download = ""; // browser uses default filename
        link.target = "_blank"; // ensures it opens/downloads properly
        link.click();
      });

    } catch (err) {
      console.error(err);
      setError("Error fetching certificates. Try again.");
    }
  };

  return (
    <section className="vision-mission-page">
      <h1 className="page-title slide-in-up">Certificate Download</h1>
      <div className="content-grid">
        <div className="card card-item slide-in-up">
          <h2 className="card-title">Enter Your Details</h2>
          <form onSubmit={handleDownload} className="download-form">
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
