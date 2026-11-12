
import { useEffect, useState } from "react";
import ProjectManager from "./ProjectManager";
import ResumeManager from "./ResumeManager";
import MessageManager from "./MessageManager";
import SkillManager from "./SkillManager";
import ProfileManager from "./ProfileManager";
import AnalyticsDashboard from "./AnalyticsDashboard";

import {
  FaArrowRight,
  FaBars,
  FaBell,
  FaBolt,
  FaChartLine,
  FaCheckCircle,
  FaChevronRight,
  FaCode,
  FaCog,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFileAlt,
  FaFolderOpen,
  FaGithub,
  FaGlobe,
  FaHome,
  FaLock,
  FaPalette,
  FaRocket,
  FaShieldAlt,
  FaSignOutAlt,
  FaTerminal,
  FaTimes,
  FaUser,
  FaUserShield,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

// ==========================================
// PROJECT DATA
// ==========================================

const projects = [
  {
    id: "01",
    name: "Vault",
    category: "Distributed Storage",
    stack: "Go / Docker",
    color: "cyan",
    description:
      "Distributed object storage system focused on data integrity and fault recovery."
  },
  {
    id: "02",
    name: "Paw-Mart",
    category: "Pet E-Commerce",
    stack: "MERN Stack",
    color: "purple",
    description:
      "A full-stack pet marketplace with authentication and MongoDB integration."
  },
  {
    id: "03",
    name: "Health Predict",
    category: "Health Technology",
    stack: "React / ML",
    color: "green",
    description:
      "A health prediction platform designed to provide data-driven health insights."
  },
  {
    id: "04",
    name: "Dynamic Gift Store",
    category: "E-Commerce",
    stack: "MERN Stack",
    color: "orange",
    description:
      "A responsive shopping platform with product browsing and authentication."
  }
];

const skills = [
  { name: "React.js", type: "Frontend", level: "Core" },
  { name: "JavaScript", type: "Language", level: "Core" },
  { name: "Node.js", type: "Backend", level: "Core" },
  { name: "Express.js", type: "Backend", level: "Core" },
  { name: "MongoDB", type: "Database", level: "Core" },
  { name: "HTML5", type: "Frontend", level: "Core" },
  { name: "CSS3", type: "Frontend", level: "Core" },
  { name: "Tailwind CSS", type: "UI", level: "Learning" },
  { name: "FastAPI", type: "Backend", level: "Learning" },
  { name: "Docker", type: "DevOps", level: "Learning" },
  { name: "Go", type: "Language", level: "Learning" }
];

// ==========================================
// NAVIGATION DATA
// ==========================================

const navigation = [
  {
    id: "overview",
    label: "Overview",
    icon: <FaHome />
  },
  {
    id: "projects",
    label: "Projects",
    icon: <FaFolderOpen />,
    count: "04"
  },
  {
    id: "messages",
    label: "Messages",
    icon: <FaEnvelope />
  },
  {
    id: "skills",
    label: "Skills",
    icon: <FaCode />
  },
  {
    id: "resume",
    label: "Resume",
    icon: <FaFileAlt />
  },
  {
    id: "profile",
    label: "Profile",
    icon: <FaUser />
  }
];

// ==========================================
// SMALL COMPONENTS
// ==========================================

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="ad-section-heading">
      <div>
        <div className="ad-eyebrow">{eyebrow}</div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, detail, color }) {
  return (
    <div className={`ad-metric-card ${color}`}>
      <div className="ad-metric-top">
        <div className="ad-metric-icon">{icon}</div>
        <span className="ad-metric-indicator">
          <i />
          LIVE
        </span>
      </div>

      <div className="ad-metric-value">{value}</div>
      <div className="ad-metric-label">{label}</div>
      <div className="ad-metric-detail">{detail}</div>
    </div>
  );
}

function EmptyState({ icon, title, description }) {
  return (
    <div className="ad-empty-state">
      <div className="ad-empty-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="ad-coming-soon">INTEGRATION PENDING</span>
    </div>
  );
}

// ==========================================
// ADMIN DASHBOARD
// ==========================================

