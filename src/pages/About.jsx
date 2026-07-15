import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import CTASection from '@/sections/CTASection';
import SEO from '@/components/SEO';
import { team } from '@/data/team';
import { stats } from '@/data/stats';
import { Target, Layers, Zap, GitBranch } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: Target, title: 'Precision Over Volume', description: 'We take fewer projects and go deeper. Every engagement gets senior engineering attention from blueprint to growth.' },
  { icon: Layers, title: 'Systems, Not Features', description: 'We don\'t ship isolated features — we architect systems where every piece compounds the value of every other.' },
  { icon: Zap, title: 'Velocity with Rigor', description: 'Speed without quality is chaos. We move fast because our architecture and testing make it safe to do so.' },
  { icon: GitBranch, title: 'Engineering as Leverage', description: 'Every line of code is an investment. We write code that future engineers will thank us for — including ourselves.' },
];

export default function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="about-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="value-card"]', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="values"]', start: 'top 70%' },
      });
      gsap.from('[data-anim="team-card"]', {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="team-grid"]', start: 'top 70%' },
      });
      gsap.from('[data-anim="stat-item"]', {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="stats-grid"]', start: 'top 75%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-32">
      <SEO
        title="About Us"
        description="Fulcrum System is a full-service digital agency specializing in web development, mobile apps, SaaS platforms, POS software, financial services, and cybersecurity."
        path="/about"
      />
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="about-header">
            <SectionLabel>About</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              We engineer<br />
              <span className="text-gradient">leverage.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              Fulcrum System is a full-stack digital partner for companies that treat
              technology as a competitive advantage — not a cost center. We exist to
              transform operational complexity into engineered leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative py-8">
        <div data-anim="stats-grid" className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} data-anim="stat-item" className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
                <div className="font-heading text-5xl font-extrabold text-black">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-accent">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-32 border-t border-slate-200">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <SectionLabel>Principles</SectionLabel>
            <h2 className="mt-6 font-heading text-section uppercase text-black">
              How we <span className="text-gradient">think.</span>
            </h2>
          </div>
          <div data-anim="values" className="grid gap-5 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} data-anim="value-card">
                  <TiltCard maxTilt={1} className="group h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-soft transition-colors hover:bg-slate-50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                      <Icon size={18} className="text-white" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-extrabold uppercase text-black">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{value.description}</p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-32 border-t border-slate-200 bg-white">
        <div className="grid-bg absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <SectionLabel>Team</SectionLabel>
            <h2 className="mt-6 font-heading text-section uppercase text-black">
              Senior engineers.<br />
              <span className="text-gradient">No layers.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              You work directly with the people building your system. No project managers
              passing messages. No junior developers learning on your dime.
            </p>
          </div>
          <div data-anim="team-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.id} data-anim="team-card" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-colors hover:bg-slate-50">
                <div className="relative mb-6 h-32 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <div className="grid-bg absolute inset-0 opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-heading text-4xl font-extrabold text-accent">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                </div>
                <h3 className="font-heading text-lg font-extrabold uppercase text-black">{member.name}</h3>
                <p className="text-xs uppercase tracking-[0.1em] text-accent">{member.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">{member.bio}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {member.specializations.map((s) => (
                    <span key={s} className="rounded-md border border-slate-200 px-2 py-0.5 font-mono text-[10px] text-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}