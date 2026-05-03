/* ============================================================
   Tailwind CSS Configuration — Youssef Ahmed Portfolio
   Shared across all pages. Load AFTER the Tailwind CDN script.
   ============================================================ */
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary":            "#7c3bed",
                "secondary":          "#06b6d4",
                "accent":             "#a78bfa",
                "background-light":   "#f7f6f8",
                /* ── NEW dark palette ── */
                "background-dark":    "#0d0b14",   /* deep purple-black */
                "surface-dark":       "#13101f",   /* card/sidebar base */
                "surface-dark-2":     "#1a1530",   /* elevated surfaces */
                "border-dark":        "#2a2047",   /* subtle borders */
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.25rem",
                "lg":      "0.5rem",
                "xl":      "0.75rem",
                "full":    "9999px"
            },
        },
    },
}
