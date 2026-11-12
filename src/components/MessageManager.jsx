
import { useEffect, useState } from "react";

import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaTrash,
  FaSearch,
  FaSyncAlt,
  FaUser,
  FaClock,
  FaCheckCircle,
  FaInbox,
  FaArrowRight,
  FaSpinner,
  FaReply
} from "react-icons/fa";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

async function readResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Unexpected server response. HTTP ${response.status}. Check your backend API.`
    );
  }

  return response.json();
}

export default function MessageManager() {
  const [messages, setMessages] = useState([]);

  const [selectedMessage, setSelectedMessage] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState("all");

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================
  // LOAD MESSAGES
  // ==========================================

  async function loadMessages(isRefresh = false) {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/messages`,
        {
          method: "GET",
          credentials: "include"
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to load messages."
        );
      }

      const loadedMessages = result.messages || [];

      setMessages(loadedMessages);

      setSelectedMessage((previous) => {
        if (!previous) return null;

        return (
          loadedMessages.find(
            (item) => item._id === previous._id
          ) || null
        );
      });

    } catch (error) {
      setError(error.message);

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadMessages();

  }, []);

  // ==========================================
  // MARK AS READ / UNREAD
  // ==========================================

  async function toggleRead(message) {
    const newStatus = !message.isRead;

    try {
      const response = await fetch(
        `${API_URL}/api/messages/${message._id}/read`,
        {
          method: "PATCH",

          credentials: "include",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            isRead: newStatus
          })
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to update message."
        );
      }

      const updatedMessage = result.data;

      setMessages((previous) =>
        previous.map((item) =>
          item._id === message._id
            ? updatedMessage
            : item
        )
      );

      setSelectedMessage((previous) =>
        previous?._id === message._id
          ? updatedMessage
          : previous
      );

    } catch (error) {
      setError(error.message);
    }
  }

  // ==========================================
  // DELETE MESSAGE
  // ==========================================

  async function deleteMessage(message) {
    const confirmed = window.confirm(
      `Delete the message from ${message.name}?`
    );

    if (!confirmed) return;

    setDeletingId(message._id);

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/messages/${message._id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const result = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to delete message."
        );
      }

      setMessages((previous) =>
        previous.filter(
          (item) => item._id !== message._id
        )
      );

      if (selectedMessage?._id === message._id) {
        setSelectedMessage(null);
      }

      setSuccess("Message deleted successfully.");

    } catch (error) {
      setError(error.message);

    } finally {
      setDeletingId(null);
    }
  }

  // ==========================================
  // SELECT MESSAGE
  // ==========================================

  async function selectMessage(message) {
    setSelectedMessage(message);

    if (!message.isRead) {
      await toggleRead(message);
    }
  }

  // ==========================================
  // SEARCH AND FILTER
  // ==========================================

  const unreadCount = messages.filter(
    (item) => !item.isRead
  ).length;

  const readCount = messages.length - unreadCount;

  const filteredMessages = messages.filter((message) => {
    const searchableText = [
      message.name,
      message.email,
      message.subject,
      message.message
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch = searchableText.includes(
      search.toLowerCase()
    );

    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !message.isRead) ||
      (filter === "read" && message.isRead);

    return matchesSearch && matchesFilter;
  });

  // ==========================================
  // DATE FORMAT
  // ==========================================

  function formatDate(date) {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <style>{messageStyles}</style>

      <div className="mm-container">

        {/* HEADER */}

        <div className="mm-header">

          <div>
            <span className="mm-eyebrow">
              COMMUNICATION MANAGEMENT
            </span>

            <h2>Messages Inbox</h2>

            <p>
              Manage enquiries, opportunities and visitor messages.
            </p>
          </div>

          <button
            className="mm-refresh"
            onClick={() => loadMessages(true)}
            disabled={refreshing}
          >
            <FaSyncAlt className={refreshing ? "mm-spin" : ""} />
            REFRESH
          </button>

        </div>

        {/* STATUS MESSAGES */}

        {error && (
          <div className="mm-alert error">
            {error}
            <button onClick={() => setError("")}>×</button>
          </div>
        )}

        {success && (
          <div className="mm-alert success">
            {success}
            <button onClick={() => setSuccess("")}>×</button>
          </div>
        )}

        {/* STATISTICS */}

        <div className="mm-stats">

          <div className="mm-stat-card">
            <div className="mm-stat-icon cyan">
              <FaInbox />
            </div>

            <div>
              <strong>{messages.length}</strong>
              <span>TOTAL MESSAGES</span>
            </div>
          </div>

          <div className="mm-stat-card">
            <div className="mm-stat-icon purple">
              <FaEnvelope />
            </div>

            <div>
              <strong>{unreadCount}</strong>
              <span>UNREAD MESSAGES</span>
            </div>
          </div>

          <div className="mm-stat-card">
            <div className="mm-stat-icon green">
              <FaEnvelopeOpen />
            </div>

            <div>
              <strong>{readCount}</strong>
              <span>READ MESSAGES</span>
            </div>
          </div>

        </div>

        {/* INBOX */}

        <div className="mm-inbox">

          {/* MESSAGE LIST */}

          <section className="mm-list-panel">

            <div className="mm-list-heading">
              <h3>Inbox</h3>

              <span>
                {filteredMessages.length} RESULTS
              </span>
            </div>

            {/* SEARCH */}

            <div className="mm-search">
              <FaSearch />

              <input
                type="search"
                placeholder="Search messages..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            {/* FILTERS */}

            <div className="mm-filters">

              <button
                className={filter === "all" ? "active" : ""}
                onClick={() => setFilter("all")}
              >
                ALL
              </button>

              <button
                className={filter === "unread" ? "active" : ""}
                onClick={() => setFilter("unread")}
              >
                UNREAD
              </button>

              <button
                className={filter === "read" ? "active" : ""}
                onClick={() => setFilter("read")}
              >
                READ
              </button>

            </div>

            {/* LIST */}

            <div className="mm-message-list">

              {loading ? (
                <div className="mm-list-empty">
                  <FaSpinner className="mm-spin" />
                  <p>Loading inbox...</p>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="mm-list-empty">

                  <FaInbox />

                  <h4>No messages found</h4>

                  <p>
                    Messages sent through your portfolio
                    contact form will appear here.
                  </p>

                </div>
              ) : (
                filteredMessages.map((message) => (
                  <button
                    key={message._id}
                    className={`mm-message-item ${
                      selectedMessage?._id === message._id
                        ? "selected"
                        : ""
                    } ${!message.isRead ? "unread" : ""}`}
                    onClick={() => selectMessage(message)}
                  >

                    <div className="mm-avatar">
                      {message.name?.charAt(0).toUpperCase()}
                    </div>

                    <div className="mm-message-summary">

                      <div className="mm-message-top">
                        <strong>{message.name}</strong>

                        <span>
                          {formatDate(message.createdAt)}
                        </span>
                      </div>

                      <h4>{message.subject}</h4>

                      <p>{message.message}</p>

                      <div className="mm-message-status">
                        {message.isRead ? (
                          <span className="read-label">
                            <FaCheckCircle />
                            READ
                          </span>
                        ) : (
                          <span className="unread-label">
                            <i />
                            NEW MESSAGE
                          </span>
                        )}
                      </div>

                    </div>

                  </button>
                ))
              )}

            </div>
          </section>

          {/* MESSAGE DETAIL */}

          <section className="mm-detail-panel">

            {selectedMessage ? (
              <>

                <div className="mm-detail-heading">

                  <span className="mm-eyebrow">
                    MESSAGE DETAILS
                  </span>

                  <button
                    className="mm-delete-button"
                    onClick={() => deleteMessage(selectedMessage)}
                    disabled={deletingId === selectedMessage._id}
                  >
                    <FaTrash />

                    {deletingId === selectedMessage._id
                      ? "DELETING"
                      : "DELETE"}
                  </button>

                </div>

                <div className="mm-detail-subject">
                  <h2>{selectedMessage.subject}</h2>

                  <span>
                    {selectedMessage.isRead
                      ? "READ"
                      : "UNREAD"}
                  </span>
                </div>

                {/* SENDER */}

                <div className="mm-sender">

                  <div className="mm-sender-avatar">
                    {selectedMessage.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <strong>{selectedMessage.name}</strong>

                    <a href={`mailto:${selectedMessage.email}`}>
                      {selectedMessage.email}
                    </a>
                  </div>

                </div>

                {/* DATE */}

                <div className="mm-detail-date">
                  <FaClock />

                  Received {formatDate(selectedMessage.createdAt)}
                </div>

                {/* MESSAGE BODY */}

                <div className="mm-message-body">

                  <span>MESSAGE CONTENT</span>

                  <p>
                    {selectedMessage.message}
                  </p>

                </div>

                {/* ACTIONS */}

                <div className="mm-detail-actions">

                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                      `Re: ${selectedMessage.subject}`
                    )}`}
                    className="mm-reply-button"
                  >
                    <FaReply />
                    REPLY VIA EMAIL
                    <FaArrowRight />
                  </a>

                  <button
                    onClick={() => toggleRead(selectedMessage)}
                    className="mm-read-button"
                  >
                    {selectedMessage.isRead ? (
                      <>
                        <FaEnvelope />
                        MARK AS UNREAD
                      </>
                    ) : (
                      <>
                        <FaCheckCircle />
                        MARK AS READ
                      </>
                    )}
                  </button>

                </div>

              </>
            ) : (
              <div className="mm-detail-empty">

                <div className="mm-detail-empty-icon">
                  <FaEnvelope />
                </div>

                <h3>Select a message</h3>

                <p>
                  Choose a message from your inbox
                  to read its complete contents.
                </p>

              </div>
            )}

          </section>
        </div>

        {/* FOOTER */}

        <div className="mm-footer">
          <FaCheckCircle />

          YOUR MESSAGE CENTER IS CONNECTED TO MONGODB
        </div>

      </div>
    </>
  );
}

// ==========================================
// MESSAGE MANAGER CSS
// ==========================================

const messageStyles = `

.mm-container {
  color: #f4f7ff;
  animation: mmAppear 0.4s ease;
}

@keyframes mmAppear {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 23px;
}

.mm-eyebrow {
  display: block;
  color: #56e5f2;
  font: 9px monospace;
  letter-spacing: 0.15em;
  margin-bottom: 8px;
}

.mm-header h2 {
  margin: 0 0 7px;
  font-size: 25px;
}

.mm-header p {
  color: #8998ae;
  font-size: 11px;
  margin: 0;
}

.mm-refresh {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 14px;
  border: 1px solid rgba(86,229,242,0.25);
  border-radius: 7px;
  background: rgba(86,229,242,0.06);
  color: #67e8f9;
  font: 8px monospace;
  cursor: pointer;
}

.mm-refresh:disabled {
  opacity: 0.5;
  cursor: wait;
}

.mm-spin {
  animation: mmSpin 1s linear infinite;
}

@keyframes mmSpin {
  to {
    transform: rotate(360deg);
  }
}

.mm-alert {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  margin-bottom: 15px;
  border-radius: 7px;
  font-size: 10px;
}

.mm-alert button {
  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
}

.mm-alert.error {
  color: #fda4af;
  background: rgba(248,113,113,0.08);
  border: 1px solid rgba(248,113,113,0.2);
}

.mm-alert.success {
  color: #8ce9bc;
  background: rgba(94,230,168,0.08);
  border: 1px solid rgba(94,230,168,0.2);
}

/* STATISTICS */

.mm-stats {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 13px;
  margin-bottom: 20px;
}

.mm-stat-card {
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 17px;
  border: 1px solid rgba(148,163,184,0.13);
  border-radius: 9px;
  background: rgba(15,23,40,0.85);
}

.mm-stat-icon {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
}

.mm-stat-icon.cyan {
  background: rgba(86,229,242,0.1);
  color: #56e5f2;
}

.mm-stat-icon.purple {
  background: rgba(167,139,250,0.1);
  color: #a78bfa;
}

.mm-stat-icon.green {
  background: rgba(94,230,168,0.1);
  color: #5ee6a8;
}

.mm-stat-card strong {
  display: block;
  font-size: 21px;
}

.mm-stat-card span {
  display: block;
  margin-top: 4px;
  font: 8px monospace;
  color: #8292aa;
}

/* INBOX */

.mm-inbox {
  display: grid;
  grid-template-columns: minmax(0,1fr) minmax(0,1.1fr);
  border: 1px solid rgba(148,163,184,0.14);
  border-radius: 12px;
  background: rgba(11,17,30,0.88);
  overflow: hidden;
  min-height: 570px;
}

.mm-list-panel {
  border-right: 1px solid rgba(148,163,184,0.13);
  min-width: 0;
}

.mm-list-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 18px 15px;
}

.mm-list-heading h3 {
  font-size: 14px;
  margin: 0;
}

.mm-list-heading span {
  color: #8292aa;
  font: 8px monospace;
}

.mm-search {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 16px 14px;
  padding: 11px;
  background: #090f1e;
  border: 1px solid rgba(148,163,184,0.15);
  border-radius: 7px;
  color: #7889a2;
}

.mm-search input {
  width: 100%;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  font-size: 10px;
}

.mm-filters {
  display: flex;
  gap: 7px;
  padding: 0 16px 14px;
}

.mm-filters button {
  padding: 7px 11px;
  background: transparent;
  border: 1px solid rgba(148,163,184,0.15);
  color: #8d9bb1;
  border-radius: 5px;
  font: 8px monospace;
  cursor: pointer;
}

.mm-filters button.active {
  background: rgba(86,229,242,0.09);
  color: #67e8f9;
  border-color: rgba(86,229,242,0.32);
}

.mm-message-list {
  max-height: 540px;
  overflow-y: auto;
  border-top: 1px solid rgba(148,163,184,0.10);
}

.mm-message-item {
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  text-align: left;
  background: transparent;
  color: inherit;
  border: none;
  border-bottom: 1px solid rgba(148,163,184,0.09);
  cursor: pointer;
  transition: 0.2s;
}

.mm-message-item:hover {
  background: rgba(86,229,242,0.035);
}

.mm-message-item.selected {
  background: rgba(86,229,242,0.08);
  box-shadow: inset 3px 0 0 #56e5f2;
}

.mm-avatar,
.mm-sender-avatar {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 11px;
  color: #bffaff;
  font-size: 13px;
  font-weight: 800;
  background: linear-gradient(135deg,#164e69,#493075);
  border: 1px solid rgba(86,229,242,0.2);
}

.mm-message-summary {
  flex: 1;
  min-width: 0;
}

.mm-message-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
}

.mm-message-top strong {
  font-size: 10px;
}

.mm-message-top > span {
  flex-shrink: 0;
  color: #687990;
  font: 7px monospace;
}

.mm-message-summary h4 {
  margin: 7px 0;
  font-size: 10px;
  color: #b8c7dc;
}

.mm-message-summary p {
  color: #8090a7;
  font-size: 9px;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mm-message-status {
  margin-top: 10px;
}

.mm-message-status span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font: 7px monospace;
}

.read-label {
  color: #5ee6a8;
}

.unread-label {
  color: #67e8f9;
}

.unread-label i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #56e5f2;
  box-shadow: 0 0 8px #56e5f2;
}

