export const blogPosts = [
  {
    slug: "engineering-leverage-from-complexity",
    title: "Engineering Leverage from Complexity",
    excerpt: "Why the most valuable software companies of the next decade will be defined not by what they build, but by the leverage they extract from complexity.",
    category: "Strategy",
    author: "Adrian Voss",
    date: "2025-06-20",
    readTime: "6 min",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    content: [
      { type: "paragraph", text: "Every great software company eventually confronts the same paradox: the systems that create their advantage are also the systems that create their complexity. The question isn't whether to build — it's how to extract leverage from the complexity you're forced to navigate." },
      { type: "paragraph", text: "At Fulcrum, we think about leverage differently. Leverage isn't just automation — it's the architectural decision to make a single investment that compounds across every future initiative. A well-designed data pipeline doesn't just save hours; it makes every future feature cheaper to build, every future decision cheaper to make." },
      { type: "heading", text: "The Three Forms of Leverage" },
      { type: "paragraph", text: "First, there's operational leverage — the automation of repetitive tasks. This is the most visible form and the easiest to justify. When you eliminate a 40-hour weekly process, the ROI is immediate and undeniable." },
      { type: "paragraph", text: "Second, there's architectural leverage — the design decisions that make future development faster. A clean API contract, a well-modeled data schema, a thoughtfully designed event system. These investments don't show up on a dashboard, but they compound with every feature shipped afterward." },
      { type: "paragraph", text: "Third, and most powerful, there's intelligence leverage — the application of AI to make decisions that were previously impossible. Not just faster decisions, but better ones. Predictive analytics that anticipate customer churn before it happens. ML models that optimize pricing in real-time. AI agents that triage and resolve issues autonomously." },
      { type: "heading", text: "The Compound Effect" },
      { type: "paragraph", text: "The companies that win in the AI era won't be the ones with the most data or the best models. They'll be the ones who architect their systems to compound leverage — where every automation makes the next one easier, every data pipeline makes the next model more accurate, and every AI agent makes the team more capable." },
      { type: "paragraph", text: "This is what we engineer at Fulcrum. Not just software, but systems designed to compound. Systems where the complexity isn't hidden — it's harnessed, redirected, and transformed into leverage." }
    ]
  },
  {
    slug: "building-ai-agents-that-actually-work",
    title: "Building AI Agents That Actually Work in Production",
    excerpt: "Most AI agent demos fall apart in production. Here's the engineering blueprint for building autonomous systems that are reliable, observable, and genuinely useful.",
    category: "AI",
    author: "Kai Nakamura",
    date: "2025-06-15",
    readTime: "8 min",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
    content: [
      { type: "paragraph", text: "The gap between an AI agent demo and a production system is enormous. Demos live in controlled environments with curated inputs. Production systems face messy data, edge cases, rate limits, and users who expect 99.9% reliability." },
      { type: "heading", text: "Start with the Failure Modes" },
      { type: "paragraph", text: "Before writing a single line of agent code, map out every failure mode. What happens when the LLM hallucinates a function call? What happens when an API times out mid-chain? What happens when the context window overflows? Production AI systems are 80% error handling and 20% intelligence." },
      { type: "heading", text: "Observability Is Non-Negotiable" },
      { type: "paragraph", text: "Every agent action must be logged, traceable, and replayable. You need to know exactly which prompt produced which output, which tool was called with which arguments, and where the chain broke. Without this, debugging is impossible and improvement is guesswork." },
      { type: "heading", text: "The Human-in-the-Loop Pattern" },
      { type: "paragraph", text: "The best production AI systems don't try to be fully autonomous on day one. They start with human-in-the-loop — the agent proposes, a human approves, and over time the approval threshold rises as confidence grows. This is how you build trust and collect training data simultaneously." },
      { type: "paragraph", text: "At Fulcrum, we've shipped AI agents that process millions of tasks per month. The pattern is always the same: start narrow, observe relentlessly, and expand autonomy only when the data supports it." }
    ]
  },
  {
    slug: "the-architecture-of-high-performance-web-apps",
    title: "The Architecture of High-Performance Web Applications",
    excerpt: "How we structure React applications to achieve sub-second load times, smooth 60fps interactions, and Lighthouse scores of 100 — without sacrificing developer experience.",
    category: "Engineering",
    author: "Sofia Reyes",
    date: "2025-06-10",
    readTime: "7 min",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80",
    content: [
      { type: "paragraph", text: "Performance isn't a feature you add at the end — it's an architectural decision you make at the beginning. The difference between a fast app and a slow one isn't optimization tricks; it's fundamental structural choices." },
      { type: "heading", text: "Code Splitting by Route" },
      { type: "paragraph", text: "Every route should load only the code it needs. This sounds obvious, but most apps ship a monolithic JavaScript bundle because it's the default. Route-based code splitting can reduce initial load by 60-80% on multi-page applications." },
      { type: "heading", text: "Data Fetching Strategy" },
      { type: "paragraph", text: "The biggest performance killer in modern web apps is waterfall data fetching. Component mounts, fetches data, renders child, child fetches more data. We use a parallel data fetching pattern where all route-level data loads simultaneously, cutting load times in half." },
      { type: "heading", text: "Render Optimization" },
      { type: "paragraph", text: "React's default behavior is to re-render everything. For data-heavy dashboards, this means thousands of unnecessary renders. We use memoization strategically — not everywhere, but at the boundaries where re-renders cascade. The key is measuring first, optimizing second." },
      { type: "paragraph", text: "These aren't micro-optimizations. They're the difference between an app that feels instant and one that feels sluggish. And in 2025, users can tell the difference within 200 milliseconds." }
    ]
  },
  {
    slug: "design-systems-as-infrastructure",
    title: "Design Systems as Engineering Infrastructure",
    excerpt: "A design system isn't a Figma file — it's living infrastructure that determines how fast your team can ship. Here's how to build one that compounds value over time.",
    category: "Design",
    author: "Lena Marchetti",
    date: "2025-06-05",
    readTime: "5 min",
    heroImage: "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80",
    content: [
      { type: "paragraph", text: "Most companies treat design systems as a deliverable — a Figma library and a Storybook instance. But a design system is infrastructure. Like any infrastructure, its value compounds over time, and its maintenance determines whether it becomes an asset or a liability." },
      { type: "heading", text: "Start with Tokens, Not Components" },
      { type: "paragraph", text: "Before building a single component, define your design tokens — colors, spacing, typography, shadows, motion curves. These tokens are the atomic units of your system. Get them wrong, and every component built on top of them inherits the mistake." },
      { type: "heading", text: "The Designer-Developer Contract" },
      { type: "paragraph", text: "A design system only works when designers and developers speak the same language. This means Figma variables map exactly to CSS custom properties, which map exactly to Tailwind config values. No translation layer. No 'close enough.'" },
      { type: "paragraph", text: "When we build design systems at Fulcrum, we engineer them like any other system — with versioning, testing, documentation, and deprecation paths. Because a design system that can't evolve is one that will eventually be abandoned." }
    ]
  }
];

export const blogCategories = ["All", "AI", "Engineering", "Design", "Strategy"];