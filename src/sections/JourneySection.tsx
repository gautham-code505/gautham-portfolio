import { Section } from "../components/Section";
import { Journey } from "../components/Journey";

export function JourneySection() {
  return (
    <Section
      id="journey"
      index="02"
      eyebrow="Journey"
      title="From school to systems"
      intro="How the work grew, in order: from school results and a first Flask project to team-led backends, optimization research and hackathon finals."
    >
      <Journey />
    </Section>
  );
}
