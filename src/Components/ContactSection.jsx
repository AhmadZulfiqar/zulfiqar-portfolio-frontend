import React, { useState } from "react";
import "./ContactSection.css";

const INFO = [
  { icon: "fa-solid fa-phone", title: "Phone", value: "+92 324 9743264", href: "tel:+923249743264", sub: "Available 12 PM — 09 PM" },
  { icon: "fa-brands fa-whatsapp", title: "WhatsApp", value: "+92 324 9743264", href: "https://wa.me/923249743264", sub: "Instant messaging & chat", ext: true },
  { icon: "fa-brands fa-linkedin-in", title: "LinkedIn", value: "Zulfiqar Ahmad", href: "https://www.linkedin.com/in/zulfiqar-ahmad-08586b299", sub: "Professional network", ext: true },
  { icon: "fa-regular fa-envelope", title: "Email", value: "mzulfiqarahmad1122@gmail.com", href: "mailto:mzulfiqarahmad1122@gmail.com", sub: "Send a formal inquiry" },
];

const EMPTY = { name: "", email: "", company: "", message: "", verification: "" };

export default function ContactSection() {
  const [formData, setFormData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://portfolio-backend-kohl-one.vercel.app";

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.verification.trim() !== "0") {
      setStatusMsg({ type: "error", text: "Please solve the verification math problem correctly." });
      return;
    }

    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          message: formData.message,
        }),
      });
      const data = await response.json();

      if (data.success) {
        setStatusMsg({ type: "success", text: "Thank you! Your message has been sent successfully." });
        setFormData(EMPTY);
      } else {
        setStatusMsg({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (err) {
      console.error("Contact Form Error:", err);
      setStatusMsg({ type: "error", text: "Unable to connect to the email server. Try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-wrapper">
        <h2 className="contact-headline">
          Let's build <span>what's next</span>
        </h2>
        <p className="contact-subheadline">
          Share a challenge, discuss a collaboration, or plan a project together.
          I usually reply within a day.
        </p>

        <div className="contact-container">
          {/* LEFT: DETAILS */}
          <div className="contact-info-col">
            {INFO.map((item, i) => (
              <a
                key={item.title}
                href={item.href}
                className="info-card"
                style={{ "--i": i }}
                {...(item.ext ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                <div className="info-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="info-content">
                  <h4 className="info-title">{item.title}</h4>
                  <span className="info-value">{item.value}</span>
                  <span className="info-sub">{item.sub}</span>
                </div>
                <i className="fa-solid fa-arrow-up-right-from-square info-go"></i>
              </a>
            ))}
          </div>

          {/* RIGHT: FORM */}
          <form onSubmit={handleSubmit} className="contact-form-card">
            <div className="form-row">
              <div className="form-group">
                <input id="c-name" type="text" name="name" placeholder=" " required value={formData.name} onChange={handleChange} />
                <label htmlFor="c-name">Name *</label>
              </div>
              <div className="form-group">
                <input id="c-email" type="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} />
                <label htmlFor="c-email">Email *</label>
              </div>
            </div>

            <div className="form-group">
              <input id="c-company" type="text" name="company" placeholder=" " value={formData.company} onChange={handleChange} />
              <label htmlFor="c-company">Company (optional)</label>
            </div>

            <div className="form-group">
              <textarea id="c-message" name="message" rows="4" placeholder=" " required value={formData.message} onChange={handleChange}></textarea>
              <label htmlFor="c-message">Tell me about your project *</label>
            </div>

            <div className="form-group">
              <input id="c-verify" type="text" name="verification" placeholder=" " required value={formData.verification} onChange={handleChange} />
              <label htmlFor="c-verify">Human check: what is 9 − 9? *</label>
            </div>

            <div aria-live="polite">
              {statusMsg.text && (
                <div className={`status-msg ${statusMsg.type}`}>{statusMsg.text}</div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              <span>{loading ? "Sending..." : "Send message"}</span>
              <i className={`fa-solid fa-paper-plane ${loading ? "flying" : ""}`}></i>
            </button>

            <p className="form-footnote">Your message goes straight to my inbox.</p>
          </form>
        </div>
      </div>
    </section>
  );
}