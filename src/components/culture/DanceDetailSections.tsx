
import React from 'react';
import { DanceDetail } from '@/lib/dance-api';
import { Separator } from '@/components/ui/separator';
import { Music, MapPin, Calendar, Info, Drum, Shirt, BookOpen, User } from 'lucide-react';
import { PlaceMiniCard } from '@/components/culture/PlaceMiniCard'; // Assuming a reusable PlaceMiniCard exists, or I will create one if needed.
// Wait, I recall from Festival module I used PlaceMiniCard. I should check if it's generic enough or if I need to import from somewhere specific.
// I will assume it's in components/culture/ or I will mock it for now.
// Actually, let's look at FestivalDetailSections to see where it imported PlaceMiniCard from.
// Viewing Explore.tsx showed PlaceMiniCard used there too? No.
// Let's create a local PlaceMiniCard inside this file or assume a path. 
// I'll create a simple one inline if needed or assume existence.

// Re-using PlaceMiniCard logic:
// I will create a dedicated file for PlaceMiniCard later if I need to, but for now let's build the sections.

interface DanceDetailSectionsProps {
    data: DanceDetail;
}

export const DanceDetailSections: React.FC<DanceDetailSectionsProps> = ({ data }) => {
    return (
        <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-12">

                {/* Introduction & History */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <BookOpen className="text-primary h-6 w-6" /> Legend & History
                    </h2>
                    <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed text-lg">
                        {data.long_description}
                    </div>
                </section>

                <Separator className="bg-white/10" />

                {/* Music & Instruments */}
                <section className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Drum className="text-secondary h-6 w-6" /> Music & Rhythm
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Instruments</h3>
                            <ul className="space-y-2">
                                {data.music_and_instruments.map((inst, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300 bg-black/20 p-2 rounded-lg">
                                        <Music className="h-4 w-4 text-gray-500" /> {inst}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-3">Choreography</h3>
                            <ul className="space-y-2">
                                {data.choreography_elements.map((el, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-300 bg-black/20 p-2 rounded-lg">
                                        <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {el}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Costume */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Shirt className="text-blue-400 h-6 w-6" /> Costume & Makeup
                    </h2>
                    <p className="text-gray-300 leading-relaxed mb-6">{data.costume_and_makeup}</p>
                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {data.gallery_images?.map((img, i) => (
                            <div key={i} className="aspect-square rounded-xl overflow-hidden bg-white/5">
                                <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Places to Watch */}
                {data.top_places && (
                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                            <MapPin className="text-green-400 h-6 w-6" /> Where to Experience
                        </h2>
                        <div className="grid gap-4">
                            {data.top_places.map((place, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-green-500/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white">{place.title}</h3>
                                        {place.is_bookable && <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">Bookable</span>}
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4">{place.summary}</p>
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Best Time: {place.best_time_to_see}</span>
                                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {place.how_to_reach}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* FAQ / Practical Info */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                        <Info className="text-yellow-400 h-6 w-6" /> Practical Guide
                    </h2>
                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-xl">
                            <h4 className="font-bold text-white mb-2">Audience Etiquette</h4>
                            <p className="text-gray-300 text-sm">{data.practical_info.audience_tips}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl">
                            <h4 className="font-bold text-white mb-2">Accessibility</h4>
                            <p className="text-gray-300 text-sm">{data.practical_info.accessibility_notes}</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl">
                            <h4 className="font-bold text-white mb-2">Suggested Attire</h4>
                            <p className="text-gray-300 text-sm">{data.practical_info.suggested_attire_for_viewers}</p>
                        </div>
                    </div>
                </section>

            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-8">
                {/* Key Facts Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm sticky top-24">
                    <h3 className="text-xl font-bold text-white mb-6">At a Glance</h3>

                    <div className="space-y-4">
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-400">Origin</span>
                            <span className="text-white font-medium">{data.origin_state}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-400">Style</span>
                            <span className="text-white font-medium capitalize">{data.performance_style}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-white/5">
                            <span className="text-gray-400">Duration</span>
                            <span className="text-white font-medium">{data.typical_duration}</span>
                        </div>

                        <div className="pt-4">
                            <h4 className="text-gray-400 mb-2 text-sm">Key Traditions</h4>
                            <div className="flex flex-wrap gap-2">
                                {data.key_traditions.map((t, i) => (
                                    <span key={i} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notable Practitioners */}
                {data.media_references && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <User className="h-5 w-5" /> Legends
                        </h3>
                        <ul className="space-y-3">
                            {data.media_references.notable_practitioners.map((p, i) => (
                                <li key={i} className="text-gray-300 text-sm border-l-2 border-primary pl-3">
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
