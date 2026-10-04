import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Cpu, Cloud, Film, Code, Sparkles, Terminal, 
  Layers, CheckCircle2, ArrowUpRight, Zap, Shield, 
  Server, Database, Activity, Gauge
} from 'lucide-react';
import SectionHeading from './SectionHeading';

const TECH_DOMAINS = [
  {
    id: 'frontend-mobile',
    title: 'Frontend & Native Mobile',
    tagline: 'High-Concurrency Client Layer',
    icon: Code,
    color: '#0284C7',
    summary: 'Ultra-responsive reactive user interfaces and native mobile apps engineered for 60fps performance and offline synchronization.',
    technologies: [
      { name: 'React 19', badge: 'Frontend Core', description: 'Concurrent rendering, Server Actions & ultra-fast DOM reconciliations.', metric: '< 0.8s First Contentful Paint' },
      { name: 'Next.js 15', badge: 'Fullstack SSR', description: 'Edge runtime, hybrid SSG/ISR, and automated route prefetching.', metric: 'Sub-second TTFB' },
      { name: 'TypeScript', badge: 'Type Safety', description: '100% static type enforcement with zero runtime exceptions.', metric: 'Strict Null Checks' },
      { name: 'Flutter', badge: 'Cross-Platform', description: '60fps compiled iOS & Android applications from a unified codebase.', metric: 'Single Codebase' },
      { name: 'Swift (iOS)', badge: 'Native iOS', description: 'Deep Apple Metal graphics acceleration & SwiftUI native fidelity.', metric: 'App Store Certified' },
      { name: 'Kotlin (Android)', badge: 'Native Android', description: 'Jetpack Compose native UI with asynchronous coroutines.', metric: 'Play Store Optimized' },
      { name: 'Tailwind CSS', badge: 'Design System', description: 'Utility-first tokens ensuring consistent component architectures.', metric: 'Zero Runtime CSS' },
      { name: 'Three.js / WebGL', badge: '3D Graphics', description: 'Hardware-accelerated 3D scenes, shaders, and spatial visualizers.', metric: '60fps GPU Pipeline' }
    ]
  },
  {
    id: 'ai-data',
    title: 'Autonomous AI & Vector Intelligence',
    tagline: 'Enterprise Reasoning Engines',
    icon: Sparkles,
    color: '#0EA5E9',
    summary: 'Fine-tuned LLM reasoning pipelines, private RAG knowledge vector embeddings, and predictive intelligence dashboards.',
    technologies: [
      { name: 'LangChain & LlamaIndex', badge: 'Agent Orchestration', description: 'Multi-agent reasoning loops, deterministic tool routing & memory.', metric: 'Automated Tool Calling' },
      { name: 'Claude 3.7 & OpenAI', badge: 'Foundation LLMs', description: 'State-of-the-art conversational intelligence and complex synthesis.', metric: 'Sub-second Streaming' },
      { name: 'Pinecone & Milvus', badge: 'Vector Search DB', description: 'Sub-10ms similarity search over millions of high-dimensional embeddings.', metric: '< 10ms Query Latency' },
      { name: 'Python & FastAPI', badge: 'AI Microservices', description: 'Asynchronous ASGI endpoints for high-throughput model inferencing.', metric: '10k+ req/sec ASGI' },
      { name: 'PyTorch', badge: 'Model Fine-Tuning', description: 'Custom LoRA fine-tuning pipelines tailored to proprietary enterprise data.', metric: 'Domain Fine-Tuned' },
      { name: 'Snowflake & BigQuery', badge: 'Cloud Warehouses', description: 'Petabyte-scale distributed SQL processing and automated ETL ingestion.', metric: 'Petabyte Scalability' },
      { name: 'Tableau & PowerBI', badge: 'Executive BI', description: 'Automated KPI telemetry and live revenue attribution dashboards.', metric: 'Real-time KPI Sync' },
      { name: 'Pandas & NumPy', badge: 'Data Pipelines', description: 'High-speed tabular vectorization and automated financial reconciliation.', metric: 'Automated ETL' }
    ]
  },
  {
    id: 'cloud-infrastructure',
    title: 'Cloud Infrastructure & SRE',
    tagline: '99.99% Guaranteed Reliability',
    icon: Cloud,
    color: '#0284C7',
    summary: 'Resilient multi-cloud container orchestration, geo-distributed failovers, and synthetic 24/7 observability telemetry.',
    technologies: [
      { name: 'AWS Cloud', badge: 'Compute & S3', description: 'Global multi-AZ infrastructure, Lambda serverless & S3 data lakes.', metric: '99.999% Durability' },
      { name: 'Google Cloud Platform', badge: 'Enterprise AI & Vertex', description: 'Kubernetes Engine (GKE) and Vertex AI distributed model pipelines.', metric: 'Tier-1 Network' },
      { name: 'Kubernetes (K8s)', badge: 'Container Cluster', description: 'Automated horizontal pod auto-scaling and zero-downtime rolling updates.', metric: 'Zero-Downtime Rollouts' },
      { name: 'Docker', badge: 'Containerization', description: 'Lightweight reproducible multi-stage production container images.', metric: 'Reproducible Builds' },
      { name: 'Terraform', badge: 'Infrastructure as Code', description: 'Declarative immutable cloud architecture provisioned via GitOps.', metric: 'Immutable GitOps' },
      { name: 'Cloudflare Zero Trust', badge: 'Edge & WAF Defense', description: 'Global Anycast CDN caching and enterprise DDoS mitigation.', metric: '< 12ms Edge Latency' },
      { name: 'Datadog & Prometheus', badge: 'Observability', description: 'Synthetic telemetry, latency heatmaps, and automated incident alerts.', metric: '< 15m Incident SLA' },
      { name: 'PostgreSQL & Redis', badge: 'High-Speed Storage', description: 'ACID transactional integrity paired with microsecond in-memory caching.', metric: 'Microsecond Caching' }
    ]
  },
  {
    id: 'creative-growth',
    title: 'Production Media & Growth Marketing',
    tagline: 'Cinematic High-ROAS Engine',
    icon: Film,
    color: '#0EA5E9',
    summary: 'Cinema-grade 8K commercial video capture, aerial drone cinematography, and data-driven performance customer acquisition.',
    technologies: [
      { name: 'RED Cinema & Sony FX', badge: '8K Master Video', description: 'Cinema-grade large-format sensors capturing high-dynamic-range commercials.', metric: '8K RAW Mastering' },
      { name: 'DJI Pro Cine', badge: 'Aerial Cinematography', description: 'Licensed 4K drone cinematography for corporate facilities & commercials.', metric: '4K ProRes / D-Log' },
      { name: 'DaVinci Resolve Studio', badge: 'Color & Sound', description: 'Hollywood-standard color grading, Fairlight audio mastering & mastering.', metric: 'Rec.2020 / HDR10' },
      { name: 'Blender & Unreal Engine', badge: '3D VFX & Motion', description: 'Photorealistic product 3D rendering and cinematic CGI motion graphics.', metric: 'Photorealistic CGI' },
      { name: 'Meta Ads Manager', badge: 'Paid Acquisition', description: 'Algorithmic performance ad campaigns across Instagram, Facebook & WhatsApp.', metric: '3.8x - 4.6x ROAS' },
      { name: 'Google Ads & YouTube', badge: 'Intent Search', description: 'High-intent search, Performance Max, and commercial YouTube video campaigns.', metric: 'High-Intent Reach' },
      { name: 'TikTok Ads Manager', badge: 'Viral Discovery', description: 'Short-form vertical commercial video targeting high-velocity demographics.', metric: 'Viral Engagement' },
      { name: 'Figma Enterprise', badge: 'Design System', description: 'Collaborative UI/UX design libraries, interactive prototypes & design tokens.', metric: 'Pixel-Perfect Handoff' }
    ]
  }
];