export default function AdminDashboard() {
  // Authentication
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [logoutLoading, setLogoutLoading] = useState(false);

  // Dashboard
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projectSearch, setProjectSearch] = useState("");

  // ==========================================
  // CHECK EXISTING ADMIN SESSION
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        const response = await fetch(
          `${API_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const result = await response.json().catch(() => ({}));

        if (!cancelled && response.ok) {
          setAdmin(result.admin || result.user || result);
        }
      } catch (error) {
        console.error("Session check failed:", error);
      } finally {
        if (!cancelled) {
          setCheckingSession(false);
        }
      }
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // ==========================================
  // ADMIN LOGIN
  // ==========================================

  async function handleLogin(event) {
    event.preventDefault();

    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          credentials: "include",

          body: JSON.stringify({
            email: email.trim(),
            password
          })
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message || "Invalid email or password."
        );
      }

      // Confirm the new authenticated session.
      const sessionResponse = await fetch(
        `${API_URL}/api/auth/me`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      const sessionResult = await sessionResponse.json().catch(() => ({}));

      if (!sessionResponse.ok) {
        throw new Error(
          "Login succeeded, but the admin session could not be verified."
        );
      }

      setAdmin(
        sessionResult.admin ||
        sessionResult.user ||
        result.admin ||
        { email: email.trim(), role: "admin" }
      );

      setPassword("");
      setLoginError("");
    } catch (error) {
      setLoginError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoginLoading(false);
    }
  }

  // ==========================================
  // ADMIN LOGOUT
  // ==========================================

  async function handleLogout() {
    setLogoutLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include"
        }
      );

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

      setAdmin(null);
      setEmail("");
      setPassword("");
      setActiveTab("overview");
    } catch (error) {
      console.error("Logout error:", error);
      alert(error.message || "Unable to log out.");
    } finally {
      setLogoutLoading(false);
    }
  }

  // ==========================================
  // SESSION LOADING SCREEN
  // ==========================================

  if (checkingSession) {
    return (
      <>
        <style>{adminStyles}</style>

        <div className="ad-loading-screen">
          <div className="ad-loader-orbit">
            <div />
            <div />
            <div />
            <span>DG</span>
          </div>

          <h2>INITIALIZING CONTROL CENTER</h2>

          <p>VERIFYING SECURE ADMIN SESSION...</p>

          <div className="ad-loading-line">
            <span />
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // LOGIN SCREEN
  // ==========================================

  if (!admin) {
    return (
      <>
        <style>{adminStyles}</style>

        <div className="ad-login-screen">
          <div className="ad-login-grid" />
          <div className="ad-login-glow ad-glow-one" />
          <div className="ad-login-glow ad-glow-two" />

          <div className="ad-login-layout">

            {/* LEFT SIDE */}

            <div className="ad-login-left">

              <div className="ad-brand">
                <div className="ad-brand-symbol">
                  DG<span>.</span>
                </div>

                <div>
                  <strong>DHEERAJ</strong>
                  <small>DEVELOPER CONTROL CENTER</small>
                </div>
              </div>

              <div className="ad-login-hero">

                <div className="ad-login-overline">
                  <span />
                  PRIVATE ACCESS TERMINAL
                </div>

                <h1>
                  YOUR WORKSPACE.
                  <br />
                  <span>YOUR CONTROL.</span>
                </h1>

                <p>
                  A centralized environment to monitor and
                  manage your developer portfolio.
                </p>

                <div className="ad-login-orb">
                  <div className="ad-orb-ring ring-one" />
                  <div className="ad-orb-ring ring-two" />
                  <div className="ad-orb-ring ring-three" />

                  <div className="ad-orb-center">
                    <FaTerminal />
                  </div>

                  <span className="ad-orb-tag tag-one">
                    SYSTEM
                  </span>

                  <span className="ad-orb-tag tag-two">
                    SECURE
                  </span>

                  <span className="ad-orb-tag tag-three">
                    ADMIN.OS
                  </span>
                </div>

                <div className="ad-login-bottom-info">
                  <div>
                    <FaShieldAlt />
                    <span>PROTECTED ADMIN ACCESS</span>
                  </div>

                  <div>
                    <FaBolt />
                    <span>DEVELOPER COMMAND CENTER</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE LOGIN */}

            <div className="ad-login-right">

              <form
                className="ad-login-card"
                onSubmit={handleLogin}
              >
                <div className="ad-login-card-top">
                  <div className="ad-login-lock">
                    <FaUserShield />
                  </div>

                  <span className="ad-secure-label">
                    <i />
                    SECURE CONNECTION
                  </span>
                </div>

                <div className="ad-login-heading">
                  <span>WELCOME BACK</span>

                  <h2>
                    Admin <strong>Access.</strong>
                  </h2>

                  <p>
                    Authenticate yourself to enter your dashboard.
                  </p>
                </div>

                <div className="ad-form-group">
                  <label htmlFor="admin-email">
                    EMAIL ADDRESS
                  </label>

                  <div className="ad-input-wrap">
                    <FaUser />

                    <input
                      id="admin-email"
                      type="email"
                      placeholder="Enter admin email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="ad-form-group">
                  <label htmlFor="admin-password">
                    PASSWORD
                  </label>

                  <div className="ad-input-wrap">
                    <FaLock />

                    <input
                      id="admin-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      className="ad-password-toggle"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {loginError && (
                  <div className="ad-login-error" role="alert">
                    <FaShieldAlt />
                    {loginError}
                  </div>
                )}

                <button
                  type="submit"
                  className="ad-login-button"
                  disabled={loginLoading}
                >
                  {loginLoading ? (
                    <>
                      <span className="ad-button-spinner" />
                      VERIFYING ACCESS...
                    </>
                  ) : (
                    <>
                      ENTER DASHBOARD
                      <FaArrowRight />
                    </>
                  )}
                </button>

                <div className="ad-login-secure-note">
                  <FaLock />
                  Your session is protected by secure authentication.
                </div>
              </form>

              <div className="ad-login-footer">
                <span>© 2026 DHEERAJ GOLLA</span>
                <span>ADMIN.OS / V1.0</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ==========================================
  // DASHBOARD CONTENT
  // ==========================================

  const activeNavigation = navigation.find(
    (item) => item.id === activeTab
  );

  const adminEmail =
    admin.email || admin.admin?.email || "Administrator";

  const pageTitles = {
    overview: {
      title: "Command Center",
      description: "Your portfolio at a glance."
    },
    projects: {
      title: "Project Explorer",
      description: "Explore your development portfolio."
    },
    messages: {
      title: "Communication Hub",
      description: "Manage contact messages and conversations."
    },
    skills: {
      title: "Technology Matrix",
      description: "Your development skills and technology stack."
    },
    resume: {
      title: "Resume Manager",
      description: "Manage your professional documents."
    },
    profile: {
      title: "Admin Identity",
      description: "Your administrator account and security."
    }
  };

  const page = pageTitles[activeTab] || pageTitles.overview;

  const filteredProjects = projects.filter((project) =>
    `${project.name} ${project.category} ${project.stack}`
      .toLowerCase()
      .includes(projectSearch.toLowerCase())
  );

  function changePage(id) {
    setActiveTab(id);
    setSidebarOpen(false);
    setProjectSearch("");
  }

  // ==========================================
  // OVERVIEW PAGE
  // ==========================================

  function renderOverview() {
    return (
      <div className="ad-page-content">

        {/* HERO PANEL */}

        <section className="ad-welcome-panel">
          <div className="ad-welcome-content">
            <div className="ad-welcome-tag">
              <FaBolt />
              SYSTEM OPERATIONAL
            </div>

            <h2>
              Welcome to your
              <br />
              <span>digital universe.</span>
            </h2>

            <p>
              Your development workspace is ready.
              Monitor your projects, technologies and portfolio
              from one central location.
            </p>

            <button
              className="ad-welcome-button"
              onClick={() => changePage("projects")}
            >
              EXPLORE PROJECTS
              <FaArrowRight />
            </button>
          </div>

          <div className="ad-welcome-visual">
            <div className="ad-welcome-circle circle-a" />
            <div className="ad-welcome-circle circle-b" />
            <div className="ad-welcome-circle circle-c" />

            <div className="ad-welcome-core">
              <span>DG</span>
              <small>CONTROL</small>
            </div>

            <div className="ad-floating-label label-a">
              <FaDatabase />
              MERN
            </div>

            <div className="ad-floating-label label-b">
              <FaCode />
              BUILD
            </div>

            <div className="ad-floating-label label-c">
              <FaRocket />
              DEPLOY
            </div>
          </div>
        </section>

        {/* METRICS */}

        <div className="ad-section-heading">
          <div>
            <div className="ad-eyebrow">
              LIVE WORKSPACE
            </div>

            <h2>Overview analytics</h2>
          </div>

          <span className="ad-data-note">
            PORTFOLIO CONFIGURATION
          </span>
        </div>

        <div className="ad-metrics-grid">
          <MetricCard
            icon={<FaFolderOpen />}
            label="SHOWCASED PROJECTS"
            value="04"
            detail="Projects listed in portfolio"
            color="cyan"
          />

          <MetricCard
            icon={<FaCode />}
            label="TECHNOLOGIES"
            value="11"
            detail="Technologies in skill list"
            color="purple"
          />

          <MetricCard
            icon={<FaShieldAlt />}
            label="ADMIN SECURITY"
            value="ON"
            detail="Authenticated session verified"
            color="green"
          />

          <MetricCard
            icon={<FaGlobe />}
            label="PORTFOLIO"
            value="LIVE"
            detail="Open your public website"
            color="orange"
          />
        </div>

        {/* LOWER GRID */}

        <div className="ad-overview-grid">

          {/* PROJECTS */}

          <section className="ad-panel ad-project-panel">
            <div className="ad-panel-heading">
              <div>
                <span className="ad-eyebrow">YOUR CREATIONS</span>
                <h3>Featured projects</h3>
              </div>

              <button
                className="ad-text-button"
                onClick={() => changePage("projects")}
              >
                VIEW ALL <FaArrowRight />
              </button>
            </div>

            <div className="ad-mini-projects">
              {projects.slice(0, 3).map((project) => (
                <div
                  className="ad-mini-project"
                  key={project.id}
                >
                  <div className={`ad-project-symbol ${project.color}`}>
                    <FaCode />
                  </div>

                  <div className="ad-mini-project-info">
                    <strong>{project.name}</strong>
                    <span>{project.category}</span>
                  </div>

                  <div className="ad-mini-project-number">
                    {project.id}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* QUICK ACCESS */}

          <section className="ad-panel ad-quick-panel">
            <div className="ad-panel-heading">
              <div>
                <span className="ad-eyebrow">QUICK ACCESS</span>
                <h3>Launchpad</h3>
              </div>

              <FaBolt className="ad-panel-heading-icon" />
            </div>

            <a
              className="ad-quick-link"
              href="/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="ad-quick-icon cyan">
                <FaGlobe />
              </div>

              <div>
                <strong>Public Portfolio</strong>
                <span>View website</span>
              </div>

              <FaExternalLinkAlt />
            </a>

            <a
              className="ad-quick-link"
              href="https://github.com/DHEERAJ565"
              target="_blank"
              rel="noreferrer"
            >
              <div className="ad-quick-icon purple">
                <FaGithub />
              </div>

              <div>
                <strong>GitHub Repository</strong>
                <span>Explore source code</span>
              </div>

              <FaExternalLinkAlt />
            </a>

            <button
              className="ad-quick-link"
              onClick={() => changePage("skills")}
            >
              <div className="ad-quick-icon green">
                <FaCode />
              </div>

              <div>
                <strong>Technology Matrix</strong>
                <span>Explore skills</span>
              </div>

              <FaChevronRight />
            </button>
          </section>
        </div>

        {/* SYSTEM FOOTER */}

        <div className="ad-system-strip">
          <div className="ad-system-left">
            <span className="ad-system-dot" />
            <strong>ADMIN SESSION VERIFIED</strong>
            <span className="ad-system-divider">/</span>
            <span>AUTHENTICATED ACCESS</span>
          </div>

          <div className="ad-system-right">
            <FaShieldAlt />
            SECURE WORKSPACE
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROJECTS PAGE
  // ==========================================

  function renderProjects() {
    return (
      <div className="ad-page-content">
        <div className="ad-page-toolbar">
          <div>
            <span className="ad-eyebrow">PROJECT DATABASE</span>
            <h3>{projects.length} showcased projects</h3>
          </div>

          <div className="ad-project-search">
            <FaFolderOpen />

            <input
              type="text"
              placeholder="Search projects..."
              value={projectSearch}
              onChange={(event) => setProjectSearch(event.target.value)}
            />
          </div>
        </div>

        <div className="ad-project-grid">
          {filteredProjects.map((project) => (
            <div className="ad-large-project-card" key={project.id}>
              <div className={`ad-project-card-top ${project.color}`}>
                <span>PROJECT / {project.id}</span>
                <FaCode />
              </div>

              <div className="ad-large-project-body">
                <div className="ad-project-category">
                  {project.category}
                </div>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

                <div className="ad-project-stack">
                  {project.stack}
                </div>

                <div className="ad-project-bottom">
                  <span>
                    <i />
                    LISTED IN PORTFOLIO
                  </span>

                  <FaChevronRight />
                </div>
              </div>
            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="ad-no-results">
              No matching projects found.
            </div>
          )}
        </div>

        <div className="ad-notice-panel">
          <FaShieldAlt />

          <div>
            <strong>Project editor is not connected yet.</strong>
            <p>
              These project cards currently display information from
              your portfolio configuration. MongoDB-based project
              creation, editing and deletion still need to be implemented.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // MESSAGES PAGE
  // ==========================================

  function renderMessages() {
    return (
      <div className="ad-page-content">
        <div className="ad-messages-banner">
          <div className="ad-message-orb">
            <FaEnvelope />
          </div>

          <div>
            <span className="ad-eyebrow">COMMUNICATION CENTER</span>
            <h2>Your inbox, reimagined.</h2>
            <p>
              A dedicated space for visitors, opportunities and collaboration.
            </p>
          </div>
        </div>

        <div className="ad-panel ad-message-info">
          <EmptyState
            icon={<FaEnvelope />}
            title="Inbox integration pending"
            description="Your existing contact form sends messages through email. Messages are not currently saved in a database or displayed in this dashboard."
          />
        </div>

        <div className="ad-notice-panel">
          <FaDatabase />

          <div>
            <strong>Next integration: MongoDB messages.</strong>
            <p>
              A message management API and database collection
              are required before messages can appear here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SKILLS PAGE
  // ==========================================

  function renderSkills() {
    return (
      <div className="ad-page-content">
        <div className="ad-skills-banner">
          <div>
            <span className="ad-eyebrow">DEVELOPER CAPABILITIES</span>
            <h2>Technology Matrix</h2>
            <p>
              The tools and technologies listed in your portfolio.
            </p>
          </div>

          <div className="ad-skills-total">
            <strong>11</strong>
            <span>TECHNOLOGIES</span>
          </div>
        </div>

        <div className="ad-skills-grid">
          {skills.map((skill, index) => (
            <div className="ad-skill-card" key={skill.name}>
              <div className="ad-skill-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="ad-skill-icon">
                <FaCode />
              </div>

              <h3>{skill.name}</h3>

              <span className="ad-skill-type">
                {skill.type}
              </span>

              <div className="ad-skill-bottom">
                <span>{skill.level}</span>
                <i />
              </div>
            </div>
          ))}
        </div>

        <div className="ad-notice-panel">
          <FaPalette />

          <div>
            <strong>Skills currently use portfolio configuration.</strong>
            <p>
              Editing and saving skills from this dashboard
              requires a skills management API.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RESUME PAGE
  // ==========================================

  function renderResume() {
    return (
      <div className="ad-page-content">
        <div className="ad-panel ad-resume-panel">
          <div className="ad-resume-visual">
            <div className="ad-resume-document">
              <FaFileAlt />
              <span>DHEERAJ GOLLA</span>
              <i />
              <i />
              <i />
              <i />
            </div>

            <div className="ad-resume-glow" />
          </div>

          <div className="ad-resume-text">
            <span className="ad-eyebrow">CAREER DOCUMENTS</span>

            <h2>
              Resume <span>Manager.</span>
            </h2>

            <p>
              Your resume management area is ready for a future
              document upload and download integration.
            </p>

            <div className="ad-resume-status">
              <FaLock />
              RESUME STORAGE NOT CONNECTED
            </div>
          </div>
        </div>

        <div className="ad-notice-panel">
          <FaDatabase />

          <div>
            <strong>Resume upload is not implemented yet.</strong>
            <p>
              A secure file storage solution and backend endpoint
              are needed to upload and manage resume documents.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  function renderProfile() {
    return (
      <div className="ad-page-content">
        <div className="ad-profile-layout">
          <section className="ad-panel ad-profile-card">
            <div className="ad-profile-cover">
              <div className="ad-profile-cover-grid" />
            </div>

            <div className="ad-profile-avatar">
              DG
            </div>

            <div className="ad-profile-content">
              <span className="ad-eyebrow">
                AUTHENTICATED ADMIN
              </span>

              <h2>DHEERAJ GOLLA</h2>

              <p>MERN STACK DEVELOPER</p>

              <div className="ad-profile-email">
                <FaEnvelope />
                {adminEmail}
              </div>

              <div className="ad-profile-role">
                <FaUserShield />
                ADMINISTRATOR
              </div>
            </div>
          </section>

          <section className="ad-panel ad-security-card">
            <div className="ad-panel-heading">
              <div>
                <span className="ad-eyebrow">ACCOUNT PROTECTION</span>
                <h3>Security status</h3>
              </div>

              <FaShieldAlt className="ad-panel-heading-icon" />
            </div>

            <div className="ad-security-item">
              <div className="ad-security-icon">
                <FaLock />
              </div>

              <div>
                <strong>Authentication</strong>
                <span>Session verified</span>
              </div>

              <FaCheckCircle className="ad-security-check" />
            </div>

            <div className="ad-security-item">
              <div className="ad-security-icon">
                <FaShieldAlt />
              </div>

              <div>
                <strong>Admin permissions</strong>
                <span>Administrator role</span>
              </div>

              <FaCheckCircle className="ad-security-check" />
            </div>

            <div className="ad-security-item">
              <div className="ad-security-icon">
                <FaDatabase />
              </div>

              <div>
                <strong>Database</strong>
                <span>MongoDB configured</span>
              </div>

              <FaCheckCircle className="ad-security-check" />
            </div>
          </section>
        </div>

        <div className="ad-notice-panel">
          <FaCog />

          <div>
            <strong>Account settings</strong>
            <p>
              Your current administrator identity is displayed above.
              Additional profile editing and password management
              features have not been implemented.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // SELECT PAGE CONTENT
  // ==========================================

  function renderPageContent() {
    switch (activeTab) {

     case "projects":
  return <ProjectManager />;

      case "messages":
  return <MessageManager />;

     case "skills":
  return <SkillManager />;

     case "resume":
  return <ResumeManager />;

     case "profile":
  return <ProfileManager />;
   
      default:
      return <AnalyticsDashboard />;
    }
  }

  // ==========================================
  // MAIN DASHBOARD UI
  // ==========================================

  return (
    <>
      <style>{adminStyles}</style>

      <div className="ad-dashboard">

        {/* HOLOGRAPHIC BACKGROUND */}

<div className="ad-hologram-background" aria-hidden="true">
  <div className="ad-holo-orb ad-holo-orb-one">
    <span />
  </div>

  <div className="ad-holo-orb ad-holo-orb-two">
    <span />
  </div>

  <div className="ad-holo-orb ad-holo-orb-three">
    <span />
  </div>

  <div className="ad-holo-beam ad-holo-beam-one" />
  <div className="ad-holo-beam ad-holo-beam-two" />

  <div className="ad-holo-particles" />
  <div className="ad-holo-scanline" />
</div>

        {/* MOBILE OVERLAY */}

        {sidebarOpen && (
          <div
            className="ad-mobile-overlay"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* SIDEBAR */}

        <aside className={`ad-sidebar ${sidebarOpen ? "open" : ""}`}>

          <div className="ad-sidebar-brand">
            <div className="ad-brand-symbol">
              DG<span>.</span>
            </div>

            <div>
              <strong>DHEERAJ</strong>
              <small>CONTROL CENTER</small>
            </div>

            <button
              className="ad-mobile-close"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close navigation"
            >
              <FaTimes />
            </button>
          </div>

          <div className="ad-sidebar-section-label">
            WORKSPACE
          </div>

          <nav className="ad-sidebar-nav">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => changePage(item.id)}
                className={`ad-nav-item ${
                  activeTab === item.id ? "active" : ""
                }`}
              >
                <span className="ad-nav-icon">
                  {item.icon}
                </span>

                <span>{item.label}</span>

                {item.count && (
                  <span className="ad-nav-count">
                    {item.count}
                  </span>
                )}

                {activeTab === item.id && (
                  <span className="ad-nav-active-mark" />
                )}
              </button>
            ))}
          </nav>

          <div className="ad-sidebar-spacer" />

          {/* SIDEBAR STATUS */}

          <div className="ad-sidebar-status">
            <div className="ad-sidebar-status-icon">
              <FaShieldAlt />
            </div>

            <div>
              <strong>SECURE SESSION</strong>
              <span>
                <i />
                AUTHENTICATED
              </span>
            </div>
          </div>

          <div className="ad-sidebar-bottom">
            <button
              className="ad-logout-button"
              onClick={handleLogout}
              disabled={logoutLoading}
            >
              <FaSignOutAlt />

              {logoutLoading ? "SIGNING OUT..." : "SIGN OUT"}

              <FaArrowRight className="ad-logout-arrow" />
            </button>

            <div className="ad-sidebar-version">
              ADMIN.OS <span>V1.0.0</span>
            </div>
          </div>
        </aside>

        {/* MAIN AREA */}

        <main className="ad-main">

          {/* TOP NAVBAR */}

          <header className="ad-topbar">
            <div className="ad-topbar-left">
              <button
                className="ad-mobile-menu"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <FaBars />
              </button>

              <div className="ad-breadcrumb">
                <span>WORKSPACE</span>

                <FaChevronRight />

                <strong>
                  {activeNavigation?.label || "Overview"}
                </strong>
              </div>
            </div>

            <div className="ad-topbar-right">
              <div className="ad-topbar-status">
                <i />
                ALL SYSTEMS READY
              </div>

              <button
                className="ad-topbar-icon"
                title="Notifications"
                aria-label="Notifications"
              >
                <FaBell />
                <span />
              </button>

              <a
                className="ad-view-site"
                href="/"
                target="_blank"
                rel="noreferrer"
              >
                VIEW SITE
                <FaExternalLinkAlt />
              </a>

              <button
                className="ad-topbar-avatar"
                onClick={() => changePage("profile")}
                title="Admin profile"
              >
                DG
              </button>
            </div>
          </header>

          {/* PAGE HEADER */}

          <div className="ad-page-header">
            <div>
              <div className="ad-page-overline">
                <span />
                ADMINISTRATOR / {activeTab.toUpperCase()}
              </div>

              <h1>{page.title}</h1>

              <p>{page.description}</p>
            </div>

            <div className="ad-page-header-right">
              <div className="ad-time-badge">
                <FaShieldAlt />
                PRIVATE WORKSPACE
              </div>
            </div>
          </div>

          {/* CONTENT */}

          <div className="ad-content-wrapper">
            {renderPageContent()}
          </div>

          {/* FOOTER */}

          <footer className="ad-footer">
            <div>
              <strong>DHEERAJ GOLLA</strong>
              <span> / ADMIN CONTROL CENTER</span>
            </div>

            <div>
              DESIGNED FOR BUILDING THE FUTURE
              <span className="ad-footer-dot">●</span>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}

// ==========================================
// ADVANCED ADMIN DASHBOARD CSS
// ==========================================

const adminStyles = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700;800;900&display=swap');

.ad-dashboard,
.ad-login-screen,
.ad-loading-screen {
  --ad-bg: #070912;
  --ad-panel: #0d1220;
  --ad-panel-light: #121a2b;
  --ad-cyan: #56e5f2;
  --ad-purple: #a78bfa;
  --ad-green: #5ee6a8;
  --ad-muted: #8290a9;
  --ad-border: rgba(148, 163, 184, 0.13);

  font-family: 'Inter', sans-serif;
  color: #f4f7ff;
}

.ad-dashboard *,
.ad-login-screen *,
.ad-loading-screen * {
  box-sizing: border-box;
}

.ad-dashboard {
  min-height: 100vh;
  display: flex;
  background:
    radial-gradient(ellipse at 78% 0%, rgba(91, 59, 167, 0.12), transparent 36%),
    radial-gradient(ellipse at 0% 100%, rgba(20, 184, 166, 0.07), transparent 35%),
    var(--ad-bg);
  overflow: hidden;
  position: relative;
}

.ad-dashboard button,
.ad-login-screen button {
  font-family: inherit;
}

/* ======================================
   LOADING SCREEN
====================================== */

.ad-loading-screen {
  background: #070912;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.ad-loading-screen h2 {
  font-size: 13px;
  letter-spacing: 0.22em;
  margin: 20px 0 0;
}

.ad-loading-screen p {
  font: 10px 'DM Mono', monospace;
  color: #8594ad;
  letter-spacing: 0.13em;
}

.ad-loader-orbit {
  width: 100px;
  height: 100px;
  position: relative;
  display: grid;
  place-items: center;
}

.ad-loader-orbit div {
  position: absolute;
  inset: 0;
  border: 1px solid rgba(86, 229, 242, 0.5);
  border-radius: 50%;
  animation: ad-spin 4s linear infinite;
}

.ad-loader-orbit div:nth-child(2) {
  inset: 10px -10px;
  border-color: rgba(167, 139, 250, 0.6);
  animation-direction: reverse;
}

.ad-loader-orbit div:nth-child(3) {
  inset: 20px;
  border-style: dashed;
  animation-duration: 8s;
}

.ad-loader-orbit span {
  font-size: 22px;
  color: var(--ad-cyan);
  font-weight: 900;
}

.ad-loading-line {
  width: 180px;
  height: 2px;
  background: #1b263a;
  overflow: hidden;
  margin-top: 12px;
}

.ad-loading-line span {
  display: block;
  height: 100%;
  width: 50%;
  background: var(--ad-cyan);
  animation: ad-loading 1.4s ease-in-out infinite;
}

@keyframes ad-loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(220%); }
}

/* ======================================
   LOGIN SCREEN
====================================== */

.ad-login-screen {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #070912;
  padding: 40px;
}

.ad-login-grid {
  position: absolute;
  inset: 0;
  opacity: 0.20;
  background-image:
    linear-gradient(rgba(110, 140, 190, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(110, 140, 190, 0.08) 1px, transparent 1px);
  background-size: 55px 55px;
  mask-image: linear-gradient(to bottom, black, transparent 90%);
}

.ad-login-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.12;
  pointer-events: none;
}

.ad-glow-one {
  background: #087f94;
  left: -150px;
  top: -150px;
}

.ad-glow-two {
  background: #6941c6;
  right: -100px;
  bottom: -180px;
}

.ad-login-layout {
  width: 100%;
  max-width: 1250px;
  min-height: 670px;
  display: grid;
  grid-template-columns: 1fr 0.86fr;
  align-items: center;
  position: relative;
  z-index: 2;
  border: 1px solid rgba(148, 163, 184, 0.12);
  background: rgba(12, 17, 30, 0.75);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 35px 100px rgba(0, 0, 0, 0.45);
}

.ad-login-left {
  padding: 50px 55px;
  min-height: 670px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  border-right: 1px solid var(--ad-border);
  overflow: hidden;
}

.ad-brand,
.ad-sidebar-brand {
  display: flex;
  align-items: center;
  gap: 13px;
}

.ad-brand-symbol {
  font-size: 25px;
  font-weight: 900;
  letter-spacing: -2px;
  color: #fff;
}

.ad-brand-symbol span {
  color: var(--ad-cyan);
}

.ad-brand strong,
.ad-sidebar-brand strong {
  display: block;
  font-size: 13px;
  letter-spacing: 0.15em;
}

.ad-brand small,
.ad-sidebar-brand small {
  display: block;
  margin-top: 5px;
  color: #71819a;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.08em;
}

.ad-login-hero {
  position: relative;
  margin-top: 20px;
}

.ad-login-overline,
.ad-page-overline {
  color: var(--ad-cyan);
  font: 10px 'DM Mono', monospace;
  letter-spacing: 0.14em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ad-login-overline span,
.ad-page-overline span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--ad-green);
  box-shadow: 0 0 15px var(--ad-green);
}

.ad-login-hero h1 {
  font-size: clamp(34px, 4vw, 57px);
  line-height: 1.12;
  letter-spacing: -0.055em;
  margin: 24px 0 16px;
  font-weight: 900;
}

.ad-login-hero h1 span {
  background: linear-gradient(100deg, #56e5f2, #a78bfa);
  color: transparent;
  background-clip: text;
}

.ad-login-hero > p {
  max-width: 420px;
  line-height: 1.8;
  color: #9aa8bd;
  font-size: 13px;
}

.ad-login-orb {
  height: 240px;
  width: 240px;
  position: relative;
  margin: 25px auto 10px;
  display: grid;
  place-items: center;
}

.ad-orb-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(86, 229, 242, 0.35);
  inset: 0;
  animation: ad-spin 20s linear infinite;
}

.ad-orb-ring::before {
  content: '';
  width: 9px;
  height: 9px;
  background: var(--ad-cyan);
  border-radius: 50%;
  position: absolute;
  left: 22%;
  top: 5%;
  box-shadow: 0 0 18px var(--ad-cyan);
}

.ad-orb-ring.ring-two {
  inset: 20px -15px;
  border-color: rgba(167, 139, 250, 0.5);
  transform: rotateX(65deg);
  animation-duration: 12s;
  animation-direction: reverse;
}

.ad-orb-ring.ring-three {
  inset: 30px;
  border-style: dashed;
  border-color: rgba(94, 230, 168, 0.4);
  animation-duration: 30s;
}

.ad-orb-center {
  width: 100px;
  height: 100px;
  border: 1px solid rgba(86, 229, 242, 0.6);
  border-radius: 28px;
  background: linear-gradient(145deg, #142b40, #17132e);
  color: var(--ad-cyan);
  display: grid;
  place-items: center;
  font-size: 35px;
  box-shadow: 0 0 45px rgba(86, 229, 242, 0.16);
  transform: rotate(-8deg);
}

.ad-orb-tag {
  position: absolute;
  background: #121d30;
  border: 1px solid var(--ad-border);
  padding: 6px 10px;
  border-radius: 5px;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  color: #b8c7de;
}

.tag-one { top: 5%; right: -8%; }
.tag-two { bottom: 10%; left: -10%; }
.tag-three { bottom: -2%; right: 18%; }

.ad-login-bottom-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: #7f8da4;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
}

.ad-login-bottom-info div {
  display: flex;
  gap: 8px;
  align-items: center;
}

.ad-login-bottom-info svg {
  color: var(--ad-cyan);
  font-size: 13px;
}

.ad-login-right {
  padding: 55px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 670px;
}

.ad-login-card {
  width: 100%;
  max-width: 410px;
  margin: auto;
}

.ad-login-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;
}

.ad-login-lock {
  width: 51px;
  height: 51px;
  border-radius: 15px;
  background: linear-gradient(145deg, rgba(86,229,242,0.17), rgba(167,139,250,0.14));
  border: 1px solid rgba(86, 229, 242, 0.25);
  display: grid;
  place-items: center;
  font-size: 20px;
  color: var(--ad-cyan);
}

.ad-secure-label {
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
  color: #91a4be;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ad-secure-label i {
  background: var(--ad-green);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  box-shadow: 0 0 12px var(--ad-green);
}

.ad-login-heading > span {
  color: var(--ad-cyan);
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.16em;
}

.ad-login-heading h2 {
  font-size: 34px;
  letter-spacing: -0.05em;
  margin: 11px 0;
}

.ad-login-heading h2 strong {
  color: var(--ad-cyan);
}

.ad-login-heading p {
  color: #8594aa;
  font-size: 12px;
  line-height: 1.7;
  margin-bottom: 34px;
}

.ad-form-group {
  margin-bottom: 21px;
}

.ad-form-group label {
  color: #aab7c9;
  display: block;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}

.ad-input-wrap {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 52px;
  padding: 0 15px;
  border-radius: 10px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  background: rgba(6, 10, 20, 0.6);
  transition: 0.25s;
  color: #74839b;
}

.ad-input-wrap:focus-within {
  border-color: rgba(86, 229, 242, 0.65);
  box-shadow: 0 0 0 3px rgba(86, 229, 242, 0.08);
}

.ad-input-wrap > svg {
  flex-shrink: 0;
}

.ad-input-wrap input {
  outline: none;
  border: none;
  background: transparent;
  width: 100%;
  color: white;
  font: 12px 'Inter', sans-serif;
  min-width: 0;
}

.ad-input-wrap input::placeholder {
  color: #58677d;
}

.ad-password-toggle {
  background: transparent;
  border: none;
  color: #8391a8;
  cursor: pointer;
  display: grid;
  place-items: center;
  padding: 5px;
}

.ad-password-toggle:hover {
  color: var(--ad-cyan);
}

.ad-login-error {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  margin: 15px 0;
  border-radius: 8px;
  color: #fda4af;
  border: 1px solid rgba(248, 113, 113, 0.3);
  background: rgba(127, 29, 29, 0.15);
  font-size: 11px;
  line-height: 1.5;
}

.ad-login-button {
  width: 100%;
  padding: 16px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 13px;
  background: linear-gradient(100deg, #16a6b6, #7470dc);
  border: none;
  border-radius: 9px;
  color: white;
  cursor: pointer;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.12em;
  transition: 0.3s;
}

.ad-login-button:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(86, 229, 242, 0.22);
}

.ad-login-button:disabled {
  opacity: 0.6;
  cursor: wait;
}

.ad-button-spinner {
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  animation: ad-spin 0.7s linear infinite;
}

.ad-login-secure-note {
  margin-top: 25px;
  color: #74839b;
  font-size: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ad-login-secure-note svg {
  color: var(--ad-green);
}

.ad-login-footer {
  display: flex;
  justify-content: space-between;
  color: #5c6a81;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.07em;
  margin-top: 40px;
}

/* ======================================
   SIDEBAR
====================================== */

.ad-sidebar {
  width: 250px;
  min-width: 250px;
  min-height: 100vh;
  border-right: 1px solid var(--ad-border);
  background: rgba(9, 13, 24, 0.94);
  display: flex;
  flex-direction: column;
  padding: 28px 17px 20px;
  position: relative;
  z-index: 5;
}

.ad-sidebar-brand {
  padding: 0 9px 31px;
  border-bottom: 1px solid var(--ad-border);
}

.ad-sidebar-brand .ad-brand-symbol {
  font-size: 23px;
}

.ad-sidebar-section-label {
  color: #56647d;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.17em;
  padding: 27px 11px 13px;
}

.ad-sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ad-nav-item {
  width: 100%;
  min-height: 47px;
  padding: 0 13px;
  display: flex;
  align-items: center;
  gap: 13px;
  position: relative;
  border: 1px solid transparent;
  border-radius: 9px;
  background: transparent;
  color: #8b99af;
  cursor: pointer;
  text-align: left;
  font-size: 11px;
  transition: 0.25s;
}

.ad-nav-item:hover {
  color: white;
  background: rgba(148, 163, 184, 0.06);
}

.ad-nav-item.active {
  color: #fff;
  border-color: rgba(86, 229, 242, 0.18);
  background: linear-gradient(100deg, rgba(86, 229, 242, 0.12), rgba(167, 139, 250, 0.08));
  box-shadow: inset 3px 0 0 var(--ad-cyan);
}

.ad-nav-icon {
  font-size: 15px;
  display: grid;
  place-items: center;
  color: #74849f;
}

.ad-nav-item.active .ad-nav-icon {
  color: var(--ad-cyan);
}

.ad-nav-count {
  margin-left: auto;
  font: 9px 'DM Mono', monospace;
  color: #7789a5;
  background: rgba(148, 163, 184, 0.10);
  padding: 4px 6px;
  border-radius: 4px;
}

.ad-nav-active-mark {
  position: absolute;
  right: 10px;
  width: 5px;
  height: 5px;
  background: var(--ad-cyan);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--ad-cyan);
}

.ad-sidebar-spacer {
  flex: 1;
  min-height: 50px;
}

.ad-sidebar-status {
  padding: 13px 11px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(94, 230, 168, 0.16);
  background: rgba(94, 230, 168, 0.045);
  border-radius: 10px;
  margin-bottom: 16px;
}

.ad-sidebar-status-icon {
  width: 31px;
  height: 31px;
  border-radius: 8px;
  background: rgba(94, 230, 168, 0.10);
  color: var(--ad-green);
  display: grid;
  place-items: center;
  font-size: 13px;
}

.ad-sidebar-status strong {
  display: block;
  font-size: 8px;
  letter-spacing: 0.07em;
}

.ad-sidebar-status span {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 6px;
  font: 8px 'DM Mono', monospace;
  color: var(--ad-green);
}

.ad-sidebar-status span i {
  width: 5px;
  height: 5px;
  background: var(--ad-green);
  border-radius: 50%;
}

.ad-logout-button {
  width: 100%;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid rgba(248, 113, 113, 0.15);
  border-radius: 8px;
  color: #df8d99;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  background: rgba(248, 113, 113, 0.045);
  cursor: pointer;
  transition: 0.25s;
}

.ad-logout-button:hover {
  border-color: rgba(248, 113, 113, 0.5);
  background: rgba(248, 113, 113, 0.10);
}

.ad-logout-button:disabled {
  opacity: 0.5;
  cursor: wait;
}

.ad-logout-arrow {
  margin-left: auto;
  font-size: 10px;
}

.ad-sidebar-version {
  color: #63718a;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  margin-top: 17px;
  padding: 0 4px;
  display: flex;
  justify-content: space-between;
}

.ad-sidebar-version span {
  color: #8999b2;
}

.ad-mobile-close,
.ad-mobile-menu {
  display: none;
}

/* ======================================
   MAIN CONTENT
====================================== */

.ad-main {
  flex: 1;
  min-width: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.ad-topbar {
  height: 76px;
  min-height: 76px;
  padding: 0 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid var(--ad-border);
  background: rgba(8, 12, 22, 0.62);
  backdrop-filter: blur(15px);
}

.ad-topbar-left,
.ad-topbar-right {
  display: flex;
  align-items: center;
  gap: 23px;
}

.ad-breadcrumb {
  display: flex;
  align-items: center;
  gap: 11px;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.09em;
  color: #65738a;
}

.ad-breadcrumb svg {
  font-size: 8px;
  color: #46546d;
}

.ad-breadcrumb strong {
  color: #dae6f6;
}

.ad-topbar-status {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8eb8a7;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
}

.ad-topbar-status i {
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: var(--ad-green);
  box-shadow: 0 0 10px var(--ad-green);
}

.ad-topbar-icon {
  position: relative;
  color: #8898b1;
  border: none;
  background: transparent;
  font-size: 15px;
  cursor: pointer;
}

.ad-topbar-icon span {
  position: absolute;
  width: 5px;
  height: 5px;
  background: #f59eab;
  border-radius: 50%;
  top: -3px;
  right: -3px;
}

.ad-view-site {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 13px;
  color: var(--ad-cyan);
  background: rgba(86, 229, 242, 0.055);
  border: 1px solid rgba(86, 229, 242, 0.2);
  text-decoration: none;
  border-radius: 7px;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
  transition: 0.25s;
}

.ad-view-site:hover {
  background: rgba(86, 229, 242, 0.12);
}

.ad-view-site svg {
  font-size: 9px;
}

.ad-topbar-avatar {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(86, 229, 242, 0.4);
  border-radius: 10px;
  background: linear-gradient(135deg, #173a4d, #302347);
  color: white;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

/* ======================================
   PAGE HEADER
====================================== */

.ad-page-header {
  padding: 39px 42px 29px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.ad-page-overline {
  font-size: 9px;
  color: #7789a5;
}

.ad-page-header h1 {
  margin: 13px 0 7px;
  font-size: clamp(28px, 3vw, 37px);
  letter-spacing: -0.05em;
  font-weight: 800;
}

.ad-page-header > div:first-child > p {
  margin: 0;
  font-size: 12px;
  color: #8897ae;
}

.ad-time-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  color: #99a9c0;
  background: rgba(148, 163, 184, 0.055);
  border: 1px solid var(--ad-border);
  border-radius: 7px;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.07em;
}

.ad-time-badge svg {
  color: var(--ad-cyan);
}

/* ======================================
   CONTENT WRAPPER
====================================== */

.ad-content-wrapper {
  padding: 0 42px 36px;
  flex: 1;
}

.ad-page-content {
  animation: ad-appear 0.4s ease both;
}

@keyframes ad-appear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ======================================
   WELCOME PANEL
====================================== */

.ad-welcome-panel {
  min-height: 280px;
  border: 1px solid rgba(86, 229, 242, 0.18);
  border-radius: 16px;
  background:
    radial-gradient(circle at 80% 50%, rgba(86, 229, 242, 0.13), transparent 30%),
    radial-gradient(circle at 100% 0%, rgba(167, 139, 250, 0.13), transparent 35%),
    linear-gradient(110deg, #0e1a2a, #15152b);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 42px;
  position: relative;
  overflow: hidden;
}

.ad-welcome-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0.15;
  background-image:
    linear-gradient(rgba(86, 229, 242, 0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(86, 229, 242, 0.16) 1px, transparent 1px);
  background-size: 35px 35px;
  mask-image: linear-gradient(to right, black, transparent);
  pointer-events: none;
}

.ad-welcome-content {
  position: relative;
  z-index: 2;
  max-width: 520px;
}

.ad-welcome-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--ad-green);
  background: rgba(94, 230, 168, 0.07);
  border: 1px solid rgba(94, 230, 168, 0.17);
  padding: 7px 10px;
  border-radius: 5px;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.12em;
}

.ad-welcome-content h2 {
  font-size: clamp(26px, 3vw, 39px);
  line-height: 1.2;
  letter-spacing: -0.05em;
  margin: 19px 0 11px;
}

.ad-welcome-content h2 span {
  color: var(--ad-cyan);
}

.ad-welcome-content p {
  max-width: 420px;
  color: #9aa9bd;
  font-size: 11px;
  line-height: 1.8;
}

.ad-welcome-button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-top: 15px;
  border: 1px solid rgba(86, 229, 242, 0.35);
  border-radius: 7px;
  background: rgba(86, 229, 242, 0.10);
  color: var(--ad-cyan);
  padding: 12px 15px;
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: 0.25s;
}

.ad-welcome-button:hover {
  background: rgba(86, 229, 242, 0.19);
  transform: translateY(-2px);
}

.ad-welcome-visual {
  width: 270px;
  height: 220px;
  flex-shrink: 0;
  position: relative;
  display: grid;
  place-items: center;
}

.ad-welcome-circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(86, 229, 242, 0.26);
  animation: ad-spin 22s linear infinite;
}

.circle-a {
  width: 190px;
  height: 190px;
}

.circle-b {
  width: 145px;
  height: 145px;
  border-style: dashed;
  border-color: rgba(167, 139, 250, 0.55);
  animation-direction: reverse;
  animation-duration: 14s;
}

.circle-c {
  width: 100px;
  height: 100px;
  border-color: rgba(94, 230, 168, 0.48);
}

.ad-welcome-core {
  position: relative;
  width: 74px;
  height: 74px;
  border-radius: 22px;
  border: 1px solid rgba(86, 229, 242, 0.5);
  background: linear-gradient(135deg, #143b4b, #262343);
  display: grid;
  place-content: center;
  text-align: center;
  box-shadow: 0 0 45px rgba(86, 229, 242, 0.23);
  transform: rotate(-8deg);
}

.ad-welcome-core span {
  font-size: 23px;
  font-weight: 900;
}

.ad-welcome-core small {
  color: var(--ad-cyan);
  font: 7px 'DM Mono', monospace;
  letter-spacing: 0.1em;
}

.ad-floating-label {
  position: absolute;
  padding: 7px 10px;
  border-radius: 6px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: #151d30;
  color: #d4dfef;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.06em;
  display: flex;
  align-items: center;
  gap: 7px;
}

.ad-floating-label svg {
  color: var(--ad-cyan);
}

.label-a { top: 8px; right: 2px; }
.label-b { bottom: 22px; left: -5px; }
.label-c { bottom: 3px; right: 12px; }

/* ======================================
   SECTION HEADINGS AND METRICS
====================================== */

.ad-section-heading,
.ad-panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.ad-section-heading {
  margin: 34px 0 17px;
}

.ad-eyebrow {
  display: block;
  color: var(--ad-cyan);
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.16em;
  margin-bottom: 8px;
}

.ad-section-heading h2 {
  margin: 0;
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.ad-data-note {
  color: #6e7e96;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
}

.ad-metrics-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 15px;
}

.ad-metric-card {
  position: relative;
  padding: 19px;
  border-radius: 11px;
  border: 1px solid var(--ad-border);
  background: linear-gradient(135deg, #111a2b, #0c1321);
  min-height: 160px;
  overflow: hidden;
  transition: 0.25s;
}

.ad-metric-card::after {
  content: '';
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  filter: blur(45px);
  right: -30px;
  bottom: -40px;
  opacity: 0.12;
}

.ad-metric-card.cyan::after { background: #56e5f2; }
.ad-metric-card.purple::after { background: #a78bfa; }
.ad-metric-card.green::after { background: #5ee6a8; }
.ad-metric-card.orange::after { background: #fbaf75; }

.ad-metric-card:hover {
  transform: translateY(-4px);
  border-color: rgba(86, 229, 242, 0.28);
}

.ad-metric-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ad-metric-icon {
  height: 34px;
  width: 34px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 14px;
}

.cyan .ad-metric-icon { color: var(--ad-cyan); background: rgba(86, 229, 242, 0.1); }
.purple .ad-metric-icon { color: var(--ad-purple); background: rgba(167, 139, 250, 0.1); }
.green .ad-metric-icon { color: var(--ad-green); background: rgba(94, 230, 168, 0.1); }
.orange .ad-metric-icon { color: #fbaf75; background: rgba(251, 175, 117, 0.1); }

.ad-metric-indicator {
  font: 7px 'DM Mono', monospace;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #8191a9;
}

.ad-metric-indicator i {
  height: 5px;
  width: 5px;
  border-radius: 50%;
  background: var(--ad-green);
}

.ad-metric-value {
  font-size: 30px;
  font-weight: 800;
  letter-spacing: -0.05em;
  margin-top: 18px;
}

.ad-metric-label {
  font-size: 9px;
  color: #b0bdd0;
  font-weight: 700;
  letter-spacing: 0.03em;
  margin-top: 2px;
}

.ad-metric-detail {
  color: #65758f;
  font-size: 9px;
  margin-top: 9px;
}

/* ======================================
   OVERVIEW LOWER PANELS
====================================== */

.ad-overview-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 15px;
  margin-top: 19px;
}

.ad-panel {
  border: 1px solid var(--ad-border);
  border-radius: 11px;
  background: linear-gradient(145deg, rgba(17, 26, 43, 0.94), rgba(11, 17, 29, 0.96));
  padding: 21px;
}

.ad-panel-heading {
  margin-bottom: 21px;
}

.ad-panel-heading h3 {
  font-size: 14px;
  margin: 0;
}

.ad-panel-heading-icon {
  color: var(--ad-cyan);
  font-size: 15px;
}

.ad-text-button {
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--ad-cyan);
  font: 8px 'DM Mono', monospace;
  cursor: pointer;
}

.ad-mini-projects {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ad-mini-project {
  display: flex;
  align-items: center;
  padding: 10px 5px;
  gap: 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
}

.ad-project-symbol {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  font-size: 14px;
}

.ad-project-symbol.cyan { background: rgba(86, 229, 242, 0.1); color: var(--ad-cyan); }
.ad-project-symbol.purple { background: rgba(167, 139, 250, 0.1); color: var(--ad-purple); }
.ad-project-symbol.green { background: rgba(94, 230, 168, 0.1); color: var(--ad-green); }
.ad-project-symbol.orange { background: rgba(251, 175, 117, 0.1); color: #fbaf75; }

.ad-mini-project-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ad-mini-project-info strong {
  font-size: 10px;
}

.ad-mini-project-info span {
  color: #75849b;
  font-size: 9px;
}

.ad-mini-project-number {
  margin-left: auto;
  color: #64728a;
  font: 10px 'DM Mono', monospace;
}

.ad-quick-panel {
  display: flex;
  flex-direction: column;
}

.ad-quick-link {
  width: 100%;
  display: flex;
  text-decoration: none;
  align-items: center;
  gap: 11px;
  padding: 10px 0;
  border: 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.08);
  background: transparent;
  color: #71819a;
  cursor: pointer;
  text-align: left;
}

.ad-quick-link:last-child {
  border-bottom: none;
}

.ad-quick-link > svg {
  margin-left: auto;
  font-size: 11px;
}

.ad-quick-link:hover strong,
.ad-quick-link:hover > svg {
  color: var(--ad-cyan);
}

.ad-quick-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 8px;
}

.ad-quick-icon.cyan { background: rgba(86, 229, 242, 0.1); color: var(--ad-cyan); }
.ad-quick-icon.purple { background: rgba(167, 139, 250, 0.1); color: var(--ad-purple); }
.ad-quick-icon.green { background: rgba(94, 230, 168, 0.1); color: var(--ad-green); }

.ad-quick-link strong {
  display: block;
  font-size: 10px;
  color: #e1e9f5;
  margin-bottom: 4px;
}

.ad-quick-link span {
  display: block;
  font-size: 8px;
  color: #77869c;
}

.ad-system-strip {
  margin-top: 16px;
  padding: 12px 15px;
  border: 1px solid rgba(94, 230, 168, 0.12);
  background: rgba(94, 230, 168, 0.035);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #81968e;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.08em;
}

.ad-system-left,
.ad-system-right {
  display: flex;
  align-items: center;
  gap: 9px;
}

.ad-system-left strong {
  color: var(--ad-green);
  font-weight: 500;
}

.ad-system-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ad-green);
}

.ad-system-divider {
  color: #51645e;
}

.ad-system-right svg {
  color: var(--ad-green);
}

/* ======================================
   PROJECT PAGE
====================================== */

.ad-page-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin: 12px 0 20px;
}

.ad-page-toolbar h3 {
  margin: 0;
  font-size: 16px;
}

.ad-project-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 240px;
  padding: 11px 13px;
  background: #0e1727;
  border: 1px solid var(--ad-border);
  border-radius: 8px;
  color: #7d8da7;
}

.ad-project-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 10px;
  min-width: 0;
}

.ad-project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.ad-large-project-card {
  border: 1px solid var(--ad-border);
  background: linear-gradient(145deg, #111b2d, #0c1321);
  border-radius: 12px;
  overflow: hidden;
  transition: 0.25s;
}

.ad-large-project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(86, 229, 242, 0.28);
}

.ad-project-card-top {
  height: 105px;
  padding: 17px 19px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.ad-project-card-top::after {
  content: '';
  position: absolute;
  height: 170px;
  width: 170px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.12);
  top: -90px;
  right: -30px;
  box-shadow: 0 0 0 18px rgba(255,255,255,0.025), 0 0 0 37px rgba(255,255,255,0.02);
}

.ad-project-card-top span {
  color: rgba(255,255,255,0.8);
  font: 9px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  position: relative;
  z-index: 2;
}

.ad-project-card-top > svg {
  position: relative;
  z-index: 2;
  font-size: 24px;
  color: rgba(255,255,255,0.8);
}

.ad-project-card-top.cyan { background: linear-gradient(120deg, #164958, #11233c); }
.ad-project-card-top.purple { background: linear-gradient(120deg, #42316c, #1e2545); }
.ad-project-card-top.green { background: linear-gradient(120deg, #155644, #172d3e); }
.ad-project-card-top.orange { background: linear-gradient(120deg, #70452d, #362c46); }

.ad-large-project-body {
  padding: 19px;
}

.ad-project-category {
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.11em;
  color: var(--ad-cyan);
  text-transform: uppercase;
}

.ad-large-project-body h3 {
  margin: 9px 0;
  font-size: 17px;
}

.ad-large-project-body p {
  min-height: 43px;
  color: #8c9ab0;
  font-size: 10px;
  line-height: 1.7;
}

.ad-project-stack {
  display: inline-block;
  font: 8px 'DM Mono', monospace;
  color: #b2a0f4;
  background: rgba(167, 139, 250, 0.09);
  padding: 7px 9px;
  border-radius: 5px;
  margin: 7px 0 15px;
}

.ad-project-bottom {
  border-top: 1px solid var(--ad-border);
  padding-top: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ad-project-bottom span {
  color: #76869e;
  font: 8px 'DM Mono', monospace;
  display: flex;
  align-items: center;
  gap: 7px;
}

.ad-project-bottom span i {
  width: 5px;
  height: 5px;
  background: var(--ad-green);
  border-radius: 50%;
}

.ad-project-bottom > svg {
  color: var(--ad-cyan);
  font-size: 11px;
}

.ad-no-results {
  grid-column: 1 / -1;
  padding: 35px;
  color: #9aa8bb;
  text-align: center;
  border: 1px dashed var(--ad-border);
  border-radius: 10px;
}

.ad-notice-panel {
  margin-top: 19px;
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 16px;
  border: 1px solid rgba(86, 229, 242, 0.16);
  background: rgba(86, 229, 242, 0.035);
  border-radius: 9px;
}

.ad-notice-panel > svg {
  color: var(--ad-cyan);
  font-size: 17px;
  margin-top: 2px;
  flex-shrink: 0;
}

.ad-notice-panel strong {
  display: block;
  font-size: 10px;
}

.ad-notice-panel p {
  margin: 5px 0 0;
  font-size: 9px;
  color: #8999af;
  line-height: 1.7;
}

/* ======================================
   MESSAGES PAGE
====================================== */

.ad-messages-banner,
.ad-skills-banner {
  display: flex;
  align-items: center;
  gap: 25px;
  justify-content: space-between;
  padding: 29px;
  border-radius: 13px;
  border: 1px solid rgba(167, 139, 250, 0.19);
  background: linear-gradient(115deg, #1b1939, #102334);
  margin-bottom: 17px;
}

.ad-message-orb {
  width: 65px;
  height: 65px;
  border-radius: 19px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  background: rgba(167, 139, 250, 0.12);
  border: 1px solid rgba(167, 139, 250, 0.24);
  color: var(--ad-purple);
  font-size: 25px;
}

.ad-messages-banner h2,
.ad-skills-banner h2 {
  font-size: 25px;
  margin: 0 0 7px;
}

.ad-messages-banner p,
.ad-skills-banner p {
  color: #98a7bc;
  font-size: 10px;
  margin: 0;
}

.ad-message-info {
  min-height: 300px;
  display: grid;
  place-items: center;
}

.ad-empty-state {
  text-align: center;
  max-width: 400px;
  padding: 25px;
}

.ad-empty-icon {
  width: 63px;
  height: 63px;
  margin: 0 auto 19px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(86, 229, 242, 0.2);
  border-radius: 19px;
  background: rgba(86, 229, 242, 0.07);
  color: var(--ad-cyan);
  font-size: 23px;
}

.ad-empty-state h3 {
  font-size: 17px;
  margin: 0 0 9px;
}

.ad-empty-state p {
  font-size: 10px;
  line-height: 1.8;
  color: #8998ad;
  margin: 0 0 17px;
}

.ad-coming-soon {
  display: inline-block;
  padding: 7px 10px;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.1em;
  color: var(--ad-purple);
  border: 1px solid rgba(167, 139, 250, 0.22);
  background: rgba(167, 139, 250, 0.07);
  border-radius: 5px;
}

/* ======================================
   SKILLS PAGE
====================================== */

.ad-skills-banner {
  background: linear-gradient(115deg, #103b39, #111c36);
  border-color: rgba(94, 230, 168, 0.17);
}

.ad-skills-total {
  min-width: 100px;
  padding: 13px;
  border: 1px solid rgba(94, 230, 168, 0.23);
  background: rgba(94, 230, 168, 0.06);
  border-radius: 10px;
  text-align: center;
}

.ad-skills-total strong {
  display: block;
  font-size: 29px;
  color: var(--ad-green);
}

.ad-skills-total span {
  display: block;
  margin-top: 4px;
  font: 8px 'DM Mono', monospace;
  color: #9fc7b4;
}

.ad-skills-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.ad-skill-card {
  border: 1px solid var(--ad-border);
  border-radius: 10px;
  padding: 16px;
  background: linear-gradient(145deg, #111a2b, #0c1321);
  position: relative;
  overflow: hidden;
  transition: 0.25s;
}

.ad-skill-card:hover {
  transform: translateY(-3px);
  border-color: rgba(94, 230, 168, 0.3);
}

.ad-skill-number {
  position: absolute;
  right: 12px;
  top: 12px;
  color: #43506a;
  font: 9px 'DM Mono', monospace;
}

.ad-skill-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  background: rgba(94, 230, 168, 0.08);
  border: 1px solid rgba(94, 230, 168, 0.14);
  color: var(--ad-green);
  border-radius: 10px;
  font-size: 16px;
}

.ad-skill-card h3 {
  font-size: 12px;
  margin: 15px 0 5px;
}

.ad-skill-type {
  color: #7788a1;
  font-size: 9px;
}

.ad-skill-bottom {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #91a3bc;
  font: 8px 'DM Mono', monospace;
}

.ad-skill-bottom i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ad-cyan);
}

/* ======================================
   RESUME PAGE
====================================== */

.ad-resume-panel {
  padding: 45px;
  display: grid;
  grid-template-columns: 0.7fr 1.3fr;
  align-items: center;
  min-height: 320px;
  overflow: hidden;
  position: relative;
}

.ad-resume-visual {
  min-height: 240px;
  display: grid;
  place-items: center;
  position: relative;
}

.ad-resume-document {
  width: 130px;
  height: 170px;
  background: linear-gradient(145deg, #e7f4fb, #a9c9dd);
  border-radius: 6px;
  padding: 19px 14px;
  color: #1b3448;
  position: relative;
  z-index: 2;
  transform: rotate(-8deg);
  box-shadow: 20px 25px 50px rgba(0,0,0,0.35);
}

.ad-resume-document svg {
  font-size: 21px;
  display: block;
  margin-bottom: 17px;
}

.ad-resume-document span {
  display: block;
  font-size: 9px;
  font-weight: 900;
  margin-bottom: 11px;
}

.ad-resume-document i {
  display: block;
  height: 3px;
  border-radius: 5px;
  background: rgba(27,52,72,0.25);
  margin: 7px 0;
  width: 100%;
}

.ad-resume-document i:nth-last-child(1) {
  width: 60%;
}

.ad-resume-glow {
  position: absolute;
  background: #56e5f2;
  opacity: 0.12;
  filter: blur(45px);
  width: 160px;
  height: 160px;
  border-radius: 50%;
}

.ad-resume-text h2 {
  font-size: 30px;
  margin: 10px 0;
}

.ad-resume-text h2 span {
  color: var(--ad-cyan);
}

.ad-resume-text p {
  max-width: 440px;
  color: #8e9eb5;
  font-size: 11px;
  line-height: 1.8;
}

.ad-resume-status {
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(248, 113, 113, 0.2);
  background: rgba(248, 113, 113, 0.06);
  color: #f0a0a8;
  padding: 10px 12px;
  border-radius: 6px;
  font: 8px 'DM Mono', monospace;
}

/* ======================================
   PROFILE PAGE
====================================== */

.ad-profile-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 17px;
}

.ad-profile-card {
  padding: 0;
  overflow: hidden;
}

.ad-profile-cover {
  height: 120px;
  position: relative;
  background: linear-gradient(120deg, #125166, #38275e);
}

.ad-profile-cover-grid {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  background-image:
    linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px);
  background-size: 25px 25px;
}

.ad-profile-avatar {
  margin: -37px 0 0 25px;
  width: 75px;
  height: 75px;
  border: 5px solid #111a2b;
  border-radius: 22px;
  background: linear-gradient(135deg, #15566c, #67448b);
  display: grid;
  place-items: center;
  font-size: 22px;
  font-weight: 900;
  position: relative;
}

.ad-profile-content {
  padding: 19px 25px 26px;
}

.ad-profile-content h2 {
  font-size: 20px;
  margin: 7px 0 5px;
}

.ad-profile-content > p {
  margin: 0;
  color: #91a3bd;
  font-size: 10px;
}

.ad-profile-email,
.ad-profile-role {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #b5c2d3;
  font-size: 10px;
  margin-top: 20px;
  overflow-wrap: anywhere;
}

.ad-profile-email svg,
.ad-profile-role svg {
  color: var(--ad-cyan);
}

.ad-profile-role {
  color: var(--ad-green);
}

.ad-security-card {
  padding: 23px;
}

.ad-security-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 0;
  border-bottom: 1px solid var(--ad-border);
}

.ad-security-item:last-child {
  border-bottom: none;
}

.ad-security-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: rgba(86, 229, 242, 0.08);
  border-radius: 8px;
  color: var(--ad-cyan);
}

.ad-security-item strong {
  display: block;
  font-size: 10px;
  margin-bottom: 5px;
}

.ad-security-item span {
  color: #8191a8;
  font-size: 9px;
}

.ad-security-check {
  color: var(--ad-green);
  margin-left: auto;
  font-size: 13px;
}

/* ======================================
   FOOTER
====================================== */

.ad-footer {
  padding: 19px 42px;
  border-top: 1px solid var(--ad-border);
  display: flex;
  justify-content: space-between;
  gap: 15px;
  color: #62718a;
  font: 8px 'DM Mono', monospace;
  letter-spacing: 0.07em;
}

.ad-footer strong {
  color: #a6b4ca;
}

.ad-footer-dot {
  color: var(--ad-green);
  margin-left: 8px;
}

/* ======================================
   MOBILE OVERLAY
====================================== */

.ad-mobile-overlay {
  display: none;
}

/* ======================================
   ANIMATIONS
====================================== */

@keyframes ad-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* ======================================
   RESPONSIVE DESIGN
====================================== */

@media (max-width: 1200px) {
  .ad-sidebar {
    width: 220px;
    min-width: 220px;
  }

  .ad-topbar,
  .ad-page-header {
    padding-left: 28px;
    padding-right: 28px;
  }

  .ad-content-wrapper {
    padding-left: 28px;
    padding-right: 28px;
  }

  .ad-metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .ad-skills-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .ad-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    transform: translateX(-110%);
    transition: transform 0.3s ease;
    z-index: 30;
    width: 260px;
    min-width: 260px;
  }

  .ad-sidebar.open {
    transform: translateX(0);
  }

  .ad-mobile-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 25;
    background: rgba(0, 0, 0, 0.65);
    backdrop-filter: blur(4px);
  }

  .ad-mobile-close {
    display: grid;
    margin-left: auto;
    place-items: center;
    color: #92a3bb;
    background: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .ad-mobile-menu {
    display: grid;
    place-items: center;
    background: transparent;
    color: #c2d2e7;
    font-size: 17px;
    border: none;
    cursor: pointer;
  }

  .ad-overview-grid {
    grid-template-columns: 1fr;
  }

  .ad-login-layout {
    grid-template-columns: 1fr 0.95fr;
  }

  .ad-login-left,
  .ad-login-right {
    padding: 35px;
  }
}

@media (max-width: 650px) {
  .ad-login-screen {
    padding: 15px;
    align-items: flex-start;
  }

  .ad-login-layout {
    grid-template-columns: 1fr;
    margin: auto 0;
    min-height: auto;
    border-radius: 17px;
  }

  .ad-login-left {
    min-height: auto;
    padding: 25px 24px 15px;
    border-right: none;
    border-bottom: 1px solid var(--ad-border);
  }

  .ad-login-hero {
    margin-top: 32px;
  }

  .ad-login-hero h1 {
    font-size: 32px;
  }

  .ad-login-orb {
    height: 130px;
    width: 130px;
    margin: 15px auto;
  }

  .ad-orb-center {
    width: 65px;
    height: 65px;
    font-size: 22px;
  }

  .ad-orb-tag {
    font-size: 6px;
    padding: 4px 6px;
  }

  .ad-login-bottom-info {
    display: none;
  }

  .ad-login-right {
    min-height: auto;
    padding: 30px 24px;
  }

  .ad-login-heading h2 {
    font-size: 28px;
  }

  .ad-login-footer {
    margin-top: 25px;
  }

  .ad-topbar {
    padding: 0 17px;
    height: 65px;
    min-height: 65px;
  }

  .ad-topbar-left,
  .ad-topbar-right {
    gap: 12px;
  }

  .ad-topbar-status {
    display: none;
  }

  .ad-breadcrumb {
    font-size: 8px;
    gap: 6px;
  }

  .ad-view-site {
    padding: 8px;
    font-size: 7px;
  }

  .ad-topbar-avatar {
    width: 30px;
    height: 30px;
  }

  .ad-page-header {
    padding: 27px 19px 22px;
    align-items: flex-start;
  }

  .ad-page-header h1 {
    font-size: 27px;
  }

  .ad-page-header-right {
    display: none;
  }

  .ad-content-wrapper {
    padding: 0 15px 25px;
  }

  .ad-welcome-panel {
    padding: 25px 20px;
    min-height: auto;
  }

  .ad-welcome-visual {
    display: none;
  }

  .ad-welcome-content h2 {
    font-size: 27px;
  }

  .ad-welcome-content p {
    font-size: 10px;
  }

  .ad-metrics-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .ad-metric-card {
    padding: 13px;
    min-height: 145px;
  }

  .ad-metric-value {
    font-size: 25px;
  }

  .ad-metric-label {
    font-size: 8px;
  }

  .ad-section-heading h2 {
    font-size: 16px;
  }

  .ad-data-note {
    display: none;
  }

  .ad-panel {
    padding: 16px;
  }

  .ad-system-strip {
    flex-wrap: wrap;
    font-size: 7px;
  }

  .ad-system-right {
    display: none;
  }

  .ad-project-grid {
    grid-template-columns: 1fr;
  }

  .ad-page-toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .ad-project-search {
    width: 100%;
  }

  .ad-skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .ad-skills-banner {
    padding: 18px;
    gap: 10px;
  }

  .ad-skills-banner h2 {
    font-size: 19px;
  }

  .ad-skills-banner p {
    font-size: 9px;
    line-height: 1.6;
  }

  .ad-skills-total {
    min-width: 75px;
    padding: 9px;
  }

  .ad-skills-total strong {
    font-size: 23px;
  }

  .ad-resume-panel {
    grid-template-columns: 1fr;
    padding: 20px;
  }

  .ad-resume-visual {
    min-height: 200px;
  }

  .ad-resume-text h2 {
    font-size: 25px;
  }

  .ad-profile-layout {
    grid-template-columns: 1fr;
  }

  .ad-footer {
    padding: 17px;
    flex-direction: column;
    font-size: 7px;
  }

  .ad-messages-banner {
    padding: 18px;
    gap: 12px;
  }

  .ad-messages-banner h2 {
    font-size: 19px;
  }

  .ad-message-orb {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
}

@media (max-width: 380px) {
  .ad-metrics-grid,
  .ad-skills-grid {
    grid-template-columns: 1fr;
  }

  .ad-topbar-icon {
    display: none;
  }

  .ad-login-heading h2 {
    font-size: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ad-dashboard *,
  .ad-login-screen *,
  .ad-loading-screen * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ======================================
   ADVANCED HOLOGRAPHIC BACKGROUND
====================================== */

.ad-dashboard {
  position: relative;
  isolation: isolate;

  background:
    radial-gradient(
      ellipse at 15% 15%,
      rgba(0, 225, 255, 0.09),
      transparent 35%
    ),
    radial-gradient(
      ellipse at 85% 35%,
      rgba(142, 68, 255, 0.10),
      transparent 35%
    ),
    radial-gradient(
      ellipse at 50% 100%,
      rgba(0, 255, 190, 0.06),
      transparent 40%
    ),
    #070912;
}

.ad-hologram-background {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.9;

  background-image:
    linear-gradient(
      rgba(86, 229, 242, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(86, 229, 242, 0.035) 1px,
      transparent 1px
    );

  background-size: 55px 55px;
}

.ad-sidebar,
.ad-main {
  position: relative;
  z-index: 2;
}

/* FLOATING HOLOGRAM ORBS */

.ad-holo-orb {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;

  border: 1px solid rgba(86, 229, 242, 0.15);

  box-shadow:
    inset 0 0 40px rgba(86, 229, 242, 0.06),
    0 0 60px rgba(86, 229, 242, 0.05);

  animation: holoFloat 13s ease-in-out infinite;
}

.ad-holo-orb::before {
  content: "";
  position: absolute;
  inset: 20px;

  border-radius: 50%;
  border: 1px dashed rgba(167, 139, 250, 0.35);

  animation: holoRotate 18s linear infinite;
}

.ad-holo-orb::after {
  content: "";
  position: absolute;
  inset: 55px;

  border-radius: 50%;
  border: 1px solid rgba(94, 230, 168, 0.22);

  box-shadow:
    0 0 35px rgba(94, 230, 168, 0.08);
}

.ad-holo-orb span {
  position: absolute;
  width: 10px;
  height: 10px;

  top: 18%;
  left: 12%;

  border-radius: 50%;
  background: #56e5f2;

  box-shadow:
    0 0 10px #56e5f2,
    0 0 25px #56e5f2,
    0 0 45px #56e5f2;
}

.ad-holo-orb-one {
  top: 8%;
  right: -140px;
}

.ad-holo-orb-two {
  top: 45%;
  left: 15%;
  width: 220px;
  height: 220px;

  animation-delay: -4s;
  animation-duration: 17s;

  border-color: rgba(167, 139, 250, 0.19);
}

.ad-holo-orb-three {
  bottom: -190px;
  right: 25%;

  width: 400px;
  height: 400px;

  animation-delay: -7s;
  animation-duration: 20s;
}

/* ANIMATED LIGHT BEAMS */

.ad-holo-beam {
  position: absolute;
  width: 550px;
  height: 2px;

  opacity: 0.5;
  filter: blur(2px);

  background: linear-gradient(
    90deg,
    transparent,
    #56e5f2,
    #a78bfa,
    transparent
  );

  box-shadow:
    0 0 15px rgba(86, 229, 242, 0.45);

  transform: rotate(-25deg);
}

.ad-holo-beam-one {
  top: 25%;
  left: 35%;

  animation: holoBeam 12s ease-in-out infinite;
}

.ad-holo-beam-two {
  bottom: 25%;
  right: 5%;

  animation: holoBeam 16s ease-in-out infinite reverse;
  opacity: 0.3;
}

/* HOLOGRAPHIC PARTICLE FIELD */

.ad-holo-particles {
  position: absolute;
  inset: 0;

  opacity: 0.35;

  background-image:
    radial-gradient(circle, #56e5f2 1px, transparent 2px),
    radial-gradient(circle, #a78bfa 1px, transparent 2px),
    radial-gradient(circle, #5ee6a8 1px, transparent 2px);

  background-size:
    110px 110px,
    170px 170px,
    230px 230px;

  background-position:
    0 0,
    45px 80px,
    100px 30px;

  animation: holoParticles 25s linear infinite;
}

/* MOVING SCANLINE */

.ad-holo-scanline {
  position: absolute;
  top: -100%;
  left: 0;

  width: 100%;
  height: 150px;

  background: linear-gradient(
    to bottom,
    transparent,
    rgba(86, 229, 242, 0.025),
    rgba(86, 229, 242, 0.09),
    transparent
  );

  animation: holoScan 12s linear infinite;
}

/* ======================================
   HOLOGRAM ANIMATIONS
====================================== */

@keyframes holoFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  50% {
    transform: translate3d(-25px, 35px, 0) scale(1.06);
  }
}

@keyframes holoRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes holoBeam {
  0%, 100% {
    transform: translateX(-80px) rotate(-25deg);
    opacity: 0.1;
  }

  50% {
    transform: translateX(160px) rotate(-25deg);
    opacity: 0.7;
  }
}

@keyframes holoParticles {
  from {
    background-position:
      0 0,
      45px 80px,
      100px 30px;
  }

  to {
    background-position:
      0 -350px,
      45px -500px,
      100px -700px;
  }
}

@keyframes holoScan {
  from {
    top: -150px;
  }

  to {
    top: 110%;
  }
}

/* ======================================
   HOLOGRAPHIC GLASS PANELS
====================================== */

.ad-panel,
.ad-metric-card,
.ad-large-project-card,
.ad-skill-card {
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.ad-panel {
  background:
    linear-gradient(
      140deg,
      rgba(20, 32, 53, 0.82),
      rgba(10, 16, 29, 0.84)
    );

  border-color: rgba(86, 229, 242, 0.12);
  transition: 0.35s ease;
}

.ad-panel:hover {
  border-color: rgba(86, 229, 242, 0.30);

  box-shadow:
    0 0 25px rgba(86, 229, 242, 0.055),
    inset 0 0 25px rgba(86, 229, 242, 0.025);
}

.ad-metric-card,
.ad-large-project-card,
.ad-skill-card {
  position: relative;
  overflow: hidden;
}

.ad-metric-card::before,
.ad-large-project-card::before,
.ad-skill-card::before {
  content: "";

  position: absolute;
  top: 0;
  left: -150%;

  width: 100%;
  height: 100%;

  pointer-events: none;

  background: linear-gradient(
    110deg,
    transparent 30%,
    rgba(86, 229, 242, 0.055) 50%,
    transparent 70%
  );

  transition: left 0.8s ease;
}

.ad-metric-card:hover::before,
.ad-large-project-card:hover::before,
.ad-skill-card:hover::before {
  left: 150%;
}

/* HOLOGRAPHIC TEXT EFFECT */

.ad-welcome-content h2 span,
.ad-page-header h1 {
  background: linear-gradient(
    100deg,
    #56e5f2,
    #a78bfa,
    #5ee6a8,
    #56e5f2
  );

  background-size: 300% 100%;

  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;

  animation: holoText 7s linear infinite;
}

@keyframes holoText {
  from {
    background-position: 0% 50%;
  }

  to {
    background-position: 300% 50%;
  }
}

/* REDUCE EFFECTS ON SMALL SCREENS */

@media (max-width: 650px) {
  .ad-holo-orb-one {
    right: -220px;
  }

  .ad-holo-orb-two {
    left: -120px;
  }

  .ad-holo-orb-three {
    right: -180px;
  }

  .ad-holo-beam {
    opacity: 0.2;
  }

  .ad-holo-particles {
    opacity: 0.18;
  }
}

@media (prefers-reduced-motion: reduce) {
  .ad-holo-orb,
  .ad-holo-orb::before,
  .ad-holo-beam,
  .ad-holo-particles,
  .ad-holo-scanline,
  .ad-welcome-content h2 span,
  .ad-page-header h1 {
    animation: none !important;
  }
}

`;