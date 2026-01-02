import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
    return (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-24 md:py-0">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10 animate-pulse" />

            <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center md:text-left z-10"
                >
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-blue-500 font-medium mb-4"
                    >
                        Hey, I am Gurpreet
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
                    >
                        Building the future of <br />
                        <span className="text-gradient">
                            <TypeAnimation
                                sequence={[
                                    'Web',
                                    2000,
                                    'Mobile',
                                    2000,
                                    'UI/UX',
                                    2000
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto md:mx-0 text-lg mb-10"
                    >
                        I craft seamless mobile and web experiences, transforming innovative ideas into dynamic applications. With a passion for both design and technology, I specialize in creating user-centric solutions that elevate digital interactions and drive success. Let's build something amazing together!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex justify-center md:justify-start space-x-4"
                    >
                        <a href="#projects" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-lg shadow-blue-600/30">
                            View Work
                        </a>
                        <a href="#contact" className="px-8 py-3 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full font-medium transition-all">
                            Contact Me
                        </a>
                    </motion.div>
                </motion.div>

                {/* Profile Image with Creative Cutout */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative flex justify-center items-center"
                >
                    <div className="relative w-80 h-80 md:w-96 md:h-96">
                        {/* Abstract blobs behind */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] animate-blob" />
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-blob animation-delay-2000" />

                        {/* Image Container with organic shape */}
                        <div className="relative w-full h-full rounded-[60%_40%_30%_70%/60%_30%_70%_40%] overflow-hidden border-4 border-white/20 shadow-2xl z-10 glass">
                            <img
                                src="/profile.png"
                                alt="Profile"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
