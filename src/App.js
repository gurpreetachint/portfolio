import { useState, useEffect, useRef } from "react";
import portfolio from "./assets/portfolio2.png";
import resumePDF from "./assets/Gurpreet_Singh_Resume.pdf";
import "./index.css"; // Ensure your Tailwind setup is in index.css
import "./App.css";
import Skills from "./lib/skills.js";
import Project from "./lib/projects.js";
import Contact from "./lib/Contact";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from 'react-type-animation';

function Button({ needDesign = false, buttonTitle, className = "", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${
        needDesign
          ? "btn-fancy"
          : "px-4 py-2 bg-transparent text-text dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark font-semibold relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-light dark:after:bg-primary-dark after:transition-all after:duration-300"
      } ${className}`}
    >
      {buttonTitle}
    </button>
  );
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="flex items-center">
      <button
        onClick={toggleTheme}
        className={`relative inline-flex h-7 w-14 items-center rounded-full p-1 transition-colors duration-300 focus:outline-none ${
          isDark 
            ? 'bg-gradient-to-r from-blue-600 to-indigo-700' 
            : 'bg-gradient-to-r from-amber-200 to-yellow-400'
        } shadow-lg`}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      >
        <motion.span
          layout
          className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-md transition-colors duration-300 ${
            isDark ? 'text-yellow-300' : 'text-amber-500'
          }`}
          initial={false}
          animate={{
            x: isDark ? 24 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        >
          {isDark ? (
            <svg 
              className="h-3.5 w-3.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg 
              className="h-3.5 w-3.5" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
            </svg>
          )}
        </motion.span>
        
        {/* Optional: Add stars in dark mode */}
        {isDark && (
          <>
            <motion.span 
              className="absolute left-2 top-1 h-0.5 w-0.5 rounded-full bg-yellow-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.span 
              className="absolute left-4 top-3 h-0.5 w-0.5 rounded-full bg-yellow-300"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            />
          </>
        )}
      </button>
    </div>
  );
}

// AppBar
function AppBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const activeRef = useRef('home');

  useEffect(() => {
    const sectionIds = ['home', 'portfolio', 'about', 'testimonials', 'contact'];
    const elements = sectionIds
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter((item) => item.el);

    if (elements.length === 0) return;

    let frameRequested = false;

    const observer = new IntersectionObserver(
      (entries) => {
        let topCandidate = { id: activeRef.current, ratio: 0 };
        for (const entry of entries) {
          const id = entry.target.getAttribute('id') || '';
          if (entry.isIntersecting && entry.intersectionRatio > topCandidate.ratio) {
            topCandidate = { id, ratio: entry.intersectionRatio };
          }
        }
        if (topCandidate.id && topCandidate.id !== activeRef.current) {
          const next = topCandidate.id;
          if (!frameRequested) {
            frameRequested = true;
            window.requestAnimationFrame(() => {
              activeRef.current = next;
              setActiveSection(next);
              frameRequested = false;
            });
          }
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -55% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none backdrop-blur-2xl bg-white/70 dark:bg-black/70 border-b border-white/20 dark:border-white/10" />
      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <button 
              onClick={() => scrollToSection('home')} 
              className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
            >
              Gurpreet Singh
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Home' },
              { id: 'portfolio', label: 'Skills' },
              { id: 'about', label: 'About' },
              { id: 'testimonials', label: 'Projects' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-white/80 dark:bg-white/10 rounded-full shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
            <motion.a 
              href="https://github.com/gurpreetachint" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>
            <motion.a 
              href="https://www.linkedin.com/in/gurpreet-sin4321gh/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </motion.a>
            <ThemeToggle />
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              Get in touch
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg 
                className="w-6 h-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div id="mobile-menu" className="lg:hidden overflow-hidden">
            <div className="py-2 space-y-1 border-t border-white/20 dark:border-white/10">
              {[
                { id: 'home', label: 'Home' },
                { id: 'portfolio', label: 'Skills' },
                { id: 'about', label: 'About' },
                { id: 'testimonials', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    const el = document.getElementById(item.id);
                    if (el) {
                      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                    }
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'text-gray-900 dark:text-white bg-white/50 dark:bg-white/10'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/30 dark:hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-2 border-t border-white/20 dark:border-white/10">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center space-x-3">
                    <a 
                      href="https://github.com/gurpreetachint" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/gurpreet-sin4321gh/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ThemeToggle />
                    <button
                      onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) {
                          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
                        }
                        setActiveSection('contact');
                        setIsMenuOpen(false);
                      }}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-white dark:text-gray-900 rounded-full hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-200"
                    >
                      Get in touch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </motion.header>
  );
}



// About Me
function AboutMe() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-surface dark:bg-surface-dark relative overflow-hidden">
      <div className="animated-gradient-bg"></div>
      <div className="grid-overlay"></div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-8 sm:gap-10 lg:gap-12 relative">
        <div className="flex-1 space-y-4 sm:space-y-6 animate-fade-in glass-card p-4 sm:p-6 lg:p-8">
          <span className="text-base sm:text-lg font-semibold text-primary-light dark:text-primary-dark">
            Hey, I am Gurpreet
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold leading-tight">
            <span className="lg:inline block">Building the future of</span>
            <span className="hidden lg:inline"> </span>
            <span className="gradient-text inline-block min-w-[6ch] align-top">
              <TypeAnimation
                sequence={[
                  'Mobile',
                  1000,
                  'Web',
                  1000,
                  'UI/UX',
                  1000,
                  'Apps',
                  1000,
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-text-light dark:text-text-dark-light leading-relaxed max-w-2xl">
            I craft seamless mobile and web experiences, transforming innovative ideas into
            dynamic applications. With a passion for both design and technology, I
            specialize in creating user-centric solutions that elevate digital
            interactions and drive success. Let's build something amazing together!
          </p>
          <Button
            needDesign={true}
            buttonTitle="Get in Touch"
            className="mt-8"
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) {
                window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
              }
            }}
          />
        </div>
        <div className="relative flex-1 animate-slide-up">
          <div className="gradient-box rounded-3xl group relative">
            {/* Glow Background Layer */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-light/30 via-accent-blue-light/20 to-primary-light/30 dark:from-primary-dark/30 dark:via-accent-blue-dark/20 dark:to-primary-dark/30 blur-sm scale-105 opacity-60 group-hover:opacity-80 transition-all duration-500" />
            
            {/* Main Image Container */}
            <div className="relative z-10 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-transparent to-accent-blue-light/20 dark:from-primary-dark/20 dark:to-accent-blue-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay" />
              <img
                src={portfolio}
                alt="About Me"
                className="w-full h-auto object-cover rounded-3xl shadow-medium dark:shadow-medium-dark hover:shadow-hard dark:hover:shadow-hard-dark transition-all duration-300 group-hover:scale-110"
              />
            </div>
            
            {/* Animated Border Glow */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-light/40 dark:group-hover:border-primary-dark/40 transition-all duration-300 pointer-events-none" />
            
            {/* Additional Glow Ring */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-primary-light/20 via-transparent to-accent-blue-light/20 dark:from-primary-dark/20 dark:to-accent-blue-dark/20 opacity-0 group-hover:opacity-100 blur-md transition-all duration-500 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutMe2() {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-light/20 to-accent-blue-light/20 dark:from-primary-dark/20 dark:to-accent-blue-dark/20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 gap-6 sm:gap-8 lg:gap-12">
        {/* CV Card - Mobile: Column, Desktop: Row */}
        <div className="w-full lg:flex-1 animate-slide-up">
          <div className="group relative rounded-3xl p-1 shadow-soft dark:shadow-soft-dark hover:shadow-medium dark:hover:shadow-medium-dark transition-all duration-300">
            <div className="glass-card overflow-hidden">
              <a href={resumePDF} target="_blank" rel="noopener noreferrer" className="flex flex-col lg:flex-row items-center justify-center p-6 sm:p-8 lg:p-12 space-y-4 sm:space-y-6 lg:space-y-0 lg:space-x-6 transition-colors duration-300" download="Gurpreet_Singh_Resume.pdf">
                <div className="flex-shrink-0 relative">
                  <svg className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">PDF</span>
                </div>
                <div className="text-center lg:text-left">
                   <h3 className="text-lg sm:text-xl lg:text-2xl font-display font-bold mt-2 text-text dark:text-text-dark">Gurpreet_Singh.pdf</h3>
                 </div>
              </a>
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="w-full lg:flex-1 space-y-4 sm:space-y-6 animate-fade-in glass-card p-4 sm:p-6 lg:p-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight text-text dark:text-text-dark">
            About Me
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-text-light dark:text-text-dark-light leading-relaxed">
            Hi, I'm Gurpreet, a full-stack developer specializing in modern web and mobile solutions. With expertise in React, Flutter, and cloud technologies, I architect scalable applications that deliver exceptional user experiences.
            <br /><br />
            My development approach combines clean code principles with performance optimization, ensuring maintainable and efficient solutions. I'm passionate about implementing cutting-edge technologies like AI integration and microservices architecture to solve complex problems.
          </p>
        </div>
      </div>
    </section>
  );
}

// Animated section component
function AnimatedSection({ id, children }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative"
    >
      {children}
    </motion.section>
  );
}

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary-light dark:bg-primary-dark text-white shadow-lg ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Scroll to top"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: visible ? 1 : 0.8, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-surface dark:bg-surface-dark transition-colors duration-300">
      <AppBar />
      <main className="space-y-12 sm:space-y-16 lg:space-y-20">
        <AnimatedSection id="home">
          <AboutMe />
        </AnimatedSection>
        <AnimatedSection id="portfolio">
          <Skills />
        </AnimatedSection>
        <AnimatedSection id="about">
          <AboutMe2 />
        </AnimatedSection>
        <AnimatedSection id="testimonials">
          <Project />
        </AnimatedSection>
        <AnimatedSection id="contact">
          <Contact />
        </AnimatedSection>
      </main>
      <ScrollToTopButton />
      <footer className="bg-surface-light dark:bg-surface-dark py-6 sm:py-8 mt-12 sm:mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-muted dark:text-text-dark-muted">
          © {new Date().getFullYear()} Made with ❤️ from Gurpreet.
        </div>
      </footer>
    </div>
  );
}

export default App;
