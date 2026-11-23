import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        "bg-alt": "var(--bg-alt)",
        card: "var(--card)",
        "card-hover": "var(--card-hover)",
        line: "var(--border)",
        primary: "var(--primary)",
        success: "var(--success)",
        accent: "var(--accent)",
        fg: "var(--text)",
        muted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { site: "72rem" },
      spacing: { section: "6rem" },
      boxShadow: { glow: "0 0 0 1px var(--primary), 0 0 24px -6px var(--primary)" },
    },
  },
  plugins: [],
};
export default config;
