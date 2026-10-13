import { site } from "../data/site";

declare const __RESUME_AVAILABLE__: boolean;

/** True only when the PDF existed in /public at build time. */
export const resumeAvailable: boolean = __RESUME_AVAILABLE__;
export const resumeHref = site.resumePath;
