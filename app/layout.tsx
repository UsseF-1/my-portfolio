import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { FloatingDock } from "@/components/dock/FloatingDock";
import { Footer } from "@/components/footer/Footer";
import { Spotlight } from "@/components/Spotlight";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const description =
  "Youssef Ahmed, DevOps & Cloud Platform Engineer. Automated, observable platforms on AWS and Kubernetes: Terraform, GitOps with ArgoCD, CI/CD and observability.";
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.title}`,
};

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}`,
  description,
  metadataBase: new URL(profile.siteUrl),
  alternates: { canonical: profile.siteUrl },
  openGraph: {
    type: "website",
    url: profile.siteUrl,
    title: `${profile.name} — ${profile.title}`,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
    images: [ogImage.url],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: profile.siteUrl,
  image: `${profile.siteUrl}og.png`,
  sameAs: [profile.github, profile.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Cairo" },
  knowsAbout: [
    "AWS",
    "Kubernetes",
    "Terraform",
    "GitOps",
    "ArgoCD",
    "CI/CD",
    "Observability",
  ],
};

export const viewport: Viewport = { themeColor: "#0A0E17", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a
          href="#main"
          className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-md bg-primary px-4 py-2 font-medium text-bg focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="dot-grid" aria-hidden />
        <Spotlight />
        <main id="main" className="relative z-10">
          {children}
        </main>
        <Footer />
        <FloatingDock />
      </body>
    </html>
  );
}
