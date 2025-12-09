
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
        >
            <Link
                to={`/culture/cuisine/${cuisine.slug}`}
                onClick={onClick}
                className="block h-[280px] group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20 hover:border-orange-500/30"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B15]/20 to-[#0B0B15] z-10" />
                <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                    <img
                        src={cuisine.thumbnail}
                        alt={cuisine.title}
                        className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                {/* Optional Veg Badge - Keeping minimal if user wants clean look, but helpful for Cuisine context. 
                    Positioning top-right like before, but absolute. */}
                <div className="absolute top-4 right-4 z-20">
                    {isVegetarian && (
                        <div className="bg-green-900/80 backdrop-blur-md p-1.5 rounded-full border border-green-500/30" title="Vegetarian Friendly">
                            <Leaf className="w-4 h-4 text-green-400" />
                        </div>
                    )}
                </div>

                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-orange-400 transition-colors text-center">
                            {cuisine.title}
                        </h3>
                        <p className="text-xs text-white/60 text-center line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {cuisine.card_subtitle}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
