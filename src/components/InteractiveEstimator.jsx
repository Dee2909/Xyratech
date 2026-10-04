import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Clock, Shield, Sliders } from 'lucide-react';
import { SERVICES } from '../data/servicesData';

import SectionHeading from './SectionHeading';

export default function InteractiveEstimator({ onSelectServicesForBooking, preselectedServiceId }) {
  const [selectedServices, setSelectedServices] = useState(
    preselectedServiceId ? [preselectedServiceId] : ['web-dev', 'ai-chatbot']
  );
  const [projectScale, setProjectScale] = useState('growth');
  const [timeline, setTimeline] = useState('standard');

  const toggleService = (id) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const estimates = useMemo(() => {
    const serviceCount = selectedServices.length;

    let baseWeeks = serviceCount * 2.5;
    if (projectScale === 'mvp') baseWeeks *= 0.65;
    if (projectScale === 'enterprise') baseWeeks *= 1.45;

    if (timeline === 'fast') baseWeeks *= 0.75;
    if (timeline === 'scale') baseWeeks *= 1.25;

    const weeks = Math.max(2, Math.round(baseWeeks));

    const milestones = [];
    if (selectedServices.includes('web-dev') || selectedServices.includes('app-dev')) {
      milestones.push('UI/UX System Architecture & High-Fidelity Prototypes');
      milestones.push('Cloud Backend, Microservices & API Engineering');
    }
    if (selectedServices.includes('ai-chatbot')) {
      milestones.push('LLM Domain Knowledge Vector Ingestion & Fine-Tuning');
    }
    if (selectedServices.includes('media-tech') || selectedServices.includes('ad-shoots')) {
      milestones.push('Cinematic Production, 4K Footage Mastering & Transcoding');
    }
    if (selectedServices.includes('data-analysis')) {
      milestones.push('Automated ETL Pipeline & BI Executive Dashboards');
    }
    if (selectedServices.includes('digital-marketing') || selectedServices.includes('site-mgmt')) {
      milestones.push('Multi-Channel Ad Launch & 24/7 SRE Monitoring Setup');
    }

    return {
      weeks,
      milestones: milestones.slice(0, 5),
      sla: projectScale === 'enterprise' ? '99.99% Tier-1 SLA' : '99.9% Production SLA',
    };
  }, [selectedServices, projectScale, timeline]);

  return (
    <section id="estimator" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow="Interactive Project Scope Builder"
          title="Configure Your Scope & Timeline"
          description="Select the exact services required for your upcoming milestone. Get an instant roadmap preview and technical delivery scope."
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-8 bg-white p-5 sm:p-8 rounded-3xl border border-sky-100 shadow-[0_10px_35px_-5px_rgba(14,165,233,0.08)]">
          {/* Step 1: Services Selection */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
                1. Select Services
              </span>
              <button 
                onClick={() => setSelectedServices(SERVICES.map(s => s.id))}
                className="text-xs font-mono text-sky-600 hover:text-sky-700 font-semibold hover:underline"
              >
                Select All
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => {
                const isSelected = selectedServices.includes(s.id);
                return (
                  <button
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-sm'
                        : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:border-sky-300'
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isSelected ? 'bg-sky-600 text-white' : 'bg-white border border-slate-300 text-transparent'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 leading-tight">
                        {s.title}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {s.tagline}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Project Scale */}
          <div>
            <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-3">
              2. Project Scale & Stage
            </span>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { id: 'mvp', title: 'Startup MVP', desc: 'Fast validation' },
                { id: 'growth', title: 'Growth Scale', desc: 'Robust stack' },
                { id: 'enterprise', title: 'Enterprise', desc: 'Global reach' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setProjectScale(item.id)}
                  className={`p-3 sm:p-3.5 rounded-2xl text-left border transition-all ${
                    projectScale === item.id
                      ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-md shadow-sky-500/20'
                      : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className={`text-xs sm:text-sm font-bold ${projectScale === item.id ? 'text-white' : 'text-slate-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-[10px] sm:text-[11px] mt-0.5 hidden sm:block ${projectScale === item.id ? 'text-sky-100' : 'text-slate-500'}`}>
                    {item.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Deployment Pace */}
          <div>
            <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block mb-3">
              3. Delivery Velocity
            </span>
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { id: 'fast', title: 'Sprint', badge: 'High Priority' },
                { id: 'standard', title: 'Standard', badge: 'Recommended' },
                { id: 'scale', title: 'Long-Term', badge: 'Flexible' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTimeline(item.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    timeline === item.id
                      ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-sm'
                      : 'bg-slate-50/60 border-slate-200 text-slate-700 hover:border-sky-300'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{item.title}</div>
                  <div className="text-[10px] text-sky-600 font-mono mt-0.5 font-medium">{item.badge}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Estimation Output Card */}
        <div className="lg:col-span-5 bg-white p-5 sm:p-8 rounded-3xl border border-sky-200 shadow-[0_15px_35px_-5px_rgba(14,165,233,0.12)] relative lg:sticky lg:top-28 space-y-6 w-full">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-mono text-sky-600 font-bold uppercase tracking-wider">
                ESTIMATED TIMELINE & BLUEPRINT
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Scope Synthesis</h3>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
              <Calculator className="w-5 h-5" />
            </div>
          </div>

          {/* Key Metric Highlights */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>TIMELINE</span>
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono">
                ~{estimates.weeks} Weeks
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-1">
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span>SUPPORT TIER</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {estimates.sla}
              </div>
            </div>
          </div>

          {/* Selected Services Tags */}
          <div>
            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider block mb-2 font-medium">
              Selected Capabilities ({selectedServices.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {selectedServices.map(id => {
                const s = SERVICES.find(x => x.id === id);
                if (!s) return null;
                return (
                  <span 
                    key={id}
                    className="text-xs px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 border border-sky-200 font-medium"
                  >
                    {s.title}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <span className="text-xs font-mono text-slate-600 uppercase tracking-wider block mb-3 font-medium">
              Key Delivery Milestones:
            </span>
            <div className="space-y-2">
              {estimates.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[10px] font-mono shrink-0">
                    {idx + 1}
                  </div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onSelectServicesForBooking(selectedServices)}
            className="w-full py-4 px-6 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
          >
            <span>Lock In Scope & Book Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-[11px] text-center text-slate-500 font-mono">
            Zero commitment • 100% confidential NDA included • Senior architect review
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
