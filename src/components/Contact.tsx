import ServicePills from "./ServicePills";
import { glass, PROFILE } from "../data";
export default function Contact() {
  return (
    <section id="contact" className={`${glass} w-full p-5 sm:p-7`}>
      <h2 className="text-2xl font-semibold text-black mb-2">Let's talk</h2>
      <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6 max-w-md">
        Whether you have questions, feedback, drop us a message and we'll get back to you as soon as possible.
      </p>
      <ServicePills />
      <div className="flex flex-wrap gap-5 mt-7 text-sm">
        <a className="underline underline-offset-4" href={PROFILE.github} target="_blank" rel="noreferrer">github.com/24311a0596-abhinav</a>
        <a className="underline underline-offset-4" href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn profile</a>
      </div>
    </section>
  );
}
