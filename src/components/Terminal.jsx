import { useState } from "react";

function Terminal() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState([
    {
      command: "welcome",
      output: "Welcome to Dheeraj OS. Type help to explore."
    }
  ]);

  const executeCommand = (value) => {
    const cmd = value.trim().toLowerCase();

    let output = "";

    if (cmd === "help") {
      output = "Available: about, skills, projects, stack, contact, clear";
    } else if (cmd === "about") {
      output = "Dheeraj Golla — Computer Science Engineering student and MERN Stack Developer.";
    } else if (cmd === "skills") {
      output = "React • JavaScript • Node.js • Express.js • MongoDB • HTML • CSS";
    } else if (cmd === "stack") {
      output = "MERN + FastAPI + AI";
    } else if (cmd === "projects") {
      output = "Gymora • Health Predict • Dynamic Gift Store";
    } else if (cmd === "contact") {
      output = "LinkedIn: linkedin.com/in/golla-dheeraj";
    } else if (cmd === "clear") {
      setHistory([]);
      setCommand("");
      return;
    } else if (cmd === "") {
      return;
    } else {
      output = `Command not found: ${cmd}`;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmd,
        output
      }
    ]);

    setCommand("");
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#020617]/90 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl">

      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />

        <span className="ml-4 text-xs text-slate-500">
          dheeraj@developer:~
        </span>
      </div>

      <div className="min-h-[350px] p-6 font-mono text-sm">

        {history.map((item, index) => (
          <div key={index} className="mb-5">
            <div className="text-cyan-400">
              dheeraj@dev:~$ {item.command}
            </div>

            <div className="mt-2 leading-7 text-slate-400">
              {item.output}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-2 text-cyan-400">
          <span>dheeraj@dev:~$</span>

          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                executeCommand(command);
              }
            }}
            className="w-full bg-transparent outline-none"
            autoComplete="off"
            spellCheck="false"
          />

          <span className="animate-pulse">█</span>
        </div>

      </div>
    </div>
  );
}

export default Terminal;