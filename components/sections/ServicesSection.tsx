"use client";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ChartNoAxesCombined,
  ClipboardList,
  CodeXml,
  Cloud,
  Handshake,
  PanelsTopLeft,
  ShieldCheck,
  Headset,
  type LucideIcon,
} from "lucide-react";

import { servicesData } from "@/types/template.type";
import Image from "next/image";

const services = servicesData;

const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  code: CodeXml,
  cloud: Cloud,
  shield: ShieldCheck,
  headset: Headset,
  consultation: Handshake,
  design: PanelsTopLeft,
  management: ClipboardList,
  research: ChartNoAxesCombined,
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const headingVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

export default function ServicesSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-brand-soft
      section-space-compact"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
        bg-gradient-to-b from-white via-brand-soft to-white"
      />

      <div className="relative section-shell">

        {/* Section Heading */}
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mb-8 max-w-[650px] text-center"
        >
          {/* Subtitle */}
          <motion.div
            variants={reduceMotion ? undefined : headingVariants}
            className="mb-2 flex items-center justify-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-[2px] w-9 bg-gradient-to-r
              from-transparent to-brand-primary"
            />

            <span
              className="section-label text-brand-primary"
            >
              {services.subtitle}
            </span>

            <span
              aria-hidden="true"
              className="h-[2px] w-9 bg-gradient-to-l
              from-transparent to-brand-primary"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={reduceMotion ? undefined : headingVariants}
            className="section-title text-foreground"
          >
            {services.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={reduceMotion ? undefined : headingVariants}
            className="section-copy mt-3 text-brand-copy"
          >
            {services.description}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid auto-rows-fr grid-cols-1
          gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.services.map((service) => {
            const Icon = iconMap[service.icon] || CodeXml;

            return (
              <motion.article
                key={service.id}
                variants={reduceMotion ? undefined : cardVariants}
                whileHover={
                  reduceMotion ? undefined : { y: -7 }
                }
                className="group relative flex h-full
                flex-col items-center overflow-hidden
                rounded-3xl border border-brand-line
                bg-white text-left
                shadow-[0_3px_10px_rgba(15,45,90,0.04)]
                transition-[border-color,box-shadow]
                duration-300 hover:border-brand-primary/40
                hover:shadow-[0_12px_35px_rgba(7,87,245,0.10)]"

              >

                <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden">
                  <Image src={service.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover motion-safe:transition-transform motion-safe:group-hover:scale-105" />
                </div>

                <div className="relative flex w-full flex-1 flex-col items-start p-5 sm:p-6">

                  {/* Service Icon */}
                  <motion.div
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { rotate: [0, -8, 8, 0], scale: 1.08 }
                    }
                    transition={{ duration: 0.4 }}
                    className="mb-4 flex size-12
                  shrink-0 items-center justify-center
                  rounded-2xl bg-brand-soft
                  text-brand-primary transition-colors
                  duration-300 group-hover:bg-brand-primary
                  group-hover:text-white"
                  >
                    <Icon
                      size={25}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </motion.div>

                  {/* Service Title */}
                  <h3
                    className="card-title mb-2 text-foreground"
                  >
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p
                    className="max-w-[34ch] text-sm sm:text-[15px] leading-relaxed text-brand-copy"
                  >
                    {service.description}
                  </p>

                  {/* Animated Bottom Border */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-1/2
                  h-[3px] w-0 -translate-x-1/2
                  rounded-full bg-brand-primary
                  transition-all duration-500
                  group-hover:w-[65%]"
                  />
                </div>


              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
