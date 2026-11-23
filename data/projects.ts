export type Project = {
  slug: string;
  title: string;
  short: string;
  /** Google Drive file id of the live cover (also see public/covers/<slug>.jpg). */
  coverId: string;
  summary: string;
  topIcons: string[];
  built: string[];
  tech: string[];
  links: { label: string; href: string }[];
  reference: string;
  note?: string;
  challenges: string[];
  costSecurity: string[];
};

export const projects: Project[] = [
  {
    slug: "argocd-gitops-platform",
    short: "GitOps Platform",
    coverId: "18ccKvtdC8c8DNEvWfQEG45WtkCy2d8r2",
    title: "Enterprise CI/CD & GitOps Platform (ArgoCD & EKS)",
    summary: "Automated GitOps delivery on AWS EKS with Terraform, Helm and ArgoCD.",
    topIcons: ["AWS", "Docker", "Terraform", "Kubernetes", "ArgoCD"],
    built: [
      "Architected an automated GitOps deployment platform on AWS EKS using Terraform, Docker, Helm and ArgoCD for declarative, continuous delivery.",
      "Embedded shift-left security and quality gates in GitHub Actions with SonarQube, Checkstyle and Trivy container scanning.",
      "Configured Horizontal Pod Autoscaling and full-stack observability with Prometheus, Grafana and Alertmanager across a multi-service stack (Java/Maven, MySQL, RabbitMQ, Memcached, Nginx).",
    ],
    tech: [
      "AWS",
      "Docker",
      "Terraform",
      "Kubernetes",
      "Helm",
      "ArgoCD",
      "GitHub Actions",
      "SonarQube",
      "Trivy",
      "Checkstyle",
      "Prometheus",
      "Grafana",
      "metrics-server",
      "Alertmanager",
      "Java",
      "Maven",
      "Tomcat",
      "MySQL",
      "RabbitMQ",
      "Memcached",
      "Nginx",
    ],
    links: [
      {
        label: "App repo",
        href: "https://github.com/UsseF-1/Enterprise-GitOps-Platform-app",
      },
      {
        label: "Helm repo",
        href: "https://github.com/UsseF-1/Enterprise-GitOps-Platform-helm",
      },
      {
        label: "Infra repo",
        href: "https://github.com/UsseF-1/Enterprise-GitOps-Platform-infra",
      },
    ],
    reference:
      "Merge pull request #6 from UsseF-1/dev · UsseF-1/Enterprise-GitOps-Platform-app@8bb3007",
    challenges: [
      "Separated application source code, Helm charts, and Terraform infrastructure into three dedicated repositories (app, helm, infra) to prevent CI build loops and maintain a clean GitOps single source of truth with ArgoCD.",
      "Orchestrated stateful and stateless services together (Java/Maven, MySQL, RabbitMQ, Memcached, Nginx) using Helm dependencies and configured Horizontal Pod Autoscaling (HPA) to handle application-tier traffic spikes.",
    ],
    costSecurity: [
      "Shifted security left in GitHub Actions by enforcing Checkstyle, SonarQube quality gates, and Trivy container vulnerability scans before pushing images.",
      "Teardown-ready Terraform IaC modules allowed spinning down the EKS cluster and supporting AWS resources immediately after testing to avoid idle cloud charges.",
    ],
  },
  {
    slug: "depi-graduation-project",
    short: "DEPI Graduation",
    coverId: "1DG_hsltQQLIQ3eIxBTBs_zZA2oPW8crc",
    title: "DEPI Graduation Project – Enterprise GitOps Kubernetes Platform",
    summary: "Team-built GitOps Kubernetes platform, led as a 5-member DevOps team.",
    topIcons: ["AWS", "Kubernetes", "Helm", "Terraform", "Ansible"],
    built: [
      "Led a 5-member DevOps team as Team Leader: system architecture, sprint task distribution, Git workflows, code reviews and on-time capstone delivery.",
      "Designed the Kubernetes cluster architecture, reusable Helm charts and automated infrastructure provisioning with Terraform and Ansible.",
    ],
    tech: [
      "AWS",
      "Kubernetes",
      "Helm",
      "Terraform",
      "Git",
      "GitHub Actions",
      "CI/CD",
      "Prometheus",
      "Grafana",
      "Trivy",
      "Ansible",
      "Docker",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/UsseF-1/GitOps-Kubernetes-Cluster",
      },
    ],
    reference: "Finish Project. · UsseF-1/GitOps-Kubernetes-Cluster@6b69abc",
    challenges: [
      "Coordinated a 5-member DevOps team by standardizing Git branching workflows, pull request code reviews, and modularizing Terraform and Ansible roles so members could work on cluster provisioning and Helm charts in parallel without conflicts.",
      "Combined Terraform for AWS infrastructure provisioning with Ansible for node/configuration management to bridge declarative cloud setup and OS-level automation.",
    ],
    costSecurity: [
      "Integrated Trivy image scanning directly into the GitHub Actions pipeline and enforced RBAC policies on Kubernetes to restrict cluster access across team environments.",
      "Used reusable, parameterized Helm charts to keep staging and capstone demo deployments lightweight and reproducible.",
    ],
  },
  {
    slug: "vprofile-gitops-platform",
    short: "Multi-Tier GitOps",
    coverId: "1iubTEOFH42VLIRqBuI31juncQ0l9yFRH",
    title: "Multi-Tier GitOps Infrastructure",
    summary:
      "Modular Terraform and GitHub Actions delivering a multi-tier Java app to Amazon EKS.",
    topIcons: ["AWS", "Terraform", "Kubernetes", "Helm", "GitHub Actions"],
    built: [
      "Provisioned and managed 30+ AWS and Kubernetes resources with modular Terraform, enforcing least-privilege access via IAM roles and GitHub Secrets.",
      "Deployed a multi-tier Java application on Amazon EKS with HPA (1–5 replicas at 70% CPU) for availability under variable load.",
      "Automated build, security scanning and Helm releases via GitHub Actions, with real-time cluster telemetry in Grafana.",
    ],
    tech: [
      "AWS",
      "EKS",
      "Terraform",
      "Kubernetes",
      "Helm",
      "Git",
      "GitHub Actions",
      "Docker",
      "GitHub Secrets",
      "IAM Roles",
      "Java (Tomcat)",
      "Maven",
      "Monitoring",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/UsseF-1/GitOps-Vprofile-Platform",
      },
    ],
    reference: "edit in hpa file · UsseF-1/GitOps-Vprofile-Platform@8a95db0",
    note: "Modular multi-tier architecture on AWS; infrastructure, CI/CD and Kubernetes deployment are my work.",
    challenges: [
      "Structured 30+ AWS and Kubernetes resources into reusable Terraform modules to manage VPC networking, EKS, and IAM dependencies cleanly without monolithic state files.",
      "Tuned Kubernetes HPA to scale application pods between 1 and 5 replicas at a 70% CPU threshold, balancing responsiveness under load against unnecessary pod scheduling.",
    ],
    costSecurity: [
      "Enforced least-privilege access using dedicated AWS IAM Roles and stored pipeline credentials in GitHub Secrets rather than hardcoding static keys.",
      "Capped HPA max replicas at 5 and relied on Terraform lifecycle management to keep AWS compute footprint bounded and easy to destroy after validation.",
    ],
  },
];
