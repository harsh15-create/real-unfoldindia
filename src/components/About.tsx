import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <section className="py-24 overflow-hidden bg-muted/30">
            <div className="container px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                            <img
                                src="/indian-culture-collage.jpg"
                                alt="Indian Culture Collage"
                                className="h-full w-full object-cover"
                            />
                        </div>
                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-terracotta/20 blur-2xl" />
                        <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-sage-green/20 blur-2xl" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <span className="text-sm font-semibold uppercase tracking-wider text-terracotta">
                            Our Story
                        </span>
                        <h2 className="mt-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                            Bridging the Gap Between You and the Real India
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground">
                            Unfold India was born from a passion to showcase the authentic, unfiltered beauty of our homeland. We believe travel is more than just sightseeing; it's about connection, understanding, and transformation.
                        </p>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Whether you're seeking spiritual solace in Varanasi, adventure in Ladakh, or relaxation in Kerala, we curate experiences that resonate with your soul.
                        </p>
                        <div className="mt-8">
                            <Button size="lg" className="bg-deep-green hover:bg-deep-green/90 text-white" asChild>
                                <Link to="/about">Read More About Us</Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
