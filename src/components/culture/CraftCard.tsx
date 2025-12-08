
import { ArtCard } from "@/lib/art-api";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CraftCardProps {
    craft: ArtCard;
    onClick: () => void;
}

const CraftCardComponent = ({ craft, onClick }: CraftCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/culture/art-and-craft/${craft.slug}`} onClick={onClick} className="block h-full">
                <Card className="h-full bg-[#1A1A2E]/50 border-white/10 overflow-hidden hover:border-primary/50 transition-colors group">
                    <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                            src={craft.thumbnail.startsWith('http') ? craft.thumbnail : `https://source.unsplash.com/random/800x600/?${craft.slug},craft,india`}
                            alt={craft.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] to-transparent opacity-80" />
                        <div className="absolute bottom-4 left-4 right-4">
                            <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary hover:bg-primary/30 border-none backdrop-blur-sm">
                                {craft.card_subtitle}
                            </Badge>
                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                                {craft.title}
                            </h3>
                        </div>
                    </div>
                    <CardContent className="p-4">
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                            {craft.short_description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {craft.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center text-primary text-sm font-medium group-hover:underline">
                            Discover Craft <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
};

export default CraftCardComponent;
