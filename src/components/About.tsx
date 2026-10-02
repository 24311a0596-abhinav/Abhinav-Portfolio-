import { glass, PROFILE } from "../data";
const FACTS: [string, string][] = [
  ["Born", "25 May 2006"],
  ["Based in", "Lothkunta, Secunderabad, Telangana, India"],
  ["University", "B.Tech in Computer Science and Engineering (pursuing), Sreenidhi Institute of Science and Technology (SNIST), Ghatkesar"],
  ["Earlier", "Intermediate at Trividyaa Junior College; schooling at Pallavi Model School, Alwal"],
];
const EVENTS = ["Smart India Hackathon", "LaunchpadX-2026", "HackWave 3.0", "Build by Sunset", "Organising team, UXplosion 3.0 (SNIST)"];
export default function About() {
  return (
    <section id="about" className={`${glass} w-full p-5 sm:p-7`}>
      <h2 className="text-2xl font-semibold text-black mb-1">About</h2>
      <p className="text-sm sm:text-base text-neutral-700 leading-relaxed mb-5">
        I'm <strong className="font-bold text-black">{PROFILE.name}</strong>, a computer science student who builds across the stack, ships prototypes fast, and cares how things look and feel.
      </p>
      <dl className="grid grid-cols-1 sm:grid-cols-[90px_1fr] gap-x-5 gap-y-1 sm:gap-y-3 text-sm">
        {FACTS.map(([k, v]) => (<div key={k} className="contents"><dt className="text-neutral-500">{k}</dt><dd className="text-neutral-800 mb-2 sm:mb-0">{v}</dd></div>))}
      </dl>
      <h3 className="text-sm font-medium text-black mt-6 mb-3">Hackathons and events</h3>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-[#1C2E1E] text-white text-xs px-3 py-1.5">4th place, IEEE Hackathon</span>
        {EVENTS.map((e) => <span key={e} className="rounded-full bg-white/80 ring-1 ring-black/10 text-xs px-3 py-1.5 text-neutral-700">{e}</span>)}
      </div>
    </section>
  );
}
