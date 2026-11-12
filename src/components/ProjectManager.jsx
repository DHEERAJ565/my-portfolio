

import { useEffect, useState } from "react";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaGithub,
  FaExternalLinkAlt,
  FaFolderOpen,
  FaSave,
  FaSpinner
} from "react-icons/fa";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const emptyForm = {
  title: "",
  type: "",
  description: "",
  tech: "",
  github: "",
  liveDemo: "",
  order: 0,
  featured: false
};

function getImageSource(image) {
  if (!image) return "";

  if (/^https?:\/\//i.test(image)) {
    return image;
  }

  if (image.startsWith("/uploads/")) {
    return `${API_URL}${image}`;
  }

  return image;
}

export default function ProjectManager() {
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProject, setEditingProject] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState(null);

  const [imagePreview, setImagePreview] = useState("");

  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

  // ==========================================
  // LOAD PROJECTS
  // ==========================================

  async function loadProjects() {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/projects`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load projects.");
      }

      setProjects(result.projects || []);

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
    loadProjects();
  }, []);

  // ==========================================
  // FORM INPUT
  // ==========================================

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  function openAddForm() {
    setEditingProject(null);

    setForm(emptyForm);

    setImageFile(null);

    setImagePreview("");

    setMessage({
      type: "",
      text: ""
    });

    setShowForm(true);
  }

  // ==========================================
  // OPEN EDIT FORM
  // ==========================================

  function openEditForm(project) {
    setEditingProject(project);

    setForm({
      title: project.title || "",
      type: project.type || "",
      description: project.description || "",
      tech: (project.tech || []).join(", "),
      github: project.github || "",
      liveDemo: project.liveDemo || "",
      order: project.order ?? 0,
      featured: Boolean(project.featured)
    });

    setImageFile(null);

    setImagePreview(
      getImageSource(project.image)
    );

    setMessage({
      type: "",
      text: ""
    });

    setShowForm(true);
  }

  // ==========================================
  // IMAGE CHANGE
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
        text: "Choose a JPG, PNG, WEBP or GIF image."
      });

      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({
        type: "error",
        text: "Image size must be smaller than 5 MB."
      });

      event.target.value = "";
      return;
    }

    setImageFile(file);

    setImagePreview(URL.createObjectURL(file));

    setMessage({
      type: "",
      text: ""
    });
  }

  // ==========================================
  // SAVE PROJECT
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

      formData.append("title", form.title);
      formData.append("type", form.type);
      formData.append("description", form.description);
      formData.append("tech", form.tech);
      formData.append("github", form.github);
      formData.append("liveDemo", form.liveDemo);
      formData.append("order", String(form.order));
      formData.append("featured", String(form.featured));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const isEditing = Boolean(editingProject);

      const url = isEditing
        ? `${API_URL}/api/projects/${editingProject._id}`
        : `${API_URL}/api/projects`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        credentials: "include",

        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save project."
        );
      }

      setMessage({
        type: "success",
        text: result.message
      });

      setShowForm(false);

      setEditingProject(null);

      setForm(emptyForm);

      setImageFile(null);

      setImagePreview("");

      await loadProjects();

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
  // DELETE PROJECT
  // ==========================================

  async function deleteProject(project) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.title}"?`
    );

    if (!confirmed) return;

    setDeletingId(project._id);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const response = await fetch(
        `${API_URL}/api/projects/${project._id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete project."
        );
      }

      setMessage({
        type: "success",
        text: result.message
      });

      await loadProjects();

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });

    } finally {
      setDeletingId(null);
    }
  }

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredProjects = projects.filter((project) => {
    const searchable = [
      project.title,
      project.type,
      project.description,
      ...(project.tech || [])
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(search.toLowerCase());
  });

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>{projectManagerStyles}</style>

      <div className="pm-container">

        {/* HEADER */}

        <div className="pm-header">

          <div>
            <span className="pm-eyebrow">
              PORTFOLIO CONTENT MANAGEMENT
            </span>

            <h2>Project Manager</h2>

            <p>
              Create, update and manage your development projects.
            </p>
          </div>

          <button
            className="pm-add-button"
            onClick={openAddForm}
          >
            <FaPlus />
            ADD PROJECT
          </button>

        </div>

        {/* NOTIFICATIONS */}

        {message.text && (
          <div className={`pm-message ${message.type}`}>
            <span>{message.text}</span>

            <button
              type="button"
              onClick={() =>
                setMessage({ type: "", text: "" })
              }
              aria-label="Dismiss message"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {/* PROJECT STATISTICS */}

        <div className="pm-summary">

          <div className="pm-summary-card">
            <FaFolderOpen />

            <div>
              <strong>{projects.length}</strong>
              <span>TOTAL PROJECTS</span>
            </div>
          </div>

          <div className="pm-summary-card">
            <FaImage />

            <div>
              <strong>
                {projects.filter((project) => project.image).length}
              </strong>

              <span>WITH IMAGES</span>
            </div>
          </div>

          <div className="pm-summary-card">
            <FaGithub />

            <div>
              <strong>
                {projects.filter((project) => project.github).length}
              </strong>

              <span>GITHUB LINKS</span>
            </div>
          </div>

        </div>

        {/* SEARCH */}

        <div className="pm-toolbar">
          <input
            type="search"
            placeholder="Search your projects..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <span>
            SHOWING {filteredProjects.length} PROJECTS
          </span>
        </div>

        {/* LOADING */}

        {loading ? (
          <div className="pm-empty">
            <FaSpinner className="pm-spinner" />
            <p>Loading your projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="pm-empty">
            <FaFolderOpen />

            <h3>No projects found</h3>

            <p>
              Add your first project or change your search.
            </p>

            <button onClick={openAddForm}>
              <FaPlus />
              CREATE PROJECT
            </button>
          </div>
        ) : (

          /* PROJECT CARDS */

          <div className="pm-grid">

            {filteredProjects.map((project) => (
              <article
                className="pm-card"
                key={project._id}
              >

                <div className="pm-image">

                  {project.image ? (
                    <img
                      src={getImageSource(project.image)}
                      alt={project.title}
                    />
                  ) : (
                    <div className="pm-image-placeholder">
                      <FaFolderOpen />
                    </div>
                  )}

                  <span>
                    {project.type}
                  </span>

                </div>

                <div className="pm-card-body">

                  <h3>{project.title}</h3>

                  <p>{project.description}</p>

                  <div className="pm-tech">
                    {(project.tech || []).map((tech) => (
                      <span key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pm-links">

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaExternalLinkAlt />
                        Live Demo
                      </a>
                    )}

                  </div>

                  <div className="pm-actions">

                    <button
                      className="pm-edit"
                      onClick={() => openEditForm(project)}
                    >
                      <FaEdit />
                      EDIT
                    </button>

                    <button
                      className="pm-delete"
                      onClick={() => deleteProject(project)}
                      disabled={deletingId === project._id}
                    >
                      <FaTrash />

                      {deletingId === project._id
                        ? "DELETING..."
                        : "DELETE"}
                    </button>

                  </div>

                </div>
              </article>
            ))}

          </div>
        )}

        {/* ADD / EDIT MODAL */}

        {showForm && (
          <div
            className="pm-modal-overlay"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !saving) {
                setShowForm(false);
              }
            }}
          >

            <form
              className="pm-modal"
              onSubmit={handleSubmit}
            >

              <div className="pm-modal-header">

                <div>
                  <span className="pm-eyebrow">
                    PROJECT CONFIGURATION
                  </span>

                  <h2>
                    {editingProject
                      ? "Edit Project"
                      : "Create Project"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                  aria-label="Close form"
                >
                  <FaTimes />
                </button>

              </div>

              <div className="pm-form-grid">

                <label>
                  PROJECT NAME *

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Example: Paw-Mart"
                    maxLength="100"
                    required
                  />
                </label>

                <label>
                  PROJECT CATEGORY

                  <input
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Example: E-COMMERCE"
                  />
                </label>

                <label className="pm-full">
                  DESCRIPTION *

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Describe what your project does..."
                    rows="4"
                    maxLength="2000"
                    required
                  />
                </label>

                <label className="pm-full">
                  TECHNOLOGIES

                  <input
                    name="tech"
                    value={form.tech}
                    onChange={handleChange}
                    placeholder="React, Node.js, Express, MongoDB"
                  />

                  <small>
                    Separate technologies using commas.
                  </small>
                </label>

                <label>
                  GITHUB URL

                  <input
                    name="github"
                    type="url"
                    value={form.github}
                    onChange={handleChange}
                    placeholder="https://github.com/..."
                  />
                </label>

                <label>
                  LIVE DEMO URL

                  <input
                    name="liveDemo"
                    type="url"
                    value={form.liveDemo}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </label>

                <label>
                  DISPLAY ORDER

                  <input
                    name="order"
                    type="number"
                    value={form.order}
                    onChange={handleChange}
                    min="0"
                  />
                </label>

                <label className="pm-checkbox">
                  <input
                    name="featured"
                    type="checkbox"
                    checked={form.featured}
                    onChange={handleChange}
                  />

                  FEATURED PROJECT
                </label>

                {/* IMAGE UPLOAD */}

                <div className="pm-upload-section pm-full">

                  <span>PROJECT IMAGE</span>

                  <label className="pm-upload-area">

                    <FaImage />

                    <strong>
                      Click to upload project image
                    </strong>

                    <small>
                      JPG, PNG, WEBP or GIF • Maximum 5 MB
                    </small>

                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      onChange={handleImageChange}
                    />

                  </label>

                  {imagePreview && (
                    <div className="pm-image-preview">

                      <img
                        src={imagePreview}
                        alt="Project preview"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview("");
                        }}
                      >
                        <FaTimes />
                        Remove selected image
                      </button>

                    </div>
                  )}

                </div>

              </div>

              <div className="pm-modal-actions">

                <button
                  type="button"
                  className="pm-cancel"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="pm-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FaSpinner className="pm-spinner" />
                      SAVING...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingProject
                        ? "UPDATE PROJECT"
                        : "SAVE PROJECT"}
                    </>
                  )}
                </button>

              </div>

            </form>
          </div>
        )}

      </div>
    </>
  );
}

// ==========================================
// PROJECT MANAGER STYLES
// ==========================================

const projectManagerStyles = `

.pm-container {
  color: #f4f7ff;
  animation: pmAppear 0.4s ease;
}

@keyframes pmAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 22px;
}

