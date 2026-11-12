export type ClientProject = {
  id: number;
  title: string;
  description: string;
  contributions: string[];
  tech: string[];
  live: string;
  image: string;
};

export const clientProjects: ClientProject[] = [
  {
    id: 1,
    title: "ClearTax",
    description:
      "Contributed to enhancing website sections and improving user experience for their fintech and tax platform.",
    contributions: [
      "Figma-to-code implementation",
      "Responsive UI development",
      "Performance improvements",
    ],
    tech: ["React.js", "TypeScript", "Tailwind CSS"],
    live: "https://cleartax.com",
    image: "/exp-cleartax.png",
  },
  {
    id: 2,
    title: "MoEngage",
    description:
      "Contributed to frontend development, custom CMS components, and website enhancements for their customer engagement platform.",
    contributions: [
      "Custom WordPress & ACF Pro modules",
      "GSAP animations & UI components",
      "Bug fixes & performance tuning",
    ],
    tech: ["WordPress", "ACF Pro", "JavaScript", "GSAP"],
    live: "https://moengage.com",
    image: "/exp-moengage.png",
  },
  {
    id: 3,
    title: "Claydough Studio",
    description:
      "Contributed to building and refining interactive web pages and responsive layouts for the digital design studio.",
    contributions: [
      "Section & layout development",
      "Responsive design across breakpoints",
      "UI & interaction enhancements",
    ],
    tech: ["Next.js", "Tailwind CSS", "JavaScript"],
    live: "https://claydough.studio",
    image: "/exp-claydough.png",
  },
  {
    id: 4,
    title: "Century",
    description:
      "Contributed to website development, interactive sections, and UI refinements for their financial solutions platform.",
    contributions: [
      "Modular website sections",
      "Animations & interactions",
      "Cross-browser bug fixes",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    live: "https://centuryss.com",
    image: "/exp-century.png",
  },
];

