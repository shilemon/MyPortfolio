
import React, { useState, useEffect } from 'react';

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
import { PROJECTS, SKILLS, EXPERIENCES, LINKEDIN_URL, EDUCATION, EMAIL, PHONE, GITHUB_URL, PROFILE_IMAGE, RESUME_URL} from './constants';
import ChatBot from './components/ChatBot';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [eduLogoError, setEduLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'skills', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background floating logos for the Hero section using verified reliable paths
  const backgroundLogos = [
    { url: 'https://api.iconify.design/logos:aws.svg', top: '15%', left: '10%', delay: '0s' },
    { url: 'https://api.iconify.design/logos:microsoft-azure.svg', top: '25%', left: '85%', delay: '2s' },
    { url: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg', top: '70%', left: '15%', delay: '4s' },
    { url: 'https://www.vectorlogo.zone/logos/docker/docker-icon.svg', top: '65%', left: '80%', delay: '1s' },
    { url: 'https://www.vectorlogo.zone/logos/grafana/grafana-icon.svg', top: '40%', left: '75%', delay: '3s' },
    { url: 'https://raw.githubusercontent.com/hashicorp/terraform-website/master/public/img/logo-hashicorp.svg', top: '10%', left: '50%', delay: '5s' },
    { url: 'https://www.vectorlogo.zone/logos/jenkins/jenkins-icon.svg', top: '10%', left: '50%', delay: '5s' },

  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* Dynamic Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/5 blur-[150px] rounded-full"></div>
        
        {/* Floating Background Logo Cloud */}
        <div className="absolute inset-0 opacity-[0.03]">
          {backgroundLogos.map((logo, i) => (
            <img 
              key={i}
              src={logo.url}
              alt=""
              className="absolute w-24 h-24 animate-drift grayscale brightness-200"
              style={{ top: logo.top, left: logo.left, animationDelay: logo.delay }}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/60 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(79,70,229,0.4)] group hover:rotate-6 transition-transform cursor-pointer border border-indigo-500/30">
           <img
             src={Official}   // or src={Official}
             alt="Emon Shil"
             className="w-full h-full object-cover"
             loading="eager"
            />
           </div>

            <div className="hidden sm:block">
              <span className="font-extrabold tracking-tighter text-xl block leading-none">EMON SHIL</span>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">DevOps Engineer</span>
            </div>
          </div>
          
          <div className="flex items-center gap-8 md:gap-12">
            {['Home', 'Skills', 'Projects', 'Experience'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-indigo-400 ${
                  activeSection === item.toLowerCase() ? 'text-indigo-400 scale-105 underline underline-offset-8 decoration-2' : 'text-zinc-500'
                }`}
              >
                {item}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex gap-5 items-center">
            <a href={GITHUB_URL} target="_blank" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"><Github className="w-5 h-5" /></a>
            <a href={LINKEDIN_URL} target="_blank" className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-400 transition-all"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-20">
        {/* Hero Section */}
        <section id="home" className="min-h-[90vh] flex flex-col justify-center py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10 animate-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Cloud Infrastructure Architect
              </div>
             
             

              <h1 className="text-7xl md:text-9xl font-black leading-[0.9] tracking-tighter">
               <span className="block animate-word-reveal">
               Emon
               </span>

              <span
               className="block animate-word-reveal text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-400 to-cyan-400"
               style={{ animationDelay: "250ms" }}
                >
               Shil.
              </span>
              </h1>


              
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-medium">
                DevOps Engineer with 2+ years of experience in AWS, CI/CD, Docker, and Linux. I enjoy automating infrastructure, improving deployment workflows, and building reliable cloud systems. Open to remote opportunities.
              </p>
              <div className="flex flex-wrap gap-5 pt-6">
                <a 
                  href="#contact" 
                  className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm tracking-widest transition-all hover:shadow-[0_10px_40px_rgba(79,70,229,0.5)] hover:-translate-y-1 flex items-center gap-3 group uppercase"
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

            {/* Profile Frame */}
            <div className="relative group animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="absolute -inset-10 bg-indigo-500/10 rounded-full blur-[120px] opacity-30 group-hover:opacity-60 transition-opacity"></div>
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[3rem] border-2 border-zinc-800/50 bg-zinc-900/20 p-3 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-indigo-500/40 group-hover:scale-[1.01]">
                <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-zinc-950 relative">
                  <img 
                    src={Official} 
                    alt="Emon Shil" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
              
              {/* Floating Badges */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-4 w-full justify-center">
                <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 px-8 py-5 rounded-3xl shadow-2xl flex flex-col items-center animate-float-1">
                  <span className="text-3xl font-black text-indigo-500">2+</span>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Years Active</span>
                </div>
                {/*<div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800 px-8 py-5 rounded-3xl shadow-2xl flex flex-col items-center animate-float-2 [animation-delay:1s]">
                  <span className="text-3xl font-black text-indigo-500">10+</span>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-1">Prod Deployments</span>
                </div>*/}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Arsenal Section */}
        <section id="skills" className="py-32 border-t border-zinc-900/50">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Stack & Tools.</h2>
            <p className="text-zinc-500 max-w-2xl mx-auto font-bold uppercase tracking-[0.3em] text-sm">
              Comprehensive Cloud & Automation Ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {SKILLS.map((skill, i) => (
              <div 
                key={i} 
                className="group p-8 md:p-10 glass-card rounded-[2.5rem] hover:bg-zinc-900/60 hover:border-indigo-500/40 transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center shadow-lg"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-[50px] rounded-full translate-x-10 translate-y-[-10px] group-hover:bg-indigo-500/20 transition-colors"></div>
                
                {/* Logo Container with enhanced floating official logos */}
                <div className="flex -space-x-4 mb-10 h-28 items-center justify-center relative z-10 w-full">
                  {skill.logos.map((logoUrl, idx) => (
                    <div 
                      key={idx} 
                      className={`${(idx + i) % 2 === 0 ? 'animate-float-1' : 'animate-float-2'} w-20 h-20 md:w-24 md:h-24 bg-zinc-950 rounded-2xl flex items-center justify-center p-5 backdrop-blur-3xl border border-white/5 group-hover:border-indigo-500/50 transition-all duration-700 shadow-2xl relative shrink-0 overflow-hidden`}
                      style={{ 
                        animationDelay: `${idx * -2.5}s`,
                        zIndex: skill.logos.length - idx
                      }}
                    >
                      <img 
                        src={logoUrl} 
                        alt={`${skill.name} tool`} 
                        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all group-hover:scale-110"
                        loading="eager"
                      />
                    </div>
                  ))}
                </div>

                <h3 className="font-black text-xl md:text-2xl mb-1 group-hover:text-indigo-400 transition-colors tracking-tight">{skill.name}</h3>
                <p className="text-[11px] text-zinc-500 font-black uppercase tracking-[0.2em]">{skill.category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Career Timeline */}
        <section id="experience" className="py-32 border-t border-zinc-900/50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-24 text-center">Professional Journey.</h2>

            <div className="space-y-16">
              {EXPERIENCES.map((exp, i) => (
                <div key={i} className="flex flex-col md:flex-row gap-12 group">
                  <div className="md:w-1/3 pt-3">
                    <div className="sticky top-24 space-y-8">
                      <div className="inline-block px-4 py-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 font-black text-xs uppercase tracking-widest rounded-xl">
                        {exp.period}
                      </div>
                      
                      {/* Company Branding with Ultra-Refined Logo Display */}
                      <div className="relative w-36 h-36 glass-card rounded-[2rem] p-8 flex items-center justify-center overflow-hidden border-zinc-800/50 group-hover:border-indigo-500/40 transition-all duration-700 group-hover:shadow-[0_0_40px_rgba(79,70,229,0.15)] group-hover:-translate-y-1">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-indigo-500/5 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity animate-pulse">
                          <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full"></div>
                          <div className="absolute bottom-2 right-2 w-1 h-1 bg-white rounded-full"></div>
                        </div>
                        {exp.logo ? (
                           <img 
                             src={exp.logo} 
                             alt={exp.company} 
                             className="w-full h-full object-contain relative z-10 brightness-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-700"
                           />
                        ) : (
                           <Server className="w-12 h-12 text-indigo-500 relative z-10" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
                        <div className="relative flex h-2 w-2">
                          <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/40 opacity-75"></div>
                          <div className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></div>
                        </div>
                        Active Workload
                      </div>
                    </div>
                  </div>
                  <div className="md:w-2/3 pb-16 border-l-2 border-zinc-800 pl-12 relative">
                    <div className="absolute left-[-11px] top-4 w-5 h-5 rounded-full border-4 border-zinc-950 bg-indigo-600 shadow-[0_0_20px_rgba(79,70,229,1)] group-hover:scale-125 transition-transform duration-500"></div>
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
              ))}
            </div>

            {/* Academic Foundation */}
            <div className="mt-32 p-12 glass-card rounded-[3rem] flex flex-col md:flex-row justify-between items-center gap-12 group hover:border-indigo-500/30 transition-all duration-700 shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               
               {/* University Logo Container with Official Seal */}
               <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center shrink-0 shadow-2xl group-hover:scale-105 transition-all duration-500 p-4 relative z-10 overflow-hidden border-[6px] border-indigo-500/20 group-hover:border-indigo-500/40">
                 {!eduLogoError && EDUCATION.logo ? (
                   <img 
                    src={EDUCATION.logo} 
                    alt="AIUB Official Seal" 
                    className="w-full h-full object-contain relative z-10" 
                    onError={() => setEduLogoError(true)}
                   />
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
          </div>
        </section>

        {/* Technical Projects Section */}
        <section id="projects" className="py-32 border-t border-zinc-900/50">
          <div className="text-center mb-24 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Technical Deployments.</h2>
            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-sm">Active workloads & architecture case studies</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {PROJECTS.map((project) => (
              <div key={project.id} className="group flex flex-col bg-zinc-900/10 rounded-[3rem] border border-zinc-800 overflow-hidden hover:border-indigo-500/30 transition-all duration-700 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s] opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 flex flex-wrap gap-2.5">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-white bg-indigo-600/40 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-2xl">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-12 flex flex-col flex-1 space-y-8">
                  <h3 className="text-3xl font-black group-hover:text-indigo-400 transition-colors leading-tight">{project.title}</h3>
                  <p className="text-zinc-400 leading-relaxed flex-1 text-lg font-medium">
                    {project.description}
                  </p>
                  <a href={project.link} target="_blank" className="inline-flex items-center gap-3 text-sm font-black text-white hover:text-indigo-400 transition-all group/link tracking-widest uppercase">
                    Architecture Blueprint <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section id="contact" className="py-32 border-t border-zinc-900/50">
          <div className="bg-indigo-600 rounded-[4rem] p-16 md:p-32 text-center max-w-6xl mx-auto shadow-[0_20px_80px_rgba(79,70,229,0.3)] relative overflow-hidden group">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-[3s]"></div>
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-black/10 blur-[100px] rounded-full"></div>
            
            <div className="max-w-3xl mx-auto space-y-12 relative z-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white leading-none">Ready to <br /> <span className="opacity-50">Automate?</span></h2>
              <p className="text-white/80 text-xl md:text-2xl font-bold leading-relaxed">
                Currently looking for new opportunities in Platform Engineering and Cloud Infrastructure. Let's build something scalable.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 bg-white text-indigo-700 px-12 py-6 rounded-3xl font-black text-lg hover:bg-zinc-100 transition-all hover:scale-105 w-full sm:w-auto shadow-2xl tracking-tight">
                  <Mail className="w-6 h-6" /> Contact Me
                </a>
                <a href={`tel:${PHONE}`} className="flex items-center gap-4 bg-zinc-950 text-white border border-zinc-800 px-12 py-6 rounded-3xl font-black text-lg hover:bg-zinc-900 transition-all hover:scale-105 w-full sm:w-auto tracking-tight">
                  <Phone className="w-6 h-6" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-zinc-950 py-32 border-t border-zinc-900/50 relative z-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 items-center gap-20">
          <div className="space-y-4 text-center md:text-left">
            <div className="font-black text-4xl tracking-tighter text-white">EMON SHIL.</div>
            <div className="font-bold text-zinc-600 text-[10px] uppercase tracking-[0.5em]">High-Availability Cloud Design</div>
          </div>
          
          <div className="flex justify-center gap-12 font-black tracking-[0.2em] text-[11px] uppercase">
            <a href={LINKEDIN_URL} className="hover:text-indigo-500 transition-colors">LinkedIn</a>
            <a href={GITHUB_URL} className="hover:text-indigo-500 transition-colors">GitHub</a>
            <a href="#home" className="hover:text-indigo-500 transition-colors">Home</a>
            
            <a
            href={RESUME_URL}
            download="EmonShil_Resume.pdf"
            className="px-10 py-5 bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 text-white rounded-2xl font-black text-sm tracking-widest transition-all hover:-translate-y-1 flex items-center gap-3 uppercase"
            >
             Download Resume
            </a>


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
