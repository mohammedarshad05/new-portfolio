import type { Metadata } from "next";
import { Projects } from "@/lib/components/Projects";
import { ProfessionalExperience } from "@/lib/components/ProfessionalExperience";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of my projects, experiments, and full-stack web applications.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Projects
        label="All Projects"
        title="Project archive"
        intro="A deeper look at shipped products, experiments, and frontend builds."
      />
      <ProfessionalExperience />
    </>
  );
}
