'use client';

import Image from "next/image";

export function LogoButton() {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <button 
      aria-label="AIdelBienestar - Recargar página" 
      className="text-zinc-100 no-draggable hover:bg-white/10 focus-visible:bg-white/10 touch:h-12 touch:w-12 flex h-12 w-12 items-center justify-center rounded-lg focus-visible:outline-0 disabled:opacity-50 transition-colors duration-200" 
      onClick={handleClick}
      data-discover="true"
    >
      <Image 
        src="/bienestargpt-icon.svg" 
        alt="AIdelBienestar" 
        width="40" 
        height="40" 
        className="text-zinc-100"
      />
    </button>
  );
}
