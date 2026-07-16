import { Fragment } from 'react';
import {
  Users, Mail, FileText, Code, Database, MessageSquare, LayoutGrid,
  Search, Brain, Layers, Cog, GitBranch, Network,
  BarChart3, Reply, LayoutDashboard, Lightbulb, Bell, TrendingUp,
  Activity, Zap, Gauge,
} from 'lucide-react';

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

function FlowConnector(props) {
  const isSourcesToAi = props.variant === 'sources-to-ai';
  const hubFill = isSourcesToAi ? '#EEF2FF' : '#F5F3FF';
  const hubStroke = isSourcesToAi ? '#C7D2FE' : '#DDD6FE';
  const hubDot = isSourcesToAi ? '#6366F1' : '#8B5CF6';
  const trackStroke = isSourcesToAi ? '#C7D2FE' : '#DDD6FE';
  const inputPoints = [60, 120, 180, 240, 300, 360];
  const outputPoints = [90, 150, 210, 270, 330, 390];

  return (
    <div className="relative hidden lg:flex w-24 shrink-0 items-center justify-center py-4 z-10 self-center">
      <svg viewBox="0 0 96 440" className="h-full min-h-[320px] w-full" preserveAspectRatio="none" fill="none">
        <rect x="40" y="190" width="16" height="60" rx="8" fill={hubFill} stroke={hubStroke} strokeWidth="1.5" />
        <circle cx="48" cy="220" r="4" fill={hubDot} className="animate-ping" />

        {inputPoints.map((yVal) => (
          <path
            key={`in-${yVal}`}
            d={`M 0 ${yVal} C 18 ${yVal} 28 220 40 220`}
            stroke="#E2E8F0"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {outputPoints.map((yVal) => (
          <path
            key={`out-${yVal}`}
            d={`M 56 220 C 70 220 78 ${yVal} 96 ${yVal}`}
            stroke={trackStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.2s" repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    </div>
  );
}

// Helper component to render columns explicitly
function PipelineColumn({ col }) {
  return (
    <div className="flex flex-1 flex-col z-20">
      <div className={`mb-4 text-xs font-heading font-bold uppercase tracking-wider ${col.titleClass}`}>
        {col.title}
      </div>
      <div className="space-y-3">
        {col.nodes.map((node) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              className={`group/node flex h-[46px] items-center gap-2.5 rounded-lg border px-3 py-2 shadow-soft transition-all duration-300 hover:border-indigo-300 hover:shadow-card ${col.nodeClass} animate-in fade-in zoom-in-95 duration-500`}
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
  );
}

export default function AIWorkflowDiagram() {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-premium animate-in fade-in slide-in-from-bottom-4 duration-700">
        
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

        {/* Pipeline Container */}
        <div className="relative p-5 lg:p-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-glow absolute left-1/3 top-0 h-full w-1/3" />
          </div>

          {/* Clean explicit layout structures */}
          <div className="relative flex flex-col lg:flex-row lg:items-stretch justify-between min-h-[460px]">
            <PipelineColumn col={columns[0]} />
            <FlowConnector variant="sources-to-ai" />
            
            <PipelineColumn col={columns[1]} />
            <FlowConnector variant="ai-to-outputs" />
            
            <PipelineColumn col={columns[2]} />
          </div>

          {/* Metrics bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-3">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
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

      <div className="pointer-events-none mx-auto mt-1 h-16 max-w-3xl bg-gradient-to-t from-indigo-500/10 to-transparent blur-2xl" />
    </div>
  );
}