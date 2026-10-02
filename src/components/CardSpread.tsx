import { useState } from "react";
import { PROJECTS } from "../data";
import { motion } from "motion/react";


export default function CardSpread() {
  const [open, setOpen] = useState(false);
  const n = PROJECTS.length;
  return (
    <section id="projects" className="w-full">
      <h2 className="text-2xl font-semibold text-black">Projects</h2>
      <p className="text-sm text-neutral-500 mb-2">Hover or tap the deck to spread it</p>
      <motion.div
        role="button" tabIndex={0} aria-expanded={open} aria-label="Project deck"
        onHoverStart={() => setOpen(true)} onHoverEnd={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setOpen((o) => !o)}
        className="relative mx-auto h-[300px] sm:h-[340px] w-full max-w-md cursor-pointer touch-manipulation outline-none focus-visible:ring-2 ring-[#1C2E1E] rounded-3xl"
      >
        {PROJECTS.map((p, i) => {
          const c = i - (n - 1) / 2;
          return (
            <motion.article key={p.name}
              animate={{ rotate: open ? c * 14 : c * 3, x: open ? c * 64 : c * 6, y: open ? Math.abs(c) * 14 : Math.abs(c) * 2 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{ background: p.bg, color: p.fg, zIndex: i, transformOrigin: "50% 120%" }}
              className="absolute left-1/2 top-4 -ml-[84px] sm:-ml-[96px] w-[168px] sm:w-[192px] h-[240px] sm:h-[270px] rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-lg ring-1 ring-black/10">
              <span className="text-xs opacity-70">{p.tag}</span>
              <div>
                <h3 className="text-lg sm:text-xl font-medium tracking-tight leading-tight mb-2">{p.name}</h3>
                <p className="text-[11px] sm:text-xs leading-snug opacity-80">{p.desc}</p>
              </div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
