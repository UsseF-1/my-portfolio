import { certs, degree } from "@/data/education";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";

export function Education() {
  return (
    <Section id="education" title="Education & Certs" phase={5}>
      <Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card-glow p-6">
            <h3 className="mb-4 font-mono text-sm text-primary">EDUCATION</h3>
            <p className="font-semibold">{degree.title}</p>
            <p className="text-muted">{degree.school}</p>
            <p className="mt-2 font-mono text-sm text-muted">{degree.period}</p>
          </div>
          <div className="card-glow p-6">
            <h3 className="mb-4 font-mono text-sm text-primary">CERTS & TRAINING</h3>
            <ul className="space-y-5">
              {certs.map((c) => (
                <li key={c.title}>
                  <p className="font-semibold">{c.title}</p>
                  <p className="font-mono text-sm text-muted">
                    <span
                      className={
                        c.status === "Completed" ? "text-success" : "text-primary"
                      }
                    >
                      {c.status}
                    </span>{" "}
                    · {c.period} · {c.hours}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
