
import React from 'react';
import { MapPin, Plane, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CraftPlaceCardProps {
    place: {
        place_id: string;
        title: string;
        summary: string;
        best_to_experience: string;
        how_to_reach: string;
        is_bookable: boolean;
    };
    onClick?: () => void;
}

export function CraftPlaceCard({ place, onClick }: CraftPlaceCardProps) {
    return (
        <div
            onClick={onClick}
            className={`bg-white/5 border border-white/10 rounded-xl p-5 transition-colors flex flex-col justify-between h-full ${onClick ? 'cursor-pointer hover:border-purple-500/30 hover:bg-white/10' : ''}`}
        >
            <div>
                <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg text-white flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-purple-400" />
                        {place.title}
                    </h4>
                    {place.is_bookable && (
                        <Badge variant="outline" className="border-purple-500 text-purple-400 text-[10px] h-5">Bookable</Badge>
                    )}
                </div>
                <p className="text-sm text-gray-300 mb-4 font-light italic">
                    "{place.summary}"
                </p>

                <div className="space-y-3 mb-4">
                    <div className="bg-black/20 p-3 rounded-lg border border-white/5">
                        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                            <Star className="h-3 w-3" /> Best Experience
                        </div>
                        <p className="text-sm text-gray-200">{place.best_to_experience}</p>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-white/10 mt-2">
                <div className="flex items-start gap-2 text-xs text-gray-400">
                    <Plane className="h-3.5 w-3.5 mt-0.5" />
                    <span>{place.how_to_reach}</span>
                </div>
            </div>
        </div>
    );
}
