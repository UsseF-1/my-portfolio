"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Check, Copy, ExternalLink, Github, X } from "lucide-react";
import type { Project } from "@/data/projects";

const panelV: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 26,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: 24, scale: 0.97, transition: { duration: 0.2, ease: "easeIn" } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function Item({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={itemV} className={className}>
      {children}
    </motion.div>
  );
}

function Todo({ what }: { what: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <p className="rounded-lg border border-dashed border-line p-3 font-mono text-sm text-muted">
      TODO (dev only): {what}
    </p>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <Item>
      <h4 className="mb-3 flex items-center gap-2 font-semibold">
        <span className="h-4 w-1 rounded-full bg-primary" aria-hidden /> {title}
      </h4>
      {items.length ? (
        <ul className="list-disc space-y-2 pl-5 text-muted marker:text-primary">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : (
        <Todo what={`add ${title.toLowerCase()} text`} />
      )}
    </Item>
  );
}

function LinkRow({ label, href }: { label: string; href: string }) {
  const [copied, setCopied] = useState(false);
  const isRepo = href.includes("github.com");
  const Icon = isRepo ? Github : ExternalLink;
  async function copy() {
    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <li className="hover:border-primary/60 flex flex-wrap items-center gap-3 rounded-xl border border-line bg-bg-alt p-3 transition-colors">
      <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium sm:text-base">{label}</p>
        <p className="truncate font-mono text-xs text-muted">
          {href.replace("https://", "")}
        </p>
      </div>
      <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-3 text-xs font-medium text-bg transition hover:brightness-110 sm:min-h-11 sm:px-4 sm:text-sm"
        >
          {isRepo ? "View repo" : "View"} <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy link: ${label}`}
          className="inline-flex min-h-10 min-w-10 items-center justify-center gap-2 rounded-lg border border-line px-2.5 text-muted transition hover:border-primary hover:text-primary sm:min-h-11 sm:min-w-11 sm:px-3"
        >
          {copied ? (
            <Check className="h-4 w-4 text-success" aria-hidden />
          ) : (
            <Copy className="h-4 w-4" aria-hidden />
          )}
          <span className="text-xs sm:text-sm" aria-live="polite">
            {copied ? "Copied" : "Copy"}
          </span>
        </button>
      </div>
    </li>
  );
}

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const reduce = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const requestClose = () => (reduce ? onClose() : setClosing(true));

  useEffect(() => {
    const d = ref.current;
    d?.showModal(); // native modal: traps focus, restores focus to the trigger
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      d?.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      aria-labelledby="project-title"
      data-closing={closing}
      onCancel={(e) => {
        e.preventDefault(); // Esc: animate out first
        requestClose();
      }}
      onClick={(e) => e.target === ref.current && requestClose()}
      className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-transparent p-2.5 text-fg backdrop:bg-black/70 backdrop:backdrop-blur-sm open:flex sm:p-6"
    >
      <motion.div
        variants={panelV}
        initial={reduce ? false : "hidden"}
        animate={closing ? "exit" : "show"}
        onAnimationComplete={(def) => def === "exit" && onClose()}
        className="border-primary/40 relative max-h-[94vh] w-[min(56rem,100%)] overflow-y-auto rounded-2xl border bg-card shadow-[0_0_60px_-12px_rgba(0,242,254,0.35)] sm:max-h-full"
      >
        <div className="bg-card/90 sticky top-0 z-10 border-b border-line backdrop-blur">
          <div
            className="h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
            aria-hidden
          />
          <div className="flex items-start justify-between gap-4 p-5 md:px-8">
            <div>
              <p className="mb-1 font-mono text-xs text-primary">
                PROJECT · {project.short.toUpperCase()}
              </p>
              <h3
                id="project-title"
                className="text-xl font-semibold leading-snug md:text-2xl"
              >
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={requestClose}
              aria-label="Close project details"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-line text-muted transition hover:rotate-90 hover:border-primary hover:text-primary"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
          </div>
        </div>

        <div className="space-y-8 p-5 md:p-8">
          <Item>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="flex items-center gap-2 font-semibold">
                  <span className="h-4 w-1 rounded-full bg-primary" aria-hidden /> Live
                  Demo Walkthrough
                </h4>
                <span className="border-primary/40 inline-flex items-center gap-1.5 rounded-full border bg-bg px-2.5 py-0.5 font-mono text-xs text-primary">
                  <span
                    className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
                    aria-hidden
                  />{" "}
                  LIVE VIDEO
                </span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-bg shadow-lg">
                <video
                  src={`/videos/${project.slug}.mp4`}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Item>

          <Item>
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 font-semibold">
                <span className="h-4 w-1 rounded-full bg-primary" aria-hidden />{" "}
                Architecture Diagram
              </h4>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/diagrams/${project.slug}.svg`}
                alt={`Architecture diagram: ${project.title}`}
                width={800}
                height={380}
                loading="lazy"
                className="h-auto w-full rounded-xl border border-line bg-bg"
              />
            </div>
          </Item>
          <Item>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <span className="h-4 w-1 rounded-full bg-primary" aria-hidden />{" "}
              Repositories & links
            </h4>
            <ul className="space-y-3">
              {project.links.map((l) => (
                <LinkRow key={l.href} {...l} />
              ))}
            </ul>
          </Item>
          <Block title="What I built" items={project.built} />
          <Block title="Challenges & decisions" items={project.challenges} />
          <Block title="Cost & security notes" items={project.costSecurity} />
          <Item>
            <h4 className="mb-3 flex items-center gap-2 font-semibold">
              <span className="h-4 w-1 rounded-full bg-primary" aria-hidden />{" "}
              Technologies
            </h4>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-line bg-bg-alt px-3 py-1 font-mono text-xs transition-colors hover:border-primary hover:text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>
          </Item>
          {project.note && (
            <Item>
              <p className="border-l-2 border-accent pl-3 text-sm text-muted">
                {project.note}
              </p>
            </Item>
          )}
          <Item>
            <p className="font-mono text-xs text-muted">Reference: {project.reference}</p>
          </Item>
        </div>
      </motion.div>
    </dialog>
  );
}
