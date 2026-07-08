import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection({ limit }) {
  const root = useRef(null);
  const featured = limit ? projects.slice(0, limit) : projects;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="portfolio-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });

      gsap.from('[data-anim="portfolio-card"]', {
        opacity: 0,
        y: 60,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-40">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div
          data-anim="portfolio-header"
          className="mb-20 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-6 font-heading text-section text-white">
              Engineering that{' '}
              <span className="text-text-secondary">compounds.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 text-sm text-accent transition-colors hover:text-accent-glow"
          >
            View all projects
            <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((project) => (
            <div key={project.id} data-anim="portfolio-card">
              <TiltCard className="group h-full overflow-hidden rounded-2xl glass-panel glass-panel-hover" maxTilt={3}>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-core via-core/20 to-transparent" />

                  {/* Category badge */}
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/10 bg-background/60 px-3 py-1 text-xs text-accent backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-background/40 backdrop-blur-md">
                      <ArrowUpRight size={20} className="text-accent" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-xl font-medium text-white">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-text-secondary/50">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-text-secondary">
                    {project.impact}
                  </p>

                  {/* Tech stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-1 font-mono text-xs text-text-secondary/70"
                      >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}