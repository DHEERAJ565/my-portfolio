// import { useEffect, useState } from "react";

// import {
//   FaGithub,
//   FaLinkedin,
//   FaReact,
//   FaNodeJs,
//   FaJs,
//   FaHtml5,
//   FaCss3Alt,
//   FaCode,
//   FaDatabase,
//   FaServer
// } from "react-icons/fa";

// import {
//   SiExpress,
//   SiMongodb,
//   SiTailwindcss,
//   SiGo,
//   SiFastapi,
//   SiDocker
// } from "react-icons/si";

// import Hologram from "./components/Hologram";
// import CustomCursor from "./components/CustomCursor";
// import Terminal from "./components/Terminal";
// import SkillConstellation from "./components/SkillConstellation";
// import Architecture from "./components/Architecture";
// import PortfolioAssistant from "./components/PortfolioAssistant";
// import AdminDashboard from "./components/AdminDashboard";

// // ==========================================
// // CONFIGURATION
// // ==========================================

// const CONTACT_EMAIL = "dheeraj72064@gmail.com";

// const GITHUB_URL = "https://github.com/DHEERAJ565";

// const LINKEDIN_URL =
//   "https://www.linkedin.com/in/golla-dheeraj";


// // ==========================================
// // CONTACT CARD STYLES
// // ==========================================

// const contactCardStyle = {
//   display: "flex",
//   alignItems: "center",
//   gap: "14px",
//   padding: "18px 22px",
//   minWidth: "220px",
//   background: "rgba(34, 211, 238, 0.06)",
//   border: "1px solid rgba(34, 211, 238, 0.3)",
//   borderRadius: "12px",
//   color: "inherit",
//   textDecoration: "none",
//   textAlign: "left"
// };

// const contactCardLabelStyle = {
//   display: "block",
//   marginBottom: "5px",
//   fontSize: "10px",
//   letterSpacing: "0.12em",
//   opacity: 0.7
// };

// const contactCardValueStyle = {
//   display: "block",
//   fontSize: "13px",
//   fontWeight: 600,
//   overflowWrap: "anywhere"
// };



// // ==========================================
// // HOLOGRAPHIC BACKGROUND
// // ==========================================

// function HolographicBackground() {
//   return (
//     <>
//       <style>{holographicStyles}</style>

//       <div className="holo-background" aria-hidden="true">

//         {/* DIGITAL GRID */}

//         <div className="holo-grid" />

//         {/* AMBIENT LIGHT */}

//         <div className="holo-nebula holo-nebula-cyan" />
//         <div className="holo-nebula holo-nebula-purple" />
//         <div className="holo-nebula holo-nebula-blue" />
//         <div className="holo-nebula holo-nebula-green" />

//         {/* MAIN HOLOGRAM */}

//         <div className="holo-main-structure">

//           <div className="holo-ring holo-ring-one" />
//           <div className="holo-ring holo-ring-two" />
//           <div className="holo-ring holo-ring-three" />
//           <div className="holo-ring holo-ring-four" />

//           <div className="holo-ring-core">
//             <div className="holo-core-inner">
//               DG
//             </div>
//           </div>

//           <div className="holo-energy-dot dot-one" />
//           <div className="holo-energy-dot dot-two" />
//           <div className="holo-energy-dot dot-three" />
//         </div>

//         {/* FLOATING HOLOGRAM OBJECTS */}

//         <div className="holo-floating-object holo-object-one">
//           <div className="holo-object-inner">01</div>
//         </div>

//         <div className="holo-floating-object holo-object-two">
//           <div className="holo-object-inner">DG</div>
//         </div>

//         <div className="holo-floating-object holo-object-three">
//           <div className="holo-object-inner">∞</div>
//         </div>

//         {/* ENERGY BEAMS */}

//         <div className="holo-laser holo-laser-one" />
//         <div className="holo-laser holo-laser-two" />
//         <div className="holo-laser holo-laser-three" />

//         {/* DIGITAL PARTICLES */}

//         <div className="holo-particle-field holo-particles-one" />
//         <div className="holo-particle-field holo-particles-two" />
//         <div className="holo-particle-field holo-particles-three" />

//         {/* SCANNING EFFECT */}

//         <div className="holo-scanner" />

//         {/* LIGHT WAVES */}

//         <div className="holo-wave holo-wave-one" />
//         <div className="holo-wave holo-wave-two" />

//         {/* VIGNETTE */}

//         <div className="holo-vignette" />

//       </div>
//     </>
//   );
// }

// // ==========================================
// // INTRO COMPONENT
// // ==========================================

// function Intro({ onEnter }) {
//   const [leaving, setLeaving] = useState(false);

//   function enter() {
//     if (leaving) return;

//     setLeaving(true);

//     setTimeout(onEnter, 900);
//   }

//   return (
//     <div className={`intro ${leaving ? "intro-hide" : ""}`}>

//       <div className="intro-grid" />
//       <div className="intro-particles" />
//       <div className="intro-scan" />

//       <div className="intro-corner intro-corner-1">
//         DG / 001
//       </div>

//       <div className="intro-corner intro-corner-2">
//         DEVELOPER.OS
//       </div>

//       <div className="intro-corner intro-corner-3">
//         BUILDING • LEARNING • CREATING
//       </div>

//       <div className="intro-corner intro-corner-4">
//         2026
//       </div>

//       <div className="intro-main">

//         <div className="intro-status">
//           <span />
//           SYSTEM ONLINE
//         </div>

//         <div className="intro-name">
//           <div>GOLLA</div>
//           <div>DHEERAJ</div>
//         </div>

//         <div className="intro-divider" />

//         <div className="intro-title">
//           MERN STACK DEVELOPER
//         </div>

//         <div className="intro-tech">
//           <span>REACT</span>
//           <span>NODE.JS</span>
//           <span>EXPRESS</span>
//           <span>MONGODB</span>
//           <span>JAVASCRIPT</span>
//           <span>FASTAPI</span>
//           <span>AI</span>
//           <span>DSA</span>
//         </div>

//         <div className="intro-orb">
//           <div className="orb-ring orb-ring-1" />
//           <div className="orb-ring orb-ring-2" />
//           <div className="orb-ring orb-ring-3" />

//           <div className="orb-core">
//             DG
//           </div>
//         </div>

//         <div className="intro-identity">
//           <span>IDENTITY VERIFIED</span>
//           <strong>DHEERAJ GOLLA</strong>
//         </div>

//         <button
//           className="enter-btn"
//           onClick={enter}
//           disabled={leaving}
//         >
//           ENTER PORTFOLIO
//           <b>→</b>
//         </button>

//       </div>
//     </div>
//   );
// }

// // ==========================================
// // PROFILE CARD
// // ==========================================

// function ProfileCard() {
//   const [open, setOpen] = useState(false);

//   const [photo, setPhoto] = useState(() => {
//     try {
//       return (
//         window.localStorage.getItem(
//           "portfolio-profile-photo"
//         ) || ""
//       );
//     } catch {
//       return "";
//     }
//   });

//   const [photoMessage, setPhotoMessage] = useState("");

//   function handlePhotoChange(event) {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.type.startsWith("image/")) {
//       setPhotoMessage("Please select an image file.");
//       event.target.value = "";
//       return;
//     }

//     if (file.size > 1.5 * 1024 * 1024) {
//       setPhotoMessage(
//         "Please choose an image smaller than 1.5 MB."
//       );

//       event.target.value = "";
//       return;
//     }

//     const reader = new FileReader();

//     reader.onload = () => {
//       const imageData = reader.result;

//       if (typeof imageData !== "string") {
//         setPhotoMessage(
//           "The image could not be read. Please try another file."
//         );

//         event.target.value = "";
//         return;
//       }

//       try {
//         window.localStorage.setItem(
//           "portfolio-profile-photo",
//           imageData
//         );

//         setPhoto(imageData);

//         setPhotoMessage(
//           "Profile photo updated in this browser."
//         );
//       } catch {
//         setPhotoMessage(
//           "The photo could not be saved. Please try a smaller image."
//         );
//       }

//       event.target.value = "";
//     };

//     reader.onerror = () => {
//       setPhotoMessage(
//         "The image could not be read. Please try another file."
//       );

//       event.target.value = "";
//     };

//     reader.readAsDataURL(file);
//   }

//   function removePhoto() {
//     try {
//       window.localStorage.removeItem(
//         "portfolio-profile-photo"
//       );
//     } catch {
//       // Keep default initials.
//     }

//     setPhoto("");
//     setPhotoMessage("Profile photo removed.");
//   }

//   if (!open) {
//     return (
//       <div
//         className="profile-trigger"
//         onClick={() => setOpen(true)}
//       >
//         <div className="profile-photo-placeholder">
//           {photo ? (
//             <img
//               src={photo}
//               alt="Dheeraj Golla"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "50%",
//                 position: "relative",
//                 zIndex: 1
//               }}
//             />
//           ) : (
//             "DG"
//           )}
//         </div>

//         <div className="profile-hint">
//           <span>+</span>
//           CLICK TO EXPLORE
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="profile-panel">

//       <button
//         className="profile-close"
//         onClick={() => setOpen(false)}
//         aria-label="Close profile"
//       >
//         ×
//       </button>

//       <div className="profile-photo-column">

//         <div className="profile-panel-photo">
//           {photo ? (
//             <img
//               src={photo}
//               alt="Dheeraj Golla"
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "20px",
//                 display: "block"
//               }}
//             />
//           ) : (
//             "DG"
//           )}
//         </div>

//         <div
//           className="profile-photo-controls"
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "flex-start",
//             gap: "9px",
//             marginTop: "14px"
//           }}
//         >
//           <label
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               justifyContent: "center",
//               padding: "10px 13px",
//               border: "1px solid rgba(34, 211, 238, 0.55)",
//               borderRadius: "8px",
//               background: "rgba(34, 211, 238, 0.08)",
//               color: "#67e8f9",
//               fontSize: "9px",
//               fontWeight: 700,
//               letterSpacing: "0.12em",
//               cursor: "pointer"
//             }}
//           >
//             {photo
//               ? "CHANGE PROFILE PHOTO"
//               : "ADD PROFILE PHOTO"}

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePhotoChange}
//               aria-label="Choose a profile photo"
//               style={{ display: "none" }}
//             />
//           </label>

//           {photo && (
//             <button
//               type="button"
//               onClick={removePhoto}
//               style={{
//                 padding: "7px 10px",
//                 border: "1px solid rgba(248, 113, 113, 0.45)",
//                 borderRadius: "7px",
//                 background: "transparent",
//                 color: "#fca5a5",
//                 fontSize: "9px",
//                 letterSpacing: "0.1em",
//                 cursor: "pointer"
//               }}
//             >
//               REMOVE PHOTO
//             </button>
//           )}

//           {photoMessage && (
//             <small
//               role="status"
//               style={{
//                 maxWidth: "210px",
//                 color: "#94a3b8",
//                 fontSize: "10px",
//                 lineHeight: 1.5
//               }}
//             >
//               {photoMessage}
//             </small>
//           )}
//         </div>
//       </div>

//       <div className="profile-info">

//         <span className="profile-label">
//           DEVELOPER PROFILE
//         </span>

//         <h3>DHEERAJ GOLLA</h3>

//         <p className="profile-role">
//           MERN STACK DEVELOPER
//         </p>

//         <div className="profile-data">

//           <div>
//             <span>EDUCATION</span>
//             <strong>B.Tech CSE</strong>
//           </div>

//           <div>
//             <span>FOCUS</span>
//             <strong>Full Stack Development</strong>
//           </div>

//           <div>
//             <span>SPECIALIZATION</span>
//             <strong>MERN + AI</strong>
//           </div>

//           <div>
//             <span>STATUS</span>

//             <strong className="status-online">
//               ● OPEN TO INTERNSHIPS
//             </strong>
//           </div>

//         </div>

//         <div className="profile-links">

//           <a
//             href={GITHUB_URL}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaGithub />
//             GitHub
//           </a>

//           <a
//             href={LINKEDIN_URL}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaLinkedin />
//             LinkedIn
//           </a>

//         </div>
//       </div>
//     </div>
//   );
// }

// // ==========================================
// // CONTACT FORM
// // ==========================================

// function ContactForm() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const [status, setStatus] = useState({
//     type: "",
//     message: ""
//   });

//   function handleChange(event) {
//     const { name, value } = event.target;

//     setForm((previous) => ({
//       ...previous,
//       [name]: value
//     }));
//   }

//   async function handleSubmit(event) {
//     event.preventDefault();

//     setLoading(true);

//     setStatus({
//       type: "",
//       message: ""
//     });

//     try {
//       const API_URL =
//         import.meta.env.VITE_API_URL ||
//         "http://localhost:5000";

