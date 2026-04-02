import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaMapMarkerAlt, FaEnvelope, FaCheckCircle, FaCopy, FaTimesCircle } from 'react-icons/fa';

const SUBJECT_OPTIONS = [
  { value: 'Job Opportunity', label: 'Job Opportunity', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { value: 'Freelance Project', label: 'Freelance Project', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg> },
  { value: 'Collaboration', label: 'Collaboration', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { value: 'Other', label: 'Other', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg> }
];

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [copied, setCopied] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [subjectValue, setSubjectValue] = useState(SUBJECT_OPTIONS[0]);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('gurpreetachint@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.target;
    const data = new FormData(form);

    try {
      console.log('Sending message to Web3Forms...');
      console.log('Using Access Key (Status):', process.env.REACT_APP_WEB3FORMS_KEY ? 'Found' : 'Missing');

      // Web3Forms Integration
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json();
      console.log('Web3Forms Response:', result);

      if (response.ok && result.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Web3Forms Error details:', result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative">
      <style>{`
        .custom-select { position: relative; width: 100%; user-select: none; }
        .select-trigger {
          display: flex; align-items: center; justify-content: space-between; padding: 12px 14px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s;
          color: rgba(255,255,255,0.9); font-size: 14px; letter-spacing: 0.01em;
        }
        .custom-select.open .select-trigger { border-color: rgba(99,102,241,0.6); box-shadow: 0 0 0 3px rgba(99,102,241,0.08); }
        .select-chevron { color: rgba(255,255,255,0.3); transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), color 0.2s; flex-shrink: 0; }
        .custom-select.open .select-chevron { transform: rotate(180deg); color: rgba(99,102,241,0.8); }
        .select-options {
          position: absolute; top: 100%; left: 0; right: 0; background: #0c1220; border: 1px solid rgba(99,102,241,0.25);
          border-top: 1px solid rgba(255,255,255,0.04); border-radius: 0 0 8px 8px; list-style: none; margin: 0; padding: 4px 0; z-index: 100;
          opacity: 0; transform: translateY(-6px) scaleY(0.96); transform-origin: top center; pointer-events: none;
          transition: opacity 0.12s ease, transform 0.12s ease; box-shadow: 0 4px 6px rgba(0,0,0,0.1), 0 10px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.08);
          backdrop-filter: blur(12px);
        }
        .custom-select.open .select-options {
          opacity: 1; transform: translateY(0) scaleY(1); pointer-events: all;
          transition: opacity 0.18s cubic-bezier(0.16, 1, 0.3, 1), transform 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .select-option {
          display: flex; align-items: center; gap: 10px; padding: 9px 14px; cursor: pointer;
          font-size: 13px; font-weight: 400; letter-spacing: 0.01em; color: rgba(255,255,255,0.6);
          margin: 0; border-radius: 0; opacity: 0; transform: translateX(-4px); transition: background 0.12s, color 0.12s, opacity 0.15s, transform 0.15s;
        }
        .custom-select.open .select-option { opacity: 1; transform: translateX(0); }
        .custom-select.open .select-option:nth-child(1) { transition-delay: 0ms; }
        .custom-select.open .select-option:nth-child(2) { transition-delay: 30ms; }
        .custom-select.open .select-option:nth-child(3) { transition-delay: 60ms; }
        .custom-select.open .select-option:nth-child(4) { transition-delay: 90ms; }
        .select-option:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.9); }
        .select-option:hover .option-icon { color: rgba(99,102,241,0.7); }
        .select-option.selected { border-left: 2px solid #6366f1; padding-left: 12px; background: rgba(99,102,241,0.06); color: white; font-weight: 500; }
        .select-option.selected .option-icon { color: rgba(99,102,241,0.7); }
        .option-icon { color: rgba(255,255,255,0.25); flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: color 0.12s; }
        .select-option[data-value="Other"] { border-top: 1px solid rgba(255,255,255,0.05); margin: 4px 14px 0 14px; padding-left: 0; }
        .select-option.selected[data-value="Other"] { border-left: 0; padding-left: 0; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(99,102,241,0.06); margin-left: 14px; }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">Let's Build Something</h2>
          <p className="text-cyanSecondary font-medium tracking-wide border border-cyanSecondary/20 bg-cyanSecondary/5 px-4 py-1.5 rounded-full inline-block">
            Open to freelance, collabs, and full-time roles
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-10 flex items-center gap-3">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
              </span>
              <span className="text-xl font-display font-medium text-white">Actively accepting new projects</span>
            </div>

            <h3 className="text-4xl lg:text-5xl font-bold mb-6 text-lightGray leading-tight">
              Got a project in mind? <br />
              <span className="text-indigoPrimary">Let's talk.</span>
            </h3>

            <p className="text-lightGray/70 mb-10 text-lg leading-relaxed max-w-md">
              Whether you need a custom mobile app, a powerful backend, or just want to say hi — I'd love to hear from you.
            </p>

            <div className="space-y-6 mb-12">
              {/* Copyable Email */}
              <div
                onClick={handleCopyEmail}
                className="flex items-center gap-4 group cursor-pointer w-fit"
              >
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-cyanSecondary group-hover:bg-cyanSecondary/10 transition-colors">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightGray/50 mb-1">Email</p>
                  <p className="text-lg font-medium tracking-wide flex items-center gap-3 text-white">
                    gurpreetachint@gmail.com
                    {copied ? (
                      <span className="text-green-400 text-sm font-bold flex items-center gap-1"><FaCheckCircle /> Copied</span>
                    ) : (
                      <FaCopy className="text-lightGray/40 group-hover:text-cyanSecondary transition-colors" />
                    )}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-indigoPrimary">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-sm text-lightGray/50 mb-1">Location</p>
                  <p className="text-lg font-medium tracking-wide text-white">Live in Indore</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
              <a href="https://github.com/gurpreetachint" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-white">
                <FaGithub size={24} />
              </a>
              <a href="https://linkedin.com/in/gurpreet-singh4321" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-white">
                <FaLinkedin size={24} />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="p-4 glass-panel hover:bg-white/10 hover:-translate-y-1 transition-all text-lightGray hover:text-white">
                <FaTwitter size={24} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-panel p-8 md:p-10 relative overflow-hidden">
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-deepNavy/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <FaCheckCircle className="text-green-500 text-7xl mb-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] rounded-full" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-lightGray/70">I'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-deepNavy/95 backdrop-blur-sm z-20 flex flex-col items-center justify-center p-6 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', bounce: 0.5 }}
                    >
                      <FaTimesCircle className="text-red-500 text-7xl mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] rounded-full" />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2">Could Not Send</h3>
                    <p className="text-lightGray/70 max-w-sm">Please ensure you've provided a valid Web3Forms Access Key in Contact.jsx.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                
                {/* Web3Forms required fields */}
                <input type="hidden" name="access_key" value={process.env.REACT_APP_WEB3FORMS_KEY} />
                <input type="hidden" name="subject" value="Portfolio Contact: New Message" />
                <input type="checkbox" name="botcheck" style={{ display: 'none' }} />

                <div className="grid sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      placeholder=" "
                      className="block w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-transparent focus:ring-0 focus:border-indigoPrimary peer pt-4 pb-2 text-lg transition-colors"
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 top-0 text-lightGray/50 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigoPrimary"
                    >
                      Full Name
                    </label>
                  </div>

                  {/* Email */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      required
                      placeholder=" "
                      className="block w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-transparent focus:ring-0 focus:border-indigoPrimary peer pt-4 pb-2 text-lg transition-colors"
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 top-0 text-lightGray/50 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigoPrimary"
                    >
                      Email Address
                    </label>
                  </div>
                </div>

                {/* Subject Dropdown */}
                <div className="relative" ref={selectRef}>
                  <label className="block text-[12px] text-lightGray/35 mb-[6px] tracking-[0.04em]">Subject</label>
                  
                  <div className={`custom-select ${dropdownOpen ? 'open' : ''}`} id="subject-select">
                    <div className="select-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
                      <span className="select-value">{subjectValue.label}</span>
                      <svg className="select-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    <ul className="select-options">
                      {SUBJECT_OPTIONS.map((opt) => (
                        <li
                          key={opt.value}
                          className={`select-option ${subjectValue.value === opt.value ? 'selected' : ''}`}
                          data-value={opt.value}
                          onClick={() => {
                            setSubjectValue(opt);
                            setDropdownOpen(false);
                          }}
                        >
                          <span className="option-icon">{opt.icon}</span>
                          <span className="option-label">{opt.label}</span>
                          {subjectValue.value === opt.value && (
                            <svg className="ml-auto opacity-80" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </li>
                      ))}
                    </ul>
                    <input type="hidden" name="subject" id="subject-input" value={subjectValue.value} />
                  </div>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    name="message"
                    id="message"
                    required
                    rows="4"
                    placeholder=" "
                    className="block w-full bg-transparent border-0 border-b-2 border-white/20 text-white placeholder-transparent focus:ring-0 focus:border-indigoPrimary peer pt-4 pb-2 text-lg transition-colors resize-none"
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-0 text-lightGray/50 text-sm transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-sm peer-focus:text-indigoPrimary"
                  >
                    Your Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-indigoPrimary hover:bg-indigoPrimary/90 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.3)] outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span> Sending...
                    </span>
                  ) : (
                    <>Send Message <FaPaperPlane size={16} /></>
                  )}
                </button>

              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
