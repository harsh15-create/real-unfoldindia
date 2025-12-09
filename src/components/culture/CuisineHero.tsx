
import { motion } from "framer-motion";
import { Utensils, ChefHat, Flame, Coffee } from "lucide-react";

interface CuisineHeroProps {
    title: string;
    subtitle: string;
    image: string;
    tags?: string[];
    children?: React.ReactNode;
}

const CuisineHero = ({ title, subtitle, image, tags, children }: CuisineHeroProps) => {
    return (
        <div className="relative h-[70vh] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={image}
                    alt={title}
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
                    className="text-white/90 text-xl font-light tracking-wide max-w-2xl text-shadow-md mb-6"
                >
                    {subtitle}
                </motion.p>

                {tags && (
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-wrap gap-2 justify-center"
                    >
                        {tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-gray-100 border border-white/20">
                                {tag}
                            </span>
                        ))}
                    </motion.div>
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
};

export default CuisineHero;
