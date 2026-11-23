import {
  Activity,
  Coins,
  GitBranch,
  KeyRound,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { practices, type Practice } from "@/data/practices";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

const ICONS: Record<Practice["icon"], LucideIcon> = {
  git: GitBranch,
  shield: ShieldCheck,
  key: KeyRound,
  coins: Coins,
  activity: Activity,
  users: Users,
};

export function Practices() {
  return (
    <Section id="practices" title="Engineering Practices" phase={3}>
      <p className="mt-2 max-w-2xl text-muted">
        How I design, secure and operate infrastructure, with the project where each one
        shows up.
      </p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {practices.map((p, i) => {
          const Icon = ICONS[p.icon];
          return (
            <li key={p.title}>
              <Reveal delay={(i % 3) * 0.08} className="h-full">
                <article className="card-glow flex h-full flex-col gap-4 p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-bg-alt text-primary">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <ul className="list-disc space-y-2 pl-5 text-sm text-muted marker:text-primary">
                    {p.points.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className="mt-auto flex flex-wrap items-center gap-x-3 pt-2 font-mono text-xs text-muted">
                    Evidence:
                    {p.evidence.map((slug) => (
                      <a
                        key={slug}
                        href={`#project-${slug}`}
                        className="inline-flex min-h-11 items-center text-primary hover:underline"
                      >
                        {projects.find((x) => x.slug === slug)?.short ?? slug} ↗
                      </a>
                    ))}
                  </p>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
