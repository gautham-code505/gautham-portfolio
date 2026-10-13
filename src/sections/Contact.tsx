import { site } from "../data/site";
import { Section } from "../components/Section";
import { ButtonLink } from "../components/ButtonLink";
import { ResumeButton } from "../components/ResumeButton";
import { GitHub, LinkedIn, Mail } from "../components/Icons";

export function Contact() {
  const row = "flex min-h-11 items-center justify-between gap-4 border-b border-border py-2 text-sm";
  return (
    <Section id="contact" index="06" eyebrow="Contact" title="Let's talk about an internship" intro={site.availability}>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-wrap content-start items-start gap-3">
          <ButtonLink href={`mailto:${site.email}`} variant="primary"><Mail /> Email me</ButtonLink>
          <ButtonLink href={site.links.linkedin} external ariaLabel="Connect on LinkedIn (opens in a new tab)"><LinkedIn /> Connect on LinkedIn</ButtonLink>
          <ButtonLink href={site.links.github} external ariaLabel="Explore my GitHub (opens in a new tab)"><GitHub /> Explore my GitHub</ButtonLink>
          <ResumeButton />
        </div>
        <ul>
          <li className={row}><span className="text-muted">Email</span><a className="break-all hover:text-accent" href={`mailto:${site.email}`}>{site.email}</a></li>
          <li className={row}><span className="text-muted">Phone</span><a className="hover:text-accent" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
          <li className={row}><span className="text-muted">LeetCode</span><a className="hover:text-accent" href={site.links.leetcode} target="_blank" rel="noopener noreferrer">{site.codingStats.leetcode}<span className="sr-only"> — LeetCode profile (opens in a new tab)</span></a></li>
          <li className={row}><span className="text-muted">SkillRack</span><a className="hover:text-accent" href={site.links.skillrack} target="_blank" rel="noopener noreferrer">{site.codingStats.skillrack}<span className="sr-only"> — SkillRack profile (opens in a new tab)</span></a></li>
          <li className={row}><span className="text-muted">Based in</span><span>{site.location}</span></li>
        </ul>
      </div>
    </Section>
  );
}
