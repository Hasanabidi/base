import { useState } from 'react';
import SectionLabel from '@/components/SectionLabel';
import ProjectCard from '@/components/ProjectCard';
import CTASection from '@/sections/CTASection';
import SEO from '@/components/SEO';
import { useGsapContext } from '@/hooks/useGsapContext';
import { revealOnScroll } from '@/lib/animations';
import { projects } from '@/data/projects';

const categories = ['All', ...new Set(projects.map((p) => p.category))];

export default function Work() {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All' ? projects : projects.filter((p) => p.category === filter);

  const root = useGsapContext((el) => {
    revealOnScroll('[data-anim="work-header"]', { trigger: el, start: 'top 75%', y: 30, duration: 0.8 });
    revealOnScroll('[data-anim="project-card"]', { trigger: '[data-anim="work-grid"]', start: 'top 85%', y: 30, stagger: 0.08, duration: 0.6 });
  }, [filter]);

  return (
    <div ref={root} className="pt-32">
      <SEO
        title="Our Work"
        description="Explore our portfolio of web development, mobile app, SaaS platform, POS system, and cybersecurity projects delivered for clients across industries."
        path="/work"
      />

      {/* Hero with gradient background */}
      <section className="gradient-hero-bg relative overflow-hidden py-20 md:py-32">
        <div className="gradient-orb h-96 w-96 bg-indigo-300/30" style={{ top: '-10%', left: '5%' }} />
        <div className="gradient-orb h-80 w-80 bg-violet-300/25" style={{ top: '20%', right: '10%', animationDelay: '3s' }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="work-header">
            <SectionLabel>Portfolio</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              Work that<br />
              <span className="text-gradient-shine">speaks for itself.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              Websites, SaaS platforms, and mobile applications engineered for performance,
              scalability, and measurable business impact. Hover any card to explore the tech stack.
            </p>
          </div>
        </div>
      </section>

      {/* Filter + Gallery */}
      <section className="gradient-section-bg py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.15em] font-heading font-bold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div data-anim="work-grid" className="grid gap-5 md:grid-cols-2">
            {filtered.map((project) => (
              <div key={project.id} data-anim="project-card">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}