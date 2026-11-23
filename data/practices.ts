/** Every statement here is taken from the project descriptions in data/projects.ts. */
export type Practice = {
  title: string;
  icon: "git" | "shield" | "key" | "coins" | "activity" | "users";
  points: string[];
  evidence: string[];
};

export const practices: Practice[] = [
  {
    title: "GitOps as the source of truth",
    icon: "git",
    points: [
      "Application code, Helm charts and Terraform infrastructure live in three dedicated repositories, which prevents CI build loops and keeps ArgoCD's source of truth clean.",
      "Reusable, parameterized Helm charts keep deployments lightweight and reproducible.",
    ],
    evidence: ["argocd-gitops-platform", "depi-graduation-project"],
  },
  {
    title: "Security shifted left",
    icon: "shield",
    points: [
      "Checkstyle, SonarQube quality gates and Trivy container scans run in GitHub Actions before images are pushed.",
      "Trivy image scanning is part of the team pipeline as well.",
    ],
    evidence: ["argocd-gitops-platform", "depi-graduation-project"],
  },
  {
    title: "Least privilege access",
    icon: "key",
    points: [
      "Dedicated AWS IAM roles, with pipeline credentials kept in GitHub Secrets instead of hardcoded keys.",
      "RBAC policies on Kubernetes restrict cluster access across team environments.",
    ],
    evidence: ["vprofile-gitops-platform", "depi-graduation-project"],
  },
  {
    title: "Cost-aware infrastructure",
    icon: "coins",
    points: [
      "Teardown-ready Terraform modules make it possible to spin the EKS cluster and supporting AWS resources down right after testing, avoiding idle charges.",
      "HPA max replicas are capped at 5 and Terraform lifecycle management keeps the compute footprint bounded.",
    ],
    evidence: ["argocd-gitops-platform", "vprofile-gitops-platform"],
  },
  {
    title: "Scalable and observable",
    icon: "activity",
    points: [
      "HPA scales application pods between 1 and 5 replicas at a 70% CPU threshold.",
      "Prometheus, Grafana and Alertmanager provide full-stack observability, with real-time cluster telemetry in Grafana.",
    ],
    evidence: ["vprofile-gitops-platform", "argocd-gitops-platform"],
  },
  {
    title: "Team workflow that scales",
    icon: "users",
    points: [
      "Standardized Git branching and pull request code reviews for a 5-member DevOps team.",
      "Modular Terraform and Ansible roles let members work on cluster provisioning and Helm charts in parallel without conflicts.",
    ],
    evidence: ["depi-graduation-project"],
  },
];
