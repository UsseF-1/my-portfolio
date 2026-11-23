"use client";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "./TechIcon";
import { ProjectCover } from "./ProjectCover";
import { ProjectModal } from "./ProjectModal";

export function Projects() {
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#project-(.+)$/);
      if (m && projects.some((p) => p.slug === m[1])) setOpen(m[1]!);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = () => {
    setOpen(null);
    if (window.location.hash.startsWith("#project-"))
      history.replaceState(null, "", "#projects");
  };
  const current = projects.find((p) => p.slug === open);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="site-container">
        <h2 id="projects-title" className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Projects
        </h2>
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug} id={`project-${p.slug}`} className="scroll-mt-6">
              <Reveal delay={i * 0.08} className="h-full">
                <button
                  type="button"
                  onClick={() => setOpen(p.slug)}
                  aria-haspopup="dialog"
                  className="card-glow group flex h-full w-full flex-col overflow-hidden text-left"
                >
                  <ProjectCover slug={p.slug} coverId={p.coverId} title={p.short} />
                  <span className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
                    <span className="text-lg font-semibold leading-snug">{p.title}</span>
                    <span className="text-sm sm:text-base text-muted">{p.summary}</span>
                    <span className="mt-auto flex flex-wrap gap-2 pt-2">
                      {p.topIcons.slice(0, 5).map((t) => (
                        <TechIcon key={t} name={t} />
                      ))}
                    </span>
                    <span className="font-mono text-sm text-primary">View details</span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      {current && <ProjectModal project={current} onClose={close} />}
    </section>
  );
}
