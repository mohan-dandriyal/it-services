"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUp, ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { footerData } from "@/types/template.type";
import BrandLogo from "./BrandLogo";
import LucideIcon from "./LucideIcon";
import MainContainer from "./MainContainer";

const data = footerData;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

const headingClass = "relative pb-3 font-heading text-sm font-semibold uppercase tracking-wider text-white";
/* Small accent line under every column heading */
const headingLine = "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-brand-cyan";

export default function Footer() {
  const reduceMotion = useReducedMotion();

  const contactItems = [
    { Icon: Phone, label: data.contactInfo.phone, href: `tel:${data.contactInfo.phone.replace(/\s+/g, "")}` },
    { Icon: Mail, label: data.contactInfo.email, href: `mailto:${data.contactInfo.email}` },
    { Icon: MapPin, label: data.contactInfo.address, href: null },
  ];

  return (
    <footer className="relative isolate overflow-hidden bg-brand-navy text-slate-300">
      {/* Gradient top line */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-cyan/70 to-transparent" />
      {/* Soft glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-0 -z-10 size-72 rounded-full bg-brand-primary/20 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-0 -z-10 size-72 rounded-full bg-brand-cyan/10 blur-3xl" />

      <MainContainer className="pb-6 pt-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Brand + socials ---------- */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="sm:col-span-2 lg:col-span-5"
          >
            <BrandLogo logo={data.logoImage} logoAlt={data.logoAlt} linkTo={data.linkto} />
            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-300/90">{data.description}</p>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Follow Us</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {data.socialLinks.map((social) => (
                  <motion.a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.icon}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors duration-200 hover:border-brand-primary hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/40"
                  >
                    <LucideIcon name={social.icon} className="size-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ---------- Quick links ---------- */}
          <motion.nav
            aria-label="Footer quick links"
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className={`${headingClass} ${headingLine}`}>{data.quickLinks.title}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {data.quickLinks.items.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="group inline-flex items-center gap-1.5 text-slate-300/90 transition-all duration-200 hover:translate-x-1 hover:text-white"
                  >
                    <ChevronRight className="size-3.5 -ml-1 text-brand-cyan opacity-0 transition-all duration-200 group-hover:ml-0 group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* ---------- Contact ---------- */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-4"
          >
            <h3 className={`${headingClass} ${headingLine}`}>{data.contactInfo.title}</h3>
            <ul className="mt-5 space-y-4 text-sm">
              {contactItems.map(({ Icon, label, href }) => (
                <li key={label} className="group flex items-start gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-cyan ring-1 ring-white/10 transition-all duration-300 group-hover:bg-brand-cyan group-hover:text-brand-navy">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  {href ? (
                    <a href={href} className="break-words pt-1.5 leading-snug transition-colors hover:text-white">
                      {label}
                    </a>
                  ) : (
                    <span className="pt-1.5 leading-snug">{label}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---------- Bottom bar ---------- */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 sm:flex-row">
          <p className="text-center sm:text-left">{data.copyrightText}</p>

          <div className="flex items-center gap-4">
         

            {/* Back to top */}
            <motion.button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              whileHover={reduceMotion ? undefined : { y: -3 }}
              whileTap={{ scale: 0.92 }}
              className="ml-1 inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-brand-cyan hover:bg-brand-cyan hover:text-brand-navy"
            >
              <ArrowUp className="size-4" />
            </motion.button>
          </div>
        </div>
      </MainContainer>
    </footer>
  );
}