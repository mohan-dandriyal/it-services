"use client";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    type Variants,
} from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { footerData, headerData } from "@/types/template.type";
import BrandLogo from "./BrandLogo";
import MainContainer from "./MainContainer";

/* Extract "home" from "#home" or "/#home" */
const getSectionId = (url: string) => {
    const index = url.indexOf("#");
    return index === -1 ? "" : url.slice(index + 1);
};

/* Mobile menu animation (stagger children) */
const menuVariants: Variants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
        opacity: 1,
        height: "auto",
        transition: { duration: 0.28, ease: "easeOut", staggerChildren: 0.05, delayChildren: 0.05 },
    },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeId, setActiveId] = useState<string>("home");
    const reduceMotion = useReducedMotion();

    // Pauses scroll-spy for a moment after a click so the active link doesn't flicker
    const clickLock = useRef<number | undefined>(undefined);
    const menuToggle = useRef<HTMLButtonElement>(null);

    const { navLinks, contactButton, logoAlt, logo } = headerData;
    const { phone } = footerData.contactInfo;
    const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;

    /* Page scroll progress bar */
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 });

    /* Scroll spy + header shadow */
    useEffect(() => {
        const ids = navLinks.map((l) => getSectionId(l.url)).filter(Boolean);
        let frame: number | undefined;

        const update = () => {
            frame = undefined;
            setScrolled(window.scrollY > 12);

            if (clickLock.current !== undefined) return;

            const offset = 74 + 80; // header height + breathing room
            let current = ids[0] ?? "home";

            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= offset) current = id;
            }

            // At the very bottom of the page, highlight the last section
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            if (atBottom && ids.length) current = ids[ids.length - 1];

            setActiveId(current);
        };

        const onScroll = () => {
            if (frame === undefined) {
                frame = requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            if (frame !== undefined) cancelAnimationFrame(frame);
            window.clearTimeout(clickLock.current);
            clickLock.current = undefined;
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [navLinks]);

    /* Close on Escape when the mobile menu is open */
    useEffect(() => {
        if (!mobileOpen) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMobileOpen(false);
                menuToggle.current?.focus();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
        };
    }, [mobileOpen]);

    /* Close mobile menu if the screen grows to desktop */
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = () => mq.matches && setMobileOpen(false);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const handleNavClick = useCallback((url: string) => {
        const id = getSectionId(url);
        if (id) {
            setActiveId(id);
            window.clearTimeout(clickLock.current);
            clickLock.current = window.setTimeout(() => {
                clickLock.current = undefined;
            }, 900);
        }
        setMobileOpen(false);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 border-b backdrop-blur-md transition-all duration-300 ${scrolled
                    ? "border-slate-200 bg-white/95 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.18)]"
                    : "border-slate-200/70 bg-white/90"
                }`}
        >
            <MainContainer>
                <div
                    className={`flex items-center justify-between gap-4 transition-[height] duration-300 ${scrolled ? "h-[64px]" : "h-[74px]"
                        }`}
                >
                    {/* Logo */}
                    <motion.div
                        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="shrink-0"
                    >
                        <BrandLogo logo={logo} logoAlt={logoAlt} linkTo="#home" />
                    </motion.div>

                    {/* Desktop navigation */}
                    <nav
                        aria-label="Primary Navigation"
                        className="hidden items-center gap-0.5 lg:flex"
                    >
                        {navLinks.map((link) => {
                            const isActive = getSectionId(link.url) === activeId;
                            return (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    onClick={() => handleNavClick(link.url)}
                                    aria-current={isActive ? "location" : undefined}
                                    className={`group relative rounded-full px-2.5 py-2 text-[15px] font-medium transition-colors duration-200 xl:px-3.5 ${isActive
                                            ? "text-brand-primary"
                                            : "text-foreground hover:text-brand-primary"
                                        }`}
                                >
                                    {/* Sliding active pill (moves between links) */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-pill"
                                            className="absolute inset-0 -z-10 rounded-full bg-brand-soft"
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}

                                    <span className="relative inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                                        {link.label}
                                    </span>

                                    {/* Hover underline grows from the center */}
                                    {!isActive && (
                                        <span className="absolute inset-x-3.5 bottom-1 h-[2px] origin-center scale-x-0 rounded-full bg-gradient-to-r from-blue-500 to-brand-deep transition-transform duration-300 ease-out group-hover:scale-x-100" />
                                    )}

                                    {/* Active dot */}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-active-dot"
                                            className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-brand-primary"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop actions */}
                    <div className="hidden shrink-0 items-center gap-3 lg:flex">
                        <motion.a
                            href={phoneHref}
                            whileHover={reduceMotion ? undefined : { y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="group hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-4 py-2 text-sm font-semibold text-slate-700 xl:inline-flex transition-colors hover:border-blue-200 hover:bg-brand-soft/70 hover:text-brand-deep"
                        >
                            <motion.span
                                className="inline-flex"
                                variants={{ rest: { rotate: 0 }, hover: { rotate: [0, -18, 18, -12, 12, 0] } }}
                                initial="rest"
                                whileHover={reduceMotion ? undefined : "hover"}
                                transition={{ duration: 0.6 }}
                            >
                                <Phone className="h-3.5 w-3.5 text-brand-primary" />
                            </motion.span>
                            <span>{phone}</span>
                        </motion.a>

                        <motion.a
                            whileHover={reduceMotion ? undefined : { scale: 1.04, y: -1 }}
                            whileTap={{ scale: 0.96 }}
                            href={contactButton.url}
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-primary to-brand-deep px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-primary/25 transition-shadow hover:shadow-lg hover:shadow-brand-primary/40"
                        >
                            {/* Shine sweep on hover */}
                            <span className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-white/25 transition-all duration-700 ease-out group-hover:left-[130%]" />
                            <span className="relative">{contactButton.text}</span>
                        </motion.a>
                    </div>

                    {/* Mobile toggle */}
                    <motion.button
                        ref={menuToggle}
                        type="button"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileOpen((prev) => !prev)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-blue-200 hover:bg-brand-soft hover:text-brand-primary lg:hidden"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={mobileOpen ? "close" : "open"}
                                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.18 }}
                                className="inline-flex"
                            >
                                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </MainContainer>

            {/* Scroll progress bar */}
            <motion.div
                aria-hidden="true"
                style={{ scaleX: progress }}
                className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 via-brand-primary to-brand-cyan"
            />

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        {/* Backdrop: tap outside to close */}
                        <motion.button
                            type="button"
                            aria-label="Close menu"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="absolute inset-x-0 top-full h-dvh bg-slate-900/30 backdrop-blur-[2px] lg:hidden"
                        />

                        <motion.div
                            id="mobile-menu"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute inset-x-0 top-full max-h-[calc(100dvh-75px)] overflow-y-auto border-t border-slate-200 bg-white shadow-xl lg:hidden"
                        >
                            <MainContainer className="py-4">
                                <div className="flex flex-col gap-1.5">
                                    {navLinks.map((link) => {
                                        const isActive = getSectionId(link.url) === activeId;
                                        return (
                                            <motion.div key={link.id} variants={itemVariants}>
                                                <Link
                                                    href={link.url}
                                                    onClick={() => handleNavClick(link.url)}
                                                    aria-current={isActive ? "location" : undefined}
                                                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-[16px] font-medium transition-all duration-200 active:scale-[0.98] ${isActive
                                                            ? "bg-brand-soft text-brand-primary"
                                                            : "text-slate-700 hover:bg-slate-50 hover:pl-5 hover:text-brand-primary"
                                                        }`}
                                                >
                                                    <span className="flex items-center gap-3">
                                                        <span
                                                            className={`h-5 w-1 rounded-full transition-colors ${isActive ? "bg-brand-primary" : "bg-transparent"
                                                                }`}
                                                        />
                                                        {link.label}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}

                                    <motion.div
                                        variants={itemVariants}
                                        className="mt-3 grid gap-2.5 border-t border-slate-100 pt-4 sm:grid-cols-2"
                                    >
                                        <a
                                            href={phoneHref}
                                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition active:scale-[0.97] hover:border-blue-200 hover:bg-brand-soft"
                                        >
                                            <Phone className="h-4 w-4 text-brand-primary" />
                                            <span>{phone}</span>
                                        </a>
                                        <a
                                            href={contactButton.url}
                                            onClick={() => setMobileOpen(false)}
                                            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-primary to-brand-deep px-5 py-3 text-sm font-semibold text-white shadow-md shadow-brand-primary/25 transition active:scale-[0.97]"
                                        >
                                            <span>{contactButton.text}</span>
                                        </a>
                                    </motion.div>
                                </div>
                            </MainContainer>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
