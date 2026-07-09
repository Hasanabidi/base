import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, Cpu, Zap, BarChart3, LayoutDashboard } from 'lucide-react';
import SectionLabel from '@/components/SectionLabel';

gsap.registerPlugin(ScrollTrigger);

const painPoints = [
  { label: 'Manual Work', icon: AlertCircle },
  { label: 'Disconnected Systems', icon: AlertCircle },
  { label: 'Slow Teams', icon: AlertCircle },
  { label: 'Repetitive Tasks', icon: AlertCircle },
];

const solutions = [
  { label: 'AI Agents', icon: Cpu },
  { label: 'Automation', icon: Zap },
  { label: 'Predictive Analytics', icon: BarChart3 },
  { label: 'Custom Dashboards', icon: LayoutDashboard },
];

export default function AISection() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="ai-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });

      gsap.from('[data-anim="pain-node"]', {
        opacity: 0,
        x: -40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      });

      gsap.from('[data-anim="solution-node"]', {
        opacity: 0,
        x: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-40">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-core/20 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="ai-header" className="mb-20 text-center">
          <div className="flex justify-center">
            <SectionLabel>Intelligence Layer</SectionLabel>
          </div>
          <h2 className="mt-6 font-heading text-section text-white">
            From Chaos to{' '}
            <span className="text-gradient-cyan">Intelligence</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
            We transform operational friction into autonomous systems. Pain points become
            data inputs. Complexity becomes intelligence.
          </p>
        </div>

        {/* System Diagram */}
        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          {/* Left: Pain Points */}
          <div className="flex flex-col gap-4">
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-red-400/60">
                Pain Points
              </span>
            </div>
            {painPoints.map((point, i) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  data-anim="pain-node"
                  className="group relative flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-red-400/20"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-400/5">
                    <Icon size={16} className="text-red-400/60" />
                  </div>
                  <span className="text-sm text-text-secondary">{point.label}</span>
                  {/* Connection node */}
                  <span className="absolute -right-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-red-400/40">
                    <span className="absolute inset-0 animate-ping rounded-full bg-red-400/20" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center: Animated particle flow */}
          <div className="relative hidden lg:flex w-32 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 128 400" preserveAspectRatio="none">
              {/* Connection lines */}
              {[60, 150, 240, 330].map((y, i) => (
                <path
                  key={i}
                  d={`M 0 ${y} C 40 ${y}, 80 ${100 + i * 80}, 128 ${100 + i * 80}`}
                  stroke="rgba(199, 255, 58, 0.15)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              {/* Animated particles traveling */}
              {[60, 150, 240, 330].map((y, i) => (
                <circle key={`particle-${i}`} r="2.5" fill="#C7FF3A">
                  <animateMotion
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                    path={`M 0 ${y} C 40 ${y}, 80 ${100 + i * 80}, 128 ${100 + i * 80}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>
            {/* Central processing node */}
            <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm">
              <Cpu size={20} className="text-accent animate-pulse" />
              <div className="absolute inset-0 animate-ping rounded-full border border-accent/20" />
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col gap-4">
            <div className="mb-4 text-center">
              <span className="font-mono text-xs uppercase tracking-widest text-accent">
                Solutions
              </span>
            </div>
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.label}
                  data-anim="solution-node"
                  className="group relative flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-accent/30 hover:bg-accent/5"
                >
                  {/* Connection node */}
                  <span className="absolute -left-2 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent">
                    <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Icon size={16} className="text-accent" />
                  </div>
                  <span className="text-sm text-white">{sol.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}