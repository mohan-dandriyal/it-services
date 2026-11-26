import templateData from "@/data/template.json";

const data = templateData.categories.WedBliss.sections;

export const globalUI = templateData.common.globalUI;
export const footerData = templateData.common.Footer;
export const headerData = data.Header.variants.WedBlissHeader2;
export const heroData = data.Hero.variants.WedBlissHero2;
export const aboutData = data.AboutUs.variants.WedBlissAboutUs2;
export const servicesData = data.Services.variants.WedBlissServices2;
export const whatWeDoData = data.WhatWeDo.variants.WedBlissWhatWeDo2;
export const testimonialsData = data.Testimonials.variants.WedBlissTestimonials2;
export const faqData = data.Faq.variants.WedBlissFaq2;
export const contactData = data.Contact.variants.WedBlissContact2;
export const templateComponents = templateData.categories.WedBliss.templateComponents;

export type headerType = typeof headerData;
export type footerType = typeof footerData;
export type heroType = typeof heroData;
export type aboutUsType = typeof aboutData;
export type servicesType = typeof servicesData;
export type whatWeDoType = typeof whatWeDoData;

export type testimonialsType = typeof testimonialsData;
export type faqType = typeof faqData;
export type contactType = typeof contactData;
