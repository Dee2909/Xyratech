import React from 'react';
import { ArrowRight, Terminal, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import ModernSaaSHero3D from './ModernSaaSHero3D';

export default function Hero({ onExploreServices, onOpenEstimator }) {
  return (
    <section className="relative px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-8 lg:pb-28 lg:pt-16 w-full overflow-hidden">
      {/* Background Soft Sky Blue Ambient Blobs */}
      <div className="absolute -left-20 top-20 h-80 w-80 rounded-full bg-sky-100/50 blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-blue-100/40 blur-[130px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1800px] w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Headlines & Positioning */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs sm:text-sm font-semibold shadow-sm">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>ENTERPRISE DIGITAL PLATFORM</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-slate-950 tracking-tight leading-[1.05] font-display">
                Ideas <span className="text-sky-600">•</span> <br />
                Technology <span className="text-sky-500">•</span> <br />
                <span className="text-sky-600">Growth.</span>
              </h1>
            </div>

            {/* Subheadline & Description */}
            <div className="space-y-3 max-w-2xl mx-auto lg:mx-0">
              <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug font-display">
                Comprehensive Digital Solutions for a Connected Tomorrow
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-body">
                XYRA TECH powers modern enterprises through 8 synchronized digital capabilities: Web & Mobile Engineering, Conversational AI Chatbots, Media Tech Support, 24/7 Site Management, Data Analysis, Commercial Ad Shoots, and Full-Funnel Digital Marketing.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-[0_15px_30px_rgba(2,132,199,0.35)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.45)] group"
              >
                <span>Explore 8 Core Services</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-sky-300 text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Terminal className="w-4 h-4 text-sky-600" />
                <span>Configure Scope & Timeline</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-sky-600" />
                <span>99.99% Uptime Guarantee</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-600" />
                <span>Zero Product Silos</span>
              </div>
              <span>•</span>
              <div>350+ Global Enterprise Deployments</div>
            </div>
          </div>

          {/* Right Column: 3D Product Stage */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <ModernSaaSHero3D />
          </div>
        </div>
      </div>
    </section>
  );
}
