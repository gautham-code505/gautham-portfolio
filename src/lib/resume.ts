import { site } from "../data/site";
import { assetExists } from "./assets";

/** True only when the PDF existed in /public at build time. */
export const resumeAvailable: boolean = assetExists(site.resumePath);
export const resumeHref = site.resumePath;
