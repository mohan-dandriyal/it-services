"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Cloud,
  CodeXml,
  ShieldCheck,
} from "lucide-react";

import {heroData} from "@/types/template.type";

const { slides } = heroData;

const EASE = [0.22, 1, 0.36, 1] as const;

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants: Variants = {
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
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.25,
    },
  },
};

const imageVariants: Variants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 1.06,
  }),
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: {
      duration: 0.4,
      ease: EASE,
    },
  }),
};

const floatingIcons = [
  {
    Icon: Cloud,
    position: "top-[12%] left-[40%]",
    delay: 0,
  },
  {
    Icon: CodeXml,
    position: "top-[35%] left-[24%]",
    delay: 0.4,
  },
  {
    Icon: ShieldCheck,
    position: "top-[55%] left-[40%]",
    delay: 0.8,
  },
];

export default function HeroSection() {
  const [{ index, direction }, setSlide] = useState({
    index: 0,
    direction: 1,
  });

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const reduceMotion = useReducedMotion();

  const slide = slides[index];

  const changeSlide = (step: number) => {
    setSlide((previous) => ({
      index:
        (previous.index + step + slides.length) %
        slides.length,
      direction: step,
    }));
  };

  const goToSlide = (target: number) => {
    setSlide((previous) => ({
      index: target,
      direction: target > previous.index ? 1 : -1,
    }));
  };

  // Automatic slider
  useEffect(() => {
    if (hovered || focused || reduceMotion) return;

    const timer = setInterval(() => {
      setSlide((previous) => ({
        index: (previous.index + 1) % slides.length,
        direction: 1,
      }));
    }, 5500);

    return () => clearInterval(timer);
  }, [index, hovered, focused, reduceMotion]);

  return (
    <section
      id="home"
      aria-label="IT services hero slider"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      className="relative isolate overflow-hidden rounded-b-[30px]
      bg-brand-soft lg:min-h-[480px] xl:min-h-[550px]"
    >
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0
        bg-gradient-to-br from-brand-soft via-white to-brand-cyan/20"
      />

      {/* Bottom left decorative pattern */}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute bottom-0 left-0
        h-[200px] w-[230px] bg-gradient-to-tr
        from-brand-cyan/35 to-transparent"
        style={{
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Right side image slider */}
      <div
        className="relative h-[230px] overflow-hidden
        sm:h-[380px] lg:absolute lg:inset-y-0 lg:right-0
        lg:h-full lg:w-[57%]"
      >
        <div
          className="absolute inset-0 overflow-hidden
          rounded-tl-[70px] lg:rounded-none
          lg:[clip-path:polygon(25%_0,100%_0,100%_100%,0_100%)]"
        >
          <AnimatePresence
            initial={false}
            custom={direction}
            mode="sync"
          >
            <motion.div
              key={slide.id}
              custom={direction}
              variants={reduceMotion ? undefined : imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.highlight}
                fill
                preload={index === 0}
                sizes="(max-width: 1024px) 100vw, 57vw"
                className="object-cover object-center"
              />

              <div
                className="absolute inset-0 bg-gradient-to-r
                from-[#102f50]/15 to-transparent"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating technology icons */}
        {floatingIcons.map(({ Icon, position, delay }, i) => (
          <motion.div
            key={i}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.5 }}
            animate={
              reduceMotion
                ? { opacity: 1, scale: 1 }
                : {
                    opacity: 1,
                    scale: 1,
                    y: [0, -12, 0],
                  }
            }
            transition={{
              opacity: {
                duration: 0.6,
                delay,
              },
              scale: {
                duration: 0.6,
                delay,
              },
              y: {
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              },
            }}
            className={`absolute z-10 hidden sm:flex
              ${position} h-16 w-16 items-center justify-center
              rounded-2xl border border-white/40
              bg-[#339fff]/45 text-white shadow-xl
              backdrop-blur-md xl:h-20 xl:w-20`}
          >
            <Icon
              size={34}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </motion.div>
        ))}

        {/* Bottom right blue curve */}
        <motion.div
          initial={reduceMotion ? false : { x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: EASE,
          }}
          className="pointer-events-none absolute -bottom-20
          -right-20 h-[280px] w-[200px] rotate-[35deg]
          rounded-[100px] bg-gradient-to-b
          from-[#5bcaff] via-[#008cff] to-[#004bdf]"
        />

        <div
          className="pointer-events-none absolute -bottom-24
          -right-28 h-[280px] w-[200px] rotate-[35deg]
          rounded-[100px] bg-[#9bd5ff]"
        />
      </div>

      {/* Main hero content */}
      <div
        className="section-shell relative z-20 flex
        items-center py-14 lg:min-h-[480px]
        xl:min-h-[550px]"
      >
        <div className="w-full lg:w-[48%]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={slide.id}
              variants={reduceMotion ? undefined : contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Subtitle */}
              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="section-label mb-4 text-brand-primary"
              >
                {slide.subtitle}
              </motion.p>

              {/* Heading */}
              <motion.h1
                variants={reduceMotion ? undefined : itemVariants}
                className="text-[clamp(2.25rem,5vw,4.25rem)] font-bold leading-[1.08] tracking-[-0.045em] text-balance text-foreground"
              >
                {slide.title}{" "}
                <span className="text-brand-primary">
                  {slide.highlight}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={reduceMotion ? undefined : itemVariants}
                className="mt-5 max-w-[440px] text-base leading-relaxed text-brand-copy
                sm:text-base"
              >
                {slide.description}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={reduceMotion ? undefined : itemVariants}
                className="mt-7 flex flex-wrap items-center gap-4"
              >
                <motion.a
                  href={slide.primaryButton.href}
                  whileHover={
                    reduceMotion ? undefined : { y: -3 }
                  }
                  whileTap={
                    reduceMotion ? undefined : { scale: 0.96 }
                  }
                  className="group inline-flex items-center
                  justify-center gap-2 rounded-full bg-brand-primary
                  px-7 py-3 text-sm font-semibold text-white
                  shadow-lg shadow-blue-500/20 transition-colors
                  hover:bg-brand-deep"
                >
                  {slide.primaryButton.text}

                </motion.a>

                <motion.a
                  href={slide.secondaryButton.href}
                  whileHover={
                    reduceMotion ? undefined : { y: -3 }
                  }
                  whileTap={
                    reduceMotion ? undefined : { scale: 0.96 }
                  }
                  className="inline-flex items-center
                  justify-center rounded-full border
                  border-brand-primary bg-white/70 px-7 py-3
                  text-sm font-semibold text-foreground
                  transition-colors hover:bg-brand-primary
                  hover:text-white"
                >
                  {slide.secondaryButton.text}
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Previous button */}
      {/* <motion.button
        type="button"
        aria-label="Previous slide"
        onClick={() => changeSlide(-1)}
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        className="absolute left-3 top-[115px] z-30 flex
        h-10 w-10 -translate-y-1/2 items-center justify-center
        rounded-full border border-white/60 bg-white/90
        text-foreground shadow-md backdrop-blur-md
        sm:top-[190px] lg:left-5 lg:top-1/2
        lg:h-12 lg:w-12"
      >
        <ChevronLeft size={22} />
      </motion.button> */}

      {/* Next button */}
      {/* <motion.button
        type="button"
        aria-label="Next slide"
        onClick={() => changeSlide(1)}
        whileHover={reduceMotion ? undefined : { scale: 1.1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.9 }}
        className="absolute right-3 top-[115px] z-30 flex
        h-10 w-10 -translate-y-1/2 items-center justify-center
        rounded-full border border-white/60 bg-white/90
        text-foreground shadow-md backdrop-blur-md
        sm:top-[190px] lg:right-5 lg:top-1/2
        lg:h-12 lg:w-12"
      >
        <ChevronRight size={22} />
      </motion.button> */}

      {/* Pagination dots */}
      <div
        className="absolute bottom-4 left-1/2 z-30 flex
        -translate-x-1/2 items-center gap-2 rounded-full
        bg-white/90 px-3 py-2 shadow-sm backdrop-blur-md"
      >
        {slides.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={index === i ? "true" : undefined}
            onClick={() => goToSlide(i)}
            animate={{
              scale: index === i ? 1.15 : 1,
              backgroundColor:
                index === i ? "#0757f5" : "#a8b5c7",
            }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="h-2.5 w-2.5 rounded-full"
          />
        ))}
      </div>
    </section>
  );
}
