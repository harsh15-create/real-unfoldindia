
import React, { useEffect, useState } from 'react';
import { DanceMaster, getDanceMaster } from '@/lib/dance-api';
import { DanceHero } from '@/components/culture/DanceHero';
import { DanceCard } from '@/components/culture/DanceCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DanceFormsPage() {
    const [data, setData] = useState<DanceMaster | null>(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        const load = async () => {
            const res = await getDanceMaster();
            setData(res);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    if (!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Error loading data</div>;

    const filteredCards = data.cards.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.short_description.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <DanceHero
                title={data.title}
                subtitle="Indian Culture"
                desktopImg={data.hero_image}
                altText={data.title}
            />

            <div className="container mx-auto px-4 -mt-20 relative z-20">
                {/* Intro Card */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 mb-16 shadow-2xl">
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">{data.intro_title}</h2>
                    <p className="text-gray-300 text-lg leading-relaxed text-center max-w-4xl mx-auto">
                        {data.intro_description}
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-12 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search dance forms..."
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-full"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* Placeholder for future detailed filters */}
                    <div className="flex gap-2">
                        <Button variant="outline" className="rounded-full border-white/10 text-gray-300 hover:text-white hover:bg-white/10">
                            <Filter className="mr-2 h-4 w-4" /> Filters
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredCards.map((card, idx) => (
                        <DanceCard key={card.id} data={card} index={idx} />
                    ))}
                </div>

                {filteredCards.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                        No dance forms found matching "{search}"
                    </div>
                )}
            </div>
        </div>
    );
}
