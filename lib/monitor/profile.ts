export const INCLUDE = [
  "frontend", "front-end", "front end", "react", "next.js", "nextjs",
  "vue", "svelte", "typescript", "javascript", "ui engineer", "web developer",
];

export const INCLUDE_TAGS = [
  "frontend", "front-end", "front end", "react", "next.js", "nextjs", "vue", "svelte",
];

export const EXCLUDE_TITLE = [
  "full stack", "full-stack", "fullstack", "backend", "back-end", "devops",
  "intern", "internship", "unpaid", "principal", "staff engineer",
  "director", "vp of", "head of", "data engineer", "data scientist",
  "machine learning", "qa ", "test engineer", "assistant", "designer",
  "manager", "sales", "support", "marketing", "solutions architect",
  ".net", "ruby", "rails", "python", "golang", "java ", "c++",
  "shopify", "wordpress", "ai engineer", "ai agent",
  "react native", "android", "ios", "mobile",
];

const OPEN_REGION = /worldwide|anywhere|global|africa|nigeria|emea|international|any ?location/;
const CLOSED_REGION = new RegExp(
  "\\b(usa?|united states|u\\.s\\.|canada|uk|united kingdom|great britain|europe|eu|germany|france|spain|italy|poland|netherlands|ireland|portugal|india|philippines|brazil|latam|latin america|argentina|mexico|colombia|chile|australia|new zealand|apac|asia|singapore|japan|china|israel|turkey|dubai|uae)\\b",
);

export function excludesNigeria(location?: string | null) {
  if (!location) return false;
  const l = location.toLowerCase().replace(/south africa/g, "");
  if (OPEN_REGION.test(l)) return false;
  return CLOSED_REGION.test(l);
}

export const REQUIRE_REMOTE = false;
export const SKIP_REGION_LOCKED = false;

export function isCandidate(job: { title: string; tags?: string[]; remote?: boolean; location?: string }) {
  if (REQUIRE_REMOTE && job.remote !== true) return false;
  if (SKIP_REGION_LOCKED && excludesNigeria(job.location)) return false;

  const title = job.title.toLowerCase();
  const tags = (job.tags ?? []).map((t) => t.toLowerCase());

  if (EXCLUDE_TITLE.some((k) => title.includes(k))) return false;
  if (/\blead(er)?\b/.test(title)) return false;

  if (INCLUDE.some((k) => title.includes(k))) return true;
  return tags.some((t) => INCLUDE_TAGS.some((k) => t.includes(k)));
}

export const SCORE_THRESHOLD = 60;

export const PROFILE = `Candidate: Mohammed Arshad, frontend-focused full stack software developer.
- Level: mid-level developer.
- Core stack: React.js, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, PHP, Symfony, REST APIs, databases.
- Focus: Building modern, responsive, and user-friendly web applications, clean and maintainable code.`;

export const REQUIRE_CONTACT_EMAIL = false;

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}/gi;
const NOT_A_CONTACT = /^(no-?reply|do-?not-?reply|donotreply|privacy|abuse|unsubscribe)@|@(example\.|sentry\.)|\.(png|jpe?g|gif|svg|webp|css|js)$/i;

export function extractEmail(text?: string | null) {
  return (text ?? "").match(EMAIL_RE)?.find((e) => !NOT_A_CONTACT.test(e)) ?? null;
}
