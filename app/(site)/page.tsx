import type { Metadata } from "next";
import { HeroAbout } from "@/lib/components/HeroAbout";
import { ProjectsShowcase } from "@/lib/components/ProjectsShowcase";
import { StackPanel } from "@/lib/components/StackPanel";
import { Terminal } from "@/lib/components/Terminal";

export const metadata: Metadata = {
  title: { absolute: "Mohammed Arshad — Frontend-Focused Full Stack Developer" },
  description:
    "Frontend-Focused Full Stack Developer specializing in building modern, responsive, and user-friendly web applications.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroAbout />
      <StackPanel background="var(--card-orange)">
        <ProjectsShowcase />
      </StackPanel>
      <StackPanel>
        <Terminal />
      </StackPanel>
    </>
  );
}
