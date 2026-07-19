export const services = [
  {
    id: "web-development",
    num: "01",
    title: "Web Development & Design",
    tagline: "Sites That Convert",
    description: "High-performance websites across all major platforms.",
    overview: "We build high-converting websites that work seamlessly across all devices. From Shopify e-commerce stores to custom Next.js applications, we deliver fast, beautiful, and functional web solutions.",
    capabilities: [
      "Shopify E-commerce Stores",
      "Wix & Wix Studio Websites",
      "Framer Design & Development",
      "GoHighLevel Funnels & Sites",
      "Next.js & React Applications",
      "Custom Web Development",
      "Responsive & Mobile-First Design",
      "SEO-Optimized Architecture"
    ],
    techStack: ["Figma","Wix Studio","Wix Velo","WordPress","Shopify","Squarespace","Framer","GoHighLevel","Next.js","React","Astro","Vite","Tailwind CSS"],
    features: [
      "Shopify E-commerce Stores",
      "Wix & Wix Studio Websites",
      "Framer Design & Development",
      "GoHighLevel Funnels & Sites",
      "Next.js & React Applications",
      "Custom Web Development",
      "Responsive & Mobile-First Design",
      "SEO-Optimized Architecture"
    ],
    faqs: [
      { question: "How long does a website take to build?", answer: "Most projects take 4-12 weeks depending on complexity and requirements. Simple brochure sites are 4-6 weeks, while e-commerce stores typically require 8-12 weeks." },
      { question: "Do you provide ongoing support?", answer: "Yes! We offer maintenance packages including updates, security monitoring, and feature enhancements." },
      { question: "Can you migrate my existing site?", answer: "Absolutely. We specialize in migrating sites from other platforms while preserving SEO and improving performance." },
      { question: "Will my site be mobile-friendly?", answer: "Every site we build is 100% responsive and optimized for mobile, tablet, and desktop screens." }
    ],
    accent: "#6366F1",
    icon: "code",
    sequence: ["Design", "Develop", "Deploy"]
  },
  {
    id: "mobile-apps",
    num: "02",
    title: "Mobile Apps & Games",
    tagline: "Apps People Love",
    description: "Native/cross-platform iOS, Android, and Play Store games.",
    overview: "We develop native and cross-platform mobile applications that users love. From iOS and Android apps to interactive games, we deliver high-performance experiences optimized for mobile platforms.",
    capabilities: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps (React Native)",
      "Android Game Development",
      "Google Play Store Deployment",
      "App Store Optimization",
      "In-App Purchases & Monetization",
      "Push Notifications & Analytics"
    ],
    techStack: ["React Native","Flutter","Swift","Kotlin","Unity","C#","Firebase"],
    features: [
      "iOS App Development",
      "Android App Development",
      "Cross-Platform Apps (React Native)",
      "Android Game Development",
      "Google Play Store Deployment",
      "App Store Optimization",
      "In-App Purchases & Monetization",
      "Push Notifications & Analytics"
    ],
    faqs: [
      { question: "What's the difference between native and cross-platform?", answer: "Native apps (iOS/Android) offer better performance and features, while cross-platform saves development time and cost. We recommend native for complex apps and cross-platform for faster MVP launches." },
      { question: "How much does an app cost?", answer: "Simple apps start at $15k-$30k, while complex apps with backend services range $50k-$150k+. We provide detailed quotes after understanding your requirements." },
      { question: "Do you handle app store submissions?", answer: "Yes, we manage the entire submission process including app store optimization, screenshots, descriptions, and compliance." },
      { question: "How long does app development take?", answer: "MVP apps typically take 3-4 months, while feature-rich applications can take 6-12 months depending on complexity." }
    ],
    accent: "#6366F1",
    icon: "mobile",
    sequence: ["Prototype", "Build", "Launch"]
  },
  {
    id: "saas-applications",
    num: "03",
    title: "SaaS Applications",
    tagline: "Software That Scales",
    description: "Full-stack multi-tenant apps, subscription billing, dashboards.",
    overview: "We build scalable SaaS platforms designed to grow with your business. From multi-tenant architecture to subscription management, we deliver enterprise-grade applications built for profitability.",
    capabilities: [
      "Multi-Tenant Architecture",
      "Subscription Billing Integration",
      "Admin Dashboards & Analytics",
      "REST & GraphQL API Design",
      "Role-Based Access Control",
      "Cloud Infrastructure (AWS / GCP)",
      "Automated Testing & QA",
      "CI/CD Pipelines"
    ],
    techStack: ["Next.js","Node.js","PostgreSQL","MongoDB","Prisma","Stripe","Auth0","Clerk","AWS","Vercel"],
    features: [
      "Multi-Tenant Architecture",
      "Subscription Billing Integration",
      "Admin Dashboards & Analytics",
      "REST & GraphQL API Design",
      "Role-Based Access Control",
      "Cloud Infrastructure (AWS / GCP)",
      "Automated Testing & QA",
      "CI/CD Pipelines"
    ],
    faqs: [
      { question: "What is a SaaS application?", answer: "SaaS (Software-as-a-Service) is a cloud-based application that users access via the web. Examples include Slack, Figma, and Stripe." },
      { question: "How do you handle user authentication?", answer: "We use enterprise solutions like Auth0, Clerk, or custom implementations with OAuth2/JWT for secure user management." },
      { question: "Can you integrate payment processing?", answer: "Yes, we integrate Stripe, PayPal, and other payment gateways for subscription billing and one-time payments." },
      { question: "What about data security and compliance?", answer: "We implement encryption, HIPAA/SOC2 compliance, regular security audits, and follow industry best practices." }
    ],
    accent: "#6366F1",
    icon: "cloud",
    sequence: ["Architecture", "Development", "Launch"]
  },
  {
    id: "pos-software",
    num: "04",
    title: "POS Software",
    tagline: "Retail, Reimagined",
    description: "Custom offline-ready POS systems with hardware integrations.",
    overview: "Modern POS systems built for retailers who need reliability and flexibility. Our solutions work offline, integrate with hardware, and provide real-time business intelligence.",
    capabilities: [
      "Inventory Management",
      "Sales & Payment Processing",
      "Employee & Shift Management",
      "Real-Time Sales Reporting",
      "Hardware Integration (Scanners, Printers)",
      "Offline Mode & Sync",
      "Multi-Location Support",
      "Receipt & Invoice Generation"
    ],
    techStack: ["Electron","React","Node.js","SQLite","GraphQL","WebSockets","Star/Pax APIs"],
    features: [
      "Inventory Management",
      "Sales & Payment Processing",
      "Employee & Shift Management",
      "Real-Time Sales Reporting",
      "Hardware Integration (Scanners, Printers)",
      "Offline Mode & Sync",
      "Multi-Location Support",
      "Receipt & Invoice Generation"
    ],
    faqs: [
      { question: "What makes your POS better than Square or Toast?", answer: "We offer complete customization, offline functionality, and transparent pricing—ideal for retailers who want full control and lower costs." },
      { question: "Does it work without internet?", answer: "Yes! Our POS stores transactions locally and syncs when internet returns. Perfect for unreliable connections." },
      { question: "What hardware do you support?", answer: "We integrate with major printers (Star, Epson), scanners, card readers (Pax, Ingenico), and weight scales." },
      { question: "Can it handle multiple store locations?", answer: "Absolutely. Centralized reporting, inventory management, and employee oversight across all locations." }
    ],
    accent: "#6366F1",
    icon: "pos",
    sequence: ["Setup", "Configure", "Operate"]
  },
  {
    id: "financial-services",
    num: "05",
    title: "Financial Services",
    tagline: "Numbers, Handled",
    description: "Accounting, corporate/personal tax, bookkeeping, audits.",
    overview: "Expert financial guidance for businesses and individuals. We simplify accounting, maximize tax efficiency, and ensure compliance so you can focus on growth.",
    capabilities: [
      "Corporate Tax Filing",
      "Personal Tax Preparation",
      "Bookkeeping & Accounting",
      "Financial Auditing",
      "Tax Planning & Strategy",
      "Payroll Management",
      "Financial Statement Preparation",
      "Regulatory Compliance & Advisory"
    ],
    techStack: ["QuickBooks Online","Xero","Wave","FreshBooks","TurboTax","TaxAct","Excel VBA"],
    features: [
      "Corporate Tax Filing",
      "Personal Tax Preparation",
      "Bookkeeping & Accounting",
      "Financial Auditing",
      "Tax Planning & Strategy",
      "Payroll Management",
      "Financial Statement Preparation",
      "Regulatory Compliance & Advisory"
    ],
    faqs: [
      { question: "How much do your services cost?", answer: "Pricing depends on complexity. Simple returns start at $500-$1000, while business accounting and tax planning are quoted individually." },
      { question: "Do you work with Quickbooks and Xero?", answer: "Yes, we're certified in both platforms and can set up, maintain, and optimize your accounting systems." },
      { question: "What about year-end tax planning?", answer: "We provide strategic tax planning to minimize liability and identify optimization opportunities for your specific situation." },
      { question: "Can you handle payroll?", answer: "Yes, we manage payroll processing, tax deposits, and compliance with state and federal regulations." }
    ],
    accent: "#6366F1",
    icon: "finance",
    sequence: ["Review", "File", "Optimize"]
  },
  {
    id: "cyber-security",
    num: "06",
    title: "Cyber Security",
    tagline: "Secure by Design",
    description: "Vulnerability assessments, pentesting, audits, monitoring.",
    overview: "Protect your business from cyber threats with comprehensive security assessments and continuous monitoring. We identify vulnerabilities before attackers do.",
    capabilities: [
      "Penetration Testing",
      "Vulnerability Assessments",
      "Security Audits & Compliance",
      "Network Security Solutions",
      "Data Protection & Encryption",
      "Incident Response Planning",
      "24/7 Security Monitoring",
      "Employee Security Training"
    ],
    techStack: ["Kali Linux","Burp Suite","Wireshark","Metasploit","Nmap","OWASP","AWS GuardDuty","Cloudflare"],
    features: [
      "Penetration Testing",
      "Vulnerability Assessments",
      "Security Audits & Compliance",
      "Network Security Solutions",
      "Data Protection & Encryption",
      "Incident Response Planning",
      "24/7 Security Monitoring",
      "Employee Security Training"
    ],
    faqs: [
      { question: "What's included in a security audit?", answer: "We assess your systems, applications, and processes against industry standards, identifying risks and providing remediation plans." },
      { question: "How often should we do penetration testing?", answer: "We recommend quarterly for critical systems and annually at minimum for compliance requirements like PCI-DSS and HIPAA." },
      { question: "Do you handle incident response?", answer: "Yes, we provide 24/7 incident response services to quickly contain and investigate security breaches." },
      { question: "What compliance standards do you cover?", answer: "We work with HIPAA, PCI-DSS, SOC2, ISO27001, GDPR, and other regulatory requirements." }
    ],
    accent: "#6366F1",
    icon: "security",
    sequence: ["Assess", "Secure", "Monitor"]
  },
  {
    id: "ai-automation",
    num: "07",
    title: "AI Automation & Agents",
    tagline: "Workflows, Automated",
    description: "Custom AI integrations, autonomous business agents, RAG enterprise search tools.",
    overview: "Transform your business with AI-powered automation. We build intelligent agents that handle complex workflows, freeing your team to focus on strategy and growth.",
    capabilities: [
      "Custom AI Integrations",
      "Autonomous Business Agents",
      "Internal Workflow Automation",
      "LLM-Powered Data Search (RAG)",
      "Document & Email Automation",
      "CRM & Tool Connectors",
      "Human-in-the-Loop Controls",
      "Monitoring & Guardrails"
    ],
    techStack: ["OpenAI","Claude","LangChain","LlamaIndex","Make.com","n8n","Python","Pinecone","ChromaDB"],
    features: [
      "Custom AI Integrations",
      "Autonomous Business Agents",
      "Internal Workflow Automation",
      "LLM-Powered Data Search (RAG)",
      "Document & Email Automation",
      "CRM & Tool Connectors",
      "Human-in-the-Loop Controls",
      "Monitoring & Guardrails"
    ],
    faqs: [
      { question: "What's the difference between AI automation and traditional automation?", answer: "AI can handle complex, variable tasks that traditional automation can't. It learns patterns and adapts, making it perfect for customer service, data processing, and decision-making." },
      { question: "How much can we save with AI automation?", answer: "Most clients see 40-60% time savings on manual tasks. ROI typically occurs within 3-6 months." },
      { question: "Is my data safe with AI integrations?", answer: "Yes, we implement enterprise-grade security, data encryption, and handle compliance with SOC2, HIPAA, and GDPR." },
      { question: "Can you integrate with our existing tools?", answer: "Absolutely. We connect to Salesforce, HubSpot, Zapier, Slack, email, and virtually any API-enabled platform." }
    ],
    accent: "#6366F1",
    icon: "ai",
    sequence: ["Map", "Build", "Automate"]
  },
  {
    id: "ai-chatbots",
    num: "08",
    title: "Intelligent Chatbots & Conversational AI",
    tagline: "Engage, Instantly",
    description: "Smart support funnels, voice automation, custom embedded chat agents.",
    overview: "Engage customers 24/7 with intelligent chatbots that qualify leads, answer questions, and handle transactions. From text to voice, we create conversational experiences that convert.",
    capabilities: [
      "Custom-Trained Chat Agents",
      "AI Customer Support Funnels",
      "Voice Automation & IVR",
      "SMS & WhatsApp Bots",
      "Website & In-App Widgets",
      "Lead Qualification Flows",
      "Live Handoff to Humans",
      "Multilingual Conversations"
    ],
    techStack: ["Voiceflow","Botpress","ManyChat","OpenAI Assistants API","Twilio","ElevenLabs","LiveKit"],
    features: [
      "Custom-Trained Chat Agents",
      "AI Customer Support Funnels",
      "Voice Automation & IVR",
      "SMS & WhatsApp Bots",
      "Website & In-App Widgets",
      "Lead Qualification Flows",
      "Live Handoff to Humans",
      "Multilingual Conversations"
    ],
    faqs: [
      { question: "How accurate are AI chatbots?", answer: "Modern AI chatbots handle 70-90% of customer inquiries accurately. Complex issues automatically escalate to human agents." },
      { question: "Can chatbots understand context?", answer: "Yes! We build sophisticated conversational AI that remembers conversation history and understands nuanced requests." },
      { question: "What languages do you support?", answer: "We support 50+ languages with native-like conversation quality using advanced multilingual models." },
      { question: "How do we measure ROI?", answer: "We track resolution rate, customer satisfaction, response time, and lead qualification metrics. Most clients see 30-50% reduction in support costs." }
    ],
    accent: "#6366F1",
    icon: "chat",
    sequence: ["Train", "Embed", "Engage"]
  },
  {
    id: "seo-optimization",
    num: "09",
    title: "Technical SEO, GEO & AEO Optimization",
    tagline: "Built to Convert",
    description: "Speed tuning, CRO, multi-dimensional visibility optimization across traditional search (SEO), AI engines and direct answer/voice (GEO/AEO).",
    overview: "Dominate search across all channels—Google, AI engines like Perplexity, and voice assistants. We optimize for technical excellence, conversion rates, and visibility everywhere your customers search.",
    capabilities: [
      "Technical SEO Audits",
      "Core Web Vitals & Speed Tuning",
      "Conversion Rate Optimization (CRO)",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Structured Data & Schema",
      "LLM Citation Tracking",
      "Analytics & A/B Testing"
    ],
    techStack: ["SEMrush","Ahrefs","GSC","GA4","Hotjar","PageSpeed Insights","Optimizely","Schema.org","LLM Citation Trackers"],
    features: [
      "Technical SEO Audits",
      "Core Web Vitals & Speed Tuning",
      "Conversion Rate Optimization (CRO)",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "Structured Data & Schema",
      "LLM Citation Tracking",
      "Analytics & A/B Testing"
    ],
    faqs: [
      { question: "What's the difference between SEO, GEO, and AEO?", answer: "SEO targets Google search, GEO targets AI engines like Perplexity/ChatGPT, and AEO targets voice assistants and direct answer snippets. We optimize for all three." },
      { question: "How long does SEO take to show results?", answer: "Technical improvements show in 1-2 months. Content optimization takes 3-6 months. Competitive keywords can take 6-12 months." },
      { question: "What's included in your SEO audit?", answer: "We analyze technical health, site speed, mobile usability, backlinks, keyword rankings, content gaps, and competitor strategies." },
      { question: "Do you do content creation?", answer: "Yes, we create optimized blog posts, landing pages, and internal content designed for human readers and AI engines alike." }
    ],
    accent: "#6366F1",
    icon: "seo",
    sequence: ["Audit", "Optimize", "Rank"]
  }
];