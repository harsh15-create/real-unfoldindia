import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Info, Shield, Sun, Moon, TreeDeciduous, Binoculars, PawPrint, Camera, Tent, AlertTriangle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getWildlifeDetail, WildlifeParkDetail } from "@/lib/wildlifeApi";
import { useTranslation } from "react-i18next";

const WildlifePark = () => {
    const { i18n } = useTranslation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<WildlifeParkDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const parkData = await getWildlifeDetail(slug, i18n.language);
                if (parkData) {
                    setData(parkData);
                } else {
                    toast.error("Destination not found");
                    navigate("/wildlife-safaris");
                }
            } catch (error) {
                console.error("Failed to load park data:", error);
                toast.error("Error loading data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, navigate, i18n.language]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#051F12] p-8 flex flex-col items-center justify-center">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500/20 rounded-full animate-ping"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-t-emerald-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-emerald-400/50 animate-pulse">Tracking wildlife...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#051F12] text-white selection:bg-emerald-500/30">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#051F12]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <Link
                    to="/wildlife-safaris"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden md:inline">Back to Wild</span>
                </Link>
                <h1 className="text-xl font-bold mx-auto absolute left-1/2 -translate-x-1/2 opacity-0 md:opacity-100 transition-opacity text-emerald-100">
                    {data.title}
                </h1>
                <div />
            </nav>

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#051F12]/20 to-[#051F12] z-10" />
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src={data.hero_image}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-80"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 pb-20 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-6 animate-fade-in-up">
                        {data.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-emerald-100 border-emerald-500/30 bg-emerald-900/40 backdrop-blur-sm">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-tight animate-fade-in-up delay-100 font-display">
                        {data.title}
                    </h1>

                    <div className="flex flex-col md:flex-row items-end gap-8 animate-fade-in-up delay-200">
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed border-l-4 border-emerald-500 pl-6">
                            {data.short_description}
                        </p>
                        <Button
                            size="lg"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300 md:mb-2 shrink-0"
                            onClick={() => navigate('/chat', { state: { message: `Generate a detailed wildlife safari itinerary for ${data.title}.` } })}
                        >
                            <Sparkles className="w-5 h-5 mr-2" />
                            Generate Itinerary
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-30 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

                    {/* Main Content Column */}
                    <div className="space-y-10">

                        {/* Overview Card */}
                        <div className="glass rounded-3xl p-8 animate-fade-in-up delay-300 bg-[#0A2A1B]/60 border-white/10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-emerald-400">
                                <TreeDeciduous className="w-6 h-6" />
                                Ecosystem & Habitat
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-white/80 whitespace-pre-line leading-relaxed">
                                    {data.long_description}
                                </p>
                            </div>

                            <div className="mt-8 p-6 bg-emerald-900/20 rounded-xl border border-emerald-500/20">
                                <h3 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 fill-emerald-500/20" />
                                    Conservation Focus
                                </h3>
                                <p className="text-white/90 italic">
                                    "{data.conservation_notes}"
                                </p>
                            </div>
                        </div>

                        {/* Species & Wildlife */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 pl-2 text-emerald-100">
                                <PawPrint className="w-6 h-6 text-emerald-500" />
                                Key Species
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {data.species_to_see.map((species, index) => (
                                    <div key={index} className="bg-emerald-900/10 border border-emerald-500/10 rounded-xl p-4 hover:bg-emerald-900/20 transition-colors flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                        <span className="text-white font-medium">{species}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Experiences Tabs */}
                        <Tabs defaultValue="safaris" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto h-auto grid grid-cols-2">
                                <TabsTrigger value="safaris" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3 rounded-lg">Safaris & Activities</TabsTrigger>
                                <TabsTrigger value="highlights" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white py-3 rounded-lg">Highlights</TabsTrigger>
                            </TabsList>
                            <div className="mt-6">
                                <TabsContent value="safaris" className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {data.safari_types.map((item, i) => (
                                            <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                                    <Binoculars className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-white mb-1">{item}</h4>
                                                    <p className="text-xs text-white/50">Available Experience</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-3">
                                        <h3 className="font-semibold text-white/80 pl-1">Other Experiences</h3>
                                        {data.major_experiences.map((exp, i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border-l-2 border-emerald-500">
                                                <Camera className="w-4 h-4 text-emerald-400" />
                                                <span className="text-white/80">{exp}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="highlights" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                                            <Sun className="w-4 h-4 text-yellow-500 shrink-0" />
                                            <p className="text-yellow-100/90 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </TabsContent>
                            </div>
                        </Tabs>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 h-fit">

                        {/* Quick Info Card */}
                        <div className="glass rounded-3xl p-6 space-y-6 bg-[#0A2A1B]/80 border-white/10">
                            <h3 className="font-bold text-xl mb-4 text-white">Safari Essentials</h3>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Best Season</p>
                                        <p className="text-sm text-white/90">{data.operating_season.best_months}</p>
                                        <p className="text-xs text-white/50 mt-1 italic">{data.operating_season.season_notes}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Safety</p>
                                        <p className="text-sm text-white/90 line-clamp-2">{data.safety_tips}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Tent className="w-5 h-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Stay</p>
                                        <div className="text-sm text-white/90 flex flex-col gap-1">
                                            {data.accommodation_recommendations.slice(0, 2).map((h, i) => (
                                                <span key={i} className="truncate">• {h}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">Permits & Fees</p>
                                <div className="space-y-2">
                                    {data.entry_fees.slice(0, 2).map((fee, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-white/70">{fee.category}</span>
                                            <span className="font-semibold text-emerald-400">{fee.currency} {fee.price}</span>
                                        </div>
                                    ))}
                                    <p className="text-xs text-white/40 mt-2">{data.permits_and_fees}</p>
                                </div>
                            </div>

                            <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-12 rounded-xl text-lg mt-4 shadow-lg shadow-emerald-900/20">
                                Book Safari
                            </Button>
                        </div>

                        {/* How to Reach Card */}
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-400" /> How to Reach
                            </h4>
                            <p className="text-sm text-white/70 leading-relaxed">
                                {data.how_to_reach}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WildlifePark;
