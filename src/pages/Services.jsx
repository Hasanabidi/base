import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import CTASection from '@/sections/CTASection';
import ProcessSection from '@/sections/ProcessSection';
import { services } from '@/data/services';
import { Cpu, Code2, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { cpu: Cpu, code: Code2, palette: Palette };

export default function Services() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="srv-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="srv-card"]', {
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '[data-anim="srv-grid"]', start: 'top 70%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pt-32">
      {/* Page Hero */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="srv-header">
            <SectionLabel>Services</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              Three pillars.<br />
              <span className="text-accent">One system.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              We don't sell services — we engineer systems. Each pillar is designed to
              compound the value of the others. AI without solid engineering is a demo.
              Engineering without design is invisible. Design without intelligence is static.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="relative py-20">
        <div data-anim="srv-grid" className="mx-auto max-w-[1400px] space-y-4 px-6 lg:px-10">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Cpu;
            const reversed = i % 2 === 1;
            return (
              <div key={service.id} data-anim="srv-card">
                <TiltCard maxTilt={1} className="group grid gap-8 border border-black bg-white p-8 md:grid-cols-2 md:p-12">
                  <div className={reversed ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center border border-black bg-accent">
                        <Icon size={20} className="text-white" />
                      </div>
                      <div>
                        <span className="font-mono text-xs text-text-secondary">{String(i + 1).padStart(2, '0')}</span>
                        <h2 className="font-heading text-3xl font-extrabold uppercase text-black">{service.title}</h2>
                      </div>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.15em] text-accent">{service.tagline}</p>
                    <p className="mt-6 text-sm leading-relaxed text-text-secondary">{service.description}</p>

                    <div className="mt-8 flex items-center gap-3">
                      {service.sequence.map((step, j) => (
                        <div key={step} className="flex items-center gap-3">
                          <span className="border border-black bg-white px-3 py-1 text-xs text-black">
                            {step}
                          </span>
                          {j < service.sequence.length - 1 && (
                            <ArrowRight size={12} className="text-accent" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={reversed ? 'md:order-1' : ''}>
                    <h4 className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-text-secondary">Capabilities</h4>
                    <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-text-secondary">
                          <Plus size={14} className="mt-1 flex-shrink-0 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </section>

      <ProcessSection />
      <CTASection />
    </div>
  );
}