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
        authentication, dynamic shopping cart workflows, and automated order
        receipt dispatch via <b>Nodemailer</b>.
      </>
    ),
    tech: ["Node.js", "Express", "MongoDB", "Nodemailer", "React.js"],
    github: "https://github.com/AhmadZulfiqar/7_Guys",
    demo: "",
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
        gives faculty an efficient way to manage records and students a
        transparent view of their academic journey.
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
        analysis, and persistent data storage.
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
        A real-time weather tracker using the OpenWeather API, with dynamic
        backgrounds that change with climate conditions and a fully responsive
        UI.
      </>
    ),
    tech: ["HTML5", "CSS3", "JavaScript", "API"],
    github: "https://github.com/AhmadZulfiqar/weatherapp",
    demo: "https://skycast-weather-dev.vercel.app/",
    image: WeatherApp,
  },
];

const ROLES = ["Full-Stack Developer", "React & Next.js Developer", "Graphic Designer", ".NET Learner"];
const SKILLS = ["React.js", "Next.js", ".NET", "C#", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS", "Figma", "Photoshop", "Illustrator", "REST APIs", "JWT", "Git"];
const STATS = [
  { value: 1, suffix: "+", label: "Years experience" },
  { value: 5, suffix: "", label: "Featured projects" },
  { value: 7, suffix: "th", label: "Semester BSIT" },
];

/* Typing effect that cycles through roles */
function useTyping(words, speed = 80, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    let delay = deleting ? speed / 2 : speed;
    if (!deleting && text === word) delay = pause;

    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        return setI((n) => n + 1);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

/* Number that counts up once it scrolls into view */
function Counter({ value, suffix }) {
  const [n, setN] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / 1200, 1);
          setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* 3D tilt on hover */
function tilt(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
}
function untilt(e) {
  e.currentTarget.style.transform = "";
}

export default function Portfolio() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const progressRef = useRef(null);
  const glowRef = useRef(null);
  const role = useTyping(ROLES);

  // Reveal on scroll (staggered via CSS --d)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("active");
        }),
      { threshold: 0.08 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Scroll progress bar + sticky nav state
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${p})`;
      setScrolled(h.scrollTop > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cursor glow
  useEffect(() => {
    const move = (e) => {
      if (glowRef.current)
        glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // Close drawer on outside click
  useEffect(() => {
    const handle = (e) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(e.target) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(e.target)
      )
        setDrawerOpen(false);
    };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="portfolio-app">
      <div className="scroll-progress" ref={progressRef} />
      <div className="cursor-glow" ref={glowRef} />
      <div className="bg-blobs" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#home" className="logo">
          <img src={portfoliologo} className="ZA-Logo" alt="ZA Logo" />
          Zulfiqar <span>Ahmad</span>
        </a>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#resume">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#about">About</a></li>
        </ul>

        <div
          className={`menu ${drawerOpen ? "is-open" : ""}`}
          id="menu-toggle"
          ref={menuButtonRef}
          onClick={() => setDrawerOpen((p) => !p)}
        >
          <i
            className={`fa-solid ${drawerOpen ? "fa-xmark" : "fa-bars"}`}
            style={{ color: "#fff", fontSize: "1.4rem" }}
          ></i>
        </div>

        <div className={`resp-nav ${drawerOpen ? "open" : ""}`} id="side-drawer" ref={drawerRef}>
          <a href="#home" onClick={closeDrawer}>Home</a>
          <a href="#resume" onClick={closeDrawer}>Experience</a>
          <a href="#projects" onClick={closeDrawer}>Projects</a>
          <a href="#contact" onClick={closeDrawer}>Contact</a>
          <a href="#about" onClick={closeDrawer}>About</a>
        </div>
      </nav>

      <div className="container">
        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-text">
            <p className="greeting">
              <span className="wave">👋</span> Hi there, I'm Zulfiqar
            </p>
            <h1>
              <span className="line l1">Where Logic</span>
              <span className="line l2">Meets <span className="accent">Aesthetics.</span></span>
            </h1>
            <p className="typing">
              I'm a <span className="typed">{role}</span>
              <span className="caret" />
            </p>
            <p className="hero-subtext">
              Specializing in MERN stack applications, and currently growing my
              full-stack skills with React, Next.js and .NET as an intern at
              Bracket Mind.
            </p>

            <div className="hero-btns">
              <a href="https://github.com/ahmadzulfiqar" target="_blank" rel="noreferrer" className="btn btn-github">
                <i className="fa-brands fa-github"></i> GitHub
              </a>
              <a href="https://www.linkedin.com/in/zulfiqar-ahmad-08586b299?" target="_blank" rel="noreferrer" className="btn-linkedin" aria-label="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href={ahmadResume} download className="btn btn-cv">
                <i className="fa-solid fa-file-pdf"></i> Download CV
              </a>
            </div>
          </div>

          <div className="hero-image">
            <div className="ring r1" />
            <div className="ring r2" />
            <div className="image-glow"></div>
            <img src={ahmadPic} alt="Zulfiqar Ahmad" />
            <span className="chip c1">React</span>
            <span className="chip c2">Node.js</span>
            <span className="chip c3">Design</span>
          </div>
        </section>

        {/* STATS */}
        <section className="stats reveal">
          {STATS.map((s, i) => (
            <div className="stat" key={s.label} style={{ "--d": `${i * 120}ms` }}>
              <strong><Counter value={s.value} suffix={s.suffix} /></strong>
              <span>{s.label}</span>
            </div>
          ))}
        </section>

        {/* SKILLS MARQUEE */}
        <div className="marquee reveal" aria-hidden="true">
          <div className="marquee-track">
            {[...SKILLS, ...SKILLS].map((s, i) => (
              <span key={i}>{s}</span>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <section id="resume" className="reveal">
          <div className="resume-grid">
            <div className="resume-column">
              <h2 className="section-subtitle">
                <i className="fa-solid fa-briefcase"></i> Work <span>Experience</span>
              </h2>
              <div className="timeline">
                <div className="resume-item">
                  <div className="resume-dot"></div>
                  <div className="resume-content">
                    <span className="resume-date">Sep 2026 — Present (3-month internship)</span>
                    <h4>Full-Stack Developer (Intern)</h4>
                    <p className="resume-org">Bracket Mind</p>
                    <p className="resume-detail">
                      Building modern web interfaces with <b>React.js</b> and{" "}
                      <b>Next.js</b>, and working on backend services and APIs
                      with <b>.NET</b>, while collaborating with the team through
                      Git-based workflows and code reviews.
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
                {/* <div className="resume-item">
                  <div className="resume-dot"></div>
                  <div className="resume-content">
                    <span className="resume-date"> Apr 2025 — Aug 2026 (Part-time)</span>
                    <h4>Graphic Designer</h4>
                    <p className="resume-org">Apex Group of Colleges, Gujranwala</p>
                    <p className="resume-detail">
                      Leading visual communication, social media design, and
                      brand identity projects for educational marketing campaigns.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="resume-column">
              <h2 className="section-subtitle">
                <i className="fa-solid fa-graduation-cap"></i> Academic <span>Journey</span>
              </h2>
              <div className="timeline">
                <div className="resume-item">
                  <div className="resume-dot accent-dot"></div>
                  <div className="resume-content">
                    <span className="resume-date">Currently Enrolled</span>
                    <h4>BS Information Technology</h4>
                    <p className="resume-org">Govt. Post Graduate Islamia College, Gujranwala</p>
                    <p className="resume-detail">
                      Currently in 7th Semester. Focus on Artificial
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
                    <p className="resume-org">Govt. Islamia Graduate College, Gujranwala</p>
                    <p className="resume-detail">
                      Focused on Computer Science, Mathematics, and Physics
                      foundations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <h2 className="section-title reveal">
            Featured <span>Projects</span>
          </h2>

          {projectsData.map((project, idx) => (
            <div className={`project-item reveal ${idx % 2 ? "flip" : ""}`} key={idx}>
              <div className="project-desc">
                <span className="project-category">{project.category}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="tech-tags">
                  {project.tech.map((tag, t) => (
                    <span key={t} style={{ "--d": `${t * 70}ms` }}>{tag}</span>
                  ))}
                </div>

                <div className="project-btns">
                  <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-outline">
                    <i className="fa-brands fa-github"></i> Repository
                  </a>
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary">
                      <i className="fa-solid fa-eye"></i> Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="project-video-container" onMouseMove={tilt} onMouseLeave={untilt}>
                <img src={project.image} className="demo-video" alt={`${project.title} Demo`} />
                <span className="shine" />
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}
        <div className="reveal">
          <ContactSection />
        </div>

        {/* ABOUT */}
        <section id="about" className="reveal">
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <div className="about-card">
            <p className="about-text">
              I am a BSIT student with 1+ years of experience in web development.
              I'm currently interning at <b>Bracket Mind</b>, working with{" "}
              <b>React.js</b>, <b>Next.js</b> and <b>.NET</b>. My skill set
              bridges technical engineering (<b>MERN Stack</b>) and creative
              aesthetics (Graphic Design, UI layout) to build high-converting
              digital solutions.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}