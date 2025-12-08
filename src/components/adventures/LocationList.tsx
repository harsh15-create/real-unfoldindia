
import React from 'react';
import { AdventureLocation } from '@/lib/adventures-api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, IndianRupee, ExternalLink } from 'lucide-react';

interface LocationListProps {
    locations: AdventureLocation[];
    activitySlug: string;
}

export function LocationList({ locations, activitySlug }: LocationListProps) {
    if (!locations || locations.length === 0) return null;

    return (
        <div className="py-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="text-primary" /> Top Locations
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {locations.map((loc, idx) => (
                    <Card key={idx} className="hover:border-primary/50 transition-colors">
                        <CardContent className="p-5 space-y-3">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg text-gray-900">{loc.location}</h4>
                                    <p className="text-sm text-gray-500">{loc.state}</p>
                                </div>
                                {loc.difficulty && (
                                    <Badge variant="secondary" className="text-xs">
                                        {loc.difficulty}
                                    </Badge>
                                )}
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem]">
                                {loc.summary}
                            </p>

                            <div className="pt-2 flex flex-col gap-2 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span>{loc.best_months}</span>
                                </div>
                                <div className="flex items-center gap-2 font-medium">
                                    <IndianRupee className="h-4 w-4 text-gray-400" />
                                    <span>From ₹{loc.price_from}</span>
                                </div>
                            </div>

                            <Button variant="default" size="sm" className="w-full mt-2" onClick={() => alert(`Connect to booking for ${loc.location}`)}>
                                Check Availability
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