//       const response = await fetch(
//         `${API_URL}/api/contact`,
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json"
//           },

//           body: JSON.stringify(form)
//         }
//       );

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message || "Message sending failed."
//         );
//       }

//       setStatus({
//         type: "success",
//         message: result.message
//       });

//       setForm({
//         name: "",
//         email: "",
//         subject: "",
//         message: ""
//       });

//     } catch (error) {
//       setStatus({
//         type: "error",
//         message:
//           error.message ||
//           "Something went wrong. Please try again."
//       });

//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form
//       className="contact-form"
//       onSubmit={handleSubmit}
//     >

//       <h3>Send Me a Message</h3>

//       <input
//         type="text"
//         name="name"
//         placeholder="Your Name"
//         value={form.name}
//         onChange={handleChange}
//         maxLength="80"
//         required
//       />

//       <input
//         type="email"
//         name="email"
//         placeholder="Your Email Address"
//         value={form.email}
//         onChange={handleChange}
//         maxLength="254"
//         required
//       />

//       <input
//         type="text"
//         name="subject"
//         placeholder="Subject"
//         value={form.subject}
//         onChange={handleChange}
//         maxLength="120"
//         required
//       />

//       <textarea
//         name="message"
//         placeholder="Write your message here..."
//         value={form.message}
//         onChange={handleChange}
//         maxLength="5000"
//         rows="6"
//         required
//       />

//       <button
//         type="submit"
//         disabled={loading}
//       >
//         {loading ? "SENDING..." : "SEND MESSAGE →"}
//       </button>

//       {status.message && (
//         <p
//           className={`contact-feedback ${status.type}`}
//           role="status"
//         >
//           {status.message}
//         </p>
//       )}

//     </form>
//   );
// }


// // ==========================================
// // PUBLIC RESUME DOWNLOAD BUTTON
// // ==========================================

// function ResumeDownloadButton() {
//   const [available, setAvailable] = useState(false);

//   useEffect(() => {
//     const API_URL = (
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000"
//     ).replace(/\/$/, "");

//     let cancelled = false;

//     async function checkResume() {
//       try {
//         const response = await fetch(
//           `${API_URL}/api/resume`
//         );

//         const result = await response.json();

//         if (!cancelled && response.ok) {
//           setAvailable(result.hasResume === true);
//         }
//       } catch (error) {
//         console.error("Resume availability error:", error);
//       }
//     }

//     checkResume();

//     return () => {
//       cancelled = true;
//     };
//   }, []);

//   if (!available) return null;

//   const API_URL = (
//     import.meta.env.VITE_API_URL ||
//     "http://localhost:5000"
//   ).replace(/\/$/, "");

//   return (
//     <a
//       href={`${API_URL}/api/resume/download`}
//       className="resume-download-link"
//     >
//       DOWNLOAD MY CV ↓
//     </a>
//   );
// }


// // ==========================================
// // MAIN APP COMPONENT
// // ==========================================

// export default function App() {

//   const [intro, setIntro] = useState(true);

//   const [theme, setTheme] = useState("cyber");

//   const [activeProject, setActiveProject] = useState(null);

//   // ==========================================
//   // PROJECTS
//   // ==========================================

//   // const projects = [
//   //   {
//   //     id: 1,
//   //     title: "Vault",
//   //     type: "DISTRIBUTED STORAGE",

//   //     description:
//   //       "Distributed object storage system focused on replica integrity, self-healing, version consistency, quorum behavior and network fault recovery.",

//   //     tech: [
//   //       "Go",
//   //       "Distributed Systems",
//   //       "SHA-256",
//   //       "HTTP",
//   //       "Docker"
//   //     ],

//   //     icon: <SiGo />,

//   //     github: GITHUB_URL
//   //   },

//   //   {
//   //     id: 2,
//   //     title: "Paw-Mart",
//   //     type: "PET E-COMMERCE",

//   //     description:
//   //       "A full-stack pet marketplace for browsing and purchasing dogs, featuring a responsive React interface, user authentication, and a Node.js and Express backend connected to MongoDB.",

//   //     tech: [
//   //       "React",
//   //       "React Router",
//   //       "Node.js",
//   //       "Express.js",
//   //       "MongoDB"
//   //     ],

//   //     icon: <FaReact />,

//   //     github: GITHUB_URL
//   //   },

//   //   {
//   //     id: 3,
//   //     title: "Health Predict",
//   //     type: "HEALTH + ML",

//   //     description:
//   //       "Health prediction platform designed to provide data-driven health insights through a modern web interface.",

//   //     tech: [
//   //       "React",
//   //       "Node.js",
//   //       "MongoDB",
//   //       "ML"
//   //     ],

//   //     icon: <FaDatabase />,

//   //     github: GITHUB_URL
//   //   },

//   //   {
//   //     id: 4,
//   //     title: "Dynamic Gift Store",
//   //     type: "E-COMMERCE",

//   //     description:
//   //       "Responsive full-stack shopping platform with product browsing, authentication and a modern responsive interface.",

//   //     tech: [
//   //       "React",
//   //       "Node.js",
//   //       "Express",
//   //       "MongoDB"
//   //     ],

//   //     icon: <FaCode />,

//   //     github:
//   //       "https://github.com/DHEERAJ565/myproject1"
//   //   }
//   // ];


// const [projects, setProjects] = useState([]);
// const [projectsLoading, setProjectsLoading] = useState(true);

// useEffect(() => {
//   let cancelled = false;

//   async function fetchProjects() {
//     const API_URL = (
//       import.meta.env.VITE_API_URL || "http://localhost:5000"
//     ).replace(/\/$/, "");

//     try {
//       const response = await fetch(`${API_URL}/api/projects`);

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to fetch projects.");
//       }

//       if (!cancelled) {
//         const formattedProjects = (result.projects || []).map(
//           (project, index) => {
//             const title = project.title.toLowerCase();

//             let icon = <FaCode />;

//             if (title.includes("vault")) {
//               icon = <SiGo />;
//             } else if (title.includes("paw")) {
//               icon = <FaReact />;
//             } else if (title.includes("health")) {
//               icon = <FaDatabase />;
//             }

//             const image = project.image || "";

//             return {
//               ...project,
//               id: project._id || index,
//               icon,
//               image:
//                 image.startsWith("/uploads/")
//                   ? `${API_URL}${image}`
//                   : image,
//               github: project.github || ""
//             };
//           }
//         );

//         setProjects(formattedProjects);
//       }
//     } catch (error) {
//       console.error("Projects loading error:", error);
//     } finally {
//       if (!cancelled) {
//         setProjectsLoading(false);
//       }
//     }
//   }

//   fetchProjects();

//   return () => {
//     cancelled = true;
//   };
// }, []);


//   // ==========================================
//   // SKILLS
//   // ==========================================

//   // const skills = [
//   //   {
//   //     name: "React",
//   //     icon: <FaReact />,
//   //     type: "Frontend"
//   //   },

//   //   {
//   //     name: "JavaScript",
//   //     icon: <FaJs />,
//   //     type: "Language"
//   //   },

//   //   {
//   //     name: "Node.js",
//   //     icon: <FaNodeJs />,
//   //     type: "Backend"
//   //   },

//   //   {
//   //     name: "Express",
//   //     icon: <SiExpress />,
//   //     type: "Backend"
//   //   },

//   //   {
//   //     name: "MongoDB",
//   //     icon: <SiMongodb />,
//   //     type: "Database"
//   //   },

//   //   {
//   //     name: "Tailwind",
//   //     icon: <SiTailwindcss />,
//   //     type: "UI"
//   //   },

//   //   {
//   //     name: "FastAPI",
//   //     icon: <SiFastapi />,
//   //     type: "Python"
//   //   },

//   //   {
//   //     name: "Docker",
//   //     icon: <SiDocker />,
//   //     type: "DevOps"
//   //   },

//   //   {
//   //     name: "HTML",
//   //     icon: <FaHtml5 />,
//   //     type: "Frontend"
//   //   },

//   //   {
//   //     name: "CSS",
//   //     icon: <FaCss3Alt />,
//   //     type: "Frontend"
//   //   },

//   //   {
//   //     name: "Server",
//   //     icon: <FaServer />,
//   //     type: "Backend"
//   //   }
//   // ];
    

//     const [skills, setSkills] = useState([]);

// const [skillsLoading, setSkillsLoading] = useState(true);

//  useEffect(() => {
//   let cancelled = false;

//   async function fetchSkills() {
//     const API_URL = (
//       import.meta.env.VITE_API_URL ||
//       "http://localhost:5000"
//     ).replace(/\/$/, "");

//     try {
//       const response = await fetch(
//         `${API_URL}/api/skills`
//       );

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           result.message || "Unable to retrieve skills."
//         );
//       }

//       const iconMap = {
//         react: <FaReact />,
//         javascript: <FaJs />,
//         node: <FaNodeJs />,
//         express: <SiExpress />,
//         mongodb: <SiMongodb />,
//         tailwind: <SiTailwindcss />,
//         fastapi: <SiFastapi />,
//         docker: <SiDocker />,
//         html: <FaHtml5 />,
//         css: <FaCss3Alt />,
//         server: <FaServer />,
//         code: <FaCode />
//       };

//       if (!cancelled) {
//         const formattedSkills = (result.skills || []).map(
//           (skill) => ({
//             ...skill,
//             icon: iconMap[skill.icon] || <FaCode />
//           })
//         );

//         setSkills(formattedSkills);
//       }

//     } catch (error) {
//       console.error("Skills loading error:", error);

//     } finally {
//       if (!cancelled) {
//         setSkillsLoading(false);
//       }
//     }
//   }

//   fetchSkills();

//   return () => {
//     cancelled = true;
//   };
// }, []);




//   // ==========================================
//   // THEME SWITCHER
//   // ==========================================

//   function cycleTheme() {
//     setTheme((current) => {
//       if (current === "cyber") return "matrix";

//       if (current === "matrix") return "minimal";

//       return "cyber";
//     });
//   }

//   // ==========================================
//   // BODY CLASS
//   // ==========================================

//   useEffect(() => {
//     document.body.classList.toggle(
//       "portfolio-active",
//       !intro
//     );

//     return () => {
//       document.body.classList.remove("portfolio-active");
//     };
//   }, [intro]);

//   // ==========================================
//   // ADMIN ROUTE
//   // ==========================================

//   if (
//     window.location.pathname === "/admin" ||
//     window.location.pathname.startsWith("/admin/")
//   ) {
//     return <AdminDashboard />;
//   }

//   // ==========================================
//   // INTRO SCREEN
//   // ==========================================

//   if (intro) {
//     return (
//       <Intro
//         onEnter={() => setIntro(false)}
//       />
//     );
//   }

//   // ==========================================
//   // MAIN PORTFOLIO
//   // ==========================================

//   return (
//     <div className={`portfolio ${theme} holo-portfolio`}>

//       {/* HOLOGRAPHIC BACKGROUND */}

//       <HolographicBackground />

//       {/* CUSTOM CURSOR */}

//       <CustomCursor />

//       {/* NAVBAR */}

//       <nav className="navbar">
//         <div className="nav-inner">

//           <a href="#home" className="logo">
//             DG<span>.</span>
//           </a>

//           <div className="nav-links">

//             <a href="#home" style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}  >Home</a>

//             <a href="#about"  style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}>About</a>

//             <a href="#skills"  style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}>Skills</a>

//             <a href="#projects"  style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}>Projects</a>

//             <a href="#terminal"  style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}>Terminal</a>

//             <a href="#contact" style={{
//     color: "#67e8f9",
//     fontWeight: "700",
//     border: "1px solid rgba(34, 211, 238, 0.45)",
//     padding: "8px 12px",
//     borderRadius: "7px",
//     background: "rgba(34, 211, 238, 0.08)"
//   }}>Contact</a>

//             {/* ADMIN DASHBOARD */}

//             <a
//               href="/admin"
//               className="dashboard-nav-link"
//             >
//               DASHBOARD ↗
//             </a>

//           </div>

//           <button
//             type="button"
//             className="theme-button"
//             onClick={cycleTheme}
//             title="Change portfolio theme"
//           >
//             {theme === "cyber"
//               ? "CYBER MODE"
//               : theme === "matrix"
//               ? "MATRIX MODE"
//               : "MINIMAL MODE"}

//             <span style={{ marginLeft: "8px" }}>
//               ↻
//             </span>
//           </button>

//         </div>
//       </nav>

//       {/* ======================================
//           MAIN CONTENT
//       ====================================== */}

//       <main>

//         {/* HOME SECTION */}

//         <section
//           id="home"
//           className="hero-section"
//         >
//           <div className="hero-background" />

//           <div className="hero-grid">

//             <div className="hero-content">

//               <div className="developer-status">
//                 <span />
//                 DEVELOPER MODE ACTIVE
//               </div>

