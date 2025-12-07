import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, MapPin, Mountain, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import treksData from "@/data/himalayan-treks/himalayan-treks.json";

const HimalayanTreks = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredTreks = treksData.treks.filter((trek) =>
        trek.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trek.about.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white selection:bg-primary/30">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/60 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?q=80&w=2070&auto=format&fit=crop"
                        alt="Himalayan Treks"
                        className="w-full h-full object-cover animate-fade-in"
                    />
                </div>

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fade-in-up">
                        <Mountain className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-white/90">{treksData.metadata.subtitle}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight animate-fade-in-up delay-100 font-display">
                        Himalayan Treks
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 mb-8">
                        Journey through the roof of the world. From lush meadows to frozen summits, discover trails that challenge the body and heal the soul.
                    </p>

                    <div className="animate-fade-in-up delay-300">
                        <Button
                            size="lg"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
                            asChild
                        >
                            <Link to="/chat">
                                <Bot className="w-5 h-5 mr-2" />
                                Ask Kira to Plan
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-20 relative z-30">
                {/* Intro Block */}
                <div className="glass rounded-3xl p-8 md:p-12 mb-16 max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
                        <div className="text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-4 text-gradient">The Alpine Call</h2>
                            <div className="h-1 w-20 bg-primary rounded-full mx-auto md:mx-0" />
                        </div>
                        <p className="text-white/70 leading-relaxed text-lg whitespace-pre-line">
                            The Himalayas are more than just a mountain range; they are a presence. Rising abruptly from the plains, they offer a sanctuary of silence, snow, and spirit.

                            Whether you are a beginner looking for your first snow trek or an expert seeking the challenge of a high pass, our curated list covers the most unforgettable trails. Walk through rhododendron forests, camp by frozen lakes, and stand atop peaks that touch the sky.
                        </p>
                    </div>
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
