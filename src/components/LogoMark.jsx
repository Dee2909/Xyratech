import React from 'react';

export default function LogoMark({ className = "w-10 h-10", alt = "XYRA TECH Logo" }) {
  return (
    <img 
      src="/logo.png" 
      alt={alt} 
      className={`object-contain transition-transform duration-300 group-hover:scale-105 ${className}`}
    />
  );
}
