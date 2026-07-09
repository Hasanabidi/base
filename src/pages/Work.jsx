import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import CTASection from '@/sections/CTASection';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function Work() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="work-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="work-card"]', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="work-grid"]', start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-32">
      {/* Header */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="work-header">
            <SectionLabel>Selected Work</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              Engineering that<br />
              <span className="text-accent">compounds.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              Six engagements. Six different challenges. One consistent outcome —
              systems engineered to create measurable, compounding leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Full grid */}
      <section className="relative py-20">
        <div data-anim="work-grid" className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-0 md:grid-cols-2 border-t border-l border-black">
            {projects.map((project) => (
              <div key={project.id} data-anim="work-card" className="border-b border-r border-black">
                <Link to="/contact">
                  <TiltCard maxTilt={2} className="group h-full bg-white">
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-black">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="border border-black bg-white px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center border border-black bg-accent">
                          <ArrowUpRight size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-heading text-xl font-extrabold uppercase text-black">{project.title}</h3>
                        <span className="font-mono text-xs text-text-secondary">{project.year}</span>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{project.impact}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="border border-black px-2 py-1 font-mono text-xs text-black">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="px-2 py-1 font-mono text-xs text-text-secondary">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}