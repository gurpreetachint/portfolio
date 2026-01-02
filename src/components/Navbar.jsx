import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaGithub, FaLinkedin } from 'react-icons/fa';

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 glass px-6 py-4 flex justify-between items-center"
    >
      <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-outfit">
        Portfolio.
      </h1>

      <div className="flex items-center gap-8">
        <ul className="hidden md:flex space-x-8">
          {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover:text-blue-400 dark:text-slate-200 text-slate-800 transition-colors cursor-pointer text-sm font-medium tracking-wide"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4 mr-4">
          <a href="https://github.com/gurpreetachint" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors">
            <FaGithub size={20} />
          </a>
          <a href="https://linkedin.com/in/gurpreet-singh4321" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-blue-500 transition-colors">
            <FaLinkedin size={20} />
          </a>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-slate-800 dark:text-yellow-400"
          aria-label="Toggle Theme"
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={theme}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} className="text-slate-600" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
