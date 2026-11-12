
import { useEffect } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

// ==========================================
// GET OR CREATE VISITOR ID
// ==========================================

function getVisitorId() {

  const STORAGE_KEY = "dheeraj_portfolio_visitor_id";

  try {

    let visitorId = localStorage.getItem(STORAGE_KEY);

    if (!visitorId) {

      visitorId =
        window.crypto?.randomUUID?.() ||
        `visitor-${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`;

      localStorage.setItem(
        STORAGE_KEY,
        visitorId
      );

    }

    return visitorId;

  } catch {

    return (
      window.crypto?.randomUUID?.() ||
      `visitor-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}`
    );

  }

}

// ==========================================
// TRACK VISITOR ACTIVITY
// ==========================================

export default function VisitorTracker() {

  useEffect(() => {

    // DON'T TRACK ADMIN DASHBOARD

    if (
      window.location.pathname.startsWith("/admin")
    ) {
      return;
    }

    const visitorId = getVisitorId();

    // ======================================
    // SEND EVENT TO BACKEND
    // ======================================

    function sendEvent(eventType, section = "") {

      fetch(`${API_URL}/api/analytics/visit`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        keepalive: true,

        body: JSON.stringify({

          visitorId,

          eventType,

          section

        })

      }).catch(() => {
        // Tracking failure should not interrupt the portfolio.
      });

    }

    // ======================================
    // COUNT PAGE VIEW
    // ======================================

    sendEvent("page");

    // ======================================
    // TRACK PORTFOLIO SECTIONS
    // ======================================

    const sectionIds = [
      "home",
      "about",
      "skills",
      "projects",
      "terminal",
      "contact"
    ];

    const trackedSections = new Set();

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!("IntersectionObserver" in window)) {

      sections.forEach((section) => {

        if (!trackedSections.has(section.id)) {

          trackedSections.add(section.id);

          sendEvent("section", section.id);

        }

      });

      return;

    }

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.isIntersecting &&
            !trackedSections.has(entry.target.id)
          ) {

            trackedSections.add(entry.target.id);

            sendEvent(
              "section",
              entry.target.id
            );

          }

        });

      },

      {
        threshold: 0.35
      }

    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };

  }, []);

  return null;

}