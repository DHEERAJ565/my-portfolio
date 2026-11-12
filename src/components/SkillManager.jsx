
import { useEffect, useState } from "react";

import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaCode,
  FaDatabase,
  FaServer,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaTimes,
  FaSave,
  FaSpinner,
  FaLayerGroup
} from "react-icons/fa";

import {
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiFastapi,
  SiDocker
} from "react-icons/si";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const iconOptions = {
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

const emptyForm = {
  name: "",
  type: "Frontend",
  icon: "code",
  level: "Learning",
  order: 0
};

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      "The backend returned an unexpected response. Check your API route."
    );
  }

  return response.json();
}

export default function SkillManager() {
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All");

  const [showForm, setShowForm] = useState(false);

  const [editingSkill, setEditingSkill] = useState(null);

  const [form, setForm] = useState(emptyForm);

  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

  // ==========================================
  // LOAD SKILLS
  // ==========================================

  async function loadSkills() {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/skills`
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load skills."
        );
      }

      setSkills(result.skills || []);

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
    loadSkills();
  }, []);

  // ==========================================
  // FORM CHANGES
  // ==========================================

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  }

  // ==========================================
  // ADD SKILL
  // ==========================================

  function openAddForm() {
    setEditingSkill(null);
    setForm(emptyForm);

    setMessage({
      type: "",
      text: ""
    });

    setShowForm(true);
  }

  // ==========================================
  // EDIT SKILL
  // ==========================================

  function openEditForm(skill) {
    setEditingSkill(skill);

    setForm({
      name: skill.name || "",
      type: skill.type || "Frontend",
      icon: skill.icon || "code",
      level: skill.level || "Learning",
      order: skill.order ?? 0
    });

    setMessage({
      type: "",
      text: ""
    });

    setShowForm(true);
  }

  // ==========================================
  // SAVE SKILL
  // ==========================================

  async function handleSubmit(event) {
    event.preventDefault();

    setSaving(true);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const isEditing = Boolean(editingSkill);

      const url = isEditing
        ? `${API_URL}/api/skills/${editingSkill._id}`
        : `${API_URL}/api/skills`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          ...form,
          order: Number(form.order) || 0
        })
      });

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to save skill."
        );
      }

      setShowForm(false);
      setEditingSkill(null);
      setForm(emptyForm);

      setMessage({
        type: "success",
        text: result.message
      });

      await loadSkills();

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
  // DELETE SKILL
  // ==========================================

  async function deleteSkill(skill) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${skill.name}?`
    );

    if (!confirmed) return;

    setDeletingId(skill._id);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const response = await fetch(
        `${API_URL}/api/skills/${skill._id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete skill."
        );
      }

      setMessage({
        type: "success",
        text: result.message
      });

      await loadSkills();

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
  // SEARCH AND FILTER
  // ==========================================

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = (
      `${skill.name} ${skill.type} ${skill.level}`
    )
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || skill.type === filter;

    return matchesSearch && matchesFilter;
  });

  const categories = [
    "All",
    ...new Set(skills.map((skill) => skill.type))
  ];

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>{skillManagerStyles}</style>

      <div className="sm-container">

        {/* HEADER */}

        <div className="sm-header">
          <div>
            <span className="sm-eyebrow">
              DEVELOPER CAPABILITIES
            </span>

            <h2>Skills Manager</h2>

            <p>
              Manage the technologies displayed on your public portfolio.
            </p>
          </div>

          <button
            className="sm-add-button"
            onClick={openAddForm}
          >
            <FaPlus />
            ADD SKILL
          </button>
        </div>

        {/* NOTIFICATION */}

        {message.text && (
          <div className={`sm-message ${message.type}`}>
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

        {/* STATISTICS */}

        <div className="sm-stats">

          <div className="sm-stat">
            <FaLayerGroup />

            <div>
              <strong>{skills.length}</strong>
              <span>TOTAL SKILLS</span>
            </div>
          </div>

          <div className="sm-stat">
            <FaCode />

            <div>
              <strong>
                {skills.filter((s) => s.level === "Core").length}
              </strong>
              <span>CORE SKILLS</span>
            </div>
          </div>

          <div className="sm-stat">
            <FaDatabase />

            <div>
              <strong>
                {new Set(skills.map((s) => s.type)).size}
              </strong>
              <span>CATEGORIES</span>
            </div>
          </div>

        </div>

        {/* SEARCH AND FILTER */}

        <div className="sm-toolbar">

          <div className="sm-search">
            <FaSearch />

            <input
              type="search"
              placeholder="Search technologies..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="sm-filters">
            {categories.map((category) => (
              <button
                key={category}
                className={filter === category ? "active" : ""}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

        </div>

        {/* SKILLS GRID */}

        {loading ? (
          <div className="sm-empty">
            <FaSpinner className="sm-spin" />
            Loading technologies...
          </div>
        ) : filteredSkills.length === 0 ? (
          <div className="sm-empty">
            <FaLayerGroup />

            <h3>No skills found</h3>

            <p>Add a new technology or change your search.</p>

            <button onClick={openAddForm}>
              <FaPlus />
              ADD YOUR FIRST SKILL
            </button>
          </div>
        ) : (
          <div className="sm-grid">

            {filteredSkills.map((skill, index) => (
              <article
                className="sm-card"
                key={skill._id}
              >

                <div className="sm-card-top">
                  <span>
                    SKILL / {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className={`sm-level ${skill.level.toLowerCase()}`}>
                    {skill.level}
                  </span>
                </div>

                <div className="sm-icon">
                  {iconOptions[skill.icon] || <FaCode />}
                </div>

                <h3>{skill.name}</h3>

                <span className="sm-category">
                  {skill.type}
                </span>

                <div className="sm-card-actions">

                  <button
                    className="sm-edit"
                    onClick={() => openEditForm(skill)}
                  >
                    <FaEdit />
                    EDIT
                  </button>

                  <button
                    className="sm-delete"
                    onClick={() => deleteSkill(skill)}
                    disabled={deletingId === skill._id}
                  >
                    <FaTrash />

                    {deletingId === skill._id
                      ? "DELETING..."
                      : "DELETE"}
                  </button>

                </div>

              </article>
            ))}

          </div>
        )}

        {/* ADD / EDIT MODAL */}

        {showForm && (
          <div
            className="sm-modal-overlay"
            onMouseDown={(event) => {
              if (
                event.target === event.currentTarget &&
                !saving
              ) {
                setShowForm(false);
              }
            }}
          >

            <form
              className="sm-modal"
              onSubmit={handleSubmit}
            >

              <div className="sm-modal-heading">
                <div>
                  <span className="sm-eyebrow">
                    TECHNOLOGY CONFIGURATION
                  </span>

                  <h2>
                    {editingSkill ? "Edit Skill" : "Add Skill"}
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

              <div className="sm-form-grid">

                <label>
                  SKILL NAME *

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Example: React.js"
                    maxLength="60"
                    required
                  />
                </label>

                <label>
                  CATEGORY *

                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Language">Language</option>
                    <option value="UI">UI / Styling</option>
                    <option value="DevOps">DevOps</option>
                    <option value="Python">Python</option>
                    <option value="Tools">Tools</option>
                  </select>
                </label>

                <label>
                  TECHNOLOGY ICON

                  <select
                    name="icon"
                    value={form.icon}
                    onChange={handleChange}
                  >
                    {Object.keys(iconOptions).map((icon) => (
                      <option key={icon} value={icon}>
                        {icon.charAt(0).toUpperCase() + icon.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  SKILL LEVEL

                  <select
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                  >
                    <option value="Core">Core</option>
                    <option value="Learning">Learning</option>
                    <option value="Exploring">Exploring</option>
                  </select>
                </label>

                <label className="sm-full">
                  DISPLAY ORDER

                  <input
                    name="order"
                    type="number"
                    min="0"
                    value={form.order}
                    onChange={handleChange}
                  />

                  <small>
                    Lower numbers appear first.
                  </small>
                </label>

              </div>

              {/* ICON PREVIEW */}

              <div className="sm-preview">
                <span>LIVE PREVIEW</span>

                <div className="sm-preview-card">
                  <div className="sm-preview-icon">
                    {iconOptions[form.icon] || <FaCode />}
                  </div>

                  <div>
                    <strong>
                      {form.name || "Skill Name"}
                    </strong>

                    <span>
                      {form.type} / {form.level}
                    </span>
                  </div>
                </div>
              </div>

              {/* FORM ACTIONS */}

              <div className="sm-modal-actions">

                <button
                  type="button"
                  className="sm-cancel"
                  onClick={() => setShowForm(false)}
                  disabled={saving}
                >
                  CANCEL
                </button>

                <button
                  type="submit"
                  className="sm-save"
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FaSpinner className="sm-spin" />
                      SAVING...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      {editingSkill ? "UPDATE SKILL" : "SAVE SKILL"}
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
// SKILL MANAGER CSS
// ==========================================

const skillManagerStyles = `

.sm-container {
  color: #f4f7ff;
  animation: smAppear 0.4s ease;
}

@keyframes smAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.sm-eyebrow {
  display: block;
  color: #56e5f2;
  font: 9px monospace;
  letter-spacing: 0.15em;
  margin-bottom: 8px;
}

.sm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 23px;
}

.sm-header h2 {
  font-size: 25px;
  margin: 0 0 7px;
}

.sm-header p {
  color: #8998ae;
  font-size: 11px;
  margin: 0;
}

.sm-add-button,
.sm-save {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 12px 16px;
  border: 1px solid rgba(86,229,242,0.3);
  border-radius: 7px;
  color: white;
  background: linear-gradient(110deg,#087e95,#5942a8);
  font: 9px monospace;
  cursor: pointer;
}

.sm-add-button:hover,
.sm-save:hover {
  box-shadow: 0 0 20px rgba(86,229,242,0.18);
}

.sm-message {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  padding: 12px;
  border-radius: 7px;
  margin-bottom: 15px;
  font-size: 10px;
}

.sm-message button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.sm-message.success {
  color: #8ce9bc;
  background: rgba(94,230,168,0.07);
  border: 1px solid rgba(94,230,168,0.2);
}

.sm-message.error {
  color: #fda4af;
  background: rgba(248,113,113,0.07);
  border: 1px solid rgba(248,113,113,0.2);
}

/* STATISTICS */

.sm-stats {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 13px;
  margin-bottom: 20px;
}

.sm-stat {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 16px;
  border: 1px solid rgba(148,163,184,0.13);
  border-radius: 9px;
  background: rgba(15,23,40,0.82);
}

.sm-stat > svg {
  font-size: 20px;
  color: #56e5f2;
}

.sm-stat strong {
  display: block;
  font-size: 21px;
}

.sm-stat span {
  display: block;
  margin-top: 4px;
  font: 8px monospace;
  color: #8292aa;
}

/* SEARCH */

.sm-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 20px;
}

.sm-search {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 270px;
  max-width: 100%;
  padding: 11px;
  border: 1px solid rgba(148,163,184,0.16);
  background: #0c1525;
  border-radius: 7px;
  color: #8192a9;
}

.sm-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 10px;
}

