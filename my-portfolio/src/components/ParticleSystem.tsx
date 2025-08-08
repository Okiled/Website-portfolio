import React, { useRef, useEffect } from 'react';
import type { Particle, MousePosition } from '../types';

const ParticleSystem: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const resizeCanvas = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x?: number, y?: number): Particle => ({
      x: x || Math.random() * canvas.width,
      y: y || Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.5 ? '#06b6d4' : '#8b5cf6'
    });

    const initParticles = (): void => {
      particles.current = [];
      for (let i = 0; i < 50; i++) {
        particles.current.push(createParticle());
      }
    };

    const updateParticles = (): void => {
      particles.current.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Mouse interaction
        const dx = mouse.current.x - particle.x;
        const dy = mouse.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += dx * force * 0.01;
          particle.vy += dy * force * 0.01;
        }

        // Boundaries
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        
        // Friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      });
    };

    const drawParticles = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Connections
        particles.current.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 120) * 50).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });
    };

    const animate = (): void => {
      updateParticles();
      drawParticles();
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent): void => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};

export default ParticleSystem;