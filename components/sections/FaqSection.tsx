"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import MainContainer from "@/components/common/MainContainer";
import { faqData } from "@/types/template.type";

export default function FaqSection() {
  const { subtitle, title, image, imageAlt, faqs } = faqData;
  const [activeId, setActiveId] = useState<number | null>(faqs[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-space border-y border-brand-line bg-brand-soft">
      <MainContainer className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-12">
        <div className="relative isolate overflow-hidden rounded-3xl bg-brand-navy px-6 py-8 text-white sm:px-9 sm:py-10 lg:min-h-[25rem]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="-z-20 object-cover object-center"
          />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-br from-brand-navy/95 via-brand-navy/90 to-brand-navy/65" />
          <p className="section-label inline-flex items-center gap-2 text-brand-cyan">
            <MessageCircle size={18} aria-hidden="true" />
            {subtitle}
          </p>
          <h2 id="faq-title" className="section-title mt-4 max-w-[13ch]">
            {title}
          </h2>
          <p className="mt-6  text-base sm:text-[18px] text-blue-100">Still have a question?</p>
          <Link
            href="#contact"
            className="mt-3 inline-flex min-h-11 items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-cyan focus-visible:outline-white"
          >
            Talk to our team
          </Link>
        </div>

        <div className="grid gap-3">
          {faqs.map(({ id, question, answer }) => {
            const isOpen = activeId === id;
            const questionId = `faq-question-${id}`;
            const answerId = `faq-answer-${id}`;

            return (
              <div
                key={id}
                className={`overflow-hidden rounded-2xl border transition-colors ${isOpen
                    ? "border-brand-primary/30 bg-white shadow-sm"
                    : "border-brand-line bg-white/75 hover:border-brand-primary/30 hover:bg-white"
                  }`}
              >
                <h3>
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setActiveId((previous) => (previous === id ? null : id))}
                    className={`flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 px-5 py-3.5 text-left text-[17px] sm:text-[19px] font-semibold tracking-normal focus-visible:outline-offset-[-3px] sm:px-6 ${isOpen ? "text-brand-deep" : "text-foreground"
                      }`}
                  >
                    {question}
                    <span
                      aria-hidden="true"
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-brand-primary text-white" : "bg-brand-soft text-brand-deep"
                        }`}
                    >
                      {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                <div id={answerId} role="region" aria-labelledby={questionId} aria-hidden={!isOpen}>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mx-5 border-t border-brand-line pb-5 pt-4 text-[17px] leading-relaxed text-[#031327] sm:mx-6">
                          {answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}
