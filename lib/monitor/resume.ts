export const RESUME_FACTS = `Mohammed Arshad, Frontend-Focused Full Stack Developer specializing in building modern, responsive, and user-friendly web applications.
- Core skills: React.js, Next.js, TypeScript, JavaScript, PHP, Symfony, REST APIs, databases, Tailwind CSS, Git.
- Experience turning ideas and designs into functional digital experiences, writing clean and maintainable code, and creating intuitive interfaces.`;

export const LINKS = {
  GitHub: "https://github.com/mohammadarshad05",
  LinkedIn: "https://linkedin.com/in/mohammad-arshad-a5202a33b",
};

export const SIGNOFF = "Mohammed Arshad";

export const AVAILABILITY = "I can work in any timezone.";

export function assembleEmail(role: string, company: string | null, fit: string) {
  const at = company ? ` at ${company}` : "";
  const links = Object.entries(LINKS).map(([k, v]) => `${k} - ${v}`).join("\n");
  const body = [
    "Hello,",
    "",
    `I'm writing to apply for the ${role} position${at}. ${fit} ${AVAILABILITY}`,
    "",
    "I've attached my CV for your consideration, and here are some of my profile links:",
    links,
    "",
    "Best regards,",
    SIGNOFF,
  ].join("\n");
  return { subject: `${role} application - ${SIGNOFF}`, body };
}
