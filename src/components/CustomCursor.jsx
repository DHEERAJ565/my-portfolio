import { useEffect, useState } from "react";

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const enter = () => setActive(true);
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move);

    const elements = document.querySelectorAll("a, button, .cursor-target");

    elements.forEach((element) => {
      element.addEventListener("mouseenter", enter);
      element.addEventListener("mouseleave", leave);
    });

    return () => {
      window.removeEventListener("mousemove", move);

      elements.forEach((element) => {
        element.removeEventListener("mouseenter", enter);
        element.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999] hidden h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400 shadow-[0_0_20px_#22d3ee] md:block"
        style={{
          left: position.x,
          top: position.y
        }}
      />

      <div
        className={`pointer-events-none fixed z-[9998] hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50 transition-all duration-300 md:block ${
          active ? "h-12 w-12 bg-cyan-400/10" : "h-7 w-7"
        }`}
        style={{
          left: position.x,
          top: position.y
        }}
      />
    </>
  );
}

export default CustomCursor;