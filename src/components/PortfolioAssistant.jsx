import { useEffect, useRef, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const quickQuestions = [
  "Show me Dheeraj's projects",
  "Explain Paw-Mart",
  "What are his technical skills?",
  "How can I contact Dheeraj?",
];

export default function PortfolioAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I'm Dheeraj's AI portfolio assistant. Ask me about his projects, technical skills or development work!",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading, isOpen]);

    async function sendMessage(text) {
  const question = text.trim();

  if (!question || loading || question.length > 1200) {
    return;
  }

  const updatedMessages = [
    ...messages,
    {
      role: "user",
      content: question,
    },
  ];

  setMessages(updatedMessages);
  setInput("");
  setLoading(true);

  let answer = "";
  let assistantMessageAdded = false;

  try {
    const response = await fetch(
      `${API_URL}/api/assistant`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          messages: updatedMessages.slice(-6),
        }),
      }
    );

    // Handle backend errors returned as normal JSON.
    if (!response.ok) {
      const errorData = await response.json();

      throw new Error(
        errorData.message || "Unable to connect to AI."
      );
    }

    // Check streaming response.
    const contentType =
      response.headers.get("content-type") || "";

    if (!contentType.includes("text/event-stream")) {
      throw new Error("Invalid streaming response from server.");
    }

    if (!response.body) {
      throw new Error("Streaming is not supported by this browser.");
    }

    // Create an empty assistant message.
    setMessages((previous) => [
      ...previous,
      {
        role: "assistant",
        content: "",
      },
    ]);

    assistantMessageAdded = true;

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";
    let streamFinished = false;

    // Update the existing assistant message.
    function updateAnswer() {
      setMessages((previous) => {
        const updated = [...previous];

        const lastIndex = updated.length - 1;

        if (
          updated[lastIndex]?.role === "assistant"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            content: answer,
          };
        }

        return updated;
      });
    }

    // Process individual streaming events.
    function processEvent(event) {
      const dataLines = event
        .split(/\r?\n/)
        .filter((line) => line.startsWith("data:"));

      if (dataLines.length === 0) return;

      const data = dataLines
        .map((line) => line.slice(5).trim())
        .join("\n");

      if (!data) return;

      const parsed = JSON.parse(data);

      if (parsed.error) {
        throw new Error(parsed.error);
      }

      if (parsed.text) {
        answer += parsed.text;

        updateAnswer();
      }

      if (parsed.done) {
        streamFinished = true;
      }
    }

    // Read streaming data.
    while (!streamFinished) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {
        stream: true,
      });

      const events = buffer.split(/\r?\n\r?\n/);

      buffer = events.pop() || "";

      for (const event of events) {
        processEvent(event);

        if (streamFinished) break;
      }
    }

    // Process remaining buffered data.
    buffer += decoder.decode();

    if (!streamFinished && buffer.trim()) {
      processEvent(buffer);
    }

    if (!answer.trim()) {
      throw new Error("AI did not return a response.");
    }

  } catch (error) {
    console.error("Chatbot error:", error);

    setMessages((previous) => {
      const updated = [...previous];

      const lastIndex = updated.length - 1;

      if (
        assistantMessageAdded &&
        updated[lastIndex]?.role === "assistant" &&
        !updated[lastIndex].content
      ) {
        updated[lastIndex] = {
          ...updated[lastIndex],
          content: error.message || "Please try again.",
        };
      } else {
        updated.push({
          role: "assistant",
          content: error.message || "Please try again.",
        });
      }

      return updated;
    });

  } finally {
    setLoading(false);
  }
}

  function handleSubmit(event) {
    event.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      <style>{`

        .pa-widget {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 99999;
          font-family: inherit;
        }

        .pa-launcher {
          width: 65px;
          height: 65px;
          border-radius: 50%;
          border: 1px solid #67e8f9;
          background: linear-gradient(135deg, #0891b2, #164e63);
          color: white;
          font-size: 27px;
          cursor: pointer;
          box-shadow: 0 0 28px rgba(34,211,238,.35);
          transition: .3s;
        }

        .pa-launcher:hover {
          transform: scale(1.08);
          box-shadow: 0 0 40px rgba(34,211,238,.6);
        }

        .pa-panel {
          width: 370px;
          height: 540px;
          max-height: calc(100vh - 115px);
          margin-bottom: 15px;
          background: #07111f;
          border: 1px solid rgba(34,211,238,.4);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 15px 60px rgba(0,0,0,.55);
          animation: pa-appear .25s ease;
        }

        @keyframes pa-appear {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pa-header {
          padding: 18px;
          background: linear-gradient(120deg,#083344,#0f172a);
          border-bottom: 1px solid rgba(34,211,238,.25);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pa-header-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .pa-avatar {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #0891b2;
          display: grid;
          place-items: center;
          font-size: 20px;
        }

        .pa-header h3 {
          margin: 0;
          color: white;
          font-size: 15px;
        }

        .pa-header small {
          color: #4ade80;
          font-size: 10px;
        }

        .pa-close {
          border: none;
          background: transparent;
          color: white;
          font-size: 25px;
          cursor: pointer;
        }

        .pa-messages {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 13px;
        }

        .pa-message {
          max-width: 88%;
          padding: 12px 14px;
          font-size: 13px;
          line-height: 1.6;
          white-space: pre-wrap;
          overflow-wrap: anywhere;
          border-radius: 12px;
        }

        .pa-message.assistant {
          align-self: flex-start;
          color: #dbeafe;
          background: #172638;
          border: 1px solid rgba(148,163,184,.15);
          border-top-left-radius: 3px;
        }

        .pa-message.user {
          align-self: flex-end;
          color: #04202a;
          background: #67e8f9;
          border-top-right-radius: 3px;
        }

        .pa-quick {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          padding: 0 14px 12px;
        }

        .pa-quick button {
          border: 1px solid rgba(34,211,238,.35);
          border-radius: 20px;
          padding: 7px 10px;
          background: rgba(34,211,238,.06);
          color: #a5f3fc;
          font-size: 10px;
          cursor: pointer;
        }

        .pa-quick button:hover {
          background: rgba(34,211,238,.18);
        }

        .pa-typing {
          align-self: flex-start;
          padding: 10px 14px;
          color: #67e8f9;
          font-size: 12px;
        }

        .pa-form {
          display: flex;
          gap: 8px;
          padding: 12px;
          border-top: 1px solid rgba(34,211,238,.2);
          background: #0b1728;
        }

        .pa-form textarea {
          flex: 1;
          resize: none;
          min-width: 0;
          max-height: 75px;
          padding: 11px;
          border: 1px solid rgba(34,211,238,.25);
          border-radius: 9px;
          outline: none;
          background: #111e30;
          color: white;
          font-family: inherit;
          font-size: 12px;
        }

        .pa-form textarea:focus {
          border-color: #22d3ee;
        }

        .pa-form button {
          width: 43px;
          height: 43px;
          flex-shrink: 0;
          border: none;
          border-radius: 9px;
          background: #06b6d4;
          color: #04202a;
          font-size: 20px;
          cursor: pointer;
        }

        .pa-form button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .pa-footer {
          padding: 7px;
          text-align: center;
          color: #64748b;
          font-size: 9px;
          background: #07111f;
        }

        @media(max-width:480px) {
          .pa-widget {
            right: 12px;
            bottom: 12px;
          }

          .pa-panel {
            width: calc(100vw - 24px);
            height: min(540px, calc(100dvh - 100px));
          }

          .pa-launcher {
            width: 57px;
            height: 57px;
          }
        }

      `}</style>

      <div className="pa-widget">

        {isOpen && (
          <div className="pa-panel">

            <div className="pa-header">

              <div className="pa-header-title">

                <div className="pa-avatar">
                  🤖
                </div>

                <div>
                  <h3>DHEERAJ AI</h3>
                  <small>● PORTFOLIO ASSISTANT</small>
                </div>

              </div>

              <button
                className="pa-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
              >
                ×
              </button>

            </div>

            <div
              className="pa-messages"
              aria-live="polite"
            >

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`pa-message ${message.role}`}
                >
                  {message.content}
                </div>
              ))}

              {loading && (
                <div className="pa-typing">
                  Dheeraj AI is thinking...
                </div>
              )}

              <div ref={bottomRef} />

            </div>

            {messages.length === 1 && (
              <div className="pa-quick">
                {quickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => sendMessage(question)}
                    disabled={loading}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <form
              className="pa-form"
              onSubmit={handleSubmit}
            >

              <textarea
                placeholder="Ask me anything..."
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={handleKeyDown}
                maxLength={1200}
                rows={1}
                aria-label="Ask Dheeraj AI"
              />

              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
              >
                ➤
              </button>

            </form>

            <div className="pa-footer">
              Powered by AI · Dheeraj Developer Portfolio
            </div>

          </div>
        )}

        <button
          className="pa-launcher"
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-label="Open Dheeraj AI assistant"
          aria-expanded={isOpen}
        >
          {isOpen ? "×" : "🤖"}
        </button>

      </div>
    </>
  );
}