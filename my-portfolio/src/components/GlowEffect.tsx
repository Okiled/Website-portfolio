import React, { useEffect, useRef } from 'react';

type NamedGlow =
  | 'blue' | 'purple' | 'green' | 'red' | 'orange'
  | 'primary' | 'secondary' | 'font';

interface UseGlowEffectOptions {
  glowColor?: NamedGlow;
}

const glowColorMap: Record<NamedGlow, { base: number; spread: number }> = {
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base:   0, spread: 200 },
  orange: { base:  30, spread: 200 },


  primary:   { base: 226, spread:  60 },
  secondary: { base: 226, spread: 120 },
  font:      { base:  29, spread:  40 },
};

const useGlowEffect = (options: UseGlowEffectOptions = {}) => {
  const { glowColor = 'secondary' } = options; // default: secondary
  const elementRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      const { clientX: x, clientY: y } = e;
      if (elementRef.current) {
        elementRef.current.style.setProperty('--x', x.toFixed(2));
        elementRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        elementRef.current.style.setProperty('--y', y.toFixed(2));
        elementRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };

    // Update spotlight size berdasarkan ukuran elemen untuk fit semua layout
    const updateAdaptiveSize = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const avgSize = (rect.width + rect.height) / 2;
        const adaptiveSize = Math.max(120, Math.min(350, avgSize * 0.7));
        elementRef.current.style.setProperty('--size', adaptiveSize.toFixed(0));
      }
    };

    // Observer untuk auto-adjust ukuran spotlight
    if (elementRef.current) {
      observerRef.current = new ResizeObserver(updateAdaptiveSize);
      observerRef.current.observe(elementRef.current);
      updateAdaptiveSize();
    }

    document.addEventListener('pointermove', syncPointer);
    return () => {
      document.removeEventListener('pointermove', syncPointer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const { base, spread } = glowColorMap[glowColor];

  const getGlowStyles = () => ({
    '--base': base as any,
    '--spread': spread as any,
    '--radius': '14',
    '--border': '3',
    '--backdrop': 'hsl(0 0% 60% / 0.12)',
    '--backup-border': 'var(--backdrop)',
    '--size': '220', // default, akan diupdate oleh observer
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    '--bg-spot-opacity': '0.10',
    '--border-spot-opacity': '1',
    '--border-light-opacity': '1',
    '--inner-spot-opacity': '0.55',
    '--inner-spot-blur': '10px',
    position: 'relative' as const,
    touchAction: 'none' as const,
    borderRadius: 'calc(var(--radius) * 1px)',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) 100% 70% / var(--bg-spot-opacity)), transparent
    )`,
    backgroundColor: 'var(--backdrop)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
  } as React.CSSProperties);

  const glowCSS = `
    [data-glow]::before,
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-attachment: fixed;
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 50% 50%;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
    }
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(var(--hue, 210) 100% 50% / var(--border-spot-opacity)), transparent 100%
      );
      filter: brightness(2);
    }
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
        hsl(0 100% 100% / var(--border-light-opacity)), transparent 100%
      );
    }
    [data-glow] .glow-spots {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      mix-blend-mode: screen;
      opacity: var(--inner-spot-opacity);
      filter: blur(var(--inner-spot-blur));
      background-image:
        radial-gradient(160px 160px at calc(var(--x,0) * 1px) calc(var(--y,0) * 1px),
          hsl(var(--hue,210) 100% 75% / 0.25), transparent 60%),
        radial-gradient(120px 120px at calc((var(--x,0) + 80) * 1px) calc((var(--y,0) - 60) * 1px),
          hsl(var(--hue,210) 100% 70% / 0.20), transparent 65%),
        radial-gradient(100px 100px at calc((var(--x,0) - 90) * 1px) calc((var(--y,0) + 70) * 1px),
          hsl(var(--hue,210) 100% 85% / 0.15), transparent 70%),
        radial-gradient(180px 180px at calc((var(--x,0) + 160) * 1px) calc((var(--y,0) + 10) * 1px),
          hsl(var(--hue,210) 100% 60% / 0.12), transparent 70%);
      background-attachment: fixed;
      background-repeat: no-repeat;
    }
  `;

  return {
    ref: elementRef,
    glowProps: { 'data-glow': true, style: getGlowStyles() },
    glowCSS,
  };
};

export { useGlowEffect };