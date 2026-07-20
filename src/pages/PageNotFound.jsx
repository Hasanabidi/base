// src/lib/PageNotFound.jsx
import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Search, ArrowUpRight } from 'lucide-react';
import MagneticButton from '@/components/MagneticButton';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

export default function PageNotFound() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="404-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="404-number"]', {
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="404-sub"]', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="404-cta"]', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.4,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="404-shape"]', {
        opacity: 0,
        scale: 0.8,
        stagger: 0.08,
        duration: 0.7,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-32 min-h-screen">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Fulcrum System's homepage to explore our work."
        path="/404"
      />

      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="grid-bg absolute inset-0" />
        
        {/* Floating gradient orbs */}
        <div className="gradient-orb h-96 w-96 bg-indigo-300/20" style={{ top: '-10%', right: '5%' }} />
        <div className="gradient-orb h-80 w-80 bg-violet-300/15" style={{ bottom: '-10%', left: '5%', animationDelay: '3s' }} />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="text-center">
            {/* Floating shapes - decorative */}
            <div data-anim="404-shape" className="absolute left-[5%] top-[20%] hidden lg:block">
              <div className="h-16 w-16 rounded-2xl border-2 border-indigo-200/40 rotate-12" />
            </div>
            <div data-anim="404-shape" className="absolute right-[8%] top-[15%] hidden lg:block">
              <div className="h-10 w-10 rounded-full border-2 border-violet-200/40" />
            </div>
            <div data-anim="404-shape" className="absolute left-[12%] bottom-[25%] hidden lg:block">
              <div className="h-8 w-8 rounded-lg border-2 border-indigo-200/30 -rotate-6" />
            </div>
            <div data-anim="404-shape" className="absolute right-[10%] bottom-[20%] hidden lg:block">
              <div className="h-14 w-14 rotate-12 border-2 border-violet-200/30" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            </div>

            {/* Section Label */}
            <div data-anim="404-header" className="flex justify-center">
              <SectionLabel>404 Error</SectionLabel>
            </div>

            {/* 404 Number */}
            <div data-anim="404-number" className="relative mt-8 inline-block">
              <h1 className="font-heading text-[10rem] md:text-[14rem] lg:text-[18rem] font-extrabold leading-none tracking-tight text-black select-none">
                404
              </h1>
              {/* Decorative line */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />
            </div>

            {/* Message */}
            <div data-anim="404-sub" className="mt-6 space-y-4">
              <h2 className="font-heading text-3xl md:text-4xl uppercase text-black">
                Page not <span className="text-gradient">found</span>
              </h2>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-text-secondary">
                The page you're looking for doesn't exist or has been moved.
                Let's get you back on track.
              </p>
            </div>

            {/* CTA Buttons */}
            <div data-anim="404-cta" className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton to="/" variant="primary">
                <Home size={14} />
                Return Home
              </MagneticButton>
              <MagneticButton to="/contact" variant="secondary">
                <Search size={14} />
                Need Help?
              </MagneticButton>
            </div>

            {/* Quick navigation links */}
            <div data-anim="404-cta" className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <Link to="/services" className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-accent">
                Services
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: 'translate(-4px, 4px)' }} />
              </Link>
              <span className="text-slate-300">·</span>
              <Link to="/work" className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-accent">
                Our Work
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: 'translate(-4px, 4px)' }} />
              </Link>
              <span className="text-slate-300">·</span>
              <Link to="/about" className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-accent">
                About Us
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: 'translate(-4px, 4px)' }} />
              </Link>
              <span className="text-slate-300">·</span>
              <Link to="/blog" className="group inline-flex items-center gap-1 text-text-secondary transition-colors hover:text-accent">
                Insights
                <ArrowUpRight size={12} className="opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: 'translate(-4px, 4px)' }} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}