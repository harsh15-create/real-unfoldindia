import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const IndianCulture = () => {
    return (
        <div className="min-h-screen bg-background">
            <RoyalHero
                image="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
                title="Indian Culture"
                subtitle="Exploring the rich heritage and timeless traditions of India"
            />
            <div className="container mx-auto px-4 py-12 text-center">
                <p className="text-xl text-muted-foreground mb-8">
                    This page is currently being curated. Check back soon for an immersive cultural experience.
                </p>
                <Button asChild>
                    <Link to="/explore"><ArrowLeft className="mr-2 h-4 w-4" /> Explore Other Regions</Link>
                </Button>
            </div>
        </div>
    );
};

export default IndianCulture;