.pm-eyebrow {
  display: block;
  color: #56e5f2;
  font: 9px monospace;
  letter-spacing: 0.15em;
  margin-bottom: 9px;
}

.pm-header h2 {
  font-size: 25px;
  margin: 0 0 7px;
}

.pm-header p {
  color: #8796ac;
  font-size: 11px;
  margin: 0;
}

.pm-add-button,
.pm-save {
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid rgba(86,229,242,0.35);
  background: linear-gradient(110deg, #087e95, #5942a8);
  color: white;
  padding: 12px 17px;
  border-radius: 8px;
  cursor: pointer;
  font: 9px monospace;
  letter-spacing: 0.08em;
}

.pm-add-button:hover,
.pm-save:hover {
  box-shadow: 0 0 25px rgba(86,229,242,0.2);
  transform: translateY(-2px);
}

.pm-message {
  padding: 12px 15px;
  border-radius: 8px;
  margin-bottom: 17px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 11px;
}

.pm-message button {
  background: transparent;
  color: inherit;
  border: none;
  cursor: pointer;
}

.pm-message.success {
  color: #8cf2bd;
  background: rgba(94,230,168,0.08);
  border: 1px solid rgba(94,230,168,0.25);
}

.pm-message.error {
  color: #fda4af;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.25);
}

.pm-summary {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 13px;
  margin-bottom: 20px;
}

.pm-summary-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  background: rgba(16,25,43,0.78);
  border: 1px solid rgba(148,163,184,0.12);
  border-radius: 9px;
}

