
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DanceCardData } from '@/lib/dance-api';
import { ArrowRight } from 'lucide-react';

interface DanceCardProps {
    data: DanceCardData;
    index: number;
}

export const DanceCard: React.FC<DanceCardProps> = ({ data, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
        >
            <Link to={`/culture/dance-forms/${data.slug}`} className="block w-full h-full">
                {/* Image */}
                <div className="absolute inset-0">
                    <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-2 block">
                            {data.card_subtitle}
                        </span>
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                            {data.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                            {data.short_description}
                        </p>

                        <div className="flex items-center text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                            Explore <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
