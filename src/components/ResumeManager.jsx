

import { useEffect, useState } from "react";

import {
  FaFilePdf,
  FaUpload,
  FaDownload,
  FaTrash,
  FaEye,
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaSpinner,
  FaCloudUploadAlt,
  FaSyncAlt
} from "react-icons/fa";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

export default function ResumeManager() {
  const [resume, setResume] = useState(null);

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const [preview, setPreview] = useState(false);

  const [message, setMessage] = useState({
    type: "",
    text: ""
  });

  // ==========================================
  // LOAD RESUME INFORMATION
  // ==========================================

  async function loadResume() {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/resume`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to retrieve resume."
        );
      }

      setResume(
        result.hasResume ? result.resume : null
      );

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
    loadResume();
  }, []);

  // ==========================================
  // FILE SELECTION
  // ==========================================

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (
      file.type !== "application/pdf" ||
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setSelectedFile(null);

      setMessage({
        type: "error",
        text: "Please select a valid PDF file."
      });

      event.target.value = "";
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSelectedFile(null);

      setMessage({
        type: "error",
        text: "Maximum allowed file size is 10 MB."
      });

      event.target.value = "";
      return;
    }

    setSelectedFile(file);

    setMessage({
      type: "",
      text: ""
    });
  }

  // ==========================================
  // UPLOAD / REPLACE RESUME
  // ==========================================

  async function handleUpload(event) {
    event.preventDefault();

    if (!selectedFile) {
      setMessage({
        type: "error",
        text: "Please select your CV first."
      });

      return;
    }

    setUploading(true);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const formData = new FormData();

      formData.append(
        "resume",
        selectedFile
      );

      const response = await fetch(
        `${API_URL}/api/resume/upload`,
        {
          method: "POST",
          credentials: "include",
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Resume upload failed."
        );
      }

      setSelectedFile(null);

      setMessage({
        type: "success",
        text: result.message
      });

      await loadResume();

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });

    } finally {
      setUploading(false);
    }
  }

  // ==========================================
  // DELETE RESUME
  // ==========================================

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your CV?"
    );

    if (!confirmed) return;

    setDeleting(true);

    setMessage({
      type: "",
      text: ""
    });

    try {
      const response = await fetch(
        `${API_URL}/api/resume`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Resume deletion failed."
        );
      }

      setResume(null);

      setPreview(false);

      setMessage({
        type: "success",
        text: result.message
      });

    } catch (error) {
      setMessage({
        type: "error",
        text: error.message
      });

    } finally {
      setDeleting(false);
    }
  }

  // ==========================================
  // HELPERS
  // ==========================================

  function formatSize(bytes) {
    if (!bytes) return "0 KB";

    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  function formatDate(date) {
    if (!date) return "Not available";

    return new Date(date).toLocaleString();
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>{resumeStyles}</style>

      <div className="rm-container">

        {/* HEADER */}

        <div className="rm-header">
          <div>
            <span className="rm-eyebrow">
              CAREER DOCUMENT MANAGEMENT
            </span>

            <h2>Resume Manager</h2>

            <p>
              Upload, preview, replace and manage your professional CV.
            </p>
          </div>

          <div className="rm-secure-badge">
            <FaShieldAlt />
            SECURE ADMIN ACCESS
          </div>
        </div>

        {/* MESSAGE */}

        {message.text && (
          <div className={`rm-message ${message.type}`}>
            <span>
              {message.type === "success" && <FaCheckCircle />}
              {message.text}
            </span>

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

        {/* MAIN CONTENT */}

        {loading ? (
          <div className="rm-loading">
            <FaSpinner className="rm-spin" />
            Loading your resume...
          </div>
        ) : (
          <div className="rm-layout">

            {/* LEFT PANEL */}

            <section className="rm-panel">

              <div className="rm-panel-heading">
                <div>
                  <span className="rm-eyebrow">
                    DOCUMENT STORAGE
                  </span>

                  <h3>
                    {resume ? "Current CV" : "Upload your CV"}
                  </h3>
                </div>

                <FaFilePdf className="rm-heading-icon" />
              </div>

              {resume ? (
                <div className="rm-current-resume">

                  <div className="rm-pdf-icon">
                    <FaFilePdf />
                  </div>

                  <div className="rm-file-info">
                    <strong>
                      {resume.originalName}
                    </strong>

                    <span>
                      {formatSize(resume.fileSize)}
                    </span>

                    <span>
                      Uploaded: {formatDate(resume.uploadedAt)}
                    </span>
                  </div>

                  <div className="rm-file-status">
                    <FaCheckCircle />
                    ACTIVE
                  </div>

                  <div className="rm-file-actions">

                    <button
                      type="button"
                      onClick={() => setPreview((value) => !value)}
                    >
                      <FaEye />
                      {preview ? "HIDE PREVIEW" : "PREVIEW"}
                    </button>

                    <a
                      href={`${API_URL}/api/resume/download`}
                    >
                      <FaDownload />
                      DOWNLOAD
                    </a>

                  </div>

                  {preview && (
                    <div className="rm-preview">
                      <iframe
                        src={`${API_URL}/api/resume/preview`}
                        title="Resume PDF Preview"
                      />
                    </div>
                  )}

                </div>
              ) : (
                <div className="rm-empty">

                  <div className="rm-empty-icon">
                    <FaFilePdf />
                  </div>

                  <h3>No CV uploaded yet</h3>

                  <p>
                    Upload your professional resume to make it
                    available on your portfolio.
                  </p>

                  <span>PDF FORMAT • MAXIMUM 10 MB</span>

                </div>
              )}

            </section>

            {/* RIGHT PANEL */}

            <section className="rm-panel rm-upload-panel">

              <div className="rm-panel-heading">
                <div>
                  <span className="rm-eyebrow">
                    FILE MANAGEMENT
                  </span>

                  <h3>
                    {resume ? "Replace your CV" : "Upload new CV"}
                  </h3>
                </div>

                <FaCloudUploadAlt className="rm-heading-icon" />
              </div>

              <form onSubmit={handleUpload}>

                <label className="rm-upload-area">

                  <FaCloudUploadAlt />

                  <strong>
                    Select your resume PDF
                  </strong>

                  <span>
                    Drag and drop is not enabled yet.
                    Click here to browse files.
                  </span>

                  <small>
                    PDF only • Maximum 10 MB
                  </small>

                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                  />

                </label>

                {selectedFile && (
                  <div className="rm-selected-file">

                    <FaFilePdf />

                    <div>
                      <strong>{selectedFile.name}</strong>

                      <span>
                        {formatSize(selectedFile.size)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedFile(null)}
                      aria-label="Remove selected file"
                    >
                      <FaTimes />
                    </button>

                  </div>
                )}

                <button
                  type="submit"
                  className="rm-upload-button"
                  disabled={!selectedFile || uploading}
                >
                  {uploading ? (
                    <>
                      <FaSpinner className="rm-spin" />
                      UPLOADING...
                    </>
                  ) : (
                    <>
                      {resume ? <FaSyncAlt /> : <FaUpload />}

                      {resume
                        ? "REPLACE CURRENT CV"
                        : "UPLOAD CV"}
                    </>
                  )}
                </button>

              </form>

              {resume && (
                <button
                  type="button"
                  className="rm-delete-button"
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <FaSpinner className="rm-spin" />
                  ) : (
                    <FaTrash />
                  )}

                  {deleting ? "DELETING..." : "DELETE CURRENT CV"}
                </button>
              )}

              <div className="rm-security-note">
                <FaShieldAlt />

                <p>
                  Only authenticated administrators can upload,
                  replace or delete your resume. Visitors can
                  download the currently published PDF.
                </p>
              </div>

            </section>
          </div>
        )}

      </div>
    </>
  );
}

// ==========================================
// RESUME MANAGER CSS
// ==========================================

const resumeStyles = `

.rm-container {
  color: #f4f7ff;
  animation: rmAppear 0.4s ease;
}

@keyframes rmAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rm-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.rm-eyebrow {
  color: #56e5f2;
  font: 9px monospace;
  letter-spacing: 0.15em;
  display: block;
  margin-bottom: 9px;
}

.rm-header h2 {
  font-size: 25px;
  margin: 0 0 7px;
}

.rm-header p {
  font-size: 11px;
  color: #8998ae;
  margin: 0;
}

.rm-secure-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  color: #8ce9bc;
  border: 1px solid rgba(94,230,168,0.2);
  border-radius: 7px;
  background: rgba(94,230,168,0.055);
  font: 8px monospace;
}

.rm-message {
  padding: 13px;
  margin-bottom: 18px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 10px;
}

.rm-message span {
  display: flex;
  align-items: center;
  gap: 9px;
}

.rm-message.success {
  color: #8ce9bc;
  background: rgba(94,230,168,0.08);
  border: 1px solid rgba(94,230,168,0.2);
}

.rm-message.error {
  color: #fda4af;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.2);
}

.rm-message button {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
}

.rm-layout {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 17px;
}

.rm-panel {
  padding: 23px;
  background: rgba(15,23,40,0.88);
  border: 1px solid rgba(148,163,184,0.14);
  border-radius: 12px;
  min-width: 0;
}

.rm-panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.rm-panel-heading h3 {
  font-size: 16px;
  margin: 0;
}

.rm-heading-icon {
  color: #56e5f2;
  font-size: 21px;
}

.rm-current-resume {
  border: 1px solid rgba(86,229,242,0.16);
  background: rgba(86,229,242,0.035);
  border-radius: 10px;
  padding: 17px;
}

.rm-pdf-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  font-size: 24px;
  color: #fca5a5;
  background: rgba(248,113,113,0.1);
  border: 1px solid rgba(248,113,113,0.18);
  margin-bottom: 16px;
}

