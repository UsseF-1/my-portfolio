export type Status = "Completed" | "In progress";

export const degree = {
  title: "B.Sc. Computer Science",
  school: "Higher Technological Institute, 10th of Ramadan",
  period: "Sep 2023 – expected Jun 2027",
};

export const certs: { title: string; status: Status; period: string; hours: string }[] = [
  {
    title: "DEPI DevOps track",
    status: "Completed",
    period: "Dec 2025 – Jul 2026",
    hours: "120h",
  },
  {
    title: "NTI AWS Academy Cloud Foundations",
    status: "Completed",
    period: "Jul – Aug 2026",
    hours: "120h",
  },
];
