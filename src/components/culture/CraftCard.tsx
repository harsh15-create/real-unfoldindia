
import { ArtCard } from "@/lib/art-api";
import { Link } from "react-router-dom";
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
            className="h-full"
        >
            <Link
                to={`/culture/art-and-craft/${craft.slug}`}
                onClick={onClick}
                className="block h-[280px] group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20 hover:border-pink-500/30"
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B15]/20 to-[#0B0B15] z-10" />
                <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                    <img
                        src={craft.thumbnail.startsWith('http') ? craft.thumbnail : `https://source.unsplash.com/random/800x600/?${craft.slug},craft,india`}
                        alt={craft.title}
                        className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                    />
                </div>

                <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-xl font-bold mb-1 text-white group-hover:text-pink-400 transition-colors text-center">
                            {craft.title}
                        </h3>
                        {/* Subtitle logic: Shows on hover, similar to Festival card. 
                            If user strictly wanted NO subtitle ever, we'd remove the 'p' tag. 
                            But 'similar to festivals' implies this interaction. */}
                        <p className="text-xs text-white/60 text-center line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {craft.card_subtitle}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CraftCardComponent;
