import React, { useState } from "react";
import "./ContactSection.css";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    verification: "",
  });

  // Strip trailing slashes so fetch never builds a double-slash URL (//api/contact)
  // Change this line:
  const API_BASE_URL = import.meta.env.VITE_API_URL || "https://portfolio-backend-kohl-one.vercel.app";

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verification check
    if (formData.verification.trim() !== "0") {
      setStatusMsg({
        type: "error",
        text: "Please solve the verification math problem correctly.",
      });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMsg({
          type: "success",
          text: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
          verification: "",
        });
      } else {
        setStatusMsg({
          type: "error",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      setStatusMsg({
        type: "error",
        text: "Unable to connect to the email server. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        <span className="contact-badge">CONTACT</span>
        <h2 className="contact-headline">
          Let's build <span>what's next</span>
        </h2>
        <p className="contact-subheadline">
          Share a challenge, discuss a project collaboration, or plan a
          discovery discussion.
        </p>

        <div className="contact-container">
          {/* LEFT COLUMN: CONTACT DETAILS */}
          <div className="contact-info-col">
            <div className="info-card">
              <div className="info-icon">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="info-content">
                <h4 className="info-title">Phone Number</h4>
                <a href="tel:+923249743264" className="info-value">
                  +92 324 9743264
                </a>
                <span className="info-sub">Available 12 PM — 09 PM</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-brands fa-linkedin-in"></i>
              </div>
              <div className="info-content">
                <h4 className="info-title">LinkedIn</h4>
                <a
                  href="https://www.linkedin.com/in/zulfiqar-ahmad-08586b299"
                  target="_blank"
                  rel="noreferrer"
                  className="info-value"
                >
                  Zulfiqar Ahmad
                </a>
                <span className="info-sub">Professional Network</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-brands fa-whatsapp"></i>
              </div>
              <div className="info-content">
                <h4 className="info-title">WhatsApp</h4>
                <a
                  href="https://wa.me/923249743264"
                  target="_blank"
                  rel="noreferrer"
                  className="info-value"
                >
                  +92 324 9743264
                </a>
                <span className="info-sub">Instant messaging &amp; chat</span>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <i className="fa-regular fa-envelope"></i>
              </div>
              <div className="info-content">
                <h4 className="info-title">Email</h4>
                <a
                  href="mailto:mzulfiqarahmad1122@gmail.com"
                  className="info-value"
                >
                  mzulfiqarahmad1122@gmail.com
                </a>
                <span className="info-sub">Send a formal inquiry</span>
              </div>
            </div>

            <div className="info-card quick-actions-card">
              <h4 className="quick-actions-title">Quick Actions</h4>
              <a
                href="mailto:mzulfiqarahmad1122@gmail.com"
                className="quick-btn"
              >
                <i className="fa-regular fa-envelope"></i> Send us an email
              </a>
              <a href="tel:+923249743264" className="quick-btn">
                <i className="fa-solid fa-phone"></i> Call Pakistan Office
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="contact-form-col">
            <form onSubmit={handleSubmit} className="contact-form-card">
              {statusMsg.text && (
                <div
                  style={{
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "0.88rem",
                    backgroundColor:
                      statusMsg.type === "success"
                        ? "rgba(34, 197, 94, 0.15)"
                        : "rgba(239, 68, 68, 0.15)",
                    color:
                      statusMsg.type === "success" ? "#4ade80" : "#f87171",
                    border: `1px solid ${
                      statusMsg.type === "success"
                        ? "rgba(34, 197, 94, 0.3)"
                        : "rgba(239, 68, 68, 0.3)"
                    }`,
                  }}
                >
                  {statusMsg.text}
                </div>
              )}

              <div className="form-group">
                <label>
                  Name <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="How should we call you?"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Email <span className="req">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Company</label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company name (optional)"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>
                  Message <span className="req">*</span>
                </label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us about your project, timeline, and any specific requirements..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-group">
                <label>
                  Human Verification: What is 9 - 9?{" "}
                  <span className="req">*</span>
                </label>
                <input
                  type="text"
                  name="verification"
                  placeholder="Enter your answer"
                  required
                  value={formData.verification}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Sending..." : "Send message"}{" "}
                <i className="fa-solid fa-paper-plane"></i>
              </button>

              <p className="form-footnote">
                Your message will be sent directly to our inbox via secure SMTP.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}