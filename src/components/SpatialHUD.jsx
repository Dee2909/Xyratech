import React, { useState } from 'react';
import { 
  Globe, Smartphone, Bot, Clapperboard, 
  ShieldCheck, BarChart3, Camera, TrendingUp, 
  Layers, Volume2, VolumeX, Maximize2, Compass, 
  ArrowRight, ArrowLeft, X, Sparkles, CheckCircle2, 
  Sliders, MessageSquare, Terminal, ChevronRight 
} from 'lucide-react';
import { SERVICES, COMPANY_INFO } from '../data/servicesData';
import { sound } from '../utils/audio';

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

export default function SpatialHUD({
  currentSector,
  onWarp,
  onOpenEstimator,
  onOpenAIChat,
  onOpenBooking,
  isMuted,
  toggleSound,
}) {
  const [directoryOpen, setDirectoryOpen] = useState(false);

  const activeServiceIndex = currentSector.startsWith('service-') 
    ? parseInt(currentSector.split('-')[1], 10) 
    : null;

  const activeService = activeServiceIndex !== null ? SERVICES[activeServiceIndex] : null;

  const handlePrevSector = () => {
    sound.playWarp();
    if (activeServiceIndex === null) {
      onWarp('service-0');
    } else {
      const nextIdx = (activeServiceIndex - 1 + SERVICES.length) % SERVICES.length;
      onWarp(`service-${nextIdx}`);
    }
  };

  const handleNextSector = () => {
    sound.playWarp();
    if (activeServiceIndex === null) {
      onWarp('service-0');
    } else {
      const nextIdx = (activeServiceIndex + 1) % SERVICES.length;
      onWarp(`service-${nextIdx}`);
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* ========================================================
          1. TOP SPATIAL HUD BAR
      ======================================================== */}
      <header className="flex items-center justify-between w-full pointer-events-auto">
        {/* Brand & Telemetry */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              sound.playWarp();
              onWarp('nexus');
            }}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 backdrop-blur-xl transition-all shadow-2xl group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center font-black text-cyan-400 font-mono">
                X
              </div>
            </div>
            <div className="text-left">
              <div className="font-mono font-black text-white tracking-wider text-sm flex items-center gap-1.5">
                <span>XYRA<span className="text-cyan-400">TECH</span></span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  3D OS
                </span>
              </div>
              <div className="text-[9px] font-mono text-slate-400 tracking-wider">
                IDEAS • TECHNOLOGY • GROWTH
              </div>
            </div>
          </button>

          {/* Sector Telemetry Ticker (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 bg-slate-950/70 border border-slate-800/80 px-3.5 py-2 rounded-2xl backdrop-blur-xl font-mono text-xs text-slate-400 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold">
              SECTOR: {currentSector === 'nexus' ? 'CENTRAL NEXUS [ORIGIN]' : activeService ? activeService.title.toUpperCase() : currentSector.toUpperCase()}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400">LATENCY: 8ms</span>
            <span className="text-slate-600">|</span>
            <span className="text-purple-400">Uptime: 99.99%</span>
          </div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2">
          {/* Quick All Services Drawer Toggle */}
          <button
            onClick={() => {
              sound.playClick();
              setDirectoryOpen(!directoryOpen);
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Directory Matrix</span>
          </button>

          {/* AI Terminal Button */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenAIChat();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-xs font-mono text-pink-300 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          >
            <Bot className="w-4 h-4 text-pink-400" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className="p-2.5 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-white backdrop-blur-xl transition-all shadow-xl"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Direct Scope Initiation */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenBooking();
            }}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20"
          >
            <span>Launch Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ========================================================
          2. CENTRAL NEXUS OVERLAY (When in Nexus View)
      ======================================================== */}
      {currentSector === 'nexus' && (
        <div className="my-auto mx-auto max-w-2xl text-center space-y-5 pointer-events-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono backdrop-blur-xl shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>INTERACTIVE 3D ENTERPRISE ECOSYSTEM</span>
          </div>

          <div className="space-y-1">
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight drop-shadow-2xl">
              Ideas <span className="text-cyan-400">•</span> Technology <span className="text-purple-400">•</span> <span className="text-gradient-purple">Growth</span>
            </h1>
            <p className="text-base sm:text-xl font-bold text-slate-200 drop-shadow">
              Comprehensive Digital Solutions for a Connected Tomorrow
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed drop-shadow">
            Experience our 8 core capabilities in full 3D spatial orbit. Click any station, drag to orbit the cosmos, or warp directly through the dock below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playWarp();
                onWarp('service-0');
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:brightness-110 text-slate-950 font-extrabold text-xs transition-all shadow-xl shadow-cyan-500/25 flex items-center gap-2"
            >
              <span>Warp to Service Station 01</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenEstimator();
              }}
              className="px-5 py-3 rounded-2xl bg-slate-950/80 hover:bg-slate-900 border border-slate-700/80 text-white text-xs font-semibold backdrop-blur-xl transition-all flex items-center gap-2 shadow-xl"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Configure Project Scope</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] font-mono text-slate-500">
            [Drag Mouse to Orbit Universe • Scroll Wheel to Zoom • Click 3D Stations to Warp]
          </div>
        </div>
      )}

      {/* ========================================================
          3. ACTIVE SERVICE SPATIAL HOLO-PANEL (When Sector is Active)
      ======================================================== */}
      {activeService && (
        <aside className="pointer-events-auto self-start sm:self-end max-w-md w-full my-auto bg-slate-950/85 border border-slate-800/90 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-2xl space-y-4 animate-in slide-in-from-right-8 duration-300 relative overflow-hidden">
          {/* Ambient Glow */}
          <div 
            className="absolute -top-20 -right-20 w-52 h-52 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: activeService.accentColor }}
          />

          {/* Close / Return to Nexus */}
          <button
            onClick={() => {
              sound.playWarp();
              onWarp('nexus');
            }}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Return to Nexus Origin"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-lg border border-slate-800">
                SECTOR {activeService.number}
              </span>
              <span 
                className="text-xs font-mono font-semibold px-2 py-0.5 rounded-lg"
                style={{ backgroundColor: `${activeService.accentColor}18`, color: activeService.accentColor }}
              >
                {activeService.category}
              </span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight">
              {activeService.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-medium">
              {activeService.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs text-slate-300 leading-relaxed">
            {activeService.description}
          </p>

          {/* Deliverables Checklist */}
          <div className="space-y-2 pt-1">
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Core Deliverables:
            </div>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {activeService.capabilities.map((cap, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-900/50 p-2 rounded-xl border border-slate-800/60">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: activeService.accentColor }} />
                  <span className="text-[11px]">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div>
            <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              Production Stack:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeService.techStack.map((tech, idx) => (
                <span 
                  key={idx}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-300 border border-slate-800"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Navigation & Action Controls */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevSector}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Previous Sector"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextSector}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                title="Next Sector"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onOpenBooking(activeService.id);
              }}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:brightness-110 transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-cyan-500/20"
            >
              <span>Build With Service {activeService.number}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* ========================================================
          4. BOTTOM SPATIAL ORBIT DOCK (Always Visible)
      ======================================================== */}
      <footer className="w-full flex flex-col items-center gap-2 pointer-events-auto">
        <div className="bg-slate-950/85 border border-slate-800/90 rounded-3xl p-2 px-3 backdrop-blur-2xl shadow-2xl flex items-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto scrollbar-none">
          {/* Nexus Origin Icon */}
          <button
            onClick={() => {
              sound.playWarp();
              onWarp('nexus');
            }}
            className={`p-2.5 rounded-2xl flex items-center gap-1.5 text-xs font-mono font-bold transition-all ${
              currentSector === 'nexus' 
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25 scale-105' 
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden md:inline">Nexus</span>
          </button>

          <div className="w-[1px] h-6 bg-slate-800 mx-1 hidden sm:block" />

          {/* 8 Services Station Icons */}
          {SERVICES.map((s, idx) => {
            const Icon = ICON_MAP[s.id] || Layers;
            const isCurrent = currentSector === `service-${idx}`;

            return (
              <button
                key={s.id}
                onClick={() => {
                  sound.playWarp();
                  onWarp(`service-${idx}`);
                }}
                title={`Sector ${s.number}: ${s.title}`}
                className={`p-2.5 rounded-2xl transition-all flex items-center gap-1.5 relative group ${
                  isCurrent 
                    ? 'bg-slate-800 text-white border scale-110 shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
                style={{
                  borderColor: isCurrent ? s.accentColor : undefined,
                  boxShadow: isCurrent ? `0 0 20px ${s.accentColor}40` : undefined,
                }}
              >
                <Icon className="w-4 h-4" style={{ color: isCurrent ? s.accentColor : undefined }} />
                <span className="text-[11px] font-mono hidden xl:inline">
                  {s.title.split(' ')[0]}
                </span>
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-slate-200 text-[10px] font-mono px-2 py-0.5 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
                  {s.number}. {s.title}
                </span>
              </button>
            );
          })}

          <div className="w-[1px] h-6 bg-slate-800 mx-1 hidden sm:block" />

          {/* Scope Estimator Shortcut */}
          <button
            onClick={() => {
              sound.playClick();
              onOpenEstimator();
            }}
            title="Interactive Scope Estimator"
            className="p-2.5 rounded-2xl text-slate-400 hover:text-cyan-300 hover:bg-slate-900 transition-all flex items-center gap-1.5"
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-mono hidden lg:inline">Estimator</span>
          </button>
        </div>

        {/* Keyboard hints banner */}
        <div className="text-[10px] font-mono text-slate-500 hidden sm:block">
          Press [1-8] to warp sectors • [Space] for Nexus Origin • [Drag] to orbit
        </div>
      </footer>

      {/* ========================================================
          5. DIRECTORY MATRIX DRAWER (When Toggled)
      ======================================================== */}
      {directoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md pointer-events-auto animate-in fade-in duration-200">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[88vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  ALL 8 CAPABILITIES DIRECTORY
                </span>
                <h3 className="text-2xl font-black text-white">XYRA TECH Ecosystem Matrix</h3>
              </div>
              <button 
                onClick={() => setDirectoryOpen(false)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SERVICES.map((s, idx) => {
                const Icon = ICON_MAP[s.id] || Layers;
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      sound.playWarp();
                      setDirectoryOpen(false);
                      onWarp(`service-${idx}`);
                    }}
                    className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-slate-900 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-slate-500 group-hover:text-slate-300">
                        {s.number} //
                      </span>
                      <Icon className="w-4 h-4" style={{ color: s.accentColor }} />
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                      {s.tagline}
                    </p>
                    <div className="mt-3 text-[10px] font-mono text-cyan-400 flex items-center gap-1">
                      <span>Warp in 3D</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
