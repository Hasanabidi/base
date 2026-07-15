import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Plus, Code2, Smartphone, Cloud, CreditCard, Calculator, Shield } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';
import TiltCard from '@/components/TiltCard';
import CTASection from '@/sections/CTASection';
import ProcessSection from '@/sections/ProcessSection';
import { services } from '@/data/services';
import SEO from '@/components/SEO';
import { servicesPageJsonLd } from '@/data/seoData';

gsap.registerPlugin(ScrollTrigger);

const iconMap = { code: Code2, mobile: Smartphone, cloud: Cloud, pos: CreditCard, finance: Calculator, security: Shield };

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
      <SEO
        title="Services"
        description="Web development (Shopify, Wix, Framer, GoHighLevel, Next.js, React), mobile apps, Android games, SaaS platforms, POS software, financial services, tax filing, and cybersecurity."
        path="/services"
        jsonLd={servicesPageJsonLd}
      />
      {/* Page Hero */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="srv-header">
            <SectionLabel>Services</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              Six disciplines.<br />
              <span className="text-gradient">One partner.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary">
              From web development and mobile apps to SaaS platforms, POS software, financial
              services, and cybersecurity — we deliver end-to-end solutions for businesses that
              need more than just a website.
            </p>
          </div>
        </div>
      </section>

      {/* Detailed Services */}
      <section className="relative py-20">
        <div data-anim="srv-grid" className="mx-auto max-w-[1400px] space-y-4 px-6 lg:px-10">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Code2;
            const reversed = i % 2 === 1;
            return (
              <div key={service.id} data-anim="srv-card">
                <TiltCard maxTilt={1} className="group grid gap-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-soft md:grid-cols-2 md:p-12">
                  <div className={reversed ? 'md:order-2' : ''}>
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
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
                          <span className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-900">
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