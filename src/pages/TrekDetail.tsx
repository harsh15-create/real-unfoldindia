import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Mountain, Clock, ChevronRight, Sun, User, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getTrekDetail, TrekDetail as TrekDetailType } from "@/lib/treksApi"; // Typo fix: removed 'as' alias for now, or use it
import { useTranslation } from "react-i18next";

const TrekDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const [data, setData] = useState<TrekDetailType | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const trekData = await getTrekDetail(slug, i18n.language);
                if (trekData) {
                    setData(trekData);
                } else {
                    toast.error("Trek not found");
                    navigate("/himalayan-treks");
                }
            } catch (error) {
                console.error("Failed to load trek data:", error);
                toast.error("Error loading trek data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug, navigate, i18n.language]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A1A2E] p-8 flex flex-col items-center justify-center">
                <SparklesLoader />
                <p className="mt-4 text-white/50 animate-pulse">Mapping the trail...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#1A1A2E]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <Link
                    to="/himalayan-treks"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden md:inline">Back to Treks</span>
                </Link>
                <h1 className="text-xl font-bold mx-auto absolute left-1/2 -translate-x-1/2 opacity-0 md:opacity-100 transition-opacity">
                    {data.title}
                </h1>
                <Button size="sm" className="bg-primary hover:bg-primary/90 text-white border-0">
                    Book Now
                </Button>
            </nav>

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/20 to-[#1A1A2E] z-10" />
                <div className="absolute inset-0 bg-gray-900">
                    <img
                        src={data.cover_image}
                        alt={data.title}
                        className="w-full h-full object-cover opacity-60"
                    />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 pb-20 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-6 animate-fade-in-up">
                        {data.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-white border-white/30 bg-white/5 backdrop-blur-sm">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight animate-fade-in-up delay-100">
                        {data.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-light mb-8 animate-fade-in-up delay-150">
                        {data.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-8 text-sm md:text-base animate-fade-in-up delay-200">
                        <div className="flex items-center gap-2 text-white/80">
                            <Mountain className="w-5 h-5 text-primary" />
                            <span>{data.elevation_max_m}m Max</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Clock className="w-5 h-5 text-primary" />
                            <span>{data.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                            <User className="w-5 h-5 text-primary" />
                            <span>{data.difficulty}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 -mt-10 relative z-30 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">

                    {/* Main Content Column */}
                    <div className="space-y-10">

                        {/* Overview Card */}
                        <div className="glass rounded-3xl p-8 animate-fade-in-up delay-300">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Sun className="w-6 h-6 text-primary" />
                                About the Trek
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-white/80 whitespace-pre-line leading-relaxed">
                                    {data.about}
                                </p>
                            </div>
                        </div>

                        {/* Itinerary / Trek Places */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 pl-2">
                                <MapPin className="w-6 h-6 text-primary" />
                                On the Trail
                            </h2>
                            <div className="space-y-6">
                                {data.trek_places.map((place, index) => (
                                    <div key={place.id} className="relative pl-8 border-l border-white/10 last:border-0 pb-8 last:pb-0">
                                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-[#1A1A2E]" />

                                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors -mt-2">
                                            <div className="flex flex-col md:flex-row gap-6">
                                                {/* Place Image */}
                                                <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-xl overflow-hidden bg-black/20">
                                                    <img src={place.images[0]} alt={place.name} className="w-full h-full object-cover" />
                                                </div>

                                                <div className="flex-1">
                                                    <h3 className="text-xl font-bold text-white mb-1">{place.name}</h3>
                                                    <p className="text-sm text-primary mb-3">{place.short}</p>
                                                    <p className="text-white/70 text-sm leading-relaxed mb-4">{place.about}</p>

                                                    {place.what_to_do && place.what_to_do.length > 0 && (
                                                        <div className="bg-black/20 rounded-xl p-4">
                                                            <p className="text-xs font-bold text-white/50 uppercase mb-2">Activities</p>
                                                            <ul className="space-y-1">
                                                                {place.what_to_do.map((todo, i) => (
                                                                    <li key={i} className="text-xs md:text-sm text-white/80 flex items-start gap-2">
                                                                        <ChevronRight className="w-3 h-3 mt-0.5 text-primary shrink-0" />
                                                                        {todo}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Highlights Tab */}
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Sparkles className="w-6 h-6 text-primary" />
                                Trek Highlights
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {data.highlights.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                        <p className="text-emerald-100 font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 h-fit">

                        {/* Quick Info Card */}
                        <div className="glass rounded-3xl p-6 space-y-6">
                            <h3 className="font-bold text-xl mb-4 text-white">Trek Plan</h3>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Best Season</p>
                                        <p className="text-sm text-white/90">{data.bestSeason.join(", ")}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Base Camp</p>
                                        <p className="text-sm text-white/90">{data.hubs.join(", ")}</p>
                                    </div>
                                </div>
                            </div>



                            <Button
                                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-12 rounded-xl mt-4 shadow-lg hover:shadow-orange-500/20"
                                onClick={() => navigate("/chat", { state: { message: `Generate a dedicated full day-by-day itinerary for ${data.title} trek.` } })}
                            >
                                <Bot className="w-4 h-4 mr-2" />
                                Ask Kira for Full Itinerary
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SparklesLoader = () => (
    <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-primary rounded-full animate-spin"></div>
    </div>
);

export default TrekDetail;
