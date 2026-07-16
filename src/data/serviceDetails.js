export const serviceDetails = {
  "web-development": {
    overview: [
      "We design and build websites that don't just look beautiful — they perform. Whether you need a Shopify store that converts browsers into buyers, a Wix Studio site that's easy for your team to manage, a Framer prototype that impresses investors, or a custom Next.js application that scales to millions of users, we have the expertise to deliver.",
      "Every site we build is engineered for speed, SEO, and conversion from day one. We handle everything from initial design and user experience to development, deployment, and ongoing optimization — so your website becomes an asset, not a liability.",
    ],
    capabilities: [
      { icon: "shopping-bag", title: "Shopify E-commerce", description: "Custom Shopify stores with optimized checkout flows, product pages, and conversion-focused design." },
      { icon: "layers", title: "Wix & Wix Studio", description: "Professional Wix websites with custom layouts, animations, and full CMS control for your team." },
      { icon: "pen-tool", title: "Framer Design", description: "Interactive Framer sites with scroll animations, smart components, and premium visual design." },
      { icon: "rocket", title: "GoHighLevel", description: "Sales funnels, landing pages, and automation pipelines built on the GoHighLevel platform." },
      { icon: "code", title: "Next.js & React", description: "Custom web applications built with Next.js and React for maximum performance, SEO, and scalability." },
      { icon: "globe", title: "Custom Development", description: "Bespoke web solutions engineered from the ground up for your unique business requirements." },
    ],
    faq: [
      { question: "Which platform should I choose for my website?", answer: "It depends on your goals. Shopify is ideal for e-commerce, Wix Studio for content-heavy sites with easy management, Framer for design-forward landing pages, and Next.js/React for custom applications that need to scale. We'll help you choose the right platform during our initial consultation." },
      { question: "How long does a typical web project take?", answer: "Timelines vary by scope. A Shopify or Wix site typically takes 2-4 weeks, a Framer design project 1-3 weeks, and a custom Next.js application 6-12 weeks. We provide a detailed timeline after our discovery call." },
      { question: "Do you provide ongoing maintenance?", answer: "Yes. We offer maintenance packages that include security updates, performance monitoring, content updates, and technical support for all websites we build." },
      { question: "Will my website be SEO-optimized?", answer: "Absolutely. Every site we build follows SEO best practices — semantic HTML, optimized meta tags, fast load times, mobile responsiveness, and structured data. We also offer ongoing SEO services for continued growth." },
    ],
    techStack: ["Next.js", "React", "Shopify", "Wix Studio", "Framer", "GoHighLevel", "Tailwind CSS", "Vercel", "TypeScript"],
  },
  "mobile-apps": {
    overview: [
      "We build mobile applications that people genuinely want to use. From iOS and Android apps to Play Store games, we handle the entire lifecycle — from concept and UI/UX design through development, testing, and store deployment.",
      "Our apps are built with performance, user experience, and scalability in mind. Whether you're launching an MVP to validate an idea or scaling to hundreds of thousands of users, we engineer apps that are fast, reliable, and beautiful on every device.",
    ],
    capabilities: [
      { icon: "smartphone", title: "iOS Development", description: "Native and cross-platform iOS apps built with Swift and React Native for the App Store." },
      { icon: "gamepad2", title: "Android Games", description: "Engaging Android games for the Play Store with smooth gameplay, monetization, and analytics." },
      { icon: "store", title: "Store Deployment", description: "Full App Store and Google Play deployment including listing optimization and review handling." },
      { icon: "search", title: "App Store Optimization", description: "ASO strategies to maximize visibility and downloads in the App Store and Google Play." },
      { icon: "bell", title: "Push Notifications", description: "Targeted push notification systems for user engagement and retention." },
      { icon: "download", title: "In-App Purchases", description: "Monetization through in-app purchases, subscriptions, and ad integrations." },
    ],
    faq: [
      { question: "Do you build for both iOS and Android?", answer: "Yes. We build native apps for both platforms using Swift (iOS) and Kotlin (Android), as well as cross-platform apps using React Native for faster development and shared codebases." },
      { question: "Can you build mobile games?", answer: "Absolutely. We develop Android games for the Google Play Store using industry-standard game engines and frameworks, handling everything from gameplay mechanics to monetization." },
      { question: "How do you handle app store submissions?", answer: "We manage the entire submission process — preparing store listings, screenshots, descriptions, privacy policies, and handling the review process for both the App Store and Google Play." },
      { question: "What's the typical cost of a mobile app?", answer: "App costs vary widely based on complexity. A simple MVP might start at $15K-$25K, while a full-featured app with backend infrastructure can range from $50K-$150K+. We provide detailed estimates after understanding your requirements." },
    ],
    techStack: ["React Native", "Swift", "Kotlin", "Firebase", "Redux", "Expo", "Fastlane"],
  },
  "saas-applications": {
    overview: [
      "We build SaaS platforms that are production-ready from day one. From multi-tenant architecture and subscription billing to admin dashboards and API design, we handle the full stack of SaaS engineering.",
      "Our SaaS applications are built to scale — secure, performant, and maintainable. We've shipped platforms that handle thousands of concurrent users, process millions of transactions, and integrate with dozens of third-party services.",
    ],
    capabilities: [
      { icon: "building2", title: "Multi-Tenant Architecture", description: "Scalable multi-tenant infrastructure with data isolation, tenant management, and resource optimization." },
      { icon: "credit-card", title: "Subscription Billing", description: "Stripe and payment gateway integration with subscription management, invoicing, and dunning." },
      { icon: "layout-dashboard", title: "Admin Dashboards", description: "Comprehensive admin panels with user management, analytics, and operational controls." },
      { icon: "database", title: "API Design", description: "REST and GraphQL APIs with authentication, rate limiting, documentation, and SDKs." },
      { icon: "lock", title: "Security & Access Control", description: "Role-based access control, audit logging, data encryption, and compliance-ready security." },
      { icon: "cloud", title: "Cloud Infrastructure", description: "AWS, GCP, and Azure deployment with auto-scaling, monitoring, and CI/CD pipelines." },
    ],
    faq: [
      { question: "Can you build a SaaS platform from scratch?", answer: "Yes. We handle full-stack SaaS development from architecture and design through deployment and scaling. We build the entire system — frontend, backend, database, APIs, billing, and infrastructure." },
      { question: "What technologies do you use for SaaS?", answer: "We typically use Next.js or React for the frontend, Node.js or Python for the backend, PostgreSQL or MongoDB for databases, and deploy on AWS, GCP, or Vercel. We choose the stack based on your specific requirements." },
      { question: "Do you handle payment integration?", answer: "Yes. We integrate Stripe, PayPal, and other payment gateways with full subscription management, invoicing, tax handling, and dunning workflows." },
      { question: "How do you ensure the platform scales?", answer: "We design for scale from the start — multi-tenant architecture, horizontal scaling, caching strategies, database optimization, and cloud infrastructure with auto-scaling. We also set up monitoring and alerting to catch issues before users do." },
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS", "Docker", "GraphQL", "Redis", "Terraform"],
  },
  "pos-software": {
    overview: [
      "We build custom point-of-sale systems that streamline operations for retail stores, restaurants, and service businesses. From inventory management and payment processing to employee tracking and real-time reporting, our POS software is fast, reliable, and built for your specific workflow.",
      "Unlike off-the-shelf POS systems, our custom solutions integrate seamlessly with your existing infrastructure — accounting software, e-commerce platforms, CRM, and hardware. They work online and offline, so your business never stops.",
    ],
    capabilities: [
      { icon: "package", title: "Inventory Management", description: "Real-time stock tracking, automatic reorder points, barcode scanning, and multi-location inventory." },
      { icon: "receipt", title: "Sales & Payments", description: "Payment processing with support for cash, card, mobile wallets, and split transactions." },
      { icon: "users", title: "Employee Management", description: "Staff scheduling, role-based permissions, commission tracking, and performance metrics." },
      { icon: "bar-chart3", title: "Real-Time Reporting", description: "Live sales dashboards, profit analysis, inventory reports, and customizable business intelligence." },
      { icon: "hard-drive", title: "Hardware Integration", description: "Integration with receipt printers, barcode scanners, cash drawers, and customer displays." },
      { icon: "map-pin", title: "Multi-Location", description: "Centralized management across multiple locations with consolidated reporting and sync." },
    ],
    faq: [
      { question: "Can your POS system work offline?", answer: "Yes. Our POS systems include offline mode with local data storage. When connectivity is restored, transactions automatically sync to the cloud. Your business keeps running even during internet outages." },
      { question: "What hardware do you support?", answer: "We integrate with all major POS hardware — receipt printers (Epson, Star), barcode scanners, cash drawers, customer displays, and card terminals. We can also recommend hardware bundles for new setups." },
      { question: "Can you integrate with my existing accounting software?", answer: "Yes. We build integrations with QuickBooks, Xero, Sage, and other accounting platforms so your sales data flows directly into your books without manual entry." },
      { question: "Do you build POS for specific industries?", answer: "We build POS systems for retail, restaurants, cafes, salons, and service businesses. Each system is customized for the specific workflows, reporting needs, and compliance requirements of your industry." },
    ],
    techStack: ["Electron", "React", "Node.js", "PostgreSQL", "SQLite", "Stripe Terminal", "WebSocket"],
  },
  "financial-services": {
    overview: [
      "We provide professional accounting and tax services that keep your finances accurate, compliant, and optimized. From corporate tax filing and personal tax preparation to bookkeeping and financial auditing, our certified team handles the numbers so you can focus on your business.",
      "Whether you're a startup navigating your first tax season or an established business with complex financial needs, we offer the expertise and personalized service of a dedicated finance department — without the overhead of a full-time team.",
    ],
    capabilities: [
      { icon: "file-text", title: "Corporate Tax Filing", description: "Accurate, timely corporate tax returns with deduction optimization and compliance assurance." },
      { icon: "calculator", title: "Personal Tax Preparation", description: "Individual tax filing for all income types, including self-employment, investments, and rental income." },
      { icon: "book-open", title: "Bookkeeping", description: "Monthly bookkeeping with categorization, reconciliation, and financial statement preparation." },
      { icon: "shield-check", title: "Financial Auditing", description: "Comprehensive financial audits to verify accuracy, ensure compliance, and identify risk areas." },
      { icon: "trending-up", title: "Tax Planning", description: "Proactive tax strategies to minimize liability and maximize deductions throughout the year." },
      { icon: "scale", title: "Compliance & Advisory", description: "Regulatory compliance, payroll management, and ongoing financial advisory services." },
    ],
    faq: [
      { question: "Do you handle both corporate and personal taxes?", answer: "Yes. We provide full corporate tax filing for businesses and personal tax preparation for individuals, including sole proprietors, freelancers, and business owners with complex tax situations." },
      { question: "What industries do you specialize in?", answer: "We work with businesses across technology, retail, e-commerce, hospitality, professional services, and real estate. Our team understands the unique tax considerations and compliance requirements of each industry." },
      { question: "How does your bookkeeping service work?", answer: "We provide monthly bookkeeping with transaction categorization, bank reconciliation, and financial statement preparation. You'll receive monthly reports showing your profit & loss, balance sheet, and cash flow position." },
      { question: "Can you help with tax planning before year-end?", answer: "Absolutely. Tax planning is most effective when done proactively. We offer year-round tax strategy sessions to identify deductions, timing opportunities, and structural changes that minimize your tax liability." },
    ],
    techStack: ["QuickBooks", "Xero", "Sage", "TurboTax Pro", "Excel", "Gusto"],
  },
  "cyber-security": {
    overview: [
      "We protect your business from cyber threats with comprehensive security services. From vulnerability assessments and penetration testing to security audits and ongoing monitoring, we identify weaknesses before attackers do and build defenses that hold.",
      "Our approach is proactive, not reactive. We don't just find problems — we fix them. Every engagement includes detailed remediation guidance, and we can implement the security controls, monitoring systems, and training programs needed to keep your business protected long-term.",
    ],
    capabilities: [
      { icon: "bug", title: "Penetration Testing", description: "Simulated cyber attacks that identify exploitable vulnerabilities before real attackers find them." },
      { icon: "scan-line", title: "Vulnerability Assessments", description: "Comprehensive scans of your infrastructure, applications, and network for known vulnerabilities." },
      { icon: "network", title: "Security Audits", description: "Full security audits covering policies, access controls, data protection, and compliance readiness." },
      { icon: "lock", title: "Data Protection", description: "Encryption, access control, and data loss prevention strategies to protect sensitive information." },
      { icon: "eye", title: "24/7 Monitoring", description: "Continuous security monitoring with real-time alerts and incident response capabilities." },
      { icon: "alert-triangle", title: "Incident Response", description: "Rapid response planning and execution for security incidents, breaches, and data compromises." },
    ],
    faq: [
      { question: "What is penetration testing?", answer: "Penetration testing is a controlled, simulated cyber attack on your systems to identify security vulnerabilities that real attackers could exploit. We use the same tools and techniques as malicious hackers — but ethically, and with your permission — to find and fix weaknesses before they're exploited." },
      { question: "How often should we have security assessments?", answer: "We recommend annual comprehensive security assessments at minimum, with quarterly vulnerability scans. Critical infrastructure, applications handling sensitive data, or systems with frequent changes should be assessed more frequently." },
      { question: "Do you provide ongoing security monitoring?", answer: "Yes. We offer 24/7 security monitoring services with real-time threat detection, alerting, and incident response. Our monitoring covers network traffic, application security, access patterns, and system integrity." },
      { question: "Can you help with compliance requirements?", answer: "Absolutely. We help businesses achieve and maintain compliance with SOC 2, GDPR, HIPAA, PCI DSS, and other regulatory frameworks. Our audits identify gaps, and we provide remediation guidance to close them." },
    ],
    techStack: ["Burp Suite", "Metasploit", "Nmap", "Wireshark", "OWASP ZAP", "Splunk", "Cloudflare"],
  },
};