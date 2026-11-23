"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function CurlTerminal({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="flex max-w-full min-w-0 items-center gap-2 rounded-lg border border-line bg-bg-alt py-1 pl-4 pr-1 font-mono text-sm">
      <span className="text-success shrink-0" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-success">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy command"
        className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted hover:text-primary"
      >
        {copied ? (
          <Check className="h-4 w-4 text-success" aria-hidden />
        ) : (
          <Copy className="h-4 w-4" aria-hidden />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Command copied" : ""}
      </span>
    </div>
  );
}
