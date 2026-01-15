
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
}

export interface Skill {
  name: string;
  category: 'Cloud' | 'Infrastructure' | 'CI/CD' | 'Monitoring' | 'Security';
  logos: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string; // Added logo field
}
