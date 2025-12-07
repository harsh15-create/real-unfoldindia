import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Leaf, PawPrint, Mountain, Flower2, Feather, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import experienceData from "@/data/wildlife-safaris/experience-wildlife-safaris.json";

const WildlifeSafaris = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDestinations = experienceData.destinations.filter((dest) =>
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const nationalParks = filteredDestinations.filter(
        d => d.category === "National Park" || d.category === "Marine Park"
    );
    const birdSanctuaries = filteredDestinations.filter(
        d => d.category === "Bird Sanctuary"
    );
    const flowerValleys = filteredDestinations.filter(
        d => d.category === "Flower Valley"
    );

    const DestinationGrid = ({ items, title, icon: Icon, colorClass }: { items: typeof filteredDestinations, title: string, icon: any, colorClass: string }) => {
        if (items.length === 0) return null;

        return (
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-8">
                    <div className={`p-3 rounded-2xl ${colorClass} bg-opacity-20 backdrop-blur-md border border-white/10`}>
                        <Icon className={`w-8 h-8 ${colorClass.replace('bg-', 'text-')}`} />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">{title}</h2>
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent ml-4" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {items.map((dest) => (
                        <Link
                            key={dest.id}
                            to={`/wildlife-safaris/${dest.slug}`}
                            className="group relative h-[260px] overflow-hidden rounded-xl bg-[#0A2A1B] border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-900/40 hover:border-emerald-500/30"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F12]/10 to-[#051F12] z-10" />
                            <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                                <img
                                    src={dest.thumbnail_image}
                                    alt={dest.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>

                            <div className="absolute inset-0 z-20 p-4 flex flex-col justify-between">
                                <div className="flex justify-end">
                                    <span className="bg-black/40 backdrop-blur-md text-white/90 text-[10px] px-2 py-0.5 rounded-md border border-white/10">
                                        {dest.category}
                                    </span>
                                </div>

                                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="mb-1">
                                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                                            {dest.title}
                                        </h3>
                                        <p className="text-emerald-300/80 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                                            {dest.card_subtitle}
                                        </p>
                                    </div>

                                    <p className="text-xs text-white/70 line-clamp-2 mb-2 group-hover:text-white/90 transition-colors">
                                        {dest.short_description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        Explore Wild <ArrowLeft className="w-3 h-3 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
            <RoyalHero
                image={experienceData.hero_image}
                title={experienceData.intro_block.intro_title}
                subtitle={experienceData.layout.sections[0].description}
            />

            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Leaf className="w-12 h-12 mx-auto text-primary mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">India's Wilderness</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                        {experienceData.intro_block.intro_description}
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Explore Destinations
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search parks, sanctuaries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Categorized Sections */}
                <DestinationGrid
                    items={nationalParks}
                    title="National Parks & Marine Reserves"
                    icon={PawPrint}
                    colorClass="text-orange-400 bg-orange-400"
                />

                <DestinationGrid
                    items={birdSanctuaries}
                    title="Bird Sanctuaries"
                    icon={Feather}
                    colorClass="text-blue-400 bg-blue-400"
                />

                <DestinationGrid
                    items={flowerValleys}
                    title="Valleys & Gardens"
                    icon={Flower2}
                    colorClass="text-pink-400 bg-pink-400"
                />

                {filteredDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <div className="inline-block p-4 rounded-full bg-white/5 mb-4">
                            <PawPrint className="w-8 h-8 text-white/20" />
                        </div>
                        <p className="text-white/40 text-lg">No wild destinations found matching "{searchQuery}"</p>
                        <Button
                            variant="link"
                            className="text-emerald-400 mt-2"
                            onClick={() => setSearchQuery("")}
                        >
                            Clear Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WildlifeSafaris;
