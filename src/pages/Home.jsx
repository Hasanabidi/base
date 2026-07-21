import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/sections/Hero';
import ServicesSection from '@/sections/ServicesSection';
import AISection from '@/sections/AISection';
import ProcessSection from '@/sections/ProcessSection';
import StatisticsSection from '@/sections/StatisticsSection';
import PortfolioSection from '@/sections/PortfolioSection';
import TestimonialsSection from '@/sections/TestimonialsSection';
import CTASection from '@/sections/CTASection';
import SEO from '@/components/SEO';
import siteConfig from '@/data/siteConfig';
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/schemaGenerators';

gsap.registerPlugin(ScrollTrigger);

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
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": siteConfig.name,
            "description": siteConfig.description,
            "url": siteConfig.url,
            "telephone": siteConfig.contact.phone,
            "email": siteConfig.contact.email,
            "areaServed": "Worldwide"
          },
          localBusinessJsonLd,
          organizationJsonLd,
          websiteJsonLd
        ]}
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