.rm-file-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-wrap: anywhere;
}

.rm-file-info strong {
  font-size: 12px;
  color: #e7efff;
}

.rm-file-info span {
  font-size: 9px;
  color: #8393aa;
}

.rm-file-status {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 16px;
  padding: 7px 9px;
  border-radius: 5px;
  color: #8ce9bc;
  background: rgba(94,230,168,0.08);
  font: 8px monospace;
}

.rm-file-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}

.rm-file-actions button,
.rm-file-actions a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 6px;
  padding: 10px;
  font: 8px monospace;
  text-decoration: none;
  color: #67e8f9;
  border: 1px solid rgba(86,229,242,0.2);
  background: rgba(86,229,242,0.06);
  cursor: pointer;
}

.rm-file-actions button:hover,
.rm-file-actions a:hover {
  background: rgba(86,229,242,0.14);
}

.rm-preview {
  margin-top: 18px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(86,229,242,0.2);
}

.rm-preview iframe {
  width: 100%;
  height: 460px;
  border: none;
  background: white;
}

.rm-empty {
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.rm-empty-icon {
  height: 65px;
  width: 65px;
  display: grid;
  place-items: center;
  border-radius: 18px;
  color: #fca5a5;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.2);
  font-size: 27px;
}

.rm-empty h3 {
  font-size: 14px;
  margin: 17px 0 8px;
}

.rm-empty p {
  max-width: 280px;
  font-size: 10px;
  color: #8b9ab0;
  line-height: 1.7;
}

.rm-empty span {
  margin-top: 10px;
  color: #56e5f2;
  font: 8px monospace;
}

.rm-upload-area {
  min-height: 220px;
  padding: 25px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 13px;
  border: 1px dashed rgba(86,229,242,0.38);
  border-radius: 10px;
  background: rgba(86,229,242,0.035);
  cursor: pointer;
  text-align: center;
  transition: 0.25s;
}

.rm-upload-area:hover {
  border-color: #56e5f2;
  background: rgba(86,229,242,0.08);
}

.rm-upload-area > svg {
  font-size: 31px;
  color: #56e5f2;
}

.rm-upload-area strong {
  font-size: 11px;
  color: #e3edff;
}

.rm-upload-area span {
  font-size: 9px;
  color: #8797ae;
}

.rm-upload-area small {
  color: #64758d;
  font: 8px monospace;
}

.rm-upload-area input {
  display: none;
}

.rm-selected-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 14px;
  background: rgba(86,229,242,0.045);
  border: 1px solid rgba(86,229,242,0.13);
  border-radius: 7px;
  min-width: 0;
}

