import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
        <p>Developed by <a href="https://shantanugv.github.io/Websites/" target="_blank" rel="noopener noreferrer">Shantanu Vispute</a></p>
      </div>
    </footer>
  );
}
