import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { getSpiritualMaster, SpiritualMaster } from "@/lib/spiritualApi";
import { useTranslation } from "react-i18next";

const SpiritualJourneys = () => {
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [searchQuery, setSearchQuery] = useState("");
    const [spiritualData, setSpiritualData] = useState<SpiritualMaster | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getSpiritualMaster(i18n.language).then((data) => {
            setSpiritualData(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [i18n.language]);

    const filteredCities = spiritualData?.cities.filter((city) =>
        city.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.short_description.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-primary">Loading Spiritual Journeys...</div>;
    if (!spiritualData) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground">Failed to load data</div>;

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
            <RoyalHero
                image="https://images.unsplash.com/photo-1591283281358-18e3845c43d2?q=80&w=2070&auto=format&fit=crop"
                title={spiritualData.intro_title || "Spiritual Journeys"}
                subtitle={spiritualData.subtitle || "Discover the sacred geography where divinity meets humanity"}
            >
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300"
                    onClick={() => navigate('/chat', { state: { message: "I want to know more about Spiritual Journeys in India." } })}
                >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Know about Spiritual Journey
                </Button>
            </RoyalHero>

            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Sparkles className="w-12 h-12 mx-auto text-primary mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">{spiritualData.intro_title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                        {spiritualData.intro_description}
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Sacred Destinations
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search for a city or experience..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-primary/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* City Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {filteredCities.map((city) => (
                        <Link
                            key={city.id}
                            to={`/spiritual-journeys/${city.slug}`}
                            className="group relative h-[320px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/40 to-[#1A1A2E] z-10" />
                            <div className="absolute inset-0 bg-gray-800 group-hover:scale-110 transition-transform duration-700">
                                <img
                                    src={city.thumbnail_image}
                                    alt={city.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>

                            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
                                        {city.title}
                                    </h3>
                                    <p className="text-sm text-white/70 line-clamp-3 mb-6 group-hover:text-white/90 transition-colors">
                                        {city.short_description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        Explore Journey <ArrowLeft className="w-4 h-4 rotate-180" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredCities.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-white/40 text-lg">No destinations found matching "{searchQuery}"</p>
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

export default SpiritualJourneys;
