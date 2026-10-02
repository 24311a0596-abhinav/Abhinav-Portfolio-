import { useState } from "react";
import { PROFILE } from "../data";
import { AnimatePresence, motion } from "motion/react";

const SERVICES = ["Brand", "Digital", "Campaign", "Other"] as const;
type Service = (typeof SERVICES)[number];

export default function ServicePills() {
  const [selected, setSelected] = useState<Service[]>([]);
  const toggle = (s: Service) => setSelected((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));
  return (
    <section id="services" className="w-full">
      <h2 className="text-base font-medium text-black">What sort of service?</h2>
      <p className="text-sm text-neutral-500 mb-4">Select all that apply</p>
      <div className="flex flex-wrap gap-2.5" role="group" aria-label="Services">
        {SERVICES.map((s) => {
          const active = selected.includes(s);
          return (
            <motion.button key={s} type="button" aria-pressed={active} whileTap={{ scale: 0.95 }} layout onClick={() => toggle(s)}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-sm transition-colors ${active ? "bg-[#1C2E1E] text-white shadow-md" : "bg-white text-neutral-800 ring-1 ring-neutral-300 hover:ring-neutral-500"}`}>
              <AnimatePresence initial={false}>
                {active && (
                  <motion.svg key="c" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" initial={{ y: -14, opacity: 0, scale: 0 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                    <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                )}
              </AnimatePresence>
              {s}
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0, y: 8 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden" role="status">
            <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-[#EAECE9] px-4 sm:px-5 py-3.5">
              <span className="text-sm text-[#1C2E1E]">Ready to inquire about: <strong className="font-medium">{selected.join(", ")}</strong></span>
              <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="self-start sm:self-auto rounded-full bg-[#1C2E1E] text-white text-sm px-4 py-2 hover:bg-black transition-colors">Let's Go</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
