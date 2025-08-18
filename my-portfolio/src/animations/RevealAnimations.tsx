import React, { memo, useMemo, useCallback } from 'react';
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

const ANIMATION_CLASSES = {
  base: 'transition-all ease-out transform',
  visible: 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0',
  hidden: {
    fadeIn: 'opacity-0',
    slideUp: 'opacity-0 translate-y-8',
    slideDown: 'opacity-0 -translate-y-8',
    slideLeft: 'opacity-0 translate-x-8',
    slideRight: 'opacity-0 -translate-x-8',
    scaleIn: 'opacity-0 scale-95',
    rotateIn: 'opacity-0 rotate-3 scale-95'
  }
} as const;

export const RevealWrapper = memo<RevealWrapperProps>(({
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

  const computedClassName = useMemo(() => {
    const durationClass = `duration-[${duration}ms]`;
    const animationClass = isVisible 
      ? ANIMATION_CLASSES.visible 
      : ANIMATION_CLASSES.hidden[animation];
    
    return `${ANIMATION_CLASSES.base} ${durationClass} ${animationClass} ${className}`;
  }, [isVisible, animation, duration, className]);

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={computedClassName}
      style={style}
    >
      {children}
    </div>
  );
});

RevealWrapper.displayName = 'RevealWrapper';

interface StaggeredRevealProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'rotateIn' | 'scaleIn';
  staggerDelay?: number;
  className?: string;
  baseDelay?: number;
  triggerOnce?: boolean;
  threshold?: number;
}

export const StaggeredReveal = memo<StaggeredRevealProps>(({
  children,
  animation = 'slideUp',
  staggerDelay = 100,
  className = '',
  baseDelay = 0,
  triggerOnce = true,
  threshold = 0.1
}) => {
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  const renderChild = useCallback((child: React.ReactNode, index: number) => (
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
  ), [animation, baseDelay, staggerDelay, triggerOnce, threshold]);

  return (
    <div className={className}>
      {childrenArray.map(renderChild)}
    </div>
  );
});

StaggeredReveal.displayName = 'StaggeredReveal';

interface TextRevealProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  triggerOnce?: boolean;
  threshold?: number;
}

export const TextReveal = memo<TextRevealProps>(({
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
      if (!triggerOnce) {
        setDisplayedText('');
        setIsComplete(false);
      }
      return;
    }

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex++));
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
});

TextReveal.displayName = 'TextReveal';