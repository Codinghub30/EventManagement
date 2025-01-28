import React from "react";
import "./styles.scss";
import {
  Facebook,
  Instagram,
  Twitter,
  YouTube,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  return (
    <footer className="footer-main">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Shop by Category</h3>
          <ul>
            <li>Sounds</li>
            <li>Lights</li>
            <li>Fabrications</li>
            <li>Shamiana</li>
            <li>Fabrication</li>
            <li>Video</li>
            <li>Genset</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Policy</h3>
          <ul>
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Sitemap</li>
            <li>Security</li>
            <li>Privacy</li>
            <li>EPR Compliance</li>
          </ul>
        </div>

        <div className="footer-column">
          <div className="social-media">
            <Facebook className="icon" />
            <Instagram className="icon" />
            <Twitter className="icon" />
            <YouTube className="icon" />
          </div>
          <div className="location">
            <LocationOn />
            <span>United States</span>
          </div>
          <p>© 2025 | Nithya All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