//               <div className="hero-small">
//                 HELLO, I'M
//               </div>

//               <h1>
//                 DHEERAJ
//                 <span>GOLLA</span>
//               </h1>

//               <h2>
//                 MERN STACK DEVELOPER
//               </h2>

//               <p>
//                 I build modern full-stack applications,
//                 interactive digital experiences and
//                 AI-integrated software systems.
//               </p>

//               <div className="hero-buttons">

//                 <a href="#projects">
//                   EXPLORE WORK
//                 </a>

//                 <a href="#terminal">
//                   OPEN TERMINAL
//                 </a>
                 
//                <ResumeDownloadButton />

//               </div>

//               <div className="social-links">

//                 <a
//                   href={GITHUB_URL}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="GitHub"
//                 >
//                   <FaGithub />
//                 </a>

//                 <a
//                   href={LINKEDIN_URL}
//                   target="_blank"
//                   rel="noreferrer"
//                   aria-label="LinkedIn"
//                 >
//                   <FaLinkedin />
//                 </a>

//               </div>
//             </div>

//             <div className="hero-profile">

//               <div className="hero-hologram">
//                 <Hologram />
//               </div>

//               <div className="hero-profile-card">
//                 <ProfileCard />
//               </div>

//             </div>
//           </div>
//         </section>

//         {/* ABOUT SECTION */}

//         <section
//           id="about"
//           className="section"
//         >
//           <div className="section-container">

//             <div className="section-label">
//               01 / ABOUT
//             </div>

//             <h2 className="section-title">
//               Building ideas into
//               <span> experiences.</span>
//             </h2>

//             <div className="about-grid">

//               <div className="about-text">

//                 <p>
//                   I'm a Computer Science student focused on
//                   full-stack development and modern web
//                   technologies.
//                 </p>

//                 <p>
//                   I enjoy creating practical applications,
//                   experimenting with new technologies and
//                   solving real-world problems through software.
//                 </p>

//                 <p>
//                   My current focus is building strong MERN
//                   development skills while exploring AI,
//                   distributed systems and scalable applications.
//                 </p>

//               </div>

//               <div className="about-stats">

//                 <div>
//                   <strong>04</strong>
//                   <span>PROJECTS</span>
//                 </div>

//                 <div>
//                   <strong>MERN</strong>
//                   <span>PRIMARY STACK</span>
//                 </div>

//                 <div>
//                   <strong>AI</strong>
//                   <span>EXPLORING</span>
//                 </div>

//                 <div>
//                   <strong>∞</strong>
//                   <span>LEARNING</span>
//                 </div>

//               </div>
//             </div>
//           </div>
//         </section>

//         {/* SKILLS SECTION */}

//         <section
//           id="skills"
//           className="section"
//         >
//           <div className="section-container">

//             <div className="section-label">
//               02 / SKILLS
//             </div>

//             <h2 className="section-title">
//               My <span>stack.</span>
//             </h2>

//             <div className="constellation-wrapper">
//               <SkillConstellation />
//             </div>

//             <div className="skills-grid">

//               {/* {skills.map((skill) => (
//                 <div
//                   key={skill.name}
//                   className="skill-card"
//                 >
//                   <div className="skill-icon">
//                     {skill.icon}
//                   </div>

//                   <div>
//                     <h3>{skill.name}</h3>
//                     <span>{skill.type}</span>
//                   </div>

//                 </div>
//               ))} */}

//                <div className="skills-grid">

//   {skillsLoading ? (
//     <p>Loading skills...</p>
//   ) : (
//     skills.map((skill) => (
//       <div
//         key={skill._id}
//         className="skill-card"
//       >
//         <div className="skill-icon">
//           {skill.icon}
//         </div>

//         <div>
//           <h3>{skill.name}</h3>
//           <span>{skill.type}</span>
//         </div>
//       </div>
//     ))
//   )}

// </div>

//             </div>
//           </div>
//         </section>

//         {/* PROJECTS SECTION */}

//         <section
//           id="projects"
//           className="section"
//         >
//           <div className="section-container">

//             <div className="section-label">
//               03 / PROJECTS
//             </div>

//             <h2 className="section-title">
//               Things I've <span>built.</span>
//             </h2>

//             <div className="projects-grid">

//               {projects.map((project) => (

//                 <div
//                   key={project.id}
//                   className={`project-card ${
//                     activeProject === project.id
//                       ? "project-active"
//                       : ""
//                   }`}
//                   onMouseEnter={() =>
//                     setActiveProject(project.id)
//                   }
//                   onMouseLeave={() =>
//                     setActiveProject(null)
//                   }
//                 >

//                   <div className="project-image-wrapper">

//                     {/* <img
//                       src={
//                         project.id === 1
//                           ? "/vault.png"
//                           : project.id === 2
//                           ? "/paw-mart.png"
//                           : project.id === 3
//                           ? "/health-predict.png"
//                           : "/gift-store.png"
//                       }
//                       alt={`${project.title} project preview`}
//                       className="project-image"
//                     /> */}

//                     <img
//   src={
//     project.image ||
//     (
//       project.title === "Vault"
//         ? "/vault.png"
//         : project.title === "Paw-Mart"
//         ? "/paw-mart.png"
//         : project.title === "Health Predict"
//         ? "/health-predict.png"
//         : "/gift-store.png"
//     )
//   }
//   alt={`${project.title} project preview`}
//   className="project-image"
// />


//                     <div className="project-image-overlay">
//                       <span>PROJECT PREVIEW</span>
//                       <strong>0{project.id}</strong>
//                     </div>

//                   </div>

//                   <div className="project-content">

//                     <div className="project-top">

//                       <div className="project-icon">
//                         {project.icon}
//                       </div>

//                       <div className="project-number">
//                         0{project.id}
//                       </div>

//                     </div>

//                     <div className="project-type">
//                       {project.type}
//                     </div>

//                     <h3>{project.title}</h3>

//                     <p>{project.description}</p>

//                     <div className="project-tech">

//                       {project.tech.map((tech) => (
//                         <span key={tech}>
//                           {tech}
//                         </span>
//                       ))}

//                     </div>

//                     <a
//                       href={project.github}
//                       target="_blank"
//                       rel="noreferrer"
//                     >
//                       VIEW PROJECT
//                       <b>→</b>
//                     </a>

//                   </div>
//                 </div>

//               ))}

//             </div>
//           </div>
//         </section>

//         {/* ARCHITECTURE SECTION */}

//         <section className="section architecture-section">
//           <div className="section-container">

//             <div className="section-label">
//               04 / ARCHITECTURE
//             </div>

//             <h2 className="section-title">
//               How I <span>build.</span>
//             </h2>

//             <div className="architecture-container">
//               <Architecture />
//             </div>

//           </div>
//         </section>

//         {/* TERMINAL SECTION */}

//         <section
//           id="terminal"
//           className="section terminal-section"
//         >
//           <div className="section-container">

//             <div className="section-label">
//               05 / TERMINAL
//             </div>

//             <h2 className="section-title">
//               Enter my <span>workspace.</span>
//             </h2>

//             <div className="terminal-container">
//               <Terminal />
//             </div>

//           </div>
//         </section>

//         {/* CONTACT SECTION */}

//         <section
//           id="contact"
//           className="contact-section"
//         >
//           <div className="contact-grid" />

//           <div className="contact-content">

//             <div className="section-label">
//               06 / CONTACT
//             </div>

//             <h2>
//               Let's build
//               <span> something.</span>
//             </h2>

//             <p>
//               Have an idea, project or opportunity?
//               Let's create something useful together.
//             </p>

//             <ContactForm />

//             <div
//               className="contact-details"
//               style={{
//                 display: "flex",
//                 flexWrap: "wrap",
//                 justifyContent: "center",
//                 gap: "18px",
//                 marginTop: "35px"
//               }}
//             >

//               {/* EMAIL CARD */}

//               <a
//                 href={`mailto:${CONTACT_EMAIL}`}
//                 style={contactCardStyle}
//               >
//                 <span style={{ fontSize: "24px" }}>
//                   ✉
//                 </span>

//                 <div>
//                   <small style={contactCardLabelStyle}>
//                     EMAIL ME
//                   </small>

//                   <strong style={contactCardValueStyle}>
//                     {CONTACT_EMAIL}
//                   </strong>
//                 </div>
//               </a>

//               {/* LINKEDIN CARD */}

//               <a
//                 href={LINKEDIN_URL}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={contactCardStyle}
//               >
//                 <FaLinkedin style={{ fontSize: "24px" }} />

//                 <div>
//                   <small style={contactCardLabelStyle}>
//                     LINKEDIN
//                   </small>

//                   <strong style={contactCardValueStyle}>
//                     Connect with me
//                   </strong>
//                 </div>
//               </a>

//               {/* GITHUB CARD */}

//               <a
//                 href={GITHUB_URL}
//                 target="_blank"
//                 rel="noreferrer"
//                 style={contactCardStyle}
//               >
//                 <FaGithub style={{ fontSize: "24px" }} />

//                 <div>
//                   <small style={contactCardLabelStyle}>
//                     GITHUB
//                   </small>

//                   <strong style={contactCardValueStyle}>
//                     Explore my projects
//                   </strong>
//                 </div>
//               </a>

//             </div>

//             <div className="contact-buttons">

//               <a href={`mailto:${CONTACT_EMAIL}`}>
//                 SEND ME AN EMAIL
//               </a>

//               <a
//                 href={LINKEDIN_URL}
//                 target="_blank"
//                 rel="noreferrer"
//               >
//                 CONNECT ON LINKEDIN
//               </a>

//             </div>
//           </div>
//         </section>

//       </main>

//       {/* FOOTER */}

//       <footer>

//         <div>
//           DHEERAJ GOLLA
//         </div>

//         <span>
//           MERN STACK DEVELOPER
//         </span>

//         <div className="footer-socials">

//           <a
//             href={GITHUB_URL}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaGithub />
//           </a>

//           <a
//             href={LINKEDIN_URL}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <FaLinkedin />
//           </a>

//         </div>

//       </footer>

//       {/* AI PORTFOLIO ASSISTANT */}

//       <PortfolioAssistant />

//     </div>
//   );
// }

// // ==========================================
// // HOLOGRAPHIC BACKGROUND CSS
// // ==========================================

// const holographicStyles = `

// /* ======================================
//    MAIN BACKGROUND
// ====================================== */

// .holo-portfolio {
//   position: relative;
//   isolation: isolate;
//   overflow: clip;
// }

// .holo-background {
//   position: fixed;
//   inset: 0;
//   z-index: 0;
//   pointer-events: none;
//   overflow: hidden;

//   background:
//     radial-gradient(
//       ellipse at 12% 15%,
//       rgba(0, 221, 255, 0.12),
//       transparent 35%
//     ),
//     radial-gradient(
//       ellipse at 85% 20%,
//       rgba(155, 75, 255, 0.13),
//       transparent 38%
//     ),
//     radial-gradient(
//       ellipse at 55% 90%,
//       rgba(0, 255, 180, 0.08),
//       transparent 40%
//     ),
//     #050711;
// }

// /* Keep portfolio content in front of background */

// .holo-portfolio > main,
// .holo-portfolio > footer {
//   position: relative;
//   z-index: 2;
// }

// .holo-portfolio > .navbar {
//   z-index: 20;
// }

// /* ======================================
//    DIGITAL GRID
// ====================================== */

// .holo-grid {
//   position: absolute;
//   inset: 0;

//   background-image:
//     linear-gradient(
//       rgba(86, 229, 242, 0.045) 1px,
//       transparent 1px
//     ),
//     linear-gradient(
//       90deg,
//       rgba(86, 229, 242, 0.045) 1px,
//       transparent 1px
//     );

//   background-size: 55px 55px;

//   mask-image:
//     radial-gradient(
//       ellipse at center,
//       black 10%,
//       transparent 85%
//     );

//   opacity: 0.8;
// }

// /* ======================================
//    NEBULA LIGHT
// ====================================== */

// .holo-nebula {
//   position: absolute;
//   width: 480px;
//   height: 480px;

//   border-radius: 50%;

//   filter: blur(110px);

//   opacity: 0.18;

//   animation: nebulaFloat 18s ease-in-out infinite alternate;
// }

// .holo-nebula-cyan {
//   background: #00e5ff;
//   top: -230px;
//   left: -140px;
// }

// .holo-nebula-purple {
//   background: #853cff;
//   top: 10%;
//   right: -220px;
//   animation-delay: -5s;
// }

// .holo-nebula-blue {
//   background: #126dff;
//   bottom: -260px;
//   left: 24%;
//   animation-delay: -9s;
// }

