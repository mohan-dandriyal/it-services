"use client";

import { motion, useReducedMotion } from "framer-motion";

interface SectionHeaderProps {
  subtitle: string;
  title1: string;
  title2?: string;
  title3?: string;
  description?: string;
  align?: "left" | "center";
  accentTitle2?: boolean;
}

export default function SectionHeader({
  subtitle,
  title1,
  title2,
  title3,
  description,
  align = "center",
  accentTitle2 = false,
}: SectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const isCentered = align === "center";

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={isCentered ? "mx-auto max-w-2xl text-center" : "max-w-xl text-left"}
    >
      <div
        className={`mb-3 inline-flex items-center gap-2.5 section-label text-brand-primary ${
          isCentered ? "justify-center" : "justify-start"
        }`}
      >
        <span className="h-[2px] w-6 rounded-full bg-brand-primary/80" />
        <span>{subtitle}</span>
        {isCentered && <span className="h-[2px] w-6 rounded-full bg-brand-primary/80" />}
      </div>

      <h2 className="section-title text-foreground">
        {title1}{" "}
        {title2 ? (
          <span className={accentTitle2 ? "text-brand-primary" : "text-slate-900"}>
            {title2}
          </span>
        ) : null}
        {title3 ? <> {title3}</> : null}
      </h2>

      {description ? (
        <p className="mt-3.5 text-base leading-relaxed text-slate-600 sm:text-[17px]">
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
