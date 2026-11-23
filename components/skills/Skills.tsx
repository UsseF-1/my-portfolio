"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { CATEGORIES, skills, type Skill } from "@/data/skills";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/projects/TechIcon";

const TABS = ["All", ...CATEGORIES] as const;

function SkillCard({ skill }: { skill: Skill }) {
  return (
    <li className="card-glow flex flex-col gap-3 p-5">
      <div className="flex items-center gap-3">
        <TechIcon name={skill.name} />
        <h3 className="font-semibold">{skill.name}</h3>
      </div>
      <p className="text-sm text-muted">{skill.role}</p>
      <ul className="flex flex-wrap gap-2">
        {skill.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-line bg-bg-alt px-2.5 py-0.5 font-mono text-xs"
          >
            {t}
          </li>
        ))}
      </ul>
      {skill.more && (
        <details className="text-sm text-muted">
          <summary className="min-h-11 cursor-pointer py-2 text-primary">
            All {skill.name} services
          </summary>
          <p className="font-mono text-xs leading-relaxed">{skill.more.join(" · ")}</p>
        </details>
      )}
    </li>
  );
}

export function Skills() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const shown = tab === "All" ? skills : skills.filter((s) => s.category === tab);

  function onKey(e: KeyboardEvent, i: number) {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? TABS.length - 1
          : (i + d + TABS.length) % TABS.length;
    if (!d && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    setTab(TABS[next]!);
    refs.current[next]?.focus();
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad">
      <div className="site-container">
        <h2
          id="skills-title"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          Infrastructure Tech Stack Matrix
        </h2>
        <div
          role="tablist"
          aria-label="Filter skills by category"
          className="mt-6 flex flex-wrap gap-2"
        >
          {TABS.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`skills-tab-${i}`}
              aria-selected={tab === t}
              aria-controls="skills-panel"
              tabIndex={tab === t ? 0 : -1}
              onClick={() => setTab(t)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-10 rounded-lg border px-3 font-mono text-xs sm:min-h-11 sm:px-4 sm:text-sm ${tab === t ? "border-primary bg-card-hover text-primary" : "border-line text-muted hover:text-fg"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <Reveal>
          <div
            id="skills-panel"
            role="tabpanel"
            aria-labelledby={`skills-tab-${TABS.indexOf(tab)}`}
          >
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((s) => (
                <SkillCard key={s.name} skill={s} />
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
