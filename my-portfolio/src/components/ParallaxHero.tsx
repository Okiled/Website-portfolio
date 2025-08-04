import React from 'react';
import { useParallax } from '../hooks/useParallax';

const ParallaxHero: React.FC = () => {
  const offsetY = useParallax(0.5);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Layer teks utama */}
      <h1
        className="text-5xl md:text-7xl font-bold text-white z-10"
        style={{ transform: `translateY(${offsetY * 0.5}px)` }}
      >
        Welcome to My Portfolio
      </h1>

      {/* Elemen dekoratif yang ikut parallax */}
      <div
        className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white opacity-10 blur-2xl"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      />
      <div
        className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-purple-500 opacity-20 blur-2xl"
        style={{ transform: `translateY(${offsetY * -0.2}px)` }}
      />
    </section>
  );
};

export default ParallaxHero;
