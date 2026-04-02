import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFileDownload, FaTimes, FaAward, FaLaptopCode, FaPython } from 'react-icons/fa';

const experience = [
  {
    id: 1,
    title: 'Flutter Developer',
    company: 'Stackerbee Technologies',
    date: 'May 2023 – Jul 2023 · Remote',
    projectLogo: 'ONBOARDING',
    description: 'Built multistep onboarding flow in Flutter + Dart, reducing manual data entry time by 35%. Implemented data persistence with Shared Preferences — 100% retention across sessions, drop-off reduced by 18%. Admin dashboard with real-time monitoring, 25% faster approval cycle',
    color: '#6366f1',
    tags: ['Flutter', 'Dart', 'Shared Preferences', 'Provider']
  },
  {
    id: 2,
    title: 'Flutter Developer',
    company: 'Stackerbee Technologies',
    date: 'Aug 2023 – Dec 2023 · Remote',
    projectLogo: 'ESMS',
    description: 'Designed 20+ custom UI components (Text Fields, Date Pickers, Search Boxes, Checkbox Lists, Radio Button Sheets). Location-based sign-in using Flutter Map + geo-fencing for secure office boundary check-ins. Improved attendance tracking accuracy by 30%',
    color: '#6366f1',
    tags: ['Flutter', 'Dart', 'Flutter Map', 'Geo-fencing']
  },
  {
    id: 3,
    title: 'Personal Project',
    company: 'MedFarm',
    date: 'Aug 2024 – Nov 2024 · Self-initiated',
    projectLogo: 'PERSONAL',
    description: 'Healthcare app UI built entirely from scratch with zero UI dependency packages. Implemented full animation system, complete light/dark mode theming independently. Used Flutter extension-based color injection pattern to manage theme colors across the entire app. All screens, flows, and transitions designed and built solo',
    color: '#14b8a6',
    isPersonal: true,
    tags: ['Flutter', 'Dart', 'Custom Animations', 'Theme Extensions']
  },
  {
    id: 4,
    title: 'Flutter UI Developer',
    company: 'Contract',
    date: 'Jan 2024 – May 2024',
    projectLogo: 'EMS',
    description: 'Designed and built 50+ screens end-to-end covering onboarding, dashboards, attendance, leave management, and admin panels. Collaborated across cross-functional teams ensuring all project specs and deadlines were met. Delivered high-fidelity, performant Flutter widgets matching Figma designs precisely',
    color: '#f59e0b',
    tags: ['Flutter', 'Dart', 'Figma', 'Material Design']
  },
  {
    id: 5,
    title: 'Flutter Developer',
    company: 'Stackerbee Technologies',
    date: 'Jun 2024 – May 2025 · Remote',
    projectLogo: 'WMS',
    description: 'Built WMS as part of a larger ERP suite, reduced stock discrepancies by 28%. Barcode scanning via device camera → +40% data entry speed, -32% manual errors. Provider + GoRouter architecture → 50% fewer navigation and state bug reports',
    color: '#6366f1',
    tags: ['Flutter', 'Dart', 'Provider', 'GoRouter', 'Barcode']
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    company: 'HeyDoc AI',
    date: 'Oct 2025 – Nov 2025 · Remote',
    projectLogo: 'HEYDOC',
    description: 'Multi-profile switching logic + ABHA API integration for secure health record access. Responsive UI for patients and healthcare providers. DocDash web dashboard: full CRUD with Firebase for doctor schedules, patient records, appointments',
    color: '#22d3ee',
    tags: ['Flutter', 'Firebase', 'React', 'ABHA API']
  },
  {
    id: 7,
    title: 'Browser Extension Developer',
    company: 'Personal Project',
    date: 'Ongoing · Published Feb 2026',
    projectLogo: 'EXTENSION',
    description: 'Built PDF viewer extension from scratch: dual-mode reading, smart OCR, encrypted storage, true dark mode. Published on Chrome Web Store · v2.0.2. Zero data collection — privacy-first architecture',
    color: '#a78bfa',
    isPersonal: true,
    tags: ['JavaScript', 'Chrome Extension APIs', 'HTML', 'CSS']
  }
];

