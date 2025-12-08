import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Info, Shield, Sun, Moon, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { getSpiritualDetail, SpiritualCityDetail } from "@/lib/spiritualApi";
import { useTranslation } from "react-i18next";

const SpiritualCity = () => {
    const { i18n } = useTranslation();
    const { slug } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<SpiritualCityDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!slug) return;
            try {
                setLoading(true);
                const cityData = await getSpiritualDetail(slug, i18n.language);
                if (cityData) {
                    setData(cityData);
                } else {
                    toast.error("City not found");
                    navigate("/spiritual-journeys");
                }
            } catch (error) {
                console.error("Failed to load city data:", error);
                toast.error("Error loading data");
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
                <p className="mt-4 text-white/50 animate-pulse">Summoning divine wisdom...</p>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#1A1A2E] text-white">
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#1A1A2E]/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
                <Link
                    to="/spiritual-journeys"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden md:inline">Back to Journeys</span>
                </Link>
                <h1 className="text-xl font-bold mx-auto absolute left-1/2 -translate-x-1/2 opacity-0 md:opacity-100 transition-opacity">
                    {data.title.split(":")[0]}
                </h1>
                <div /> {/* Spacer for layout balance since button is removed */}
            </nav>

            {/* Hero Section */}
            <div className="relative h-[70vh] w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A1A2E]/20 to-[#1A1A2E] z-10" />
                <div className="absolute inset-0 bg-gray-900">
                    {/* Fallback pattern since real images aren't generated */}
                    <div className="w-full h-full opacity-40 bg-[url('https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12 pb-20 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-3 mb-6 animate-fade-in-up">
                        {data.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-white border-white/30 bg-white/5 backdrop-blur-sm">
                                #{tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-10 leading-tight animate-fade-in-up delay-100">
                        {data.title}
                    </h1>

                    <div className="flex flex-col md:flex-row items-end gap-8 animate-fade-in-up delay-200">
                        <p className="text-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed border-l-4 border-primary pl-6">
                            {data.short_description}
                        </p>
                        <Button
                            size="lg"
                            className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300 md:mb-2 shrink-0"
                            onClick={() => navigate('/chat', { state: { message: `Generate a detailed itinerary for visiting ${data.title.split(":")[0]} focusing on spiritual sites.` } })}
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
                        <div className="glass rounded-3xl p-8 animate-fade-in-up delay-300">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Sun className="w-6 h-6 text-primary" />
                                Spiritual Essence
                            </h2>
                            <div className="prose prose-invert prose-lg max-w-none">
                                <p className="text-white/80 whitespace-pre-line leading-relaxed">
                                    {data.long_description}
                                </p>
                            </div>

                            <div className="mt-8 p-6 bg-primary/10 rounded-xl border border-primary/20">
                                <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-primary" />
                                    Spiritual Significance
                                </h3>
                                <p className="text-white/90 italic">
                                    "{data.spiritual_significance}"
                                </p>
                            </div>
                        </div>

                        {/* Temples & Sites */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 pl-2">
                                <MapPin className="w-6 h-6 text-primary" />
                                Sacred Sites
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {data.major_temples_and_sites.map((site, index) => (
                                    <div key={index} className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors pb-12 group">
                                        <h3 className="text-xl font-semibold mb-2 text-white">{site.name}</h3>
                                        <p className="text-white/60 text-sm leading-relaxed mb-4">{site.description}</p>

                                        {/* Location Symbol Button */}
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute bottom-4 right-4 bg-primary/20 text-primary hover:bg-primary hover:text-white rounded-full w-10 h-10 transition-all opacity-80 hover:opacity-100"
                                            onClick={() => {
                                                // TODO: Replace this placeholder link with your own map logic
                                                // User Note: Link your own maps here
                                                const placeholderLink = "#";
                                                window.open(placeholderLink, '_blank');
                                            }}
                                        >
                                            <MapPin className="w-5 h-5" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Rituals & Highlights Tabs */}
                        <Tabs defaultValue="rituals" className="w-full">
                            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto h-auto grid grid-cols-2">
                                <TabsTrigger value="rituals" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 rounded-lg">Rituals</TabsTrigger>
                                <TabsTrigger value="highlights" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 rounded-lg">Highlights</TabsTrigger>
                            </TabsList>
                            <div className="mt-6">
                                <TabsContent value="rituals" className="space-y-4">
                                    {data.rituals_and_experiences.map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold shrink-0">
                                                {i + 1}
                                            </div>
                                            <p className="text-white/80 pt-1">{item}</p>
                                        </div>
                                    ))}
                                </TabsContent>
                                <TabsContent value="highlights" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {data.highlights.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                                            <p className="text-emerald-100 font-medium">{item}</p>
                                        </div>
                                    ))}
                                </TabsContent>
                            </div>
                        </Tabs>

                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6 lg:sticky lg:top-24 h-fit">

                        {/* Quick Info Card */}
                        <div className="glass rounded-3xl p-6 space-y-6">
                            <h3 className="font-bold text-xl mb-4 text-white">Travel Essentials</h3>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Best Time</p>
                                        <p className="text-sm text-white/90">{data.best_months}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Shield className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Safety Tips</p>
                                        <p className="text-sm text-white/90">{data.safety_tips}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <Moon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">Where to Stay</p>
                                        <p className="text-sm text-white/90">{data.stay_recommendations}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <p className="text-xs text-white/50 uppercase tracking-wider font-semibold mb-2">How to Reach</p>
                                <p className="text-sm text-white/80 leading-relaxed block bg-white/5 p-3 rounded-lg">
                                    {data.how_to_reach}
                                </p>
                            </div>
                        </div>

                        {/* Did You Know */}
                        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-white/10">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-amber-400" /> Did You Know?
                            </h4>
                            <p className="text-sm text-white/70 italic">
                                {data.highlights[0]} This is one of the most prominent features of {data.title.split(":")[0]}.
                            </p>
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

export default SpiritualCity;
