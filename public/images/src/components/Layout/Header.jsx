import { useState , useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
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

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
      <img src={iedc} alt="Website Logo" width="70" />
      <div className="header-container">
        
        <NavLink to="/" className="brand-logo" onClick={closeMobileMenu}>
          IEDC - GCOERC
        </NavLink>
        
        <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`main-nav ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item"><NavLink to="/vision-mission" className="nav-link" onClick={closeMobileMenu}>Vision & Mission</NavLink></li>
            <li className="nav-item"><NavLink to="/events" className="nav-link" onClick={closeMobileMenu}>Events</NavLink></li>
            <li className="nav-item"><NavLink to="/team" className="nav-link" onClick={closeMobileMenu}>Team</NavLink></li>
            <li className="nav-item"><NavLink to="/blogs" className="nav-link" onClick={closeMobileMenu}>Blogs</NavLink></li>
            <li className="nav-item"><NavLink to="/startups" className="nav-link" onClick={closeMobileMenu}>Startups</NavLink></li>
            <li className="nav-item"><NavLink to="/photogallery" className="nav-link" onClick={closeMobileMenu}>Photo Gallery</NavLink></li>
            <li className="nav-item"><NavLink to="/admin" className="nav-link admin-link" onClick={closeMobileMenu}>Admin</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