.rm-selected-file > svg {
  color: #fca5a5;
  font-size: 19px;
  flex-shrink: 0;
}

.rm-selected-file > div {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}

.rm-selected-file strong {
  font-size: 9px;
  overflow-wrap: anywhere;
}

.rm-selected-file span {
  font-size: 8px;
  color: #8191a8;
}

.rm-selected-file button {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #fda4af;
  cursor: pointer;
}

.rm-upload-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 16px;
  padding: 14px;
  border: 1px solid rgba(86,229,242,0.32);
  border-radius: 7px;
  background: linear-gradient(110deg,#087e95,#5942a8);
  color: white;
  font: 9px monospace;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.rm-upload-button:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.rm-delete-button {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #fda4af;
  background: rgba(248,113,113,0.05);
  border: 1px solid rgba(248,113,113,0.2);
  border-radius: 7px;
  font: 8px monospace;
  cursor: pointer;
}

.rm-delete-button:hover {
  background: rgba(248,113,113,0.12);
}

.rm-delete-button:disabled {
  opacity: 0.5;
  cursor: wait;
}

.rm-security-note {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(94,230,168,0.04);
  border: 1px solid rgba(94,230,168,0.12);
  border-radius: 7px;
}

.rm-security-note svg {
  color: #5ee6a8;
  flex-shrink: 0;
}

.rm-security-note p {
  margin: 0;
  color: #8999ae;
  font-size: 9px;
  line-height: 1.7;
}

.rm-loading {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #56e5f2;
  font-size: 11px;
}

.rm-spin {
  animation: rmSpin 1s linear infinite;
}

@keyframes rmSpin {
  to { transform: rotate(360deg); }
}

@media(max-width:850px) {
  .rm-layout {
    grid-template-columns: 1fr;
  }
}

@media(max-width:600px) {
  .rm-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .rm-secure-badge {
    font-size: 7px;
  }

  .rm-panel {
    padding: 16px;
  }

  .rm-upload-area {
    padding: 17px;
  }
}

`;