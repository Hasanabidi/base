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

const categories = ['All', 'AI Automation', 'Web Development', 'Digital Design'];

export default function Work() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="work-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="work-card"]', {
        opacity: 0, y: 60, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="work-grid"]', start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-32">
      {/* Header */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="work-header">
            <SectionLabel>Selected Work</SectionLabel>
            <h1 className="mt-6 font-heading text-hero text-white">
              Engineering that<br />
              <span className="text-text-secondary">compounds.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Six engagements. Six different challenges. One consistent outcome —
              systems engineered to create measurable, compounding leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Full grid */}
      <section className="relative py-20">
        <div data-anim="work-grid" className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} data-anim="work-card">
                <Link to="/contact">
                  <TiltCard maxTilt={3} className="group h-full overflow-hidden rounded-2xl glass-panel glass-panel-hover">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.heroImage}
                        alt={project.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-core via-core/20 to-transparent" />
                      <div className="absolute left-4 top-4">
                        <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-accent backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background/40 backdrop-blur-md">
                          <ArrowUpRight size={20} className="text-accent" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-heading text-xl font-medium text-white">{project.title}</h3>
                        <span className="font-mono text-xs text-text-secondary/50">{project.year}</span>
                      </div>
                      <p className="mt-2 text-sm text-text-secondary">{project.impact}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-1 font-mono text-xs text-text-secondary/70">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="rounded-md px-2 py-1 font-mono text-xs text-text-secondary/50">
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