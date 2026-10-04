import React from 'react';

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`mx-auto flex max-w-4xl flex-col gap-4 sm:gap-5 ${alignment}`}>
      {eyebrow && (
        <span className="inline-flex rounded-full px-5 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] shadow-sm bg-sky-50 text-sky-600 border border-sky-100">
          {eyebrow}
        </span>
      )}
      
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 font-display leading-[1.15]">
        {title}
      </h2>

      {description && (
        <p className="max-w-3xl text-sm leading-relaxed sm:text-base sm:leading-8 font-medium text-slate-600 font-body">
          {description}
        </p>
      )}
    </div>
  );
}
