import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative border-t border-white/10 bg-slate-950 px-6 py-12 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright */}
        <div className="text-lightGray/70 text-sm flex flex-col items-center md:items-start gap-1">
          <p className="font-medium text-lightGray">Designed & built by Gurpreet Singh</p>
          <p>© {currentYear} All rights reserved.</p>
        </div>

        {/* Socials */}
        <div className="flex gap-4">
          <a href="https://github.com/gurpreetachint" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-lightGray hover:text-cyanSecondary border border-white/5 shadow-inner">
            <FaGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/gurpreet-singh4321" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-lightGray hover:text-cyanSecondary border border-white/5 shadow-inner">
            <FaLinkedin size={18} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-lightGray hover:text-cyanSecondary border border-white/5 shadow-inner">
            <FaTwitter size={18} />
          </a>
        </div>

        {/* Back to top */}
        <button 
          onClick={scrollToTop}
          className="group flex flex-col items-center gap-2"
          aria-label="Back to top"
        >
          <div className="p-4 bg-indigoPrimary/10 group-hover:bg-indigoPrimary text-indigoPrimary group-hover:text-white rounded-full transition-colors border border-indigoPrimary/30 group-hover:border-indigoPrimary">
            <FaArrowUp />
          </div>
        </button>

      </div>
    </footer>
  );
};

export default Footer;
