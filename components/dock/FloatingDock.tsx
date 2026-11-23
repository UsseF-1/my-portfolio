"use client";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { NAV_ITEMS, type NavItem } from "@/lib/nav";
import { useScrollSpy } from "./useScrollSpy";

function DockIcon({
  item,
  mouseX,
  active,
  magnify,
}: {
  item: NavItem;
  mouseX: MotionValue<number>;
  active: boolean;
  magnify: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [44, 64, 44]), {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const Icon = item.icon;

  return (
    <motion.a
      ref={ref}
      href={`#${item.id}`}
      aria-label={item.label}
      aria-current={active ? "location" : undefined}
      style={magnify ? { width: size, height: size } : { width: 44, height: 44 }}
      className={`group relative flex items-center justify-center rounded-full border transition-colors ${
        active
          ? "border-primary bg-card-hover text-primary"
          : "border-line bg-card text-muted hover:text-primary"
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden />
      <span
        role="tooltip"
        className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-line bg-bg-alt px-2 py-1 font-mono text-xs text-fg opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
      >
        {item.label}
      </span>
    </motion.a>
  );
}

export function FloatingDock() {
  const active = useScrollSpy(NAV_ITEMS.map((n) => n.id));
  const mouseX = useMotionValue(Infinity);
  const reduce = useReducedMotion();

  return (
    <>
      {/* Desktop & Tablet: magnifying dock */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-6 left-1/2 z-50 hidden -translate-x-1/2 md:block"
      >
        <div
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className="bg-bg-alt/90 flex h-[72px] items-end gap-3 rounded-2xl border border-line px-3 pb-2 shadow-2xl backdrop-blur-md"
        >
          {NAV_ITEMS.map((item) => (
            <DockIcon
              key={item.id}
              item={item}
              mouseX={mouseX}
              active={active === item.id}
              magnify={!reduce}
            />
          ))}
        </div>
      </nav>

      {/* Mobile: sleek floating pill dock with all 7 sections */}
      <nav
        aria-label="Section navigation"
        className="fixed bottom-3 left-1/2 z-50 w-[min(calc(100vw-1.25rem),26rem)] -translate-x-1/2 md:hidden"
      >
        <div className="bg-bg-alt/95 border-line/80 flex items-center justify-between rounded-2xl border px-2 py-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.6)] backdrop-blur-lg">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = active === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-label={label}
                aria-current={isActive ? "location" : undefined}
                className={`group relative flex items-center gap-1.5 rounded-xl px-2 py-2 text-xs transition-all ${
                  isActive
                    ? "border-primary/40 border bg-card-hover text-primary shadow-[0_0_10px_rgba(0,242,254,0.25)]"
                    : "text-muted hover:bg-card hover:text-fg"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                {isActive && (
                  <span className="xs:inline-block hidden max-w-[85px] truncate whitespace-nowrap font-mono text-[11px] font-medium">
                    {label}
                  </span>
                )}
                {/* Floating tooltip on hover/focus */}
                <span
                  role="tooltip"
                  className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-bg-alt px-2 py-0.5 font-mono text-[10px] text-fg opacity-0 shadow-md transition-opacity group-hover:opacity-100"
                >
                  {label}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 h-0.5 w-2 -translate-x-1/2 rounded-full bg-primary"
                    aria-hidden
                  />
                )}
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}
