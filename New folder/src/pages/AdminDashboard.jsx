import React from "react";
import { auth, db, storage } from "../firebaseConfig";

function AdminDashboard() {
  const handleUpload = () => {
    console.log("Mock upload called");
    alert("File uploaded (mock)!");
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Admin Dashboard (Mock)</h1>
      <button onClick={handleUpload}>Upload Certificate</button>
    </div>
  );
}

export default AdminDashboard;
