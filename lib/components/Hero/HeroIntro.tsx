"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { social } from "@/lib/data/projects";
import { SocialLinks } from "@/lib/components/SocialLinks";
import styles from "./HeroIntro.module.css";

type Props = {
  visible?: boolean;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER = 0.12;

function riseProps(
  visible: boolean,
  step: number,
  duration = 0.7,
  tilt = false,
) {
  return {
    initial: tilt ? { y: "100%", rotate: 10 } : { y: "100%" },
    animate: tilt
      ? { y: visible ? "0%" : "100%", rotate: visible ? 0 : 10 }
      : { y: visible ? "0%" : "100%" },
    transition: { duration, ease: EASE, delay: step * STAGGER },
    style: tilt ? { transformOrigin: "bottom left" } : undefined,
  };
}

export function HeroIntro({ visible = false }: Props) {
  return (
    <div
      className={
        visible ? `${styles.heroContent} ${styles.visible}` : styles.heroContent
      }
    >
      <div className={`${styles.badge} ${styles.badgeA}`}>
        <span className={styles.badgeDot} />
        Full Stack Dev
      </div>
      <div className={`${styles.badge} ${styles.badgeB}`}>
        <span className={styles.badgeDot} />
        Software Developer
      </div>

      <h1 className={styles.heroName}>
        <span className={styles.greeting}>Hello, I&apos;m</span>
        <span className={styles.lineMask}>
          <motion.span
            className={styles.line}
            {...riseProps(visible, 0, 0.7, true)}
          >
            Mohammed
          </motion.span>
        </span>
        <span className={styles.lineMask}>
          <motion.span
            className={styles.line}
            {...riseProps(visible, 1, 0.7, true)}
          >
            Arshad<span className="accent-dot">.</span>
          </motion.span>
        </span>
      </h1>

      <motion.p
        className={styles.heroBio}
        initial={{ opacity: 0 }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.7, ease: EASE, delay: 2 * STAGGER }}
      >
        Frontend-focused full stack developer specializing in building modern, responsive, and user-friendly web applications.
      </motion.p>

      <div className={styles.heroCtas}>
        <span className={styles.ctaMask}>
          <motion.span
            className={styles.btnStack}
            {...riseProps(visible, 3, 0.4)}
          >
            <span className={styles.btnBacking} />
            {social.resume ? (
              <a
                href={social.resume}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                Resume
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </a>
            ) : (
              <Link href="/contact" className={styles.ctaBtn}>
                Get in touch
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            )}
          </motion.span>
        </span>

        <SocialLinks
          className={styles.heroSocial}
          animate
          visible={visible}
          baseStep={4}
          stagger={STAGGER}
          duration={0.4}
        />
      </div>
    </div>
  );
}
