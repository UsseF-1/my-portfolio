import type { ReactNode } from "react";

type Props = { id: string; title: string; phase: number; children?: ReactNode };

/** One max-width, one padding for every section. Placeholder body until its phase lands. */
export function Section({ id, title, phase, children }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="section-pad">
      <div className="site-container">
        <h2
          id={`${id}-title`}
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
        {children ?? (
          <p className="mt-4 rounded-lg border border-dashed border-line p-4 font-mono text-sm text-muted">
            TODO (dev only): Phase {phase} — {title} not built yet.
          </p>
        )}
      </div>
    </section>
  );
}
