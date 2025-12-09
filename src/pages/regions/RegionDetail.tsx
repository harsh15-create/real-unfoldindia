
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getRegion } from '@/lib/regionsApi';
import { RegionDetail } from '@/lib/types';
import RegionHighlights from '@/components/RegionHighlights';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import festivalsData from '@/data/culture-festivals.json';
import craftsData from '@/data/culture-art-and-craft.json';

// Helper to find slug
const findFestivalSlug = (name: string) => {
    // Try exact match, then includes check (case insensitive could be added but data seems consistent)
    const found = festivalsData.cards.find(c => c.title === name || c.title.includes(name) || name.includes(c.title));
    return found ? found.slug : null;
};

const findCraftSlug = (name: string) => {
    const found = craftsData.cards.find(c => c.title === name || c.title.includes(name) || name.includes(c.title));
    return found ? found.slug : null;
};

const RegionDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [region, setRegion] = useState<RegionDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegion = async () => {
            if (!slug) return;
            setLoading(true);
            const data = await getRegion(slug);
            setRegion(data);
            setLoading(false);
        };
        fetchRegion();
    }, [slug]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#0B0B15] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
            </div>
        );
    }

    if (!region) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0B0B15] text-white gap-4">
                <h1 className="text-2xl font-bold">Region Not Found</h1>
                <Button onClick={() => navigate('/explore')} variant="outline">Back to Explore</Button>
            </div>
        );
    }

    // SEO / Meta tags (simulated for SPA)
    // document.title = region.seo_title || region.title;

    return (
        <div className="min-h-screen bg-[#0B0B15] text-white font-sans">
            {/* Simple Header/Nav Back */}
            <div className="absolute top-24 left-6 z-50">
                <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 text-white transition-transform hover:scale-105"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="w-5 h-5" />
                </Button>
            </div>

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={region.hero_image}
                    alt={region.hero_image_alt || region.title}
                    className="w-full h-full object-cover"
                // Mocking optimized image loading priority
                // rel="preload" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0B0B15]" />
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16">
                    <div className="container mx-auto">
                        <span className="text-orange-400 font-medium tracking-widest uppercase mb-2 block text-sm md:text-base">{region.subtitle}</span>
                        <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6">{region.title}</h1>
                        <p className="max-w-2xl text-base md:text-xl text-gray-200 leading-relaxed drop-shadow-lg mb-6 md:mb-8">
                            {region.intro}
                        </p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <Link to="/chat" state={{ message: `I want to plan a trip to ${region.title} that covers its best experiences.` }}>
                                <Button
                                    size="lg"
                                    className="group relative overflow-hidden bg-white/10 hover:bg-white/20 text-white border-white/30 rounded-full px-6 py-4 md:px-8 md:py-6 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] w-full md:w-auto"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 text-base md:text-lg font-medium">
                                        <Bot className="w-5 h-5 md:w-6 md:h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                                        <span>Plan your {region.title} Trip with AI</span>
                                        <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
                                    </span>
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 py-8 md:py-12 space-y-12 md:space-y-24">

                {/* Highlights Section */}
                {region.highlights && region.highlights.length > 0 && (
                    <RegionHighlights highlights={region.highlights} regionSlug={region.slug} />
                )}

                {/* Best Time to Visit */}
                {region.best_time && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-white">Best Time to Visit</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <span className="text-orange-400 font-medium block mb-2">Peak Season</span>
                                <p className="text-xl font-semibold mb-2">{region.best_time.peak_season}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <span className="text-blue-400 font-medium block mb-2">Shoulder Season</span>
                                <p className="text-xl font-semibold mb-2">{region.best_time.shoulder_season}</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                <span className="text-gray-400 font-medium block mb-2">Off Season</span>
                                <p className="text-xl font-semibold mb-2">{region.best_time.off_season}</p>
                                <p className="text-sm text-gray-400 mt-2">{region.best_time.notes}</p>
                            </div>
                        </div>
                    </section>
                )}

                {/* Top Experiences */}
                {region.top_experiences && region.top_experiences.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-8 text-white">Top Experiences</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {region.top_experiences.map((exp) => (
                                <div key={exp.id} className="block group">
                                    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors h-full">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">{exp.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{exp.summary}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Top Cities */}
                {region.top_cities && region.top_cities.length > 0 && (
                    <section>
                        <h2 className="text-3xl font-bold mb-6 text-white">Must-Visit Destinations</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                            {region.top_cities.map((city) => {
                                const CityWrapper = ({ children }: { children: React.ReactNode }) => (
                                    city.city_id ? <Link to={`/guide/city/${city.city_id}`} className="contents">{children}</Link> : <>{children}</>
                                );

                                return (
                                    <CityWrapper key={city.city_id}>
                                        <div className="group relative rounded-xl overflow-hidden aspect-[4/3] hover:shadow-xl transition-all border border-white/5 cursor-pointer">
                                            {/* Just a placeholder image logic if thumbnail path isn't absolute/public. 
                                            In a real app, we'd resolve `city.thumbnail` properly. 
                                            Using a gradient fallback for now if image fails or isn't a full url. */}
                                            <div className="absolute inset-0 bg-gray-800" />
                                            {city.thumbnail && (
                                                <img
                                                    src={`/images/${city.thumbnail}`} // Assuming images are in public/images for now, or use absolute URLs
                                                    alt={city.title}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                                    onError={(e) => (e.currentTarget.style.display = 'none')}
                                                />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-4 flex flex-col justify-end">
                                                <h3 className="text-xl font-bold mb-1 text-white">{city.title}</h3>
                                                <p className="text-gray-300 text-xs mb-2 line-clamp-2">{city.summary}</p>
                                                <div className="text-[10px] text-orange-300/90 uppercase tracking-widest font-semibold">
                                                    {city.how_to_reach_snippet.split(':')[0]} Hub
                                                </div>
                                            </div>
                                        </div>
                                    </CityWrapper>
                                );
                            })}
                        </div>
                    </section>
                )}


                {/* Cultural Snapshot */}
                {region.cultural_snapshot && (
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-bold mb-8 text-white">Cultural Snapshot</h2>
                            <div className="space-y-6">
                                {region.cultural_snapshot.languages && (
                                    <div>
                                        <span className="text-gray-400 text-sm uppercase tracking-wider block mb-2">Languages</span>
                                        <div className="flex flex-wrap gap-2">
                                            {region.cultural_snapshot.languages.map(lang => (
                                                <span key={lang} className="px-3 py-1 rounded-full bg-white/10 text-sm">{lang}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {region.cultural_snapshot.major_festivals && (
                                    <div>
                                        <span className="text-gray-400 text-sm uppercase tracking-wider block mb-2">Major Festivals</span>
                                        <div className="flex flex-wrap gap-2">
                                            {region.cultural_snapshot.major_festivals.map(fest => {
                                                const slug = findFestivalSlug(fest);
                                                const content = <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-500/30 text-sm hover:bg-pink-500/30 transition-colors">{fest}</span>;
                                                return slug ? (
                                                    <Link key={fest} to={`/culture/festivals/${slug}`}>
                                                        {content}
                                                    </Link>
                                                ) : (
                                                    <React.Fragment key={fest}>{content}</React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                                {region.cultural_snapshot.popular_crafts && (
                                    <div>
                                        <span className="text-gray-400 text-sm uppercase tracking-wider block mb-2">Handicrafts</span>
                                        <div className="flex flex-wrap gap-2">
                                            {region.cultural_snapshot.popular_crafts.map(craft => {
                                                const slug = findCraftSlug(craft);
                                                const content = <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-500/30 text-sm hover:bg-purple-500/30 transition-colors">{craft}</span>;
                                                return slug ? (
                                                    <Link key={craft} to={`/culture/art-and-craft/${slug}`}>
                                                        {content}
                                                    </Link>
                                                ) : (
                                                    <React.Fragment key={craft}>{content}</React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Cuisine Highlights Side-car */}
                        {region.cuisine_highlights && (
                            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                <h3 className="text-2xl font-bold mb-6 text-orange-400">Flavors of the Region</h3>
                                <ul className="space-y-4">
                                    {region.cuisine_highlights.map((dish, idx) => (
                                        <li key={idx} className="flex justify-between items-center border-b border-white/5 pb-3last:border-0 last:pb-0">
                                            <span className="font-medium text-lg">{dish.name}</span>
                                            <span className="text-gray-400 text-sm italic">{dish.note}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}


                {/* Travel Tips & Logistics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 flex flex-col h-full">
                        <h2 className="text-2xl font-bold mb-6 text-orange-400">Travel Tips</h2>
                        <ul className="space-y-4">
                            {region.travel_tips?.map((tip, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                                    {tip}
                                </li>
                            ))}
                        </ul>
                        <div className="pt-6 mt-auto">
                            <Link to="/guide">
                                <Button variant="outline" className="w-full border-orange-500/30 hover:bg-orange-500/10 text-orange-300 hover:text-orange-200">
                                    Explore Travel Guides
                                </Button>
                            </Link>
                        </div>
                    </section>

                    {region.logistics && (
                        <section className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10 flex flex-col h-full">
                            <h2 className="text-2xl font-bold mb-6 text-blue-400">Logistics</h2>
                            <div className="space-y-6">
                                <div>
                                    <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Major Hubs</span>
                                    <p className="text-gray-200">Airports: {region.logistics.major_airports?.join(', ')}</p>
                                    <p className="text-gray-200">Rail: {region.logistics.rail_hubs?.join(', ')}</p>
                                </div>
                                <div>
                                    <span className="block text-sm text-gray-400 uppercase tracking-widest mb-1">Getting Around</span>
                                    <p className="text-gray-200">{region.logistics.typical_internal_transport}</p>
                                </div>


                                <div className="pt-2 mt-auto">
                                    <Link to="/route">
                                        <Button variant="outline" className="w-full border-blue-500/30 hover:bg-blue-500/10 text-blue-300 hover:text-blue-200">
                                            View Routes & Maps
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </section>
                    )}
                </div>

            </div>
        </div>
    );
};

export default RegionDetailPage;
