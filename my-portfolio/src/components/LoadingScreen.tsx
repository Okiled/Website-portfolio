import React, { useState, useEffect } from 'react';
import { Code, Brain, TrendingUp, Zap, Layers } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const loadingTexts = [
    'Initializing AI Systems...',
    'Loading Portfolio Data...',
    'Connecting to GitHub...',
    'Preparing Experience...',
    'Finalizing Interface...',
    'Welcome!'
  ];

  useEffect(() => {
    const duration = 3000;
    const interval = 50;
    const steps = duration / interval;
    const progressStep = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(currentStep * progressStep, 100);
      setProgress(newProgress);

      const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
      setCurrentText(loadingTexts[textIndex]);

      if (newProgress >= 100) {
        clearInterval(timer);
        setIsComplete(true);
        setTimeout(() => onLoadingComplete(), 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  const FloatingParticles: React.FC = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const skillIcons = [Code, Brain, TrendingUp, Zap, Layers];

  return (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      <FloatingParticles />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-purple-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-pink-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <div className="mb-8 transform animate-pulse">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 p-1 animate-spin">
            <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
              <span className="text-3xl font-bold text-white font-mono">DH</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {skillIcons.map((Icon, index) => (
            <div
              key={index}
              className="p-3 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm animate-bounce"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
          DELIKO HARTONO
        </h1>

        <div className="mb-8">
          <p className="text-white/80 text-lg mb-2 h-6 animate-pulse">{currentText}</p>
        </div>

        <div className="mb-6">
          <div className="w-full bg-white/10 rounded-full h-2 backdrop-blur-sm border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-white/60 text-sm">Loading...</span>
            <span className="text-cyan-400 text-sm font-mono">{Math.round(progress)}%</span>
          </div>
        </div>

        <div className="flex justify-center space-x-2 flex-wrap">
          {['AI', 'React', 'Python', 'Finance'].map((tech, index) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 backdrop-blur-sm animate-pulse"
              style={{ animationDelay: `${index * 300}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-xs">Preparing your portfolio experience...</p>
        </div>
      </div>

      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-cyan-400/30 animate-pulse" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-purple-400/30 animate-pulse" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-purple-400/30 animate-pulse" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-cyan-400/30 animate-pulse" />

      <div className="absolute inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}
        />
      </div>

      {/* FIX: jangan pakai <style tsx> */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
