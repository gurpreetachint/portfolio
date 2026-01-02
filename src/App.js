import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-200 transition-colors duration-300">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <footer className="py-6 text-center text-slate-500 dark:text-slate-600 text-sm">
        © 2026 Portfolio. Built with React & Tailwind.
      </footer>
    </div>
  );
}

export default App;
