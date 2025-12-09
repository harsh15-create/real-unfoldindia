
import { motion } from "framer-motion";

interface ArtHeroProps {
    title: string;
    subtitle?: string;
    image: string;
    children?: React.ReactNode;
}

const ArtHero = ({ title, subtitle, image, children }: ArtHeroProps) => {
    return (
        <div className="relative h-[70vh] w-full overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
            >
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6 mt-16">
                <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white font-serif text-5xl md:text-7xl mb-6 drop-shadow-lg max-w-4xl"
                >
                    {title}
                </motion.h1>

                {subtitle && (
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/90 text-xl font-light tracking-wide max-w-2xl text-shadow-md"
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
};

export default ArtHero;
