
import React from 'react';
import { motion } from 'framer-motion';

interface DanceHeroProps {
    title: string;
    subtitle: string;
    desktopImg: string;
    altText: string;
    children?: React.ReactNode;
}

export const DanceHero: React.FC<DanceHeroProps> = ({
    title,
    subtitle,
    desktopImg,
    altText,
    children
}) => {
    return (
        <div className="relative h-[70vh] w-full overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={desktopImg}
                    alt={altText}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 mt-16">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-white font-serif text-5xl md:text-7xl mb-6 drop-shadow-lg"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white/90 text-xl font-light tracking-wide max-w-2xl"
                >
                    {subtitle}
                </motion.p>

                {children && (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </div>
    );
};
