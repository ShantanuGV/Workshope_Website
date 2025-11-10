import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} All Rights Reserved.</p>
    
      </div>
    </footer>
  );
}
