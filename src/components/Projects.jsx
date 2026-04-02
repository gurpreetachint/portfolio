import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaApple, FaGooglePlay, FaExternalLinkAlt } from 'react-icons/fa';

// --- TILT EFFECT HOOK ---
// Applies a 3D tilt effect on mouse move.
const useTilt = () => {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return { ref, onMouseMove: handleMouseMove, onMouseLeave: handleMouseLeave };
};

// --- DUMMY DATA ---
const projects = [
  {
    id: 1,
    title: 'HealthTrack',
    category: 'Mobile Apps',
    desc: 'A comprehensive fitness tracking app with real-time metrics.',
    tags: ['Flutter', 'Firebase'],
    image: 'https://placehold.co/300x600/1e293b/ffffff?text=App+Screenshot',
    links: { store: '#', github: '#' }
  },
  {
    id: 2,
    title: 'FocusMode',
    category: 'Extensions',
    desc: 'Block distractions and stay focused with this customizable website blocker.',
    tags: ['JavaScript', 'Chrome API'],
    image: 'https://placehold.co/600x400/1e293b/ffffff?text=Extension+UI',
    links: { store: '#', github: '#' }
  },
  {
    id: 3,
    title: 'py-dataclean',
    category: 'Python Libraries',
    desc: 'A lightning-fast library for automating pandas data cleaning tasks.',
    tags: ['Python', 'Pandas'],
    codeSnippet: 'pip install py-dataclean\n\nimport dataclean\ndf = dataclean.auto_format(df)',
    version: 'v1.2.0',
    stars: '1.2k',
    links: { pypi: '#', github: '#' }
  },
  {
    id: 4,
    title: 'CryptoDashboard',
    category: 'Websites',
    desc: 'Real-time cryptocurrency tracking dashboard with web sockets.',
    tags: ['React', 'Next.js', 'Tailwind'],
    image: 'https://placehold.co/800x500/1e293b/ffffff?text=Dashboard+Preview',
    links: { demo: '#', github: '#' }
  }
];

const categories = ['All', 'Mobile Apps', 'Extensions', 'Python Libraries', 'Websites'];

// --- CARD COMPONENTS ---

const MobileCard = ({ project }) => {
  const tilt = useTilt();
  return (
    <div {...tilt} className="glass-panel p-6 flex flex-col items-center justify-between h-full group transition-all duration-300 ease-out z-10 hover:z-20">
      <div className="w-full flex-1 flex items-center justify-center mb-6">
        {/* CSS Phone Mockup */}
        <div className="relative w-48 h-[22rem] bg-deepNavy border-[6px] border-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden group-hover:-translate-y-2 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300">
          <div className="absolute top-0 inset-x-0 h-5 bg-slate-800 rounded-b-xl w-24 mx-auto z-20"></div>
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="w-full text-center">
        <h3 className="text-xl font-display font-bold text-white mb-2">{project.title}</h3>
        <p className="text-lightGray/70 text-sm mb-4 line-clamp-2">{project.desc}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider bg-indigoPrimary/20 text-indigoPrimary px-2 py-1 rounded border border-indigoPrimary/30">{tag}</span>
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <a href={project.links.store} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"><FaApple /></a>
          <a href={project.links.store} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"><FaGooglePlay /></a>
          <a href={project.links.github} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"><FaGithub /></a>
        </div>
      </div>
    </div>
  );
};

const ExtensionCard = ({ project }) => {
  const tilt = useTilt();
  return (
    <div {...tilt} className="glass-panel p-6 flex flex-col md:flex-row gap-6 items-center group transition-all duration-300 ease-out md:col-span-2 lg:col-span-3 z-10 hover:z-20">
      <div className="w-full md:w-1/2">
        {/* CSS Browser Mockup */}
        <div className="w-full rounded-xl bg-slate-800/80 overflow-hidden border border-white/10 shadow-lg">
          <div className="h-8 bg-slate-900 flex items-center px-3 gap-2 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="ml-4 h-4 bg-slate-800 rounded flex-1"></div>
          </div>
          <img src={project.image} alt={project.title} className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="inline-block bg-white/10 text-xs font-bold text-lightGray px-3 py-1 rounded-full w-max mb-3 flex items-center gap-2 border border-white/10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg" className="w-3 h-3" alt="Chrome" />
          Chrome Web Store
        </div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">{project.title}</h3>
        <p className="text-lightGray/70 text-sm mb-6 max-w-md leading-relaxed">{project.desc}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-mono text-cyanSecondary bg-cyanSecondary/10 px-2 py-1 rounded border border-cyanSecondary/20">{tag}</span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href={project.links.github} className="flex items-center gap-2 text-sm text-lightGray hover:text-white transition-colors"><FaGithub /> Source Code</a>
        </div>
      </div>
    </div>
  );
};

