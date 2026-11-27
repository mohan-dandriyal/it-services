"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import {
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

import { SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";

import { testimonialsData } from "@/types/template.type";

const data = testimonialsData;

const Swiper = dynamic(() => import("swiper/react").then((module) => module.Swiper), {
  ssr: false,
  loading: () => <div aria-hidden="true" className="min-h-56" />,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const reduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden
      bg-[#e5f1fc] section-space-compact"
    >
      {/* Background Gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0
        bg-gradient-to-br from-brand-soft via-white to-brand-cyan/10"
      />

      <div className="relative section-shell">

        {/* Section Heading */}
        <motion.div
          variants={reduceMotion ? undefined : containerVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-8 text-center"
        >
          <motion.div
            variants={reduceMotion ? undefined : itemVariants}
            className="mb-2 flex items-center justify-center gap-3"
          >
            <span className="h-[2px] w-9 bg-brand-primary" />

            <span
              className="section-label text-brand-primary"
            >
              {data.subtitle}
            </span>

            <span className="h-[2px] w-9 bg-brand-primary" />
          </motion.div>

          <motion.h2
            variants={reduceMotion ? undefined : itemVariants}
            className="section-title text-foreground"
          >
            {data.title}
          </motion.h2>
        </motion.div>

        {/* Testimonials Slider */}
        <motion.div
          variants={reduceMotion ? undefined : itemVariants}
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative px-5 sm:px-12"
        >
          <Swiper
            modules={[A11y]}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1}
            spaceBetween={24}
            loop={data.testimonials.length >= 4}
            speed={reduceMotion ? 0 : 350}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
            className="!py-3 [&_.swiper-wrapper]:!items-stretch"
          >
            {data.testimonials.map((item) => (
              <SwiperSlide
                key={item.id}
                className="!h-auto"
              >
                <motion.article
                  whileHover={
                    reduceMotion ? undefined : { y: -4 }
                  }
                  transition={{
                    duration: 0.3,
                    ease: EASE,
                  }}
                  className="group flex h-full min-h-[180px]
                  flex-col items-center gap-5 rounded-[22px]
                  border border-brand-line bg-white p-5
                  shadow-[0_3px_12px_rgba(15,45,90,0.05)]
                  transition-shadow duration-300
                  hover:shadow-[0_8px_25px_rgba(7,87,245,0.1)]
                  sm:flex-row sm:p-6 xl:gap-7"
                >


                  {/* Testimonial Content */}
                  <div className="relative flex w-full flex-1 flex-col">

                    {/* Quote Icon */}
                    <Quote
                      size={27}
                      fill="currentColor"
                      strokeWidth={1}
                      aria-hidden="true"
                      className="mb-1 rotate-180 text-brand-primary"
                    />

                    {/* Description */}
                    <p
                      className="section-copy mb-5 text-foreground"
                    >
                      {item.description}
                    </p>

                    {/* Client Information */}
                    <div className="flex items-center gap-4 flex-wrap">

                      {/* Client Image */}
                      <div
                        className="relative h-14 w-14
                    shrink-0 overflow-hidden rounded-full
                    bg-[#e8edf4] xl:h-16 xl:w-16"
                      >
                        <Image
                          src={item.image}
                          alt=""
                          fill
                          sizes="80px"
                          className={`object-cover ${reduceMotion
                            ? ""
                            : "transition-transform duration-700 group-hover:scale-110"
                            }`}
                        />
                      </div>

                      <div
                        className="flex-1 flex flex-wrap
                      items-end justify-between gap-3"
                      >

                        <div>
                          <h3
                            className="card-title text-foreground"
                          >
                            {item.name}
                          </h3>

                          <p className="mt-0.5 text-sm leading-relaxed text-brand-copy">
                            {item.designation}
                          </p>
                        </div>

                        {/* Star Rating */}
                        <div
                          className="flex items-center gap-0.5"
                          aria-label={`${item.rating} out of 5 stars`}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={17}
                              aria-hidden="true"
                              fill={
                                i < item.rating
                                  ? "#ffb800"
                                  : "none"
                              }
                              className={
                                i < item.rating
                                  ? "text-[#ffb800]"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Previous Button */}
          <motion.button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => swiperRef.current?.slidePrev()}
            whileHover={
              reduceMotion ? undefined : { scale: 1.08 }
            }
            whileTap={
              reduceMotion ? undefined : { scale: 0.92 }
            }
            className="absolute left-0 top-1/2 z-20 flex
            h-9 w-9 -translate-y-1/2 items-center
            justify-center rounded-full border border-brand-line
            bg-white text-foreground shadow-sm
            transition-colors duration-300
            hover:bg-brand-primary hover:text-white
            sm:h-11 sm:w-11"
          >
            <ChevronLeft size={22} />
          </motion.button>

          {/* Next Button */}
          <motion.button
            type="button"
            aria-label="Next testimonial"
            onClick={() => swiperRef.current?.slideNext()}
            whileHover={
              reduceMotion ? undefined : { scale: 1.08 }
            }
            whileTap={
              reduceMotion ? undefined : { scale: 0.92 }
            }
            className="absolute right-0 top-1/2 z-20 flex
            h-9 w-9 -translate-y-1/2 items-center
            justify-center rounded-full border border-brand-line
            bg-white text-foreground shadow-sm
            transition-colors duration-300
            hover:bg-brand-primary hover:text-white
            sm:h-11 sm:w-11"
          >
            <ChevronRight size={22} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
