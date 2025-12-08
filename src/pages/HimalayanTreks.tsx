import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Mountain, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { getTreksMaster, TrekMaster } from "@/lib/treksApi";
import { useTranslation } from "react-i18next";

const HimalayanTreks = () => {
    const { i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [treksData, setTreksData] = useState<TrekMaster | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTreksMaster(i18n.language).then((data: TrekMaster) => {
            setTreksData(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [i18n.language]);

    const filteredTreks = treksData?.treks.filter((trek) =>
        trek.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trek.about.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading Treks...</div>;
    if (!treksData) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Failed to load treks</div>;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <RoyalHero
                image="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2070&auto=format&fit=crop"
                title={"Himalayan Treks"}
                subtitle={treksData.metadata?.subtitle || "Journey through the roof of the world"}
            />

            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Mountain className="w-12 h-12 mx-auto text-primary mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">{"The Alpine Call"}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light mb-8">
                        {"Discover the majestic peaks, hidden valleys, and spiritual serenity of the Himalayas. Our curated treks offer a blend of adventure, culture, and breathtaking landscapes."}
                    </p>

                    <Button
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300"
                        asChild
                    >
                        <Link to="/chat">
                            <Bot className="w-5 h-5 mr-2" />
                            Ask Kira to Plan
                        </Link>
                    </Button>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Available Treks
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search for a trek..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Trek Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredTreks.map((trek) => (
                        <Link
                            key={trek.id}
                            to={`/himalayan-treks/${trek.slug}`}
                            className="group relative h-[380px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/40 to-[#1A1A2E] z-10" />
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700">
                                <img
                                    src={trek.cover_image}
                                    alt={trek.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>

                            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20">
                                            {trek.difficulty}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/10 text-white/80 border border-white/10">
                                            {trek.duration.split('/')[0]}
                                        </span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-primary transition-colors leading-tight">
                                        {trek.title}
                                    </h3>
                                    <p className="text-xs text-secondary/80 mb-2 font-medium">
                                        {trek.region}
                                    </p>
                                    <p className="text-sm text-white/70 line-clamp-3 mb-6 group-hover:text-white/90 transition-colors">
                                        {trek.about}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        View Itinerary <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredTreks.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg">No treks found matching "{searchQuery}"</p>
                        <Button
                            variant="link"
                            className="text-primary mt-2"
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

export default HimalayanTreks;
