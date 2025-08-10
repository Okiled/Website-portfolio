import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { ReactNode, CSSProperties } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  intensity?: number;
  glowColor?: string;
  shadowColor?: string;
  className?: string;
  style?: CSSProperties;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ 
  children, 
  delay = 0,
  intensity = 1,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  shadowColor = 'rgba(0, 0, 0, 0.25)',
  className = '',
  style = {}
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);

  const updateTransform = useCallback((x: number, y: number, rect: DOMRect): void => {
    const card = cardRef.current;
    if (!card) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 15 * intensity;
    const rotateY = ((x - centerX) / centerX) * 15 * intensity;
    const translateZ = 30 * intensity;

    // Smooth animation using requestAnimationFrame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      card.style.transform = `
        perspective(1000px) 
        rotateX(${-rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateZ(${translateZ}px)
        scale3d(1.05, 1.05, 1.05)
      `;
      
      // Dynamic shadow based on rotation
      const shadowX = rotateY * 0.5;
      const shadowY = rotateX * 0.5;
      card.style.boxShadow = `
        ${shadowX}px ${shadowY + 20}px 40px ${shadowColor},
        0 0 30px ${glowColor},
        inset 0 1px 0 rgba(255, 255, 255, 0.1)
      `;
    });
  }, [intensity, shadowColor, glowColor]);

  const handleMouseMove = useCallback((e: MouseEvent): void => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    updateTransform(x, y, rect);
  }, [updateTransform]);

  const handleMouseEnter = useCallback((): void => {
    setIsHovered(true);
    const card = cardRef.current;
    if (!card) return;
    
    card.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease';
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setIsHovered(false);
    const card = cardRef.current;
    if (!card) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    card.style.transition = 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)';
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    card.style.boxShadow = `
      0 10px 30px ${shadowColor},
      0 0 0 transparent,
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `;
  }, [shadowColor]);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    if (isHovered) {
      card.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHovered, handleMouseMove]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const cardStyle: CSSProperties = {
    transformStyle: 'preserve-3d',
    willChange: 'transform',
    animationDelay: `${delay}ms`,
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
    borderRadius: '20px',
    background: `
      linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%),
      linear-gradient(145deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%)
    `,
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: `
      0 10px 30px ${shadowColor},
      inset 0 1px 0 rgba(255, 255, 255, 0.05)
    `,
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const lightOverlayStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: isHovered ? `
      radial-gradient(
        circle at ${mousePosition.x}px ${mousePosition.y}px,
        rgba(255, 255, 255, 0.1) 0%,
        transparent 50%
      )
    ` : 'transparent',
    pointerEvents: 'none',
    borderRadius: '20px',
    transition: 'background 0.3s ease',
    zIndex: 1
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 2
  };

  return (
    <div
      ref={cardRef}
      className={`floating-card ${className}`}
      style={cardStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={lightOverlayStyle} />
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default FloatingCard;