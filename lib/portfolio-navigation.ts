export const PROFILE_ANCHORS = ["profile", "projects", "cobot-demo", "cat-case", "about", "contact", "publications"] as const;

export function profileAnchor(hash: string): string | null {
  const id = hash.replace(/^#/, "");
  return (PROFILE_ANCHORS as readonly string[]).includes(id) ? id : null;
}
