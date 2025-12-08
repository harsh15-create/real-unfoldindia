
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CuisineHero from "@/components/culture/CuisineHero";
import { CuisineCard } from "@/components/culture/CuisineCard";
import { getCuisineMaster, CuisineMaster, CuisineCard as ICuisineCard } from "@/lib/cuisine-api";
import { CultureEvents } from "@/analytics/events";
import { Separator } from "@/components/ui/separator";

const CuisinePage = () => {
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
                subtitle={data.intro_description.split('.')[0] + "."} // Show first sentence
                image={data.hero_image}
            />

            <div className="container mx-auto px-4 py-12">
                {/* Intro Text */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <p className="text-gray-300 leading-relaxed text-lg">
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

                    <div className="relative w-full md:w-64 shrink-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search cuisines..."
                            className="bg-white/5 border-white/10 pl-9 text-white placeholder:text-gray-500 focus:border-orange-500/50 rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
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
