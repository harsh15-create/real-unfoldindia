import { motion } from "framer-motion";
import { ArrowLeft, Linkedin, Twitter, Instagram, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-16 font-sans">
            <div className="container px-4 md:px-6 max-w-6xl">
                <Button variant="ghost" className="mb-8 hover:bg-transparent pl-0 hover:text-primary transition-colors" asChild>
                    <Link to="/" className="flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Link>
                </Button>

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <span className="text-sm font-semibold uppercase tracking-wider text-terracotta mb-4 block">
                        About Us
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                        Engineering the Future of <span className="text-gradient">Travel</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                        Unfold India is built by a small team of engineers who believe India deserves a fast, intuitive, and reliable way to discover places. No shortcuts. No fluff. Only execution.
                    </p>
                </motion.div>

                {/* Company Background & Mission */}
                <div className="grid md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Company Background</h2>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            The platform combines modern frontend design, strong backend architecture, and custom APIs to help users explore cities easily.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            Even though the team is still in university, the project is run like a real startup with clear responsibilities, strict timelines, and a commitment to shipping high-quality features. Every component — frontend, backend, APIs, and data systems — is built completely in-house.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="bg-muted/30 p-8 rounded-2xl border border-border/50"
                    >
                        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                        <p className="text-lg font-medium leading-relaxed">
                            Build the most dependable and engaging city-discovery platform in India by combining engineering discipline with AI and accurate data.
                        </p>
                    </motion.div>
                </div>

                {/* Our Story */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-3xl font-bold mb-8">Our Story</h2>
                    <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                        <p className="mb-4">
                            Harsh came up with the initial concept to simplify how people explore India. Once the early prototype took shape, he was joined by Gireesh, who strengthened the backend and system foundation.
                        </p>
                        <p className="mb-4">
                            About six months later, Vedant joined, bringing data engineering, API work, and strategic direction.
                        </p>
                        <p>
                            All three are friends, all three are engineers, and all three share one belief — hard work compounds, and building something meaningful is worth more than settling for a routine 9-to-5. They work long hours not for hype, but because they want to build real products that solve real problems. Unfold India is not a college side project. It’s the first step of a long-term product journey.
                        </p>
                    </div>
                </motion.div>

                {/* Team Section */}
                <section>
                    <h2 className="text-3xl font-bold mb-12">The Team</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Harsh */}
                        <TeamMemberCard
                            name="Harsh"
                            role="Founder & CEO | Frontend Lead"
                            description="Originator of the idea. Leads UX, frontend engineering, and product vision."
                            education="B.Tech CSE, 2nd Year — Galgotias University"
                            delay={0.1}
                        />
                        {/* Gireesh */}
                        <TeamMemberCard
                            name="Gireesh"
                            role="Co-Founder & COO | Backend Lead"
                            description="Joined early to bring structure. Manages backend architecture, deployment, and operations."
                            education="B.Tech CSE, 2nd Year — Galgotias University"
                            delay={0.2}
                        />
                        {/* Vedant */}
                        <TeamMemberCard
                            name="Vedant"
                            role="CMO | API & Data Engineering"
                            description="Bridges tech + user needs. Responsible for APIs, data sourcing, and strategic growth."
                            education="B.Tech CSE, 1st Year — Galgotias University"
                            delay={0.3}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
};

const TeamMemberCard = ({ name, role, description, education, delay }: { name: string, role: string, description: string, education: string, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background p-6 hover:shadow-lg transition-all duration-300"
    >
        <div className="mb-4">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm font-medium text-terracotta mt-1">{role}</p>
        </div>
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {description}
        </p>
        <div className="text-xs text-muted-foreground border-t border-border/50 pt-4 mb-6">
            {education}
        </div>

        <div className="flex gap-3">
            <SocialLink icon={<Linkedin className="w-4 h-4" />} href="#" />
            <SocialLink icon={<Instagram className="w-4 h-4" />} href="#" />
            <SocialLink icon={<Twitter className="w-4 h-4" />} href="#" />
            <SocialLink icon={<Mail className="w-4 h-4" />} href="#" />
        </div>
    </motion.div>
);

const SocialLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
    <a
        href={href}
        className="p-2 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
    >
        {icon}
    </a>
);

export default AboutPage;
