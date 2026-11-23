"use client";
import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useReducedMotion } from "motion/react";

export function Terminal({ slug, title }: { slug: string; title: string }) {
  const reduce = useReducedMotion();
  const [lines, setLines] = useState<string[]>([]);
  const [run, setRun] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    let timer: ReturnType<typeof setInterval> | undefined;
    setLines([]);
    fetch(`/data/pipeline-logs/${slug}.log`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
      .then((text) => {
        const all = text.split("\n").filter(Boolean);
        if (reduce) return setLines(all);
        let i = 0;
        timer = setInterval(() => {
          i += 1;
          setLines(all.slice(0, i));
          if (i >= all.length) clearInterval(timer);
        }, 350);
      })
      .catch((e: unknown) => {
        if ((e as Error).name !== "AbortError")
          setLines([`TODO: log not found at /data/pipeline-logs/${slug}.log`]);
      });
    return () => {
      ctrl.abort();
      clearInterval(timer);
    };
  }, [slug, run, reduce]);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-alt">
      <div className="flex items-center justify-between gap-2 border-b border-line px-4 py-1">
        <span className="min-w-0 truncate font-mono text-xs sm:text-sm text-muted">
          {title} · {slug}.log
        </span>
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-mono text-sm text-primary hover:bg-card-hover"
        >
          <RotateCcw className="h-4 w-4" aria-hidden /> Replay
        </button>
      </div>
      <pre
        aria-live="polite"
        aria-label={`${title} log output`}
        className="min-h-[11rem] overflow-x-auto p-4 font-mono text-sm leading-relaxed text-success"
      >
        {lines.join("\n")}
        {!reduce && (
          <span aria-hidden className="animate-pulse">
            ▍
          </span>
        )}
      </pre>
    </div>
  );
}
