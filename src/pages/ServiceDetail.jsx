import { useLayoutEffect, useRef } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, ArrowLeft, Check,
  Code2, Smartphone, Cloud, CreditCard, Calculator, Shield,
  ShoppingBag, Layers, PenTool, Rocket, Globe,
  Gamepad2, Store, Search, Bell, Download,
  Building2, LayoutDashboard, Database, Lock,
  Package, Receipt, Users, BarChart3, HardDrive, MapPin,
  FileText, BookOpen, ShieldCheck, TrendingUp, Scale,
  Bug, ScanLine, Network, Eye, AlertTriangle,
  Bot, MessagesSquare, LineChart, Workflow, Brain, FileSearch, Plug, Zap,
  MessageSquare, Mic, Phone, Headset, Share2, GraduationCap,
  Sparkles, HelpCircle, Gauge, MousePointerClick,
} from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';
import { services } from '@/data/services';
import { serviceDetails } from '@/data/serviceDetails';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/SectionLabel';
import CTASection from '@/sections/CTASection';

gsap.registerPlugin(ScrollTrigger);

const serviceIconMap = { code: Code2, mobile: Smartphone, cloud: Cloud, pos: CreditCard, finance: Calculator, security: Shield, ai: Bot, chat: MessagesSquare, seo: LineChart };

