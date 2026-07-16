import { Fragment, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users, Mail, FileText, Code, Database, MessageSquare, LayoutGrid,
  Search, Brain, Layers, Cog, GitBranch, Network,
  BarChart3, Reply, LayoutDashboard, Lightbulb, Bell, TrendingUp,
  Activity, Zap, Gauge,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const columns = [
  {
    title: 'Data Sources',
    titleClass: 'text-slate-400',
    iconBg: 'bg-slate-900',
    nodeClass: 'border-slate-200 bg-white',
    dotColor: 'bg-emerald-400',
    nodes: [
      { icon: Users, label: 'CRM' },
      { icon: Mail, label: 'Email' },
      { icon: FileText, label: 'Documents' },
      { icon: Code, label: 'APIs' },
      { icon: Database, label: 'Databases' },
      { icon: MessageSquare, label: 'Slack' },
      { icon: LayoutGrid, label: 'Notion' },
    ],
  },
  {
    title: 'AI Engine',
    titleClass: 'text-indigo-600',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-violet-600',
    nodeClass: 'border-indigo-200 bg-indigo-50/50',
    dotColor: 'bg-indigo-500',
    isCenter: true,
    nodes: [
      { icon: Search, label: 'Retrieval' },
      { icon: Brain, label: 'Reasoning' },
      { icon: Layers, label: 'Classification' },
      { icon: Cog, label: 'Automation' },
      { icon: GitBranch, label: 'Decision Making' },
      { icon: Network, label: 'Workflow Orchestration' },
    ],
  },
  {
    title: 'Outputs',
    titleClass: 'text-violet-600',
    iconBg: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    nodeClass: 'border-slate-200 bg-white',
    dotColor: 'bg-violet-400',
    nodes: [
      { icon: BarChart3, label: 'Automated Reports' },
      { icon: Reply, label: 'Customer Responses' },
      { icon: LayoutDashboard, label: 'Dashboards' },
      { icon: Lightbulb, label: 'Insights' },
      { icon: Bell, label: 'Notifications' },
      { icon: TrendingUp, label: 'Business Actions' },
    ],
  },
];

const metrics = [
  { icon: Activity, label: 'Efficiency', value: '87%', sub: '+12% MoM' },
  { icon: Zap, label: 'Tasks Automated', value: '1,247', sub: 'today' },
  { icon: Gauge, label: 'Response Time', value: '0.3s', sub: 'avg' },
];

function FlowConnector() {
  return (
    <>
      {/* Horizontal (desktop) */}
      <div className="hidden items-center justify-center lg:flex lg:w-12">
        <svg width="48" height="80" viewBox="0 0 48 80" fill="none" className="overflow-visible">
          <line x1="4" y1="40" x2="40" y2="40" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="3 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
          </line>
          <circle r="3" fill="#6366F1" opacity="0.8">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 4 40 L 40 40" />
          </circle>
          <circle r="2" fill="#8B5CF6" opacity="0.6">
            <animateMotion dur="1.8s" begin="0.6s" repeatCount="indefinite" path="M 4 40 L 40 40" />
          </circle>
          <circle r="1.5" fill="#A78BFA" opacity="0.5">
            <animateMotion dur="1.8s" begin="1.2s" repeatCount="indefinite" path="M 4 40 L 40 40" />
          </circle>
          <path d="M 34 35 L 40 40 L 34 45" stroke="#C7D2FE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* Vertical (mobile) */}
      <div className="flex items-center justify-center py-1 lg:hidden">
        <svg width="80" height="32" viewBox="0 0 80 32" fill="none" className="overflow-visible">
          <line x1="40" y1="4" x2="40" y2="24" stroke="#C7D2FE" strokeWidth="1.5" strokeDasharray="3 4">
            <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
          </line>
          <circle r="2.5" fill="#6366F1" opacity="0.7">
            <animateMotion dur="1.8s" repeatCount="indefinite" path="M 40 4 L 40 24" />
          </circle>
          <circle r="2" fill="#8B5CF6" opacity="0.5">
            <animateMotion dur="1.8s" begin="0.6s" repeatCount="indefinite" path="M 40 4 L 40 24" />
          </circle>
          <path d="M 35 19 L 40 25 L 45 19" stroke="#C7D2FE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </>
  );
}

export default function AIWorkflowDiagram() {
  const root = useRef(null);

  useLayoutEffect(() => {
    /*
    const ctx = gsap.context(() => {
      // 1. Animate the main outer frame in first
      gsap.from('[data-wf="frame"]', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
      
      // 2. Animate the pipeline nodes sequentially with a tiny delay
      gsap.from('[data-wf="node"]', {
        opacity: 0,
        y: 16,
        stagger: 0.04,
        duration: 0.5,
        delay: 0.2, // Starts right after the frame begins animating
        ease: 'power3.out',
      });
      
      // 3. Animate the bottom metric boxes
      gsap.from('[data-wf="metric"]', {
        opacity: 0,
        y: 14,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.4, // Starts slightly later for a nice layered feel
        ease: 'power3.out',
      });
    }, root);
    
    return () => ctx.revert();
    */
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
        <div className="relative p-5 lg:p-8">
          {/* Subtle animated background for AI Engine area */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-glow absolute left-1/3 top-0 h-full w-1/3" />
          </div>

          <div className="relative flex flex-col lg:flex-row lg:items-start">
            {columns.map((col, ci) => (
              <Fragment key={col.title}>
                {ci > 0 && <FlowConnector />}
                <div className="flex flex-1 flex-col">
                  <div className={`mb-3 text-xs font-heading font-bold uppercase tracking-wider ${col.titleClass}`}>
                    {col.title}
                  </div>
                  <div className="space-y-1.5">
                    {col.nodes.map((node) => {
                      const Icon = node.icon;
                      return (
                        <div
                          data-wf="node"
                          key={node.label}
                          className={`group/node flex items-center gap-2.5 rounded-lg border px-3 py-2 shadow-soft transition-all duration-300 hover:border-indigo-300 hover:shadow-card ${col.nodeClass}`}
                        >
                          <div className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md ${col.iconBg}`}>
                            <Icon size={13} className="text-white" />
                          </div>
                          <span className="flex-1 truncate text-xs font-medium text-slate-700">{node.label}</span>
                          <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${col.dotColor} animate-pulse`} />
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