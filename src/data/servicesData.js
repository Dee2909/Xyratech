export const SERVICES = [
  {
    id: 'web-dev',
    number: '01',
    title: 'Web Development',
    tagline: 'Modern, Scalable Websites & Web Platforms',
    category: 'Engineering',
    iconName: 'Globe',
    badge: 'Enterprise Performance',
    accentColor: '#3B82F6',
    description: 'We architect and build ultra-responsive, highly secure, and cloud-native web applications engineered for lightning-fast speeds and massive concurrent traffic.',
    capabilities: [
      'Custom React, Next.js & TypeScript Frontends',
      'Scalable Serverless & Microservice Architectures',
      'Enterprise API Integrations & High-Frequency WebSockets',
      'Core Web Vitals & Search Engine Performance Optimization',
      'E-commerce & Dynamic Headless CMS Engines'
    ],
    techStack: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind', 'GraphQL', 'AWS'],
    deliverables: 'Production-ready web platform, automated CI/CD pipeline, and full source code documentation.',
  },
  {
    id: 'app-dev',
    number: '02',
    title: 'Application Development',
    tagline: 'Android & iOS Application Development',
    category: 'Mobile Engineering',
    iconName: 'Smartphone',
    badge: 'Cross-Platform & Native',
    accentColor: '#6366F1',
    description: 'Native and hybrid mobile applications that provide intuitive user experiences, seamless offline synchronization, and frictionless store releases.',
    capabilities: [
      'Native iOS (Swift) & Android (Kotlin) Development',
      'Unified High-Performance Flutter & React Native Solutions',
      'Offline-First Local Storage & Secure Encrypted Database Sync',
      'Push Notification Workflows & Telemetry Monitoring',
      'App Store & Google Play Launch Management'
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'Fastlane'],
    deliverables: 'Production APK/IPA builds, App Store submission management, and mobile SDK integration.',
  },
  {
    id: 'ai-chatbot',
    number: '03',
    title: 'AI Chatbot Development',
    tagline: 'AI-Powered Chatbots, Assistants & Automation',
    category: 'Artificial Intelligence',
    iconName: 'Bot',
    badge: 'Autonomous AI',
    accentColor: '#8B5CF6',
    description: 'Custom generative AI chatbots, conversational workflows, and autonomous business process automation trained specifically on your company knowledge base.',
    capabilities: [
      'RAG (Retrieval-Augmented Generation) Knowledge Architectures',
      'Custom LLM Fine-Tuning & Multi-Turn Context Pipelines',
      'WhatsApp, Slack, Zendesk & CRM Omnichannel Integrations',
      'Automated Ticket Resolution & Autonomous Operations Agents',
      'Enterprise-Grade Data Privacy & SOC2 Isolated Deployments'
    ],
    techStack: ['OpenAI / Claude', 'LangChain', 'Python', 'Pinecone', 'FastAPI', 'Vector DBs'],
    deliverables: 'Trained AI assistant pipeline, embeddable conversational widget, and real-time analytics dashboard.',
  },
  {
    id: 'media-tech',
    number: '04',
    title: 'Media Tech Support',
    tagline: 'Creative & Technical Support for Digital Media',
    category: 'Creative Technology',
    iconName: 'Clapperboard',
    badge: 'Media Infrastructure',
    accentColor: '#0EA5E9',
    description: 'Technical infrastructure for modern digital media, live streaming distribution, content encoding pipelines, and digital asset management.',
    capabilities: [
      'Video Transcoding & Adaptive HLS/DASH Streaming Engines',
      'Audio Engineering & Sound Design Master Pipelines',
      'Automated Digital Asset Management (DAM) Infrastructure',
      'Live Event Broadcast & Hybrid Streaming Tech Operations',
      '3D Motion Graphics & Interactive Visual Asset Pipelines'
    ],
    techStack: ['FFmpeg', 'WebRTC', 'AWS MediaLive', 'Blender', 'DaVinci Resolve', 'Adobe CC'],
    deliverables: 'Optimized media delivery infrastructure, automated encoding profiles, and 24/7 technical broadcast support.',
  },
  {
    id: 'site-mgmt',
    number: '05',
    title: 'Site & Service Management',
    tagline: 'Maintenance, Monitoring, Hosting & Ongoing Support',
    category: 'Cloud & Reliability',
    iconName: 'ShieldCheck',
    badge: '99.99% Uptime SLA',
    accentColor: '#10B981',
    description: 'Proactive infrastructure maintenance, security patching, zero-downtime hosting, and continuous telemetry monitoring for business-critical platforms.',
    capabilities: [
      '24/7/365 Synthetic Uptime & Latency Telemetry Monitoring',
      'Automated Disaster Recovery & Geo-Distributed Backups',
      'Security Vulnerability Patching, SSL Governance & WAF Shielding',
      'Cloud Resource Optimization & Automated Auto-Scaling Policies',
      'Guaranteed 15-Minute Critical Incident DevOps Response'
    ],
    techStack: ['Kubernetes', 'Docker', 'AWS / GCP / Cloudflare', 'Terraform', 'Datadog', 'Prometheus'],
    deliverables: 'Real-time telemetry dashboard, monthly SLA audit reports, and emergency SRE response coverage.',
  },
  {
    id: 'data-analysis',
    number: '06',
    title: 'Data Analysis',
    tagline: 'Data Processing, Analytics, Visualization & Insights',
    category: 'Business Intelligence',
    iconName: 'BarChart3',
    badge: 'Actionable Intelligence',
    accentColor: '#3B82F6',
    description: 'Transform complex multi-source business data into actionable executive dashboards, predictive forecasting models, and revenue optimization insights.',
    capabilities: [
      'ETL & ELT Data Pipeline Architecture and Automation',
      'Executive BI Dashboards with Real-Time KPI Metrics',
      'Predictive Modeling, Retention Tracking & LTV Analytics',
      'Customer Funnel Segmentation & Conversion Drop-off Audits',
      'Automated Scheduled Financial & Operational Reports'
    ],
    techStack: ['Python', 'PostgreSQL', 'Snowflake', 'BigQuery', 'Tableau', 'PowerBI', 'Superset'],
    deliverables: 'Interactive executive dashboard suite, automated data ingestion pipelines, and monthly intelligence audit.',
  },
  {
    id: 'ad-shoots',
    number: '07',
    title: 'Ad Shoots',
    tagline: 'Product, Corporate, Promotional & Commercial Shoots',
    category: 'Creative Production',
    iconName: 'Camera',
    badge: 'Cinematic Visuals',
    accentColor: '#F59E0B',
    description: 'High-definition commercial video production, product photography, corporate leadership features, and branded promotional storytelling crafted to convert.',
    capabilities: [
      'Commercial 4K/8K Product & Lifestyle Cinematography',
      'Corporate Leadership & Brand Story Feature Films',
      'High-Resolution Studio Product Photography with 360 Spins',
      'Licensed Aerial Drone 4K Videography and Location Scans',
      'Full Post-Production: Color Grading, Sound Design & VFX'
    ],
    techStack: ['RED Cinema', 'Sony FX series', 'DJI Cine', 'Studio Lighting', 'DaVinci Studio'],
    deliverables: 'High-res master commercials, vertical 9:16 social cutdowns, raw footage archive, and print-ready stills.',
  },
  {
    id: 'digital-marketing',
    number: '08',
    title: 'Digital Marketing',
    tagline: 'Social Media, Online Marketing, Brand Growth & Campaigns',
    category: 'Growth Marketing',
    iconName: 'TrendingUp',
    badge: 'High-ROAS Scaling',
    accentColor: '#2563EB',
    description: 'Omnichannel performance marketing, customer acquisition campaigns, brand growth acceleration, and conversion rate optimization that scale revenue.',
    capabilities: [
      'Targeted High-Converting Meta, Google & LinkedIn Ad Campaigns',
      'Social Media Strategy, Content Systems & Audience Community Building',
      'Full-Funnel CRO Testing & Landing Page Conversion Optimization',
      'Strategic Creator & Brand Ambassador Growth Partnerships',
      'Transparent Weekly Attribution & ROAS Performance Reporting'
    ],
    techStack: ['Meta Ads Manager', 'Google Ads', 'TikTok Ads', 'HubSpot', 'Mixpanel', 'GA4'],
    deliverables: 'Live campaign performance portal, creative ad inventory, audience lookalike models, and weekly ROAS audits.',
  }
];

