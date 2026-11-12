
import { useEffect, useState } from "react";

import {
  FaUser,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaImage,
  FaUpload,
  FaSave,
  FaTimes,
  FaSpinner,
  FaShieldAlt,
  FaCheckCircle,
  FaTrash,
  FaEye
} from "react-icons/fa";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const defaultProfile = {
  name: "DHEERAJ GOLLA",
  title: "MERN STACK DEVELOPER",

  shortBio:
    "I build modern full-stack applications, interactive digital experiences and AI-integrated software systems.",

  about:
    "I'm a Computer Science student focused on full-stack development and modern web technologies.\nI enjoy creating practical applications, experimenting with new technologies and solving real-world problems through software.\nMy current focus is building strong MERN development skills while exploring AI, distributed systems and scalable applications.",

  education: "B.Tech CSE",
  focus: "Full Stack Development",
  specialization: "MERN + AI",
  status: "OPEN TO INTERNSHIPS",

  email: "dheeraj72064@gmail.com",
  github: "https://github.com/DHEERAJ565",
  linkedin: "https://www.linkedin.com/in/golla-dheeraj",

  profileImage: ""
};

function getImageUrl(image) {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  return `${API_URL}${image}`;
}

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Backend returned an unexpected response. HTTP ${response.status}.`
    );
  }

  return response.json();
}

export default function ProfileManager() {
  const [form, setForm] = useState(defaultProfile);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [removeImage, setRemoveImage] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  async function loadProfile() {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/profile`
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load profile."
        );
      }

      const profile = {
        ...defaultProfile,
        ...(result.profile || {})
      };

      setForm(profile);

      setImagePreview(
        getImageUrl(profile.profileImage)
      );

      setSelectedImage(null);

      setRemoveImage(false);

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================================
  // INPUT HANDLING
  // ==========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // ==========================================
  // IMAGE UPLOAD
  // ==========================================

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif"
    ];

    if (!allowedTypes.includes(file.type)) {
      setMessage({
        type: "error",
        text: "Please select a JPG, PNG, WEBP or GIF image."
      });

      event.target.value = "";
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Profile image must be smaller than 3 MB."
      });

      event.target.value = "";
      return;
    }

    setSelectedImage(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

    setRemoveImage(false);

    setMessage({
      type: "",
      text: ""
    });
  }

  // ==========================================
  // REMOVE PROFILE IMAGE
  // ==========================================

  function handleRemoveImage() {
    setSelectedImage(null);

    setImagePreview("");

    setRemoveImage(true);
  }

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const formData = new FormData();

      const fields = [
        "name",
        "title",
        "shortBio",
        "about",
        "education",
        "focus",
        "specialization",
        "status",
        "email",
        "github",
        "linkedin"
      ];

      fields.forEach((field) => {
        formData.append(
          field,
          form[field] || ""
        );
      });

      formData.append(
        "removeProfileImage",
        String(removeImage)
      );

      if (selectedImage) {
        formData.append(
          "profileImage",
          selectedImage
        );
      }

      const response = await fetch(
        `${API_URL}/api/profile`,
        {
          method: "PUT",
          credentials: "include",
          body: formData
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to update profile."
        );
      }

      setMessage({
        type: "success",
        text: result.message
      });

      await loadProfile();

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });

    } finally {
      setSaving(false);
    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>{profileManagerStyles}</style>

      <div className="prm-container">

        {/* HEADER */}

        <div className="prm-header">

          <div>
            <span className="prm-eyebrow">
              IDENTITY AND PUBLIC PROFILE
            </span>

            <h2>Profile Manager</h2>

            <p>
              Manage the information visitors see on your portfolio.
            </p>
          </div>

          <div className="prm-secure-badge">
            <FaShieldAlt />
            ADMIN CONTROL
          </div>

        </div>

        {/* MESSAGE */}

        {message.text && (
          <div className={`prm-message ${message.type}`}>
            <span>
              {message.type === "success" && <FaCheckCircle />}
              {message.text}
            </span>

            <button
              type="button"
              onClick={() =>
                setMessage({ type: "", text: "" })
              }
            >
              <FaTimes />
            </button>
          </div>
        )}

        {loading ? (
          <div className="prm-loading">
            <FaSpinner className="prm-spin" />
            Loading profile...
          </div>
        ) : (

          <form
            className="prm-form"
            onSubmit={handleSubmit}
          >

            {/* PROFILE IMAGE */}

            <section className="prm-panel prm-image-panel">

              <div className="prm-panel-heading">
                <div>
                  <span className="prm-eyebrow">
                    PERSONAL IDENTITY
                  </span>

                  <h3>Profile photograph</h3>
                </div>

                <FaImage />
              </div>

              <div className="prm-image-content">

                <div className="prm-avatar-wrapper">

                  <div className="prm-avatar">

                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                      />
                    ) : (
                      <span>
                        {form.name
                          ?.split(/\s+/)
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase() || "DG"}
                      </span>
                    )}

                  </div>

                  <i />

                </div>

                <div className="prm-image-info">

                  <h3>
                    {form.name || "Your Name"}
                  </h3>

                  <p>
                    {form.title || "Professional Title"}
                  </p>

                  <div className="prm-image-actions">

                    <label className="prm-upload-button">
                      <FaUpload />
                      CHANGE PHOTO

                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={handleImageChange}
                      />
                    </label>

                    {imagePreview && (
                      <button
                        type="button"
                        className="prm-remove-button"
                        onClick={handleRemoveImage}
                      >
                        <FaTrash />
                        REMOVE
                      </button>
                    )}

                  </div>

                  <small>
                    JPG, PNG, WEBP or GIF. Maximum 3 MB.
                  </small>

                </div>

              </div>

            </section>

            {/* PERSONAL INFORMATION */}

            <section className="prm-panel">

              <div className="prm-panel-heading">
                <div>
                  <span className="prm-eyebrow">
                    BASIC INFORMATION
                  </span>

                  <h3>Personal details</h3>
                </div>

                <FaUser />
              </div>

              <div className="prm-grid">

                <label>
                  FULL NAME *

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    maxLength="100"
                    placeholder="Your full name"
                    required
                  />
                </label>

                <label>
                  PROFESSIONAL TITLE *

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    maxLength="100"
                    placeholder="MERN Stack Developer"
                    required
                  />
                </label>

                <label className="prm-full">
                  SHORT INTRODUCTION

                  <textarea
                    name="shortBio"
                    value={form.shortBio}
                    onChange={handleChange}
                    maxLength="500"
                    rows="3"
                    placeholder="A short introduction for your homepage..."
                  />
                </label>

                <label className="prm-full">
                  ABOUT ME

                  <textarea
                    name="about"
                    value={form.about}
                    onChange={handleChange}
                    maxLength="3000"
                    rows="6"
                    placeholder="Write your professional introduction. Use a new line for each paragraph."
                  />

                  <small>
                    Separate paragraphs with new lines.
                  </small>
                </label>

              </div>

            </section>

            {/* PROFESSIONAL INFORMATION */}

            <section className="prm-panel">

              <div className="prm-panel-heading">
                <div>
                  <span className="prm-eyebrow">
                    CAREER INFORMATION
                  </span>

                  <h3>Professional details</h3>
                </div>
              </div>

              <div className="prm-grid">

                <label>
                  EDUCATION

                  <input
                    name="education"
                    value={form.education}
                    onChange={handleChange}
                    placeholder="B.Tech CSE"
                  />
                </label>

                <label>
                  DEVELOPMENT FOCUS

                  <input
                    name="focus"
                    value={form.focus}
                    onChange={handleChange}
                    placeholder="Full Stack Development"
                  />
                </label>

                <label>
                  SPECIALIZATION

                  <input
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    placeholder="MERN Stack"
                  />
                </label>

                <label>
                  CURRENT STATUS

                  <input
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    placeholder="OPEN TO INTERNSHIPS"
                  />
                </label>

              </div>

            </section>

            {/* CONTACT INFORMATION */}

            <section className="prm-panel">

              <div className="prm-panel-heading">
                <div>
                  <span className="prm-eyebrow">
                    CONNECT WITH ME
                  </span>

                  <h3>Contact and social links</h3>
                </div>

                <FaEnvelope />
              </div>

              <div className="prm-grid">

                <label>
                  PROFESSIONAL EMAIL *

                  <div className="prm-input-icon">
                    <FaEnvelope />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </label>

                <label>
                  GITHUB URL

                  <div className="prm-input-icon">
                    <FaGithub />

                    <input
                      type="url"
                      name="github"
                      value={form.github}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                    />
                  </div>
                </label>

                <label className="prm-full">
                  LINKEDIN URL

                  <div className="prm-input-icon">
                    <FaLinkedin />

                    <input
                      type="url"
                      name="linkedin"
                      value={form.linkedin}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </label>

              </div>

            </section>

            {/* PROFILE PREVIEW */}

            <section className="prm-panel prm-preview-panel">

              <div className="prm-panel-heading">
                <div>
                  <span className="prm-eyebrow">
                    LIVE FORM PREVIEW
                  </span>

                  <h3>Public profile identity</h3>
                </div>

                <FaEye />
              </div>

              <div className="prm-preview-card">

                <div className="prm-preview-avatar">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                    />
                  ) : (
                    "DG"
                  )}
                </div>

                <div>
                  <h3>{form.name}</h3>

                  <span>{form.title}</span>

                  <p>{form.shortBio}</p>

                  <div className="prm-preview-links">
                    {form.github && <FaGithub />}
                    {form.linkedin && <FaLinkedin />}
                    {form.email && <FaEnvelope />}
                  </div>
                </div>

              </div>

            </section>

            {/* SAVE BUTTON */}

            <div className="prm-save-section">

              <div>
                <FaShieldAlt />

                <span>
                  Profile changes are saved to MongoDB.
                </span>
              </div>

              <button
                type="submit"
                className="prm-save-button"
                disabled={saving}
              >
                {saving ? (
                  <>
                    <FaSpinner className="prm-spin" />
                    SAVING PROFILE...
                  </>
                ) : (
                  <>
                    <FaSave />
                    SAVE PROFILE CHANGES
                  </>
                )}
              </button>

            </div>

          </form>
        )}

      </div>
    </>
  );
}

