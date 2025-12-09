
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CuisineHero from "@/components/culture/CuisineHero";
import { CuisineDetailSections } from "@/components/culture/CuisineDetailSections";
import { getCuisine, CuisineDetail as ICuisineDetail } from "@/lib/cuisine-api";
import { CultureEvents } from "@/analytics/events";

const CuisineDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<ICuisineDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            if (slug) {
                try {
                    const cuisineData = await getCuisine(slug);
                    setData(cuisineData);
                    if (cuisineData) {
                        CultureEvents.CUISINE_VIEW(slug, cuisineData.title);
                    }
                } catch (error) {
                    console.error("Failed to load cuisine detail", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        loadData();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0B15] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-[#0B0B15] flex flex-col items-center justify-center text-white">
                <h2 className="text-3xl font-bold mb-4">Cuisine Not Found</h2>
                <Link to="/culture/cuisine">
                    <Button variant="secondary">Back to Cuisines</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B0B15]">
            <div className="fixed top-6 left-6 z-50">
                <Link to="/culture/cuisine">
                    <Button variant="outline" size="icon" className="rounded-full bg-black/40 backdrop-blur-md border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300 group">
                        <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <CuisineHero
                title={data.title}
                subtitle={data.short_description}
                image={data.hero_image}
                tags={data.tags}
            >
                <Button
                    size="lg"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 rounded-full px-8 shadow-xl transition-all duration-300 group mt-6"
                    onClick={() => navigate('/chat', { state: { message: `Create a food itinerary for ${data.title} cuisine, including best places to eat.` } })}
                >
                    <Sparkles className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Get Itinerary for {data.title}
                </Button>
            </CuisineHero>

            <CuisineDetailSections cuisine={data} />
        </div>
    );
};

export default CuisineDetail;
