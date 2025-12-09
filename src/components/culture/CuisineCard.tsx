
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, UtensilsCrossed, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CuisineCardProps {
    cuisine: {
        slug: string;
        title: string;
        card_subtitle: string;
        thumbnail: string;
        short_description: string;
        tags: string[];
    };
    index: number;
    onClick?: () => void;
}

export function CuisineCard({ cuisine, index, onClick }: CuisineCardProps) {
    const isVegetarian = cuisine.tags.includes("Vegetarian") || cuisine.tags.includes("Vegetarian-Friendly");

    return (
        <Link
            to={`/culture/cuisine/${cuisine.slug}`}
            onClick={onClick}
            className="block h-full"
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300 h-full flex flex-col"
            >
                <div className="aspect-[4/3] overflow-hidden relative shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                    <img
                        src={cuisine.thumbnail}
                        alt={cuisine.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20">
                        {isVegetarian && (
                            <div className="bg-green-900/80 backdrop-blur-md p-1.5 rounded-full border border-green-500/30" title="Vegetarian Friendly">
                                <Leaf className="w-4 h-4 text-green-400" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 relative z-20 flex flex-col flex-grow">
                    <div className="mb-4 flex-grow">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {cuisine.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="bg-orange-500/10 text-orange-300 border-orange-500/20 text-[10px]">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                            {cuisine.title}
                        </h3>
                        <p className="text-sm font-medium text-gray-400 italic mb-3">
                            {cuisine.card_subtitle}
                        </p>
                        <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                            {cuisine.short_description}
                        </p>
                    </div>

                    <div
                        className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors mt-auto"
                    >
                        Explore Dishes <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
