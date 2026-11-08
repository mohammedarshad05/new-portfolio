import { Footer } from "@/lib/components/Footer";
import { SiteChrome } from "@/lib/components/SiteChrome";
import { IntroCompleteProvider } from "@/lib/context/IntroCompleteContext";
import { social } from "@/lib/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://arshad-portfolio.vercel.app";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Arshad",
  alternateName: ["Arshad"],
  url: siteUrl,
  image: `${siteUrl}/avat.png`,
  jobTitle: "Frontend-Focused Full Stack Developer",
  description:
    "Software Developer specializing in building modern, responsive, and user-friendly web applications.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "PHP",
    "Symfony",
    "REST APIs",
    "Frontend development",
    "Full Stack development",
  ],
  sameAs: [social.github, social.linkedin].filter(Boolean),
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <IntroCompleteProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <SiteChrome />
      <main>{children}</main>
      <Footer />
    </IntroCompleteProvider>
  );
}
