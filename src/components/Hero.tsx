import { motion } from "motion/react";
import { useTypewriter } from "../hooks";
import { PROFILE } from "../data";

export default function Hero() {
  const { displayed, done } = useTypewriter("P Sri\nAbhinav Raman");
  const btn = "rounded-full px-5 py-2.5 text-sm transition-colors";
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="w-full">
      <span className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur px-3 py-1.5 text-xs text-neutral-700 ring-1 ring-black/10 mb-6">
        <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
        Open to projects and collaborations
      </span>
      <h1 aria-label={PROFILE.name} className="text-4xl sm:text-5xl md:text-6xl lg:text-[76px] font-bold tracking-tight text-black leading-[1.08] mb-6 select-none w-full whitespace-pre-wrap">
        <span className="bg-gradient-to-r from-black via-[#1c2a8c] to-[#2b3cff] bg-clip-text text-transparent">{displayed}</span>
        {!done && <span aria-hidden className="animate-blink inline-block w-[3px] h-[0.85em] bg-[#2b3cff] align-middle ml-1" />}
      </h1>
      <p className="text-base sm:text-xl font-medium text-neutral-900 mb-3">B.Tech CSE student · MERN developer · AI-driven builder</p>
      <p className="max-w-lg text-sm sm:text-base text-neutral-600 leading-relaxed mb-7">
        I turn ideas into working products: local-first tools, AI execution platforms and polished storefronts, from Secunderabad, Telangana.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="#projects" className={`${btn} bg-[#1C2E1E] text-white hover:bg-black`}>View projects</a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" className={`${btn} bg-white/70 backdrop-blur ring-1 ring-black/15 hover:bg-white`}>GitHub</a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className={`${btn} bg-white/70 backdrop-blur ring-1 ring-black/15 hover:bg-white`}>LinkedIn</a>
      </div>
    </motion.div>
  );
}
