import React, { useState, useMemo } from 'react';
import { X, Check, Calculator, Clock, Shield, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { sound } from '../utils/audio';

export default function SpatialEstimatorModal({ onClose, onProceedToBooking }) {
  const [selectedServices, setSelectedServices] = useState(['web-dev', 'ai-chatbot']);
  const [projectScale, setProjectScale] = useState('growth');
  const [timeline, setTimeline] = useState('standard');

  const toggleService = (id) => {
    sound.playClick();
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
      milestones: milestones.slice(0, 4),
      sla: projectScale === 'enterprise' ? '99.99% Tier-1 SLA' : '99.9% Production SLA',
    };
  }, [selectedServices, projectScale, timeline]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-full">
            SPATIAL CALCULATOR
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white">Project Scope & Blueprint Estimator</h3>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 mb-6">
          Toggle services across the 8 capabilities to synthesize your delivery roadmap.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-mono text-slate-400">
                <span>1. SELECT SERVICES ({selectedServices.length} SELECTED)</span>
                <button 
                  onClick={() => setSelectedServices(SERVICES.map(s => s.id))}
                  className="text-cyan-400 hover:underline"
                >
                  Select All 8
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => {
                  const isSelected = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`p-3 rounded-xl text-left border text-xs transition-all flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500/80 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-transparent'}`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="font-semibold truncate">{s.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2.5">
                2. Project Scale & Stage
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'mvp', title: 'Startup MVP' },
                  { id: 'growth', title: 'Growth Scale' },
                  { id: 'enterprise', title: 'Enterprise' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      sound.playClick();
                      setProjectScale(item.id);
                    }}
                    className={`p-2.5 rounded-xl text-center border text-xs font-bold transition-all ${
                      projectScale === item.id
                        ? 'bg-purple-950/40 border-purple-500 text-purple-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Synthesis Card */}
          <div className="lg:col-span-5 bg-slate-900/80 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-mono text-cyan-400 flex items-center justify-between">
                <span>ESTIMATED DELIVERY</span>
                <Clock className="w-4 h-4" />
              </div>

              <div className="text-3xl font-black text-white font-mono">
                ~{estimates.weeks} Weeks
              </div>

              <div className="text-xs text-slate-300 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                <span className="font-mono text-purple-400 font-bold">Reliability: </span>
                <span>{estimates.sla}</span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Key Milestones:
                </span>
                <div className="space-y-1.5">
                  {estimates.milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => onProceedToBooking(selectedServices)}
              className="mt-6 w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <span>Lock Scope & Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
