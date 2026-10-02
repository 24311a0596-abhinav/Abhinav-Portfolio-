import { glass, PROJECTS } from "../data";
export default function ProjectList() {
  return (
    <div className="grid gap-3 sm:gap-4 -mt-6">
      {PROJECTS.map((p) => (
        <article key={p.name} className={`${glass} p-5`}>
          <h3 className="font-semibold text-black mb-1.5">{p.name}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed mb-3">{p.long}</p>
          <div className="flex flex-wrap gap-1.5">{p.stack.map((t) => <span key={t} className="rounded-full bg-[#1C2E1E] text-white text-xs px-2.5 py-1">{t}</span>)}</div>
        </article>
      ))}
    </div>
  );
}
