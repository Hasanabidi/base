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
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      });
      gsap.from('[data-anim="pain-node"]', {
        opacity: 0, x: -40, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      });
      gsap.from('[data-anim="solution-node"]', {
        opacity: 0, x: 40, stagger: 0.1, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 60%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative py-32 border-t border-slate-200 bg-white">
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <div data-anim="ai-header" className="mb-16 text-center">
          <div className="flex justify-center"><SectionLabel>Intelligence Layer</SectionLabel></div>
          <h2 className="mt-6 font-heading text-section uppercase text-black">
            From Chaos to{' '}
            <span className="text-gradient">Intelligence</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
            We transform operational friction into autonomous systems. Pain points become
            data inputs. Complexity becomes intelligence.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          {/* Left: Pain Points */}
          <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-slate-200 shadow-soft">
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-black">
                Pain Points
              </span>
            </div>
            {painPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.label}
                  data-anim="pain-node"
                  className="group flex items-center gap-3 border-b border-slate-200 px-4 py-3 transition-colors hover:bg-slate-50 last:border-b-0"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200">
                    <Icon size={14} className="text-slate-700" />
                  </div>
                  <span className="text-sm text-black">{point.label}</span>
                </div>
              );
            })}
          </div>

          {/* Center: Animated particle flow */}
          <div className="relative hidden lg:flex w-32 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 128 400" preserveAspectRatio="none">
              {[60, 150, 240, 330].map((y, i) => (
                <path
                  key={i}
                  d={`M 0 ${y} C 40 ${y}, 80 ${100 + i * 80}, 128 ${100 + i * 80}`}
                  stroke="rgba(99, 102, 241, 0.2)"
                  strokeWidth="1"
                  fill="none"
                />
              ))}
              {[60, 150, 240, 330].map((y, i) => (
                <circle key={`particle-${i}`} r="3" fill="#6366F1">
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
            <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow">
              <Cpu size={20} className="text-white" />
            </div>
          </div>

          {/* Right: Solutions */}
          <div className="flex flex-col gap-0 overflow-hidden rounded-xl border border-slate-200 shadow-soft">
            <div className="border-b border-slate-200 bg-gradient-to-br from-indigo-500 to-violet-600 px-4 py-2 text-center">
              <span className="font-heading text-xs uppercase tracking-[0.2em] font-bold text-white">
                Solutions
              </span>
            </div>
            {solutions.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.label}
                  data-anim="solution-node"
                  className="group flex items-center gap-3 border-b border-slate-200 px-4 py-3 transition-colors hover:bg-slate-50 last:border-b-0"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent bg-gradient-to-br from-indigo-500 to-violet-600">
                    <Icon size={14} className="text-white" />
                  </div>
                  <span className="text-sm text-black">{sol.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}