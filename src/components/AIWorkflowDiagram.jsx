import { Fragment, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database, Code, Server, Cpu, Bot, Zap,
  LayoutDashboard, GitBranch, Lightbulb,
  Activity, Gauge,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: 'Data Sources',
    titleClass: 'text-slate-400',
    iconBg: 'bg-slate-900',
    nodes: [
      { icon: Database, label: 'CRM Data', status: 'Synced' },
      { icon: Code, label: 'API Streams', status: 'Active' },
      { icon: Server, label: 'Databases', status: 'Synced' },
    ],
  },
  {
    title: 'AI Engine',
    titleClass: 'text-indigo-500',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    nodes: [
      { icon: Cpu, label: 'AI Agents', status: 'Processing' },
      { icon: Bot, label: 'ML Models', status: 'Analyzing' },
      { icon: Zap, label: 'Automation', status: 'Running' },
    ],
  },
  {
    title: 'Outputs',
    titleClass: 'text-violet-500',
    iconBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    nodes: [
      { icon: LayoutDashboard, label: 'Dashboards', status: 'Live' },
      { icon: GitBranch, label: 'Workflows', status: 'Active' },
      { icon: Lightbulb, label: 'Insights', status: 'Ready' },
    ],
  },
];

const metrics = [
  { icon: Activity, label: 'Efficiency', value: '87%', sub: '+12% MoM' },
  { icon: Zap, label: 'Tasks Automated', value: '1,247', sub: 'today' },
  { icon: Gauge, label: 'Response Time', value: '0.3s', sub: 'avg' },
];

function FlowArrow() {
  return (
    <div className="hidden items-center justify-center self-center lg:flex lg:w-10">
      <svg width="36" height="60" viewBox="0 0 36 60" fill="none">
        <path d="M 4 30 L 28 30" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="3 4" />
        <circle r="2.5" fill="#6366F1">
          <animateMotion dur="2s" repeatCount="indefinite" path="M 4 30 L 28 30" />
        </circle>
        <path d="M 22 24 L 28 30 L 22 36" stroke="#C7D2FE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function AIWorkflowDiagram() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('[data-wf="frame"]', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 85%' },
      });
      gsap.from('[data-wf="node"]', {
        opacity: 0, y: 20, stagger: 0.06, duration: 0.5, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 78%' },
      });
      gsap.from('[data-wf="metric"]', {
        opacity: 0, y: 14, stagger: 0.08, duration: 0.4, ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 68%' },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="mx-auto w-full max-w-5xl">
      {/* Window frame */}
      <div data-wf="frame" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium">
        {/* Title bar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-slate-500">Live Pipeline</span>
          </div>
        </div>

        {/* Pipeline */}
        <div className="p-5 lg:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start">
            {columns.map((col, ci) => (
              <Fragment key={col.title}>
                {ci > 0 && <FlowArrow />}
                <div className="flex flex-1 flex-col">
                  <div className={`mb-3 text-xs font-heading font-bold uppercase tracking-wider ${col.titleClass}`}>
                    {col.title}
                  </div>
                  <div className="space-y-2">
                    {col.nodes.map((node) => {
                      const Icon = node.icon;
                      return (
                        <div
                          data-wf="node"
                          key={node.label}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-2.5 shadow-soft transition-all duration-300 hover:border-indigo-300 hover:shadow-card"
                        >
                          <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg ${col.iconBg}`}>
                            <Icon size={15} className="text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-semibold text-slate-900">{node.label}</div>
                            <div className="flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[10px] text-slate-500">{node.status}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>

          {/* Metrics bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-3">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div data-wf="metric" key={m.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white">
                    <Icon size={14} className="text-indigo-500" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-heading text-lg font-bold text-slate-900">{m.value}</span>
                      <span className="text-[10px] text-slate-400">{m.sub}</span>
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400">{m.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle glow underneath */}
      <div className="pointer-events-none mx-auto mt-1 h-16 max-w-3xl bg-gradient-to-t from-indigo-500/10 to-transparent blur-2xl" />
    </div>
  );
}