"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Info, Mail, MapPin, MessageSquare, Phone, Send, User } from "lucide-react";
import Image from "next/image";
import { useState, type FormEvent } from "react";
import MainContainer from "@/components/common/MainContainer";
import { contactData } from "@/types/template.type";

const { title, description, backgroundImage, contactInfo, form } = contactData;

const contactMethods = [
  { label: contactInfo.emailTitle, value: contactInfo.email, href: `mailto:${contactInfo.email}`, Icon: Mail },
  { label: contactInfo.phoneTitle, value: contactInfo.phone, href: `tel:${contactInfo.phone.replace(/\s+/g, "")}`, Icon: Phone },
  { label: contactInfo.addressTitle, value: contactInfo.address, href: null, Icon: MapPin },
];

/* Shared input style: icon sits inside on the left, soft ring on focus */
const fieldClass =
  "peer w-full rounded-xl border border-brand-line bg-brand-soft/50 py-3 pl-11 pr-4 text-base text-foreground placeholder:text-slate-400 transition-all duration-200 hover:border-brand-primary/40 focus:border-brand-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-brand-primary/15";

const iconClass =
  "pointer-events-none absolute left-4 size-[18px] text-slate-400 transition-colors duration-200 peer-focus:text-brand-primary";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.09, ease: "easeOut" },
  }),
};

export default function ContactSection() {
  const [status, setStatus] = useState("");
  const reduceMotion = useReducedMotion();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fields = new FormData(event.currentTarget);
    const name = String(fields.get("name") ?? "").trim();
    const email = String(fields.get("email") ?? "").trim();
    const message = String(fields.get("message") ?? "").trim();

    if (!name || !message) {
      setStatus("Enter your name and a message to open an email draft.");
      return;
    }

    const subject = encodeURIComponent(`TechNova inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\r\n\r\nFrom: ${name}\r\nEmail: ${email}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setStatus("If your email app opens, review and send the draft there. You can also contact us using the email link.");
  }

  /* Card content shared by the link and non-link versions */
  const cardBody = (label: string, value: string, Icon: (typeof contactMethods)[number]["Icon"], isLink: boolean) => (
    <>
      <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-brand-cyan ring-1 ring-white/15 transition-all duration-300 group-hover:rotate-6 group-hover:bg-brand-cyan group-hover:text-brand-navy group-hover:ring-transparent">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-brand-cyan">{label}</span>
        <span className="mt-0.5 block break-words text-base font-semibold text-white sm:text-lg">{value}</span>
      </span>
      {isLink && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-cyan"
        />
      )}
    </>
  );

  const cardClass =
    "group flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-md transition-all duration-300 hover:border-brand-cyan/50 hover:bg-white/15 hover:shadow-xl hover:shadow-black/20";

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section-space relative isolate grid min-h-svh scroll-mt-20 items-center overflow-hidden bg-brand-navy"
    >
      {/* Background */}
      <Image src={backgroundImage} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-brand-navy/90 via-brand-navy/80 to-brand-navy/50" />

      {/* Soft glowing blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-10 -z-10 size-72 rounded-full bg-brand-primary/30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-0 -z-10 size-80 rounded-full bg-brand-cyan/20 blur-3xl" />
      {/* Dotted pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-8 -z-10 hidden size-40 opacity-30 [background-image:radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:14px_14px] lg:block"
      />

      <MainContainer>
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,2.5fr)]">
          {/* ---------- Left: info ---------- */}
          <div className="text-white">
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-cyan backdrop-blur"
            >
              Contact
            </motion.span>

            <motion.h2
              id="contact-title"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="section-title mt-4"
            >
              {title}
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="section-copy mt-4 max-w-md text-blue-100"
            >
              {description}
            </motion.p>

            <address className="mt-8 not-italic">
              <ul className="flex flex-col gap-4">
                {contactMethods.map(({ label, value, href, Icon }, i) => (
                  <motion.li
                    key={label}
                    variants={fadeUp}
                    custom={3 + i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    whileHover={reduceMotion ? undefined : { x: 6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  >
                    {href ? (
                      <a href={href} className={`${cardClass} focus-visible:outline-white`}>
                        {cardBody(label, value, Icon, true)}
                      </a>
                    ) : (
                      <div className={cardClass}>{cardBody(label, value, Icon, false)}</div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </address>
          </div>

          {/* ---------- Right: form ---------- */}
          <motion.form
            aria-labelledby="contact-form-title"
            method="post"
            onSubmit={handleSubmit}
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative grid content-start gap-5 overflow-hidden rounded-3xl bg-white px-6 py-9 shadow-2xl shadow-black/30 sm:p-10 lg:p-12"
          >
            {/* Gradient accent bar */}
            <span aria-hidden="true" className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-brand-primary via-brand-cyan to-brand-primary" />

            <div>
              <h3 id="contact-form-title" className="text-2xl font-bold text-foreground sm:text-3xl">
                Send us a message
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-copy">Fill in your details to open a draft in your email app.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-semibold text-foreground">
                {form.namePlaceholder}
                <span className="relative flex items-center">
                  <input name="name" autoComplete="name" required maxLength={100} className={fieldClass} />
                  <User aria-hidden="true" className={iconClass} />
                </span>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-foreground">
                {form.emailPlaceholder}
                <span className="relative flex items-center">
                  <input type="email" name="email" autoComplete="email" required maxLength={254} className={fieldClass} />
                  <Mail aria-hidden="true" className={iconClass} />
                </span>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-semibold text-foreground">
              {form.messagePlaceholder}
              <span className="relative flex">
                <textarea
                  name="message"
                  rows={5}
                  required
                  className={`${fieldClass} resize-y`}
                />
                <MessageSquare aria-hidden="true" className={`${iconClass} top-3.5`} />
              </span>
            </label>

            <motion.button
              type="submit"
              whileHover={reduceMotion ? undefined : { scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-brand-primary to-brand-deep px-7 py-3 text-base font-semibold text-white shadow-lg shadow-brand-primary/30 transition-shadow hover:shadow-xl hover:shadow-brand-primary/40 sm:justify-self-start"
            >
              {/* Shine sweep */}
              <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 ease-out group-hover:left-[130%]" />
              <span className="relative">{form.buttonText}</span>
              <Send aria-hidden="true" className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1" />
            </motion.button>

            <p
              role="status"
              className={
                status
                  ? "flex items-start gap-2.5 rounded-xl border border-brand-primary/20 bg-brand-soft px-4 py-3 text-sm text-brand-copy"
                  : "sr-only"
              }
            >
              {status && <Info aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-primary" />}
              {status}
            </p>
          </motion.form>
        </div>
      </MainContainer>
    </section>
  );
}
