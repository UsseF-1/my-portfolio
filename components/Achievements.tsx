import { Trophy } from "lucide-react";
import { achievements } from "@/data/achievements";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Achievements() {
  return (
    <Section id="achievements" title="Achievements" phase={5}>
      <Reveal>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.slice(0, 4).map((a) => (
            <li key={a.title} className="card-glow flex flex-col gap-3 p-6">
              <Trophy className="h-6 w-6 text-primary" aria-hidden />
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-muted">{a.detail}</p>
              {a.meta && <p className="font-mono text-sm text-muted">{a.meta}</p>}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
