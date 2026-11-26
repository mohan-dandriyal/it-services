import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import HeroSection from "@/components/sections/HeroSection";

import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import FaqSection from "@/components/sections/FaqSection";


export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a href="#main-content" className="sr-only z-[60] rounded-lg bg-brand-primary px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        Skip to content
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 scroll-mt-20">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
