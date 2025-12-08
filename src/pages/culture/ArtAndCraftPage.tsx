
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArtHero from "@/components/culture/ArtHero";
import CategoryFilter from "@/components/culture/CategoryFilter";
import CraftCardComponent from "@/components/culture/CraftCard";
import { getArtMaster, ArtMaster, ArtCard } from "@/lib/art-api";
import { CultureEvents } from "@/analytics/events";
// import { Helmet } from "react-helmet";

const ArtAndCraftPage = () => {
    const [masterData, setMasterData] = useState<ArtMaster | null>(null);
    const [activeCategory, setActiveCategory] = useState("all");
    const [filteredCards, setFilteredCards] = useState<ArtCard[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getArtMaster();
            setMasterData(data);
            setFilteredCards(data.cards);
        };
        fetchData();
        CultureEvents.ART_OPEN("listing");
    }, []);

    const handleCategorySelect = (id: string) => {
        setActiveCategory(id);
        if (!masterData) return;

        if (id === 'all') {
            setFilteredCards(masterData.cards);
        } else {
            setFilteredCards(masterData.cards.filter(card => card.category === id));
        }
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
            />

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <p className="text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                        {masterData.intro_description}
                    </p>
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
