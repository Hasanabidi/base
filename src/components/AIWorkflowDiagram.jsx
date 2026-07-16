import { useCallback, useLayoutEffect, useRef, useState } from 'react';
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

const CONNECTIONS = [
  { uid: 'c1', variant: 'sources-to-ai', leftCol: 0, rightCol: 1 },
  { uid: 'c2', variant: 'ai-to-outputs', leftCol: 1, rightCol: 2 },
];

/* ------------------------------------------------------------------ */
/*  Measures REAL DOM positions of every node row + every connector    */
/*  box, so cables land exactly on each row's center — no matter the   */
/*  font, row count, spacing, or viewport width. Re-measures on        */
/*  resize / font load so it never drifts out of sync.                 */
/* ------------------------------------------------------------------ */
function useConnectorLayout(pipelineRef, rowRefs, connectorRefs) {
  const [layout, setLayout] = useState({});

  const measure = useCallback(() => {
    const next = {};
    CONNECTIONS.forEach(({ uid, leftCol, rightCol }) => {
      const connectorEl = connectorRefs.current[uid];
      if (!connectorEl) return;
      const cRect = connectorEl.getBoundingClientRect();
      if (!cRect.height || !cRect.width) return;

      const getYs = (colIdx) =>
        (rowRefs.current[colIdx] || []).map((el) => {
          if (!el) return 0;
          const r = el.getBoundingClientRect();
          return r.top + r.height / 2 - cRect.top;
        });

      next[uid] = {
        width: cRect.width,
        height: cRect.height,
        inputYs: getYs(leftCol),
        outputYs: getYs(rightCol),
      };
    });
    setLayout(next);
  }, [connectorRefs, rowRefs]);

  useLayoutEffect(() => {
    measure();
    const el = pipelineRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener('resize', measure);
    // fonts / web-font swaps can shift row heights slightly after first paint
    const t1 = setTimeout(measure, 120);
    const t2 = setTimeout(measure, 400);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [measure]);

  return layout;
}

/* ------------------------------------------------------------------ */
/*  FlowConnector — glassmorphic "Hub & Spoke" network funnel          */
/* ------------------------------------------------------------------ */
function FlowConnector({ uid, variant, data, setRef }) {
  const isSourcesToAi = variant === 'sources-to-ai';

  const accentFrom = isSourcesToAi ? '#818CF8' : '#A78BFA';
  const accentTo = isSourcesToAi ? '#6366F1' : '#8B5CF6';
  const hubStroke = isSourcesToAi ? '#C7D2FE' : '#DDD6FE';
  const hubGlow = isSourcesToAi ? '#818CF8' : '#A78BFA';
  const particlesIn = isSourcesToAi
    ? ['#93C5FD', '#818CF8', '#6366F1']
    : ['#C4B5FD', '#A78BFA', '#7C3AED'];
  const particlesOut = isSourcesToAi
    ? ['#818CF8', '#A78BFA', '#7C3AED']
    : ['#C4B5FD', '#A78BFA', '#7C3AED'];

  return (
    <div
      ref={setRef}
      className="relative hidden lg:flex w-28 shrink-0 items-stretch justify-center z-10 self-stretch"
    >
      {data ? (
        <ConnectorSvg
          uid={uid}
          data={data}
          accentFrom={accentFrom}
          accentTo={accentTo}
          hubStroke={hubStroke}
          hubGlow={hubGlow}
          particlesIn={particlesIn}
          particlesOut={particlesOut}
        />
      ) : null}
    </div>
  );
}

function ConnectorSvg({ uid, data, accentFrom, accentTo, hubStroke, hubGlow, particlesIn, particlesOut }) {
  const { width, height, inputYs, outputYs } = data;
  const hubCenterX = width / 2;
  const hubCenterY = height / 2;
  const hubWidth = Math.min(46, width * 0.42);
  const hubHeight = Math.min(120, Math.max(64, height * 0.32));
  const hubX = hubCenterX - hubWidth / 2;
  const hubY = hubCenterY - hubHeight / 2;

  const inId = (i) => `${uid}-in-${i}`;
  const outId = (i) => `${uid}-out-${i}`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className="absolute inset-0 h-full w-full overflow-visible"
      fill="none"
    >
      <defs>
        <linearGradient id={`${uid}-hubFill`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#F3F0FF" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`${uid}-hubAmbient`}>
          <stop offset="0%" stopColor={hubGlow} stopOpacity="0.35" />
          <stop offset="100%" stopColor={hubGlow} stopOpacity="0" />
        </radialGradient>
        <filter id={`${uid}-softBlur`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        <filter id={`${uid}-tinyGlow`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="1.4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id={`${uid}-hubClip`}>
          <rect x={hubX} y={hubY} width={hubWidth} height={hubHeight} rx="14" />
        </clipPath>
      </defs>

      {/* ambient glow behind the hub — static size, always centered, never drifts */}
      <circle cx={hubCenterX} cy={hubCenterY} r={hubWidth * 1.4} fill={`url(#${uid}-hubAmbient)`} filter={`url(#${uid}-softBlur)`} />

      {/* ---- converging input cables ---- */}
      {inputYs.map((yVal, idx) => {
        const id = inId(idx);
        const d = `M 0 ${yVal} C ${hubX * 0.45} ${yVal}, ${hubX - 18} ${hubCenterY}, ${hubX - 2} ${hubCenterY}`;
        return (
          <g key={id}>
            <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1="0" y1={yVal} x2={hubX} y2={hubCenterY}>
              <stop offset="0%" stopColor={accentFrom} stopOpacity="0.15" />
              <stop offset="100%" stopColor={accentTo} stopOpacity="0.55" />
            </linearGradient>
            <path id={id} d={d} stroke={`url(#${id}-grad)`} strokeWidth="1.75" strokeLinecap="round" fill="none" />
            {[0, 1, 2].map((pIdx) => {
              const begin = (pIdx * 0.55 + idx * 0.13).toFixed(2) + 's';
              const dur = (1.6 + pIdx * 0.3 + (idx % 3) * 0.09).toFixed(2) + 's';
              return (
                <circle key={`${id}-p${pIdx}`} r={pIdx === 2 ? 2 : 1.5} fill={particlesIn[pIdx]} filter={`url(#${uid}-tinyGlow)`}>
                  <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                    <mpath xlinkHref={`#${id}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>
        );
      })}

      {/* ---- orchestration gateway (glassmorphic hub) ---- */}
      <rect x={hubX} y={hubY} width={hubWidth} height={hubHeight} rx="14" fill={`url(#${uid}-hubFill)`} stroke={hubStroke} strokeWidth="1.5" />
      <rect x={hubX + 4} y={hubY + 4} width={hubWidth - 8} height={hubHeight * 0.4} rx="9" fill="#FFFFFF" opacity="0.35" />

      {/* vertical scan line — stays fully within the hub at every animation frame */}
      <g clipPath={`url(#${uid}-hubClip)`}>
        <rect x={hubX} y={hubY + hubHeight * 0.5 - 2} width={hubWidth} height="4" fill={accentTo} opacity="0">
          <animate
            attributeName="y"
            values={`${hubY + 4};${hubY + hubHeight - 8};${hubY + 4}`}
            dur="2.6s"
            repeatCount="indefinite"
          />
          <animate attributeName="opacity" values="0;0.55;0" dur="2.6s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* pulsing processor core */}
      <circle cx={hubCenterX} cy={hubCenterY} r="4" fill={accentTo}>
        <animate attributeName="r" values="4;6;4" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx={hubCenterX} cy={hubCenterY} r="4" fill="none" stroke={accentTo} strokeWidth="1">
        <animate attributeName="r" values="4;13" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;0" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* ---- branching output cables ---- */}
      {outputYs.map((yVal, idx) => {
        const id = outId(idx);
        const startX = hubX + hubWidth + 2;
        const d = `M ${startX} ${hubCenterY} C ${startX + 18} ${hubCenterY}, ${width - (width - startX) * 0.45} ${yVal}, ${width} ${yVal}`;
        return (
          <g key={id}>
            <linearGradient id={`${id}-grad`} gradientUnits="userSpaceOnUse" x1={startX} y1={hubCenterY} x2={width} y2={yVal}>
              <stop offset="0%" stopColor={accentTo} stopOpacity="0.55" />
              <stop offset="100%" stopColor={accentFrom} stopOpacity="0.15" />
            </linearGradient>
            <path id={id} d={d} stroke={`url(#${id}-grad)`} strokeWidth="1.75" strokeLinecap="round" fill="none" />
            {[0, 1, 2].map((pIdx) => {
              const begin = (pIdx * 0.5 + idx * 0.12 + 0.35).toFixed(2) + 's';
              const dur = (1.4 + pIdx * 0.28 + (idx % 3) * 0.08).toFixed(2) + 's';
              return (
                <circle key={`${id}-p${pIdx}`} r={pIdx === 2 ? 2 : 1.5} fill={particlesOut[pIdx]} filter={`url(#${uid}-tinyGlow)`}>
                  <animateMotion dur={dur} begin={begin} repeatCount="indefinite">
                    <mpath xlinkHref={`#${id}`} />
                  </animateMotion>
                  <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur={dur} begin={begin} repeatCount="indefinite" />
                </circle>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Lightweight vertical connector for mobile / narrow layouts         */
/* ------------------------------------------------------------------ */
function FlowConnectorMobile({ variant }) {
  const accent = variant === 'sources-to-ai' ? '#6366F1' : '#8B5CF6';
  return (
    <div className="flex items-center justify-center py-1 lg:hidden">
      <svg width="80" height="34" viewBox="0 0 80 34" fill="none" className="overflow-visible">
        <line x1="40" y1="2" x2="40" y2="26" stroke="#DDD6FE" strokeWidth="1.5" strokeDasharray="3 4" />
        {[0, 1, 2].map((pIdx) => (
          <circle key={pIdx} r="2" fill={accent} opacity="0.85">
            <animateMotion dur={`${1.6 + pIdx * 0.3}s`} begin={`${pIdx * 0.4}s`} repeatCount="indefinite" path="M 40 2 L 40 26" />
          </circle>
        ))}
        <circle cx="40" cy="17" r="5" fill="none" stroke={accent} strokeWidth="1" opacity="0.4">
          <animate attributeName="r" values="5;9" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0" dur="2s" repeatCount="indefinite" />
        </circle>
        <path d="M 35 21 L 40 27 L 45 21" stroke="#C7D2FE" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Column of node rows — reports each row's DOM node up to the parent  */
/*  so connectors can measure exact centers.                            */
/* ------------------------------------------------------------------ */
function PipelineColumn({ col, colIdx, registerRow }) {
  return (
    <div className="flex flex-1 flex-col z-20">
      <div className={`mb-4 text-xs font-heading font-bold uppercase tracking-wider ${col.titleClass}`}>
        {col.title}
      </div>
      <div className="space-y-3">
        {col.nodes.map((node, rowIdx) => {
          const Icon = node.icon;
          return (
            <div
              key={node.label}
              ref={(el) => registerRow(colIdx, rowIdx, el)}
              className={`group/node flex h-[46px] items-center gap-2.5 rounded-lg border px-3 py-2 shadow-soft transition-all duration-300 hover:border-indigo-300 hover:shadow-card ${col.nodeClass}`}
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

/* ------------------------------------------------------------------ */
/*  Main diagram                                                       */
/* ------------------------------------------------------------------ */
export default function AIWorkflowDiagram() {
  const pipelineRef = useRef(null);
  const rowRefs = useRef({});
  const connectorRefs = useRef({});

  const registerRow = useCallback((colIdx, rowIdx, el) => {
    if (!rowRefs.current[colIdx]) rowRefs.current[colIdx] = [];
    rowRefs.current[colIdx][rowIdx] = el;
  }, []);

  const registerConnector = useCallback((uid) => (el) => {
    connectorRefs.current[uid] = el;
  }, []);

  const layout = useConnectorLayout(pipelineRef, rowRefs, connectorRefs);

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

        {/* Pipeline container */}
        <div className="relative p-5 lg:p-8">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="aurora-glow absolute left-1/3 top-0 h-full w-1/3" />
          </div>

          <div ref={pipelineRef} className="relative flex flex-col lg:flex-row lg:items-stretch justify-between">
            <PipelineColumn col={columns[0]} colIdx={0} registerRow={registerRow} />
            <FlowConnector uid="c1" variant="sources-to-ai" data={layout.c1} setRef={registerConnector('c1')} />
            <FlowConnectorMobile variant="sources-to-ai" />

            <PipelineColumn col={columns[1]} colIdx={1} registerRow={registerRow} />
            <FlowConnector uid="c2" variant="ai-to-outputs" data={layout.c2} setRef={registerConnector('c2')} />
            <FlowConnectorMobile variant="ai-to-outputs" />

            <PipelineColumn col={columns[2]} colIdx={2} registerRow={registerRow} />
          </div>

          {/* Metrics bar */}
          <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-3">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center justify-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
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