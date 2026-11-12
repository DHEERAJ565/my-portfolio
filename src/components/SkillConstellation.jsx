import { FaReact, FaNodeJs, FaJs } from "react-icons/fa";
import { SiMongodb, SiExpress } from "react-icons/si";

function SkillConstellation() {
  const skills = [
    {
      name: "React",
      icon: <FaReact />,
      position: "top",
      color: "text-cyan-400"
    },
    {
      name: "Node.js",
      icon: <FaNodeJs />,
      position: "right",
      color: "text-green-400"
    },
    {
      name: "MongoDB",
      icon: <SiMongodb />,
      position: "left",
      color: "text-green-500"
    },
    {
      name: "Express",
      icon: <SiExpress />,
      position: "bottom",
      color: "text-white"
    }
  ];

  return (
    <div className="relative mx-auto h-[500px] max-w-3xl">

      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_70px_rgba(34,211,238,0.2)] backdrop-blur-xl">
        <div className="flex h-full items-center justify-center text-center">
          <div>
            <div className="text-2xl font-black text-cyan-400">
              MERN
            </div>
            <div className="mt-1 text-xs text-slate-500">
              CORE
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10" />

      <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/10" />

      <div className="absolute left-1/2 top-[4%] -translate-x-1/2">
        <SkillNode skill={skills[0]} />
      </div>

      <div className="absolute right-[5%] top-1/2 -translate-y-1/2">
        <SkillNode skill={skills[1]} />
      </div>

      <div className="absolute left-[5%] top-1/2 -translate-y-1/2">
        <SkillNode skill={skills[2]} />
      </div>

      <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2">
        <SkillNode skill={skills[3]} />
      </div>

      <div className="absolute left-1/2 top-[20%] h-px w-[30%] -translate-x-1/2 rotate-90 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

    </div>
  );
}

function SkillNode({ skill }) {
  return (
    <div className="cursor-target group flex flex-col items-center">
      <div className={`rounded-2xl border border-white/10 bg-slate-900/80 p-5 backdrop-blur-xl transition duration-300 group-hover:-translate-y-2 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] ${skill.color}`}>
        <div className="text-3xl">
          {skill.icon}
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-300">
        {skill.name}
      </p>
    </div>
  );
}

export default SkillConstellation;