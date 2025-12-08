
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { FestivalCardData } from '@/lib/culture-api';

interface FestivalCardProps {
    festival: FestivalCardData;
}

export function FestivalCard({ festival }: FestivalCardProps) {
    return (
        <Link
            to={`/culture/festivals/${festival.slug}`}
            className="group relative h-[380px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 block"
        >
            {/* Image Layer */}
            <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                <img
                    src={festival.thumbnail}
                    alt={festival.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">

                <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-xs text-purple-300 font-bold uppercase tracking-widest mb-2">
                        {festival.card_subtitle}
                    </p>
                    <h3 className="text-2xl font-serif text-white mb-3 group-hover:text-purple-200 transition-colors leading-tight">
                        {festival.title}
                    </h3>

                    <p className="text-sm text-gray-300 line-clamp-3 mb-4 group-hover:text-white transition-colors opacity-90">
                        {festival.short_description}
                    </p>

                    <div className="flex items-center gap-2 text-sm font-medium text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        Explore Rituals <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
