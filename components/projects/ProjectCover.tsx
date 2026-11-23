"use client";
import { useEffect, useRef, useState } from "react";

export function ProjectCover({
  slug,
  title,
}: {
  slug: string;
  coverId?: string;
  title: string;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Handled silently for autoplay policies or low battery modes
        });
      }
    }
  }, [isInView, slug]);

  return (
    <span
      ref={containerRef}
      className="relative block aspect-video w-full overflow-hidden border-b border-line bg-bg-alt"
    >
      {!videoError && isInView ? (
        <video
          ref={videoRef}
          src={`/videos/${slug}.mp4`}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/diagrams/${slug}.svg`}
          alt={`${title} cover`}
          loading="lazy"
          className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Live Cover Badge */}
      <span className="border-primary/40 bg-bg/85 absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium text-primary shadow-md backdrop-blur-md">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" aria-hidden />
        LIVE
      </span>

      {/* Bottom gradient fade for smooth card integration */}
      <span
        aria-hidden
        className="from-card/80 via-card/15 pointer-events-none absolute inset-0 bg-gradient-to-t to-transparent"
      />
    </span>
  );
}
