import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaLaptopCode, FaTools, FaUserFriends, FaDownload, FaJava, FaPython, FaReact, FaGitAlt } from 'react-icons/fa';
import { SiDart, SiJavascript, SiFlutter, SiGraphql, SiApollographql, SiAndroidstudio, SiPostman, SiFigma, SiFirebase, SiSupabase } from 'react-icons/si';
import { VscVscode } from 'react-icons/vsc';

const SkillCategory = ({ title, icon: Icon, skills, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.5 }}
        className="glass p-8 rounded-3xl hover:bg-white/10 transition-colors duration-300 flex flex-col h-full"
    >
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 text-2xl text-blue-400">
            <Icon />
        </div>
        <h3 className="text-2xl font-bold mb-6">{title}</h3>
        <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
                <div key={skill.name} className="flex items-center gap-2 bg-white dark:bg-white/5 border border-slate-100 dark:border-transparent px-4 py-2 rounded-lg text-sm md:text-base text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10 transition-all cursor-default shadow-sm dark:shadow-none">
                    {skill.icon && <skill.icon className="text-lg text-blue-500 dark:text-blue-400" />}
                    <span>{skill.name}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

const Skills = () => {
    const categories = [
        {
            title: "Languages",
            icon: FaCode,
            skills: [
                { name: "Python", icon: FaPython },
                { name: "Dart", icon: SiDart },
                { name: "JavaScript", icon: SiJavascript },
                { name: "Java", icon: FaJava },
            ]
        },
        {
            title: "Frameworks",
            icon: FaLaptopCode,
            skills: [
                { name: "Flutter", icon: SiFlutter },
                { name: "ReactJS", icon: FaReact },
                { name: "GraphQL", icon: SiGraphql },
                { name: "ApolloJS", icon: SiApollographql },
            ]
        },
        {
            title: "Tools",
            icon: FaTools,
            skills: [
                { name: "Android Studio", icon: SiAndroidstudio },
                { name: "VS Code", icon: VscVscode },
                { name: "Git", icon: FaGitAlt },
                { name: "Postman", icon: SiPostman },
                { name: "Figma", icon: SiFigma },
                { name: "Firebase", icon: SiFirebase },
                { name: "Supabase", icon: SiSupabase },
            ]
        },
        {
            title: "Soft Skills",
            icon: FaUserFriends,
            skills: [
                { name: "Leadership", icon: null },
                { name: "Writing", icon: null },
                { name: "Time Management", icon: null },
                { name: "Problem Solver", icon: null },
            ]
        }
    ];

    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-3xl -z-10 animate-pulse" />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                    >
                        My <span className="text-gradient">Skills</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg mb-8"
                    >
                        I specialize in creating innovative digital solutions that combine technical excellence with stunning design.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <a
                            href="/resume.pdf"
                            download="Gurpreet_Singh_Resume.pdf"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-slate-200 dark:border-slate-700"
                        >
                            <FaDownload />
                            Download Resume
                        </a>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((category, index) => (
                        <SkillCategory key={category.title} {...category} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
