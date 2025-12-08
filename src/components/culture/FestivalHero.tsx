import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FestivalHeroProps {
    image: string;
    title: string;
    subtitle?: string;
    height?: string;
    children?: ReactNode;
}

export function FestivalHero({ image, title, subtitle, height = "h-[70vh]", children }: FestivalHeroProps) {
    return (
        <div className={`relative w-full ${height} overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black z-10" />
            <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={image}
                alt={title}
                loading="eager"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight mb-4 drop-shadow-2xl"
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/90 text-lg md:text-2xl font-light tracking-wide max-w-2xl font-sans"
                    >
                        {subtitle}
                    </motion.p>
                )}
                {children && (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-8"
                    >
                        {children}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
