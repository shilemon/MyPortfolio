import React, { useState, useEffect, useRef } from 'react';
import ParticleCanvas from './src/components/ParticleCanvas';
import ScrollReveal from './src/components/ScrollReveal';
import CursorTrail from './src/components/CursorTrail';
import TechGlobe from './src/components/TechGlobe';
import Official from "./src/assets/Official.jpeg";
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Globe,
  Phone,
  GraduationCap,
  Calendar,
  Server
} from 'lucide-react';
import { PROJECTS, SKILLS, EXPERIENCES, LINKEDIN_URL, EDUCATION, EMAIL, PHONE, GITHUB_URL, RESUME_URL} from './constants';
import ChatBot from './components/ChatBot';

// ── Magnetic Button Hook ──────────────────────────────────────────────────────
function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px) scale(1.06)`;
      el.style.transition = 'transform 0.15s ease';
    };
    const handleLeave = () => {
      el.style.transform = 'translate(0px, 0px) scale(1)';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);
  return ref;
}

// ── Typewriter Hook ───────────────────────────────────────────────────────────
function useTypewriter(text: string, speed = 28, delay = 800) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    setDone(false);
    const timeout = setTimeout(() => {
      const timer = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) { clearInterval(timer); setDone(true); }
      }, speed);
      return () => clearInterval(timer);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);
  return { displayed, done };
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [eduLogoError, setEduLogoError] = useState(false);
  const hireMeRef = useMagnetic(0.4);

  // ── Refs for scroll-driven DOM updates (no re-renders) ──
  const progressBarRef  = useRef<HTMLDivElement>(null);
  const heroBlobRef     = useRef<HTMLDivElement>(null);
  const profileRef      = useRef<HTMLDivElement>(null);
  const skillsSectionRef = useRef<HTMLElement>(null);

  const bioText = "DevOps Engineer with 2+ years of experience in AWS, CI/CD, Docker, Kubernetes and Linux. I enjoy automating infrastructure, improving deployment workflows, and building reliable cloud systems. Open To New Opportunities.";
  const { displayed: typedBio, done: bioTyped } = useTypewriter(bioText, 22, 1200);

  // ── Single scroll listener — direct DOM manipulation, no setState ──
  useEffect(() => {
    let rafId: number;

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const sy    = window.scrollY;
        const total = document.body.scrollHeight - window.innerHeight;

        // Progress bar
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${total > 0 ? (sy / total) * 100 : 0}%`;
        }
        // Hero blob parallax
        if (heroBlobRef.current) {
          heroBlobRef.current.style.transform = `translateY(${sy * 0.18}px)`;
        }
        // Profile image counter-parallax
        if (profileRef.current) {
          profileRef.current.style.transform = `translateY(${sy * -0.06}px)`;
        }
        // Skills section subtle float
        if (skillsSectionRef.current) {
          const offset = Math.max(0, sy - 600) * 0.04;
          skillsSectionRef.current.style.transform = `translateY(${offset}px)`;
        }

        // Active section — setState only when section actually changes
        const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
        const scrollPos = sy + 100;
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el && scrollPos >= el.offsetTop && scrollPos < el.offsetTop + el.offsetHeight) {
            setActiveSection(prev => (prev !== section ? section : prev));
            break;
          }
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const backgroundLogos = [
    { url: 'https://api.iconify.design/logos:aws.svg', top: '15%', left: '10%', delay: '0s' },
    { url: 'https://api.iconify.design/logos:microsoft-azure.svg', top: '25%', left: '85%', delay: '2s' },
    { url: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg', top: '70%', left: '15%', delay: '4s' },
    { url: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg', top: '65%', left: '80%', delay: '1s' },
    { url: 'https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg', top: '40%', left: '75%', delay: '3s' },
    { url: 'https://raw.githubusercontent.com/hashicorp/terraform-website/master/public/img/logo-hashicorp.svg', top: '10%', left: '50%', delay: '5s' },
    { url: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg', top: '80%', left: '50%', delay: '5s' },
  ];

  const handleTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -12;
    const rotateY = ((x - rect.width / 2) / rect.width) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = 'transform 0.1s ease';
  };

  const handleTiltReset = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    e.currentTarget.style.transition = 'transform 0.5s ease';
  };

  const handleRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn  = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position:absolute;border-radius:50%;pointer-events:none;
      width:${size}px;height:${size}px;
      left:${e.clientX - rect.left - size / 2}px;
      top:${e.clientY - rect.top - size / 2}px;
      background:rgba(255,255,255,0.3);
      transform:scale(0);animation:rippleAnim 0.6s ease-out forwards;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">

      {/* Cursor Trail */}
      <CursorTrail />

      {/* Open to Work Badge */}
      <div className="fixed bottom-8 left-8 z-50 flex items-center gap-3 px-5 py-3 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-black uppercase tracking-widest backdrop-blur-xl animate-float-1 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        Open to Work
      </div>

      {/* Full-page 3D Particle Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <ParticleCanvas />
        </div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 blur-[150px] rounded-full"></div>
        <div className="absolute inset-0 opacity-[0.03]">
          {backgroundLogos.map((logo, i) => (
            <img key={i} src={logo.url} alt=""
              className="absolute w-24 h-24 animate-drift grayscale brightness-200"
              style={{ top: logo.top, left: logo.left, animationDelay: logo.delay }}
            />
          ))}
        </div>
      </div>

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-800/50">
        {/* Scroll Progress Bar — driven by ref, zero re-renders */}
        <div
          ref={progressBarRef}
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
          style={{ width: '0%' }}
        />
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:rotate-6 transition-transform cursor-pointer border border-indigo-500/30">
              <img src={Official} alt="Emon Shil" className="w-full h-full object-cover" loading="eager" />
            </div>
            <div className="hidden sm:block">
              <span className="font-extrabold tracking-tighter text-xl block leading-none">EMON SHIL</span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">DevOps Engineer</span>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            {['Home', 'Skills', 'Projects', 'Experience'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`}
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-indigo-400 ${
                  activeSection === item.toLowerCase()
                    ? 'text-indigo-400 scale-105 underline underline-offset-8 decoration-2'
                    : 'text-zinc-500'
                }`}
              >{item}</a>
            ))}
            <a
              href={RESUME_URL}
              download="EmonShil_resume.pdf"
              className="hidden md:inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all duration-300"
            >
              Resume ↓
            </a>
          </div>

          <div className="hidden lg:flex gap-5 items-center">
            <a href={GITHUB_URL} target="_blank" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"><Github className="w-5 h-5" /></a>
            <a href={LINKEDIN_URL} target="_blank" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20">

        {/* ── HERO ── */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-20 relative">

          {/* Parallax blobs — driven by ref */}
          <div ref={heroBlobRef} className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-0 w-96 h-96 bg-indigo-600/5 blur-[140px] rounded-full"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-20 items-center relative z-10">
            <div className="space-y-10 animate-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                DevOps Engineer
              </div>

              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter overflow-hidden flex flex-col gap-4">
                <span style={{
                  background: 'linear-gradient(90deg, #ffffff 0%, #a5b4fc 50%, #ffffff 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3s linear infinite, wordBounce 4s cubic-bezier(0.16,1,0.3,1) infinite',
                  display: 'block',
                }}>Emon</span>
                <span style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 40%, #818cf8 70%, #6366f1 100%)',
                  backgroundSize: '300% 300%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'gradientShift 4s ease infinite, wordBounce2 4s cubic-bezier(0.16,1,0.3,1) infinite',
                  filter: 'drop-shadow(0 0 30px rgba(99,102,241,0.4))',
                  display: 'block',
                }}>Shil.</span>
              </h1>

              {/* Typewriter bio */}
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-medium min-h-[100px]">
                {typedBio}
                {!bioTyped && (
                  <span className="inline-block w-[2px] h-[1.2em] bg-indigo-400 ml-1 align-middle animate-pulse" />
                )}
              </p>

              <div className="flex flex-wrap gap-5 pt-6">
                <a
                  ref={hireMeRef}
                  href="#contact"
                  className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm tracking-widest transition-colors hover:shadow-[0_10px_40px_rgba(79,70,229,0.6)] flex items-center gap-3 group uppercase shadow-[0_0_30px_rgba(99,102,241,0.3)]"
                >
                  Hire Me <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  className="px-10 py-5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded-2xl font-black text-sm tracking-widest transition-all hover:-translate-y-1 flex items-center gap-3 uppercase"
                >
                  <Linkedin className="w-5 h-5" /> LinkedIn
                </a>
              </div>
            </div>

            {/* Profile Frame — ref-driven parallax + 3D mouse tilt */}
            <div
              ref={profileRef}
              className="relative group animate-in fade-in zoom-in duration-1000 delay-200"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
                el.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
                el.style.transition = 'transform 0.1s ease';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                e.currentTarget.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
              }}
            >
              <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-[120px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] border-2 border-zinc-800/50 bg-zinc-900/20 p-3 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-indigo-500/40">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-950 relative">
                  <img src={Official} alt="Emon Shil"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 px-8 py-5 rounded-3xl shadow-2xl flex flex-col items-center animate-float-1">
                  <span className="text-3xl font-black text-indigo-500">2+</span>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Years Active</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section
          ref={skillsSectionRef}
          id="skills"
          className="py-32 border-t border-zinc-900/50"
        >
          <ScrollReveal direction="up">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter glitch-text">Stack & Tools.</h2>
              <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-[0.3em] text-sm">
                Comprehensive Cloud & Automation Ecosystem
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {SKILLS.map((skill, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 0.1}>
                <div
                  onMouseMove={(e) => {
                    const card = e.currentTarget;
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const rotateX = ((y - rect.height / 2) / rect.height) * -20;
                    const rotateY = ((x - rect.width / 2) / rect.width) * 20;
                    const glowX = (x / rect.width) * 100;
                    const glowY = (y / rect.height) * 100;
                    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
                    card.style.transition = 'transform 0.1s ease';
                    const glow = card.querySelector('.skill-glow') as HTMLElement;
                    if (glow) glow.style.background = `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(99,102,241,0.25) 0%, transparent 70%)`;
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
                    card.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
                    const glow = card.querySelector('.skill-glow') as HTMLElement;
                    if (glow) glow.style.background = 'transparent';
                  }}
                  className="group p-8 md:p-10 glass-card rounded-[2.5rem] hover:border-indigo-500/40 transition-colors duration-300 relative overflow-hidden flex flex-col items-center text-center shadow-lg cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="skill-glow absolute inset-0 rounded-[2.5rem] transition-all duration-200 pointer-events-none z-0"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[60px] rounded-full translate-x-10 -translate-y-10 group-hover:bg-indigo-500/30 group-hover:scale-150 transition-all duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 blur-[40px] rounded-full -translate-x-6 translate-y-6 group-hover:bg-blue-500/15 group-hover:scale-125 transition-all duration-700"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[2.5rem]">
                    <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" style={{ animation: 'scanLine 2s linear infinite' }}></div>
                  </div>
                  <div className="absolute top-5 left-5 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-10">
                    {skill.category}
                  </div>
                  <div className="flex -space-x-4 mb-10 h-28 items-center justify-center relative z-10 w-full" style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                    {skill.logos.map((logoUrl, idx) => (
                      <div key={idx}
                        className={`${(idx + i) % 2 === 0 ? 'animate-float-1' : 'animate-float-2'} w-20 h-20 md:w-24 md:h-24 bg-zinc-950 rounded-2xl flex items-center justify-center p-5 backdrop-blur-3xl border border-white/5 group-hover:border-indigo-500/50 transition-all duration-700 shadow-2xl relative shrink-0 overflow-hidden`}
                        style={{ animationDelay: `${idx * -2.5}s`, zIndex: skill.logos.length - idx, boxShadow: '0 0 0 1px rgba(255,255,255,0.05)' }}
                      >
                        <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-500 rounded-2xl"></div>
                        <img src={logoUrl} alt={`${skill.name} tool`}
                          className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-500 group-hover:scale-110 relative z-10"
                          loading="eager"
                        />
                      </div>
                    ))}
                  </div>
                  <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="relative z-10">
                    <h3 className="font-black text-xl md:text-2xl mb-1 group-hover:text-indigo-400 transition-colors tracking-tight">{skill.name}</h3>
                    <p className="text-[11px] text-zinc-500 group-hover:text-zinc-400 font-black uppercase tracking-[0.2em] transition-colors">{skill.category}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400 transition-all duration-700 rounded-full"></div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* 3D Tech Globe */}
          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-20 h-[500px] w-full relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-xs absolute bottom-4">Tech Ecosystem</p>
              </div>
              <TechGlobe />
            </div>
          </ScrollReveal>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-32 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal direction="up">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-24 text-center glitch-text">Professional Journey.</h2>
            </ScrollReveal>

            <div className="space-y-16">
              {EXPERIENCES.map((exp, i) => (
                <ScrollReveal key={i} direction="left" delay={i * 0.2}>
                  <div className="flex flex-col md:flex-row gap-12 group">
                    <div className="md:w-1/3 pt-3">
                      <div className="sticky top-24 space-y-8">
                        <div className="inline-block px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-black text-xs uppercase tracking-widest rounded-xl">
                          {exp.period}
                        </div>

                        {/* 3D Flip Card Logo */}
                        <div className="relative w-36 h-36" style={{ perspective: '800px' }}>
                          <div
                            className="w-full h-full transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]"
                            style={{ transformStyle: 'preserve-3d', position: 'relative' }}
                          >
                            {/* Front */}
                            <div className="absolute inset-0 glass-card rounded-[2rem] p-8 flex items-center justify-center overflow-hidden border-zinc-800/50"
                              style={{ backfaceVisibility: 'hidden' }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/5 opacity-50"></div>
                              <div className="absolute inset-0 opacity-20 animate-pulse">
                                <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"></div>
                                <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full"></div>
                              </div>
                              {exp.logo ? (
                                <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain relative z-10 brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                              ) : (
                                <Server className="w-12 h-12 text-indigo-500 relative z-10" />
                              )}
                            </div>
                            {/* Back */}
                            <div className="absolute inset-0 glass-card rounded-[2rem] p-5 flex flex-col items-center justify-center gap-2 bg-indigo-600/10 border border-indigo-500/40"
                              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                            >
                              <div className="text-center">
                                <div className="text-white font-black text-sm mb-1">{exp.company}</div>
                                <div className="text-indigo-400 text-[10px] uppercase tracking-widest">{exp.role}</div>
                                <div className="mt-2 px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[9px] font-black">{exp.period}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                          <div className="relative flex h-2 w-2">
                            <div className={`${i === 0 ? 'animate-ping' : ''} absolute inline-flex h-full w-full rounded-full ${i === 0 ? 'bg-indigo-500/40' : 'bg-zinc-500/40'} opacity-75`}></div>
                            <div className={`relative inline-flex rounded-full h-2 w-2 ${i === 0 ? 'bg-indigo-500' : 'bg-zinc-500'}`}></div>
                          </div>
                          {i === 0 ? 'Active Workload' : 'Completed'}
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 pb-16 border-l-2 border-zinc-800 pl-12 relative">
                      {/* 3D Pulse Ring Timeline Dot */}
                      <div className="absolute left-[-11px] top-4 w-5 h-5">
                        <div className="absolute inset-0 rounded-full bg-indigo-600 border-4 border-zinc-950 shadow-[0_0_20px_rgba(79,70,229,1)] group-hover:scale-125 transition-transform duration-500 z-10"></div>
                        <div className="absolute inset-[-6px] rounded-full border border-indigo-500/40 animate-ping"></div>
                        <div className="absolute inset-[-12px] rounded-full border border-indigo-500/20 animate-ping" style={{ animationDelay: '0.4s' }}></div>
                        <div className="absolute inset-[-18px] rounded-full border border-indigo-500/10 animate-ping" style={{ animationDelay: '0.8s' }}></div>
                      </div>
                      <h3 className="text-4xl font-black mb-2 group-hover:text-indigo-400 transition-colors tracking-tight">{exp.role}</h3>
                      <p className="text-2xl text-zinc-300 font-bold mb-10 tracking-tight">{exp.company}</p>
                      <ul className="space-y-6 text-zinc-400">
                        {exp.description.map((item, j) => (
                          <li key={j} className="flex items-start gap-5 leading-relaxed font-medium group/item">
                            <div className="mt-2.5 w-2 h-2 rounded-full bg-indigo-500/40 group-hover/item:bg-indigo-500 transition-colors shrink-0"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Academic Foundation */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-32 p-12 glass-card rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-indigo-500/30 transition-all duration-700 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-105 transition-all duration-500 p-4 relative z-10 overflow-hidden border-[6px] border-indigo-500/20 group-hover:border-indigo-500/40">
                  {!eduLogoError && EDUCATION.logo ? (
                    <img src={EDUCATION.logo} alt="AIUB Official Seal" className="w-full h-full object-contain relative z-10" onError={() => setEduLogoError(true)} />
                  ) : (
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      <GraduationCap className="w-16 h-16 text-indigo-600" />
                      <div className="font-black text-[10px] text-indigo-800 tracking-[0.2em] uppercase">AIUB Core</div>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-4 text-center md:text-left relative z-10">
                  <div className="inline-block px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
                    Undergraduate Academic Core
                  </div>
                  <h3 className="text-3xl font-black tracking-tight group-hover:text-indigo-400 transition-colors leading-tight">{EDUCATION.school}</h3>
                  <p className="text-indigo-400 font-black text-xl">{EDUCATION.degree}</p>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-zinc-500 text-sm font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-2 transition-colors group-hover:text-zinc-300"><Globe className="w-4 h-4" /> {EDUCATION.location}</span>
                    <span className="flex items-center gap-2 transition-colors group-hover:text-zinc-300"><Calendar className="w-4 h-4" /> {EDUCATION.period}</span>
                  </div>
                </div>
                <div className="px-8 py-3.5 bg-zinc-950 rounded-2xl border border-zinc-800 text-indigo-500 font-black text-xs tracking-[0.3em] whitespace-nowrap shadow-xl relative z-10 group-hover:border-indigo-500/50 transition-all">
                  STATUS: ENROLLED
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-32 border-t border-zinc-900/50">
          <ScrollReveal direction="up">
            <div className="text-center mb-24 space-y-6">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter glitch-text">Technical Deployments.</h2>
              <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-sm">Active workloads & architecture case studies</p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {PROJECTS.map((project, i) => (
              <ScrollReveal key={project.id} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.1}>
                <div
                  onMouseMove={handleTilt}
                  onMouseLeave={handleTiltReset}
                  className="group flex flex-col bg-zinc-900/10 rounded-[3rem] border border-zinc-800 overflow-hidden hover:border-indigo-500/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                    <div className="absolute bottom-8 left-8 flex flex-wrap gap-2.5">
                      {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-2xl">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="p-12 flex flex-col flex-1 space-y-8">
                    <h3 className="text-3xl font-black group-hover:text-indigo-400 transition-colors leading-tight">{project.title}</h3>
                    <p className="text-zinc-400 leading-relaxed flex-1 text-lg font-medium">{project.description}</p>
                    <a href={project.link} target="_blank" className="inline-flex items-center gap-3 text-sm font-black text-white hover:text-indigo-400 transition-all group/link tracking-widest uppercase">
                      Architecture Blueprint <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-32 border-t border-zinc-900/50">
          <ScrollReveal direction="up">
            <div className="bg-indigo-600 rounded-[4rem] p-16 md:p-32 text-center max-w-6xl mx-auto shadow-[0_20px_80px_rgba(79,70,229,0.3)] relative overflow-hidden group">
              <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-[3s]"></div>
              <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/10 blur-[100px] rounded-full"></div>

              {/* 3D Floating Orbs */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute rounded-full pointer-events-none"
                  style={{
                    width: `${40 + i * 20}px`,
                    height: `${40 + i * 20}px`,
                    background: `radial-gradient(circle, rgba(255,255,255,${0.15 - i * 0.02}) 0%, transparent 70%)`,
                    top: `${10 + i * 12}%`,
                    left: `${5 + i * 15}%`,
                    animation: `${i % 2 === 0 ? 'floatOrb1' : 'floatOrb2'} ${3 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                    filter: 'blur(1px)',
                  }}
                />
              ))}

              <div className="max-w-3xl mx-auto space-y-12 relative z-10">
                <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">Ready to <br /><span className="opacity-50">Automate?</span></h2>
                <p className="text-white/80 text-xl md:text-2xl font-bold leading-relaxed">
                  Currently looking for new opportunities in Platform Engineering and Cloud Infrastructure. Let's build something scalable.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                  <a
                    href={`mailto:${EMAIL}`}
                    onClick={handleRipple}
                    className="relative flex items-center gap-4 bg-white text-indigo-700 px-12 py-6 rounded-3xl font-black text-lg hover:bg-zinc-100 transition-all hover:scale-105 w-full sm:w-auto shadow-2xl tracking-tight overflow-hidden"
                  >
                    <Mail className="w-6 h-6" /> Contact Me
                  </a>
                  <a href={`tel:${PHONE}`} className="flex items-center gap-4 bg-zinc-950 text-white border border-zinc-800 px-12 py-6 rounded-3xl font-black text-lg hover:bg-zinc-900 transition-all hover:scale-105 w-full sm:w-auto tracking-tight">
                    <Phone className="w-6 h-6" /> {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="py-32 border-t border-zinc-900/50 relative z-10 overflow-hidden">
        {/* Animated dot grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.8) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            animation: 'gridMove 8s linear infinite',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 items-center gap-20 relative z-10">
          <div className="space-y-4 text-center md:text-left">
            {/* 3D Depth Text */}
            <div
              className="font-black text-4xl tracking-tighter text-white cursor-default"
              onMouseMove={(e) => {
                const el = e.currentTarget;
                const rect = el.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -30;
                el.style.textShadow = `${x * 0.3}px ${y * 0.3}px 0px rgba(99,102,241,0.8), ${x * 0.6}px ${y * 0.6}px 0px rgba(99,102,241,0.4), ${x}px ${y}px 20px rgba(99,102,241,0.2)`;
                el.style.transform = `perspective(500px) rotateX(${y * 0.5}deg) rotateY(${x * 0.5}deg)`;
                el.style.transition = 'transform 0.1s ease';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textShadow = 'none';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.transition = 'transform 0.5s ease';
              }}
            >
              EMON SHIL.
            </div>
            <div className="font-bold text-zinc-600 text-[10px] uppercase tracking-[0.5em]">High-Availability Cloud Design</div>
          </div>
          <div className="flex justify-center gap-12 font-black tracking-[0.2em] text-[11px] uppercase">
            <a href={LINKEDIN_URL} className="hover:text-indigo-500 transition-colors">LinkedIn</a>
            <a href={GITHUB_URL} className="hover:text-indigo-500 transition-colors">GitHub</a>
            <a href="#home" className="hover:text-indigo-500 transition-colors">Home</a>
            <a href={RESUME_URL} download="EmonShil_resume.pdf" className="hover:text-indigo-500 transition-colors">Resume</a>
          </div>
          <div className="text-zinc-700 text-[10px] font-black uppercase tracking-[0.3em] text-center md:text-right">
            © {new Date().getFullYear()} EMON SHIL. <br />
            PROVISIONED & DEPLOYED IN DHAKA.
          </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;