.sm-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.sm-filters button {
  border: 1px solid rgba(148,163,184,0.15);
  border-radius: 5px;
  color: #8797ad;
  background: transparent;
  padding: 7px 10px;
  font: 8px monospace;
  cursor: pointer;
}

.sm-filters button.active {
  color: #67e8f9;
  background: rgba(86,229,242,0.08);
  border-color: rgba(86,229,242,0.3);
}

/* SKILL CARDS */

.sm-grid {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 13px;
}

.sm-card {
  padding: 17px;
  position: relative;
  border-radius: 10px;
  border: 1px solid rgba(148,163,184,0.14);
  background: linear-gradient(145deg,rgba(20,31,52,0.9),rgba(11,17,30,0.9));
  transition: 0.25s;
  overflow: hidden;
}

.sm-card:hover {
  transform: translateY(-4px);
  border-color: rgba(86,229,242,0.35);
  box-shadow: 0 10px 30px rgba(0,0,0,0.18);
}

.sm-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.sm-card-top > span:first-child {
  color: #71829b;
  font: 8px monospace;
}

.sm-level {
  font: 7px monospace;
  padding: 5px 7px;
  border-radius: 4px;
}

.sm-level.core {
  color: #5ee6a8;
  background: rgba(94,230,168,0.1);
}

