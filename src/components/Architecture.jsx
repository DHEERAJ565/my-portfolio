function Architecture() {
  const nodes = [
    "React",
    "Node.js",
    "Express.js",
    "MongoDB"
  ];

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:p-10">

      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:gap-0">

        {nodes.map((node, index) => (
          <div
            key={node}
            className="flex items-center"
          >

            <div className="group cursor-target rounded-2xl border border-cyan-400/20 bg-cyan-400/5 px-6 py-5 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-2 hover:border-cyan-400/60 hover:bg-cyan-400/10 hover:shadow-[0_0_35px_rgba(34,211,238,0.15)]">

              <div className="text-sm font-bold text-cyan-300">
                {node}
              </div>

              <div className="mt-2 text-xs text-slate-500">
                {index === 0 && "Frontend"}
                {index === 1 && "Runtime"}
                {index === 2 && "API Layer"}
                {index === 3 && "Database"}
              </div>

            </div>

            {index !== nodes.length - 1 && (
              <div className="hidden h-px w-16 bg-gradient-to-r from-cyan-400/60 to-purple-400/60 md:block">
                <div className="h-2 w-2 -translate-y-[3px] animate-pulse rounded-full bg-cyan-400" />
              </div>
            )}

          </div>
        ))}

      </div>

      <div className="mt-10 rounded-2xl border border-purple-400/10 bg-purple-400/5 p-6 text-center">
        <p className="text-sm text-purple-300">
          DATA FLOW
        </p>

        <p className="mt-3 text-sm text-slate-400">
          User → React → Node.js → Express.js → MongoDB → Response
        </p>
      </div>

    </div>
  );
}

export default Architecture;