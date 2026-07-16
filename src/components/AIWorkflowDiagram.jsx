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

// Rewritten FlowConnector: premium Hub-and-Spoke with animated particles & glassmorphic hub
function FlowConnector(props) {
  const isSourcesToAi = props.variant === 'sources-to-ai';
  // color palette tuned for subtle premium look
  const hubFillStart = isSourcesToAi ? '#EEF2FF' : '#F8F6FF';
  const hubFillEnd = isSourcesToAi ? '#F7F9FF' : '#FBF8FF';
  const hubStroke = isSourcesToAi ? '#C7D2FE' : '#DDD6FE';
  const hubAccent = isSourcesToAi ? '#6366F1' : '#8B5CF6';
  const pathInColor = '#E6EEF8'; // soft slate/indigo for input cables
  const pathOutColor = '#EDE9FE'; // soft violet for output cables

  // Vertical anchor positions (match the visual layout of the node rows)
  const inputPoints = [60, 120, 180, 240, 300, 360];
  const outputPoints = [90, 150, 210, 270, 330, 390];

  // hub geometry (centered inside the connector svg)
  const viewW = 120;
  const viewH = 440;
  const hubCenterX = 48; // central x coordinate the paths converge to
  const hubCenterY = 220; // vertical center
  const hubWidth = 44;
  const hubHeight = 72;
  const hubX = hubCenterX - hubWidth / 2;
  const hubY = hubCenterY - hubHeight / 2;
  const particleColorsIn = ['#60A5FA', '#A78BFA', '#7C3AED']; // blue-indigo family
  const particleColorsOut = ['#C4B5FD', '#A78BFA', '#7C3AED'];

  return (
    <div className="relative hidden lg:flex w-28 shrink-0 items-center justify-center py-4 z-10 self-center">
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="h-full min-h-[320px] w-full"
        preserveAspectRatio="none"
        style={{ overflow: 'visible' }}
        fill="none"
      >
        <defs>
          {/* hub gradient + subtle glass effect */}
          <linearGradient id="hubGlass" x1="0" x2="1">
            <stop offset="0%" stopColor={hubFillStart} stopOpacity="0.9" />
            <stop offset="100%" stopColor={hubFillEnd} stopOpacity="0.75" />
          </linearGradient>

          {/* subtle inner gloss */}
          <linearGradient id="hubGloss" x1="0" x2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.06" />
          </linearGradient>

          {/* scanning gradient (we animate its transform) */}
          <linearGradient id="scanGrad" x1="0" x2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="50%" stopColor="white" stopOpacity="0.18" />
            <stop offset="100%" stopColor="white" stopOpacity="0.06" />
            <animate
              attributeName="gradientTransform"
              type="translate"
              values="-1 0; 1 0; -1 0"
              dur="2.2s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* soft blur filter for glow */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ---------- Precise converging Bezier paths (inputs) ---------- */}
        {inputPoints.map((yVal, idx) => {
          const id = `in-${yVal}`;
          // Smooth cubic Bezier: start at left edge -> gentle curve -> hubCenter
          // control points chosen to create fluid natures
          const d = `M 0 ${yVal} C ${Math.max(18, 18)} ${yVal} ${hubCenterX - 14} ${hubCenterY} ${hubCenterX - 2} ${hubCenterY}`;
          const particleCount = 3; // number of particles streaming along this path
          return (
            <g key={id}>

              {/* visible path stroke (subtle cable) */}
              <path
                id={id}
                d={d}
                stroke={pathInColor}
                strokeWidth="1.6"
                strokeLinecap="round"
                fill="none"
                opacity="0.95"
              />

              {/* animated "energy particles" traveling inward */}
              {Array.from({ length: particleCount }).map((_, pIdx) => {
                const begin = `${(pIdx * 0.45 + idx * 0.12).toFixed(2)}s`;
                const dur = (1.2 + (pIdx * 0.25) + (idx * 0.03)).toFixed(2) + 's';
                const r = 1.6;
                const color = particleColorsIn[pIdx % particleColorsIn.length];
                return (
                  <circle key={`${id}-c-${pIdx}`} r={r} fill={color} opacity="0.95">
                    <animateMotion
                      dur={dur}
                      begin={begin}
                      repeatCount="indefinite"
                      rotate="0"
                    >
                      <mpath xlinkHref={`#${id}`} />
                    </animateMotion>
                  </circle>
                );
              })}
            </g>
          );
        })}

        {/* ---------- Hub / Orchestration Gateway (glassmorphic) ---------- */}
        <g filter="url(#softGlow)">
          {/* outer card */}
          <rect
            x={hubX}
            y={hubY}
            width={hubWidth}
            height={hubHeight}
            rx="14"
            fill="url(#hubGlass)"
            stroke={hubStroke}
            strokeWidth="1.5"
          />

          {/* inner subtle gloss */}
          <rect
            x={hubX + 6}
            y={hubY + 6}
            width={hubWidth - 12}
            height={hubHeight - 20}
            rx="10"
            fill="url(#hubGloss)"
            opacity="0.9"
          />

          {/* orchestration label - kept small to remain icon-like */}
          <g transform={`translate(${hubCenterX}, ${hubCenterY - 2})`} textAnchor="middle">
            <circle r="3.2" fill={hubAccent} opacity="0.98" />
          </g>

          {/* scanning light bar (animated across the hub) */}
          <rect
            x={hubX - hubWidth}
            y={hubCenterY - 8}
            width={hubWidth * 3}
            height="12"
            rx="6"
            fill="url(#scanGrad)"
            opacity="0.18"
            style={{ mixBlendMode: 'screen' }}
          >
            <animate
              attributeName="x"
              from={hubX - hubWidth}
              to={hubX + hubWidth}
              dur="2.2s"
              repeatCount="indefinite"
            />
          </rect>

          {/* subtle central pulse dot */}
          <circle cx={hubCenterX} cy={hubCenterY} r="4.4" fill={hubAccent} opacity="0.9">
            <animate attributeName="r" values="4.4;6.4;4.4" dur="2.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.95;0.45;0.95" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* ---------- Outputs: branching outward with animated particles ---------- */}
        {outputPoints.map((yVal, idx) => {
          const id = `out-${yVal}`;
          // Smooth cubic Bezier: start at hubRight area -> curve outwards -> right edge
          const startX = hubCenterX + 6;
          const d = `M ${startX} ${hubCenterY} C ${startX + 10} ${hubCenterY} ${startX + 26} ${yVal} ${viewW} ${yVal}`;
          const particleCount = 3;
          return (
            <g key={id}>
              <path
                id={id}
                d={d}
                stroke={pathOutColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="6 6"
                fill="none"
                opacity="0.95"
              />

              {/* outward particles */}
              {Array.from({ length: particleCount }).map((_, pIdx) => {
                const begin = `${(pIdx * 0.3 + idx * 0.08).toFixed(2)}s`;
                const dur = (1.0 + pIdx * 0.28 + idx * 0.02).toFixed(2) + 's';
                const r = 1.6;
                const color = particleColorsOut[pIdx % particleColorsOut.length];
                return (
                  <circle key={`${id}-c-${pIdx}`} r={r} fill={color} opacity="0.95">
                    <animateMotion
                      dur={dur}
                      begin={begin}
                      repeatCount="indefinite"
                      rotate="0"
                    >
                      <mpath xlinkHref={`#${id}`} />
                    </animateMotion>
                  </circle>
                );
              })}
            </g>
          );
        })}

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
              className={`group/node flex h-[46px] items-center gap-2.5 rounded-lg border px-3 py-2 shadow-soft transition-all duration-300 hover:border-indigo-300 hover:shadow-card ${col.nodeClass} a[...]`
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