const capIconMap = {
  'shopping-bag': ShoppingBag, 'layers': Layers, 'pen-tool': PenTool, 'rocket': Rocket, 'code': Code2, 'globe': Globe,
  'smartphone': Smartphone, 'gamepad2': Gamepad2, 'store': Store, 'search': Search, 'bell': Bell, 'download': Download,
  'building2': Building2, 'credit-card': CreditCard, 'layout-dashboard': LayoutDashboard, 'database': Database, 'lock': Lock, 'cloud': Cloud,
  'package': Package, 'receipt': Receipt, 'users': Users, 'bar-chart3': BarChart3, 'hard-drive': HardDrive, 'map-pin': MapPin,
  'file-text': FileText, 'calculator': Calculator, 'book-open': BookOpen, 'shield-check': ShieldCheck, 'trending-up': TrendingUp, 'scale': Scale,
  'bug': Bug, 'scan-line': ScanLine, 'network': Network, 'eye': Eye, 'alert-triangle': AlertTriangle,
  'workflow': Workflow, 'bot': Bot, 'brain': Brain, 'file-search': FileSearch, 'plug': Plug, 'zap': Zap,
  'message-square': MessageSquare, 'mic': Mic, 'phone': Phone, 'headset': Headset, 'share2': Share2, 'graduation-cap': GraduationCap,
  'sparkles': Sparkles, 'help-circle': HelpCircle, 'gauge': Gauge, 'mouse-pointer-click': MousePointerClick, 'line-chart': LineChart,
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const root = useRef(null);
  const service = services.find((s) => s.id === slug);

  useLayoutEffect(() => {
    if (!service) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="sd-hero"]', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
      gsap.from('[data-anim="sd-cap"]', { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sd-cap-grid"]', start: 'top 75%' } });
      gsap.from('[data-anim="sd-feat"]', { opacity: 0, x: -20, stagger: 0.06, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sd-feat-list"]', start: 'top 80%' } });
      gsap.from('[data-anim="sd-tech"]', { y: 12, stagger: 0.03, duration: 0.4, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sd-tech-grid"]', start: 'top 92%' } });
      gsap.from('[data-anim="sd-other"]', { opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: '[data-anim="sd-other-grid"]', start: 'top 85%' } });
    }, root);
    return () => ctx.revert();
  }, [slug]);

  if (!service) return <Navigate to="/services" replace />;
  const detail = serviceDetails[slug] || { overview: [service.description], capabilities: [], faq: [], techStack: [] };
  const MainIcon = serviceIconMap[service.icon] || Code2;

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'Service', name: service.title, description: service.description, provider: { '@type': 'Organization', name: 'Fulcrum System' }, areaServed: 'Worldwide' },
    ...(detail.faq.length ? [{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: detail.faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }] : []),
  ];

  return (
    <div ref={root} className="pt-32">
      <SEO title={service.title} description={service.description} path={`/services/${service.id}`} jsonLd={jsonLd} />

      {/* Hero */}
      <section className="gradient-hero-bg relative overflow-hidden py-16 md:py-24">
        <div className="gradient-orb h-96 w-96 bg-indigo-300/30" style={{ top: '-10%', left: '5%' }} />
        <div className="gradient-orb h-80 w-80 bg-violet-300/25" style={{ top: '20%', right: '10%', animationDelay: '3s' }} />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-10">
          <div data-anim="sd-hero">
            <Link to="/services" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-heading font-bold text-text-secondary transition-colors hover:text-accent">
              <ArrowLeft size={14} /> All Services
            </Link>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/25">
                <MainIcon size={24} className="text-white" />
              </div>
              <span className="font-mono text-sm text-text-secondary">{service.tagline}</span>
            </div>
            <h1 className="mt-6 font-heading text-hero uppercase text-black dark:text-white">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">{service.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-sweep group relative inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                Get Started <ArrowRight size={14} />
              </Link>
              <Link to="/work" className="group inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-8 py-4 text-xs uppercase tracking-[0.15em] font-heading font-bold text-slate-900 shadow-soft transition-all hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5">
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <SectionLabel>Overview</SectionLabel>
          <div className="mt-8 space-y-6">
            {detail.overview.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-text-secondary">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="gradient-section-bg py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Capabilities</SectionLabel>
          <div data-anim="sd-cap-grid" className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {detail.capabilities.map((cap) => {
              const Icon = capIconMap[cap.icon] || Code2;
              return (
                <div data-anim="sd-cap" key={cap.title} className="gradient-card group rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={18} className="text-white" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-black">{cap.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">{cap.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process + Features */}
      <section className="py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Process */}
            <div>
              <SectionLabel>Process</SectionLabel>
              <div className="mt-8 space-y-4">
                {service.sequence.map((step, i) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-indigo-200 bg-white font-heading text-sm font-bold text-accent">
                      {i + 1}
                    </div>
                    <span className="font-heading text-base font-bold uppercase text-black">{step}</span>
                    {i < service.sequence.length - 1 && <div className="h-px flex-1 bg-gradient-to-r from-indigo-200 to-transparent" />}
                  </div>
                ))}
              </div>
            </div>
            {/* Features */}
            <div>
              <SectionLabel>What's Included</SectionLabel>
              <ul data-anim="sd-feat-list" className="mt-8 space-y-3">
                {service.features.map((feature) => (
                  <li data-anim="sd-feat" key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                      <Check size={12} className="text-accent" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="gradient-section-bg py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Tech Stack</SectionLabel>
          <div data-anim="sd-tech-grid" className="mt-8 flex flex-wrap gap-3">
            {detail.techStack.map((tech) => (
              <span data-anim="sd-tech" key={tech} className="rounded-lg border border-slate-200 bg-white px-4 py-2 font-mono text-sm text-slate-700 shadow-soft transition-all hover:border-indigo-300 hover:text-indigo-600">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {detail.faq.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-6 lg:px-10">
            <SectionLabel>FAQ</SectionLabel>
            <Accordion type="single" collapsible className="mt-8 space-y-3">
              {detail.faq.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-slate-200 bg-white px-5 shadow-soft">
                  <AccordionTrigger className="text-left font-heading text-base font-bold text-black hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-text-secondary">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* Other Services */}
      <section className="gradient-section-bg py-20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <SectionLabel>Other Services</SectionLabel>
          <div data-anim="sd-other-grid" className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {services.filter((s) => s.id !== service.id).map((s) => {
              const Icon = serviceIconMap[s.icon] || Code2;
              return (
                <Link to={`/services/${s.id}`} key={s.id} data-anim="sd-other" className="gradient-card group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-soft">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={16} className="text-white" />
                  </div>
                  <span className="text-sm font-heading font-bold text-black transition-colors group-hover:text-accent">{s.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}