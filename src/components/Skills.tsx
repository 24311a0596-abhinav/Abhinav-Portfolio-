import { motion } from "motion/react";
import { glass, SKILLS } from "../data";
export default function Skills() {
  return (
    <section id="skills" className="w-full">
      <h2 className="text-2xl font-semibold text-black mb-4">Skills</h2>
      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {SKILLS.map((s, i) => (
          <motion.div key={s.title} whileHover={{ y: -4 }} className={`${glass} p-5 ${i === 2 ? "sm:col-span-2 ring-[#2b3cff]/40" : ""}`}>
            <h3 className="font-semibold text-black mb-1.5">{s.title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">{s.text}</p>
            <div className="flex flex-wrap gap-1.5">{s.items.map((t) => <span key={t} className="rounded-full bg-[#EAECE9]/90 text-[#1C2E1E] text-xs px-2.5 py-1">{t}</span>)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