const education = [
  {
    id: 101,
    degree: 'B.Tech, Computer Science',
    school: 'Shri Vaishnav Vidhyapeeth Vishwavidhyalaya',
    date: 'Graduated May 2023',
    location: 'Indore, MP',
    description: 'Foundational coursework in algorithms, data structures, and database management',
    color: '#14b8a6', // teal
    tags: ['Computer Science', 'Engineering']
  },
  {
    id: 102,
    degree: 'Class 12th CBSE',
    school: 'Guru Nanak Public School',
    date: 'May 2019',
    location: 'Indore, MP',
    description: 'Completed senior secondary education with focus on Mathematics and Science',
    color: '#14b8a6', // teal
    tags: ['Science & Math']
  }
];

const certifications = [
  {
    id: 1,
    name: 'Flutter Essential',
    issuer: 'Google',
    icon: FaLaptopCode,
    color: 'text-blue-400',
    border: 'border-blue-400/50',
    bg: 'bg-blue-400/10'
  },
  {
    id: 2,
    name: 'Python Certificate',
    issuer: 'Kaggle',
    icon: FaPython,
    color: 'text-cyan-400',
    border: 'border-cyan-400/50',
    bg: 'bg-cyan-400/10'
  },
  {
    id: 3,
    name: 'IBM Certificate',
    issuer: 'IBM',
    icon: FaAward,
    color: 'text-indigo-400',
    border: 'border-indigo-400/50',
    bg: 'bg-indigo-400/10'
  }
];

const renderDescription = (text) => {
  if (!text) return null;
  const regex = /(\d+%|\d+\+|v\d\.\d\.\d|\+?\d+%|-?\d+%)/g;
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (part.match(regex)) {
      return <span key={index} style={{ color: '#22d3ee', fontWeight: 500 }}>{part}</span>;
    }
    return part;
  });
};

const TimelineNode = ({ data, position, delayStagger }) => {
  const [expanded, setExpanded] = useState(false);
  const isLeft = position === 'left';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: delayStagger, ease: [0.16, 1, 0.3, 1] }}
      className={`timeline-entry ${position} group`}
    >
      {isLeft ? (
        <>
          <div className="card-container cursor-pointer" onClick={() => setExpanded(!expanded)} style={{ borderLeft: `3px solid ${data.color}`, '--accent': data.color }}>
            {data.isPersonal && (
              <div className="absolute top-4 right-4 text-[10px] font-medium leading-none px-2 py-1 rounded hidden sm:block" style={{ color: data.color, backgroundColor: `${data.color}1E`, border: `1px solid ${data.color}4D` }}>
                 Personal
              </div>
            )}
            <div className="flex flex-col items-start gap-1 pr-8 relative">
               <h4 className="text-white text-[16px] font-medium leading-snug">{data.title || data.degree}</h4>
               
               <div className="flex items-center flex-wrap gap-2 mb-2">
                 <span className="text-[13px] font-medium opacity-90" style={{ color: data.color }}>{data.company || data.school}</span>
                 {data.projectLogo && (
                   <span className="text-[10px] text-lightGray bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded tracking-wider">{data.projectLogo}</span>
                 )}
               </div>

               <div className="text-[11px] font-mono px-[10px] py-[3.5px] rounded-[6px] mb-1" style={{ color: data.color, backgroundColor: `${data.color}1E`, border: `1px solid ${data.color}40` }}>
                 {data.date}
               </div>
            </div>

            <AnimatePresence initial={false}>
               {expanded && data.description && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                   <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <ul className="space-y-2 list-none m-0 p-0">
                        {data.description.split('. ').filter(Boolean).map((sentence, index) => (
                          <li key={index} className="flex gap-2.5 text-[13px] text-lightGray/80 leading-[1.75]">
                            <span className="text-lightGray/30 select-none text-[10px] mt-1">▸</span>
                            <span>{renderDescription(sentence + (sentence.endsWith('.') ? '' : '.'))}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                   {data.tags && (
                     <div className="flex flex-wrap gap-2 mt-5 mb-1">
                       {data.tags.map(tag => (
                         <span key={tag} className="text-[10px] bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded text-lightGray/90">{tag}</span>
                       ))}
                     </div>
                   )}
                 </motion.div>
               )}
            </AnimatePresence>
            <div className="flex justify-end mt-2 transition-opacity opacity-60 hover:opacity-100">
               <div className="flex items-center gap-1 text-[11px] select-none" style={{ color: `${data.color}99` }}>
                 {expanded ? 'collapse ▴' : 'expand ▾'}
               </div>
            </div>
          </div>
          <div className="connector line" style={{ '--accent': data.color }} />
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: delayStagger + 0.08, type: 'spring' }} className="spine-dot" style={{ '--accent': data.color }} />
        </>
      ) : (
        <>
          <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: delayStagger + 0.08, type: 'spring' }} className="spine-dot" style={{ '--accent': data.color }} />
          <div className="connector line" style={{ '--accent': data.color }} />
          <div className="card-container cursor-pointer" onClick={() => setExpanded(!expanded)} style={{ borderLeft: `3px solid ${data.color}`, '--accent': data.color }}>
            {data.isPersonal && (
              <div className="absolute top-4 right-4 text-[10px] font-medium leading-none px-2 py-1 rounded hidden sm:block" style={{ color: data.color, backgroundColor: `${data.color}1E`, border: `1px solid ${data.color}4D` }}>
                 Personal
              </div>
            )}
            <div className="flex flex-col items-start gap-1 pr-8 relative">
               <h4 className="text-white text-[16px] font-medium leading-snug">{data.title || data.degree}</h4>
               
               <div className="flex items-center flex-wrap gap-2 mb-2">
                 <span className="text-[13px] font-medium opacity-90" style={{ color: data.color }}>{data.company || data.school}</span>
                 {data.projectLogo && (
                   <span className="text-[10px] text-lightGray bg-white/[0.06] border border-white/10 px-1.5 py-0.5 rounded tracking-wider">{data.projectLogo}</span>
                 )}
               </div>

               <div className="text-[11px] font-mono px-[10px] py-[3.5px] rounded-[6px] mb-1" style={{ color: data.color, backgroundColor: `${data.color}1E`, border: `1px solid ${data.color}40` }}>
                 {data.date}
               </div>
            </div>

            <AnimatePresence initial={false}>
               {expanded && data.description && (
                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                   <div className="mt-4 pt-4 border-t border-white/[0.06]">
                      <ul className="space-y-2 list-none m-0 p-0">
                        {data.description.split('. ').filter(Boolean).map((sentence, index) => (
                          <li key={index} className="flex gap-2.5 text-[13px] text-lightGray/80 leading-[1.75]">
                            <span className="text-lightGray/30 select-none text-[10px] mt-1">▸</span>
                            <span>{renderDescription(sentence + (sentence.endsWith('.') ? '' : '.'))}</span>
                          </li>
                        ))}
                      </ul>
                   </div>
                   {data.tags && (
                     <div className="flex flex-wrap gap-2 mt-5 mb-1">
                       {data.tags.map(tag => (
                         <span key={tag} className="text-[10px] bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded text-lightGray/90">{tag}</span>
                       ))}
                     </div>
                   )}
                 </motion.div>
               )}
            </AnimatePresence>
            <div className="flex justify-end mt-2 transition-opacity opacity-60 hover:opacity-100">
               <div className="flex items-center gap-1 text-[11px] select-none" style={{ color: `${data.color}99` }}>
                 {expanded ? 'collapse ▴' : 'expand ▾'}
               </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

