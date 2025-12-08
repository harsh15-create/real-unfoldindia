
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2 } from 'lucide-react';
import { FestivalHero } from '@/components/culture/FestivalHero';
import { FestivalCard } from '@/components/culture/FestivalCard';
import { getFestivalsMaster, FestivalCardData } from '@/lib/culture-api';
import { Input } from '@/components/ui/input';
import { CultureEvents } from '@/analytics/events';

export default function FestivalsPage() {
    const [searchTerm, setSearchTerm] = useState('');

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
            />

            {/* Intro & Search */}
            <div className="container mx-auto px-4 -mt-20 relative z-30">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
                    <div className="max-w-3xl mx-auto text-center mb-8">
                        <p className="text-gray-300 leading-relaxed text-lg">
                            {data.intro_description.split('\n')[0]}
                        </p>
                    </div>

                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search festivals (e.g., Holi, Diwali, Lights...)"
                            className="pl-12 bg-black/40 border-white/10 text-white h-12 focus:border-purple-500 transition-colors rounded-xl"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFestivals.map((festival) => (
                        <FestivalCard key={festival.id} festival={festival} />
                    ))}
                </div>

                {filteredFestivals.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl">No festivals found matching your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
