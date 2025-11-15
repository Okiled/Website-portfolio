import React from 'react';

export type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
  downloadFilename?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  points: string[];
  icon: LucideIcon;
  color: 'cyan' | 'purple' | 'pink';
}

export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  tech: string[];
  color: 'cyan' | 'purple' | 'pink';
  image?: string;   // <—— tambah hanya ini
}

export interface Skill {
  icon: LucideIcon;
  title: string;
  skills: string[];
  color: 'cyan' | 'purple' | 'pink';
  description: string; 
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

export type ColorVariant = 'cyan' | 'purple' | 'pink';

export interface ProjectLinks {
  github: string;
  githubApi?: string;
  demo: string;
}

export interface ProjectPerformance {
  "Total Return": string;
  "Benchmark": string;
  "Sharpe Ratio": string;
  "Max Drawdown": string;
  "Win Rate": string;
  "RMSE": string;
}

export interface ProjectDetails {
  fullDescription: string;
  features: string[];
  installation: string[];
  links: ProjectLinks;
  performance?: ProjectPerformance;
}
