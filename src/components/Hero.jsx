import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaTwitter, FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center z-10">

        {/* Left Side: Profile Photo & Ring Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center order-2 md:order-1"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            {/* Glowing rotating ring */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] animate-spin-slow opacity-20" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigoPrimary to-cyanSecondary opacity-50 blur-lg animate-pulse" />

            {/* Inner frame and image */}
            <div className="absolute inset-2 bg-deepNavy rounded-full z-10 overflow-hidden border-2 border-white/10">
              <div className="w-full h-full bg-lightGray/10 flex items-center justify-center">
                <img src="/profile.jpeg" alt="Gurpreet Singh" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Text Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left order-1 md:order-2 flex flex-col items-center md:items-start"
        >
          {/* Availability Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-6 w-max">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-lightGray">Available for work</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            Hi, I'm Gurpreet Singh
          </h1>

          <div className="text-xl md:text-2xl font-medium text-cyanSecondary mb-6 h-[40px] md:h-[48px]">
            <TypeAnimation
              sequence={[
                'Flutter Developer',
                2000,
                'Mobile App Developer',
                2000,
                'Browser Extension Builder',
                2000,
                'Full Stack Developer',
                2000,
                'UI/UX Enthusiast',
                2000
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <p className="text-lightGray/70 max-w-lg text-lg mb-8 leading-relaxed">
            I craft digital experiences across platforms — from mobile apps and browser extensions to Python libraries and web tools.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
            <a href="#projects" className="px-8 py-3 bg-indigoPrimary hover:bg-indigoPrimary/90 text-white rounded-lg font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] text-center">
              View My Work
            </a>
            <a href="#resume" className="px-8 py-3 border border-indigoPrimary/50 text-lightGray hover:bg-indigoPrimary/10 rounded-lg font-medium transition-all text-center">
              Download Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://github.com/gurpreetachint" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-cyanSecondary">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/gurpreet-singh4321" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-cyanSecondary">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-3 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-cyanSecondary">
              <FaTwitter size={20} />
            </a>
          </div>
        </motion.div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-[32px] left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer z-10 opacity-70 hover:opacity-100 transition-opacity"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <FaChevronDown style={{ color: '#22d3ee', fontSize: '24px' }} />
      </motion.div>
    </section>
  );
};

export default Hero;
