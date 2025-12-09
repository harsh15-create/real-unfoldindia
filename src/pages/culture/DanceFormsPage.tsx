
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DanceMaster, getDanceMaster } from '@/lib/dance-api';
import { DanceHero } from '@/components/culture/DanceHero';
import { DanceCard } from '@/components/culture/DanceCard';
// import { CultureEvents } from '@/analytics/events'; // Assuming similar analytics exist or will be added
import { ArrowLeft, Search, Bot, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function DanceFormsPage() {
    const navigate = useNavigate();
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
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/chat', { state: { message: "Tell me about Indian classic dance forms and where to watch them." } })}
                >
                    <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Talk to Kira about Dance Forms
                </Button>
            </DanceHero>

            <div className="container mx-auto px-4 py-12">
                {/* Intro Text */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <Sparkles className="w-12 h-12 mx-auto text-orange-500 mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">{data.intro_title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line font-light">
                        {data.intro_description}
                    </p>
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
                            Discover Rhythm & Grace
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search dance forms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-orange-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Categories (Hidden for now as per data structure, or keep if needed but unstyled in previous code) */}
                {/* <div className="flex gap-2 mb-8 ..."> 
                      ... categories ...
                </div> */}

                {/* Grid */}
                {filteredCards.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
