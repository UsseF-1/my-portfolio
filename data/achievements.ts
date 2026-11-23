export type Achievement = {
  title: string;
  detail: string;
  meta?: string;
  proofUrl: string | null;
};

/** Max 4 cards. proofUrl null renders a visible TODO in place of the [PROOF ↗] link. */
export const achievements: Achievement[] = [
  { title: "ECPC 2023 — 6th place", detail: "Qualification Round (C++)", proofUrl: null },
  {
    title: "DEPI — Technical Team Leader",
    detail: "Across training labs and the graduation project (5-member team)",
    meta: "Dec 2025 – Jul 2026 · 120 hours",
    proofUrl: null,
  },
  {
    title: "NTI — AWS Academy Cloud Foundations",
    detail: "AWS Academy Cloud Foundations",
    meta: "Jul – Aug 2026 · 120 hours",
    proofUrl: null,
  },
];
