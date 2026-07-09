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
      // Header animation
      gsap.from('[data-anim="process-header"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 80%' },
      });

      // Track active step based on scroll progress
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

      // Animate progress line fill
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
      className="relative"
      style={{ height: `${processSteps.length * 80}vh` }}
    >
      {/* Sticky inner */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Background evolution */}
        <div
          className="absolute inset-0 transition-background duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(199, 255, 58, ${0.04 + activeStep * 0.02}) 0%, transparent 70%)`,
          }}
        />
        <div className="grid-bg absolute inset-0 opacity-30" />

        <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-16 px-6 lg:grid-cols-[1fr_2fr] lg:px-10">
          {/* Left: Fixed info */}
          <div data-anim="process-header">
            <SectionLabel>Process</SectionLabel>
            <h2 className="mt-6 font-heading text-section text-white">
              The Engineering{' '}
              <span className="text-text-secondary">Pipeline</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-text-secondary">
              Every project follows a rigorous five-stage pipeline. No guesswork.
              No shortcuts. Just engineering excellence from blueprint to growth.
            </p>

            {/* Step indicator */}
            <div className="mt-10 font-mono text-sm text-accent">
              <span className="text-4xl font-medium text-white">
                {String(activeStep + 1).padStart(2, '0')}
              </span>
              <span className="text-text-secondary/40">
                {' '}/ {String(processSteps.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right: Timeline + stages */}
          <div className="relative">
            {/* Vertical progress track */}
            <div className="absolute left-0 top-0 h-full w-px bg-white/5">
              <div
                data-anim="progress-line"
                className="absolute top-0 left-0 h-full w-full origin-top"
                style={{
                  background: 'linear-gradient(to bottom, #C7FF3A, #D9FF7A)',
                  boxShadow: '0 0 10px rgba(199, 255, 58, 0.5)',
                }}
              />
            </div>

            {/* Stages */}
            <div className="ml-8 space-y-12">
              {processSteps.map((step, i) => (
                <div
                  key={step.id}
                  className="relative transition-all duration-500"
                  style={{
                    opacity: i <= activeStep ? 1 : 0.3,
                    transform: i === activeStep ? 'translateX(0)' : 'translateX(-8px)',
                  }}
                >
                  {/* Node */}
                  <div className="absolute -left-[37px] top-1 flex h-4 w-4 items-center justify-center">
                    <div
                      className="h-4 w-4 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: i <= activeStep ? '#C7FF3A' : 'rgba(255,255,255,0.1)',
                        background: i === activeStep ? '#C7FF3A' : 'transparent',
                        boxShadow: i === activeStep ? '0 0 12px rgba(199,255,58,0.6)' : 'none',
                      }}
                    />
                    {i === activeStep && (
                      <div className="absolute h-4 w-4 animate-ping rounded-full border border-accent" />
                    )}
                  </div>

                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent/60">{step.step}</span>
                    <h3
                      className="font-heading text-2xl font-medium transition-colors duration-500"
                      style={{ color: i === activeStep ? '#FFFFFF' : '#A0A0A0' }}
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
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-text-secondary"
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