import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import { useParallax } from '@/hooks/useParallax';
import { projects } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function PortfolioSection({ limit }) {
  const root = useRef(null);
  const featured = limit ? projects.slice(0, limit) : projects;
  const imgRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="portfolio-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
      gsap.from('[data-anim="portfolio-card"]', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 65%' },
      });
      // Parallax on project images
      imgRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(img, { y: -30 }, {
          y: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: img.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 border-t border-black bg-white">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div
          data-anim="portfolio-header"
          className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-6 font-heading text-section uppercase text-black">
              Engineering that{' '}
              <span className="text-accent">compounds.</span>
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 border border-black px-5 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black transition-colors hover:bg-accent hover:text-white"
          >
            View all projects
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-0 md:grid-cols-2 border-t border-l border-black">
          {featured.map((project) => (
            <div key={project.id} data-anim="portfolio-card" className="border-b border-r border-black">
              <TiltCard className="group h-full bg-white" maxTilt={2}>
                {/* Image */}
                <div className="img-zoom relative aspect-[16/10] overflow-hidden border-b border-black">
                  <img
                    ref={(el) => (imgRefs.current[project.id] = el)}
                    src={project.heroImage}
                    alt={project.title}
                    loading="lazy"
                    className="h-[120%] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute left-4 top-4">
                    <span className="border border-black bg-white px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black">
                      {project.category}
                    </span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="flex h-12 w-12 items-center justify-center border border-black bg-accent">
                      <ArrowUpRight size={18} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-xl font-extrabold uppercase text-black">
                      {project.title}
                    </h3>
                    <span className="font-mono text-xs text-text-secondary">
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
                        className="border border-black px-2 py-1 font-mono text-xs text-black"
                      >
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}