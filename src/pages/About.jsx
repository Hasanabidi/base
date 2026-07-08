import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import CTASection from '@/sections/CTASection';
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
        opacity: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out',
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
      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="about-header">
            <SectionLabel>About</SectionLabel>
            <h1 className="mt-6 font-heading text-hero text-white">
              We engineer<br />
              <span className="text-text-secondary">leverage.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Fulcrum System is a full-stack digital partner for companies that treat
              technology as a competitive advantage — not a cost center. We exist to
              transform operational complexity into engineered leverage.
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative py-12">
        <div data-anim="stats-grid" className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} data-anim="stat-item" className="text-center">
                <div className="font-heading text-5xl font-medium text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-2 text-sm text-accent">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <SectionLabel>Principles</SectionLabel>
            <h2 className="mt-6 font-heading text-section text-white">
              How we <span className="text-text-secondary">think.</span>
            </h2>
          </div>
          <div data-anim="values" className="grid gap-6 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} data-anim="value-card">
                  <TiltCard maxTilt={2} className="group h-full rounded-2xl glass-panel glass-panel-hover p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <Icon size={20} className="text-accent" />
                    </div>
                    <h3 className="mt-6 font-heading text-xl font-medium text-white">{value.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{value.description}</p>
                  </TiltCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="relative py-32">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="mb-16 max-w-2xl">
            <SectionLabel>Team</SectionLabel>
            <h2 className="mt-6 font-heading text-section text-white">
              Senior engineers.<br />
              <span className="text-text-secondary">No layers.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              You work directly with the people building your system. No project managers
              passing messages. No junior developers learning on your dime.
            </p>
          </div>
          <div data-anim="team-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.id} data-anim="team-card">
                <div className="group h-full rounded-2xl glass-panel glass-panel-hover p-6">
                  {/* Avatar placeholder with initials */}
                  <div className="relative mb-6 h-32 overflow-hidden rounded-xl bg-gradient-to-br from-secondary-panel to-core">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-heading text-4xl font-medium text-accent/30">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-core/80 to-transparent" />
                  </div>
                  <h3 className="font-heading text-lg font-medium text-white">{member.name}</h3>
                  <p className="text-xs text-accent">{member.role}</p>
                  <p className="mt-3 text-xs leading-relaxed text-text-secondary">{member.bio}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {member.specializations.map((s) => (
                      <span key={s} className="rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 font-mono text-[10px] text-text-secondary/60">
                        {s}
                      </span>
                    ))}
                  </div>
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