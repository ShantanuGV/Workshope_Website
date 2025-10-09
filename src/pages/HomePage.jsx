import { NavLink } from 'react-router-dom';
import iedc from "../assets/images/iedc.png";
import { FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { FaJava } from "react-icons/fa";


import './HomePage.css';

export function HomePage() {
  return (
    <div className="fade-in">
      <section className="hero-section">
        <div className="hero-content slide-in-up">
          <h1 className="hero-title">Workshops</h1>
            <p className="hero-subtitle">Department of Computer Engineering at GCOERC</p>
          <NavLink to="/vision-mission" className="btn cta-button">
            Certificate
          </NavLink>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title slide-in-up">Download Certificate</h2>
        <div className="features-grid">
          <NavLink to="/vision-mission" className="card feature-card slide-in-up">
          <FaJava size={80} style={{ marginBottom: "16px", color: "#f89820" }} />
            <h3>Core Java Programming</h3>
            <p></p>
          </NavLink>
          
          
        </div>
      </section>
    </div>
  );
}
