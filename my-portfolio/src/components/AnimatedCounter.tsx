import React, { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
  end, 
  suffix = '', 
  duration = 2000 
}) => {
  const [count, setCount] = useState<number>(0);
  
  useEffect(() => {
    let startTime: number;
    const animate = (currentTime: number): void => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  return <span>{count}{suffix}</span>;
};

export default AnimatedCounter;