
import { CraftDetail } from "@/lib/art-api";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Info, MapPin, Palette, Sparkles, ShoppingBag, Leaf, Award } from "lucide-react";
import { CraftPlaceCard } from "./CraftPlaceCard";
import WorkshopCard from "./WorkshopCard";
import GalleryCarousel from "./GalleryCarousel";
import { CultureEvents } from "@/analytics/events";
import { Card, CardContent } from "@/components/ui/card";

interface CraftDetailSectionsProps {
    craft: CraftDetail;
}

const CraftDetailSections = ({ craft }: CraftDetailSectionsProps) => {
    return (
        <div className="container mx-auto px-4 py-12 space-y-16">
            {/* Overview & Description */}
            <div className="grid md:grid-cols-3 gap-12">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Info className="text-primary h-6 w-6" /> About the Craft
                    </h2>
                    <div className="prose prose-invert max-w-none text-gray-300">
                        <p className="whitespace-pre-line text-lg leading-relaxed">
                            {craft.long_description}
                        </p>
                    </div>

                    {/* Materials & Methods */}
                    <div className="grid md:grid-cols-2 gap-6 mt-8">
                        <Card className="bg-[#1A1A2E]/50 border-white/10">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Palette className="h-5 w-5 text-secondary" /> Materials
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {craft.materials_used.map(mat => (
                                        <Badge key={mat} variant="outline" className="border-secondary/50 text-secondary">
                                            {mat}
                                        </Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-[#1A1A2E]/50 border-white/10">
                            <CardContent className="p-6">
                                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-primary" /> Process
                                </h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    {craft.traditional_methods.map((method, i) => (
                                        <li key={i}>{method}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Quick Facts Sidebar */}
                    <Card className="bg-[#1A1A2E] border-white/10">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Origin</h4>
                                <div className="flex items-center text-white">
                                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                                    {craft.origin_state_or_region}
                                </div>
                            </div>
                            <Separator className="bg-white/10" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Typical Products</h4>
                                <ul className="text-gray-300 space-y-1">
                                    {craft.typical_products.map(p => <li key={p}>• {p}</li>)}
                                </ul>
                            </div>
                            <Separator className="bg-white/10" />
                            <div>
                                <h4 className="text-sm font-medium text-gray-500 mb-2">Motifs</h4>
                                <ul className="text-gray-300 space-y-1">
                                    {craft.motifs_and_meanings.map(m => <li key={m}>• {m}</li>)}
                                </ul>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Workshop */}
                    {craft.visitor_experiences.workshop_options.length > 0 && (
                        <WorkshopCard
                            workshop={craft.visitor_experiences.workshop_options[0]}
                            title={craft.title}
                            onInquire={() => CultureEvents.CRAFT_WORKSHOP_CLICK(craft.slug)}
                        />
                    )}
                </div>
            </div>

            {/* Major Centres */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                    <MapPin className="text-primary h-6 w-6" /> Major Centres
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {craft.major_centres.map(place => (
                        <CraftPlaceCard
                            key={place.place_id}
                            place={{
                                place_id: place.place_id,
                                title: place.title,
                                summary: place.summary,
                                best_to_experience: place.best_time_to_visit,
                                how_to_reach: place.how_to_reach,
                                is_bookable: place.workshop_availability
                            }}
                            onClick={() => CultureEvents.CRAFT_PLACE_CLICK(craft.slug, place.place_id)}
                        />
                    ))}
                </div>
            </div>

            {/* Gallery */}
            <div>
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
                    <Palette className="text-secondary h-6 w-6" /> Gallery
                </h2>
                <GalleryCarousel images={craft.gallery_images} title={craft.title} />
            </div>

            {/* Practical Info (Buying, Authenticity) */}
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-[#1A1A2E]/50 border-white/10">
                    <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <ShoppingBag className="text-green-400 h-6 w-6" /> Buying Guide
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-white font-medium mb-1">Where to Buy</h4>
                                <p className="text-gray-400">{craft.where_to_buy.join(", ")}</p>
                            </div>
                            <div>
                                <h4 className="text-white font-medium mb-1">Price Range</h4>
                                <p className="text-gray-400">₹{craft.typical_price_range.from} - ₹{craft.typical_price_range.to} ({craft.typical_price_range.price_type})</p>
                            </div>
                            <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                                <h4 className="text-yellow-500 font-medium mb-1 flex items-center gap-2">
                                    <Award className="h-4 w-4" /> Authenticity Tip
                                </h4>
                                <p className="text-gray-300 text-sm">{craft.authenticity_tips}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-[#1A1A2E]/50 border-white/10">
                    <CardContent className="p-8">
                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Leaf className="text-green-500 h-6 w-6" /> Sustainability & Economy
                        </h3>
                        <div className="space-y-6">
                            <p className="text-gray-300">{craft.sustainability_notes}</p>
                            <p className="text-gray-300">{craft.local_economy_note}</p>
                            {craft.notable_artisans.length > 0 && (
                                <div>
                                    <h4 className="text-white font-medium mb-2">Notable Artisans</h4>
                                    <ul className="list-disc list-inside text-gray-400">
                                        {craft.notable_artisans.map((a, i) => (
                                            <li key={i}>{a.name} - {a.note}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CraftDetailSections;
