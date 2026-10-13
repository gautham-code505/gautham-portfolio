declare const __PUBLIC_FILES__: string[];

const files = new Set<string>(__PUBLIC_FILES__);

/** True when the path exists in /public at build time. */
export const assetExists = (path: string | undefined): path is string => Boolean(path && files.has(path));
