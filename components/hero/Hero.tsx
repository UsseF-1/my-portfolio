import { existsSync } from "node:fs";
import { join } from "node:path";
import { Download, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";
import { TypedWord } from "./TypedWord";
import { CurlTerminal } from "./CurlTerminal";
import { PhotoFrame } from "./PhotoFrame";

const pub = (p: string) => existsSync(join(process.cwd(), "public", p));

export function Hero() {
  const hasPhoto = pub(profile.photoPath);
  if (!hasPhoto) console.warn(`[portfolio] TODO: missing public${profile.photoPath}`);
  if (!pub(profile.cvPath))
    console.warn(`[portfolio] TODO: missing public${profile.cvPath}`);
  const full = `${profile.headlinePrefix} ${profile.headlineWords.join(", ")} ${profile.headlineSuffix}`;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="section-pad overflow-x-clip"
    >
      <div className="site-container space-y-4 sm:space-y-5">
        <div className="space-y-3 sm:space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 font-mono text-sm">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
            <span className="text-success">[STATUS: {profile.status}]</span>
            <span className="text-muted">· {profile.location}</span>
          </p>
          <div>
            <p className="text-xl font-medium">{profile.name}</p>
            <p className="text-muted">{profile.title}</p>
          </div>
          {/* One line from sm up (size scales to fit). On phones it breaks once, on purpose, after "observable". */}
          <h1
            id="hero-title"
            className="text-[length:clamp(1.2rem,5vw,1.6rem)] font-semibold leading-tight tracking-tight sm:whitespace-nowrap sm:text-[length:clamp(1.2rem,3.2vw,2.25rem)]"
          >
            <span className="sr-only">{full}</span>
            <span aria-hidden>
              <span>{profile.headlinePrefix}</span> <br className="sm:hidden" />
              <span className="sm:whitespace-nowrap">
                <TypedWord words={profile.headlineWords} /> {profile.headlineSuffix}
              </span>
            </span>
          </h1>
        </div>

        <div className="grid w-full min-w-0 items-center gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12">
          <div className="w-full min-w-0 space-y-5">
            <p className="max-w-xl text-base leading-relaxed text-muted">{profile.bio}</p>
            <div className="flex w-full flex-wrap items-center gap-3">
              <a
                href={profile.cvPath}
                download
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-xs font-medium text-bg hover:brightness-110 sm:px-5 sm:text-sm"
              >
                <Download className="h-4 w-4" aria-hidden /> Download CV
              </a>
              <a
                href="#practices"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-primary px-4 text-xs font-medium text-primary hover:bg-card-hover sm:px-5 sm:text-sm"
              >
                Explore Practices
              </a>
              <div className="flex items-center gap-3">
                <a
                  href={profile.github}
                  aria-label="GitHub"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted hover:text-primary"
                >
                  <Github className="h-5 w-5" aria-hidden />
                </a>
                <a
                  href={profile.linkedin}
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-muted hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" aria-hidden />
                </a>
              </div>
            </div>
            <div className="w-full min-w-0">
              <CurlTerminal command={profile.curlCommand} />
            </div>
            <ul className="flex w-full flex-wrap gap-2 text-sm">
              {profile.chips.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-line bg-card px-3 py-1 text-xs sm:text-sm"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex w-full min-w-0 justify-center">
            <PhotoFrame hasPhoto={hasPhoto} />
          </div>
        </div>
      </div>
    </section>
  );
}
