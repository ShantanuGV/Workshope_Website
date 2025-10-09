import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./Home.css";

const courses = [
  { id: 1, name: "Python Programming" },
  { id: 2, name: "Data Science" },
  { id: 3, name: "Web Development" },
  { id: 4, name: "AI & ML" },
];

function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const allowedEmail = "your-email@example.com";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === allowedEmail) {
      alert(`Download available for ${selectedCourse.name}`);
      const link = document.createElement("a");
      link.href = "mock-certificate.pdf";
      link.download = `${selectedCourse.name}-certificate.pdf`;
      link.click();
    } else {
      alert("Email not authorized for download.");
    }
  };

  return (
    <div className="home-container">
      <Navbar />

      <div className="content-area">
        {!selectedCourse ? (
          <div style={{ width: "100%" }}>
            <h3 style={{ marginBottom: "30px", textAlign: "center", color: "#fff" }}>
              Select a Course to Download Certificate
            </h3>
            <div className="courses-wrapper">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="course-card"
                  onClick={() => setSelectedCourse(course)}
                >
                  {course.name}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="form-container">
            <h3 style={{ marginBottom: "20px" }}>Download Certificate for {selectedCourse.name}</h3>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <textarea placeholder="Feedback" value={feedback} onChange={(e) => setFeedback(e.target.value)} />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" className="submit-btn">Download</button>
                <button type="button" onClick={() => setSelectedCourse(null)} className="back-btn">Back</button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
