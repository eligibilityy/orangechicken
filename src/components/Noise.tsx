"use client";

export default function Noise() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.15] dark:opacity-[0.08]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'multiply',
        willChange: 'transform',
        filter: 'contrast(170%) brightness(950%)',
      }}
    />
  );
} 