import './Footer.css';

export function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <p>© {new Date().getFullYear()} CIED Cell. All Rights Reserved.</p>
        <p>Developed by <a href="https://portfolioaaradhya.netlify.app/" target="_blank" rel="noopener noreferrer">Aaradhya Pathak</a></p>
      </div>
    </footer>
  );
}
