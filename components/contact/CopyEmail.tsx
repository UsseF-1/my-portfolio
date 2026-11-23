"use client";
import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="card-glow flex min-h-11 w-full items-center gap-3 px-4 py-3 text-left"
    >
      <Mail className="h-5 w-5 shrink-0 text-primary" aria-hidden />
      <span className="break-all">{email}</span>
      <span className="ml-auto flex shrink-0 items-center gap-1 font-mono text-sm text-muted">
        {copied ? (
          <Check className="h-4 w-4 text-success" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
        {copied ? "Copied" : "Copy"}
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
