import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Projects } from "../sections/Projects";
import { Skills } from "../sections/Skills";
import { Achievements } from "../sections/Achievements";
import { Education } from "../sections/Education";
import { Contact } from "../sections/Contact";

export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