// .holo-nebula-green {
//   background: #00ffa6;
//   bottom: 10%;
//   right: -300px;
//   opacity: 0.10;
//   animation-delay: -12s;
// }

// @keyframes nebulaFloat {
//   0% {
//     transform: translate3d(0, 0, 0) scale(1);
//   }

//   100% {
//     transform: translate3d(80px, 70px, 0) scale(1.25);
//   }
// }

// /* ======================================
//    MAIN HOLOGRAM STRUCTURE
// ====================================== */

// .holo-main-structure {
//   position: absolute;

//   width: 380px;
//   height: 380px;

//   top: 23%;
//   right: 7%;

//   display: grid;
//   place-items: center;

//   opacity: 0.45;

//   transform-style: preserve-3d;

//   animation: holoMainFloat 12s ease-in-out infinite;
// }

// .holo-ring {
//   position: absolute;

//   inset: 0;

//   border-radius: 50%;

//   border: 1px solid rgba(86, 229, 242, 0.38);

//   box-shadow:
//     0 0 25px rgba(86, 229, 242, 0.08),
//     inset 0 0 25px rgba(86, 229, 242, 0.04);
// }

// .holo-ring-one {
//   animation: holoRotate 19s linear infinite;
// }

// .holo-ring-two {
//   inset: 25px -25px;

//   border-color: rgba(167, 139, 250, 0.45);

//   transform: rotateX(65deg);

//   animation: holoRotateReverse 13s linear infinite;
// }

// .holo-ring-three {
//   inset: 65px;

//   border-style: dashed;

//   border-color: rgba(94, 230, 168, 0.4);

//   animation: holoRotate 25s linear infinite;
// }

// .holo-ring-four {
//   inset: 90px -5px;

//   border-color: rgba(86, 229, 242, 0.26);

//   transform: rotateY(65deg);

//   animation: holoRotateReverse 17s linear infinite;
// }

// /* CENTRAL CORE */

// .holo-ring-core {
//   width: 115px;
//   height: 115px;

//   display: grid;
//   place-items: center;

//   border-radius: 30px;

//   border: 1px solid rgba(86, 229, 242, 0.7);

//   background:
//     linear-gradient(
//       145deg,
//       rgba(12, 50, 75, 0.9),
//       rgba(45, 23, 81, 0.85)
//     );

//   box-shadow:
//     0 0 30px rgba(86, 229, 242, 0.22),
//     0 0 85px rgba(86, 229, 242, 0.10),
//     inset 0 0 35px rgba(86, 229, 242, 0.14);

//   animation: corePulse 4s ease-in-out infinite;
// }

// .holo-core-inner {
//   color: #b3faff;

//   font-size: 36px;
//   font-weight: 900;

//   letter-spacing: -4px;

//   text-shadow:
//     0 0 10px #56e5f2,
//     0 0 30px #56e5f2;
// }

// /* ENERGY DOTS */

// .holo-energy-dot {
//   position: absolute;

//   width: 9px;
//   height: 9px;

//   border-radius: 50%;

//   background: #56e5f2;

//   box-shadow:
//     0 0 12px #56e5f2,
//     0 0 30px #56e5f2;
// }

// .dot-one {
//   top: 10%;
//   left: 22%;
// }

// .dot-two {
//   bottom: 14%;
//   right: 20%;

//   background: #a78bfa;

//   box-shadow:
//     0 0 12px #a78bfa,
//     0 0 30px #a78bfa;
// }

// .dot-three {
//   right: 8%;
//   top: 48%;

//   background: #5ee6a8;

//   box-shadow:
//     0 0 12px #5ee6a8,
//     0 0 30px #5ee6a8;
// }

// /* ======================================
//    FLOATING HOLOGRAM OBJECTS
// ====================================== */

// .holo-floating-object {
//   position: absolute;

//   width: 85px;
//   height: 85px;

//   border: 1px solid rgba(86, 229, 242, 0.45);

//   border-radius: 23px;

//   background:
//     linear-gradient(
//       145deg,
//       rgba(86, 229, 242, 0.08),
//       rgba(167, 139, 250, 0.08)
//     );

//   backdrop-filter: blur(8px);

//   display: grid;
//   place-items: center;

//   color: #a5f7ff;

//   font-size: 20px;
//   font-weight: 900;

//   box-shadow:
//     0 0 25px rgba(86, 229, 242, 0.11),
//     inset 0 0 18px rgba(86, 229, 242, 0.08);
// }

// .holo-object-inner {
//   text-shadow: 0 0 15px #56e5f2;
// }

// .holo-object-one {
//   top: 18%;
//   left: 14%;

//   animation: floatingOne 9s ease-in-out infinite;
// }

// .holo-object-two {
//   top: 65%;
//   right: 19%;

//   width: 65px;
//   height: 65px;

//   border-color: rgba(167, 139, 250, 0.6);

//   color: #c7b3ff;

//   animation: floatingTwo 11s ease-in-out infinite;
// }

// .holo-object-three {
//   top: 45%;
//   left: 5%;

//   width: 55px;
//   height: 55px;

//   border-color: rgba(94, 230, 168, 0.5);

//   color: #8fffd0;

//   animation: floatingThree 13s ease-in-out infinite;
// }

// /* ======================================
//    LASER BEAMS
// ====================================== */

// .holo-laser {
//   position: absolute;

//   height: 2px;
//   width: 650px;

//   opacity: 0.45;

//   background:
//     linear-gradient(
//       90deg,
//       transparent,
//       #56e5f2,
//       #a78bfa,
//       transparent
//     );

//   filter: blur(1px);

//   box-shadow:
//     0 0 18px rgba(86, 229, 242, 0.5);
// }

// .holo-laser-one {
//   top: 27%;
//   left: 35%;

//   transform: rotate(-24deg);

//   animation: laserMove 10s ease-in-out infinite;
// }

// .holo-laser-two {
//   top: 70%;
//   left: -8%;

//   transform: rotate(17deg);

//   animation: laserMoveReverse 14s ease-in-out infinite;
// }

// .holo-laser-three {
//   top: 48%;
//   right: -20%;

//   transform: rotate(-48deg);

//   opacity: 0.25;

//   animation: laserMove 17s ease-in-out infinite;
// }

// /* ======================================
//    FLOATING PARTICLES
// ====================================== */

// .holo-particle-field {
//   position: absolute;
//   inset: -20%;

//   opacity: 0.55;

//   background-image:
//     radial-gradient(
//       circle,
//       rgba(86, 229, 242, 0.85) 1px,
//       transparent 2px
//     ),
//     radial-gradient(
//       circle,
//       rgba(167, 139, 250, 0.75) 1px,
//       transparent 2px
//     ),
//     radial-gradient(
//       circle,
//       rgba(94, 230, 168, 0.7) 1px,
//       transparent 2px
//     );

//   background-size:
//     110px 110px,
//     170px 170px,
//     230px 230px;

//   background-position:
//     0 0,
//     45px 80px,
//     100px 30px;
// }

// .holo-particles-one {
//   animation: particlesUp 30s linear infinite;
// }

// .holo-particles-two {
//   opacity: 0.22;

//   animation: particlesDown 38s linear infinite;
// }

// .holo-particles-three {
//   opacity: 0.14;

//   animation: particlesUp 48s linear infinite;
// }

// /* ======================================
//    SCANNING EFFECT
// ====================================== */

// .holo-scanner {
//   position: absolute;

//   top: -30%;
//   left: 0;

//   width: 100%;
//   height: 180px;

//   opacity: 0.6;

//   background:
//     linear-gradient(
//       to bottom,
//       transparent,
//       rgba(86, 229, 242, 0.015),
//       rgba(86, 229, 242, 0.10),
//       transparent
//     );

//   animation: scannerMove 15s linear infinite;
// }

// /* ======================================
//    ENERGY WAVES
// ====================================== */

// .holo-wave {
//   position: absolute;

//   width: 100%;
//   height: 260px;

//   border-radius: 50%;

//   border-top: 1px solid rgba(86, 229, 242, 0.16);

//   filter: blur(1px);

//   opacity: 0.3;
// }

// .holo-wave-one {
//   bottom: -200px;

//   transform: rotate(-9deg);

//   animation: waveMove 12s ease-in-out infinite;
// }

// .holo-wave-two {
//   bottom: -230px;

//   border-color: rgba(167, 139, 250, 0.2);

//   transform: rotate(8deg);

//   animation: waveMoveReverse 15s ease-in-out infinite;
// }

// /* ======================================
//    VIGNETTE
// ====================================== */

// .holo-vignette {
//   position: absolute;
//   inset: 0;

//   background:
//     radial-gradient(
//       ellipse at center,
//       transparent 35%,
//       rgba(3, 5, 12, 0.38) 100%
//     );
// }

// /* ======================================
//    ANIMATIONS
// ====================================== */

// @keyframes holoRotate {
//   from {
//     transform: rotate(0deg);
//   }

//   to {
//     transform: rotate(360deg);
//   }
// }

// @keyframes holoRotateReverse {
//   from {
//     transform: rotate(360deg);
//   }

//   to {
//     transform: rotate(0deg);
//   }
// }

// @keyframes holoMainFloat {
//   0%, 100% {
//     transform: translate3d(0, 0, 0) rotate(0deg);
//   }

//   50% {
//     transform: translate3d(-20px, 25px, 0) rotate(8deg);
//   }
// }

// @keyframes corePulse {
//   0%, 100% {
//     box-shadow:
//       0 0 30px rgba(86, 229, 242, 0.22),
//       0 0 85px rgba(86, 229, 242, 0.10);
//   }

//   50% {
//     box-shadow:
//       0 0 50px rgba(86, 229, 242, 0.4),
//       0 0 110px rgba(167, 139, 250, 0.22);
//   }
// }

// @keyframes floatingOne {
//   0%, 100% {
//     transform: translateY(0) rotate(0deg);
//   }

//   50% {
//     transform: translateY(-40px) rotate(15deg);
//   }
// }

// @keyframes floatingTwo {
//   0%, 100% {
//     transform: translateY(0) rotate(0deg);
//   }

//   50% {
//     transform: translateY(35px) rotate(-20deg);
//   }
// }

// @keyframes floatingThree {
//   0%, 100% {
//     transform: translateY(0) rotate(0deg);
//   }

//   50% {
//     transform: translateY(-25px) rotate(35deg);
//   }
// }

// @keyframes laserMove {
//   0%, 100% {
//     translate: -60px 0;
//     opacity: 0.1;
//   }

//   50% {
//     translate: 100px 0;
//     opacity: 0.65;
//   }
// }

// @keyframes laserMoveReverse {
//   0%, 100% {
//     translate: 100px 0;
//     opacity: 0.1;
//   }

//   50% {
//     translate: -100px 0;
//     opacity: 0.6;
//   }
// }

// @keyframes particlesUp {
//   from {
//     background-position:
//       0 0,
//       45px 80px,
//       100px 30px;
//   }

//   to {
//     background-position:
//       0 -550px,
//       45px -750px,
//       100px -950px;
//   }
// }

// @keyframes particlesDown {
//   from {
//     transform: translateY(-100px);
//   }

//   to {
//     transform: translateY(200px);
//   }
// }

// @keyframes scannerMove {
//   from {
//     top: -200px;
//   }

//   to {
//     top: 120%;
//   }
// }

// @keyframes waveMove {
//   0%, 100% {
//     transform: translateX(-25px) rotate(-9deg);
//     opacity: 0.15;
//   }

//   50% {
//     transform: translateX(25px) rotate(-5deg);
//     opacity: 0.45;
//   }
// }

// @keyframes waveMoveReverse {
//   0%, 100% {
//     transform: translateX(30px) rotate(8deg);
//   }

//   50% {
//     transform: translateX(-30px) rotate(3deg);
//   }
// }

// /* ======================================
//    NAVBAR DASHBOARD LINK
// ====================================== */

// .dashboard-nav-link {
//   color: #67e8f9 !important;

//   font-weight: 700;

//   border: 1px solid rgba(34, 211, 238, 0.45);

//   padding: 8px 12px;

//   border-radius: 7px;

//   background: rgba(34, 211, 238, 0.08);

//   text-decoration: none;

//   transition: all 0.3s ease;
// }

// .dashboard-nav-link:hover {
//   background: rgba(34, 211, 238, 0.18);

//   box-shadow:
//     0 0 15px rgba(34, 211, 238, 0.20),
//     inset 0 0 15px rgba(34, 211, 238, 0.08);

//   transform: translateY(-2px);
// }

// /* ======================================
//    RESPONSIVE HOLOGRAM
// ====================================== */

// @media (max-width: 1000px) {
//   .holo-main-structure {
//     right: -120px;
//     opacity: 0.28;
//   }

//   .holo-object-one {
//     left: 5%;
//   }

//   .holo-object-two {
//     right: 7%;
//   }
// }