export default function TechStackSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeDomainIndex, setActiveDomainIndex] = useState(0);
  const [selectedTech, setSelectedTech] = useState(TECH_DOMAINS[0].technologies[0]);

  const activeDomain = TECH_DOMAINS[activeDomainIndex];

  return (
    <section id="tech-stack" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full bg-slate-50/40">
      <div className="mx-auto max-w-[1800px]">
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Technology Ecosystem"
          title="Engineered with World-Class Stacks"
          description="We do not experiment with unproven tools. Every framework and infrastructure layer is battle-tested for enterprise scale, sub-second latency, and guaranteed uptime."
        />

        {/* Live Cloud Telemetry Ticker */}
        <div className="mt-12 p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_15px_35px_rgba(15,23,42,0.04)] grid grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 border-r border-slate-100 last:border-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Global CDN</p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 font-display">&lt; 12ms Edge Latency</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 border-r border-slate-100 last:border-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 font-bold">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Concurrency</p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 font-display">120k+ req/sec</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5 border-r border-slate-100 last:border-0">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 font-bold">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Compliance</p>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 font-display">SOC2 & GDPR Ready</p>
            </div>
          </div>

          <div className="flex items-center gap-3 px-3 sm:px-4 py-1.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100 font-bold">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">Uptime SLA</p>
              <p className="text-sm sm:text-base font-extrabold text-sky-600 font-display">99.99% Guaranteed</p>
            </div>
          </div>
        </div>

        {/* 4 Architectural Domain Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {TECH_DOMAINS.map((domain, index) => {
            const Icon = domain.icon;
            const isActive = activeDomainIndex === index;

            return (
              <button
                key={domain.id}
                onClick={() => {
                  setActiveDomainIndex(index);
                  setSelectedTech(domain.technologies[0]);
                }}
                className={`flex items-center gap-2.5 px-5 sm:px-7 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-500/25 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-sky-700 hover:bg-sky-50/80 border border-slate-200/90 shadow-sm'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                <span>{domain.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Domain Overview & Interactive Grid */}
        <div className="mt-10 bg-white border border-slate-200/90 rounded-[2.35rem] p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          {/* Header of Active Tier */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                  {activeDomain.tagline}
                </span>
                <span className="text-xs text-slate-400 font-mono">• Production Tier</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-display">
                {activeDomain.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed font-body">
                {activeDomain.summary}
              </p>
            </div>

            <div className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-600 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CI/CD PIPELINE VERIFIED</span>
            </div>
          </div>

          {/* Technology Cards Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {activeDomain.technologies.map((tech) => {
              const isSelected = selectedTech.name === tech.name;

              return (
                <div
                  key={tech.name}
                  onClick={() => setSelectedTech(tech)}
                  className={`group relative cursor-pointer rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-sky-50/50 border-sky-400 shadow-md ring-2 ring-sky-400/20'
                      : 'bg-white hover:bg-slate-50/60 border-slate-200/90 hover:border-sky-200 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
                        {tech.badge}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                        {tech.metric}
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                      {tech.name}
                    </h4>

                    <p className="mt-2 text-xs text-slate-600 leading-relaxed font-body">
                      {tech.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 group-hover:text-sky-600 transition-colors">
                    <span>Verified Production</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Inspector Box for Selected Tech */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-sky-50 via-white to-sky-50/30 border border-sky-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-sky-500/25 shrink-0">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-950 font-display">
                    {selectedTech.name}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                    {selectedTech.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Production Standard: <strong className="text-sky-700">{selectedTech.metric}</strong>. Built and certified directly by XYRA TECH's core engineering group.
                </p>
              </div>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-sky-600 text-slate-800 hover:text-white border border-slate-200 hover:border-sky-600 font-bold text-xs transition-all shadow-sm shrink-0"
            >
              <span>Build With This Stack</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
