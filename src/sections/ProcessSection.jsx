import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '@/components/SectionLabel';
import { processSteps } from '@/data/processSteps';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessSection() {
  const root = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-anim="process-header"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const step = Math.min(
            Math.floor(self.progress * processSteps.length),
            processSteps.length - 1
          );
          setActiveStep(step);
        },
      });

      gsap.fromTo(
        '[data-anim="progress-line"]',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 50%',
            end: 'bottom 80%',
            scrub: 0.5,
          },
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative border-t border-slate-200"
      style={{ height: `${processSteps.length * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-30" />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_2fr] lg:px-10">
          {/* Left: Fixed info */}
          <div data-anim="process-header">
            <SectionLabel>Process</SectionLabel>
            <h2 className="mt-6 font-heading text-section uppercase text-black">
              The Engineering{' '}
              <span className="text-gradient">Pipeline</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-text-secondary">
              Every project follows a rigorous five-stage pipeline. No guesswork.
              No shortcuts. Just engineering excellence from blueprint to growth.
            </p>

            <div className="mt-10 font-mono text-sm">
              <span className="font-heading text-4xl font-extrabold text-accent">
                {String(activeStep + 1).padStart(2, '0')}
              </span>
              <span className="text-text-secondary">
                {' '}/ {String(processSteps.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: Timeline + stages */}
          <div className="relative">
            {/* Vertical progress track */}
            <div className="absolute left-0 top-0 h-full w-px bg-slate-200">
              <div
                data-anim="progress-line"
                className="absolute top-0 left-0 h-full w-full origin-top"
                style={{ background: '#6366F1' }}
              />
            </div>

            {/* Stages */}
            <div className="ml-8 space-y-10">
              {processSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="relative transition-all duration-500"
                  style={{
                    opacity: i <= activeStep ? 1 : 0.3,
                    transform: i === activeStep ? 'translateX(0)' : 'translateX(-8px)',
                  }}
                >
                  <div className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center">
                    <div
                      className="h-4 w-4 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: i <= activeStep ? '#6366F1' : '#E2E8F0',
                        background: i === activeStep ? '#6366F1' : 'transparent',
                      }}
                    />
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent">{step.step}</span>
                    <h3
                      className="font-heading text-2xl font-extrabold uppercase transition-colors duration-500"
                      style={{ color: i === activeStep ? '#0F172A' : '#64748B' }}
                    >
                      {step.title}
                    </h3>
                  </div>

                  {i === activeStep && (
                    <div className="mt-4 max-w-lg">
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {step.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {step.deliverables.map((d) => (
                          <span
                            key={d}
                            className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs text-slate-900"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}