
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DanceMaster, getDanceMaster } from '@/lib/dance-api';
import { DanceHero } from '@/components/culture/DanceHero';
import { DanceCard } from '@/components/culture/DanceCard';
// import { CultureEvents } from '@/analytics/events'; // Assuming similar analytics exist or will be added
import { ArrowLeft, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DanceFormsPage() {
    const [data, setData] = useState<DanceMaster | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    // Dance API data structure doesn't seem to have explicit categories array in Master interface, 
    // strictly speaking based on `dance-api.ts`. We will stick to Search for now or add "All" category button visually to match layout.
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
        const load = async () => {
            const res = await getDanceMaster();
            setData(res);
            setLoading(false);
            // CultureEvents.DANCE_OPEN("listing");
        };
        load();
    }, []);

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-[#0B0B15] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    const filteredCards = data.cards.filter(c =>
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.short_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.card_subtitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0B0B15] text-white">
            <div className="fixed top-6 left-6 z-50">
                <Link to="/explore">
                    <Button variant="outline" size="icon" className="rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <DanceHero
                title={data.title}
                subtitle="Indian Culture"
                desktopImg={data.hero_image}
                altText={data.title}
            />

            <div className="container mx-auto px-4 py-12">
                {/* Intro Text */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-2xl font-bold text-white mb-4">{data.intro_title}</h2>
                    <p className="text-gray-300 leading-relaxed text-xl whitespace-pre-line">
                        {data.intro_description}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12 sticky top-4 z-40 bg-[#0B0B15]/80 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-2xl">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto scrollbar-hide">
                        <Button
                            variant={activeCategory === "all" ? "default" : "outline"}
                            onClick={() => setActiveCategory("all")}
                            className={`rounded-full ${activeCategory === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : "border-white/10 text-gray-400 hover:text-white hover:bg-white/5"}`}
                        >
                            All
                        </Button>
                        {/* If we had categories in data, map them here. For now, just 'All' or hardcoded types if known */}
                    </div>

                    <div className="relative w-full md:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search dance forms..."
                            className="bg-white/5 border-white/10 pl-9 text-white placeholder:text-gray-500 focus:border-orange-500/50 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Grid */}
                {filteredCards.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCards.map((card, idx) => (
                            <DanceCard key={card.id} data={card} index={idx} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-gray-400 text-lg">No dance forms found matching "{searchQuery}"</p>
                        <Button variant="link" onClick={() => setSearchQuery("")} className="text-orange-400">
                            Clear Search
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
