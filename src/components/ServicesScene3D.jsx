import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Globe, Smartphone, 
  Bot, Clapperboard, ShieldCheck, BarChart3, 
  Camera, TrendingUp, ArrowUpRight, Check, Sparkles
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';

const ease = [0.22, 1, 0.36, 1];

const ICON_MAP = {
  Globe,
  Smartphone,
  Bot,
  Clapperboard,
  ShieldCheck,
  BarChart3,
  Camera,
  TrendingUp,
};

const wrapIndex = (value, total) => {
  if (total === 0) return 0;
  return ((value % total) + total) % total;
};

const getRelativeIndex = (index, activeIndex, total) => {
  let delta = index - activeIndex;
  const midpoint = total / 2;

  if (delta > midpoint) delta -= total;
  if (delta < -midpoint) delta += total;

  return delta;
};

export default function ServicesScene3D({ onSelectService }) {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSteps = SERVICES.length;

  useEffect(() => {
    if (prefersReducedMotion || totalSteps <= 1 || isPaused) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev + 1, totalSteps));
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [prefersReducedMotion, totalSteps, isPaused]);

  const stepViews = useMemo(
    () =>
      SERVICES.map((service, index) => {
        const delta = getRelativeIndex(index, activeIndex, totalSteps);
        const distance = Math.abs(delta);

        if (distance > 2) {
          return null;
        }

        const x = delta * 52;
        const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.66;
        const rotateY = delta * -22;
        const opacity = distance === 0 ? 1 : distance === 1 ? 0.55 : 0.18;
        const blur = distance === 0 ? 'blur(0px)' : distance === 1 ? 'blur(0.5px)' : 'blur(1.6px)';
        const zIndex = 20 - distance;

        return {
          service,
          index,
          x,
          scale,
          rotateY,
          opacity,
          blur,
          zIndex,
        };
      }),
    [activeIndex, totalSteps],
  );

  const goToPrevious = () => setActiveIndex((prev) => wrapIndex(prev - 1, totalSteps));
  const goToNext = () => setActiveIndex((prev) => wrapIndex(prev + 1, totalSteps));

  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 22, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8, ease }}
      className="mx-auto w-full max-w-[1520px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <section className="relative overflow-hidden rounded-[2.35rem] border border-blue-200/30 bg-[radial-gradient(circle_at_50%_-10%,rgba(59,130,246,0.35),rgba(15,23,42,0.96)_50%,rgba(2,6,23,0.98)_100%)] px-5 pb-7 pt-5 shadow-[0_40px_120px_rgba(2,6,23,0.5)] sm:px-9 sm:pb-8 sm:pt-7">
        {/* Ambient Stage Lighting */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-blue-300/20 to-transparent" />
          <div className="absolute left-[-8rem] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-3xl" />
          <div className="absolute right-[-8rem] top-1/2 h-56 w-56 -translate-y-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        {/* Top Controls Bar matching XyraHire 3D Carousel */}
        <div className="relative z-10 flex items-center justify-between text-slate-300">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous service"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200/25 bg-slate-900/60 transition hover:border-blue-400 hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-sky-400">
              3D SPATIAL CAROUSEL
            </span>
          </div>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Next service"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-blue-200/25 bg-slate-900/60 transition hover:border-blue-400 hover:text-white hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* 3D Perspective Stage */}
        <div
          className="relative mt-4 h-[440px] sm:mt-5 sm:h-[480px] md:mx-auto md:w-full md:max-w-[1360px] md:aspect-[10/5.6] md:h-auto min-h-[420px]"
          style={{ perspective: 1800 }}
        >
          {stepViews.map((view) => {
            if (!view) return null;

            const { service, index, x, scale, rotateY, opacity, blur, zIndex } = view;
            const Icon = ICON_MAP[service.iconName] || Sparkles;
            const isActive = index === activeIndex;

            return (
              <motion.article
                key={service.id}
                initial={false}
                animate={{
                  x: `${x}%`,
                  scale,
                  rotateY,
                  opacity,
                  filter: blur,
                }}
                transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.65, ease }}
                onClick={() => {
                  if (!isActive) {
                    setActiveIndex(index);
                  }
                }}
                className={`absolute left-1/2 top-1/2 w-[92%] max-w-[1040px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border border-white/40 bg-white/98 p-5 sm:p-7 md:p-9 shadow-[0_40px_100px_rgba(2,6,23,0.4)] ${
                  isActive ? 'cursor-default' : 'cursor-pointer hidden sm:block'
                }`}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Subtle soft gradient background overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-50/70 via-white to-white pointer-events-none" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Icon pill on left, Badge on right (No service count) */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-sky-600 shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        {service.badge}
                      </span>
                    </div>

                    {/* Kicker / Category tag */}
                    <div className="mt-4 sm:mt-6 flex items-center gap-2">
                      <p className="text-[11px] font-black uppercase tracking-[0.22em] text-sky-600">
                        {service.category}
                      </p>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs font-semibold text-slate-500">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-slate-950 font-display">
                      {service.title}
                    </h3>

                    {/* Tagline / Detail */}
                    <p className="mt-2 text-sm sm:text-base font-semibold text-sky-700 leading-snug">
                      {service.tagline}
                    </p>

                    <p className="mt-2 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-slate-600 font-body">
                      {service.description}
                    </p>

                    {/* Key capabilities list */}
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                      {service.capabilities.slice(0, 4).map((cap, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                          <Check className="h-4 w-4 text-sky-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: View Specs Button & Step indicator pills */}
                  <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    {/* Interactive segmented pill dots */}
                    {isActive ? (
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {SERVICES.map((item, itemIndex) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setActiveIndex(wrapIndex(itemIndex, totalSteps))}
                            aria-label={`Go to ${item.title}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              itemIndex === activeIndex 
                                ? 'w-10 sm:w-12 bg-sky-600 shadow-sm shadow-sky-500/30' 
                                : 'w-4 sm:w-6 bg-slate-200 hover:bg-sky-300'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* View specifications modal trigger */}
                    {isActive && (
                      <button
                        onClick={() => onSelectService && onSelectService(service)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20 hover:shadow-lg"
                      >
                        <span>Explore Specifications</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Shading for non-active background cards */}
                {!isActive ? (
                  <div className="pointer-events-none absolute inset-0 bg-slate-950/20 rounded-[2rem]" />
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </section>
    </motion.div>
  );
}
