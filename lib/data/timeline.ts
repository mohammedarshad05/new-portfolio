export type TimelineMilestone = {
  id: string;
  number: string;
  title: string;
  organization: string;
  duration: string;
  description: string;
  category: "EDUCATION" | "CERTIFICATION" | "PROFESSIONAL EXPERIENCE";
  side: "left" | "right";
  iconName: "GraduationCap" | "Award" | "Briefcase";
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "milestone-01",
    number: "01",
    title: "BCA Degree",
    organization: "Karnataka University Dharwad (KUD)",
    duration: "November 2021 – August 2024",
    description:
      "Completed my Bachelor of Computer Applications with a CGPA of 7.88, building a foundation in computer science and software development.",
    category: "EDUCATION",
    side: "left",
    iconName: "GraduationCap",
  },
  {
    id: "milestone-02",
    number: "02",
    title: "Full Stack Web Development Training",
    organization: "Future Leader Academy (FLA)",
    duration: "October 2024 – June 2025",
    description:
      "Completed full-stack web development training, gaining practical experience in frontend development, backend technologies, databases and building web applications.",
    category: "CERTIFICATION",
    side: "right",
    iconName: "Award",
  },
  {
    id: "milestone-03",
    number: "03",
    title: "Software Developer",
    organization: "ORO MEDIA LAB",
    duration: "Present",
    description:
      "Working on real-world client websites, developing responsive interfaces, converting Figma designs into code, building interactive animations and improving existing web experiences.",
    category: "PROFESSIONAL EXPERIENCE",
    side: "left",
    iconName: "Briefcase",
  },
];
