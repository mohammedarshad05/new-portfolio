import type { ComponentType } from "react";
import {
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  Building2,
  type LucideProps,
} from "lucide-react";
import type { TimelineMilestone } from "@/lib/data/timeline";

const ICON_MAP: Record<TimelineMilestone["iconName"], ComponentType<LucideProps>> = {
  GraduationCap,
  Award,
  Briefcase,
};

type Props = {
  milestone: TimelineMilestone;
};

export function TimelineCard({ milestone }: Props) {
  const Icon = ICON_MAP[milestone.iconName];

  return (
    <div className="group relative w-full rounded-[20px] border-2 border-dashed border-[#07080f]/15 bg-white p-6 sm:p-7 shadow-[0_4px_24px_rgba(242,154,74,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#F29A4A]/40 hover:shadow-[0_12px_36px_rgba(242,154,74,0.18)]">
      {/* Top row: Icon + Category Badge + Milestone Number */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#F29A4A]/30 bg-[#F29A4A]/10 text-[#F29A4A] transition-colors duration-300 group-hover:bg-[#F29A4A] group-hover:text-white">
            <Icon size={20} strokeWidth={2} />
          </div>
          <span className="inline-flex items-center rounded-full border border-[#F29A4A]/30 bg-[#F29A4A]/5 px-2.5 py-1 text-[0.65rem] font-bold tracking-wider text-[#F29A4A] uppercase">
            {milestone.category}
          </span>
        </div>

        <span className="font-mono text-xs font-bold tracking-wider text-[#07080f]/40 transition-colors duration-300 group-hover:text-[#F29A4A]">
          #{milestone.number}
        </span>
      </div>

      {/* Middle row: Title & Organization & Duration */}
      <div className="mt-4">
        <h3 className="text-lg sm:text-xl font-bold tracking-tight text-[#07080f]">
          {milestone.title}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold text-[#07080f]/85">
          <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
            <Building2 size={14} className="text-[#F29A4A]/80" />
            <span>{milestone.organization}</span>
          </span>
        </div>

        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-md border border-[#07080f]/10 bg-zinc-50 px-2.5 py-1 text-xs font-medium text-[var(--text-muted)]">
          <Calendar size={13} className="text-[#F29A4A]" />
          <span>{milestone.duration}</span>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 border-t border-[#07080f]/10 pt-4 text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
        {milestone.description}
      </p>
    </div>
  );
}
