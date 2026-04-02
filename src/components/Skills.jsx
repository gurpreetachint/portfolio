import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: 'Mobile',
    skills: ['Flutter', 'Dart', 'React Native', 'Swift', 'Kotlin']
  },
  {
    title: 'Web',
    skills: ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'HTML/CSS', 'TypeScript']
  },
  {
    title: 'Python',
    skills: ['Data Science Libraries', 'Scripting', 'Automation', 'Flask/FastAPI']
  },
  {
    title: 'Tools',
    skills: ['Git', 'VS Code', 'Chrome Extension APIs', 'Firebase', 'Supabase', 'Figma']
  }
];

const stats = [
  { label: 'Projects Built', value: '10+' },
  { label: 'Apps Published', value: '10' },
  { label: 'GitHub Stars', value: '500+' }
];

const Skills = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* About Text & Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Behind the Code</h2>
            <p className="text-lightGray/80 text-lg leading-relaxed mb-10">
              I'm a developer passionate about building clean, fast, and useful products across mobile, web, and Python ecosystems. With a strong foundation in modern frameworks, I focus on writing scalable code and creating intuitive user interfaces. Whether it's a sleek mobile app or a robust backend API, I love turning complex problems into elegant solutions.
            </p>

            {/* Stat Cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                  className="glass-panel p-4 text-center border-t-2 border-t-indigoPrimary/50"
                >
                  <div className="text-2xl md:text-4xl font-display font-bold text-cyanSecondary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-lightGray/60 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Badges */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-8"
          >
            {skillCategories.map((category, catIdx) => (
              <div key={category.title}>
                <h3 className="text-xl font-display font-semibold mb-4 text-indigoPrimary">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (catIdx * 0.1) + (skillIdx * 0.05), duration: 0.4 }}
                      className="px-4 py-2 rounded-full border border-indigoPrimary/30 bg-indigoPrimary/5 text-lightGray/90 text-sm font-medium hover:bg-indigoPrimary/20 hover:border-cyanSecondary/50 hover:text-cyanSecondary transition-colors shadow-[0_0_10px_rgba(99,102,241,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] cursor-default"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Beyond Code Strip */}
      <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-b border-indigoPrimary/20 pb-12">
        <div className="flex flex-col items-center">
          <span className="text-[11px] tracking-widest text-cyanSecondary font-mono uppercase mb-5">Beyond the screen</span>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white hover:border-cyanSecondary hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-default flex items-center gap-2">
              <span className="text-lg leading-none">🏊</span> National Level Swimmer
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white hover:border-cyanSecondary hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-default flex items-center gap-2">
              <span className="text-lg leading-none">🎖</span> NCC A Certificate Holder
            </div>
            <div className="bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white hover:border-cyanSecondary hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-default flex items-center gap-2">
              <span className="text-lg leading-none">⚔</span> Army Camp Veteran
            </div>
          </div>
          <p className="text-sm text-lightGray/50 italic text-center max-w-lg">
            "I believe the best engineers train their bodies as hard as they train their minds."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