.pm-summary-card > svg {
  font-size: 20px;
  color: #56e5f2;
}

.pm-summary-card strong {
  display: block;
  font-size: 21px;
}

.pm-summary-card span {
  display: block;
  font: 8px monospace;
  color: #8796ac;
  margin-top: 4px;
}

.pm-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  margin-bottom: 18px;
}

.pm-toolbar input {
  width: min(340px, 100%);
  background: #0c1525;
  border: 1px solid rgba(148,163,184,0.18);
  outline: none;
  border-radius: 8px;
  padding: 12px 14px;
  color: white;
  font-size: 11px;
}

.pm-toolbar input:focus {
  border-color: #56e5f2;
}

.pm-toolbar span {
  color: #7e8da4;
  font: 8px monospace;
}

.pm-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 16px;
}

.pm-card {
  overflow: hidden;
  background: rgba(14,22,38,0.86);
  border: 1px solid rgba(148,163,184,0.13);
  border-radius: 11px;
  transition: 0.25s;
}

.pm-card:hover {
  transform: translateY(-4px);
  border-color: rgba(86,229,242,0.35);
  box-shadow: 0 12px 35px rgba(0,0,0,0.2);
}

.pm-image {
  height: 165px;
  position: relative;
  overflow: hidden;
  background: #121b30;
}

