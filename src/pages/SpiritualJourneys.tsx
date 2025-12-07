import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import experienceData from "@/data/spiritual-journeys/experience-spiritual-journeys.json";

const SpiritualJourneys = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCities = experienceData.cities.filter((city) =>
        city.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.short_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white selection:bg-primary/30">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/60 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1591283281358-18e3845c43d2?q=80&w=2070&auto=format&fit=crop"
                        alt="Spiritual India"
                        className="w-full h-full object-cover animate-fade-in"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-white/90">Soul of India</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 font-display">
                        {experienceData.intro_block.intro_title}
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        Discover the sacred geography where divinity meets humanity.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-20 relative z-30">
                {/* Intro Block */}
                <div className="glass rounded-3xl p-8 md:p-12 mb-16 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-4 text-gradient">The Spiritual Tapestry</h2>
                            <div className="h-1 w-20 bg-primary rounded-full mx-auto md:mx-0" />
                        </div>
                        <p className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
                            {experienceData.intro_block.intro_paragraph}
                        </p>
                    </div>
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
