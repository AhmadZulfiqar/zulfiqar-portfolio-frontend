import React from "react";
import "./Footer.css";
import portfoliologo from "../assets/ZA-Logo.PNG";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Top Grid */}
        <div className="footer-main">
          {/* Brand Info */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <img src={portfoliologo} alt="ZA Logo" className="footer-logo-img" />
              Zulfiqar <span>Ahmad</span>
            </a>
            <p className="footer-tagline">
              Bridging technical logic and creative aesthetics to build
              high-performance web applications and digital experiences.
            </p>
            <div className="footer-status">
              <span className="status-dot"></span>
              <span>Available for freelance projects & internships</span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-nav">
              <li><a href="#home">Home</a></li>
              <li><a href="#resume">Experience</a></li>
              <li><a href="#projects">Featured Projects</a></li>
              <li><a href="#about">About Me</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Social / Connect Links */}
          <div className="footer-social-col">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-pills">
              <a
                href="https://github.com/ahmadzulfiqar"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                aria-label="GitHub"
              >
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/zulfiqar-ahmad-08586b299?"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                aria-label="LinkedIn"
              >
                <i className="fa-brands fa-linkedin-in"></i>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://wa.me/923249743264"
                target="_blank"
                rel="noreferrer"
                className="social-pill"
                aria-label="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:mzulfiqarahmad@email.com"
                className="social-pill"
                aria-label="Email"
              >
                <i className="fa-regular fa-envelope"></i>
                <span>Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer-divider"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} <strong>Zulfiqar Ahmad</strong>. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="back-to-top"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}