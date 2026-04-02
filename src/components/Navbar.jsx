import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-deepNavy/80 backdrop-blur-md border-b border-white/10 py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="font-display font-bold text-2xl text-lightGray flex items-center gap-1">
            <span className="text-indigoPrimary bg-indigoPrimary/10 px-2 rounded-lg py-0.5">GS</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-lightGray/80 hover:text-cyanSecondary transition-colors font-medium text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" className="bg-indigoPrimary hover:bg-indigoPrimary/90 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-lightGray flex flex-col gap-1.5 z-50 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className={`block w-6 h-0.5 bg-lightGray transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-lightGray transition-opacity ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-lightGray transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-deepNavy border-l border-white/10 md:hidden flex flex-col p-6 items-end justify-center"
          >
            <ul className="flex flex-col space-y-8 text-right text-2xl font-display w-full">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    onClick={() => setIsOpen(false)}
                    className="text-lightGray/80 hover:text-cyanSecondary transition-colors block border-b border-white/10 pb-4"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a 
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-indigoPrimary hover:bg-indigoPrimary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg block mt-4 text-center"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
