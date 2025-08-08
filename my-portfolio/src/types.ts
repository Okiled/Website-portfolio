export type LucideIcon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface SocialLink {
  icon: LucideIcon;
  href: string;
  label: string;
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
  stats: {
    views: number;
    likes: number;
    comments: number;
  };
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