.pm-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pm-image > span {
  position: absolute;
  top: 12px;
  left: 12px;
  font: 8px monospace;
  letter-spacing: 0.08em;
  color: white;
  padding: 7px 10px;
  background: rgba(7,10,23,0.75);
  border: 1px solid rgba(86,229,242,0.2);
  border-radius: 5px;
}

.pm-image-placeholder {
  height: 100%;
  display: grid;
  place-items: center;
  color: #56e5f2;
  font-size: 35px;
  background: radial-gradient(circle, #22355a, #10172a);
}

.pm-card-body {
  padding: 17px;
}

.pm-card-body h3 {
  font-size: 16px;
  margin: 0 0 8px;
}

.pm-card-body p {
  color: #8999ae;
  font-size: 10px;
  line-height: 1.7;
  min-height: 50px;
}

.pm-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 12px 0;
}

.pm-tech span {
  font: 8px monospace;
  color: #a9c9f1;
  background: rgba(86,229,242,0.07);
  border: 1px solid rgba(86,229,242,0.12);
  padding: 6px 8px;
  border-radius: 5px;
}

.pm-links {
  display: flex;
  gap: 14px;
  margin: 15px 0;
}

.pm-links a {
  display: flex;
  gap: 7px;
  align-items: center;
  color: #8da3bd;
  text-decoration: none;
  font-size: 9px;
}

.pm-links a:hover {
  color: #56e5f2;
}

.pm-actions {
  display: flex;
  gap: 9px;
  padding-top: 13px;
  border-top: 1px solid rgba(148,163,184,0.12);
}

.pm-actions button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px;
  font: 9px monospace;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.pm-edit {
  color: #67e8f9;
  background: rgba(86,229,242,0.08);
  border: 1px solid rgba(86,229,242,0.2);
}

.pm-edit:hover {
  background: rgba(86,229,242,0.16);
}

.pm-delete {
  color: #fda4af;
  background: rgba(248,113,113,0.06);
  border: 1px solid rgba(248,113,113,0.2);
}

.pm-delete:hover {
  background: rgba(248,113,113,0.14);
}

.pm-delete:disabled {
  opacity: 0.5;
  cursor: wait;
}

.pm-empty {
  min-height: 240px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13px;
  color: #8796ac;
  border: 1px dashed rgba(148,163,184,0.2);
  border-radius: 11px;
  text-align: center;
}

.pm-empty > svg {
  font-size: 28px;
  color: #56e5f2;
}

.pm-empty h3,
.pm-empty p {
  margin: 0;
}

.pm-empty h3 {
  color: #f4f7ff;
  font-size: 15px;
}

.pm-empty p {
  font-size: 10px;
}

