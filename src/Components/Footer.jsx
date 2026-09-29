import React from "react";
import "./Footer.css";
import portfoliologo from "../assets/ZA-Logo.PNG";

const NAV = [
  ["#home", "Home"],
  ["#resume", "Experience"],
  ["#projects", "Projects"],
  ["#about", "About"],
  ["#contact", "Contact"],
];

const SOCIALS = [
  { icon: "fa-brands fa-github", label: "GitHub", href: "https://github.com/ahmadzulfiqar" },
  { icon: "fa-brands fa-linkedin-in", label: "LinkedIn", href: "https://www.linkedin.com/in/zulfiqar-ahmad-08586b299?" },
  { icon: "fa-brands fa-whatsapp", label: "WhatsApp", href: "https://wa.me/923249743264" },
  { icon: "fa-regular fa-envelope", label: "Email", href: "mailto:mzulfiqarahmad1122@gmail.com", internal: true },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer-glow-line" />
      <div className="footer-container">
        <p className="footer-big" aria-hidden="true">Let's create.</p>

        <div className="footer-main">
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
              <span>Available for freelance projects &amp; internships</span>
            </div>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-nav">
              {NAV.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-social-col">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-pills">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="social-pill"
                  aria-label={s.label}
                  {...(s.internal ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  <i className={s.icon}></i>
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} <strong>Zulfiqar Ahmad</strong>. All rights reserved.
          </p>
          <button onClick={scrollToTop} className="back-to-top" aria-label="Back to top">
            <span>Back to top</span>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}