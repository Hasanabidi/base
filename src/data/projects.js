export const projects = [
  {
    id: "helix-analytics",
    title: "Helix Analytics",
    category: "AI Automation",
    year: "2025",
    client: "Fortune 500 FinTech",
    impact: "94% reduction in manual reporting",
    tech: ["Python", "OpenAI", "React", "FastAPI", "PostgreSQL", "AWS"],
    heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"
    ],
    overview: "Helix Analytics is an autonomous reporting system that ingests multi-source financial data, runs predictive models, and generates executive-grade analytics dashboards in real time — replacing a 40-hour weekly manual process.",
    challenge: "The client's analytics team spent over 40 hours per week manually compiling reports from 12 disconnected data sources. Leadership needed real-time visibility but existing BI tools couldn't unify the data or provide predictive insights.",
    solution: "We engineered an AI agent pipeline that connects to all 12 data sources via APIs, normalizes and validates the data automatically, runs ML models for trend prediction, and renders custom dashboards. The system flags anomalies, generates natural language summaries, and delivers reports on a configurable schedule.",
    metrics: [
      { label: "Manual Hours Saved", value: "94%", subtext: "Weekly reporting time eliminated" },
      { label: "Data Sources Unified", value: "12", subtext: "Previously disconnected systems" },
      { label: "Report Generation", value: "3s", subtext: "From query to dashboard" }
    ]
  },
  {
    id: "meridian-saas",
    title: "Meridian Platform",
    category: "Web Development",
    year: "2025",
    client: "Scale-up Logistics",
    impact: "$12M Series B enabled",
    tech: ["Next.js", "TypeScript", "Node.js", "GraphQL", "Redis", "GCP"],
    heroImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80",
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
    ],
    overview: "Meridian is a full-stack logistics management SaaS that orchestrates fleet routing, warehouse operations, and real-time shipment tracking for enterprise supply chains across 30+ countries.",
    challenge: "The client had a legacy monolith that couldn't scale beyond 50 concurrent users. They needed a platform that could handle 10,000+ real-time shipment updates per second while maintaining sub-100ms response times.",
    solution: "We rebuilt the platform on a microservices architecture with GraphQL federation, event-driven real-time updates via Redis pub/sub, and a React frontend optimized for data-heavy operations. The system auto-scales on GCP and includes a custom rules engine for routing optimization.",
    metrics: [
      { label: "Concurrent Users", value: "10K+", subtext: "From 50 to 10,000+" },
      { label: "Response Time", value: "82ms", subtext: "P99 latency under load" },
      { label: "Countries Served", value: "30+", subtext: "Global deployment" }
    ]
  },
  {
    id: "nexus-design-system",
    title: "Nexus Design System",
    category: "Digital Design",
    year: "2024",
    client: "Enterprise SaaS",
    impact: "60% faster feature delivery",
    tech: ["Figma", "Storybook", "React", "Framer Motion", "Radix", "CSS"],
    heroImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1200&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=1200&q=80",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80"
    ],
    overview: "Nexus is a comprehensive design system and component library that unified 4 product teams under a single design language, enabling rapid feature development with consistent, accessible, and beautiful UI.",
    challenge: "Four product teams were building UI independently, resulting in inconsistent experiences, duplicated code, and accessibility gaps. Feature delivery was slow and design debt was accumulating rapidly.",
    solution: "We conducted a full audit, designed a token-based design system, and built a component library with 80+ accessible components, comprehensive documentation, and automated testing. The system integrated with Figma for designer-developer sync.",
    metrics: [
      { label: "Components Built", value: "80+", subtext: "Fully accessible & documented" },
      { label: "Delivery Speed", value: "60%", subtext: "Faster feature shipping" },
      { label: "Teams Unified", value: "4", subtext: "Single design language" }
    ]
  },
  {
    id: "quantum-trading",
    title: "Quantum Trading Engine",
    category: "AI Automation",
    year: "2025",
    client: "Hedge Fund",
    impact: "23% improvement in returns",
    tech: ["Python", "PyTorch", "Rust", "Kafka", "TimescaleDB", "Kubernetes"],
    heroImage: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      "https://images.unsplash.com/photo-1518186285589-2f7649de83be?w=1200&q=80",
      "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1200&q=80"
    ],
    overview: "A real-time algorithmic trading engine that processes market signals, runs ML prediction models, and executes trades with sub-millisecond latency across multiple exchanges.",
    challenge: "The fund's existing system had 200ms+ latency and couldn't process the volume of market data needed for their ML models. They needed institutional-grade infrastructure with real-time risk management.",
    solution: "We built a Rust-based execution core for sub-millisecond trade execution, a Python ML pipeline for signal generation, and a Kafka-based data ingestion layer processing 1M+ events per second. The system includes real-time risk controls and a custom monitoring dashboard.",
    metrics: [
      { label: "Execution Latency", value: "0.8ms", subtext: "Sub-millisecond execution" },
      { label: "Events Processed", value: "1M/s", subtext: "Market data throughput" },
      { label: "Return Improvement", value: "23%", subtext: "ML model alpha generation" }
    ]
  },
  {
    id: "apex-ecommerce",
    title: "Apex Commerce",
    category: "Web Development",
    year: "2024",
    client: "DTC Retail Brand",
    impact: "3.2x conversion rate increase",
    tech: ["React", "Next.js", "Stripe", "Algolia", "Sanity", "Vercel"],
    heroImage: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80",
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
    ],
    overview: "A headless commerce platform with AI-powered product recommendations, instant search, and a custom checkout flow that delivers a premium shopping experience at scale.",
    challenge: "The brand's legacy Shopify theme was slow (4s+ load times), had poor mobile UX, and couldn't support the personalized shopping experience needed to compete with premium DTC brands.",
    solution: "We built a headless commerce frontend on Next.js with Algolia for instant search, a custom recommendation engine, and an optimized Stripe checkout. The CMS-driven content layer lets the marketing team update content without engineering.",
    metrics: [
      { label: "Conversion Rate", value: "3.2x", subtext: "Pre/post comparison" },
      { label: "Load Time", value: "0.8s", subtext: "From 4s to under 1s" },
      { label: "Mobile Revenue", value: "+180%", subtext: "Mobile-first redesign" }
    ]
  },
  {
    id: "synapse-dashboard",
    title: "Synapse Dashboard",
    category: "Digital Design",
    year: "2025",
    client: "Healthcare Tech",
    impact: "45% increase in user engagement",
    tech: ["React", "D3.js", "Figma", "WebGL", "Node.js", "MongoDB"],
    heroImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80"
    ],
    overview: "A healthcare analytics dashboard with interactive data visualizations, patient journey mapping, and real-time operational metrics designed for clinical decision support.",
    challenge: "The client's data was trapped in spreadsheets and legacy systems. Clinicians needed actionable insights from complex patient data without a steep learning curve, and the interface had to be accessible to non-technical users.",
    solution: "We designed and built an intuitive dashboard with custom D3.js visualizations, WebGL-rendered heatmaps for patient flow, and a simplified information architecture. The design passed WCAG AAA accessibility standards and reduced training time from 2 weeks to 2 hours.",
    metrics: [
      { label: "User Engagement", value: "45%", subtext: "Increase in daily active use" },
      { label: "Training Time", value: "2h", subtext: "Down from 2 weeks" },
      { label: "Accessibility", value: "AAA", subtext: "WCAG compliant" }
    ]
  }
];