import { resumeAvailable, resumeHref } from "../lib/resume";
import { ButtonLink } from "./ButtonLink";
import { Download } from "./Icons";

/** Renders nothing until the real PDF is in /public — no dead download buttons. */
export function ResumeButton({ variant = "secondary" }: { variant?: "primary" | "secondary" }) {
  if (!resumeAvailable) return null;
  return (
    <ButtonLink href={resumeHref} variant={variant} download ariaLabel="Download resume (PDF)">
      <Download /> Download resume
    </ButtonLink>
  );
}
