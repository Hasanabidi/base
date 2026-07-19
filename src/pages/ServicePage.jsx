import { useLayoutEffect, useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '@/data/services';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/sections/CTASection';

gsap.registerPlugin(ScrollTrigger);

export default function ServicePage() {
  const { slug } = useParams();
  const root = useRef(null);
  const service = services.find((s) => s.id === slug);
  const otherServices = services.filter((s) => s.id !== slug);

  useLayoutEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="sp-hero"]', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
      gsap.from('[data-anim="sp-section"]', { opacity: 0, y: 30, stagger: 0.15, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sp-content"]', start: 'top 70%' } });
      gsap.from('[data-anim="sp-other"]', { opacity: 0, y: 30, stagger: 0.1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sp-other-services"]', start: 'top 70%' } });
    }, root);
    return () => ctx.revert();
  }, [service]);

  if (!service) return <Navigate to="/services" replace />;

  return (
    <div ref={root} className="pt-32">
      <SEO 
        title={service.title} 
        description={service.description} 
        path={`/services/${service.id}`} 
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32">
        <div className="grid-bg absolute inset-0" />
        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-hero">
            <SectionLabel>{service.tagline}</SectionLabel>
            <h1 className="mt-6 font-heading text-hero uppercase text-black">
              {service.title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
              {service.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/40">
                Get Started
                <ArrowRight size={14} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft transition-all hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5">
                Back to Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section data-anim="sp-content" className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-section" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <SectionLabel>Overview</SectionLabel>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              {service.overview}
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-section" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <SectionLabel>Capabilities</SectionLabel>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {service.capabilities.map((capability) => (
                <div key={capability} className="flex items-start gap-3">
                  <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600" />
                  <span className="text-sm text-text-secondary">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-section" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <SectionLabel>Process</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-4">
              {service.sequence.map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 font-heading text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <span className="font-heading text-base font-bold uppercase text-black">{step}</span>
                  {i < service.sequence.length - 1 && (
                    <div className="hidden h-px w-8 bg-gradient-to-r from-indigo-200 to-transparent sm:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-section" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <SectionLabel>Tech Stack</SectionLabel>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.techStack.map((tech) => (
                <span key={tech} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-700">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sp-section" className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
            <SectionLabel>FAQ</SectionLabel>
            <div className="mt-6 space-y-4">
              {service.faqs.map((faq, i) => (
                <details key={i} className="group border-b border-slate-200 pb-4 last:border-0">
                  <summary className="flex cursor-pointer items-center justify-between font-heading text-sm font-bold uppercase text-black hover:text-indigo-600">
                    {faq.question}
                    <ChevronRight size={18} className="transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-sm text-text-secondary">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section data-anim="sp-other-services" className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Other Services</SectionLabel>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((svc) => (
              <Link 
                key={svc.id}
                to={`/services/${svc.id}`}
                data-anim="sp-other"
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition-all hover:border-indigo-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="font-heading text-xs font-bold uppercase tracking-wider text-indigo-600">{svc.num}</div>
                <h3 className="mt-2 font-heading text-lg font-bold text-black group-hover:text-indigo-600">{svc.title}</h3>
                <p className="mt-2 text-xs font-heading uppercase tracking-wider text-text-secondary">{svc.tagline}</p>
                <p className="mt-3 text-sm text-text-secondary line-clamp-2">{svc.description}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs font-heading font-bold uppercase text-indigo-600 group-hover:translate-x-1 transition-transform">
                  Learn More <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
