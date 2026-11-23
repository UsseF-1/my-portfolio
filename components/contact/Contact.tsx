import { Github, Linkedin, Phone } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CopyEmail } from "./CopyEmail";

const link = "card-glow flex min-h-11 items-center gap-3 px-4 py-3";

export function Contact() {
  return (
    <Section id="contact" title="Contact" phase={5}>
      <Reveal>
        <p className="mt-2 font-mono text-success">{profile.availability}</p>
        <div className="mt-6 grid max-w-2xl gap-3">
          <CopyEmail email={profile.email} />
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className={link}>
            <Phone className="h-5 w-5 text-primary" aria-hidden /> {profile.phone}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <Github className="h-5 w-5 text-primary" aria-hidden /> GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            <Linkedin className="h-5 w-5 text-primary" aria-hidden /> LinkedIn
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
