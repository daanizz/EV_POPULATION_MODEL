import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <ul className="footer-list">
        <li className="footer-copy">
          <p>&copy; All rights reserved to DZ</p>
        </li>
        <li className="footer-links">
          <a href="#" className="footer-link">
            Instagram
          </a>
          <a href="#" className="footer-link">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
}