const PythonCard = ({ project }) => {
  const tilt = useTilt();
  return (
    <div {...tilt} className="glass-panel p-6 flex flex-col justify-between group transition-all duration-300 ease-out bg-slate-900 border-slate-700 z-10 hover:z-20">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-mono font-bold text-white">{project.title}</h3>
          <div className="flex gap-2">
            <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-1 rounded flex items-center gap-1 font-mono">PyPI | {project.version}</span>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded flex items-center gap-1 font-mono">★ {project.stars}</span>
          </div>
        </div>
        <p className="text-lightGray/70 text-sm mb-6 font-mono">{project.desc}</p>

        {/* Fake Terminal */}
        <div className="rounded-lg bg-black/80 font-mono text-xs overflow-hidden border border-slate-800 shadow-inner mb-6">
          <div className="h-6 bg-slate-800 flex items-center px-3 gap-1.5 opacity-80">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            <span className="text-[10px] text-slate-400 ml-2 font-sans tracking-wider">bash</span>
          </div>
          <div className="p-4 text-green-400 whitespace-pre text-left overflow-x-auto leading-relaxed">
            {project.codeSnippet}
          </div>
        </div>
      </div>

      <div className="flex gap-4 border-t border-slate-800 pt-4">
        <a href={project.links.pypi} className="text-sm font-mono text-cyanSecondary hover:text-white transition-colors bg-cyanSecondary/10 px-3 py-1 rounded border border-cyanSecondary/20">View on PyPI</a>
        <a href={project.links.github} className="text-sm font-mono text-slate-400 hover:text-white transition-colors bg-white/5 px-3 py-1 rounded border border-white/10 flex items-center gap-2"><FaGithub /> Repo</a>
      </div>
    </div>
  );
};

const WebCard = ({ project }) => {
  const tilt = useTilt();
  return (
    <div {...tilt} className="glass-panel p-0 overflow-hidden group transition-all duration-300 ease-out md:col-span-2 xl:col-span-2 z-10 hover:z-20 flex flex-col">
      {/* CSS Browser Mockup Header */}
      <div className="h-8 bg-slate-800 border-b border-white/10 flex items-center px-4 gap-2 w-full">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="mx-4 flex-1 h-4 bg-slate-900 rounded-[4px] flex items-center px-2">
          <span className="text-[9px] text-slate-500 font-mono align-middle tracking-wider">https://{project.title.toLowerCase().replace(' ', '')}.com</span>
        </div>
      </div>

      {/* Screenshot Frame */}
      <div className="relative h-48 sm:h-64 overflow-hidden border-b border-white/5 w-full bg-slate-900">
        <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-white mb-2">{project.title}</h3>
          <p className="text-lightGray/70 text-sm mb-4 line-clamp-2">{project.desc}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="text-[10px] font-medium bg-white/10 text-white px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <a href={project.links.demo} className="flex-1 text-center bg-indigoPrimary hover:bg-indigoPrimary/90 text-white py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
            Live Demo <FaExternalLinkAlt size={12} />
          </a>
          <a href={project.links.github} className="flex-1 text-center border border-white/20 text-white hover:bg-white/10 py-2 rounded font-medium text-sm transition-colors flex items-center justify-center gap-2">
            <FaGithub size={14} /> GitHub
          </a>
        </div>
      </div>
    </div>
  );
};


// --- MAIN PORTFOLIO COMPONENT ---
const Projects = () => {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProjects = projects.filter(p =>
    activeTab === 'All' ? true : p.category === activeTab
  );

  return (
    <section id="projects" className="py-24 px-6 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">Things I've Built</h2>
          <p className="text-cyanSecondary font-medium tracking-wide">Across platforms and problem spaces</p>
        </div>

        {/* Tabbed Filter Bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeTab === cat
                  ? 'bg-indigoPrimary text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                  : 'bg-white/5 text-lightGray hover:bg-white/10 border border-transparent hover:border-white/10'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className={
                  project.category === 'Extensions' ? 'md:col-span-2 lg:col-span-3'
                    : project.category === 'Websites' ? 'md:col-span-2 xl:col-span-2'
                      : ''
                }
              >
                {project.category === 'Mobile Apps' && <MobileCard project={project} />}
                {project.category === 'Extensions' && <ExtensionCard project={project} />}
                {project.category === 'Python Libraries' && <PythonCard project={project} />}
                {project.category === 'Websites' && <WebCard project={project} />}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
