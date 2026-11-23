export type Stage = { n: number; slug: string; title: string; tools: string };

export const stages: Stage[] = [
  { n: 1, slug: "code-quality", title: "Code Quality", tools: "Checkstyle, SonarQube" },
  { n: 2, slug: "build-test", title: "Build & Test", tools: "Maven" },
  {
    n: 3,
    slug: "docker-trivy",
    title: "Docker Build & Trivy Scan",
    tools: "Docker, Trivy",
  },
  {
    n: 4,
    slug: "publish-helm",
    title: "Publish image & update Helm values",
    tools: "GitHub Actions, Helm",
  },
  { n: 5, slug: "argocd-sync", title: "ArgoCD Sync to EKS", tools: "ArgoCD, EKS" },
  {
    n: 6,
    slug: "observe",
    title: "Observe",
    tools: "Prometheus, Grafana, Alertmanager, HPA",
  },
];

export const pipelineMeta = {
  reference:
    "UsseF-1/Enterprise-GitOps-Platform-app@8bb3007 — Merge pull request #6 from UsseF-1/dev",
  /** TODO: paste the URL of the real GitHub Actions run. */
  realWorkflowUrl: null as string | null,
  /** Set to false once /public/data/pipeline-logs/*.log hold real GitHub Actions output. */
  isSample: true,
};