export const COMPANY_INFO = {
  name: 'XYRA TECH',
  tagline: 'Ideas • Technology • Growth',
  mission: 'Comprehensive Digital Solutions for a Connected Tomorrow',
  metrics: [
    { label: 'Uptime Reliability SLA', value: '99.99%' },
    { label: 'Enterprise Systems Delivered', value: '350+' },
    { label: 'Client Retention Rate', value: '98%' },
    { label: 'Critical Incident Response', value: '< 15m' },
  ],
  pillars: [
    {
      title: 'Ideas',
      subtitle: 'Conceptual Architecture',
      description: 'We deconstruct complex business challenges into clear, human-centric digital strategies and cutting-edge software blueprints.',
      color: '#3B82F6',
      icon: 'Lightbulb'
    },
    {
      title: 'Technology',
      subtitle: 'Engineered Precision',
      description: 'We build with robust modern tech stacks, AI automation pipelines, and resilient cloud architectures that scale without friction.',
      color: '#6366F1',
      icon: 'Cpu'
    },
    {
      title: 'Growth',
      subtitle: 'Compounding Impact',
      description: 'We accelerate your market reach through performance digital marketing, commercial ad shoots, and predictive data insights.',
      color: '#8B5CF6',
      icon: 'Rocket'
    }
  ]
};
