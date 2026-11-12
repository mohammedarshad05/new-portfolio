"use client";

import { motion } from "framer-motion";
import type { ClientProject } from "@/lib/data/experience";
import { useInViewFade } from "@/lib/hooks/useInViewFade";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  project: ClientProject;
  riseDelay: number;
  separateDelay: number;
};

/**
 * Client experience card matching the exact layout, backing animation,
 * and styling of ProjectCard using Tailwind CSS utilities.
 */
export function ExperienceCard({ project, riseDelay, separateDelay }: Props) {
  const { ref, visible } = useInViewFade<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      className="relative mr-[14px] mb-[14px] cursor-pointer"
      initial={{ y: 60, opacity: 0 }}
      animate={visible ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: riseDelay }}
    >
      <motion.div
        className="absolute inset-0 rounded-[20px] border border-[#07080f]/10 bg-[var(--card-orange)] -z-10"
        initial={{ x: 0, y: 0 }}
        animate={visible ? { x: 14, y: 14 } : { x: 0, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: separateDelay }}
      />

      <div className="relative flex h-full flex-col justify-between rounded-[20px] border-2 border-dashed border-[#07080f]/35 bg-white p-[24px]">
        <div className="flex flex-col">
          <h3 className="text-[1.1rem] font-bold text-[#07080f]">{project.title}</h3>
          <p className="mt-[8px] text-[0.85rem] leading-[1.6] text-[var(--text-muted)]">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col">
          <div className="relative aspect-video overflow-hidden rounded-[12px] border border-[#07080f]/10 bg-[var(--bg-2)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-top"
            />
          </div>

          <div className="mt-[16px]">
            <p className="mb-[6px] text-[0.75rem] font-bold text-[#07080f]">My Contributions</p>
            <ul className="space-y-[4px]">
              {project.contributions.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-[8px] text-[0.78rem] text-[var(--text-muted)]"
                >
                  <span
                    className="inline-block h-[5px] w-[5px] shrink-0 rotate-45 bg-[var(--card-orange)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-[16px] flex flex-wrap gap-[6px]">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-[4px] border border-[#07080f]/15 px-[9px] py-[3px] text-[0.68rem] text-[#07080f]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-[16px] flex items-center gap-[18px]">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-[5px] text-[0.8rem] font-semibold text-[var(--card-orange)] no-underline transition-colors duration-200 hover:text-[#07080f]"
            >
              Site
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

