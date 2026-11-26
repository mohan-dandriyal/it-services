"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
    Cloud,
    DatabaseBackup,
    Headset,
    Lightbulb,
    Network,
    Settings,
    ShieldCheck,
    ThumbsUp,
    type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { aboutData } from "@/types/template.type"; 

import MainContainer from "@/components/common/MainContainer";

/* Same structure as your JSON: AboutUs -> variants -> WedBlissAboutUs2 */
const data = aboutData
const iconMap: Record<string, LucideIcon> = {
    ThumbsUp,
    Settings,
    Headset,
    ShieldCheck,
    Cloud,
    Network,
    DatabaseBackup,
    Lightbulb,
};
const getIcon = (name: string): LucideIcon => iconMap[name] ?? Settings;

/* ---------- Animations ---------- */
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
    }),
};

export default function About() {
    const reduceMotion = useReducedMotion();
    const about = data;

    // Split the title so the highlight text gets the accent color
    const { title, titleHighlight } = about;
    const hlIndex = titleHighlight ? title.indexOf(titleHighlight) : -1;
    const titleBefore = hlIndex >= 0 ? title.slice(0, hlIndex) : title;
    const titleAfter = hlIndex >= 0 ? title.slice(hlIndex + (titleHighlight?.length ?? 0)) : "";

    return (
        <section
            id="about"
            className="section-space-compact relative scroll-mt-20 overflow-hidden bg-white"
        >
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl"
            />

            <MainContainer>
                {/* ---------- Top: image + text ---------- */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Image side */}
                    <motion.div
                        initial={reduceMotion ? false : { opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="relative mx-auto w-full max-w-[460px]"
                    >
                        <motion.div
                            aria-hidden="true"
                            initial={reduceMotion ? false : { opacity: 0, scale: 0.6, x: 12, y: 12 }}
                            whileInView={{ opacity: 0.7, scale: 1, x: 0, y: 0 }}
                            viewport={{ once: true, amount: 0.4 }}
                            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 16, delay: 0.15 }}
                            className="pointer-events-none absolute -left-3 -top-5 size-40 origin-bottom-right opacity-70 [background-image:radial-gradient(#a5b4fc_1.5px,transparent_1.5px)] [background-size:14px_14px] sm:-left-8 sm:-top-8"
                        />

                        <motion.div
                            whileHover={reduceMotion ? undefined : { y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="relative aspect-[4/4.6] overflow-hidden bg-slate-100 shadow-xl shadow-indigo-900/10"
                        >
                            <Image
                                src={about.image}
                                alt={about.imageAlt}
                                fill
                                sizes="(max-width: 1024px) 90vw, 460px"
                                className="object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </motion.div>

                        {about.experience && (
                            <motion.div
                                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-5 right-2 rounded-2xl bg-brand-primary px-5 py-3 text-white shadow-lg shadow-indigo-600/30 sm:-right-6"
                            >
                                <p className="text-2xl font-bold leading-none">{about.experience.value}</p>
                                <p className="mt-1 text-xs font-medium text-indigo-100">
                                    {about.experience.label}
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Text side */}
                    <div>
                        <motion.span
                            variants={fadeUp}
                            custom={0}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="inline-flex rounded-full bg-white px-6 py-2 text-sm font-semibold text-brand-primary shadow-md shadow-indigo-500/10 ring-1 ring-indigo-100"
                        >
                            {about.subtitle}
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            custom={1}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="section-title mt-5 text-foreground"
                        >
                            {titleBefore}
                            {hlIndex >= 0 && <span className="text-brand-primary">{titleHighlight}</span>}
                            {titleAfter}
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            custom={2}
                            initial={reduceMotion ? false : "hidden"}
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="section-copy mt-5 max-w-xl border-l-2 border-brand-line pl-4 text-brand-copy"
                        >
                            {about.description}
                        </motion.p>

                        <div className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
                            {about.features.map((item, i) => {
                                const Icon = getIcon(item.icon);
                                return (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeUp}
                                        custom={3 + i}
                                        initial={reduceMotion ? false : "hidden"}
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        className="group flex cursor-default items-center gap-3"
                                    >
                                        <motion.span
                                            whileHover={reduceMotion ? undefined : { rotate: [0, -12, 12, 0], scale: 1.12 }}
                                            transition={{ duration: 0.5 }}
                                            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-brand-primary transition-colors group-hover:bg-brand-soft"
                                        >
                                            <Icon className="h-9 w-9" strokeWidth={2.2} />
                                        </motion.span>
                                        <p className="card-title text-foreground">
                                            {item.title}
                                            <br />
                                            {item.subtitle}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </MainContainer>
        </section>
    );
}
