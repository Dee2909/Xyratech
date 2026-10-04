import React, { useState } from 'react';
import { Lightbulb, Cpu, Rocket, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/servicesData';
import SectionHeading from './SectionHeading';

export default function PositioningSection({ onGetStarted }) {
  const [activeTab, setActiveTab] = useState(0);

  const pillars = [
    {
      title: 'Ideas',
      lead: 'From Abstract Need to Architectural Blueprint',
      tagline: 'Strategic Conceptualization',
      icon: Lightbulb,
      description: 'Every great leap starts with architectural clarity. We dissect your enterprise objectives, identify systemic leverage points, and formulate technical roadmaps designed for rapid validation.',
      milestones: [
        'Domain Research & Systemic Feasibility Scoping',
        'Cloud Infrastructure & Security Architecture',
        'Interactive Figma Design Systems & User Journeys',
        'Technical MVP Scope Definition'
      ],
      metrics: '4x faster time-to-market validation'
    },
    {
      title: 'Technology',
      lead: 'Engineered for Infinite Resilience & Speed',
      tagline: 'Precision Cloud & AI Engineering',
      icon: Cpu,
      description: 'We build robust, cloud-native digital infrastructure. From native iOS/Android apps and high-throughput web platforms to fine-tuned RAG AI assistants and 24/7 site reliability.',
      milestones: [
        'React, Next.js & Native Swift/Kotlin Applications',
        'Custom RAG AI Chatbots & LLM Fine-Tuning Pipelines',
        '24/7 Uptime Telemetry & Automated Health Checks',
        'Encrypted Data Pipelines & Zero-Downtime CI/CD'
      ],
      metrics: '99.99% Guaranteed uptime reliability'
    },
    {
      title: 'Growth',
      lead: 'Compounding Market Dominance & Digital Reach',
      tagline: 'High-Impact Scale Engine',
      icon: Rocket,
      description: 'Engineering excellence meets commercial velocity. We accelerate customer acquisition through cinematic commercial ad shoots, full-funnel digital marketing, and predictive business analytics.',
      milestones: [
        'Cinematic 4K/8K Commercial & Product Shoots',
        'Omnichannel Performance Marketing (Meta & Google)',
        'Full-Funnel Data Analytics & Executive BI Dashboards',
        'Continuous Post-Launch SRE & Growth Optimization'
      ],
      metrics: '3.8x Average Return On Ad Spend (ROAS)'
    }
  ];

  return (
    <section id="positioning" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        {/* Main Positioning Header */}
        <SectionHeading
          eyebrow="XYRA TECH Positioning"
          title="Ideas • Technology • Growth"
          description="Comprehensive Digital Solutions for a Connected Tomorrow. We eliminate vendor fragmentation by unifying software engineering, AI automation, media production, and revenue marketing under one cohesive partner."
        />

        {/* Metric Counters Bar */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full">
          {COMPANY_INFO.metrics.map((m, i) => (
            <div key={i} className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.06)] hover:border-sky-200 transition-all text-center">
              <div className="text-3xl sm:text-5xl font-black text-sky-600 tracking-tight font-mono">
                {m.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-600 mt-2 uppercase tracking-wider font-bold">
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive 3-Pillar Architecture Explorer */}
        <div className="mt-12 bg-white border border-slate-200 rounded-[2.35rem] p-6 sm:p-10 lg:p-12 shadow-[0_24px_80px_rgba(15,23,42,0.08)] w-full">
          {/* Stage Selector Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-100">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all ${
                      isActive 
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 font-bold' 
                        : 'text-slate-600 hover:text-sky-700 hover:bg-sky-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{pillar.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>CONTINUOUS EXECUTION LIFECYCLE</span>
            </div>
          </div>

          {/* Selected Pillar Content */}
          <div className="pt-8 sm:pt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-700">
                {pillars[activeTab].tagline}
              </span>
              
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-display">
                {pillars[activeTab].lead}
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
                {pillars[activeTab].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {pillars[activeTab].milestones.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-sky-50/60 p-3.5 rounded-2xl border border-sky-100">
                    <Check className="w-4 h-4 shrink-0 text-sky-600 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onGetStarted}
                  className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center gap-2 shadow-md shadow-sky-500/25"
                >
                  <span>Initiate {pillars[activeTab].title} Phase</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  ✦ {pillars[activeTab].metrics}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-sky-50/70 rounded-3xl p-6 sm:p-8 border border-sky-100 space-y-5 shadow-sm">
              <div className="text-xs font-mono text-slate-600 flex items-center justify-between pb-3 border-b border-sky-200/80">
                <span className="font-bold">SYSTEM CAPABILITY METRICS</span>
                <span className="text-emerald-700 font-bold">ALL TIERS ACTIVE</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1 font-semibold">
                    <span>Architecture Completeness</span>
                    <span className="font-mono text-sky-700 font-bold">98%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-600 rounded-full w-[98%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1 font-semibold">
                    <span>Cloud Response Latency</span>
                    <span className="font-mono text-sky-700 font-bold">&lt; 15ms</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full w-[94%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-700 mb-1 font-semibold">
                    <span>Client ROAS Velocity</span>
                    <span className="font-mono text-sky-700 font-bold">3.8x Target</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-[90%]" />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-sky-200/80 flex items-center gap-3 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Full compliance with SOC2, GDPR & high-concurrency cloud standards.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
