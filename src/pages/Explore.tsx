import { useState } from "react";
import { Search, Sparkles, Compass, Palette, BookOpen, Shield, MapPin, Coins } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { CarouselSection } from "@/components/CarouselSection";

const Explore = () => {
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

    const handleSearch = () => {
        setIsNavigating(true);
        setTimeout(() => {
            navigate("/chat");
        }, 800);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const prompts = [
        "Get a budget itinerary for a student trip to Goa",
        "Find hidden gems in Delhi for photography",
        "Safe solo travel route for Kerala",
        "Best street food spots in Mumbai",
    ];

    const regions = [
        { name: "North India", image: "https://images.unsplash.com/photo-1598324789736-4861f89564a0?q=80&w=1000&auto=format&fit=crop", desc: "Mountains & Heritage" },
        { name: "South India", image: "https://images.unsplash.com/photo-1621836166580-0a775369668d?q=80&w=1000&auto=format&fit=crop", desc: "Temples & Backwaters" },
        { name: "East India", image: "https://images.unsplash.com/photo-1571545763666-3d604b719468?q=80&w=1000&auto=format&fit=crop", desc: "Culture & Nature" },
        { name: "West India", image: "https://images.unsplash.com/photo-1570104247406-5bcc52266a3a?q=80&w=1000&auto=format&fit=crop", desc: "Deserts & Beaches" },
    ];

    const experiences = [
        { name: "Spiritual Journeys", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop", desc: "Varanasi, Rishikesh & more", link: "/spiritual-journeys" },
        { name: "Wildlife Safaris", image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?q=80&w=1000&auto=format&fit=crop", desc: "Tigers of Ranthambore", link: "/wildlife-safaris" },
        { name: "Himalayan Treks", image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=1000&auto=format&fit=crop", desc: "Adventure in the peaks", link: "/himalayan-treks" },
        { name: "Royal Luxury", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000&auto=format&fit=crop", desc: "Palaces of Rajasthan", link: "/experiences/royal-luxury" },
        { name: "Adventures", image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?q=80&w=1000&auto=format&fit=crop", desc: "Rafting, Paragliding & more", link: "/experiences/adventures" },
    ];

    const culture = [
        { name: "Festivals", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1000&auto=format&fit=crop", desc: "Colors of India", link: "/culture/festivals" },
        { name: "Art & Craft", image: "https://images.unsplash.com/photo-1460500063983-994d4c27756c?q=80&w=1000&auto=format&fit=crop", desc: "Handicrafts & Textiles" },
        { name: "Dance Forms", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop", desc: "Classical Traditions" },
        { name: "Cuisine", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1000&auto=format&fit=crop", desc: "Flavors of the Land" },
    ];
    const guides = [
        { name: "Visa & Entry", icon: BookOpen, desc: "Everything you need to know about Indian visas.", link: "/guide#visa" },
        { name: "Safety Tips", icon: Shield, desc: "Essential safety advice for solo and group travelers.", link: "/guide#safety" },
        { name: "Cities", icon: MapPin, desc: "Guides for the top 30 most traveled cities.", link: "/guide#cities" },
        { name: "Currency & Costs", icon: Coins, desc: "Check live rates and travel cost tips.", link: "/guide#currency" },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-3xl" />
            </div>

            <div className="container mx-auto relative z-10">
                {/* AI Search Section contents */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <motion.div
                        animate={isNavigating ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    >
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold mb-6"
                        >
                            Where will you <span className="text-gradient">Unfold</span> next?
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-muted-foreground mb-12"
                        >
                            Ask our AI to plan your perfect Indian voyage.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="relative max-w-2xl mx-auto"
                        animate={isNavigating ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Ask anything... (e.g., 'Plan a 3-day trip to Jaipur')"
                                className="pl-12 h-14 text-lg rounded-2xl shadow-lg border-primary/20 focus-visible:ring-primary/50 bg-card/50 backdrop-blur-sm"
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                onKeyDown={handleKeyDown}
                            />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2">
                                <Button
                                    size="sm"
                                    className="rounded-xl bg-primary/10 text-primary hover:bg-primary/20"
                                    onClick={handleSearch}
                                >
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Generate
                                </Button>
                            </div>
                        </div>

                        <AnimatePresence>
                            {isSearchFocused && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-20"
                                >
                                    <div className="p-2">
                                        <p className="text-xs font-medium text-muted-foreground px-3 py-2">Try these prompts:</p>
                                        {prompts.map((prompt, index) => (
                                            <button
                                                key={index}
                                                className="w-full text-left px-3 py-3 text-sm hover:bg-muted rounded-xl transition-colors flex items-center gap-3"
                                                onClick={() => handleSearch()}
                                            >
                                                <Sparkles className="h-3 w-3 text-primary" />
                                                {prompt}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Content Sections Wrapper for staggered exit */}
                <motion.div
                    animate={isNavigating ? { opacity: 0, y: 100 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
                >
                    {/* Regions Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-8">Explore <span className="text-primary">Regions</span></h2>
                        <CarouselSection
                            items={regions}
                            renderItem={(region, index) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer h-full"
                                >
                                    <img
                                        src={region.image}
                                        alt={region.name}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1">{region.name}</h3>
                                        <p className="text-white/80 text-sm">{region.desc}</p>
                                    </div>
                                </motion.div>
                            )}
                        />
                    </div>

                    {/* Guides Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-8">Travel <span className="text-primary">Guides</span></h2>
                        <CarouselSection
                            items={guides}
                            renderItem={(guide, index) => (
                                <Link to={guide.link} className="block h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className="glass-card p-6 rounded-2xl cursor-pointer hover:bg-white/5 transition-colors h-full"
                                    >
                                        <div className="bg-primary/20 p-3 rounded-xl w-12 h-12 flex items-center justify-center mb-4 text-primary">
                                            <guide.icon className="h-6 w-6" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{guide.name}</h3>
                                        <p className="text-muted-foreground text-sm">{guide.desc}</p>
                                    </motion.div>
                                </Link>
                            )}
                        />
                    </div>

                    {/* Experiences Section */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-8">Unforgettable <span className="text-primary">Experiences</span></h2>
                        <CarouselSection
                            items={experiences}
                            renderItem={(exp, index) => {
                                const CardContent = (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer h-full"
                                    >
                                        <img
                                            src={exp.image}
                                            alt={exp.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h3 className="text-xl font-bold text-white mb-1">{exp.name}</h3>
                                            <p className="text-white/80 text-sm">{exp.desc}</p>
                                        </div>
                                    </motion.div>
                                );

                                return exp.link ? (
                                    <Link to={exp.link} className="block h-full">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    CardContent
                                );
                            }}
                        />
                    </div>

                    {/* Culture Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold mb-8">Indian <span className="text-primary">Culture</span></h2>
                        <CarouselSection
                            items={culture}
                            renderItem={(item, index) => {
                                const CardContent = (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer h-full"
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                        <div className="absolute bottom-0 left-0 p-6">
                                            <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                                            <p className="text-white/80 text-sm">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                );

                                return (item as any).link ? (
                                    <Link to={(item as any).link} className="block h-full">
                                        {CardContent}
                                    </Link>
                                ) : (
                                    CardContent
                                );
                            }}
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Explore;
