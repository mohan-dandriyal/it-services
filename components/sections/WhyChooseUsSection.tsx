"use client";

import Image from "next/image";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  Rocket,
  Layers,
  Handshake,
  type LucideIcon,
} from "lucide-react";

import { whatWeDoData } from "@/types/template.type";

const data = whatWeDoData;

const EASE = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  rocket: Rocket,
  layers: Layers,
  handshake: Handshake,
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

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const imageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: EASE,
    },
  },
};

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-brand-soft section-space-compact"
    >
      {/* Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
        bg-gradient-to-br from-white via-brand-soft to-white"
      />

      <div className="relative section-shell">

        <div className="grid items-center gap-8 lg:grid-cols-[46%_1fr] lg:gap-12">

          {/* Section Image */}
          <motion.div
            variants={reduceMotion ? undefined : imageVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="group relative order-last overflow-hidden rounded-3xl ring-1 ring-brand-line"
          >
            <div
              className="relative aspect-[5/4] sm:aspect-[4/3]"
            >
              <div
                className="absolute inset-0"
              >
                <Image
                  src={data.image}
                  alt={data.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className={`object-cover object-center ${
                    reduceMotion
                      ? ""
                      : "transition-transform duration-1000 group-hover:scale-105"
                  }`}
                />
              </div>
            </div>
          </motion.div>

          {/* Section Content */}
          <motion.div
            variants={reduceMotion ? undefined : containerVariants}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Subtitle */}
            <motion.div
              variants={reduceMotion ? undefined : contentVariants}
              className="mb-2 flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-4 w-[2px] rounded-full bg-brand-primary"
              />

              <span
                className="section-label text-brand-primary"
              >
                {data.subtitle}
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={reduceMotion ? undefined : contentVariants}
              className="section-title text-foreground"
            >
              {data.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={reduceMotion ? undefined : contentVariants}
              className="section-copy mt-3 max-w-xl text-brand-copy"
            >
              {data.description}
            </motion.p>

            {/* Features */}
            <motion.div
              variants={reduceMotion ? undefined : containerVariants}
              className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"
            >
              {data.features.map((feature) => {
                const Icon = iconMap[feature.icon] || Rocket;

                return (
                  <motion.article
                    key={feature.id}
                    variants={
                      reduceMotion ? undefined : contentVariants
                    }
                    className="group flex flex-col items-start rounded-2xl border border-brand-line bg-white p-4"
                  >
                    {/* Feature Icon */}
                    <motion.div
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -5,
                              scale: 1.12,
                              rotate: -5,
                            }
                      }
                      transition={{
                        duration: 0.3,
                        ease: EASE,
                      }}
                      className="mb-3 text-brand-primary"
                    >
                      <Icon
                        size={27}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </motion.div>

                    {/* Feature Title */}
                    <h3
                      className="card-title mb-1.5 text-foreground"
                    >
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p
                      className="max-w-[180px] text-sm sm:text-[15px]
                      leading-relaxed text-[#031327]"
                    >
                      {feature.description}
                    </p>
                  </motion.article>
                );
              })}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