.pm-empty button {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 13px;
  color: #56e5f2;
  border: 1px solid rgba(86,229,242,0.25);
  border-radius: 6px;
  background: rgba(86,229,242,0.08);
  cursor: pointer;
  font-size: 9px;
}

.pm-spinner {
  animation: pmSpin 1s linear infinite;
}

@keyframes pmSpin {
  to { transform: rotate(360deg); }
}

/* MODAL */

.pm-modal-overlay {
  position: fixed;
  z-index: 1000;
  inset: 0;
  padding: 20px;
  display: grid;
  place-items: center;
  background: rgba(3,5,13,0.83);
  backdrop-filter: blur(10px);
}

.pm-modal {
  width: min(690px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  background: #10182a;
  border: 1px solid rgba(86,229,242,0.25);
  border-radius: 15px;
  box-shadow: 0 25px 80px rgba(0,0,0,0.5);
}

.pm-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 22px;
}

.pm-modal-header h2 {
  font-size: 22px;
  margin: 0;
}

.pm-modal-header > button {
  color: #9aabc0;
  background: transparent;
  border: none;
  font-size: 17px;
  cursor: pointer;
}

.pm-modal-header > button:disabled {
  opacity: 0.4;
}

.pm-form-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 16px;
}

.pm-form-grid label {
  display: flex;
  flex-direction: column;
  gap: 9px;
  color: #a4b1c5;
  font: 9px monospace;
  letter-spacing: 0.06em;
  min-width: 0;
}

.pm-full {
  grid-column: 1 / -1;
}

.pm-form-grid input:not([type="checkbox"]),
.pm-form-grid textarea {
  width: 100%;
  min-width: 0;
  color: white;
  background: #090f1d;
  border: 1px solid rgba(148,163,184,0.19);
  padding: 12px;
  border-radius: 7px;
  outline: none;
  font: 11px Arial,sans-serif;
}

.pm-form-grid input:focus,
.pm-form-grid textarea:focus {
  border-color: #56e5f2;
}

.pm-form-grid small {
  color: #788aa2;
  font-size: 8px;
}

.pm-checkbox {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 10px !important;
}

.pm-checkbox input {
  accent-color: #56e5f2;
}

.pm-upload-section > span {
  display: block;
  margin-bottom: 10px;
}

.pm-upload-area {
  display: flex !important;
  align-items: center;
  justify-content: center;
  gap: 9px !important;
  min-height: 105px;
  padding: 15px;
  text-align: center;
  border: 1px dashed rgba(86,229,242,0.35);
  border-radius: 9px;
  background: rgba(86,229,242,0.035);
  cursor: pointer;
}

.pm-upload-area > svg {
  color: #56e5f2;
  font-size: 20px;
}

.pm-upload-area strong {
  font-size: 10px;
  color: #dbe7f7;
}

.pm-upload-area small {
  font-size: 8px;
  color: #7d90a9;
}

.pm-upload-area input {
  display: none;
}

.pm-image-preview {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.pm-image-preview img {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid rgba(86,229,242,0.3);
}

.pm-image-preview button {
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  background: transparent;
  color: #fda4af;
  font-size: 9px;
  cursor: pointer;
}

.pm-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 24px;
  padding-top: 17px;
  border-top: 1px solid rgba(148,163,184,0.13);
}

.pm-modal-actions button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 7px;
  padding: 12px 15px;
  font: 9px monospace;
  cursor: pointer;
}

.pm-cancel {
  color: #a4b1c5;
  background: transparent;
  border: 1px solid rgba(148,163,184,0.2);
}

.pm-save:disabled {
  opacity: 0.6;
  cursor: wait;
}

@media(max-width:700px) {
  .pm-grid {
    grid-template-columns: 1fr;
  }

  .pm-summary {
    grid-template-columns: 1fr;
  }

  .pm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .pm-add-button {
    width: 100%;
    justify-content: center;
  }

  .pm-toolbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .pm-toolbar input {
    width: 100%;
  }

  .pm-form-grid {
    grid-template-columns: 1fr;
  }

  .pm-full {
    grid-column: auto;
  }

  .pm-modal {
    padding: 17px;
  }
}
`;