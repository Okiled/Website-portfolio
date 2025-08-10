// hooks/useScrollReveal.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useScrollReveal = (options: ScrollRevealOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }

      if (entry.isIntersecting) {
        if (delay > 0) {
          timeoutRef.current = window.setTimeout(() => {
            setIsVisible(true);
            
            // If triggerOnce is true, disconnect observer after revealing
            if (triggerOnce && observerRef.current && elementRef.current) {
              observerRef.current.unobserve(elementRef.current);
            }
          }, delay);
        } else {
          setIsVisible(true);
          
          // If triggerOnce is true, disconnect observer after revealing
          if (triggerOnce && observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      } else if (!triggerOnce) {
        // For unreveal effect, set visible to false immediately without delay
        setIsVisible(false);
      }
    },
    [delay, triggerOnce]
  );

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
      rootMargin,
    });

    observerRef.current = observer;
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, threshold, rootMargin]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { elementRef, isVisible };
};

// Hook untuk multiple elements dengan staggered animation
export const useScrollRevealMultiple = (options: ScrollRevealOptions = {}) => {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const timeoutsRef = useRef<Map<number, number>>(new Map());
  const observersRef = useRef<(IntersectionObserver | null)[]>([]);

  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  useEffect(() => {
    const observers = elementsRef.current.map((element, index) => {
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Clear existing timeout for this element
          const existingTimeout = timeoutsRef.current.get(index);
          if (existingTimeout) {
            window.clearTimeout(existingTimeout);
            timeoutsRef.current.delete(index);
          }

          if (entry.isIntersecting) {
            const elementDelay = delay + (index * 100); // Staggered delay
            
            if (elementDelay > 0) {
              const timeout = window.setTimeout(() => {
                setVisibleElements(prev => new Set([...prev, index]));
                timeoutsRef.current.delete(index);
                
                // If triggerOnce is true, disconnect observer after revealing
                if (triggerOnce && observer) {
                  observer.unobserve(element);
                }
              }, elementDelay);
              
              timeoutsRef.current.set(index, timeout);
            } else {
              setVisibleElements(prev => new Set([...prev, index]));
              
              // If triggerOnce is true, disconnect observer after revealing
              if (triggerOnce && observer) {
                observer.unobserve(element);
              }
            }
          } else if (!triggerOnce) {
            // For unreveal effect, remove from visible set immediately
            setVisibleElements(prev => {
              const newSet = new Set(prev);
              newSet.delete(index);
              return newSet;
            });
          }
        },
        { threshold, rootMargin }
      );

      observer.observe(element);
      observersRef.current[index] = observer;
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
      // Clear all timeouts
      timeoutsRef.current.forEach(timeout => window.clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, [threshold, rootMargin, triggerOnce, delay]);

  const setElementRef = useCallback((index: number) => (ref: HTMLElement | null) => {
    elementsRef.current[index] = ref;
  }, []);

  const isVisible = useCallback((index: number) => visibleElements.has(index), [visibleElements]);

  return { setElementRef, isVisible };
};