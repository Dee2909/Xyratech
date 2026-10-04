import { ArrowUp } from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import LogoMark from './LogoMark';

export default function Footer({ onSelectService }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-white border-t border-slate-200/80 pt-16 pb-12 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Brand & Positioning */}
        <div className="lg:col-span-2 space-y-4">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-3.5 group text-left"
          >
            <LogoMark className="w-10 h-10 drop-shadow-sm" />
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-950 font-display">
                XYRA<span className="text-sky-600">TECH</span>
              </span>
              <div className="text-[10px] text-slate-500 font-mono tracking-wider">
                IDEAS • TECHNOLOGY • GROWTH
              </div>
            </div>
          </button>

          <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed font-body">
            Comprehensive Digital Solutions for a Connected Tomorrow. Delivering high-performance software engineering, autonomous conversational AI, cinematic media production, and scalable digital campaigns under one unified technology partner.
          </p>
        </div>

        {/* 8 Services Directory (Col 1) */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">
            Digital Engineering
          </h4>
          <ul className="space-y-2.5 text-xs">
            {SERVICES.slice(0, 4).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onSelectService(s)}
                  className="text-slate-600 hover:text-sky-600 transition-colors text-left"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* 8 Services Directory (Col 2) */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">
            Scale & Creative
          </h4>
          <ul className="space-y-2.5 text-xs">
            {SERVICES.slice(4, 8).map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onSelectService(s)}
                  className="text-slate-600 hover:text-sky-600 transition-colors text-left"
                >
                  {s.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider mb-4">
            Platform Tools
          </h4>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li><button onClick={() => scrollToId('estimator')} className="hover:text-sky-600 transition-colors">Scope Estimator</button></li>
            <li><button onClick={() => scrollToId('positioning')} className="hover:text-sky-600 transition-colors">Pillars & Architecture</button></li>
            <li><button onClick={() => scrollToId('tech-stack')} className="hover:text-sky-600 transition-colors">Technology Arsenal</button></li>
            <li><button onClick={() => scrollToId('contact')} className="hover:text-sky-600 transition-colors">Project Discovery</button></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1800px] mx-auto pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div className="flex flex-wrap items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>ALL SYSTEMS NORMAL • 99.99% SLA</span>
          <span className="text-slate-300">|</span>
          <span>© {new Date().getFullYear()} XYRA TECH. All rights reserved.</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors font-medium shadow-sm"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
