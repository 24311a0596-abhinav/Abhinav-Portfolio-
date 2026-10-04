import BackgroundVideo from "./components/BackgroundVideo";
import BlinkingBackdrop from "./components/BlinkingBackdrop";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import CardSpread from "./components/CardSpread";
import ProjectList from "./components/ProjectList";
import Contact from "./components/Contact";

export default function App() {
  return (
    <div id="top" className="relative bg-white text-neutral-900 font-sans selection:bg-[#EAECE9] selection:text-[#1C2E1E] antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen scroll-smooth">
            <BackgroundVideo />
      <BlinkingBackdrop />
      <Header />
      <main className="relative z-[1] flex flex-col gap-14 sm:gap-16 px-4 sm:px-6 lg:px-12 -mt-20 sm:-mt-24 lg:mt-0 pt-0 lg:pt-32 pb-16 lg:max-w-[54%]">
        <Hero />
        <About />
        <Skills />
        <CardSpread />
        <ProjectList />
        <Contact />
      </main>
    </div>
  );
}
