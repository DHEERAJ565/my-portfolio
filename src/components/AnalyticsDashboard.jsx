
import { useEffect, useState } from "react";

import {
  FaProjectDiagram,
  FaCode,
  FaEnvelope,
  FaEnvelopeOpen,
  FaFilePdf,
  FaUser,
  FaSyncAlt,
  FaClock,
  FaEye, 
  FaUsers
} from "react-icons/fa";

import "./AnalyticsDashboard.css";

export default function AnalyticsDashboard() {

  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const API_URL = (
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000"
  ).replace(/\/$/, "");

  // ==========================================
  // FETCH ANALYTICS
  // ==========================================

  async function fetchAnalytics() {

    setLoading(true);
    setError("");

    try {

      const response = await fetch(
        `${API_URL}/api/admin/analytics`,
        {
          method: "GET",

          credentials: "include"
        }
      );

      const result = await response.json();

      if (!response.ok) {

        throw new Error(
          result.message ||
          "Unable to load analytics."
        );

      }

      setData(result);

    } catch (err) {

      setError(
        err.message ||
        "Something went wrong."
      );

    } finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    fetchAnalytics();

  }, []);

  // ==========================================
  // DATE FORMAT
  // ==========================================

  function formatDate(date) {

    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString(
      "en-IN",
      {
        dateStyle: "medium",
        timeStyle: "short"
      }
    );

  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="analytics-loading">

        <FaSyncAlt className="analytics-spinner" />

        <p>LOADING ANALYTICS...</p>

      </div>

    );

  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="analytics-error">

        <h3>ANALYTICS UNAVAILABLE</h3>

        <p>{error}</p>

        <button onClick={fetchAnalytics}>
          RETRY
        </button>

      </div>

    );

  }

  if (!data?.analytics) return null;

  const stats = data.analytics;

  // ==========================================
  // STAT CARDS
  // ==========================================

  const cards = [

    {
      title: "TOTAL PROJECTS",
      value: stats.totalProjects,
      icon: <FaProjectDiagram />,
      color: "cyan"
    },

    {
      title: "TOTAL SKILLS",
      value: stats.totalSkills,
      icon: <FaCode />,
      color: "purple"
    },

    {
      title: "TOTAL MESSAGES",
      value: stats.totalMessages,
      icon: <FaEnvelope />,
      color: "blue"
    },

    {
      title: "UNREAD MESSAGES",
      value: stats.unreadMessages,
      icon: <FaEnvelopeOpen />,
      color: "green"
    },

    {
  title: "PAGE VIEWS / 30 DAYS",
  value: stats.pageViews30Days ?? 0,
  icon: <FaEye />,
  color: "cyan"
},

{
  title: "UNIQUE VISITORS / 30 DAYS",
  value: stats.uniqueVisitors30Days ?? 0,
  icon: <FaUsers />,
  color: "purple"
}

  ];

  // ==========================================
  // MAIN DASHBOARD
  // ==========================================

  return (

    <div className="analytics-dashboard">

      {/* HEADER */}

      <div className="analytics-header">

        <div>

          <div className="analytics-label">
            SYSTEM ANALYTICS / OVERVIEW
          </div>

          <h1>
            Portfolio <span>Analytics.</span>
          </h1>

          <p>
            Real-time information from your portfolio database.
          </p>

        </div>

        <button
          className="analytics-refresh"
          onClick={fetchAnalytics}
        >

          <FaSyncAlt />

          REFRESH DATA

        </button>

      </div>


      {/* STATISTICS */}

      <div className="analytics-stats-grid">

        {cards.map((card) => (

          <div
            className={`analytics-stat-card ${card.color}`}
            key={card.title}
          >

            <div className="analytics-stat-top">

              <span>
                {card.title}
              </span>

              <div className="analytics-stat-icon">
                {card.icon}
              </div>

            </div>

            <h2>
              {card.value}
            </h2>

            <div className="analytics-stat-footer">
              DATABASE RECORDS
            </div>

          </div>

        ))}

      </div>


      {/* SYSTEM STATUS */}


      {/* ======================================
    TRAFFIC ANALYTICS
====================================== */}

<div className="analytics-traffic-grid">

  {/* DAILY TRAFFIC */}

  <div className="analytics-activity-panel">

    <div className="analytics-panel-heading">

      <div>
        <span>01 / VISITOR ACTIVITY</span>
        <h2>Last 7 Days Traffic</h2>
      </div>

      <FaEye />

    </div>

    {data.dailyPageViews?.length ? (

      <div className="traffic-chart">

        {data.dailyPageViews.map((day) => {

          const maxViews = Math.max(
            1,
            ...data.dailyPageViews.map(
              (item) => item.views
            )
          );

          const height = Math.max(
            8,
            (day.views / maxViews) * 100
          );

          return (

            <div
              className="traffic-chart-column"
              key={day.date}
            >

              <strong>{day.views}</strong>

              <div className="traffic-chart-track">

                <div
                  className="traffic-chart-bar"
                  style={{
                    height: `${height}%`
                  }}
                />

              </div>

              <span>
                {new Date(
                  `${day.date}T00:00:00+05:30`
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short"
                })}
              </span>

            </div>

          );

        })}

      </div>

    ) : (

      <div className="analytics-empty">
        No page views recorded yet.
      </div>

    )}

  </div>


  {/* POPULAR SECTIONS */}

  <div className="analytics-activity-panel">

    <div className="analytics-panel-heading">

      <div>
        <span>02 / CONTENT PERFORMANCE</span>
        <h2>Popular Sections</h2>
      </div>

      <FaProjectDiagram />

    </div>

    {data.sectionStats?.length ? (

      <div className="popular-section-list">

        {data.sectionStats.map((item) => {

          const maxViews = Math.max(
            1,
            ...data.sectionStats.map(
              (section) => section.views
            )
          );

          const percentage =
            (item.views / maxViews) * 100;

          return (

            <div
              className="popular-section-item"
              key={item.section}
            >

              <div className="popular-section-heading">

                <strong>
                  {item.section.toUpperCase()}
                </strong>

                <span>
                  {item.views} views
                </span>

              </div>

              <div className="popular-section-track">

                <div
                  className="popular-section-bar"
                  style={{
                    width: `${percentage}%`
                  }}
                />

              </div>

            </div>

          );

        })}

      </div>

    ) : (

      <div className="analytics-empty">
        Section activity will appear after visitors explore your portfolio.
      </div>

    )}

  </div>

