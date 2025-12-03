import { motion } from "framer-motion";
import { Map, Compass, Camera, Coffee } from "lucide-react";

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
    return (
        <section className="py-24 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                        Why Choose <span className="text-primary">Unfold India</span>?
                    </h2>
                    <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                        We don't just plan trips; we craft unforgettable experiences that immerse you in the culture.
                    </p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="glass-card p-8 rounded-2xl group"
                        >
                            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-primary group-hover:scale-110 transition-transform duration-300">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
