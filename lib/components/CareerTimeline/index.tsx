"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";
import { timelineMilestones } from "@/lib/data/timeline";
import { TimelineCard } from "./TimelineCard";

export function CareerTimeline() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Scoped context for safe cleanup
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Reduced motion: show full static state
        gsap.set(".timeline-card-wrap", { opacity: 1, x: 0 });
        gsap.set(".timeline-node", {
          scale: 1,
          opacity: 1,
          borderColor: "#F29A4A",
          boxShadow: "0 0 16px rgba(242, 154, 74, 0.6)",
        });
        gsap.set(".timeline-node-dot", {
          backgroundColor: "#F29A4A",
          scale: 1.25,
        });
        gsap.set(".timeline-progress-line", { scaleY: 1 });
        gsap.set(".timeline-connector, .timeline-connector-mobile", {
          opacity: 1,
          scaleX: 1,
        });
        return;
      }

      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP & TABLET (>= 768px)
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        // 1. Central progress line (scrub scaleY 0 -> 1)
        gsap.fromTo(
          ".timeline-progress-line-desktop",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ".timeline-flow-container",
              start: "top 65%",
              end: "bottom 75%",
              scrub: 1,
            },
          }
        );

        // 2. Left-side cards: animate from x: -70 to x: 0, opacity 0 to 1
        gsap.utils.toArray<HTMLElement>(".timeline-card-left").forEach((card) => {
          gsap.fromTo(
            card,
            { x: -70, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // 3. Right-side cards: animate from x: 70 to x: 0, opacity 0 to 1
        gsap.utils.toArray<HTMLElement>(".timeline-card-right").forEach((card) => {
          gsap.fromTo(
            card,
            { x: 70, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // 4. Horizontal connectors
        gsap.utils.toArray<HTMLElement>(".timeline-connector").forEach((conn) => {
          gsap.fromTo(
            conn,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: conn,
                start: "top 76%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // 5. Timeline nodes: scale up + orange glow + activate inner dot
        gsap.utils.toArray<HTMLElement>(".timeline-node-desktop").forEach((node) => {
          const dot = node.querySelector(".timeline-node-dot");

          gsap.fromTo(
            node,
            {
              scale: 0.75,
              opacity: 0.45,
              borderColor: "#d4d4d8",
              boxShadow: "0 0 0px rgba(242, 154, 74, 0)",
            },
            {
              scale: 1,
              opacity: 1,
              borderColor: "#F29A4A",
              boxShadow: "0 0 16px rgba(242, 154, 74, 0.6)",
              duration: 0.4,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: node,
                start: "top 68%",
                toggleActions: "play reverse play reverse",
              },
            }
          );

          if (dot) {
            gsap.fromTo(
              dot,
              { backgroundColor: "#d4d4d8", scale: 0.8 },
              {
                backgroundColor: "#F29A4A",
                scale: 1.25,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 68%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }
        });
      });

      // ==========================================
      // MOBILE (< 768px)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        // 1. Mobile progress line
        gsap.fromTo(
          ".timeline-progress-line-mobile",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ".timeline-flow-container",
              start: "top 70%",
              end: "bottom 80%",
              scrub: 1,
            },
          }
        );

        // 2. All cards animate from x: 35 to 0 (gentler distance)
        gsap.utils.toArray<HTMLElement>(".timeline-card-mobile").forEach((card) => {
          gsap.fromTo(
            card,
            { x: 35, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // 3. Mobile Connectors
        gsap.utils.toArray<HTMLElement>(".timeline-connector-mobile").forEach((conn) => {
          gsap.fromTo(
            conn,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              scrollTrigger: {
                trigger: conn,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

        // 4. Mobile Nodes
        gsap.utils.toArray<HTMLElement>(".timeline-node-mobile").forEach((node) => {
          const dot = node.querySelector(".timeline-node-dot");

          gsap.fromTo(
            node,
            {
              scale: 0.75,
              opacity: 0.45,
              borderColor: "#d4d4d8",
              boxShadow: "0 0 0px rgba(242, 154, 74, 0)",
            },
            {
              scale: 1,
              opacity: 1,
              borderColor: "#F29A4A",
              boxShadow: "0 0 14px rgba(242, 154, 74, 0.6)",
              duration: 0.4,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: node,
                start: "top 72%",
                toggleActions: "play reverse play reverse",
              },
            }
          );

          if (dot) {
            gsap.fromTo(
              dot,
              { backgroundColor: "#d4d4d8", scale: 0.8 },
              {
                backgroundColor: "#F29A4A",
                scale: 1.25,
                duration: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: node,
                  start: "top 72%",
                  toggleActions: "play reverse play reverse",
                },
              }
            );
          }
        });
      });
    }, containerRef);

    // Refresh triggers once fonts/styles settle
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="career-timeline"
      ref={containerRef}
      className="relative w-full overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-center text-center sm:mb-24">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#07080f]/20 bg-white px-4 py-1.5 text-xs font-bold tracking-widest text-[#07080f] uppercase shadow-xs">
            MY JOURNEY
          </span>
          <h2 className="mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.02em] text-[#07080f]">
            Career Timeline<span className="accent-dot text-[#F29A4A]">.</span>
          </h2>
          <p className="mt-3.5 max-w-[620px] text-base leading-[1.7] text-[var(--text-muted)] sm:text-lg">
            A journey of learning, building, and growing as a developer.
          </p>
        </div>

        {/* Timeline Flow Container */}
        <div className="timeline-flow-container relative">
          {/* Central Line - Desktop (centered) */}
          <div
            className="absolute top-[44px] bottom-[44px] left-1/2 hidden w-[2px] -translate-x-1/2 bg-zinc-200/90 md:block"
            aria-hidden="true"
          >
            <div
              className="timeline-progress-line-desktop absolute inset-0 w-full origin-top bg-[#F29A4A] shadow-[0_0_12px_rgba(242,154,74,0.7)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Central Line - Mobile (left-aligned at 28px) */}
          <div
            className="absolute top-[44px] bottom-[44px] left-[28px] block w-[2px] -translate-x-1/2 bg-zinc-200/90 md:hidden"
            aria-hidden="true"
          >
            <div
              className="timeline-progress-line-mobile absolute inset-0 w-full origin-top bg-[#F29A4A] shadow-[0_0_12px_rgba(242,154,74,0.7)]"
              style={{ transform: "scaleY(0)" }}
            />
          </div>

          {/* Milestone Rows */}
          {timelineMilestones.map((milestone) => (
            <div key={milestone.id} className="relative mb-16 last:mb-0 sm:mb-24">
              {/* DESKTOP LAYOUT (>= 768px) */}
              <div className="hidden items-start md:flex">
                {/* Left Column (50% width) */}
                <div className="flex w-1/2 justify-end pr-10 lg:pr-14">
                  {milestone.side === "left" && (
                    <div className="timeline-card-wrap timeline-card-left relative w-full max-w-[500px]">
                      <TimelineCard milestone={milestone} />
                      {/* Horizontal connector to center node */}
                      <div
                        className="timeline-connector absolute top-[44px] -right-10 h-[2px] w-10 origin-right border-t-2 border-dashed border-[#F29A4A]/60 lg:-right-14 lg:w-14"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>

                {/* Center Node */}
                <div
                  className="timeline-node timeline-node-desktop absolute top-[44px] left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-300 bg-white"
                  aria-hidden="true"
                >
                  <div className="timeline-node-dot h-2.5 w-2.5 rounded-full bg-zinc-300" />
                </div>

                {/* Right Column (50% width) */}
                <div className="flex w-1/2 justify-start pl-10 lg:pl-14">
                  {milestone.side === "right" && (
                    <div className="timeline-card-wrap timeline-card-right relative w-full max-w-[500px]">
                      {/* Horizontal connector from center node */}
                      <div
                        className="timeline-connector absolute top-[44px] -left-10 h-[2px] w-10 origin-left border-t-2 border-dashed border-[#F29A4A]/60 lg:-left-14 lg:w-14"
                        aria-hidden="true"
                      />
                      <TimelineCard milestone={milestone} />
                    </div>
                  )}
                </div>
              </div>

              {/* MOBILE LAYOUT (< 768px) */}
              <div className="relative flex items-start pl-14 md:hidden sm:pl-16">
                {/* Mobile Node on left line */}
                <div
                  className="timeline-node timeline-node-mobile absolute top-[44px] left-[28px] z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-300 bg-white"
                  aria-hidden="true"
                >
                  <div className="timeline-node-dot h-2 w-2 rounded-full bg-zinc-300" />
                </div>

                {/* Mobile Connector */}
                <div
                  className="timeline-connector-mobile absolute top-[44px] left-[28px] h-[2px] w-7 origin-left border-t-2 border-dashed border-[#F29A4A]/60 sm:w-8"
                  aria-hidden="true"
                />

                {/* Mobile Card */}
                <div className="timeline-card-wrap timeline-card-mobile w-full">
                  <TimelineCard milestone={milestone} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll to Explore indicator */}
        <div className="mt-16 flex flex-col items-center justify-center gap-2 opacity-75 transition-opacity hover:opacity-100 sm:mt-24">
          <span className="font-mono text-[0.7rem] font-semibold tracking-widest text-[#07080f]/60 uppercase">
            Scroll to explore
          </span>
          <ChevronDown className="h-4 w-4 animate-bounce text-[#F29A4A]" />
        </div>
      </div>
    </section>
  );
}
