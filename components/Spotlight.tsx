"use client";
import { useEffect, useRef } from "react";

/** Soft cyan glow following the cursor. Fine pointer only; off for reduced motion. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = ref.current;
    if (!fine || reduce || !el) return;
    el.style.display = "block";
    const move = (e: PointerEvent) => {
      el.style.background = `radial-gradient(500px circle at ${e.clientX}px ${e.clientY}px, rgba(0,242,254,0.08), transparent 70%)`;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 hidden" />
  );
}
