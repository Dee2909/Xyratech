import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

import LogoMark from './LogoMark';

export default function Navbar({ onBookCallClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', id: 'services' },
    { label: 'Positioning', id: 'positioning' },
    { label: 'Scope Estimator', id: 'estimator' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Initiate Project', id: 'contact' },
  ];

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8 w-full">
      <div 
        className={`mx-auto flex max-w-[1800px] items-center justify-between rounded-[2rem] border px-6 py-4 transition-all duration-300 ${
          scrolled 
            ? 'border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-2xl' 
            : 'border-white/80 bg-white/85 shadow-[0_18px_40px_rgba(15,23,42,0.04)] backdrop-blur-xl'
        }`}
      >
        {/* Brand Logo */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center gap-3.5 group text-left"
        >
          <LogoMark className="w-10 h-10 drop-shadow-sm" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-slate-950 font-display">
                XYRA<span className="text-sky-600">TECH</span>
              </span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono tracking-wider">
              IDEAS • TECHNOLOGY • GROWTH
            </div>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/70 border border-slate-200/80 p-1 rounded-full">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={(e) => handleNavClick(e, link.id)}
              className="px-5 py-2 rounded-full text-sm font-semibold text-slate-700 hover:text-sky-600 hover:bg-white transition-all shadow-none hover:shadow-sm"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 bg-sky-50/80 border border-sky-200 px-3.5 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>99.99% Uptime</span>
          </div>

          <button
            onClick={onBookCallClick}
            className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all flex items-center gap-2 shadow-[0_10px_25px_rgba(2,132,199,0.3)] hover:shadow-[0_15px_30px_rgba(2,132,199,0.4)]"
          >
            <span>Launch Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-sky-600"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-auto max-w-[1800px] mt-2 rounded-[2rem] bg-white border border-slate-200 p-6 shadow-2xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={(e) => handleNavClick(e, link.id)}
                className="py-2.5 px-4 text-base font-semibold text-slate-800 hover:text-sky-600 hover:bg-sky-50 rounded-xl text-left transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookCallClick();
                }}
                className="w-full py-3.5 rounded-full text-center text-sm font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-500/25"
              >
                Launch Project Discovery
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
