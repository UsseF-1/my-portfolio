export const profile = {
  name: "Youssef Ahmed",
  title: "DevOps & Cloud Platform Engineer",
  siteUrl: "https://ussefportfolio.vercel.app/",
  email: "youseefahmed425@gmail.com",
  phone: "+20 1212056856",
  github: "https://github.com/UsseF-1",
  linkedin: "https://www.linkedin.com/in/youssef-ahmed-usef1/",
  /** TODO: GitHub "owner/repo" of this portfolio (footer badge + repo link). */
  repo: null as string | null,
  /** Workflow file created in Phase 6. */
  workflowFile: "ci.yml",
  availability: "Open to full-time roles · remote",
  location: "Cairo / Remote",
  status: "OPEN_TO_WORK",
  headlinePrefix: "I build automated, observable",
  headlineSuffix: "platforms.",
  headlineWords: ["Kubernetes", "GitOps", "Terraform", "AWS"],
  bio: "Final-year Computer Science student at HTI who designs and automates cloud-native infrastructure on AWS and Kubernetes — CI/CD, GitOps with ArgoCD, IaC with Terraform and Ansible, DevSecOps gates and observability.",
  cvPath: "/cv/youssef-ahmed-devops-resume.pdf",
  photoPath: "/images/youssef.jpg",
  curlCommand: "curl -s https://ussefportfolio.vercel.app/me.json",
  chips: [
    "ECPC 2023 — 6th place (Qualification Round)",
    "DEPI Team Leader — 5 engineers",
  ],
  floatingBadges: ["Kubernetes", "Terraform", "ArgoCD"],
} as const;
