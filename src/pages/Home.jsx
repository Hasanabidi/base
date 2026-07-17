import { useLayoutEffect, useRef } from 'react';
import { ScrollTrigger } from '@/lib/gsap';
import Hero from '@/sections/Hero';
import ServicesSection from '@/sections/ServicesSection';
import AISection from '@/sections/AISection';
import ProcessSection from '@/sections/ProcessSection';
import StatisticsSection from '@/sections/StatisticsSection';
import PortfolioSection from '@/sections/PortfolioSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTASection from '@/sections/CTASection';
import SEO from '@/components/SEO';

export default function Home() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={root}>
      <SEO
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "name": "Fulcrum System",
          "description": "Web development, mobile apps, SaaS platforms, POS software, financial services, and cybersecurity solutions.",
          "url": "https://fulcrumsystem.com",
          "telephone": "+1-555-555-0100",
          "email": "hello@fulcrumsystem.com",
          "areaServed": "Worldwide"
        }}
      />
      <Hero />
      <ServicesSection />
      <AISection />
      <ProcessSection />
      <StatisticsSection />
      <PortfolioSection limit={4} />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}