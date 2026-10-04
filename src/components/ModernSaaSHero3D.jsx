import React, { useState, useRef } from 'react';
import { Bot, Globe, Shield, Terminal, ArrowUpRight, Cpu, Layers } from 'lucide-react';

export default function ModernSaaSHero3D() {
  const containerRef = useRef(null);
  const [rot, setRot] = useState({ x: 0, y: 0, flareX: 50, flareY: 50 });

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 10;
    const rotY = ((x - centerX) / centerX) * 12;

    setRot({
      x: rotX,
      y: rotY,
      flareX: (x / rect.width) * 100,
      flareY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRot({ x: 0, y: 0, flareX: 50, flareY: 50 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto h-[380px] sm:h-[460px] flex items-center justify-center select-none"
      style={{ perspective: '1200px' }}
    >
      {/* Luminous Sky Blue ambient lighting glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sky-400/15 rounded-full blur-[90px] pointer-events-none" />

      {/* 3D Multi-Layered Stage */}
      <div 
        className="relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cursor-tracking light sheen */}
        <div 
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 300px at ${rot.flareX}% ${rot.flareY}%, rgba(14, 165, 233, 0.12), transparent 70%)`,
          }}
        />

        {/* Layer 1: Back Platform Pane (White + Sky Blue subtle border) */}
        <div 
          className="absolute w-[92%] h-[84%] rounded-3xl bg-white/95 border border-sky-100 shadow-[0_10px_35px_-5px_rgba(14,165,233,0.12)] p-5 sm:p-6 flex flex-col justify-between"
          style={{ transform: 'translateZ(-35px)' }}
        >
          <div className="flex items-center justify-between text-xs font-mono text-slate-500 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-slate-700">XYRA TECH CLOUD TELEMETRY</span>
            </div>
            <span className="text-sky-600 font-bold">LATENCY: &lt; 12ms</span>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto">
            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-center">
              <span className="text-lg sm:text-xl font-bold font-mono text-slate-900">99.99%</span>
              <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5">Uptime SLA</span>
            </div>
            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-center">
              <span className="text-lg sm:text-xl font-bold font-mono text-sky-600">350+</span>
              <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5">Systems Live</span>
            </div>
            <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-100 text-center">
              <span className="text-lg sm:text-xl font-bold font-mono text-slate-800">8</span>
              <span className="text-[10px] sm:text-xs text-slate-500 block mt-0.5">Core Services</span>
            </div>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono text-slate-400 flex items-center justify-between pt-2 border-t border-slate-100">
            <span>SOC2 / GDPR COMPLIANT</span>
            <span className="text-sky-600 font-medium">GLOBAL EDGE CDN</span>
          </div>
        </div>

        {/* Layer 2: Middle Application Platform (Web + Mobile) */}
        <div 
          className="absolute w-[86%] h-[74%] rounded-2xl bg-white border border-sky-200/90 shadow-[0_15px_35px_-5px_rgba(14,165,233,0.18)] p-5 flex flex-col justify-between"
          style={{ transform: 'translateZ(15px)' }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-600">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs sm:text-sm font-bold text-slate-900 block">Web & Mobile Application Engine</span>
                <span className="text-[10px] sm:text-xs text-slate-500">React 19 • Next.js • Flutter • iOS/Android</span>
              </div>
            </div>
            <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />
          </div>

          <div className="space-y-1.5 py-2">
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden w-full">
              <div className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full w-[88%]" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>Traffic Capacity</span>
              <span className="text-sky-600 font-bold">120k req/sec</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-100">
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">Production Ready</span>
            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700">Zero-Downtime</span>
            <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">Tier-1 Cloud</span>
          </div>
        </div>

        {/* Layer 3: Foreground AI Assistant Widget */}
        <div 
          className="absolute bottom-3 right-1 sm:right-2 w-[76%] sm:w-[70%] rounded-2xl bg-white border border-sky-300 shadow-[0_20px_40px_-10px_rgba(2,132,199,0.22)] p-4"
          style={{ transform: 'translateZ(65px)' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-sky-500/25">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block leading-tight">Xyra AI Assistant</span>
              <span className="text-[10px] text-sky-600 font-mono font-medium">Autonomous Reasoning Active</span>
            </div>
          </div>

          <p className="text-[11px] text-slate-700 leading-snug bg-sky-50/80 p-2.5 rounded-xl border border-sky-100">
            "Analyzing scope requirements... 8 services synchronized for maximum business velocity."
          </p>

          <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span>RAG Model v2.8</span>
            <span className="text-sky-600 font-bold">0.18s latency</span>
          </div>
        </div>
      </div>
    </div>
  );
}
