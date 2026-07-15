import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, Smartphone, Cloud, CreditCard, Calculator, Shield, ArrowUpRight, Plus } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import { useParallax } from '@/hooks/useParallax';
import { services } from '@/data/services';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { code: Code2, mobile: Smartphone, cloud: Cloud, pos: CreditCard, finance: Calculator, security: Shield };

export default function ServicesSection({ detailed = false }) {
  const root = useRef(null);
  const headerRef = useParallax(0.08);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="service-card"]', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 70%' },
      });
      gsap.from('[data-anim="service-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32">
      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="service-header" ref={headerRef} className="mb-16 max-w-2xl">
          <SectionLabel>Services</SectionLabel>
          <h2 className="mt-6 font-heading text-section uppercase text-black">
            Six disciplines.{' '}
            <span className="text-gradient">One partner.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-secondary">
            From Shopify stores and mobile apps to SaaS platforms, POS systems, financial services,
            and cybersecurity — we cover the full spectrum of your digital and business needs.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const isFirst = i === 0;
            return (
              <div key={service.id} data-anim="service-card">
                <TiltCard
                  className={`group relative h-full overflow-hidden rounded-2xl border border-slate-200 p-8 shadow-soft transition-colors duration-300 ${isFirst ? 'bg-gradient-to-br from-indigo-500 to-violet-600' : 'hover-fill bg-white'}`}
                  maxTilt={2}
                >
                  {!isFirst && <div className="hover-fill__layer" />}

                  <div className="relative z-10">
                    <div className="relative mb-8 h-12 w-12">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 transition-colors duration-300 group-hover:border-white">
                        <Icon
                          size={20}
                          className={`${isFirst ? 'text-white' : 'text-accent'} transition-colors duration-300 group-hover:text-white`}
                        />
                      </div>
                    </div>

                    <span className={`font-mono text-xs transition-colors duration-300 ${isFirst ? 'text-white/60' : 'text-text-secondary/50 group-hover:text-white/60'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 font-heading text-2xl font-extrabold uppercase text-black transition-colors duration-300 group-hover:text-white">
                      {service.title}
                    </h3>
                    <p className={`mt-1 text-xs uppercase tracking-[0.15em] transition-colors duration-300 ${isFirst ? 'text-white' : 'text-accent group-hover:text-white'}`}>
                      {service.tagline}
                    </p>

                    <p className="mt-6 text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-white/80">
                      {service.description}
                    </p>

                    {detailed && (
                      <ul className="mt-6 space-y-2">
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2 text-sm text-text-secondary transition-colors duration-300 group-hover:text-white/80"
                          >
                            <Plus size={14} className="mt-1 flex-shrink-0 text-accent transition-colors duration-300 group-hover:text-white" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    <Link
                      to="/contact"
                      className="mt-8 inline-flex items-center gap-1 text-xs uppercase tracking-[0.15em] font-heading font-bold text-black transition-colors duration-300 group-hover:text-white"
                    >
                      Learn more
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}