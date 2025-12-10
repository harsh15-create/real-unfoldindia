
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Wind, Waves, Mountain, Snowflake, Tent, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdventureActivity } from '@/lib/adventures-api';

interface ActivityCardProps {
    activity: Partial<AdventureActivity> & { card_subtitle?: string; category?: string; thumbnail_image?: string };
    onQuickView: (slug: string) => void;
}

const CategoryIcon = ({ category }: { category?: string }) => {
    switch (category?.toLowerCase()) {
        case 'air': return <Wind className="h-3 w-3" />;
        case 'water': return <Waves className="h-3 w-3" />;
        case 'snow': return <Snowflake className="h-3 w-3" />;
        case 'land': return <Mountain className="h-3 w-3" />;
        case 'overnight': return <Tent className="h-3 w-3" />;
        default: return <Mountain className="h-3 w-3" />;
    }
};

export function ActivityCard({ activity, onQuickView }: ActivityCardProps) {
    return (
        <Link
            to={`/experiences/adventures/${activity.slug}`}
            className="group relative h-[320px] overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/30 block"
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900 group-hover:scale-110 transition-transform duration-700">
                <img
                    src={activity.thumbnail_image || activity.hero_image}
                    alt={activity.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 z-10" />

            {/* Content */}
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                <div className="flex justify-end">
                    {activity.category && (
                        <Badge variant="outline" className="bg-black/30 backdrop-blur-md text-white border-white/20 gap-1">
                            <CategoryIcon category={activity.category} />
                            {activity.category}
                        </Badge>
                    )}
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-1 text-white group-hover:text-primary transition-colors leading-tight">
                        {activity.title}
                    </h3>
                    <p className="text-xs text-white/60 font-medium uppercase tracking-wider mb-2">
                        {activity.card_subtitle || 'Adventure'}
                    </p>



                    <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="flex items-center gap-2 text-sm font-medium text-primary">
                            View Details <ArrowRight className="h-4 w-4" />
                        </div>
                        {/* Quick view button could go here or be removed if purely card-link style is preferred */}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                activity.slug && onQuickView(activity.slug);
                            }}
                            className="text-xs text-white/40 hover:text-white hover:underline z-30"
                        >
                            Quick Preview
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
