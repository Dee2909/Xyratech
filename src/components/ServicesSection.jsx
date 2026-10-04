import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Globe, Smartphone, Bot, Clapperboard, 
  ShieldCheck, BarChart3, Camera, TrendingUp, 
  ArrowUpRight, Check, SlidersHorizontal, Eye, Box
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import SectionHeading from './SectionHeading';
import ServicesScene3D from './ServicesScene3D';

const ICON_MAP = {
  Globe,
  Smartphone,
  Bot,
  Clapperboard,
  ShieldCheck,
  BarChart3,
  Camera,
  TrendingUp
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30, 
    rotateX: 8,
    scale: 0.98,
    transformPerspective: 1200,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function ServicesSection({ onSelectService }) {
  const prefersReducedMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'grid'
  const [filter, setFilter] = useState('All');

  const filteredServices = filter === 'All' 
    ? SERVICES 
    : SERVICES.filter(s => s.category.toLowerCase().includes(filter.toLowerCase()) || filter.toLowerCase().includes(s.category.toLowerCase()));

  return (
    <section id="services" className="relative px-4 py-20 sm:px-6 lg:px-8 w-full">
      <div className="mx-auto max-w-[1800px]">
        {/* Section Heading matching XyraHire standard */}
        <SectionHeading
          eyebrow="Synchronized Services"
          title="Comprehensive Digital Portfolio"
          description="Engineered to scale ambitious companies from concept to high-velocity market growth without vendor fragmentation."
        />

        {/* View Mode & Filter Controls */}
        <div className="mt-10 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-200/80 pb-6">
          {/* Mode Switcher */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === '3d'
                  ? 'bg-white text-sky-700 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Box className="w-4 h-4 text-sky-600" />
              <span>3D Sliding Carousel</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-sky-700 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4 text-sky-600" />
              <span>Services Grid</span>
            </button>
          </div>

          {/* Category Filter Pills (active when in grid or to quick-select) */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {['All', 'Engineering', 'Artificial Intelligence', 'Creative Technology', 'Growth Marketing'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  if (viewMode === '3d') setViewMode('grid');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filter === cat && viewMode === 'grid'
                    ? 'bg-sky-600 text-white font-bold shadow-md shadow-sky-500/20'
                    : 'bg-white text-slate-600 hover:text-sky-700 border border-slate-200 hover:border-sky-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Sliding Carousel Mode */}
        {viewMode === '3d' && (
          <div className="w-full">
            <ServicesScene3D onSelectService={onSelectService} />
          </div>
        )}

        {/* Services Grid Mode with XyraHire Card Styling */}
        {viewMode === 'grid' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 w-full"
          >
            {filteredServices.map((service) => {
              const Icon = ICON_MAP[service.iconName] || Globe;

              return (
                <motion.article
                  key={service.id}
                  variants={cardVariants}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : {
                          y: -10,
                          rotateX: -4,
                          rotateY: 4,
                          scale: 1.015,
                          transition: { duration: 0.3, ease: 'easeOut' },
                        }
                  }
                  style={{ transformPerspective: 1200, transformStyle: 'preserve-3d' }}
                  onClick={() => onSelectService(service)}
                  className="group relative cursor-pointer rounded-[2rem] border border-slate-200 bg-white p-6 sm:p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)] transition-all duration-300 hover:border-sky-300 hover:shadow-[0_44px_100px_rgba(14,165,233,0.16)] flex flex-col justify-between"
                >
                  {/* Hover Radial Gradient Sheen */}
                  <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_20%_0%,rgba(14,165,233,0.12),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div>
                    {/* Top Row: Icon Badge on left & Badge on right (No service count) */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] group-hover:bg-sky-600 transition-colors duration-300">
                        <Icon className="h-6 w-6 text-sky-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                        {service.badge}
                      </span>
                    </div>

                    {/* Category Kicker */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-500">
                        {service.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950 group-hover:text-sky-600 transition-colors font-display">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="mt-2 text-xs sm:text-sm font-medium text-slate-600 line-clamp-2 leading-relaxed">
                      {service.tagline}
                    </p>

                    {/* Feature Checklist */}
                    <div className="mt-5 space-y-2 pt-4 border-t border-slate-100">
                      {service.capabilities.slice(0, 3).map((cap, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span className="truncate">{cap}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Row */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-slate-500 group-hover:text-sky-600 transition-colors">
                      View Specifications
                    </span>
                    <div className="h-8 w-8 rounded-xl bg-sky-50 group-hover:bg-sky-600 text-sky-600 group-hover:text-white flex items-center justify-center transition-all duration-300 border border-sky-100 group-hover:border-sky-600">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
