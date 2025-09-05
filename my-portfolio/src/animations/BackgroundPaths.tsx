"use client";

import React, { memo, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FloatingPaths = memo(function FloatingPaths({
  position = 1,
  count = 36,
  opacityStart = 0.1,
  widthStart = 0.5,
  yOffset = 24, // nilai positif = geser ke atas
}: {
  position?: number;
  count?: number;
  opacityStart?: number;
  widthStart?: number;
  yOffset?: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  const paths = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const id = i;
        const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;

        const width = widthStart + i * 0.03;
        const opacity = opacityStart + i * 0.03;

        return { id, d, width, opacity };
      }),
    [count, opacityStart, position, widthStart]
  );

  return (
    <svg
      className="w-full h-full text-brand"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g transform={`translate(0, ${-Math.abs(yOffset)})`}>
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke="currentColor"
            strokeWidth={p.width}
            strokeOpacity={p.opacity}
            initial={prefersReducedMotion ? false : { pathLength: 0.3, opacity: 0.6 }}
            animate={
              prefersReducedMotion
                ? { opacity: p.opacity }
                : { pathLength: 1, opacity: [0.3, 0.6, 0.3], pathOffset: [0, 1, 0] }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    duration: 20 + (p.id % 10),
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }
            }
          />
        ))}
      </g>
    </svg>
  );
});

export function BackgroundPaths({
  mode = "fullscreen",
  className = "",
  yOffset = 24,
}: {
  mode?: "fullscreen" | "overlay";
  className?: string;
  yOffset?: number; // kontrol global untuk naikkan path
}) {
  const baseClasses =
    mode === "fullscreen"
      ? "relative min-h-screen w-full overflow-hidden bg-bg" // pakai --bg
      : "absolute inset-0 overflow-hidden";

  return (
    <div
      className={`${baseClasses} ${className}`}
      style={{ WebkitMaskImage: "radial-gradient(white, rgba(255,255,255,0.6))" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <FloatingPaths position={1} yOffset={yOffset} />
        <FloatingPaths position={-1} yOffset={yOffset} />
      </div>
    </div>
  );
}

export default BackgroundPaths;
