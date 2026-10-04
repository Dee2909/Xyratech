import React from 'react';
import { Award, Star } from 'lucide-react';
import SectionHeading from './SectionHeading';

const CASE_STUDIES = [
  {
    industry: 'FinTech & Wealth Management',
    serviceTags: ['Web Development', 'AI Chatbot Development', 'Site Management'],
    headline: 'High-Frequency Trading Web Portal & Compliance AI Assistant',
    impact: '99.999% uptime achieved with 68% decrease in Tier-1 support tickets via custom RAG assistant.',
    metric: '4.2x Faster Onboarding',
    author: 'Chief Technology Officer',
    company: 'Apex Global Financial'
  },
  {
    industry: 'Omnichannel E-Commerce',
    serviceTags: ['Application Development', 'Ad Shoots', 'Digital Marketing'],
    headline: 'Native Mobile Shopping App & 8K Product Ad Campaign',
    impact: 'Launched unified Flutter application paired with cinematic commercial film cuts, scaling ROAS to 4.6x.',
    metric: '+320% Revenue Velocity',
    author: 'VP of Growth & Brand',
    company: 'Aura Lifestyle Group'
  },
  {
    industry: 'Healthcare & Telemedicine',
    serviceTags: ['Data Analysis', 'Site Management', 'AI Chatbot'],
    headline: 'HIPAA-Compliant Patient Telemetry Pipeline & Diagnostics Assistant',
    impact: 'Engineered predictive readmission model and triage conversational workflow with zero data leaks.',
    metric: '< 15ms Query Latency',
    author: 'Head of Clinical Informatics',
    company: 'PulseCare Health Systems'
  }
];

export default function ClientImpact() {
  return (
    <section id="impact" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow="Proven Client Results"
          title="Engineered for Tangible Growth"
          description="From venture-backed disruptors to global enterprises, here is how our integrated 8 services deliver compounded business impact."
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {CASE_STUDIES.map((study, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-[2rem] bg-white border border-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.06)] hover:shadow-[0_32px_90px_rgba(14,165,233,0.12)] hover:border-sky-300 flex flex-col justify-between transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-sky-800 font-semibold px-2.5 py-1 rounded-md bg-sky-50 border border-sky-200">
                    {study.industry}
                  </span>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {study.serviceTags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors mb-3 leading-snug font-display">
                  "{study.headline}"
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-body">
                  {study.impact}
                </p>
              </div>

              <div className="pt-5 border-t border-slate-100">
                <div className="text-xl sm:text-2xl font-black text-sky-600 font-mono mb-1">
                  {study.metric}
                </div>
                <div className="text-xs text-slate-800 font-semibold">{study.author}</div>
                <div className="text-[11px] text-slate-500">{study.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
