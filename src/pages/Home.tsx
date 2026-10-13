import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { JourneySection } from "../sections/JourneySection";
import { Projects } from "../sections/Projects";
import { Achievements } from "../sections/Achievements";
import { Skills } from "../sections/Skills";
import { Contact } from "../sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <JourneySection />
      <Projects />
      <Achievements />
      <Skills />
      <Contact />
    </>
  );
}
