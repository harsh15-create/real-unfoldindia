
import React from 'react';
import { motion } from 'framer-motion';
import { Music, Mic2, Users, Move } from 'lucide-react';

interface DanceHeroProps {
    title: string;
    desktopImg: string; // URL
    mobileImg?: string; // URL - keeping prop for compatibility but might not use if Art doesn't
    altText: string;
    subtitle?: string;
    // Removed onBackClick as alignment with Art/Cuisine implies Page-level or no back button in Hero
}

export const DanceHero: React.FC<DanceHeroProps> = ({
    title,
    desktopImg,
    altText,
    subtitle
}) => {
    return (
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={desktopImg}
                    alt={altText}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0B0B15]" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 flex gap-4 text-primary/80"
                >
                    <Music className="h-8 w-8 text-orange-400" />
                    <Move className="h-8 w-8 text-orange-400" />
                    <Users className="h-8 w-8 text-orange-400" />
                    <Mic2 className="h-8 w-8 text-orange-400" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            </div>
        </div>
    );
};
