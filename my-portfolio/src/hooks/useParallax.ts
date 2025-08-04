import { useEffect, useState } from 'react';

/**
 * Hook untuk efek parallax scroll.
 * @param speed Kecepatan parallax. Default 0.4. Semakin kecil, semakin lambat.
 */
export function useParallax(speed: number = 0.4): number {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return offsetY;
}
