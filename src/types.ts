export type TabId = 'home' | 'about' | 'projects' | 'skills' | 'contact';

export interface Project {
  id: string;
  number: string;
  name: string;
  category: string;
  description?: string;
  technologies?: string[];
  liveUrl: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  note?: string;
  bullets?: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  period: string;
  institution: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: string[];
  accentColor: string;
}

export interface SocialLink {
  name: string;
  url: string;
  ariaLabel: string;
  icon: string;
}
