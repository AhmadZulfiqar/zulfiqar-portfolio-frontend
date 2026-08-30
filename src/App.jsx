import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import ahmadPic from "./assets/ahmad.PNG";
import portfoliologo from "./assets/ZA-Logo.PNG";
import ahmadResume from "./assets/Resume.pdf";
import Lab from "./assets/LMS.PNG";
import GradingPortal from "./assets/grading portal.png";
import ExpenseTracker from "./assets/expense-tracker.png";
import WeatherApp from "./assets/weather.png";
import ContactSection from "./Components/ContactSection";
import Footer from "./Components/Footer";
import RestaurantImg from "./assets/7Guys.png";

const projectsData = [
  {
    category: "Full-Stack E-Commerce",
    title: "7 Guys Restaurant App",
    description: (
      <>
        A full-stack restaurant ordering web application featuring user
        authentication, dynamic shopping cart workflows, and automated
        order receipt dispatch via <b>Nodemailer</b>.
      </>
    ),
    tech: ["Node.js", "Express", "MongoDB", "Nodemailer", "React.js"],
    github: "https://github.com/AhmadZulfiqar/7_Guys", // Replace with your repo link
    demo: "", // Replace with your live link
    image: RestaurantImg,
  },
  {
    category: "Full-Stack System",
    title: "Lab Management System",
    description: (
      <>
        A robust MERN application created to automate lab inventory. It features{" "}
        <b>Secure Authentication</b>, <b>Real-time Stock Tracking</b>, and an
        intuitive Admin Dashboard to manage complex lab assets efficiently.
      </>
    ),
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/AhmadZulfiqar/Lab_Inventory_System",
    demo: "https://lab-inventory-system-lyart.vercel.app/lab/admin",
    image: Lab,
  },
  {
    category: "Educational Tech",
    title: "Student Grading Portal",
    description: (
      <>
        A comprehensive academic platform that automates the{" "}
        <b>grading lifecycle</b>. From data entry to <b>CGPA calculation</b>, it
        provides an efficient way for faculty to manage records while giving
        students a transparent view of their academic journey.
      </>
    ),
    tech: ["React.js", "Mongoose", "Node.js", "REST API"],
    github: "https://github.com/AhmadZulfiqar/Student-Grading-Portal",
    demo: "https://student-grading-portal.vercel.app/students",
    image: GradingPortal,
  },
  {
    category: "Finance Tool",
    title: "Smart Expense Tracker",
    description: (
      <>
        A personal finance application built to simplify <b>money management</b>
        . It features <b>Real-time Balance Tracking</b>, category-wise spending
        analysis, and persistent data storage to help users visualize their
        financial habits.
      </>
    ),
    tech: ["JavaScript", "React Hooks", "LocalStorage"],
    github: "https://github.com/AhmadZulfiqar/Daily-Expense-Tracker",
    demo: "https://daily-expense-tracker-navy.vercel.app/user",
    image: ExpenseTracker,
  },
  {
    category: "Web Application",
    title: "Weather Application",
    description: (
      <>
        A real-time weather tracking solution using the OpenWeather API. It
        features dynamic background changes based on climate conditions and a
        fully responsive UI.
      </>
    ),
    tech: ["HTML5", "CSS3", "JavaScript", "API"],
    github: "https://github.com/AhmadZulfiqar/weatherapp",
    demo: "https://skycast-weather-dev.vercel.app/",
    image: WeatherApp,
  },
];

