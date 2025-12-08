
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface GalleryCarouselProps {
    images: string[];
    title: string;
}

const GalleryCarousel = ({ images, title }: GalleryCarouselProps) => {
    // Basic grid layout for now, can be upgraded to carousel
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                >
                    <Card className="overflow-hidden bg-transparent border-none aspect-square">
                        <img
                            src={img.startsWith('http') ? img : `https://source.unsplash.com/random/800x800/?${title},art,${idx}`}
                            alt={`${title} gallery ${idx + 1}`}
                            className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-500"
                        />
                    </Card>
                </motion.div>
            ))}
        </div>
    );
};

export default GalleryCarousel;
