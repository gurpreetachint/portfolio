import {
  SiJavascript,
  SiPython,
  SiReact,
  SiAngular,
  SiDjango,
  SiFlutter,
  SiGraphql,
  SiApollographql,
  SiAndroidstudio,
  SiGit,
  SiPostman,
  SiFigma,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";
import { FaJava, FaUserTie, FaPenFancy, FaClock, FaPuzzlePiece, FaCode, FaWrench, FaLayerGroup } from "react-icons/fa";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 dark:bg-white/10 border border-white/30 dark:border-white/10 text-sm text-text dark:text-text-dark shadow-soft">
      {children}
    </span>
  );
}

function HeaderIcon({ children }) {
  return (
    <div className="mb-4 sm:mb-6 p-2 sm:p-3 w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-accent-purple-light/10 to-accent-green-light/10 dark:from-accent-purple-dark/10 dark:to-accent-green-dark/10 flex items-center justify-center">
      <div className="w-6 h-6 sm:w-9 sm:h-9 text-primary-light dark:text-primary-dark">
        {children}
      </div>
    </div>
  );
}

function SkillContainer({ title, description, icon }) {
  return (
    <div className="group p-4 sm:p-6 rounded-2xl glass-card hover:border-primary-light/20 dark:hover:border-primary-dark/20 transition-all duration-300 animate-fade-in">
      <HeaderIcon>{icon}</HeaderIcon>
      <h2 className="text-lg sm:text-xl lg:text-2xl font-display font-bold mb-3 sm:mb-4 text-text dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
        {title}
      </h2>
      <div>
        {description}
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent dark:bg-surface-dark section-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 glass-card p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight mb-4 sm:mb-6 text-text dark:text-text-dark">
            My Skills
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-text-light dark:text-text-dark-light leading-relaxed">
            I specialize in creating innovative digital solutions that combine technical excellence with stunning design. Here are the key areas where I can help bring your vision to life.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <SkillContainer
            title="Languages"
            icon={<FaCode className="w-full h-full" />}
            description={
              <div className="flex flex-wrap gap-2">
                <Pill><SiPython className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Python</Pill>
                <Pill><SiFlutter className="w-4 h-4 text-primary-light dark:text-primary-dark" style={{transform: "rotate(90deg)"}} /> Dart</Pill>
                <Pill><SiJavascript className="w-4 h-4 text-primary-light dark:text-primary-dark" /> JavaScript</Pill>
                <Pill><FaJava className="w-4 h-4 text-primary-light dark:text-primary-dark" /> JAVA</Pill>
              </div>
            }
          />
          <SkillContainer
            title="Frameworks"
            icon={<FaLayerGroup className="w-full h-full" />}
            description={
              <div className="flex flex-wrap gap-2">
                <Pill><SiFlutter className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Flutter</Pill>
                <Pill><SiReact className="w-4 h-4 text-primary-light dark:text-primary-dark" /> ReactJS</Pill>
                <Pill><SiGraphql className="w-4 h-4 text-primary-light dark:text-primary-dark" /> GraphQL</Pill>
                <Pill><SiApollographql className="w-4 h-4 text-primary-light dark:text-primary-dark" /> ApolloJS</Pill>
                <Pill><SiAngular className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Angular</Pill>
                <Pill><SiDjango className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Django</Pill>
              </div>
            }
          />
          <SkillContainer
            title="Tools"
            icon={<FaWrench className="w-full h-full" />}
            description={
              <div className="flex flex-wrap gap-2">
                <Pill><SiAndroidstudio className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Android Studio</Pill>
                <Pill><FaCode className="w-4 h-4 text-primary-light dark:text-primary-dark" /> VS Code</Pill>
                <Pill><SiGit className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Git</Pill>
                <Pill><SiPostman className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Postman</Pill>
                <Pill><SiFigma className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Figma</Pill>
                <Pill><SiFirebase className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Firebase</Pill>
                <Pill><SiSupabase className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Supabase</Pill>
              </div>
            }
          />
          <SkillContainer
            title="Soft Skills"
            icon={<FaUserTie className="w-full h-full" />}
            description={
              <div className="flex flex-wrap gap-2">
                <Pill><FaUserTie className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Leadership</Pill>
                <Pill><FaPenFancy className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Writing</Pill>
                <Pill><FaClock className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Time Management</Pill>
                <Pill><FaPuzzlePiece className="w-4 h-4 text-primary-light dark:text-primary-dark" /> Problem Solver</Pill>
              </div>
            }
          />
        </div>
      </div>
    </section>
  );
}

export default Skills;
// Remove everything below this line if not used