export default function Portfolio() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Scroll Intersection Observer for animation triggers
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll(".reveal");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      ) {
        setDrawerOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="portfolio-app">
      {/* STICKY HEADER */}
      <nav>
        <a href="#home" className="logo">
          <img src={portfoliologo} className="ZA-Logo" alt="ZA Logo" />
          Zulfiqar <span>Ahmad</span>
        </a>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#resume">Experience</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
        </ul>

        <div
          className="menu"
          id="menu-toggle"
          ref={menuButtonRef}
          onClick={() => setDrawerOpen((prev) => !prev)}
        >
          <i
            className="fa-solid fa-bars"
            style={{ color: "rgb(255, 255, 255)", fontSize: "1.4rem" }}
          ></i>
        </div>

        {/* SIDE DRAWER OVERLAY */}
        <div
          className={`resp-nav ${drawerOpen ? "open" : ""}`}
          id="side-drawer"
          ref={drawerRef}
        >
          <a href="#home" onClick={closeDrawer}>
            Home
          </a>
          <a href="#resume" onClick={closeDrawer}>
            Experience
          </a>
          <a href="#projects" onClick={closeDrawer}>
            Projects
          </a>
          <a href="#contact" onClick={closeDrawer}>
            Contact
          </a>
          <a href="#about" onClick={closeDrawer}>
            About
          </a>
        </div>
      </nav>

      <div className="container">
        {/* HERO PROFILE */}
        <section id="home" className="hero">
          <div className="hero-text">
            <p className="greeting">Hi there!</p>
            <h1>
              Where Logic <br />
              Meets <span className="accent">Aesthetics.</span>
            </h1>
            <p className="hero-subtext">
              I'm <strong className="name">Zulfiqar Ahmad</strong>. A Web
              Developer &amp; Graphic Designer specializing in high-performance
              MERN stack applications with 3 years of experience.
            </p>

            <div className="hero-btns">
              <a
                href="https://github.com/ahmadzulfiqar"
                target="_blank"
                rel="noreferrer"
                className="btn btn-github"
              >
                <i className="fa-brands fa-github"></i> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/zulfiqar-ahmad-08586b299?"
                target="_blank"
                rel="noreferrer"
                className="btn-linkedin"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href={ahmadResume} download className="btn btn-cv">
                <i className="fa-solid fa-file-pdf"></i> Download CV
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-glow"></div>
            <img src={ahmadPic} alt="Zulfiqar Ahmad" />
          </div>
        </section>

        {/* EXPERIENCE TRACKER */}
        <section id="resume" className="reveal">
          <div className="resume-grid">
            <div className="resume-column">
              <h2 className="section-subtitle">
                <i className="fa-solid fa-briefcase"></i> Work{" "}
                <span>Experience</span>
              </h2>

              <div className="resume-item">
                <div className="resume-dot"></div>
                <div className="resume-content">
                  <span className="resume-date">
                    2025 — Present (Part-time)
                  </span>
                  <h4>Graphic Designer</h4>
                  <p className="resume-org">
                    Apex Group of Colleges, Gujranwala
                  </p>
                  <p className="resume-detail">
                    Leading visual communication, social media design, and brand
                    identity projects for educational marketing campaigns.
                  </p>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-dot"></div>
                <div className="resume-content">
                  <span className="resume-date">Oct 2025 — Dec 2025</span>
                  <h4>Frontend Developer (Intern)</h4>
                  <p className="resume-org">ACC Affiliate Hub</p>
                  <p className="resume-detail">
                    Developed responsive, high-performance web platforms using
                    React.js, HTML/CSS, and Tailwind CSS.
                  </p>
                </div>
              </div>
            </div>

            <div className="resume-column">
              <h2 className="section-subtitle">
                <i className="fa-solid fa-graduation-cap"></i> Academic{" "}
                <span>Journey</span>
              </h2>

              <div className="resume-item">
                <div className="resume-dot accent-dot"></div>
                <div className="resume-content">
                  <span className="resume-date">Currently Enrolled</span>
                  <h4>BS Information Technology</h4>
                  <p className="resume-org">
                    Govt. Post Graduate Islamia College, Gujranwala
                  </p>
                  <p className="resume-detail">
                    Currently in 7th Semester. Specialized focus on Artificial
                    Intelligence, Mobile App Development, and System &amp;
                    Network Administration.
                  </p>
                </div>
              </div>

              <div className="resume-item">
                <div className="resume-dot accent-dot"></div>
                <div className="resume-content">
                  <span className="resume-date">Completed 2023</span>
                  <h4>Intermediate (ICS)</h4>
                  <p className="resume-org">
                    Govt. Islamia Graduate College, Gujranwala
                  </p>
                  <p className="resume-detail">
                    Focused on Computer Science, Mathematics, and Physics
                    foundations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section id="projects">
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>

          {projectsData.map((project, idx) => (
            <div className="project-item reveal" key={idx}>
              <div className="project-desc">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-tags">
                  {project.tech.map((tag, tagIdx) => (
                    <span key={tagIdx}>{tag}</span>
                  ))}
                </div>

                <div className="project-btns">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline"
                  >
                    <i className="fa-brands fa-github"></i> Repository
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-primary"
                    >
                      <i className="fa-solid fa-eye"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="project-video-container">
                <img
                  src={project.image}
                  className="demo-video"
                  alt={`${project.title} Demo`}
                />
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT SECTION */}
        <div className="reveal">
          <ContactSection />
        </div>

        {/* ABOUT OVERVIEW */}
        <section id="about" className="reveal">
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <div className="about-card">
            <p className="about-text">
              I am a BSIT student with 3 years of experience in web development.
              My skill set bridges the gap between technical engineering <b>MERN Stack </b>
               and creative aesthetics (Graphic Design, UI
              layout) to build high-converting digital solutions.
            </p>
          </div>
        </section>
      </div>

      {/* FOOTER COMPONENT */}
      <Footer />
    </div>
  );
}