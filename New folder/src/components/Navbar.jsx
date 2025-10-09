import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Certificate Portal</h2>
      <div className="nav-buttons">
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "nav-btn active" : "nav-btn"
          }
        >
          Admin
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