const Resume = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let animationFrame;
    const updateScroll = () => {
      if (!wrapperRef.current) return;
      const wrapper = wrapperRef.current;
      const rect = wrapper.getBoundingClientRect();
      const h = rect.height;
      const topOffset = rect.top;

      let fillPct = (window.innerHeight / 2 - topOffset) / h * 100;
      fillPct = Math.max(0, Math.min(100, fillPct));
      wrapper.style.setProperty('--fill-height', `${fillPct}%`);

      animationFrame = requestAnimationFrame(updateScroll);
    };

    updateScroll();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section id="resume" className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <style>{`
        .timeline-wrapper {
          position: relative;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          padding: 60px 0 80px 0;
        }

        .timeline-wrapper::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
          width: 2px; transform: translateX(-50%); background: rgba(99,102,241,0.15); z-index: 0;
        }

        .timeline-wrapper::after {
          content: ''; position: absolute; left: 50%; top: 0; width: 2px;
          height: var(--fill-height, 0%); transform: translateX(-50%);
          background: linear-gradient(to bottom, #6366f1 0%, #22d3ee 100%);
          z-index: 1; transition: height 0.1s linear;
        }

        .timeline-entry {
          position: relative; display: flex; align-items: center; margin-bottom: 48px; width: 100%;
        }
        
        .timeline-entry.left { flex-direction: row; justify-content: flex-end; padding-right: calc(50% + 40px); }
        .timeline-entry.right { flex-direction: row-reverse; justify-content: flex-end; padding-left: calc(50% + 40px); }

        .timeline-entry.left .card-container { width: clamp(280px, 45vw, 460px); }
        .timeline-entry.right .card-container { width: clamp(280px, 45vw, 460px); }

        .spine-dot {
          width: 20px; height: 20px; border-radius: 50%; border: 2px solid var(--accent);
          background: transparent; position: absolute; left: 50%; transform: translateX(-50%); z-index: 2;
          box-shadow: 0 0 0 4px rgba(0,0,0,0.15); transition: all 0.3s;
        }
        .timeline-entry.right .spine-dot { left: calc(50% - 20px); transform: none; } /* Handle reversed flex behavior simply by strict positioning above */
        .spine-dot { left: 50% !important; transform: translateX(-50%) !important; }

        .spine-dot::after {
          content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);
          width: 8px; height: 8px; border-radius: 50%; background: var(--accent);
        }
        .timeline-entry:hover .spine-dot {
           transform: translateX(-50%) scale(1.3) !important;
           box-shadow: 0 0 0 8px rgba(0,0,0,0.25);
        }

        .connector {
          width: 40px; height: 1.5px; opacity: 0.5; flex-shrink: 0; position: absolute;
          background: repeating-linear-gradient(to right, var(--accent) 0px, var(--accent) 4px, transparent 4px, transparent 8px);
        }
        .timeline-entry.left .connector { right: 50%; }
        .timeline-entry.right .connector { left: 50%; }

        .card-container {
          background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 20px 24px; transition: all 0.4s; position: relative; z-index: 3;
        }
        
        .timeline-entry.left .card-container, .timeline-entry.right .card-container {
           border-top-left-radius: 0px; border-bottom-left-radius: 0px;
        }

        @media (max-width: 768px) {
          .timeline-entry, .timeline-entry.right { flex-direction: column; align-items: flex-start; padding-left: 48px !important; padding-right: 0 !important; justify-content: flex-start; }
          .connector { display: none; }
          .spine-dot { left: 20px !important; }
          .timeline-wrapper::before, .timeline-wrapper::after { left: 20px !important; }
          .timeline-entry.left .card-container, .timeline-entry.right .card-container { 
            width: 100% !important; margin: 0 !important; 
          }
          .section-divider-node { justify-content: flex-start !important; padding-left: 48px !important; transform: none !important; left: 0 !important; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">My Experience</h2>
          <p className="text-cyanSecondary font-medium tracking-wide">Education, work history, and credentials</p>
        </div>

        {/* QUICK STATS ROW */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-20 relative z-10 w-full max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="bg-white/[0.04] p-5 md:px-8 rounded-[12px] flex flex-col items-center flex-1 sm:flex-none">
             <div className="text-[28px] font-medium text-cyanSecondary">2+</div>
             <div className="text-[12px] text-lightGray/60 mt-1 uppercase tracking-wide text-center">Years<br/>Experience</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/[0.04] p-5 md:px-8 rounded-[12px] flex flex-col items-center flex-1 sm:flex-none">
             <div className="text-[28px] font-medium text-cyanSecondary">10+</div>
             <div className="text-[12px] text-lightGray/60 mt-1 uppercase tracking-wide text-center">Projects<br/>Shipped</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/[0.04] p-5 md:px-8 rounded-[12px] flex flex-col items-center flex-1 sm:flex-none">
             <div className="text-[28px] font-medium text-cyanSecondary">10</div>
             <div className="text-[12px] text-lightGray/60 mt-1 uppercase tracking-wide text-center">Apps<br/>Published</div>
          </motion.div>
        </div>

        {/* TIMELINE CONTAINER */}
        <div ref={wrapperRef} className="timeline-wrapper">

          {/* Work Experience */}
          <div className="w-full relative">
             {experience.map((item, index) => (
                <TimelineNode 
                  key={`exp-${item.id}`} 
                  data={item} 
                  position={index % 2 === 0 ? 'left' : 'right'} 
                  delayStagger={(index % 4) * 0.12}
                />
             ))}
          </div>

          {/* Education Divider Node */}
          <div className="relative w-full flex justify-center my-20 z-[3] section-divider-node group text-center">
             <div className="bg-teal-500/12 border border-teal-500/30 text-teal-400 text-[13px] font-medium px-5 py-[6px] rounded-full backdrop-blur-md shadow-lg group-hover:scale-105 transition-transform inline-block">
               🎓 Education
             </div>
          </div>

          {/* Education Entries */}
          <div className="pt-4 pb-16 w-full">
             {education.map((item, index) => (
                <TimelineNode 
                  key={`edu-${item.id}`} 
                  data={item} 
                  position={index % 2 === 0 ? 'left' : 'right'} 
                  delayStagger={(index % 2) * 0.12}
                />
             ))}
          </div>
        </div>

        {/* Certifications Card Row */}
        <div className="mb-32 text-center mt-12">
          <h3 className="text-2xl font-bold mb-8 flex items-center justify-center gap-3">
            <FaAward className="text-yellow-500" /> Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map(cert => (
              <div key={cert.id} className={`w-[160px] h-[100px] rounded-xl flex flex-col justify-between p-4 border border-x-white/5 border-t-white/5 border-b-[3px] shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:brightness-110 cursor-default bg-white/5 backdrop-blur-md ${cert.border}`}>
                <cert.icon className={`${cert.color} text-2xl`} />
                <div className="text-left mt-auto">
                  <div className="text-white text-[13px] font-medium leading-tight mb-0.5">{cert.name}</div>
                  <div className="text-lightGray/60 text-[10px] uppercase tracking-wider">{cert.issuer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Page Style Resume Preview */}
        <div className="w-full glass-panel p-6 sm:p-10 border border-white/5 rounded-2xl">
          <div className="flex flex-col md:flex-row gap-10 items-center justify-center max-w-4xl mx-auto">
            <div className="w-full md:w-1/2 flex justify-center">
               <div className="relative w-64 h-80 bg-white rounded-lg shadow-[0_0_30px_rgba(255,255,255,0.15)] overflow-hidden group cursor-pointer border border-white/20 hover:-translate-y-2 transition-all duration-300" onClick={() => setModalOpen(true)}>
                  {/* Subtle document header simulation */}
                  <div className="p-6">
                     <div className="h-6 w-3/4 bg-slate-800 rounded bg-opacity-20 mb-3"></div>
                     <div className="h-3 w-1/2 bg-slate-800 rounded bg-opacity-10 mb-6"></div>
                     <div className="h-2 w-full bg-slate-800 rounded bg-opacity-10 mb-2"></div>
                     <div className="h-2 w-full bg-slate-800 rounded bg-opacity-10 mb-2"></div>
                     <div className="h-2 w-5/6 bg-slate-800 rounded bg-opacity-10 mb-6"></div>
                     <div className="h-3 w-1/3 bg-slate-800 rounded bg-opacity-10 mb-3"></div>
                     <div className="h-2 w-full bg-slate-800 rounded bg-opacity-10 mb-2"></div>
                     <div className="h-2 w-full bg-slate-800 rounded bg-opacity-10 mb-2"></div>
                  </div>
                  <div className="absolute inset-0 bg-indigoPrimary/80 opacity-0 transition-opacity flex items-center justify-center group-hover:opacity-100 backdrop-blur-sm"><FaFileDownload size={32} className="text-white drop-shadow-md animate-bounce" /></div>
               </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
              <h4 className="text-3xl font-display font-bold text-white mb-1">Gurpreet Singh Bhatia</h4>
              <p className="text-cyanSecondary font-medium mb-6">Flutter Developer</p>
              
              <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
                 <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded text-lightGray">2+ Yrs XP</span>
                 <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded text-lightGray">5 Projects</span>
                 <span className="text-xs bg-white/5 border border-white/10 px-3 py-1 rounded text-lightGray">Flutter</span>
              </div>

              <button onClick={() => setModalOpen(true)} className="px-6 py-4 bg-indigoPrimary hover:bg-indigoPrimary/90 text-white font-bold rounded-xl flex items-center justify-center w-full md:w-fit gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-colors"><FaFileDownload size={18} /> Download Full Resume</button>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-deepNavy/95 backdrop-blur-xl flex flex-col items-center justify-center p-4">
             <button onClick={() => setModalOpen(false)} className="absolute top-6 right-6 p-3 bg-white/10 text-lightGray hover:text-white rounded-full transition-colors z-10 hover:bg-red-500/80"><FaTimes size={24} /></button>
             <div className="w-full max-w-5xl h-[85vh] bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
               <iframe src="/resume.pdf" className="w-full h-full border-none" title="Resume PDF"/>
             </div>
             <a href="/resume.pdf" download className="mt-6 px-6 py-2 bg-indigoPrimary text-white rounded-lg font-medium hover:bg-indigoPrimary/90 transition-colors shadow-lg shadow-indigoPrimary/20">Download PDF</a>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Resume;
