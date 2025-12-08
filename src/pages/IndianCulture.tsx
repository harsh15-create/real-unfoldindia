
import RoyalHero from "@/components/royal-luxury/RoyalHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Music, PartyPopper } from "lucide-react";

const IndianCulture = () => {
    return (
        <div className="min-h-screen bg-background">
            <RoyalHero
                image="https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop"
                title="Indian Culture"
                subtitle="Exploring the rich heritage and timeless traditions of India"
            />
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
                    {/* Festivals Card */}
                    <Link to="/culture/festivals" className="group relative overflow-hidden rounded-3xl aspect-[4/3]">
                        <img
                            src="https://images.unsplash.com/photo-1514222134-b57cbb8ce073?q=80&w=1000&auto=format&fit=crop"
                            alt="Festivals"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <PartyPopper className="text-primary h-6 w-6" /> Festivals
                            </h3>
                            <p className="text-gray-300">Experience the vibrant colors and celebrations of India.</p>
                        </div>
                    </Link>

                    {/* Dance Forms Card */}
                    <Link to="/culture/dance-forms" className="group relative overflow-hidden rounded-3xl aspect-[4/3]">
                        <img
                            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop"
                            alt="Dance Forms"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
                            <h3 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                                <Music className="text-secondary h-6 w-6" /> Dance Forms
                            </h3>
                            <p className="text-gray-300">Discover the classical and folk dance traditions.</p>
                        </div>
                    </Link>
                </div>

                <div className="text-center">
                    <p className="text-xl text-muted-foreground mb-8">
                        More cultural experiences coming soon.
                    </p>
                    <Button asChild variant="outline">
                        <Link to="/explore"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Explore</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default IndianCulture;