/* EMPTY LIST */

.mm-list-empty {
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 25px;
  color: #8494aa;
}

.mm-list-empty > svg {
  font-size: 24px;
  color: #56e5f2;
}

.mm-list-empty h4 {
  color: #e4edfc;
  font-size: 13px;
  margin: 14px 0 5px;
}

.mm-list-empty p {
  max-width: 240px;
  font-size: 9px;
  line-height: 1.7;
}

/* DETAIL PANEL */

.mm-detail-panel {
  min-width: 0;
  padding: 22px;
  position: relative;
}

.mm-detail-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.mm-delete-button {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  color: #fda4af;
  background: rgba(248,113,113,0.06);
  border: 1px solid rgba(248,113,113,0.18);
  border-radius: 5px;
  font: 7px monospace;
  cursor: pointer;
}

.mm-delete-button:disabled {
  opacity: 0.5;
  cursor: wait;
}

.mm-detail-subject {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-top: 22px;
}

.mm-detail-subject h2 {
  margin: 0;
  font-size: 19px;
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
}

.mm-detail-subject > span {
  padding: 5px 7px;
  border-radius: 4px;
  background: rgba(86,229,242,0.08);
  color: #67e8f9;
  font: 7px monospace;
}

.mm-sender {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 17px 0;
  margin-top: 16px;
  border-bottom: 1px solid rgba(148,163,184,0.12);
}

