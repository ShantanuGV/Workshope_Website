import { useSearchParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./VerificationPage.css";

export function VerifyPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const docRef = doc(db, "certificates", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          setData({ error: "Invalid or expired certificate ID" });
        }
      };
      fetchData();
    }
  }, [id]);

  return (
    <div className="verification-container">
      <div className="verification-card">
        <h1 className="verification-title">Certificate Verification</h1>
        {!data ? (
          <p>Loading...</p>
        ) : data.error ? (
          <div className="error-message">{data.error}</div>
        ) : (
          <div className="verification-result">
            <p><strong>✔Certificate is Valide</strong></p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Certificate ID:</strong> {id}</p>
          </div>
        )}
      </div>
    </div>
  );
}
