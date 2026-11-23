import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="site-container flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="border-primary/30 inline-flex items-center gap-2 rounded-full border bg-card px-3.5 py-1 font-mono text-xs text-primary shadow-sm">
        <span>404 ERROR</span>
      </div>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
        Page Not Found
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        The page you are looking for does not exist, was removed, or is temporarily
        unavailable.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 text-xs font-medium text-bg transition hover:brightness-110 sm:text-sm"
        >
          <Home className="h-4 w-4" aria-hidden /> Return Home
        </Link>
      </div>
    </div>
  );
}
