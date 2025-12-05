import { motion } from "framer-motion";
import { Map, Compass, Camera, Coffee } from "lucide-react";
import { useState, useRef } from "react";

const features = [
    {
        icon: Map,
        title: "Curated Itineraries",
        description: "Handpicked journeys designed to show you the real India, beyond the tourist traps.",
    },
    {
        icon: Compass,
        title: "Local Guides",
        description: "Connect with passionate locals who share their stories and hidden gems.",
    },
    {
        icon: Camera,
        title: "Photo Expeditions",
        description: "Specialized tours for photographers to capture the vibrant colors of India.",
    },
    {
        icon: Coffee,
        title: "Culinary Voyages",
        description: "Taste your way through India's diverse regional cuisines and street food.",
    },
];

const Features = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const width = scrollContainerRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
            </div>

            <div className="container px-4 mx-auto relative z-10">
                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-medium tracking-wider uppercase"
                    >
                        Features
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 text-4xl font-bold text-white mb-6"
                    >
                        Why Choose Unfold India?
                    </motion.h2>
                    <p className="text-xl text-muted-foreground">
                        We don't just plan trips; we craft unforgettable experiences that immerse you in the culture.
                    </p>
                </div>
                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto pb-6 -mx-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-8 sm:overflow-visible sm:pb-0 sm:mx-0 sm:px-0 scrollbar-hide"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 rounded-2xl group w-[calc(100%-2rem)] mx-4 flex-shrink-0 snap-center sm:w-auto sm:mx-0 sm:flex-shrink-1"
                        >
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-primary group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile Pagination Dots */}
                <div className="flex justify-center gap-2 mt-4 sm:hidden">
                    {features.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${index === activeIndex ? "bg-primary w-6" : "bg-white/20"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
