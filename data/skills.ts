export const CATEGORIES = [
  "Cloud & IaC",
  "Containers & K8s",
  "CI/CD & GitOps",
  "Observability & Security",
] as const;
export type Category = (typeof CATEGORIES)[number];

export type Skill = {
  name: string;
  category: Category;
  role: string;
  tags: string[];
  /** Full list shown in a collapsible when the card shows only 4 tags. */
  more?: string[];
};

export const skills: Skill[] = [
  {
    name: "AWS",
    category: "Cloud & IaC",
    role: "Cloud platform hosting the compute, networking and identity layers.",
    tags: ["EKS", "EC2", "VPC", "IAM"],

    more: [
      "EKS",
      "ECS",
      "EC2",
      "VPC / ALB / ASG / NAT / IGW / Route53",
      "S3",
      "RDS",
      "IAM",
      "Lambda",
      "CloudFront",
      "CloudWatch",
      "SNS",
      "EventBridge",
      "Elastic Beanstalk",
      "AWS CLI",
    ],
  },
  {
    name: "Terraform",
    category: "Cloud & IaC",
    role: "Infrastructure as Code for reproducible, destroyable environments.",
    tags: ["Modules", "State management", "Lifecycle"],
  },
  {
    name: "Ansible",
    category: "Cloud & IaC",
    role: "Configuration management for nodes and OS-level automation.",
    tags: ["Playbooks", "Roles", "Handlers"],
  },
  {
    name: "Python",
    category: "Cloud & IaC",
    role: "Scripting and AWS automation.",
    tags: ["Boto3"],
  },
  {
    name: "Bash",
    category: "Cloud & IaC",
    role: "Shell scripting and operational glue.",
    tags: ["Scripting", "Automation"],
  },
  {
    name: "Kubernetes",
    category: "Containers & K8s",
    role: "Container orchestration for the application platform.",
    tags: ["Helm", "RBAC", "Ingress", "HPA"],
  },
  {
    name: "Docker",
    category: "Containers & K8s",
    role: "Packaging applications as container images.",
    tags: ["Multi-stage builds", "Compose"],
  },
  {
    name: "NGINX",
    category: "Containers & K8s",
    role: "Web server and reverse proxy in front of services.",
    tags: ["Reverse proxy", "Web server"],
  },
  {
    name: "ArgoCD",
    category: "CI/CD & GitOps",
    role: "GitOps controller syncing cluster state from Git.",
    tags: ["GitOps", "Declarative delivery"],
  },
  {
    name: "GitHub Actions",
    category: "CI/CD & GitOps",
    role: "CI/CD pipelines for build, scan and release.",
    tags: ["CI/CD", "Workflows"],
  },
  {
    name: "GitLab CI",
    category: "CI/CD & GitOps",
    role: "CI/CD pipelines on GitLab.",
    tags: ["CI/CD", "Pipelines"],
  },
  {
    name: "Jenkins",
    category: "CI/CD & GitOps",
    role: "Automation server for CI/CD pipelines.",
    tags: ["CI/CD", "Pipelines"],
  },
  {
    name: "AWS CodePipeline",
    category: "CI/CD & GitOps",
    role: "Managed CI/CD pipelines on AWS.",
    tags: ["CI/CD", "AWS"],
  },
  {
    name: "Trivy",
    category: "CI/CD & GitOps",
    role: "Container image vulnerability scanning in the pipeline.",
    tags: ["Image scanning", "DevSecOps"],
  },
  {
    name: "SonarQube",
    category: "CI/CD & GitOps",
    role: "Code quality gate in the pipeline.",
    tags: ["Quality gate", "Static analysis"],
  },
  {
    name: "Checkstyle",
    category: "CI/CD & GitOps",
    role: "Code style checks for Java builds.",
    tags: ["Code style", "Java"],
  },
  {
    name: "Prometheus",
    category: "Observability & Security",
    role: "Metrics collection and querying.",
    tags: ["PromQL", "Metrics"],
  },
  {
    name: "Grafana",
    category: "Observability & Security",
    role: "Dashboards for cluster and application telemetry.",
    tags: ["Dashboards", "Telemetry"],
  },
  {
    name: "Loki",
    category: "Observability & Security",
    role: "Log aggregation for the Grafana stack.",
    tags: ["Logs", "Grafana stack"],
  },
  {
    name: "Alloy",
    category: "Observability & Security",
    role: "Telemetry collector for the Grafana stack.",
    tags: ["Collector", "Grafana stack"],
  },
  {
    name: "Node Exporter",
    category: "Observability & Security",
    role: "Host-level metrics for Prometheus.",
    tags: ["Host metrics", "Prometheus"],
  },
  {
    name: "Alertmanager",
    category: "Observability & Security",
    role: "Alert routing for Prometheus alerts.",
    tags: ["Alerting", "Prometheus"],
  },
  {
    name: "Linux",
    category: "Observability & Security",
    role: "Server administration and operations fundamentals.",
    tags: ["Administration", "systemd", "SSH", "Networking"],
  },
  {
    name: "IAM & RBAC",
    category: "Observability & Security",
    role: "Least-privilege access on AWS and Kubernetes.",
    tags: ["IAM", "RBAC"],
  },
  {
    name: "Cloud security",
    category: "Observability & Security",
    role: "Securing cloud infrastructure and delivery pipelines.",
    tags: ["Cloud", "Security"],
  },
];
