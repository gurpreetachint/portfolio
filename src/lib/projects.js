import { FaGlobe, FaShoppingCart, FaTasks, FaGithub } from "react-icons/fa";

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-white/60 dark:bg-white/10 border border-white/30 dark:border-white/10 text-xs text-text dark:text-text-dark">
      {children}
    </span>
  );
}

function HeaderIcon({ children }) {
  return (
    <div className="mb-3 sm:mb-4 p-2 sm:p-3 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-primary-light/10 to-accent-blue-light/10 dark:from-primary-dark/10 dark:to-accent-blue-dark/10 flex items-center justify-center">
      <div className="w-6 h-6 sm:w-8 sm:h-8 text-primary-light dark:text-primary-dark">
        {children}
      </div>
    </div>
  );
}

function ProjectContainer({ title, description, icon, tags = [] }) {
  return (
    <div className="flex-1 group p-4 sm:p-6 rounded-2xl glass-card hover:border-primary-light/20 dark:hover:border-primary-dark/20 transition-all duration-300 animate-fade-in">
      <HeaderIcon>{icon}</HeaderIcon>
      <h2 className="text-lg sm:text-xl font-display font-bold mb-2 text-text dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-300">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-text-light dark:text-text-dark-light leading-relaxed mb-3 sm:mb-4">
        {description}
      </p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Pill key={tag}>{tag}</Pill>
          ))}
        </div>
      )}
    </div>
  );
}

function Project() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-transparent dark:bg-surface-dark section-bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-10 lg:mb-12 glass-card p-4 sm:p-6 lg:p-8">
          <div className="flex-1">
            <span className="text-base sm:text-lg font-semibold text-primary-light dark:text-primary-dark mb-2 block">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                My Projects
              </div>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-text dark:text-text-dark">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Recent Work
              </div>
            </h1>
          </div>
          <a
            href="https://github.com/gurpreetachint"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 sm:mt-6 lg:mt-0 px-4 sm:px-6 py-2 sm:py-3 border border-white/30 dark:border-white/10 bg-white/60 dark:bg-white/10 rounded-full text-xs sm:text-sm font-medium hover:bg-white/80 dark:hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
          >
            <FaGithub className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <ProjectContainer
            title="Portfolio Website"
            icon={<FaGlobe className="w-full h-full" />}
            description="A modern, responsive portfolio website built with React and Tailwind CSS. Features dark mode, animations, and optimized performance."
            tags={["React", "Tailwind", "Framer Motion"]}
          />
          <ProjectContainer
            title="E-commerce Platform"
            icon={<FaShoppingCart className="w-full h-full" />}
            description="Full-stack e-commerce solution using the MERN stack. Includes auth, product management, shopping cart, and payments."
            tags={["MERN", "Stripe", "JWT"]}
          />
          <ProjectContainer
            title="Task Management App"
            icon={<FaTasks className="w-full h-full" />}
            description="A collaborative task management application with real-time updates, user roles, and project tracking."
            tags={["React", "Firebase", "Realtime"]}
          />
        </div>
      </div>
    </section>
  );
}

export default Project;
