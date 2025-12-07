
import React from 'react';
import { motion } from 'framer-motion';

interface RoyalHeroProps {
    image: string;
    title: string;
    subtitle?: string;
    height?: string;
}

const RoyalHero: React.FC<RoyalHeroProps> = ({
    image,
    title,
    subtitle,
    height = "h-[70vh]"
}) => {
    return (
        <div className={`relative w-full ${height} overflow-hidden`}>
            <div className="absolute inset-0 bg-black/40 z-10" />
            <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={image}
                alt={title}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white font-serif text-5xl md:text-7xl lg:text-8xl tracking-wide mb-4 drop-shadow-lg"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                >
                    {title}
                </motion.h1>
                {subtitle && (
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/90 text-lg md:text-2xl font-light tracking-wider max-w-2xl font-sans"
                    >
                        {subtitle}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default RoyalHero;
