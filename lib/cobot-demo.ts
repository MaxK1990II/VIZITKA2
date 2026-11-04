export const COBOT_DEMO = {
  source: "/demos/al-flow-cs620-r13.html",
  poster: "/images/al-flow-cs620-r13.webp",
  version: "R13",
  sourceSha256: "9854a1e68f5915bb886bc7163bd3200ba5fa56d6686f1d81e6fb38798ab93349",
} as const;

export type DemoShowcaseCopy = {
  eyebrow: string;
  title: string;
  description: string;
  stages: readonly string[];
  launch: string;
  close: string;
  openSeparately: string;
  modelNote: string;
  loading: string;
};
