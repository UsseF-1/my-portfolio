import { Achievements } from "@/components/Achievements";
import { Education } from "@/components/Education";
import { Contact } from "@/components/contact/Contact";
import { Projects } from "@/components/projects/Projects";
import { Practices } from "@/components/practices/Practices";
import { Skills } from "@/components/skills/Skills";
import { Hero } from "@/components/hero/Hero";

export default function Page() {
  return (
    <>
      <Hero />
      <Projects />
      <Practices />
      <Skills />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}
