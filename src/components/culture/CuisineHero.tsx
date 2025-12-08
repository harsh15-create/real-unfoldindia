
import { motion } from "framer-motion";
import { Utensils, ChefHat, Flame, Coffee } from "lucide-react";

interface CuisineHeroProps {
    title: string;
    subtitle: string;
    image: string;
    tags?: string[];
}

const CuisineHero = ({ title, subtitle, image, tags }: CuisineHeroProps) => {
    return (
        <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0B0B15]" />
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-center items-center text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-6 flex gap-4 text-orange-400"
                >
                    <Utensils className="h-8 w-8" />
                    <ChefHat className="h-8 w-8" />
                    <Flame className="h-8 w-8" />
                    <Coffee className="h-8 w-8" />
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
                    className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed mb-6"
                >
                    {subtitle}
                </motion.p>

                {tags && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-2 justify-center"
                    >
                        {tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-sm text-gray-100 border border-white/20">
                                {tag}
                            </span>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CuisineHero;