.mm-sender > div:last-child {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.mm-sender strong {
  font-size: 10px;
}

.mm-sender a {
  color: #56e5f2;
  font-size: 9px;
  text-decoration: none;
  overflow-wrap: anywhere;
}

.mm-detail-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8392a8;
  font: 8px monospace;
  margin-top: 16px;
}

.mm-detail-date svg {
  color: #56e5f2;
}

.mm-message-body {
  min-height: 170px;
  padding: 17px;
  margin-top: 19px;
  border: 1px solid rgba(148,163,184,0.13);
  border-radius: 9px;
  background: rgba(86,229,242,0.025);
}

.mm-message-body > span {
  color: #56e5f2;
  font: 8px monospace;
  letter-spacing: 0.1em;
}

.mm-message-body p {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  color: #c3cede;
  font-size: 11px;
  line-height: 1.9;
  margin-top: 17px;
}

.mm-detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 19px;
}

.mm-reply-button,
.mm-read-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 11px;
  border-radius: 6px;
  font: 8px monospace;
  text-decoration: none;
  cursor: pointer;
}

.mm-reply-button {
  color: white;
  border: 1px solid rgba(86,229,242,0.25);
  background: linear-gradient(110deg,#12617c,#463176);
}

.mm-read-button {
  color: #a8c9e2;
  border: 1px solid rgba(148,163,184,0.2);
  background: transparent;
}

/* DETAIL EMPTY */

.mm-detail-empty {
  height: 100%;
  min-height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.mm-detail-empty-icon {
  height: 70px;
  width: 70px;
  display: grid;
  place-items: center;
  border-radius: 22px;
  color: #67e8f9;
  font-size: 26px;
  background: rgba(86,229,242,0.08);
  border: 1px solid rgba(86,229,242,0.18);
}

.mm-detail-empty h3 {
  font-size: 15px;
  margin: 18px 0 7px;
}

.mm-detail-empty p {
  max-width: 250px;
  color: #8494aa;
  font-size: 10px;
  line-height: 1.7;
}

.mm-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  color: #5ee6a8;
  font: 8px monospace;
  letter-spacing: 0.09em;
  padding: 18px;
}

@media(max-width:900px) {
  .mm-inbox {
    grid-template-columns: 1fr;
  }

  .mm-list-panel {
    border-right: none;
    border-bottom: 1px solid rgba(148,163,184,0.13);
  }

  .mm-message-list {
    max-height: 400px;
  }
}

@media(max-width:600px) {
  .mm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .mm-stats {
    grid-template-columns: 1fr;
  }

  .mm-stat-card {
    padding: 13px;
  }

  .mm-detail-panel {
    padding: 16px;
  }

  .mm-detail-subject h2 {
    font-size: 15px;
  }

  .mm-message-top {
    flex-direction: column;
    gap: 5px;
  }

  .mm-message-top > span {
    font-size: 7px;
  }
}

`;