// @media (max-width: 650px) {
//   .holo-main-structure {
//     width: 250px;
//     height: 250px;

//     right: -130px;
//     top: 30%;

//     opacity: 0.22;
//   }

//   .holo-ring-core {
//     width: 75px;
//     height: 75px;

//     border-radius: 22px;
//   }

//   .holo-core-inner {
//     font-size: 26px;
//   }

//   .holo-floating-object {
//     width: 48px;
//     height: 48px;

//     border-radius: 13px;

//     font-size: 12px;
//   }

//   .holo-object-one {
//     top: 20%;
//     left: 3%;
//   }

//   .holo-object-two {
//     top: 68%;
//     right: 5%;
//   }

//   .holo-object-three {
//     top: 49%;
//     left: 3%;
//   }

//   .holo-nebula {
//     width: 300px;
//     height: 300px;

//     filter: blur(85px);
//     opacity: 0.12;
//   }

//   .holo-laser {
//     opacity: 0.18;
//   }

//   .holo-particle-field {
//     opacity: 0.18;
//   }

//   .holo-wave {
//     opacity: 0.14;
//   }
// }

// /* ======================================
//    ACCESSIBILITY
// ====================================== */

// @media (prefers-reduced-motion: reduce) {
//   .holo-background *,
//   .holo-background {
//     animation: none !important;
//     transition: none !important;
//   }
// }




// /* ======================================
//    DARK VIOLET HOLOGRAPHIC THEME
// ====================================== */

// html,
// body,
// #root {
//   min-height: 100%;
//   background: #0b0718 !important;
// }

// .holo-portfolio {
//   background:
//     radial-gradient(
//       ellipse at 15% 15%,
//       rgba(112, 59, 190, 0.22),
//       transparent 45%
//     ),
//     radial-gradient(
//       ellipse at 85% 30%,
//       rgba(50, 45, 160, 0.18),
//       transparent 45%
//     ),
//     linear-gradient(
//       135deg,
//       #10091f 0%,
//       #0b0718 45%,
//       #120a25 100%
//     ) !important;

//   color: #f4efff;
// }

// /* Make all major sections transparent */

// .holo-portfolio .hero-section,
// .holo-portfolio .section,
// .holo-portfolio .architecture-section,
// .holo-portfolio .terminal-section,
// .holo-portfolio .contact-section {
//   background-color: transparent !important;
// }

// /* Hero holographic lighting */

// .holo-portfolio .hero-background {
//   background:
//     radial-gradient(
//       circle at 70% 45%,
//       rgba(139, 92, 246, 0.18),
//       transparent 40%
//     ),
//     radial-gradient(
//       circle at 20% 80%,
//       rgba(34, 211, 238, 0.10),
//       transparent 40%
//     ) !important;
// }

// /* Stronger violet nebula */

// .holo-nebula-purple {
//   background: #9b4dff !important;
//   opacity: 0.25 !important;
// }

// .holo-nebula-blue {
//   background: #6347ff !important;
//   opacity: 0.19 !important;
// }

// .holo-nebula-cyan {
//   opacity: 0.19 !important;
// }

// /* More visible holographic structure */

// .holo-main-structure {
//   opacity: 0.65 !important;
// }

// .holo-ring-one {
//   border-color: rgba(167, 139, 250, 0.55) !important;
// }

// .holo-ring-two {
//   border-color: rgba(86, 229, 242, 0.55) !important;
// }

// .holo-ring-three {
//   border-color: rgba(167, 139, 250, 0.5) !important;
// }

// /* Beautiful glass cards */

// .holo-portfolio .project-card,
// .holo-portfolio .skill-card,
// .holo-portfolio .about-stats > div {
//   background: rgba(24, 15, 45, 0.65) !important;

//   border: 1px solid rgba(167, 139, 250, 0.20);

//   backdrop-filter: blur(16px);
//   -webkit-backdrop-filter: blur(16px);

//   box-shadow:
//     0 10px 35px rgba(0, 0, 0, 0.15),
//     inset 0 0 20px rgba(167, 139, 250, 0.025);
// }

// /* Violet hover glow */

// .holo-portfolio .project-card:hover,
// .holo-portfolio .skill-card:hover {
//   border-color: rgba(167, 139, 250, 0.65) !important;

//   box-shadow:
//     0 0 25px rgba(139, 92, 246, 0.18),
//     0 0 50px rgba(86, 229, 242, 0.07);

//   transform: translateY(-5px);
// }

// /* Violet headings */

// .holo-portfolio .section-title span,
// .holo-portfolio .contact-content h2 span {
//   color: #c4a5ff;
//   text-shadow: 0 0 25px rgba(167, 139, 250, 0.3);
// }

// /* Navbar */

// .holo-portfolio .navbar {
//   background: rgba(12, 7, 28, 0.78) !important;
//   backdrop-filter: blur(18px);
//   border-bottom: 1px solid rgba(167, 139, 250, 0.18);
// }

// /* Footer */

// .holo-portfolio footer {
//   background: rgba(10, 6, 23, 0.75) !important;
//   border-top: 1px solid rgba(167, 139, 250, 0.18);
// }

// /* Mobile adjustments */

// @media (max-width: 650px) {
//   .holo-main-structure {
//     opacity: 0.30 !important;
//   }

//   .holo-nebula {
//     opacity: 0.12 !important;
//   }
// }

// `;




import { useEffect, useState } from "react";

import {
  FaGithub,
  FaLinkedin,
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaDatabase,
  FaServer
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGo,
  SiFastapi,
  SiDocker
} from "react-icons/si";

import Hologram from "./components/Hologram";
import CustomCursor from "./components/CustomCursor";
import Terminal from "./components/Terminal";
import SkillConstellation from "./components/SkillConstellation";
import Architecture from "./components/Architecture";
import PortfolioAssistant from "./components/PortfolioAssistant";
import AdminDashboard from "./components/AdminDashboard";
import VisitorTracker from "./components/VisitorTracker";

// ==========================================
// CONFIGURATION
// ==========================================

const CONTACT_EMAIL = "dheeraj72064@gmail.com";

const GITHUB_URL = "https://github.com/DHEERAJ565";

const LINKEDIN_URL =
  "https://www.linkedin.com/in/golla-dheeraj";


// ==========================================
// CONTACT CARD STYLES
// ==========================================

const contactCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  padding: "18px 22px",
  minWidth: "220px",
  background: "rgba(34, 211, 238, 0.06)",
  border: "1px solid rgba(34, 211, 238, 0.3)",
  borderRadius: "12px",
  color: "inherit",
  textDecoration: "none",
  textAlign: "left"
};

const contactCardLabelStyle = {
  display: "block",
  marginBottom: "5px",
  fontSize: "10px",
  letterSpacing: "0.12em",
  opacity: 0.7
};

const contactCardValueStyle = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  overflowWrap: "anywhere"
};


// ==========================================
// HOLOGRAPHIC BACKGROUND
// ==========================================

function HolographicBackground() {
  return (
    <>
      <style>{holographicStyles}</style>

      <div className="holo-background" aria-hidden="true">

        {/* DIGITAL GRID */}

        <div className="holo-grid" />

        {/* AMBIENT LIGHT */}

        <div className="holo-nebula holo-nebula-cyan" />
        <div className="holo-nebula holo-nebula-purple" />
        <div className="holo-nebula holo-nebula-blue" />
        <div className="holo-nebula holo-nebula-green" />

        {/* MAIN HOLOGRAM */}

        <div className="holo-main-structure">

          <div className="holo-ring holo-ring-one" />
          <div className="holo-ring holo-ring-two" />
          <div className="holo-ring holo-ring-three" />
          <div className="holo-ring holo-ring-four" />

          <div className="holo-ring-core">
            <div className="holo-core-inner">
              DG
            </div>
          </div>

          <div className="holo-energy-dot dot-one" />
          <div className="holo-energy-dot dot-two" />
          <div className="holo-energy-dot dot-three" />
        </div>

        {/* FLOATING HOLOGRAM OBJECTS */}

        <div className="holo-floating-object holo-object-one">
          <div className="holo-object-inner">01</div>
        </div>

        <div className="holo-floating-object holo-object-two">
          <div className="holo-object-inner">DG</div>
        </div>

        <div className="holo-floating-object holo-object-three">
          <div className="holo-object-inner">∞</div>
        </div>

        {/* ENERGY BEAMS */}

        <div className="holo-laser holo-laser-one" />
        <div className="holo-laser holo-laser-two" />
        <div className="holo-laser holo-laser-three" />

        {/* DIGITAL PARTICLES */}

        <div className="holo-particle-field holo-particles-one" />
        <div className="holo-particle-field holo-particles-two" />
        <div className="holo-particle-field holo-particles-three" />

        {/* SCANNING EFFECT */}

        <div className="holo-scanner" />

        {/* LIGHT WAVES */}

        <div className="holo-wave holo-wave-one" />
        <div className="holo-wave holo-wave-two" />

        {/* VIGNETTE */}

        <div className="holo-vignette" />

      </div>
    </>
  );
}

// ==========================================
// INTRO COMPONENT
// ==========================================

function Intro({ onEnter }) {
  const [leaving, setLeaving] = useState(false);

  function enter() {
    if (leaving) return;

    setLeaving(true);

    setTimeout(onEnter, 900);
  }

  return (
    <div className={`intro ${leaving ? "intro-hide" : ""}`}>

      <div className="intro-grid" />
      <div className="intro-particles" />
      <div className="intro-scan" />

      <div className="intro-corner intro-corner-1">
        DG / 001
      </div>

      <div className="intro-corner intro-corner-2">
        DEVELOPER.OS
      </div>

      <div className="intro-corner intro-corner-3">
        BUILDING • LEARNING • CREATING
      </div>

      <div className="intro-corner intro-corner-4">
        2026
      </div>

      <div className="intro-main">

        <div className="intro-status">
          <span />
          SYSTEM ONLINE
        </div>

        <div className="intro-name">
          <div>GOLLA</div>
          <div>DHEERAJ</div>
        </div>

        <div className="intro-divider" />

        <div className="intro-title">
          MERN STACK DEVELOPER
        </div>

        <div className="intro-tech">
          <span>REACT</span>
          <span>NODE.JS</span>
          <span>EXPRESS</span>
          <span>MONGODB</span>
          <span>JAVASCRIPT</span>
          <span>FASTAPI</span>
          <span>AI</span>
          <span>DSA</span>
        </div>

        <div className="intro-orb">
          <div className="orb-ring orb-ring-1" />
          <div className="orb-ring orb-ring-2" />
          <div className="orb-ring orb-ring-3" />

          <div className="orb-core">
            DG
          </div>
        </div>

        <div className="intro-identity">
          <span>IDENTITY VERIFIED</span>
          <strong>DHEERAJ GOLLA</strong>
        </div>

        <button
          className="enter-btn"
          onClick={enter}
          disabled={leaving}
        >
          ENTER PORTFOLIO
          <b>→</b>
        </button>

      </div>
    </div>
  );
}

// ==========================================
// PROFILE CARD
// ==========================================

