"use client";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { pipelineMeta, stages } from "@/data/pipeline";
import { Reveal } from "@/components/Reveal";
import { Terminal } from "./Terminal";

export function Pipeline() {
  const [active, setActive] = useState(stages[0]!.slug);
  const stage = stages.find((s) => s.slug === active) ?? stages[0]!;

  return (
    <section id="pipeline" aria-labelledby="pipeline-title" className="section-pad">
      <div className="site-container">
        <h2 id="pipeline-title" className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Pipeline &amp; Telemetry
        </h2>
        <p className="mt-2 max-w-2xl text-muted">
          Based on the real workflow of the GitOps platform project. Select a stage to see
          its log.
        </p>
        <p className="mt-1 font-mono text-xs text-muted">{pipelineMeta.reference}</p>

        <Reveal>
          <div className="mt-8 overflow-x-auto pb-3">
            <ol className="grid min-w-full gap-3 md:flex md:items-stretch md:gap-0">
              {stages.map((s, i) => (
                <li key={s.slug} className="contents md:flex md:items-center md:flex-1">
                  <button
                    type="button"
                    aria-pressed={active === s.slug}
                    onClick={() => setActive(s.slug)}
                    className={`card-glow flex min-h-11 flex-col gap-1 p-3.5 sm:p-4 text-left md:flex-1 md:min-w-[130px] lg:min-w-[150px] shrink-0 ${active === s.slug ? "!border-primary bg-card-hover" : ""}`}
                  >
                    <span className="font-mono text-xs text-primary">STAGE {s.n}</span>
                    <span className="text-sm font-semibold leading-snug">{s.title}</span>
                    <span className="text-xs text-muted">{s.tools}</span>
                  </button>
                  {i < stages.length - 1 && (
                    <ChevronRight
                      aria-hidden
                      className="mx-1 hidden shrink-0 self-center text-muted md:block"
                    />
                  )}
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <div className="mt-6 space-y-3">
          {pipelineMeta.isSample && (
            <p
              role="note"
              className="rounded-lg border border-dashed border-accent px-4 py-2 font-mono text-sm text-accent"
            >
              SAMPLE LOG — replace with a real run
            </p>
          )}
          <Terminal slug={stage.slug} title={`Stage ${stage.n}: ${stage.title}`} />
          {pipelineMeta.realWorkflowUrl ? (
            <a
              href={pipelineMeta.realWorkflowUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-primary hover:underline"
            >
              View real workflow ↗
            </a>
          ) : (
            <p className="font-mono text-sm text-muted">
              View real workflow ↗ — TODO: add URL in data/pipeline.ts
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
