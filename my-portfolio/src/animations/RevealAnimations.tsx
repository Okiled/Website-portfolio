// components/RevealAnimations.tsx
import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface RevealWrapperProps {
  children?: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn';
  delay?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  triggerOnce?: boolean;
}

export const RevealWrapper: React.FC<RevealWrapperProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  className = '',
  style,
  threshold = 0.1,
  triggerOnce = true
}) => {
  const { elementRef, isVisible } = useScrollReveal({ 
    delay, 
    triggerOnce, 
    threshold 
  });

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out duration-[${duration}ms]`;
    
    if (!isVisible) {
      switch (animation) {
        case 'slideUp':
          return `${baseClasses} opacity-0 translate-y-8 transform`;
        case 'slideDown':
          return `${baseClasses} opacity-0 -translate-y-8 transform`;
        case 'slideLeft':
          return `${baseClasses} opacity-0 translate-x-8 transform`;
        case 'slideRight':
          return `${baseClasses} opacity-0 -translate-x-8 transform`;
        case 'scaleIn':
          return `${baseClasses} opacity-0 scale-95 transform`;
        case 'rotateIn':
          return `${baseClasses} opacity-0 rotate-3 scale-95 transform`;
        default: // fadeIn
          return `${baseClasses} opacity-0`;
      }
    }
    
    return `${baseClasses} opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 transform`;
  };

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={`${getAnimationClasses()} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

// Component untuk staggered animations
interface StaggeredRevealProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'rotateIn' | 'scaleIn';
  staggerDelay?: number;
  className?: string;
  baseDelay?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  animation = 'slideUp',
  staggerDelay = 100,
  className = '',
  baseDelay = 0,
  triggerOnce = true,
  threshold = 0.1
}) => {
  // Convert children to array if it's not already
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <RevealWrapper
          key={index}
          animation={animation}
          delay={baseDelay + (index * staggerDelay)}
          duration={400}
          triggerOnce={triggerOnce}
          threshold={threshold}
        >
          {child}
        </RevealWrapper>
      ))}
    </div>
  );
};

// Text reveal component dengan typewriter effect
interface TextRevealProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  triggerOnce?: boolean;
  threshold?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  delay = 0,
  speed = 50,
  className = '',
  showCursor = true,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollReveal({ 
    delay, 
    triggerOnce, 
    threshold 
  });
  const [displayedText, setDisplayedText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  React.useEffect(() => {
    if (!isVisible) {
      // Reset text when not visible (untuk unreveal effect)
      if (!triggerOnce) {
        setDisplayedText('');
        setIsComplete(false);
      }
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, text, speed, triggerOnce]);

  return (
    <span
      ref={elementRef as React.RefObject<HTMLSpanElement>}
      className={className}
    >
      {displayedText}
      {showCursor && isVisible && !isComplete && (
        <span className="animate-pulse text-cyan-400">|</span>
      )}
    </span>
  );
};