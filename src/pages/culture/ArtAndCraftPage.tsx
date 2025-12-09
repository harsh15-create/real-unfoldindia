import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ArtHero from "@/components/culture/ArtHero";
import CategoryFilter from "@/components/culture/CategoryFilter";
import CraftCardComponent from "@/components/culture/CraftCard";
import { getArtMaster, ArtMaster, ArtCard } from "@/lib/art-api";
import { CultureEvents } from "@/analytics/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles, Bot } from "lucide-react";

const ArtAndCraftPage = () => {
    const navigate = useNavigate();
    const [masterData, setMasterData] = useState<ArtMaster | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredCards, setFilteredCards] = useState<ArtCard[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const data = await getArtMaster();
            setMasterData(data);
            setFilteredCards(data.cards);
        };
        fetchData();
        CultureEvents.ART_OPEN("listing");
    }, []);

    useEffect(() => {
        if (!masterData) return;

        let result = masterData.cards;

        if (activeCategory !== 'all') {
            result = result.filter(card => card.category === activeCategory);
        }

        if (searchQuery) {
            result = result.filter(card =>
                card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        setFilteredCards(result);
    }, [searchQuery, activeCategory, masterData]);

    const handleCategorySelect = (id: string) => {
        setActiveCategory(id);
    };

    if (!masterData) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Arts...</div>;

    return (
        <div className="min-h-screen bg-background">
            {/* <Helmet>
                <title>{masterData.seo_title}</title>
                <meta name="description" content={masterData.seo_description} />
            </Helmet> */}

            <ArtHero
                title={masterData.title}
                subtitle={masterData.intro_title}
                image="https://images.unsplash.com/photo-1460500063983-994d4c27756c?q=80&w=2070&auto=format&fit=crop"
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group"
                    onClick={() => navigate('/chat', { state: { message: "Tell me about Indian Art and Craft forms and which ones I should buy." } })}
                >
                    <Bot className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Talk to Kira about Art & Craft
                </Button>
            </ArtHero>

            <div className="container mx-auto px-4 py-12 relative z-30">
                {/* Intro Block */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Sparkles className="w-12 h-12 mx-auto text-pink-500 mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-white">{masterData.intro_title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-300 whitespace-pre-line font-light">
                        {masterData.intro_description}
                    </p>
                </div>

                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <h2 className="text-3xl font-bold flex items-center gap-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
                            Explore Artistic Heritage
                        </span>
                    </h2>

                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <Input
                            placeholder="Search crafts (e.g., Pottery, Silk...)"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 h-12 bg-white/5 border-white/10 focus:border-pink-500/50 rounded-xl text-white placeholder:text-white/30 transition-all hover:bg-white/10"
                        />
                    </div>
                </div>

                <CategoryFilter
                    categories={masterData.categories}
                    activeCategory={activeCategory}
                    onSelectCategory={handleCategorySelect}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCards.map((craft) => (
                        <CraftCardComponent
                            key={craft.id}
                            craft={craft}
                            onClick={() => CultureEvents.CRAFT_CLICK(craft.slug)}
                        />
                    ))}
                </div>

                {filteredCards.length === 0 && (
                    <div className="text-center text-gray-500 py-12">
                        No crafts found in this category.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtAndCraftPage;
