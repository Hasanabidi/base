import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '@/components/TiltCard';

export default function ProjectCard({ project }) {
  return (
    <Link to="/contact" className="block h-full">
      <TiltCard maxTilt={2} className="gradient-card group h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.heroImage}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          {/* Category badge */}
          <div className="absolute left-4 top-4">
            <span className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          {/* Hover reveal: tech stack */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full p-4 transition-transform duration-500 group-hover:translate-y-0">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-md border border-white/20 bg-white/10 px-2 py-1 font-mono text-xs text-white backdrop-blur-sm">
                  {t}
                </span>
              ))}
            </div>
          </div>
          {/* Hover: view icon */}
          <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 opacity-0 shadow-lg transition-all duration-500 group-hover:opacity-100">
            <ArrowUpRight size={16} className="text-white" />
          </div>
        </div>
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-heading text-xl font-extrabold uppercase text-black">{project.title}</h3>
            <span className="font-mono text-xs text-text-secondary">{project.year}</span>
          </div>
          <p className="mt-2 text-sm text-text-secondary">{project.impact}</p>
          {/* Metrics */}
          {project.metrics && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {project.metrics.slice(0, 3).map((m) => (
                <div key={m.label} className="rounded-lg border border-slate-100 bg-slate-50/50 p-2 text-center">
                  <div className="font-heading text-sm font-bold text-slate-900">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </TiltCard>
    </Link>
  );
}