.sm-level.learning {
  color: #67e8f9;
  background: rgba(86,229,242,0.1);
}

.sm-level.exploring {
  color: #c4a5ff;
  background: rgba(167,139,250,0.1);
}

.sm-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin-top: 20px;
  border-radius: 12px;
  color: #67e8f9;
  background: rgba(86,229,242,0.08);
  border: 1px solid rgba(86,229,242,0.16);
  font-size: 23px;
}

.sm-card h3 {
  margin: 14px 0 5px;
  font-size: 15px;
}

.sm-category {
  color: #8191a8;
  font-size: 9px;
}

.sm-card-actions {
  display: flex;
  gap: 8px;
  margin-top: 18px;
  padding-top: 13px;
  border-top: 1px solid rgba(148,163,184,0.11);
}

.sm-card-actions button {
  flex: 1;
  padding: 9px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border-radius: 5px;
  font: 8px monospace;
  cursor: pointer;
}

.sm-edit {
  color: #67e8f9;
  border: 1px solid rgba(86,229,242,0.2);
  background: rgba(86,229,242,0.06);
}

.sm-delete {
  color: #fda4af;
  border: 1px solid rgba(248,113,113,0.2);
  background: rgba(248,113,113,0.05);
}

.sm-card-actions button:disabled {
  opacity: 0.5;
  cursor: wait;
}

