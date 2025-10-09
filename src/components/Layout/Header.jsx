import { useState , useEffect} from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaEye, FaCalendarAlt, FaUsers, FaBlog, FaRocket, FaPhotoVideo } from 'react-icons/fa';
import { FiStar } from 'react-icons/fi'; // example icon
import iedc from "../../assets/images/iedc.png";
import './Header.css';

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);


  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
      setMobileMenuOpen(false);
  }

  const location = useLocation();
  const currentPath = location.pathname;

  // Detect scroll
  useEffect(() => {
    if (currentPath === "/") {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);

      // Set initial state in case page loads scrolled
      handleScroll();

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setIsScrolled(true); // other pages always opaque
    }
  }, [currentPath]);


  return (
    <header className={`app-header ${isScrolled ? "opaque" : "transparent"}`}>
      
      <div className="header-container">
        
        <NavLink to="/" className="brand-logo" onClick={closeMobileMenu}>
          GCOERC - Workshopes
        </NavLink>
        
        <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul className="nav-list">
            <li className="nav-item">
              <NavLink to="/vision-mission" className="nav-link" onClick={closeMobileMenu}>
                <p className="nav-icon" /> Certificate Download
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink to="/admin" className="nav-link admin-link" onClick={closeMobileMenu}>
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
