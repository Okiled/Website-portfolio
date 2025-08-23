import React from 'react';
import { useTheme } from '../context/ThemeProvider';

type Variant = 'button' | 'switch' | 'icon' | 'minimal' | 'floating';
type Size = 'sm' | 'md' | 'lg';

interface ThemeToggleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  showLabel?: boolean;
  ariaLabel?: string;
}

const sizeConfig = {
  sm: { 
    button: 'px-4 py-2 text-sm', 
    switch: 'w-11 h-6', 
    thumb: 'w-4 h-4', 
    icon: 'w-8 h-8 p-1.5', 
    travel: 'translate-x-5',
    floating: 'w-10 h-10'
  },
  md: { 
    button: 'px-6 py-2.5 text-base', 
    switch: 'w-14 h-7', 
    thumb: 'w-5 h-5', 
    icon: 'w-10 h-10 p-2', 
    travel: 'translate-x-7',
    floating: 'w-12 h-12'
  },
  lg: { 
    button: 'px-8 py-3 text-lg', 
    switch: 'w-16 h-8', 
    thumb: 'w-6 h-6', 
    icon: 'w-12 h-12 p-2.5', 
    travel: 'translate-x-8',
    floating: 'w-14 h-14'
  },
} as const;

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'button',
  size = 'md',
  className = '',
  showLabel = true,
  ariaLabel,
}) => {
  const { theme, toggleTheme } = useTheme();
  const cfg = sizeConfig[size];
  const isDark = theme === 'dark';

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel ?? `Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={[
          cfg.button,
          'group relative font-medium rounded-xl overflow-hidden',
          'border border-primary/20 backdrop-blur-sm',
          'bg-gradient-to-r from-primary/10 via-primary/5 to-accent/5',
          'hover:from-primary/20 hover:via-primary/10 hover:to-accent/10',
          'text-primary hover:text-primary/90',
          'transition-all duration-500 ease-out',
          'hover:shadow-lg hover:shadow-primary/25 hover:scale-105',
          'active:scale-100',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface',
          className,
        ].join(' ')}
      >
        <div className="relative z-10 flex items-center gap-2">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isDark ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`}>
              <div className="relative">
                ☀️
                <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
                  !isDark ? 'animate-pulse bg-yellow-400/20 scale-150' : 'scale-0'
                }`} />
              </div>
            </div>
            
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
            }`}>
              <div className="relative">
                🌙
                <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
                  isDark ? 'animate-pulse bg-blue-400/20 scale-150' : 'scale-0'
                }`} />
              </div>
            </div>
          </div>
          
          {showLabel && (
            <span className="transition-all duration-300 group-hover:translate-x-0.5">
              Switch to {isDark ? 'Light' : 'Dark'}
            </span>
          )}
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      </button>
    );
  }

  if (variant === 'switch') {
    return (
      <div className={['flex items-center gap-4', className].join(' ')}>
        {showLabel && (
          <div className="flex items-center gap-2 text-sm font-medium text-content/80 transition-all duration-300">
            <span className={`transition-all duration-500 ${isDark ? 'opacity-50 scale-90' : 'opacity-100 scale-100'}`}>
              ☀️
            </span>
            <span>Light</span>
          </div>
        )}
        
        <button
          type="button"
          onClick={toggleTheme}
          role="switch"
          aria-checked={isDark}
          aria-label={ariaLabel ?? 'Toggle dark mode'}
          className={[
            cfg.switch,
            'group relative rounded-full transition-all duration-500 ease-out',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface',
            'border border-primary/20',
            isDark 
              ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500' 
              : 'bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500',
            'hover:shadow-lg transition-shadow duration-300',
            isDark ? 'hover:shadow-purple-500/25' : 'hover:shadow-yellow-500/25',
          ].join(' ')}
        >
          <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isDark ? 'bg-gradient-to-r from-indigo-400/30 to-purple-400/30' : 'bg-gradient-to-r from-yellow-300/30 to-orange-300/30'
          } blur-sm`} />
          
          <div
            className={[
              cfg.thumb,
              'absolute top-1 left-1 rounded-full flex items-center justify-center',
              'transition-all duration-500 ease-out will-change-transform',
              'bg-white shadow-lg border border-white/20',
              'group-hover:scale-110',
              isDark ? cfg.travel : 'translate-x-0',
            ].join(' ')}
          >
            <div className="relative">
              <div className={`absolute inset-0 flex items-center justify-center text-xs transition-all duration-500 ${
                isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
              }`}>
                ☀️
              </div>
              
              <div className={`absolute inset-0 flex items-center justify-center text-xs transition-all duration-500 ${
                isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
              }`}>
                🌙
              </div>
            </div>
          </div>
          
          {isDark && (
            <div className="absolute inset-0 overflow-hidden rounded-full">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-1 h-1 bg-white rounded-full animate-pulse`}
                  style={{
                    top: `${20 + i * 25}%`,
                    left: `${15 + i * 30}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '2s'
                  }}
                />
              ))}
            </div>
          )}
        </button>
        
        {showLabel && (
          <div className="flex items-center gap-2 text-sm font-medium text-content/80 transition-all duration-300">
            <span>Dark</span>
            <span className={`transition-all duration-500 ${isDark ? 'opacity-100 scale-100' : 'opacity-50 scale-90'}`}>
              🌙
            </span>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel ?? `Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={[
          cfg.icon,
          'group relative rounded-full overflow-hidden',
          'border border-primary/20 backdrop-blur-sm',
          'bg-gradient-to-br from-primary/10 to-accent/10',
          'hover:from-primary/20 hover:to-accent/20',
          'text-primary transition-all duration-500 ease-out',
          'hover:scale-110 active:scale-95',
          'hover:shadow-lg hover:shadow-primary/25',
          'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface',
          className,
        ].join(' ')}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}>
            ☀️
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`}>
            🌙
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
      </button>
    );
  }

  if (variant === 'minimal') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel ?? `Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={[
          'group relative p-2 rounded-lg transition-all duration-300',
          'text-content/70 hover:text-content/90',
          'hover:bg-primary/5 active:bg-primary/10',
          'focus:outline-none focus:ring-2 focus:ring-primary/30',
          className,
        ].join(' ')}
      >
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100'
          }`}>
            ☀️
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'
          }`}>
            🌙
          </div>
        </div>
      </button>
    );
  }

  if (variant === 'floating') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={ariaLabel ?? `Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={[
          cfg.floating,
          'group fixed bottom-6 right-6 z-50 rounded-full',
          'border border-primary/20 backdrop-blur-md',
          'bg-gradient-to-br from-surface/80 via-surface/60 to-surface/80',
          'text-primary shadow-lg shadow-primary/10',
          'hover:shadow-xl hover:shadow-primary/20',
          'transition-all duration-500 ease-out',
          'hover:scale-110 active:scale-100',
          'focus:outline-none focus:ring-2 focus:ring-primary/50',
          className,
        ].join(' ')}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`}>
            <div className="relative">
              ☀️
              <div className="absolute inset-0 bg-yellow-400/20 rounded-full animate-ping scale-150" />
            </div>
          </div>
          
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'
          }`}>
            <div className="relative">
              🌙
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping scale-150" />
            </div>
          </div>
        </div>
        
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
      </button>
    );
  }

  return null;
};

