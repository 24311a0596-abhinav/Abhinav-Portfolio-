import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PROFILE } from "../data";

const LINKS = [
  { label: "About", href: "#about" }, { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" }, { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const bar = "absolute left-0 h-[1.5px] w-6 bg-black rounded-full";
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center bg-transparent">
        <a href="#top" className="relative z-30 flex items-center gap-2 text-sm sm:text-base font-bold tracking-tight text-black">
          <span aria-hidden className="text-[#2b3cff]">&#10033;</span>{PROFILE.name}
        </a>
        <nav className="hidden md:flex items-center text-sm text-neutral-800" aria-label="Primary">
          {LINKS.map((l, i) => (
            <span key={l.label} className="flex items-center">
              <a href={l.href} className="hover:opacity-60 transition-opacity">{l.label}</a>
              {i < LINKS.length - 1 && <span className="opacity-40">,&nbsp;</span>}
            </span>
          ))}
        </nav>
        <a href="#contact" className="hidden md:block text-sm text-black underline underline-offset-4 decoration-black/30 hover:decoration-black transition-colors">Get in touch</a>
        <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="md:hidden relative z-30 w-10 h-10 grid place-items-center">
          <span className="relative block w-6 h-4">
            <motion.span className={bar} style={{ top: 0 }} animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }} />
            <motion.span className={bar} style={{ top: 7 }} animate={{ opacity: open ? 0 : 1 }} />
            <motion.span className={bar} style={{ top: 14 }} animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }} />
          </span>
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-5 md:hidden">
            {LINKS.map((l, i) => (
              <motion.a key={l.label} href={l.href} onClick={() => setOpen(false)} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }} className="text-4xl tracking-tight text-black">{l.label}</motion.a>
            ))}
            <div className="flex gap-5 text-sm underline underline-offset-4 mt-4">
              <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub</a>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
