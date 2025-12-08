
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCraft, CraftDetail } from "@/lib/art-api";
import { CultureEvents } from "@/analytics/events";
// import { Helmet } from "react-helmet";
import ArtHero from "@/components/culture/ArtHero";
import CraftDetailSections from "@/components/culture/CraftDetailSections";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArtAndCraftDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    const [craft, setCraft] = useState<CraftDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            setLoading(true);
            const data = await getCraft(slug);
            setCraft(data);
            setLoading(false);
            if (data) CultureEvents.CRAFT_VIEW(slug);
        };
        fetchData();

        // Scroll to top
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading Craft...</div>;
    if (!craft) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Craft not found.</div>;

    const schema = JSON.stringify(craft.json_ld_template);

    return (
        <div className="min-h-screen bg-background">
            {/* <Helmet>
                <title>{craft.seo_title}</title>
                <meta name="description" content={craft.seo_description} />
                <script type="application/ld+json">{schema}</script>
            </Helmet> */}

            <ArtHero
                title={craft.title}
                subtitle={craft.short_description}
                image={craft.hero_image.startsWith('http') ? craft.hero_image : `https://source.unsplash.com/random/1920x1080/?${craft.slug},craft,india`}
            />

            <div className="container mx-auto px-4 py-8">
                <Button variant="ghost" asChild className="mb-4 text-gray-400 hover:text-white">
                    <Link to="/culture/art-and-craft">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Art & Craft
                    </Link>
                </Button>
            </div>

            <CraftDetailSections craft={craft} />
        </div>
    );
};

export default ArtAndCraftDetail;