// ==========================================
// PROFILE MANAGER CSS
// ==========================================

const profileManagerStyles = `

.prm-container {
  color: #f4f7ff;
  animation: prmAppear 0.4s ease;
}

@keyframes prmAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.prm-eyebrow {
  display: block;
  color: #56e5f2;
  font: 9px monospace;
  letter-spacing: 0.15em;
  margin-bottom: 8px;
}

.prm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 23px;
}

.prm-header h2 {
  font-size: 25px;
  margin: 0 0 7px;
}

.prm-header p {
  font-size: 11px;
  color: #8998ae;
  margin: 0;
}

.prm-secure-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid rgba(94,230,168,0.2);
  border-radius: 7px;
  background: rgba(94,230,168,0.055);
  color: #8ce9bc;
  font: 8px monospace;
}

.prm-message {
  padding: 12px;
  border-radius: 7px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 10px;
}

.prm-message span {
  display: flex;
  align-items: center;
  gap: 8px;
}

.prm-message button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.prm-message.success {
  color: #8ce9bc;
  background: rgba(94,230,168,0.07);
  border: 1px solid rgba(94,230,168,0.2);
}

.prm-message.error {
  color: #fda4af;
  background: rgba(248,113,113,0.07);
  border: 1px solid rgba(248,113,113,0.2);
}

/* PANELS */

.prm-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.prm-panel {
  padding: 22px;
  background: rgba(15,23,40,0.87);
  border: 1px solid rgba(148,163,184,0.14);
  border-radius: 11px;
  min-width: 0;
}

.prm-panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 22px;
  gap: 12px;
}

.prm-panel-heading h3 {
  font-size: 14px;
  margin: 0;
}

.prm-panel-heading > svg {
  color: #56e5f2;
  font-size: 20px;
}

/* IMAGE PANEL */

.prm-image-content {
  display: flex;
  align-items: center;
  gap: 25px;
  flex-wrap: wrap;
}

.prm-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.prm-avatar {
  width: 120px;
  height: 120px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 28px;
  border: 2px solid rgba(86,229,242,0.5);
  background: linear-gradient(135deg,#154e68,#543078);
  color: white;
  font-size: 32px;
  font-weight: 900;
  box-shadow: 0 0 25px rgba(86,229,242,0.12);
}

.prm-avatar img,
.prm-preview-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prm-avatar-wrapper > i {
  position: absolute;
  bottom: 7px;
  right: 7px;
  height: 11px;
  width: 11px;
  border-radius: 50%;
  background: #5ee6a8;
  border: 2px solid #10182a;
}

.prm-image-info h3 {
  font-size: 17px;
  margin: 0 0 5px;
}

.prm-image-info p {
  font-size: 10px;
  color: #8c9cb3;
  margin: 0 0 15px;
}

.prm-image-info small {
  display: block;
  color: #75879f;
  font-size: 8px;
  margin-top: 11px;
}

.prm-image-actions {
  display: flex;
  gap: 9px;
  flex-wrap: wrap;
}

.prm-upload-button,
.prm-remove-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 6px;
  font: 8px monospace;
  cursor: pointer;
}

.prm-upload-button {
  color: #67e8f9;
  background: rgba(86,229,242,0.08);
  border: 1px solid rgba(86,229,242,0.25);
}

.prm-upload-button input {
  display: none;
}

.prm-remove-button {
  color: #fda4af;
  background: rgba(248,113,113,0.06);
  border: 1px solid rgba(248,113,113,0.2);
}

/* INPUT GRID */

.prm-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 17px;
}

.prm-grid label {
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: #a5b3c9;
  font: 9px monospace;
  min-width: 0;
}

.prm-full {
  grid-column: 1 / -1;
}

.prm-grid input:not([type="checkbox"]),
.prm-grid textarea {
  width: 100%;
  min-width: 0;
  outline: none;
  padding: 12px;
  border: 1px solid rgba(148,163,184,0.18);
  border-radius: 7px;
  background: #090f1e;
  color: white;
  font: 11px Arial,sans-serif;
  resize: vertical;
}

.prm-grid input:focus,
.prm-grid textarea:focus {
  border-color: rgba(86,229,242,0.7);
  box-shadow: 0 0 0 3px rgba(86,229,242,0.06);
}

.prm-grid small {
  color: #7689a3;
  font-size: 8px;
}

/* ICON INPUTS */

.prm-input-icon {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 11px;
  border: 1px solid rgba(148,163,184,0.18);
  background: #090f1e;
  border-radius: 7px;
  color: #56e5f2;
  min-width: 0;
}

.prm-input-icon:focus-within {
  border-color: #56e5f2;
}

.prm-input-icon input {
  border: none !important;
  box-shadow: none !important;
  padding-left: 0 !important;
}

/* LIVE PREVIEW */

.prm-preview-card {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 17px;
  border-radius: 9px;
  background:
    linear-gradient(
      120deg,
      rgba(86,229,242,0.07),
      rgba(167,139,250,0.07)
    );
  border: 1px solid rgba(86,229,242,0.17);
}

.prm-preview-avatar {
  width: 66px;
  height: 66px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 18px;
  display: grid;
  place-items: center;
  color: #b6f7ff;
  font-size: 20px;
  font-weight: 900;
  background: linear-gradient(135deg,#154e68,#543078);
}

.prm-preview-card h3 {
  margin: 0 0 6px;
  font-size: 15px;
}

.prm-preview-card > div:last-child > span {
  display: block;
  font-size: 9px;
  color: #67e8f9;
}

.prm-preview-card p {
  color: #91a0b6;
  font-size: 9px;
  line-height: 1.7;
  margin: 10px 0;
}

.prm-preview-links {
  display: flex;
  gap: 12px;
  color: #a78bfa;
}

/* SAVE */

.prm-save-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
  padding: 16px 0;
}

.prm-save-section > div {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #8b9bb1;
  font-size: 9px;
}

.prm-save-section > div svg {
  color: #5ee6a8;
}

.prm-save-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 14px 17px;
  border: 1px solid rgba(86,229,242,0.3);
  border-radius: 7px;
  color: white;
  background: linear-gradient(110deg,#087e95,#5942a8);
  font: 9px monospace;
  cursor: pointer;
  transition: 0.25s;
}

.prm-save-button:hover {
  box-shadow: 0 0 20px rgba(86,229,242,0.19);
  transform: translateY(-2px);
}

.prm-save-button:disabled {
  opacity: 0.5;
  cursor: wait;
}

.prm-loading {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #56e5f2;
  font-size: 11px;
}

.prm-spin {
  animation: prmSpin 1s linear infinite;
}

@keyframes prmSpin {
  to {
    transform: rotate(360deg);
  }
}

/* RESPONSIVE */

@media(max-width:650px) {
  .prm-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .prm-panel {
    padding: 16px;
  }

  .prm-grid {
    grid-template-columns: 1fr;
  }

  .prm-full {
    grid-column: auto;
  }

  .prm-image-content {
    gap: 16px;
  }

  .prm-avatar {
    width: 95px;
    height: 95px;
  }

  .prm-save-section {
    align-items: stretch;
    flex-direction: column;
  }

  .prm-save-button {
    width: 100%;
  }
}

`;