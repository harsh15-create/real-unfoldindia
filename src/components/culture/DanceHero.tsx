
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface DanceHeroProps {
    title: string;
    desktopImg: string; // URL
    mobileImg?: string; // URL
    altText: string;
    subtitle?: string;
    onBackClick?: () => void;
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
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Back Button */}
            <div className="absolute top-24 left-4 md:left-8 z-20">
                <Link to="/culture/dance-forms">
                    <Button variant="outline" className="text-white border-white/20 bg-black/20 hover:bg-black/40 backdrop-blur gap-2 rounded-full">
                        <ArrowLeft className="h-4 w-4" /> Back to Dance Forms
                    </Button>
                </Link>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10 flex flex-col justify-end h-full">
                <div className="container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {subtitle && (
                            <span className="inline-block py-1 px-3 mb-4 rounded-full bg-primary/80 backdrop-blur-sm text-white text-sm font-medium tracking-wide">
                                {subtitle}
                            </span>
                        )}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                            {title}
                        </h1>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};
