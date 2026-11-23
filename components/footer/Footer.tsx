import { ArrowUp, Github, Heart, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-alt/90 border-t border-line pb-28 pt-12 md:pb-32">
      <div className="site-container">
        {/* Thank You Callout */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="border-primary/30 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1 font-mono text-xs text-primary shadow-sm">
            <Heart className="fill-primary/20 h-3.5 w-3.5 text-primary" aria-hidden />
            <span>THANK YOU FOR VISITING</span>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Let&apos;s Build Something Resilient Together
          </h3>

          <p className="max-w-lg text-sm text-muted">
            Have a project in mind, looking for a DevOps &amp; Cloud Platform Engineer, or
            just want to connect? I&apos;m always open to new opportunities.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-bg transition hover:brightness-110 sm:text-sm"
            >
              <Mail className="h-4 w-4" aria-hidden /> Get in Touch
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card text-muted transition hover:border-primary hover:text-primary"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card text-muted transition hover:border-primary hover:text-primary"
            >
              <Linkedin className="h-4 w-4" aria-hidden />
            </a>
            <a
              href="#home"
              aria-label="Back to top"
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-card text-muted transition hover:border-primary hover:text-primary"
              title="Back to top"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-line to-transparent" />

        {/* Bottom Metadata */}
        <div className="flex flex-col items-center justify-between gap-4 text-center font-mono text-xs text-muted sm:flex-row sm:text-left">
          <p>
            &copy; {currentYear}{" "}
            <span className="font-medium text-fg">{profile.name}</span>. All rights
            reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Designed &amp; automated with{" "}
            <span className="font-semibold text-primary">GitOps</span> principles.
          </p>
        </div>
      </div>
    </footer>
  );
}
