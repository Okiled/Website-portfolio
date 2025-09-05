"use client";

import React, { memo, useMemo } from "react";
import { motion } from "framer-motion";

const FloatingPaths = memo(function FloatingPaths({
  position,
  count = 36,
  yOffset = 0,
}: {
  position: number;
  count?: number;
  yOffset?: number; // +n untuk geser naik (opsional)
}) {
  const paths = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;

        return {
          id: i,
          d,
          width: 0.5 + i * 0.03,
          opacity: 0.1 + i * 0.03,
        };
      }),
    [count, position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {yOffset !== 0 ? (
          <g transform={`translate(0, ${-Math.abs(yOffset)})`}>
            {paths.map((p) => (
              <motion.path
                key={p.id}
                d={p.d}
                stroke="currentColor"
                strokeWidth={p.width}
                strokeOpacity={p.opacity}
                initial={{ pathLength: 0.3, opacity: 0.6 }}
                animate={{
                  pathLength: 1,
                  opacity: [0.3, 0.6, 0.3],
                  pathOffset: [0, 1, 0],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}
          </g>
        ) : (
          paths.map((p) => (
            <motion.path
              key={p.id}
              d={p.d}
              stroke="currentColor"
              strokeWidth={p.width}
              strokeOpacity={p.opacity}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
});

export default function BackgroundPaths({
  className = "",
  yOffset = 0,
  count = 36,
}: {
  className?: string;
  yOffset?: number;
  count?: number;
}) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-bg ${className}`}
    >
      <div className="absolute inset-0 text-brand">
        <FloatingPaths position={1} yOffset={yOffset} count={count} />
        <FloatingPaths position={-1} yOffset={yOffset} count={count} />
      </div>
    </div>
  );
}
