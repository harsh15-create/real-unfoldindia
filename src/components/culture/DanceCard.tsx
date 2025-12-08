
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { DanceCardData } from '@/lib/dance-api';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DanceCardProps {
    data: DanceCardData;
    index: number;
}

export const DanceCard: React.FC<DanceCardProps> = ({ data, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300"
        >
            <div className="aspect-[4/3] overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
            </div>

            <div className="p-6 relative z-20">
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="secondary" className="bg-orange-500/10 text-orange-300 border-orange-500/20 text-[10px]">
                            {data.card_subtitle}
                        </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                        {data.title}
                    </h3>
                    <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                        {data.short_description}
                    </p>
                </div>

                <Link
                    to={`/culture/dance-forms/${data.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors"
                >
                    Explore Form <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};
