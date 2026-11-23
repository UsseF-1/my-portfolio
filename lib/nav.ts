import {
  Home,
  FolderGit2,
  ShieldCheck,
  Layers,
  Trophy,
  GraduationCap,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type NavItem = { id: string; label: string; icon: LucideIcon; mobile: boolean };

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, mobile: true },
  { id: "projects", label: "Projects", icon: FolderGit2, mobile: true },
  { id: "practices", label: "Practices", icon: ShieldCheck, mobile: true },
  { id: "skills", label: "Skills", icon: Layers, mobile: true },
  { id: "achievements", label: "Achievements", icon: Trophy, mobile: true },
  { id: "education", label: "Education", icon: GraduationCap, mobile: true },
  { id: "contact", label: "Contact", icon: Mail, mobile: true },
];
