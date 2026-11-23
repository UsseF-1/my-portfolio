"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SiArgo, SiKubernetes, SiTerraform } from "react-icons/si";
import { profile } from "@/data/profile";

const ICONS = {
  Kubernetes: SiKubernetes,
  Terraform: SiTerraform,
  ArgoCD: SiArgo,
} as const;

// 3 floating tech badges positioned around the outside perimeter of the photo
const BADGES = [
  {
    name: "Kubernetes" as const,
    pos: "-top-3 left-2 sm:-left-4 md:-left-6",
    yRange: [0, -8, 0],
    duration: 5,
    delay: 0,
  },
  {
    name: "Terraform" as const,
    pos: "top-1/2 -right-1 sm:-right-4 md:-right-6 -translate-y-1/2",
    yRange: [0, 8, 0],
    duration: 5.8,
    delay: 0.7,
  },
  {
    name: "ArgoCD" as const,
    pos: "-bottom-3 left-2 sm:-left-4 md:-left-6",
    yRange: [0, -8, 0],
    duration: 5.2,
    delay: 1.4,
  },
] as const;

export function PhotoFrame({ hasPhoto }: { hasPhoto: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto flex w-full max-w-xs sm:max-w-sm items-center justify-center px-1 py-6 sm:px-6 md:px-8">
      <div className="relative aspect-[4/5] w-52 sm:w-64 md:w-72 overflow-hidden rounded-2xl border-2 border-primary/50 shadow-[0_0_35px_rgba(0,242,254,0.25)]">
        {hasPhoto ? (
          <Image
            src={profile.photoPath}
            alt="Youssef Ahmed - DevOps & Cloud Platform Engineer"
            fill
            priority
            sizes="(min-width: 768px) 288px, (min-width: 640px) 256px, 208px"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-card p-6 text-center font-mono text-sm text-muted">
            TODO (dev only): add public{profile.photoPath}
          </div>
        )}
      </div>

      {BADGES.map((badge) => {
        const Icon = ICONS[badge.name];
        return (
          <motion.div
            key={badge.name}
            className={`absolute ${badge.pos} z-10 flex items-center gap-1.5 sm:gap-2 rounded-full border border-primary/40 bg-card/95 px-2.5 py-1 sm:px-3.5 sm:py-2 text-[11px] sm:text-xs font-mono font-medium text-fg shadow-[0_4px_20px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all hover:border-primary hover:shadow-[0_0_15px_rgba(0,242,254,0.35)]`}
            animate={reduce ? undefined : { y: [...badge.yRange] }}
            transition={{
              duration: badge.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: badge.delay,
            }}
          >
            <Icon className="h-3.5 w-3.5 sm:h-4.5 sm:w-4.5 text-primary shrink-0" aria-hidden />
            <span>{badge.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