interface CustomThemeToggleProps {
  lightIcon?: React.ReactNode;
  darkIcon?: React.ReactNode;
  className?: string;
  showTooltip?: boolean;
  ariaLabel?: string;
  variant?: 'default' | 'glass' | 'neon';
}

export const CustomThemeToggle: React.FC<CustomThemeToggleProps> = ({
  lightIcon = '☀️',
  darkIcon = '🌙',
  className = '',
  showTooltip = true,
  ariaLabel,
  variant = 'default',
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const variantStyles = {
    default: [
      'bg-gradient-to-br from-primary/15 via-primary/5 to-accent/10',
      'border-primary/25',
      'hover:from-primary/25 hover:via-primary/15 hover:to-accent/20',
    ],
    glass: [
      'bg-white/10 backdrop-blur-xl border-white/20',
      'hover:bg-white/20',
      isDark ? 'shadow-black/20' : 'shadow-gray-500/20',
    ],
    neon: [
      isDark ? 'bg-gradient-to-br from-cyan-500/20 to-purple-500/20' : 'bg-gradient-to-br from-yellow-400/20 to-orange-500/20',
      isDark ? 'border-cyan-400/40' : 'border-yellow-400/40',
      isDark ? 'hover:shadow-cyan-400/30' : 'hover:shadow-yellow-400/30',
      'hover:shadow-lg',
    ],
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={ariaLabel ?? `Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      title={showTooltip ? `Switch to ${isDark ? 'Light' : 'Dark'} mode` : undefined}
      className={[
        'group relative p-4 rounded-2xl transition-all duration-700',
        'border backdrop-blur-sm hover:scale-110 active:scale-100',
        'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-surface',
        ...variantStyles[variant],
        className,
      ].join(' ')}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          isDark ? 'opacity-0 rotate-180 scale-50' : 'opacity-100 rotate-0 scale-100'
        }`}>
          <div className="relative">
            {lightIcon}
            {variant === 'neon' && !isDark && (
              <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-pulse scale-150 blur-sm" />
            )}
          </div>
        </div>
        
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
          isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-50'
        }`}>
          <div className="relative">
            {darkIcon}
            {variant === 'neon' && isDark && (
              <div className="absolute inset-0 bg-cyan-400/30 rounded-full animate-pulse scale-150 blur-sm" />
            )}
          </div>
        </div>
      </div>
      
      {showTooltip && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none bg-primary text-surface shadow-lg transform group-hover:-translate-y-1">
          {isDark ? 'Light mode' : 'Dark mode'}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary" />
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl" />
    </button>
  );
};