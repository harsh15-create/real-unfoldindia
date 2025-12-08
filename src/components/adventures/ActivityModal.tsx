
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AdventureActivity } from "@/lib/adventures-api";
import { ArrowRight, Calendar, MapPin, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { AdventureEvents } from "@/analytics/events";

interface ActivityModalProps {
    isOpen: boolean;
    onClose: () => void;
    activity: AdventureActivity | null;
    isLoading?: boolean;
}

export function ActivityModal({ isOpen, onClose, activity, isLoading }: ActivityModalProps) {
    if (!activity && !isLoading) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-3xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
                {isLoading ? (
                    <div className="p-12 flex justify-center items-center h-64">
                        <span className="animate-pulse text-gray-400">Loading adventure details...</span>
                    </div>
                ) : activity ? (
                    <>
                        <div className="relative h-64 w-full bg-gray-100 flex-shrink-0">
                            <img
                                src={activity.hero_image}
                                alt={activity.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{activity.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {activity.highlights?.slice(0, 3).map((h, i) => (
                                            <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full">
                                                {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ScrollArea className="flex-grow p-6">
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">About this experience</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {activity.short_description}
                                        </p>
                                        <p className="text-gray-600 leading-relaxed text-sm mt-2 line-clamp-4">
                                            {activity.long_description?.split('\n')[0]}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-sm uppercase tracking-wide text-gray-500 mb-3 flex items-center gap-2">
                                            <MapPin className="h-4 w-4" /> Top Locations
                                        </h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            {activity.locations?.slice(0, 4).map((loc, idx) => (
                                                <div key={idx} className="p-3 bg-gray-50 rounded border text-sm">
                                                    <div className="font-medium text-gray-900">{loc.location}</div>
                                                    <div className="text-xs text-gray-500">{loc.state}</div>
                                                    <div className="text-xs text-primary font-medium mt-1">From ₹{loc.price_from}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 md:border-l md:pl-6">
                                    {activity.operating_season && (
                                        <div>
                                            <h4 className="font-medium text-sm flex items-center gap-2 text-gray-900 mb-1">
                                                <Calendar className="h-4 w-4 text-primary" /> Best Season
                                            </h4>
                                            <p className="text-sm text-gray-600">{activity.operating_season.best_months}</p>
                                        </div>
                                    )}

                                    {activity.safety_guidelines && (
                                        <div>
                                            <h4 className="font-medium text-sm flex items-center gap-2 text-gray-900 mb-2">
                                                <AlertTriangle className="h-4 w-4 text-orange-500" /> Safety Note
                                            </h4>
                                            <ul className="text-xs text-gray-600 space-y-1">
                                                {activity.safety_guidelines.slice(0, 2).map((safe, i) => (
                                                    <li key={i} className="flex gap-1.5 items-start">
                                                        <div className="min-w-1 min-h-1 w-1 h-1 rounded-full bg-gray-400 mt-1.5" />
                                                        {safe}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {activity.ticket_options && activity.ticket_options.length > 0 && (
                                        <div className="bg-primary/5 p-4 rounded-lg">
                                            <div className="text-xs text-primary font-bold uppercase mb-1">Starting From</div>
                                            <div className="text-2xl font-bold text-gray-900">
                                                ₹{Math.min(...activity.ticket_options.map(t => t.price_from))}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">per person</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </ScrollArea>

                        <DialogFooter className="p-4 border-t bg-gray-50 gap-2 sm:gap-0">
                            <Link to={`/experiences/adventures/${activity.slug}`} className="w-full sm:w-auto">
                                <Button variant="outline" className="w-full sm:mr-2">
                                    Full Details
                                </Button>
                            </Link>
                            <Button
                                className="w-full sm:w-auto"
                                onClick={() => {
                                    AdventureEvents.ACTIVITY_BOOK_CTA({
                                        experience_id: 'adventures',
                                        activity_slug: activity.slug
                                    });
                                    // Trigger basic unavailable alert as fallback, user prompt asks for booking widget payload but we don't have that widget yet. 
                                    // In real app, launch booking context.
                                    alert("Booking integration coming soon!");
                                }}
                            >
                                Check Availability <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </DialogFooter>
                    </>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}
