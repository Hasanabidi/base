import { lazy, Suspense, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '@/sections/Hero';
import SEO from '@/components/SEO';
import { organizationJsonLd } from '@/config/siteConfig';

const ServicesSection = lazy(() => import('@/sections/ServicesSection'));
const AISection = lazy(() => import('@/sections/AISection'));
const ProcessSection = lazy(() => import('@/sections/ProcessSection'));
const StatisticsSection = lazy(() => import('@/sections/StatisticsSection'));
const PortfolioSection = lazy(() => import('@/sections/PortfolioSection'));
const TestimonialsSection = lazy(() => import('@/sections/TestimonialsSection'));
const CTASection = lazy(() => import('@/sections/CTASection'));

gsap.registerPlugin(ScrollTrigger);

function SectionFallback() {
  return <div className="min-h-[12rem]" aria-hidden="true" />;
}

export default function Home() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div ref={root}>
      <SEO path="/" jsonLd={organizationJsonLd} />
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <ServicesSection />
        <AISection />
        <ProcessSection />
        <StatisticsSection />
        <PortfolioSection limit={4} />
        <TestimonialsSection />
        <CTASection />
      </Suspense>
    </div>
  );
}
