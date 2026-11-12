import { clientProjects } from "@/lib/data/experience";
// import { ThreeHangingTag } from "@/lib/components/HangingTag";
import { ExperienceCard } from "./ExperienceCard";

const RISE_STAGGER = 0.15;
const RISE_DURATION = 0.7;
const SEPARATE_STAGGER = 0.15;
const COLUMNS = 3;
const rowRiseSpan = (COLUMNS - 1) * RISE_STAGGER + RISE_DURATION;

/**
 * Professional Experience section mirroring the Project archive layout
 * with Tailwind CSS styling and a 3D stretchable hanging card header.
 */
export function ProfessionalExperience() {
  return (
    <section
      id="professional-experience"
      className="px-[16px] pt-[100px] pb-[140px] min-[481px]:px-[24px]"
    >
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[48px]">
          {/* <ThreeHangingTag label="Professional Experience" /> */}
          <div className="mt-[12px] flex flex-wrap items-end justify-between gap-[16px]">
            <div>
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.02em] text-[var(--text)]">
                Selected Client Work<span className="accent-dot">.</span>
              </h2>
              <p className="mt-[14px] max-w-[620px] leading-[1.7] text-[var(--text-muted)]">
                A selection of real-world projects I&apos;ve contributed to at Oro Media Lab.
              </p>
            </div>

            <span className="inline-flex items-center gap-[8px] rounded-full border border-[#07080f]/12 bg-[var(--bg-2)] px-[16px] py-[6px] text-[0.75rem] font-bold tracking-[0.06em] text-[#07080f]">
              <span>ORO</span>
              <span className="text-[#07080f]/25">|</span>
              <span className="font-semibold text-[var(--text-muted)]">MEDIA LAB</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-[24px] min-[641px]:grid-cols-2 min-[1025px]:grid-cols-3">
          {clientProjects.map((project, i) => {
            const col = i % COLUMNS;
            return (
              <ExperienceCard
                key={project.id}
                project={project}
                riseDelay={col * RISE_STAGGER}
                separateDelay={rowRiseSpan + col * SEPARATE_STAGGER}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