function ProfileCard() {
  const [open, setOpen] = useState(false);

  const [photo, setPhoto] = useState(() => {
    try {
      return (
        window.localStorage.getItem(
          "portfolio-profile-photo"
        ) || ""
      );
    } catch {
      return "";
    }
  });

  const [photoMessage, setPhotoMessage] = useState("");

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setPhotoMessage("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 1.5 * 1024 * 1024) {
      setPhotoMessage(
        "Please choose an image smaller than 1.5 MB."
      );

      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      if (typeof imageData !== "string") {
        setPhotoMessage(
          "The image could not be read. Please try another file."
        );

        event.target.value = "";
        return;
      }

      try {
        window.localStorage.setItem(
          "portfolio-profile-photo",
          imageData
        );

        setPhoto(imageData);

        setPhotoMessage(
          "Profile photo updated in this browser."
        );
      } catch {
        setPhotoMessage(
          "The photo could not be saved. Please try a smaller image."
        );
      }

      event.target.value = "";
    };

    reader.onerror = () => {
      setPhotoMessage(
        "The image could not be read. Please try another file."
      );

      event.target.value = "";
    };

    reader.readAsDataURL(file);
  }

  function removePhoto() {
    try {
      window.localStorage.removeItem(
        "portfolio-profile-photo"
      );
    } catch {
      // Keep default initials.
    }

    setPhoto("");
    setPhotoMessage("Profile photo removed.");
  }

  if (!open) {
    return (
      <div
        className="profile-trigger"
        onClick={() => setOpen(true)}
      >
        <div className="profile-photo-placeholder">
          {photo ? (
            <img
              src={photo}
              alt="Dheeraj Golla"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                position: "relative",
                zIndex: 1
              }}
            />
          ) : (
            "DG"
          )}
        </div>

        <div className="profile-hint">
          <span>+</span>
          CLICK TO EXPLORE
        </div>
      </div>
    );
  }

  return (
    <div className="profile-panel">

      <button
        className="profile-close"
        onClick={() => setOpen(false)}
        aria-label="Close profile"
      >
        ×
      </button>

      <div className="profile-photo-column">

        <div className="profile-panel-photo">
          {photo ? (
            <img
              src={photo}
              alt="Dheeraj Golla"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "20px",
                display: "block"
              }}
            />
          ) : (
            "DG"
          )}
        </div>

        <div
          className="profile-photo-controls"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "9px",
            marginTop: "14px"
          }}
        >
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 13px",
              border: "1px solid rgba(34, 211, 238, 0.55)",
              borderRadius: "8px",
              background: "rgba(34, 211, 238, 0.08)",
              color: "#67e8f9",
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              cursor: "pointer"
            }}
          >
            {photo
              ? "CHANGE PROFILE PHOTO"
              : "ADD PROFILE PHOTO"}

            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              aria-label="Choose a profile photo"
              style={{ display: "none" }}
            />
          </label>

          {photo && (
            <button
              type="button"
              onClick={removePhoto}
              style={{
                padding: "7px 10px",
                border: "1px solid rgba(248, 113, 113, 0.45)",
                borderRadius: "7px",
                background: "transparent",
                color: "#fca5a5",
                fontSize: "9px",
                letterSpacing: "0.1em",
                cursor: "pointer"
              }}
            >
              REMOVE PHOTO
            </button>
          )}

          {photoMessage && (
            <small
              role="status"
              style={{
                maxWidth: "210px",
                color: "#94a3b8",
                fontSize: "10px",
                lineHeight: 1.5
              }}
            >
              {photoMessage}
            </small>
          )}
        </div>
      </div>

      <div className="profile-info">

        <span className="profile-label">
          DEVELOPER PROFILE
        </span>

        <h3>DHEERAJ GOLLA</h3>

        <p className="profile-role">
          MERN STACK DEVELOPER
        </p>

        <div className="profile-data">

          <div>
            <span>EDUCATION</span>
            <strong>B.Tech CSE</strong>
          </div>

          <div>
            <span>FOCUS</span>
            <strong>Full Stack Development</strong>
          </div>

          <div>
            <span>SPECIALIZATION</span>
            <strong>MERN + AI</strong>
          </div>

          <div>
            <span>STATUS</span>

            <strong className="status-online">
              ● OPEN TO INTERNSHIPS
            </strong>
          </div>

        </div>

        <div className="profile-links">

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
            GitHub
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
            LinkedIn
          </a>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// CONTACT FORM
// ==========================================

function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    setStatus({
      type: "",
      message: ""
    });

    try {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000";

      const response = await fetch(
        `${API_URL}/api/contact`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(form)
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Message sending failed."
        );
      }

      setStatus({
        type: "success",
        message: result.message
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.message ||
          "Something went wrong. Please try again."
      });

    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
    >

      <h3>Send Me a Message</h3>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        maxLength="80"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email Address"
        value={form.email}
        onChange={handleChange}
        maxLength="254"
        required
      />

      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        maxLength="120"
        required
      />

      <textarea
        name="message"
        placeholder="Write your message here..."
        value={form.message}
        onChange={handleChange}
        maxLength="5000"
        rows="6"
        required
      />

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "SENDING..." : "SEND MESSAGE →"}
      </button>

      {status.message && (
        <p
          className={`contact-feedback ${status.type}`}
          role="status"
        >
          {status.message}
        </p>
      )}

    </form>
  );
}


// ==========================================
// PUBLIC RESUME DOWNLOAD BUTTON
// ==========================================

function ResumeDownloadButton() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    const API_URL = (
      import.meta.env.VITE_API_URL ||
      "http://localhost:5000"
    ).replace(/\/$/, "");

    let cancelled = false;

    async function checkResume() {
      try {
        const response = await fetch(
          `${API_URL}/api/resume`
        );

        const result = await response.json();

        if (!cancelled && response.ok) {
          setAvailable(result.hasResume === true);
        }
      } catch (error) {
        console.error("Resume availability error:", error);
      }
    }

    checkResume();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!available) return null;

  const API_URL = (
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  return (
    <a
      href={`${API_URL}/api/resume/download`}
      className="resume-download-link"
    >
      DOWNLOAD MY CV ↓
    </a>
  );
}


// ==========================================
// MAIN APP COMPONENT
// ==========================================

export default function App() {

  const [intro, setIntro] = useState(true);

  const [theme, setTheme] = useState("cyber");

  const [activeProject, setActiveProject] = useState(null);

  // ==========================================
  // PROJECTS
  // ==========================================

  // const projects = [
  //   {
  //     id: 1,
  //     title: "Vault",
  //     type: "DISTRIBUTED STORAGE",

  //     description:
  //       "Distributed object storage system focused on replica integrity, self-healing, version consistency, quorum behavior and network fault recovery.",

  //     tech: [
  //       "Go",
  //       "Distributed Systems",
  //       "SHA-256",
  //       "HTTP",
  //       "Docker"
  //     ],

  //     icon: <SiGo />,

  //     github: GITHUB_URL
  //   },

  //   {
  //     id: 2,
  //     title: "Paw-Mart",
  //     type: "PET E-COMMERCE",

  //     description:
  //       "A full-stack pet marketplace for browsing and purchasing dogs, featuring a responsive React interface, user authentication, and a Node.js and Express backend connected to MongoDB.",

  //     tech: [
  //       "React",
  //       "React Router",
  //       "Node.js",
  //       "Express.js",
  //       "MongoDB"
  //     ],

  //     icon: <FaReact />,

  //     github: GITHUB_URL
  //   },

  //   {
  //     id: 3,
  //     title: "Health Predict",
  //     type: "HEALTH + ML",

  //     description:
  //       "Health prediction platform designed to provide data-driven health insights through a modern web interface.",

  //     tech: [
  //       "React",
  //       "Node.js",
  //       "MongoDB",
  //       "ML"
  //     ],

  //     icon: <FaDatabase />,

  //     github: GITHUB_URL
  //   },

  //   {
  //     id: 4,
  //     title: "Dynamic Gift Store",
  //     type: "E-COMMERCE",

  //     description:
  //       "Responsive full-stack shopping platform with product browsing, authentication and a modern responsive interface.",

  //     tech: [
  //       "React",
  //       "Node.js",
  //       "Express",
  //       "MongoDB"
  //     ],

  //     icon: <FaCode />,

  //     github:
  //       "https://github.com/DHEERAJ565/myproject1"
  //   }
  // ];


  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchProjects() {
      const API_URL = (
        import.meta.env.VITE_API_URL || "http://localhost:5000"
      ).replace(/\/$/, "");

      try {
        const response = await fetch(`${API_URL}/api/projects`);

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch projects.");
        }

        if (!cancelled) {
          const formattedProjects = (result.projects || []).map(
            (project, index) => {
              const title = project.title.toLowerCase();

              let icon = <FaCode />;

              if (title.includes("vault")) {
                icon = <SiGo />;
              } else if (title.includes("paw")) {
                icon = <FaReact />;
              } else if (title.includes("health")) {
                icon = <FaDatabase />;
              }

              const image = project.image || "";

              return {
                ...project,
                id: project._id || index,
                icon,
                image:
                  image.startsWith("/uploads/")
                    ? `${API_URL}${image}`
                    : image,
                github: project.github || ""
              };
            }
          );

          setProjects(formattedProjects);
        }
      } catch (error) {
        console.error("Projects loading error:", error);
      } finally {
        if (!cancelled) {
          setProjectsLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);


  // ==========================================
  // SKILLS
  // ==========================================

  // const skills = [
  //   {
  //     name: "React",
  //     icon: <FaReact />,
  //     type: "Frontend"
  //   },

  //   {
  //     name: "JavaScript",
  //     icon: <FaJs />,
  //     type: "Language"
  //   },

  //   {
  //     name: "Node.js",
  //     icon: <FaNodeJs />,
  //     type: "Backend"
  //   },

  //   {
  //     name: "Express",
  //     icon: <SiExpress />,
  //     type: "Backend"
  //   },

  //   {
  //     name: "MongoDB",
  //     icon: <SiMongodb />,
  //     type: "Database"
  //   },

  //   {
  //     name: "Tailwind",
  //     icon: <SiTailwindcss />,
  //     type: "UI"
  //   },

  //   {
  //     name: "FastAPI",
  //     icon: <SiFastapi />,
  //     type: "Python"
  //   },

  //   {
  //     name: "Docker",
  //     icon: <SiDocker />,
  //     type: "DevOps"
  //   },

  //   {
  //     name: "HTML",
  //     icon: <FaHtml5 />,
  //     type: "Frontend"
  //   },

  //   {
  //     name: "CSS",
  //     icon: <FaCss3Alt />,
  //     type: "Frontend"
  //   },

  //   {
  //     name: "Server",
  //     icon: <FaServer />,
  //     type: "Backend"
  //   }
  // ];


  const [skills, setSkills] = useState([]);

  const [skillsLoading, setSkillsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchSkills() {
      const API_URL = (
        import.meta.env.VITE_API_URL ||
        "http://localhost:5000"
      ).replace(/\/$/, "");

      try {
        const response = await fetch(
          `${API_URL}/api/skills`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Unable to retrieve skills."
          );
        }

        const iconMap = {
          react: <FaReact />,
          javascript: <FaJs />,
          node: <FaNodeJs />,
          express: <SiExpress />,
          mongodb: <SiMongodb />,
          tailwind: <SiTailwindcss />,
          fastapi: <SiFastapi />,
          docker: <SiDocker />,
          html: <FaHtml5 />,
          css: <FaCss3Alt />,
          server: <FaServer />,
          code: <FaCode />
        };

        if (!cancelled) {
          const formattedSkills = (result.skills || []).map(
            (skill) => ({
              ...skill,
              icon: iconMap[skill.icon] || <FaCode />
            })
          );

          setSkills(formattedSkills);
        }

      } catch (error) {
        console.error("Skills loading error:", error);

      } finally {
        if (!cancelled) {
          setSkillsLoading(false);
        }
      }
    }

    fetchSkills();

    return () => {
      cancelled = true;
    };
  }, []);




  // ==========================================
  // THEME SWITCHER
  // ==========================================

  function cycleTheme() {
    setTheme((current) => {
      if (current === "cyber") return "matrix";

      if (current === "matrix") return "minimal";

      return "cyber";
    });
  }

  // ==========================================
  // BODY CLASS
  // ==========================================

  useEffect(() => {
    document.body.classList.toggle(
      "portfolio-active",
      !intro
    );

    return () => {
      document.body.classList.remove("portfolio-active");
    };
  }, [intro]);

  // ==========================================
  // ADMIN ROUTE
  // ==========================================

  if (
    window.location.pathname === "/admin" ||
    window.location.pathname.startsWith("/admin/")
  ) {
    return <AdminDashboard />;
  }

  // ==========================================
  // INTRO SCREEN
  // ==========================================

  if (intro) {
    return (
      <Intro
        onEnter={() => setIntro(false)}
      />
    );
  }

  // ==========================================
  // MAIN PORTFOLIO
  // ==========================================

  return (
    <div className={`portfolio ${theme} holo-portfolio`}>

      {/* HOLOGRAPHIC BACKGROUND */}

      <HolographicBackground />

      {/* CUSTOM CURSOR */}

      <CustomCursor />
      <HolographicBackground />

<CustomCursor />

<VisitorTracker />

      {/* NAVBAR */}

      <nav className="navbar">
        <div className="nav-inner">

          <a href="#home" className="logo">
            DG<span>.</span>
          </a>

          <div className="nav-links">

            <a href="#home" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>Home</a>

            <a href="#about" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>About</a>

            <a href="#skills" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>Skills</a>

            <a href="#projects" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>Projects</a>

            <a href="#terminal" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>Terminal</a>

            <a href="#contact" style={{
              color: "#67e8f9",
              fontWeight: "700",
              border: "1px solid rgba(34, 211, 238, 0.45)",
              padding: "8px 12px",
              borderRadius: "7px",
              background: "rgba(34, 211, 238, 0.08)"
            }}>Contact</a>

            {/* ADMIN DASHBOARD */}

            <a
              href="/admin"
              className="dashboard-nav-link"
            >
              DASHBOARD ↗
            </a>

          </div>

          <button
            type="button"
            className="theme-button"
            onClick={cycleTheme}
            title="Change portfolio theme"
          >
            {theme === "cyber"
              ? "CYBER MODE"
              : theme === "matrix"
                ? "MATRIX MODE"
                : "MINIMAL MODE"}

            <span style={{ marginLeft: "8px" }}>
              ↻
            </span>
          </button>

        </div>
      </nav>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main>

        {/* HOME SECTION */}

        <section
          id="home"
          className="hero-section"
        >
          <div className="hero-background" />

          <div className="hero-grid">

            <div className="hero-content">

              <div className="developer-status">
                <span />
                DEVELOPER MODE ACTIVE
              </div>

              <div className="hero-small">
                HELLO, I'M
              </div>

              <h1>
                DHEERAJ
                <span>GOLLA</span>
              </h1>

              <h2>
                MERN STACK DEVELOPER
              </h2>

              <p>
                I build modern full-stack applications,
                interactive digital experiences and
                AI-integrated software systems.
              </p>

              <div className="hero-buttons">

                <a href="#projects">
                  EXPLORE WORK
                </a>

                <a href="#terminal">
                  OPEN TERMINAL
                </a>

                <ResumeDownloadButton />

              </div>

              <div className="social-links">

                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>

              </div>
            </div>

            <div className="hero-profile">

              <div className="hero-hologram">
                <Hologram />
              </div>

              <div className="hero-profile-card">
                <ProfileCard />
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}

        <section
          id="about"
          className="section"
        >
          <div className="section-container">

            <div className="section-label">
              01 / ABOUT
            </div>

            <h2 className="section-title">
              Building ideas into
              <span> experiences.</span>
            </h2>

            <div className="about-grid">

              <div className="about-text">

                <p>
                  I'm a Computer Science student focused on
                  full-stack development and modern web
                  technologies.
                </p>

                <p>
                  I enjoy creating practical applications,
                  experimenting with new technologies and
                  solving real-world problems through software.
                </p>

                <p>
                  My current focus is building strong MERN
                  development skills while exploring AI,
                  distributed systems and scalable applications.
                </p>

              </div>

              <div className="about-stats">

                <div>
                  <strong>04</strong>
                  <span>PROJECTS</span>
                </div>

                <div>
                  <strong>MERN</strong>
                  <span>PRIMARY STACK</span>
                </div>

                <div>
                  <strong>AI</strong>
                  <span>EXPLORING</span>
                </div>

                <div>
                  <strong>∞</strong>
                  <span>LEARNING</span>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}

        <section
          id="skills"
          className="section"
        >
          <div className="section-container">

            <div className="section-label">
              02 / SKILLS
            </div>

            <h2 className="section-title">
              My <span>stack.</span>
            </h2>

            <div className="constellation-wrapper">
              <SkillConstellation />
            </div>

            <div className="skills-grid">

              {/* {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-card"
                >
                  <div className="skill-icon">
                    {skill.icon}
                  </div>

                  <div>
                    <h3>{skill.name}</h3>
                    <span>{skill.type}</span>
                  </div>

                </div>
              ))} */}

              <div className="skills-grid">

                {skillsLoading ? (
                  <p>Loading skills...</p>
                ) : (
                  skills.map((skill) => (
                    <div
                      key={skill._id}
                      className="skill-card"
                    >
                      <div className="skill-icon">
                        {skill.icon}
                      </div>

                      <div>
                        <h3>{skill.name}</h3>
                        <span>{skill.type}</span>
                      </div>
                    </div>
                  ))
                )}

              </div>

            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}

        <section
          id="projects"
          className="section"
        >
          <div className="section-container">

            <div className="section-label">
              03 / PROJECTS
            </div>

            <h2 className="section-title">
              Things I've <span>built.</span>
            </h2>

            <div className="projects-grid">

              {projects.map((project) => (

                <div
                  key={project.id}
                  className={`project-card ${
                    activeProject === project.id
                      ? "project-active"
                      : ""
                  }`}
                  onMouseEnter={() =>
                    setActiveProject(project.id)
                  }
                  onMouseLeave={() =>
                    setActiveProject(null)
                  }
                >

                  <div className="project-image-wrapper">

                    {/* <img
                      src={
                        project.id === 1
                          ? "/vault.png"
                          : project.id === 2
                            ? "/paw-mart.png"
                            : project.id === 3
                              ? "/health-predict.png"
                              : "/gift-store.png"
                      }
                      alt={`${project.title} project preview`}
                      className="project-image"
                    /> */}

                    <img
                      src={
                        project.image ||
                        (
                          project.title === "Vault"
                            ? "/vault.png"
                            : project.title === "Paw-Mart"
                              ? "/paw-mart.png"
                              : project.title === "Health Predict"
                                ? "/health-predict.png"
                                : "/gift-store.png"
                        )
                      }
                      alt={`${project.title} project preview`}
                      className="project-image"
                    />

                    <div className="project-image-overlay">
                      <span>PROJECT PREVIEW</span>
                      <strong>0{project.id}</strong>
                    </div>

                  </div>

                  <div className="project-content">

                    <div className="project-top">

                      <div className="project-icon">
                        {project.icon}
                      </div>

                      <div className="project-number">
                        0{project.id}
                      </div>

                    </div>

                    <div className="project-type">
                      {project.type}
                    </div>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-tech">

                      {project.tech.map((tech) => (
                        <span key={tech}>
                          {tech}
                        </span>
                      ))}

                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      VIEW PROJECT
                      <b>→</b>
                    </a>

                  </div>
                </div>

              ))}

            </div>
          </div>
        </section>

        {/* ARCHITECTURE SECTION */}

        <section className="section architecture-section">
          <div className="section-container">

            <div className="section-label">
              04 / ARCHITECTURE
            </div>

            <h2 className="section-title">
              How I <span>build.</span>
            </h2>

            <div className="architecture-container">
              <Architecture />
            </div>

          </div>
        </section>

        {/* TERMINAL SECTION */}

        <section
          id="terminal"
          className="section terminal-section"
        >
          <div className="section-container">

            <div className="section-label">
              05 / TERMINAL
            </div>

            <h2 className="section-title">
              Enter my <span>workspace.</span>
            </h2>

            <div className="terminal-container">
              <Terminal />
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}

        <section
          id="contact"
          className="contact-section"
        >
          <div className="contact-grid" />

          <div className="contact-content">

            <div className="section-label">
              06 / CONTACT
            </div>

            <h2>
              Let's build
              <span> something.</span>
            </h2>

            <p>
              Have an idea, project or opportunity?
              Let's create something useful together.
            </p>

            <ContactForm />

            <div
              className="contact-details"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "18px",
                marginTop: "35px"
              }}
            >

              {/* EMAIL CARD */}

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                style={contactCardStyle}
              >
                <span style={{ fontSize: "24px" }}>
                  ✉
                </span>

                <div>
                  <small style={contactCardLabelStyle}>
                    EMAIL ME
                  </small>

                  <strong style={contactCardValueStyle}>
                    {CONTACT_EMAIL}
                  </strong>
                </div>
              </a>

              {/* LINKEDIN CARD */}

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                style={contactCardStyle}
              >
                <FaLinkedin style={{ fontSize: "24px" }} />

                <div>
                  <small style={contactCardLabelStyle}>
                    LINKEDIN
                  </small>

                  <strong style={contactCardValueStyle}>
                    Connect with me
                  </strong>
                </div>
              </a>

              {/* GITHUB CARD */}

              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                style={contactCardStyle}
              >
                <FaGithub style={{ fontSize: "24px" }} />

                <div>
                  <small style={contactCardLabelStyle}>
                    GITHUB
                  </small>

                  <strong style={contactCardValueStyle}>
                    Explore my projects
                  </strong>
                </div>
              </a>

            </div>

            <div className="contact-buttons">

              <a href={`mailto:${CONTACT_EMAIL}`}>
                SEND ME AN EMAIL
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
              >
                CONNECT ON LINKEDIN
              </a>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}

      <footer>

        <div>
          DHEERAJ GOLLA
        </div>

        <span>
          MERN STACK DEVELOPER
        </span>

        <div className="footer-socials">

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

        </div>

      </footer>

      {/* AI PORTFOLIO ASSISTANT */}

      <PortfolioAssistant />

    </div>
  );
}

