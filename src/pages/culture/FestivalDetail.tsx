
import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Share2 } from 'lucide-react';
import { getFestival } from '@/lib/culture-api';
import { FestivalHero } from '@/components/culture/FestivalHero';
import { PlaceMiniCard } from '@/components/culture/PlaceMiniCard';
import { KeyRituals, PracticalInfoBlock, DatesCard, FAQSection } from '@/components/culture/FestivalDetailSections';
import { CultureEvents } from '@/analytics/events';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function FestivalDetail() {
    const { slug } = useParams<{ slug: string }>();

    const { data: festival, isLoading } = useQuery({
        queryKey: ['festival', slug],
        queryFn: () => getFestival(slug || ''),
        enabled: !!slug
    });

    useEffect(() => {
        if (slug) {
            CultureEvents.FESTIVAL_CLICK(slug);
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-[#0B0B15]">
                <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!festival) {
        return (
            <div className="h-screen bg-[#0B0B15] flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl mb-4">Festival not found</h2>
                <Link to="/culture/festivals" className="text-purple-400 hover:text-purple-300">Back to Festivals</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0B15]">
            <FestivalHero
                image={festival.hero_image}
                title={festival.title}
                subtitle={festival.short_description}
                height="h-[60vh] md:h-[70vh]"
            />

            {/* Navigation Bar */}
            <div className="sticky top-0 z-40 bg-[#0B0B15]/80 backdrop-blur-md border-b border-white/10">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/culture/festivals" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="h-4 w-4" /> Back to Festivals
                    </Link>
                    <div className="flex gap-2">
                        {festival.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-white/10 hover:bg-white/20 text-gray-300 border-none">
                                {tag}
                            </Badge>
                        ))}
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={() => CultureEvents.FESTIVAL_SHARE(festival.slug)}>
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-8">

                        {/* About */}
                        <div className="mb-12">
                            <h2 className="text-3xl font-serif text-white mb-6">About the Celebration</h2>
                            <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light">
                                {festival.long_description.split('\n').map((p, i) => (
                                    <p key={i} className="mb-4">{p}</p>
                                ))}
                            </div>
                            <div className="bg-purple-900/10 border-l-4 border-purple-500 p-6 mt-6 rounded-r-xl">
                                <h4 className="text-purple-400 font-bold mb-2 uppercase text-sm tracking-wider">Significance</h4>
                                <p className="text-white italic text-lg opacity-90">{festival.significance}</p>
                            </div>
                        </div>

                        {/* Rituals */}
                        <KeyRituals rituals={festival.key_rituals} />

                        {/* Top Places */}
                        <div className="mb-12">
                            <h3 className="text-2xl font-serif text-white mb-6">Where to Experience It</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                {festival.top_places.map((place) => (
                                    <PlaceMiniCard key={place.place_id} place={place} />
                                ))}
                            </div>
                        </div>

                        {/* Manual Implementation of Gallery Carousel if needed, but for now simple grid */}
                        {festival.gallery_images && festival.gallery_images.length > 0 && (
                            <div className="mb-12">
                                <h3 className="text-2xl font-serif text-white mb-6">Gallery</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {festival.gallery_images.map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded-xl overflow-hidden group">
                                            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <FAQSection faqs={festival.faqs} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <DatesCard calendar={festival.calendar} />
                        <PracticalInfoBlock info={festival.practical_info} />
                    </div>

                </div>
            </div>
        </div>
    );
}
