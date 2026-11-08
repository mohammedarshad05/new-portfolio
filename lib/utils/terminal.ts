import { projects, social } from "@/lib/data/projects";

export type TerminalLine = {
  type: "cmd" | "output" | "error" | "info";
  text: string;
};

export const initialTerminalHistory: TerminalLine[] = [];

export const terminalCommands: Record<string, () => string[]> = {
  help: () => [
    "- about: Learn about Arshad",
    "- projects: View featured projects",
    "- skills: List technical skills",
    "- contact: Get contact information",
    "- clear: Clear the terminal",
    "- whoami: Who are you talking to?",
  ],
  about: () => [
    "- Mohammed Arshad",
    "- Frontend-Focused Full Stack Developer",
    "- Specialization: React.js, Next.js, TypeScript, JavaScript",
    "- Backend: PHP, Symfony, REST APIs, Databases",
    "- Focus: Clean and maintainable code, modern responsive web applications",
  ],
  whoami: () => [
    "You're talking to Arshad's interactive portfolio terminal.",
    "Try: help, about, projects, contact",
  ],
  projects: () =>
    projects
      .map((project, index) => [
        `${index + 1}. ${project.title}`,
        `   ${project.description}`,
        `   Tech: ${project.tech.join(", ")}`,
        `   Live: ${project.live}`,
        `   GitHub: ${project.github ?? "Private"}`,
        "",
      ])
      .flat(),
  skills: () => [
    "- Languages: TypeScript, JavaScript, PHP",
    "- Frontend: React.js, Next.js, Tailwind CSS, HTML5, CSS3",
    "- Backend & APIs: PHP, Symfony, REST APIs, Node.js",
    "- Databases: MySQL, PostgreSQL, MongoDB",
    "- Tooling: Git, GitHub, Vercel",
  ],
  contact: () => [
    `- Email: ${social.email}`,
    `- GitHub: ${social.github}`,
    `- LinkedIn: ${social.linkedin}`,
  ],
};
