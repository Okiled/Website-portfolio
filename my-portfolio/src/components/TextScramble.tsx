import React, { useState, useRef, useEffect } from 'react';

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const TextScramble: React.FC<TextScrambleProps> = ({
  text,
  className = '',
  delay = 250,
}) => {
  const [displayChars, setDisplayChars] = useState<string[]>(text.split(''));
  const intervalsRef = useRef<Array<NodeJS.Timeout | null>>([]);
  const timeoutsRef = useRef<Array<NodeJS.Timeout | null>>([]);

  // Reset if text prop berubah
  useEffect(() => {
    setDisplayChars(text.split(''));
    intervalsRef.current.forEach(intv => intv && clearInterval(intv));
    timeoutsRef.current.forEach(tmo => tmo && clearTimeout(tmo));
    intervalsRef.current = [];
    timeoutsRef.current = [];
  }, [text]);

  // Scramble logic per huruf
  const handleMouseEnter = (index: number) => {
    // Stop restore timeout jika ada
    if (timeoutsRef.current[index]) clearTimeout(timeoutsRef.current[index]);
    // Sudah scramble, skip
    if (intervalsRef.current[index]) return;
    intervalsRef.current[index] = setInterval(() => {
      setDisplayChars(prev => {
        const newChars = [...prev];
        if (text[index] !== ' ') {
          newChars[index] =
            letters[Math.floor(Math.random() * letters.length)];
        }
        return newChars;
      });
    }, 35);
  };

  const handleMouseLeave = (index: number) => {
    if (intervalsRef.current[index]) {
      clearInterval(intervalsRef.current[index]);
      intervalsRef.current[index] = null;
    }
    timeoutsRef.current[index] = setTimeout(() => {
      setDisplayChars(prev => {
        const newChars = [...prev];
        newChars[index] = text[index];
        return newChars;
      });
      timeoutsRef.current[index] = null;
    }, delay);
  };

  // Cleanup saat unmount
  useEffect(() => {
    return () => {
      intervalsRef.current.forEach(intv => intv && clearInterval(intv));
      timeoutsRef.current.forEach(tmo => tmo && clearTimeout(tmo));
    };
  }, []);

  return (
    <span className={className} style={{ userSelect: 'none' }}>
      {displayChars.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-200 ${
            char === ' ' ? 'w-4' : 'hover:scale-125 hover:text-pink-400 mx-1'
          }`}
          style={{
            minWidth: char === ' ' ? '1rem' : '0.8rem',
            textAlign: 'center',
            textShadow: intervalsRef.current[index]
              ? '0 0 10px currentColor'
              : 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

export default TextScramble;