</div>

      <div className="analytics-section">

        <div className="analytics-section-heading">

          <div>
            <span>01 / SYSTEM STATUS</span>
            <h2>Portfolio Configuration</h2>
          </div>

        </div>

        <div className="analytics-status-grid">

          <div className="analytics-status-card">

            <div className="analytics-status-icon">
              <FaFilePdf />
            </div>

            <div>

              <span>RESUME</span>

              <strong>
                {stats.resumeAvailable
                  ? "UPLOADED"
                  : "NOT UPLOADED"}
              </strong>

            </div>

            <div
              className={
                stats.resumeAvailable
                  ? "analytics-status-dot online"
                  : "analytics-status-dot offline"
              }
            />

          </div>


          <div className="analytics-status-card">

            <div className="analytics-status-icon">
              <FaUser />
            </div>

            <div>

              <span>PROFILE</span>

              <strong>
                {stats.profileConfigured
                  ? "CONFIGURED"
                  : "NOT CONFIGURED"}
              </strong>

            </div>

            <div
              className={
                stats.profileConfigured
                  ? "analytics-status-dot online"
                  : "analytics-status-dot offline"
              }
            />

          </div>

        </div>

      </div>


      {/* RECENT ACTIVITY */}

      <div className="analytics-activity-grid">

        {/* RECENT MESSAGES */}

        <div className="analytics-activity-panel">

          <div className="analytics-panel-heading">

            <div>

              <span>02 / INBOX ACTIVITY</span>

              <h2>Recent Messages</h2>

            </div>

            <FaEnvelope />

          </div>

          {!data.recentMessages?.length ? (

            <div className="analytics-empty">
              No messages received yet.
            </div>

          ) : (

            <div className="analytics-message-list">

              {data.recentMessages.map((message) => (

                <div
                  className="analytics-message-item"
                  key={message._id}
                >

                  <div className="analytics-message-avatar">
                    {message.name?.charAt(0)?.toUpperCase() || "?"}
                  </div>

                  <div className="analytics-message-info">

                    <strong>
                      {message.name}
                    </strong>

                    <span>
                      {message.subject || "No subject"}
                    </span>

                    <small>
                      {message.email}
                    </small>

                    <small className="analytics-date">
                      <FaClock />
                      {formatDate(message.createdAt)}
                    </small>

                  </div>

                  <div
                    className={
                      message.isRead
                        ? "analytics-message-status read"
                        : "analytics-message-status unread"
                    }
                  >
                    {message.isRead ? "READ" : "NEW"}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* RECENT PROJECTS */}

        <div className="analytics-activity-panel">

          <div className="analytics-panel-heading">

            <div>

              <span>03 / DEVELOPMENT ACTIVITY</span>

              <h2>Recent Projects</h2>

            </div>

            <FaProjectDiagram />

          </div>

          {!data.recentProjects?.length ? (

            <div className="analytics-empty">
              No projects available.
            </div>

          ) : (

            <div className="analytics-project-list">

              {data.recentProjects.map((project) => (

                <div
                  className="analytics-project-item"
                  key={project._id}
                >

                  <div className="analytics-project-icon">
                    <FaCode />
                  </div>

                  <div>

                    <strong>
                      {project.title}
                    </strong>

                    <span>
                      {project.type || "PROJECT"}
                    </span>

                    <small>
                      {formatDate(project.createdAt)}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>


      {/* FOOTER */}

      <div className="analytics-footer">

        <span>
          DG / ADMIN CONTROL CENTER
        </span>

        <span>
          DATABASE CONNECTED
        </span>

      </div>

    </div>

  );

}