// ==========================================
// HOLOGRAPHIC BACKGROUND CSS
// ==========================================

const holographicStyles = `

/* ======================================
   MAIN BACKGROUND
====================================== */

.holo-portfolio {
  position: relative;
  isolation: isolate;
  overflow: clip;
}

.holo-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;

  background:
    radial-gradient(
      ellipse at 12% 15%,
      rgba(0, 221, 255, 0.12),
      transparent 35%
    ),
    radial-gradient(
      ellipse at 85% 20%,
      rgba(155, 75, 255, 0.13),
      transparent 38%
    ),
    radial-gradient(
      ellipse at 55% 90%,
      rgba(0, 255, 180, 0.08),
      transparent 40%
    ),
    #050711;
}

/* Keep portfolio content in front of background */

.holo-portfolio > main,
.holo-portfolio > footer {
  position: relative;
  z-index: 2;
}

.holo-portfolio > .navbar {
  z-index: 20;
}

/* ======================================
   DIGITAL GRID
====================================== */

.holo-grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(
      rgba(86, 229, 242, 0.045) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(86, 229, 242, 0.045) 1px,
      transparent 1px
    );

  background-size: 55px 55px;

  mask-image:
    radial-gradient(
      ellipse at center,
      black 10%,
      transparent 85%
    );

  opacity: 0.8;
}

/* ======================================
   NEBULA LIGHT
====================================== */

.holo-nebula {
  position: absolute;
  width: 480px;
  height: 480px;

  border-radius: 50%;

  filter: blur(110px);

  opacity: 0.18;

  animation: nebulaFloat 18s ease-in-out infinite alternate;
}

.holo-nebula-cyan {
  background: #00e5ff;
  top: -230px;
  left: -140px;
}

.holo-nebula-purple {
  background: #853cff;
  top: 10%;
  right: -220px;
  animation-delay: -5s;
}

.holo-nebula-blue {
  background: #126dff;
  bottom: -260px;
  left: 24%;
  animation-delay: -9s;
}

.holo-nebula-green {
  background: #00ffa6;
  bottom: 10%;
  right: -300px;
  opacity: 0.10;
  animation-delay: -12s;
}

@keyframes nebulaFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }

  100% {
    transform: translate3d(80px, 70px, 0) scale(1.25);
  }
}

/* ======================================
   MAIN HOLOGRAM STRUCTURE
====================================== */

.holo-main-structure {
  position: absolute;

  width: 380px;
  height: 380px;

  top: 23%;
  right: 7%;

  display: grid;
  place-items: center;

  opacity: 0.45;

  transform-style: preserve-3d;

  animation: holoMainFloat 12s ease-in-out infinite;
}

.holo-ring {
  position: absolute;

  inset: 0;

  border-radius: 50%;

  border: 1px solid rgba(86, 229, 242, 0.38);

  box-shadow:
    0 0 25px rgba(86, 229, 242, 0.08),
    inset 0 0 25px rgba(86, 229, 242, 0.04);
}

.holo-ring-one {
  animation: holoRotate 19s linear infinite;
}

.holo-ring-two {
  inset: 25px -25px;

  border-color: rgba(167, 139, 250, 0.45);

  transform: rotateX(65deg);

  animation: holoRotateReverse 13s linear infinite;
}

.holo-ring-three {
  inset: 65px;

  border-style: dashed;

  border-color: rgba(94, 230, 168, 0.4);

  animation: holoRotate 25s linear infinite;
}

.holo-ring-four {
  inset: 90px -5px;

  border-color: rgba(86, 229, 242, 0.26);

  transform: rotateY(65deg);

  animation: holoRotateReverse 17s linear infinite;
}

/* CENTRAL CORE */

.holo-ring-core {
  width: 115px;
  height: 115px;

  display: grid;
  place-items: center;

  border-radius: 30px;

  border: 1px solid rgba(86, 229, 242, 0.7);

  background:
    linear-gradient(
      145deg,
      rgba(12, 50, 75, 0.9),
      rgba(45, 23, 81, 0.85)
    );

  box-shadow:
    0 0 30px rgba(86, 229, 242, 0.22),
    0 0 85px rgba(86, 229, 242, 0.10),
    inset 0 0 35px rgba(86, 229, 242, 0.14);

  animation: corePulse 4s ease-in-out infinite;
}

.holo-core-inner {
  color: #b3faff;

  font-size: 36px;
  font-weight: 900;

  letter-spacing: -4px;

  text-shadow:
    0 0 10px #56e5f2,
    0 0 30px #56e5f2;
}

/* ENERGY DOTS */

.holo-energy-dot {
  position: absolute;

  width: 9px;
  height: 9px;

  border-radius: 50%;

  background: #56e5f2;

  box-shadow:
    0 0 12px #56e5f2,
    0 0 30px #56e5f2;
}

.dot-one {
  top: 10%;
  left: 22%;
}

.dot-two {
  bottom: 14%;
  right: 20%;

  background: #a78bfa;

  box-shadow:
    0 0 12px #a78bfa,
    0 0 30px #a78bfa;
}

.dot-three {
  right: 8%;
  top: 48%;

  background: #5ee6a8;

  box-shadow:
    0 0 12px #5ee6a8,
    0 0 30px #5ee6a8;
}

/* ======================================
   FLOATING HOLOGRAM OBJECTS
====================================== */

.holo-floating-object {
  position: absolute;

  width: 85px;
  height: 85px;

  border: 1px solid rgba(86, 229, 242, 0.45);

  border-radius: 23px;

  background:
    linear-gradient(
      145deg,
      rgba(86, 229, 242, 0.08),
      rgba(167, 139, 250, 0.08)
    );

  backdrop-filter: blur(8px);

  display: grid;
  place-items: center;

  color: #a5f7ff;

  font-size: 20px;
  font-weight: 900;

  box-shadow:
    0 0 25px rgba(86, 229, 242, 0.11),
    inset 0 0 18px rgba(86, 229, 242, 0.08);
}

.holo-object-inner {
  text-shadow: 0 0 15px #56e5f2;
}

.holo-object-one {
  top: 18%;
  left: 14%;

  animation: floatingOne 9s ease-in-out infinite;
}

.holo-object-two {
  top: 65%;
  right: 19%;

  width: 65px;
  height: 65px;

  border-color: rgba(167, 139, 250, 0.6);

  color: #c7b3ff;

  animation: floatingTwo 11s ease-in-out infinite;
}

.holo-object-three {
  top: 45%;
  left: 5%;

  width: 55px;
  height: 55px;

  border-color: rgba(94, 230, 168, 0.5);

  color: #8fffd0;

  animation: floatingThree 13s ease-in-out infinite;
}

/* ======================================
   LASER BEAMS
====================================== */

.holo-laser {
  position: absolute;

  height: 2px;
  width: 650px;

  opacity: 0.45;

  background:
    linear-gradient(
      90deg,
      transparent,
      #56e5f2,
      #a78bfa,
      transparent
    );

  filter: blur(1px);

  box-shadow:
    0 0 18px rgba(86, 229, 242, 0.5);
}

.holo-laser-one {
  top: 27%;
  left: 35%;

  transform: rotate(-24deg);

  animation: laserMove 10s ease-in-out infinite;
}

.holo-laser-two {
  top: 70%;
  left: -8%;

  transform: rotate(17deg);

  animation: laserMoveReverse 14s ease-in-out infinite;
}

.holo-laser-three {
  top: 48%;
  right: -20%;

  transform: rotate(-48deg);

  opacity: 0.25;

  animation: laserMove 17s ease-in-out infinite;
}

/* ======================================
   FLOATING PARTICLES
====================================== */

.holo-particle-field {
  position: absolute;
  inset: -20%;

  opacity: 0.55;

  background-image:
    radial-gradient(
      circle,
      rgba(86, 229, 242, 0.85) 1px,
      transparent 2px
    ),
    radial-gradient(
      circle,
      rgba(167, 139, 250, 0.75) 1px,
      transparent 2px
    ),
    radial-gradient(
      circle,
      rgba(94, 230, 168, 0.7) 1px,
      transparent 2px
    );

  background-size:
    110px 110px,
    170px 170px,
    230px 230px;

  background-position:
    0 0,
    45px 80px,
    100px 30px;
}

.holo-particles-one {
  animation: particlesUp 30s linear infinite;
}

.holo-particles-two {
  opacity: 0.22;

  animation: particlesDown 38s linear infinite;
}

.holo-particles-three {
  opacity: 0.14;

  animation: particlesUp 48s linear infinite;
}

/* ======================================
   SCANNING EFFECT
====================================== */

.holo-scanner {
  position: absolute;

  top: -30%;
  left: 0;

  width: 100%;
  height: 180px;

  opacity: 0.6;

  background:
    linear-gradient(
      to bottom,
      transparent,
      rgba(86, 229, 242, 0.015),
      rgba(86, 229, 242, 0.10),
      transparent
    );

  animation: scannerMove 15s linear infinite;
}

/* ======================================
   ENERGY WAVES
====================================== */

.holo-wave {
  position: absolute;

  width: 100%;
  height: 260px;

  border-radius: 50%;

  border-top: 1px solid rgba(86, 229, 242, 0.16);

  filter: blur(1px);

  opacity: 0.3;
}

.holo-wave-one {
  bottom: -200px;

  transform: rotate(-9deg);

  animation: waveMove 12s ease-in-out infinite;
}

.holo-wave-two {
  bottom: -230px;

  border-color: rgba(167, 139, 250, 0.2);

  transform: rotate(8deg);

  animation: waveMoveReverse 15s ease-in-out infinite;
}

/* ======================================
   VIGNETTE
====================================== */

.holo-vignette {
  position: absolute;
  inset: 0;

  background:
    radial-gradient(
      ellipse at center,
      transparent 35%,
      rgba(3, 5, 12, 0.38) 100%
    );
}

/* ======================================
   ANIMATIONS
====================================== */

@keyframes holoRotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes holoRotateReverse {
  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }
}

@keyframes holoMainFloat {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }

  50% {
    transform: translate3d(-20px, 25px, 0) rotate(8deg);
  }
}

@keyframes corePulse {
  0%, 100% {
    box-shadow:
      0 0 30px rgba(86, 229, 242, 0.22),
      0 0 85px rgba(86, 229, 242, 0.10);
  }

  50% {
    box-shadow:
      0 0 50px rgba(86, 229, 242, 0.4),
      0 0 110px rgba(167, 139, 250, 0.22);
  }
}

@keyframes floatingOne {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-40px) rotate(15deg);
  }
}

@keyframes floatingTwo {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(35px) rotate(-20deg);
  }
}

@keyframes floatingThree {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }

  50% {
    transform: translateY(-25px) rotate(35deg);
  }
}

@keyframes laserMove {
  0%, 100% {
    translate: -60px 0;
    opacity: 0.1;
  }

  50% {
    translate: 100px 0;
    opacity: 0.65;
  }
}

@keyframes laserMoveReverse {
  0%, 100% {
    translate: 100px 0;
    opacity: 0.1;
  }

  50% {
    translate: -100px 0;
    opacity: 0.6;
  }
}

@keyframes particlesUp {
  from {
    background-position:
      0 0,
      45px 80px,
      100px 30px;
  }

  to {
    background-position:
      0 -550px,
      45px -750px,
      100px -950px;
  }
}

@keyframes particlesDown {
  from {
    transform: translateY(-100px);
  }

  to {
    transform: translateY(200px);
  }
}

@keyframes scannerMove {
  from {
    top: -200px;
  }

  to {
    top: 120%;
  }
}

@keyframes waveMove {
  0%, 100% {
    transform: translateX(-25px) rotate(-9deg);
    opacity: 0.15;
  }

  50% {
    transform: translateX(25px) rotate(-5deg);
    opacity: 0.45;
  }
}

@keyframes waveMoveReverse {
  0%, 100% {
    transform: translateX(30px) rotate(8deg);
  }

  50% {
    transform: translateX(-30px) rotate(3deg);
  }
}

/* ======================================
   NAVBAR DASHBOARD LINK
====================================== */

.dashboard-nav-link {
  color: #67e8f9 !important;

  font-weight: 700;

  border: 1px solid rgba(34, 211, 238, 0.45);

  padding: 8px 12px;

  border-radius: 7px;

  background: rgba(34, 211, 238, 0.08);

  text-decoration: none;

  transition: all 0.3s ease;
}

.dashboard-nav-link:hover {
  background: rgba(34, 211, 238, 0.18);

  box-shadow:
    0 0 15px rgba(34, 211, 238, 0.20),
    inset 0 0 15px rgba(34, 211, 238, 0.08);

  transform: translateY(-2px);
}

/* ======================================
   RESPONSIVE HOLOGRAM
====================================== */

@media (max-width: 1000px) {
  .holo-main-structure {
    right: -120px;
    opacity: 0.28;
  }

  .holo-object-one {
    left: 5%;
  }

  .holo-object-two {
    right: 7%;
  }
}

@media (max-width: 650px) {
  .holo-main-structure {
    width: 250px;
    height: 250px;

    right: -130px;
    top: 30%;

    opacity: 0.22;
  }

  .holo-ring-core {
    width: 75px;
    height: 75px;

    border-radius: 22px;
  }

  .holo-core-inner {
    font-size: 26px;
  }

  .holo-floating-object {
    width: 48px;
    height: 48px;

    border-radius: 13px;

    font-size: 12px;
  }

  .holo-object-one {
    top: 20%;
    left: 3%;
  }

  .holo-object-two {
    top: 68%;
    right: 5%;
  }

  .holo-object-three {
    top: 49%;
    left: 3%;
  }

  .holo-nebula {
    width: 300px;
    height: 300px;

    filter: blur(85px);
    opacity: 0.12;
  }

  .holo-laser {
    opacity: 0.18;
  }

  .holo-particle-field {
    opacity: 0.18;
  }

  .holo-wave {
    opacity: 0.14;
  }
}

/* ======================================
   ACCESSIBILITY
====================================== */

@media (prefers-reduced-motion: reduce) {
  .holo-background *,
  .holo-background {
    animation: none !important;
    transition: none !important;
  }
}




/* ======================================
   DARK VIOLET HOLOGRAPHIC THEME
====================================== */

html,
body,
#root {
  min-height: 100%;
  background: #0b0718 !important;
}

.holo-portfolio {
  background:
    radial-gradient(
      ellipse at 15% 15%,
      rgba(112, 59, 190, 0.22),
      transparent 45%
    ),
    radial-gradient(
      ellipse at 85% 30%,
      rgba(50, 45, 160, 0.18),
      transparent 45%
    ),
    linear-gradient(
      135deg,
      #10091f 0%,
      #0b0718 45%,
      #120a25 100%
    ) !important;

  color: #f4efff;
}

/* Make all major sections transparent */

.holo-portfolio .hero-section,
.holo-portfolio .section,
.holo-portfolio .architecture-section,
.holo-portfolio .terminal-section,
.holo-portfolio .contact-section {
  background-color: transparent !important;
}

/* Hero holographic lighting */

.holo-portfolio .hero-background {
  background:
    radial-gradient(
      circle at 70% 45%,
      rgba(139, 92, 246, 0.18),
      transparent 40%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(34, 211, 238, 0.10),
      transparent 40%
    ) !important;
}

/* Stronger violet nebula */

.holo-nebula-purple {
  background: #9b4dff !important;
  opacity: 0.25 !important;
}

.holo-nebula-blue {
  background: #6347ff !important;
  opacity: 0.19 !important;
}

.holo-nebula-cyan {
  opacity: 0.19 !important;
}

/* More visible holographic structure */

.holo-main-structure {
  opacity: 0.65 !important;
}

.holo-ring-one {
  border-color: rgba(167, 139, 250, 0.55) !important;
}

.holo-ring-two {
  border-color: rgba(86, 229, 242, 0.55) !important;
}

.holo-ring-three {
  border-color: rgba(167, 139, 250, 0.5) !important;
}

/* Beautiful glass cards */

.holo-portfolio .project-card,
.holo-portfolio .skill-card,
.holo-portfolio .about-stats > div {
  background: rgba(24, 15, 45, 0.65) !important;

  border: 1px solid rgba(167, 139, 250, 0.20);

  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  box-shadow:
    0 10px 35px rgba(0, 0, 0, 0.15),
    inset 0 0 20px rgba(167, 139, 250, 0.025);
}

/* Violet hover glow */

.holo-portfolio .project-card:hover,
.holo-portfolio .skill-card:hover {
  border-color: rgba(167, 139, 250, 0.65) !important;

  box-shadow:
    0 0 25px rgba(139, 92, 246, 0.18),
    0 0 50px rgba(86, 229, 242, 0.07);

  transform: translateY(-5px);
}

/* Violet headings */

.holo-portfolio .section-title span,
.holo-portfolio .contact-content h2 span {
  color: #c4a5ff;
  text-shadow: 0 0 25px rgba(167, 139, 250, 0.3);
}

/* Navbar */

.holo-portfolio .navbar {
  background: rgba(12, 7, 28, 0.78) !important;
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(167, 139, 250, 0.18);
}

/* Footer */

.holo-portfolio footer {
  background: rgba(10, 6, 23, 0.75) !important;
  border-top: 1px solid rgba(167, 139, 250, 0.18);
}

/* Mobile adjustments */

@media (max-width: 650px) {
  .holo-main-structure {
    opacity: 0.30 !important;
  }

  .holo-nebula {
    opacity: 0.12 !important;
  }
}

`;