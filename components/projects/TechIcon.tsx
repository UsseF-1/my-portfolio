import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiAnsible,
  SiArgo,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiGrafana,
  SiHelm,
  SiKubernetes,
  SiPrometheus,
  SiTerraform,
} from "react-icons/si";
import { Box } from "lucide-react";

const MAP: Record<string, IconType> = {
  AWS: FaAws,
  Docker: SiDocker,
  Terraform: SiTerraform,
  Kubernetes: SiKubernetes,
  Helm: SiHelm,
  ArgoCD: SiArgo,
  "GitHub Actions": SiGithubactions,
  Prometheus: SiPrometheus,
  Grafana: SiGrafana,
  Ansible: SiAnsible,
  Git: SiGit,
};

export function TechIcon({ name }: { name: string }) {
  const Icon = MAP[name] ?? Box;
  return (
    <span
      title={name}
      className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-bg-alt text-primary"
    >
      <Icon className="h-5 w-5" aria-hidden />
      <span className="sr-only">{name}</span>
    </span>
  );
}
