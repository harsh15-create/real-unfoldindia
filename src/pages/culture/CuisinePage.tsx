
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CuisineHero from "@/components/culture/CuisineHero";
import { CuisineCard } from "@/components/culture/CuisineCard";
import { getCuisineMaster, CuisineMaster, CuisineCard as ICuisineCard } from "@/lib/cuisine-api";
import { CultureEvents } from "@/analytics/events";
import { Separator } from "@/components/ui/separator";

const CuisinePage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<CuisineMaster | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const masterData = await getCuisineMaster();
                setData(masterData);
                CultureEvents.CULTURE_OPEN("cuisine");
            } catch (error) {
                console.error("Failed to load cuisine data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading || !data) {
        return (
            <div className="min-h-screen bg-[#0B0B15] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    const filteredCuisines = data.cards.filter(card => {
        const matchesCategory = activeCategory === "all" ||
            (activeCategory === "Vegetarian" ? card.tags.includes("Vegetarian-Friendly") || card.tags.includes("Vegetarian") :
                card.tags.includes(data.categories.find(c => c.id === activeCategory)?.title || ""));

        const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-[#0B0B15] text-white">
            <div className="fixed top-6 left-6 z-50">
                <Link to="/explore">
                    <Button variant="outline" size="icon" className="rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <CuisineHero
                title={data.title}
                subtitle={data.intro_description.split('.')[0] + "."}
                image={data.hero_image}
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/chat', { state: { message: "Tell me about the diverse cuisines of India and what I must try." } })}
                >
                    <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Talk to Kira about Cuisine
                </Button>
            </CuisineHero>

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
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-400">
                            Savor the Flavors
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search cuisines..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-orange-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                {/* Categories Filter - separate row if needed, or matched styles */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 w-full justify-center scrollbar-hide">
                    <Button
                        variant={activeCategory === "all" ? "default" : "outline"}
                        onClick={() => setActiveCategory("all")}
                        className={`rounded-full ${activeCategory === "all" ? "bg-orange-500 hover:bg-orange-600 text-white" : "border-white/10 text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        All
                    </Button>
                    {data.categories && data.categories.map(category => (
                        <Button
                            key={category.id}
                            variant={activeCategory === category.id ? "default" : "outline"}
                            onClick={() => setActiveCategory(category.id)}
                            className={`rounded-full whitespace-nowrap ${activeCategory === category.id ? "bg-orange-500 hover:bg-orange-600 text-white" : "border-white/10 text-gray-400 hover:text-white hover:bg-white/5"}`}
                        >
                            {category.title}
                        </Button>
                    ))}
                </div>

                {/* Grid */}
                {filteredCuisines.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCuisines.map((cuisine, index) => (
                            <CuisineCard
                                key={cuisine.id}
                                cuisine={cuisine}
                                index={index}
                                onClick={() => CultureEvents.CUISINE_CLICK(cuisine.slug)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24">
                        <p className="text-gray-400 text-lg">No cuisines found matching your criteria.</p>
                        <Button variant="link" onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="text-orange-400">
                            Reset Filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CuisinePage;
