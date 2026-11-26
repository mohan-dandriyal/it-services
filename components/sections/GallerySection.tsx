"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import MainContainer from "../common/MainContainer";
import SectionHeader from "../common/SectionHeader";

interface GallerySectionProps {
  data: {
    subtitle: string;
    title1: string;
    title2: string;
    images: { id: string | number; image: string; alt: string }[];
  };
}

export default function GallerySection({ data }: GallerySectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="gallery" className="section-space bg-white">
      <MainContainer>
        <SectionHeader
          subtitle={data.subtitle}
          title1={data.title1}
          title2={data.title2}
          align="center"
          accentTitle2
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="group overflow-hidden rounded-3xl border border-brand-line bg-brand-soft shadow-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                />
              </div>
              <p className="p-5 text-sm font-medium text-foreground">{item.alt}</p>
            </motion.div>
          ))}
        </div>
      </MainContainer>
    </section>
  );
}
