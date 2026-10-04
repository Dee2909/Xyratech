import React, { useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, Globe, Smartphone, Bot, Clapperboard, BarChart3, Camera, TrendingUp, Layers } from 'lucide-react';

const ICON_MAP = {
  'web-dev': Globe,
  'app-dev': Smartphone,
  'ai-chatbot': Bot,
  'media-tech': Clapperboard,
  'site-mgmt': ShieldCheck,
  'data-analysis': BarChart3,
  'ad-shoots': Camera,
  'digital-marketing': TrendingUp,
};

export default function ServiceDetailModal({ service, onClose, onSelectForQuote }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!service) return null;

  const Icon = ICON_MAP[service.id] || Layers;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-sky-200 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden text-left max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shrink-0 shadow-sm">
            <Icon className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                {service.category}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                {service.badge}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{service.title}</h3>
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{service.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Capabilities Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-3">
            Core Capabilities & Deliverables
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {service.capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-sky-50/60 p-3 rounded-xl border border-sky-100">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-sky-600" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            Technologies & Infrastructure
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {service.techStack.map((tech, idx) => (
              <span 
                key={idx}
                className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Production Guarantee */}
        <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 mb-6 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 shrink-0 text-sky-600 mt-0.5" />
          <div className="text-xs">
            <span className="font-semibold text-slate-900">Production Guarantee: </span>
            <span className="text-slate-600">{service.deliverables}</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500 font-mono">
            XYRA TECH Enterprise Solution
          </span>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelectForQuote(service.id);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/20"
            >
              <span>Build With This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
