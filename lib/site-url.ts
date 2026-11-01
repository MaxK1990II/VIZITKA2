export const SITE_ORIGIN = "https://kanochkinmm.ru";
export const SITE_CANONICAL = `${SITE_ORIGIN}/`;

export function buildApexAbsoluteUrl(pathname: string, search = ""): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_ORIGIN}${path}${search}`;
}