/* EMPTY STATE */

.sm-empty {
  min-height: 230px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-align: center;
  color: #8b9bb0;
  border: 1px dashed rgba(148,163,184,0.2);
  border-radius: 10px;
}

.sm-empty > svg {
  color: #56e5f2;
  font-size: 25px;
}

.sm-empty h3,
.sm-empty p {
  margin: 0;
}

.sm-empty h3 {
  color: white;
  font-size: 14px;
}

.sm-empty p {
  font-size: 10px;
}

.sm-empty button {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 9px 12px;
  color: #67e8f9;
  border: 1px solid rgba(86,229,242,0.2);
  background: rgba(86,229,242,0.06);
  border-radius: 6px;
  cursor: pointer;
  font: 8px monospace;
}

/* MODAL */

.sm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  display: grid;
  place-items: center;
  background: rgba(3,5,13,0.83);
  backdrop-filter: blur(10px);
}

.sm-modal {
  width: min(560px,100%);
  max-height: 90vh;
  overflow-y: auto;
  padding: 24px;
  border: 1px solid rgba(86,229,242,0.25);
  border-radius: 13px;
  background: #10182a;
  box-shadow: 0 25px 80px rgba(0,0,0,0.45);
}

.sm-modal-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 22px;
}

.sm-modal-heading h2 {
  font-size: 22px;
  margin: 0;
}

.sm-modal-heading > button {
  color: #9aabc0;
  background: transparent;
  border: none;
  font-size: 17px;
  cursor: pointer;
}

.sm-form-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 15px;
}

.sm-form-grid label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #a6b4c8;
  font: 9px monospace;
  min-width: 0;
}

.sm-form-grid input,
.sm-form-grid select {
  width: 100%;
  min-width: 0;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid rgba(148,163,184,0.18);
  background: #090f1d;
  color: white;
  outline: none;
  font-size: 10px;
}

.sm-form-grid input:focus,
.sm-form-grid select:focus {
  border-color: #56e5f2;
}

.sm-form-grid small {
  color: #8090a7;
  font-size: 8px;
}

.sm-full {
  grid-column: 1 / -1;
}

/* PREVIEW */

.sm-preview {
  margin-top: 21px;
}

.sm-preview > span {
  display: block;
  color: #56e5f2;
  font: 8px monospace;
  margin-bottom: 10px;
}

.sm-preview-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px;
  background: rgba(86,229,242,0.045);
  border: 1px solid rgba(86,229,242,0.16);
  border-radius: 8px;
}

.sm-preview-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  color: #67e8f9;
  background: rgba(86,229,242,0.1);
  border-radius: 9px;
  font-size: 19px;
}

.sm-preview-card strong,
.sm-preview-card span {
  display: block;
}

.sm-preview-card strong {
  font-size: 11px;
}

.sm-preview-card span {
  margin-top: 5px;
  color: #8393aa;
  font-size: 9px;
}

/* MODAL BUTTONS */

.sm-modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 23px;
  padding-top: 16px;
  border-top: 1px solid rgba(148,163,184,0.12);
}

.sm-modal-actions button {
  padding: 11px 14px;
  border-radius: 6px;
  font: 8px monospace;
  cursor: pointer;
}

.sm-cancel {
  color: #9aa9bf;
  border: 1px solid rgba(148,163,184,0.2);
  background: transparent;
}

.sm-save:disabled,
.sm-cancel:disabled {
  opacity: 0.5;
  cursor: wait;
}

.sm-spin {
  animation: smSpin 1s linear infinite;
}

@keyframes smSpin {
  to {
    transform: rotate(360deg);
  }
}

@media(max-width:900px) {
  .sm-grid {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }
}

@media(max-width:600px) {
  .sm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .sm-add-button {
    width: 100%;
    justify-content: center;
  }

  .sm-stats {
    grid-template-columns: 1fr;
  }

  .sm-grid {
    grid-template-columns: 1fr;
  }

  .sm-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .sm-search {
    width: 100%;
  }

  .sm-form-grid {
    grid-template-columns: 1fr;
  }

  .sm-full {
    grid-column: auto;
  }

  .sm-modal {
    padding: 17px;
  }
}

`;