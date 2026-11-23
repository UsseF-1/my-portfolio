"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Types ONE word of the headline. Shows the first word in full on SSR and with reduced motion. */
export function TypedWord({ words }: { words: readonly string[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [len, setLen] = useState(words[0]?.length ?? 0);
  const [deleting, setDeleting] = useState(true);
  const word = words[i] ?? "";

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(
      () => {
        if (deleting) {
          if (len > 0) setLen(len - 1);
          else {
            setDeleting(false);
            setI((i + 1) % words.length);
          }
        } else if (len < word.length) setLen(len + 1);
        else setDeleting(true);
      },
      deleting ? (len === word.length ? 1800 : 45) : len === 0 ? 250 : 90,
    );
    return () => clearTimeout(t);
  }, [reduce, deleting, len, i, word.length, words.length]);

  return (
    <span className="text-primary" aria-hidden>
      {word.slice(0, len)}
      {!reduce && (
        <span className="ml-0.5 inline-block w-[0.5ch] animate-pulse bg-primary align-baseline">
          &nbsp;
        </span>
      )}
    </span>
  );
}
