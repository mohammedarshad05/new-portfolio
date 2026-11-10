export type Project = {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  live: string;
  github: string | null;
  image: string;
  gif?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "NOOR-E-KHAAK",
    description:
      "Handcrafted Ayurvedic skincare brand website highlighting natural formulations, herbal wellness, and radiant beauty.",
    longDescription:
      "Modern, responsive web application designed and built for NOOR-E-KHAAK. Features elegant typography, smooth scrolling interactions, product storytelling highlighting pure Ayurvedic ingredients (Multani Mitti, Kasturi Manjal, and Red Sandalwood), and direct communication channels.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    live: "https://noor-e-khaak.vercel.app/",
    github: null,
    image: "/noor-e-khaak.webp",
    featured: true,
  },
];

export const skills = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "⬛" },
  { name: "TypeScript", icon: "🔷" },
  { name: "JavaScript", icon: "🟨" },
  { name: "PHP", icon: "🐘" },
  { name: "WordPress", icon: "🌐" },
  { name: "ACF Pro", icon: "⚙️" },
  { name: "Symfony", icon: "🎼" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "REST APIs", icon: "⚡" },
  { name: "Databases", icon: "🗄️" },
  { name: "Git", icon: "🔀" },
];

export const toolbox = [
  { label: "Frontend Development", icon: "⬜" },
  { label: "Custom CMS Architecture", icon: "⚙️" },
  { label: "ACF Pro Flexible Content", icon: "🧩" },
  { label: "Responsive Design", icon: "📱" },
  { label: "Performance & Clean Code", icon: "⚡" },
  { label: "Full Stack Architecture", icon: "🧠" },
];

export const social = {
  github: "https://github.com/mohammedarshad05",
  linkedin: "https://linkedin.com/in/mohammad-arshad-a5202a33b",
  twitter: "",
  email: "arshff005@gmail.com",
  resume: "",
};
