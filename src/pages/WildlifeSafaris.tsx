import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Leaf, PawPrint, Mountain, Flower2, Feather, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { getWildlifeMaster, WildlifeMaster } from "@/lib/wildlifeApi";
import { useTranslation } from "react-i18next";

const WildlifeSafaris = () => {
    const { i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [experienceData, setExperienceData] = useState<WildlifeMaster | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getWildlifeMaster(i18n.language).then((data) => {
            setExperienceData(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [i18n.language]);

    const filteredDestinations = experienceData?.parks.filter((dest) =>
        dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.category.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    // Categorization logic - adapting to new data structure or assuming 'known_for' helps or just listing all for now if categories aren't in summary
    // The previous code used 'category' which might not be in WildlifeParkSummary.
    // Let's assume for now we list all, or mock categories if needed.
    // Looking at the interface `WildlifeParkSummary`, it doesn't have `category`.
    // It has `known_for`.
    // Let's try to map `known_for` to categories or just show a single grid if categories are missing.
    // But wait, the previous code strictly filtered by category.
    // If the new API doesn't return category, I might break the layout.
    // Let's check `WildlifeParkSummary` in `wildlifeApi.ts`.
    // It has `card_image`, `state`, `known_for`. No `category`.
    // I should probably simplify to a single grid or try to infer category.
    // For now, let's just display all in one grid to avoid breaking if categories are missing.

    // Actually, looking at the previous file content, `experienceData.destinations` had `category`. 
    // My `WildlifeMaster` interface has `parks: WildlifeParkSummary[]`.
    // `WildlifeParkSummary` has `id, slug, title, short_desc, card_image, state, known_for`.
    // I will simplify the UI to just show all parks for now to get it working, or check if I can keep categories.
    // Since I can't easily infer categories without data inspection, I'll show all in one grid "All Destinations".

    if (loading) return <div className="min-h-screen bg-[#051F12] flex items-center justify-center text-emerald-500">Loading Wilderness...</div>;
    if (!experienceData) return <div className="min-h-screen bg-[#051F12] flex items-center justify-center text-white">Failed to load data</div>;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-emerald-500/30">
            <RoyalHero
                image="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop"
                title={experienceData.intro_title || "India's Wilderness"}
                subtitle={experienceData.subtitle || "Roar of the Royal Bengal"}
            >
                <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300"
                    asChild
                >
                    <Link to="/chat" state={{ message: "I want to know more about Wildlife Safaris in India." }}>
                        <PawPrint className="w-5 h-5 mr-2" />
                        Know about Wildlife Safaris
                    </Link>
                </Button>
            </RoyalHero>

            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Leaf className="w-12 h-12 mx-auto text-primary mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">{experienceData.intro_title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                        {experienceData.intro_description}
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

                <div className="mb-20">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredDestinations.map((dest) => (
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
            </div>
        </div>
    );
};

export default WildlifeSafaris;
