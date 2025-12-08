
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2, Bot, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { FestivalHero } from '@/components/culture/FestivalHero';
import { getFestivalsMaster, FestivalCardData } from '@/lib/culture-api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CultureEvents } from '@/analytics/events';

export default function FestivalsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch data
    const { data, isLoading } = useQuery({
        queryKey: ['festivals-master'],
        queryFn: getFestivalsMaster,
    });

    useEffect(() => {
        CultureEvents.CULTURE_OPEN('festivals_master');
    }, []);

    // Filter logic
    const filteredFestivals = data?.cards.filter((festival: FestivalCardData) =>
        festival.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        festival.card_subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#0B0B15]">
                <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#0B0B15]">
            {/* Hero */}
            <FestivalHero
                image={data.hero_image}
                title={data.title}
                subtitle={data.intro_title}
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/chat', { state: { message: "Tell me about the classic Indian festivals and which one I should attend." } })}
                >
                    <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Talk to Kira about Festivals
                </Button>
            </FestivalHero>

            {/* Intro & Search */}
            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block - Matches Adventures Layout */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Sparkles className="w-12 h-12 mx-auto text-purple-500 mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">{data.intro_title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line font-light">
                        {data.intro_description.split('\n')[0]}
                    </p>
                </div>

                {/* Search & Filter - Matches Adventures "Choose Your Thrill" layout */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                            Choose Your Celebration
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search festivals (e.g., Holi, Lights...)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-purple-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Grid - Small Cards like Spiritual Journeys */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {filteredFestivals.map((festival) => (
                        <Link
                            key={festival.id}
                            to={`/culture/festivals/${festival.slug}`}
                            className="group relative h-[280px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30"
                        >
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B15]/20 to-[#0B0B15] z-10" />
                            <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                                <img
                                    src={festival.thumbnail}
                                    alt={festival.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                                />
                            </div>

                            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-xl font-bold mb-1 text-white group-hover:text-purple-400 transition-colors text-center">
                                        {festival.title}
                                    </h3>
                                    <p className="text-xs text-white/60 text-center line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        {festival.card_subtitle}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredFestivals.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No festivals found matching your search.</p>
                        <Button
                            variant="link"
                            className="text-purple-500 mt-2"
                            onClick={() => setSearchTerm("")}
                        >
                            Clear Filter
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
