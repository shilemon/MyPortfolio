
import NetflixImg from "./src/assets/projects/netflix.png";
import ThreeTierImg from "./src/assets/projects/3tier.png";
import Wanduerlust from "./src/assets/projects/Wanderlust.jpg";
import OnlineShopImg from "./src/assets/projects/onlineshop.png";

import ResumePdf from "./src/resume/EmonShil_resume.pdf";

import { Project, Skill, Experience } from './types';
export const RESUME_URL = ResumePdf;
export const LINKEDIN_URL = 'https://www.linkedin.com/in/emon-shil-45ba97272/';
export const GITHUB_URL = 'https://github.com/shilemon';
export const EMAIL = 'emonshil.htuc@gmail.com';
export const PHONE = '+8801935570856';

export const PROFILE_IMAGE = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';

/** 
 * High-fidelity reconstruction of the Cikatech logo provided by the user.
 * Geometric slanted frame with double horizontal cross-bars.
 */
const CIKATECH_LOGO_SVG = `data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M35 22H85L75 78H25L35 22Z" stroke="white" stroke-width="5" stroke-linejoin="round"/>
  <path d="M15 46H85" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <path d="M15 54H85" stroke="white" stroke-width="4" stroke-linecap="round"/>
  <path d="M35 22V78M75 22V78" stroke="white" stroke-width="2" stroke-opacity="0.3"/>
</svg>`;

export const PROJECTS: Project[] = [
  {
    id: '3-tier-cloud',
    title: '3-Tier Cloud-Native App on AWS',
    description: 'Architected and deployed a highly available 3-tier system on AWS EKS. Utilized Docker for containerization, Amazon ECR for image management, and ALB Ingress for intelligent traffic routing.',
    tags: ['AWS EKS', 'ECR', 'Docker', 'ALB Ingress', 'Helm'],
    image: ThreeTierImg,
    link: 'https://github.com/shilemon/3-tier-app.git'
  },
  
{
  id: "gitops-netflix",
  title: "GitOps Pipeline: Netflix Clone",
  description:
    "Developed a robust CI/CD pipeline leveraging Jenkins for automation and ArgoCD for GitOps-based deployments. Managed Kubernetes infrastructure with custom Helm charts.",
  tags: ["Jenkins", "ArgoCD", "GitOps", "Kubernetes", "Prometheus"],
  image: NetflixImg,
  link: "https://github.com/shilemon/Netflix-clone.git"
},

  {
    id: 'wanderlust-k8s',
    title: 'Wanderlust: Kubernetes Platform',
    description: 'Successfully deployed a multi-tier travel application on a self-managed K8s cluster (kubeadm). Implemented persistent storage and multi-stage Docker builds for efficiency.',
    tags: ['kubeadm', 'Docker', 'StorageClasses', 'YAML'],
    image: Wanduerlust,
    link: 'https://github.com/shilemon/wanderlust.git'
  },
  {
    id: 'cikaslot-infra',
    title: 'Cikaslot: High-Availability AWS',
    description: 'Designed mission-critical infrastructure using AWS EC2, RDS, and VPC. Configured Auto-Scaling Groups and Load Balancers to handle massive traffic spikes with zero downtime.',
    tags: ['AWS', 'RDS', 'Auto-Scaling', 'VPC Architecture'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    link: LINKEDIN_URL
  },
  
{
  id: "online-shop-bluegreen",
  title: "Online Shop: Blue-Green CI/CD on Kubernetes (kind)",
  description:
    "Built an online shop and delivered zero-downtime releases using Blue-Green deployments on a kind cluster (AWS EC2). Automated build/push to Docker Hub with GitHub Actions and switched traffic via Service selectors with instant rollback.",
  tags: ["GitHub Actions", "Docker", "Kubernetes (kind)", "Blue-Green", "AWS EC2", "YAML"],
  image: OnlineShopImg,
  link: 'https://github.com/shilemon/Online_shop.git'
}
];

export const SKILLS: Skill[] = [
  { 
    name: 'AWS & Azure', 
    category: 'Cloud', 
    logos: [
      'https://api.iconify.design/logos:aws.svg',
      'https://api.iconify.design/logos:microsoft-azure.svg'
    ] 
  },
  { 
    name: 'K8s & Helm', 
    category: 'Infrastructure', 
    logos: [
      'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
      'https://www.vectorlogo.zone/logos/helmsh/helmsh-icon.svg'
    ] 
  },
  { 
    name: 'Docker & GitOps', 
    category: 'Infrastructure', 
    logos: [
      'https://www.vectorlogo.zone/logos/docker/docker-icon.svg',
      'https://commons.wikimedia.org/wiki/Special:FilePath/GitOps%20Icon.svg'
    ] 
  },
  { 
    name: 'Jenkins & Actions', 
    category: 'CI/CD', 
    logos: [
      'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg',
      'https://www.vectorlogo.zone/logos/github/github-tile.svg'
    ] 
  },
  { 
    name: 'Terraform & Ansible', 
    category: 'Infrastructure', 
    logos: [
      'https://raw.githubusercontent.com/hashicorp/terraform-website/master/public/img/logo-hashicorp.svg',
      'https://www.vectorlogo.zone/logos/ansible/ansible-icon.svg'
    ] 
  },
  { 
    name: 'Prometheus & Grafana', 
    category: 'Monitoring', 
    logos: [
      'https://www.vectorlogo.zone/logos/prometheusio/prometheusio-icon.svg',
      'https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg'
    ] 
  },
  { 
    name: 'SonarQube & Trivy', 
    category: 'Security', 
    logos: [
      'https://europe1.discourse-cdn.com/sonarsource/uploads/sonarcommunity/original/3X/e/1/e1367a12d682c75b4eb1c7e83bc0765043ba79c3.png', 
      'https://raw.githubusercontent.com/aquasecurity/trivy-docker-extension/main/trivy.svg'
    ] 
  },
  { 
    name: 'Nginx & Linux', 
    category: 'Infrastructure', 
    logos: [
      'https://www.vectorlogo.zone/logos/nginx/nginx-icon.svg',
      'https://www.vectorlogo.zone/logos/linux/linux-icon.svg'
    ] 
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Cikatech Inc.',
    role: 'DevOps Engineer',
    period: 'Oct. 2022 – Sep. 2024',
    logo: CIKATECH_LOGO_SVG,
    description: [
      'Designed and orchestrated scalable AWS infrastructure using EC2, S3, RDS, and VPC components.',
      'Streamlined delivery cycles by implementing automated CI/CD pipelines via Jenkins and GitHub Actions.',
      'Optimized system reliability using Prometheus, Grafana, and New Relic for comprehensive observability.',
      'Secured production environments by integrating SonarQube, Trivy, and Findbugs into automation workflows.',
      'Conducted infrastructure penetration testing and vulnerability assessments to harden security posture.'
    ]
  }
];

export const EDUCATION = {
  school: 'American International University Bangladesh',
  degree: 'Bachelor of Science in Computer Science & Engineering',
  period: 'Nov 2021 – Dec 2025',
  location: 'Dhaka, Bangladesh',
  // Stable direct URL for the official AIUB circular seal
  logo: 'https://www.aiub.edu/Files/Templates/NewAIUB/assets/images/aiub-logo.svg'
};
