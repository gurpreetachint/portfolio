import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaReact, FaNodeJs, FaPython, FaDatabase, FaMobile, FaGamepad } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiFirebase, SiNextdotjs, SiOpenai, SiJavascript, SiFramer } from 'react-icons/si';

const projects = [
    {
        title: "PDFMax",
        category: "Productivity Tool",
        color: "from-blue-500 to-cyan-500",
        image: "/pdfmax.png",
        techStack: [
            { icon: <FaReact />, name: "React" },
            { icon: <SiTailwindcss />, name: "Tailwind" },
            { icon: <FaNodeJs />, name: "Node.js" },
            { icon: <SiTypescript />, name: "TypeScript" }
        ],
        embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7408760951614840832" height="800" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
    },
    {
        title: "Portfolio",
        category: "Personal Brand",
        color: "from-purple-500 to-pink-500",
        techStack: [
            { icon: <FaReact />, name: "React" },
            { icon: <SiTailwindcss />, name: "Tailwind" },
            { icon: <SiFramer />, name: "Framer" }
        ],
        embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7305732082993930240" height="739" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
    },
    {
        title: "MedFarm",
        category: "Healthcare / AgriTech",
        color: "from-green-500 to-emerald-500",
        techStack: [
            { icon: <FaMobile />, name: "React Native" },
            { icon: <SiFirebase />, name: "Firebase" },
            { icon: <FaNodeJs />, name: "Node.js" },
            { icon: <FaDatabase />, name: "SQL" }
        ],
        embed: `
            <div class="flex flex-col gap-6 items-center w-full">
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7274901115979124737" height="1105" width="100%" frameborder="0" allowfullscreen="" title="Embedded post 1"></iframe>
                <div class="text-slate-400 text-sm font-bold uppercase tracking-widest py-2">More Updates Below</div>
                <iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7276689206066712577" height="1126" width="100%" frameborder="0" allowfullscreen="" title="Embedded post 2"></iframe>
            </div>
        `
    },
    {
        title: "HeyDoc AI",
        category: "AI Healthcare Assistant",
        color: "from-violet-500 to-fuchsia-500",
        techStack: [
            { icon: <SiOpenai />, name: "OpenAI" },
            { icon: <FaPython />, name: "Python" },
            { icon: <SiNextdotjs />, name: "Next.js" }
        ],
        embed: `<div class="flex items-center justify-center h-full text-slate-400 min-h-[400px]">Embed content pending...</div>`
    },
    {
        title: "YTMusic Sync Script (GTA 5)",
        category: "Automation / Gaming",
        color: "from-orange-500 to-red-500",
        techStack: [
            { icon: <FaPython />, name: "Python" },
            { icon: <FaGamepad />, name: "Game API" },
            { icon: <SiJavascript />, name: "JS" }
        ],
        embed: `<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7316787812429656065" height="1012" width="100%" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>`
    },
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    // Safety: Ensure scroll is restored when deselecting
    useEffect(() => {
        if (!selectedProject) {
            document.body.style.overflow = 'unset';
            // Optional: scroll back to projects section when closing? 
            // For now, let's keep it simple.
        }
    }, [selectedProject]);

    return (
        <section id="projects" className="py-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">

            <AnimatePresence mode="wait">
                {!selectedProject ? (
                    <motion.div
                        key="grid-view"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                    >
                        <h2 className="text-4xl font-bold mb-12 text-center md:text-left">
                            Featured <span className="text-gradient">Projects</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {projects.map((project, index) => (
                                <motion.div
                                    key={project.title}
                                    onClick={() => setSelectedProject(project)}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative h-96 rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-2xl hover:shadow-purple-500/10"
                                >
                                    {/* Background Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />

                                    {/* Project Icon/Image */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 flex items-center justify-center">
                                        {project.image ? (
                                            <div className="relative w-32 h-32 bg-slate-900/50 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl p-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                <img src={project.image} alt={project.title} className="w-full h-full object-contain drop-shadow-lg" />
                                            </div>
                                        ) : (
                                            <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-4xl font-bold text-white/50 group-hover:scale-110 transition-transform duration-500">
                                                {project.title.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent pt-24">
                                        <h3 className="text-3xl font-bold mb-2 text-white">{project.title}</h3>
                                        <p className="text-slate-400 text-lg">{project.category}</p>
                                    </div>

                                    {/* Action Button Hint */}
                                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10">
                                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ) : (
                    /* DETAILS PAGE VIEW */
                    <motion.div
                        key="detail-view"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        onAnimationStart={() => {
                            const section = document.getElementById('projects');
                            if (section) {
                                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                        className="w-full flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8 sticky top-24 z-50 bg-slate-950/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group px-4 py-2 rounded-xl hover:bg-white/5"
                            >
                                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                <span className="font-medium text-lg">Back to Projects</span>
                            </button>
                            <h3 className="text-xl font-bold text-white hidden md:block">{selectedProject.title}</h3>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-12">
                            {/* Left Side: Info & Petals */}
                            <div className="w-full lg:w-1/3 flex flex-col items-center lg:sticky lg:top-40 h-fit">
                                <div className="w-full bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/10 relative overflow-hidden flex flex-col items-center shadow-2xl">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedProject.color} opacity-10`} />

                                    {/* STATIC PETAL VISUAL (No Layout Transition) */}
                                    <div className="relative w-64 h-64 mb-8 flex items-center justify-center mt-4">
                                        {/* Center */}
                                        <div className="z-20 w-28 h-28 bg-slate-900 rounded-full border-4 border-slate-800 shadow-2xl flex items-center justify-center relative">
                                            {selectedProject.image ? (
                                                <img src={selectedProject.image} alt={selectedProject.title} className="w-20 h-20 object-contain" />
                                            ) : (
                                                <span className="text-4xl font-bold text-white">{selectedProject.title.charAt(0)}</span>
                                            )}
                                        </div>

                                        {/* Orbiting Techs */}
                                        {selectedProject.techStack && selectedProject.techStack.map((tech, i) => {
                                            const total = selectedProject.techStack.length;
                                            const angle = (i / total) * 360;
                                            const radius = 95;
                                            return (
                                                <motion.div
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.3 + (i * 0.1), type: "spring" }}
                                                    className="absolute z-10 w-14 h-14 bg-slate-800 rounded-full border border-white/10 flex items-center justify-center text-white/90 shadow-lg text-2xl"
                                                    style={{
                                                        transform: `translate(${radius * Math.cos((angle * Math.PI) / 180)}px, ${radius * Math.sin((angle * Math.PI) / 180)}px)`
                                                    }}
                                                    title={tech.name}
                                                >
                                                    {tech.icon}
                                                </motion.div>
                                            );
                                        })}

                                        <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow pointer-events-none" style={{ width: '200px', height: '200px' }} />
                                    </div>

                                    <h1 className="text-4xl font-bold text-white text-center mb-2">{selectedProject.title}</h1>
                                    <p className="text-purple-400 font-medium text-xl mb-8">{selectedProject.category}</p>

                                    <div className="flex flex-wrap gap-2 justify-center w-full">
                                        {selectedProject.techStack.map((t, i) => (
                                            <span key={i} className="text-sm font-mono text-slate-300 bg-slate-900/80 px-4 py-2 rounded-full border border-white/5">
                                                {t.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Embed Content */}
                            <div className="flex-1 w-full min-h-[800px]">
                                <motion.div
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    onMouseEnter={() => document.body.style.overflow = 'hidden'}
                                    onMouseLeave={() => document.body.style.overflow = 'unset'}
                                    className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                                >
                                    <div dangerouslySetInnerHTML={{ __html: selectedProject.embed }} className="w-full" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;

