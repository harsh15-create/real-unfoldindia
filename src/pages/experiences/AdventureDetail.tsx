
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { getAdventureActivity, AdventureActivity } from '@/lib/adventures-api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LocationList } from '@/components/adventures/LocationList';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Clock, Calendar, CheckCircle2, AlertOctagon, Share2, Ticket, MapPin } from 'lucide-react';
import { AdventureEvents } from '@/analytics/events';

export default function AdventureDetail() {
    const { i18n } = useTranslation();
    const { slug } = useParams<{ slug: string }>();
    const [activity, setActivity] = useState<AdventureActivity | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            setLoading(true);
            getAdventureActivity(slug, i18n.language).then(data => {
                setActivity(data);
                setLoading(false);
                if (data) AdventureEvents.ACTIVITY_VIEW_DETAIL('adventures', slug);
            }).catch(() => setLoading(false));
        }
    }, [slug, i18n.language]);

    if (loading) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Loading...</div>;
    if (!activity) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Activity not found</div>;

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero */}
            <div className="relative h-[60vh] min-h-[500px]">
                <img
                    src={activity.hero_image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute top-6 left-4 md:left-8 z-20">
                    <Link to="/experiences/adventures">
                        <Button variant="outline" className="text-white border-white/20 bg-black/20 hover:bg-black/40 backdrop-blur gap-2 rounded-full">
                            <ArrowLeft className="h-4 w-4" /> Back to Adventures
                        </Button>
                    </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                    <div className="container mx-auto">
                        <div className="flex gap-2 mb-4">
                            <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">{activity.difficulty_level}</Badge>
                            {activity.availability_flags?.is_seasonal && <Badge variant="outline" className="text-white border-white/40">Seasonal</Badge>}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">{activity.title}</h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-3xl font-light leading-relaxed">{activity.short_description}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 grid lg:grid-cols-3 gap-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-white">Overview</h2>
                        <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {activity.long_description}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold mb-6 text-white">Experience Highlights</h2>
                        <ul className="grid sm:grid-cols-2 gap-4">
                            {activity.highlights?.map((hl, i) => (
                                <li key={i} className="flex gap-3 items-start bg-white/5 p-4 rounded-xl border border-white/10 hover:border-primary/30 transition-colors">
                                    <div className="bg-primary/20 p-1.5 rounded-full mt-0.5">
                                        <CheckCircle2 className="h-4 w-4 text-primary" />
                                    </div>
                                    <span className="text-sm text-gray-200">{hl}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Location List Component would need to be styled for dark mode too */}
                    {/* I'll manually inline updated style for location list here or update the component. 
              Let's update the Locations section visually here for now to ensure match. */}

                    <section>
                        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                            <MapPin className="text-primary" /> Top Locations
                        </h3>
                        <div className="grid gap-4 md:grid-cols-2">
                            {activity.locations?.map((loc, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/40 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg text-white">{loc.location}</h4>
                                        <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">{loc.state}</Badge>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">{loc.summary}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="text-primary font-bold">From ₹{loc.price_from}</div>
                                        <Button variant="outline" size="sm" className="border-primary/30 text-primary hover:bg-primary hover:text-white" onClick={() => alert("Booking placeholder")}>Check Availability</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {activity.equipment_checklist && (
                        <section className="bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h2 className="text-xl font-bold mb-6 text-white">Equipment Checklist</h2>
                            <div className="flex flex-wrap gap-2">
                                {activity.equipment_checklist.map((item, i) => (
                                    <span key={i} className="px-4 py-2 bg-black/20 border border-white/10 rounded-full text-sm text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>
                    )}

                    {activity.safety_guidelines && (
                        <section className="border-l-4 border-orange-500 pl-6 py-2 bg-orange-500/5 rounded-r-xl">
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-orange-200">
                                <AlertOctagon className="text-orange-500" /> Safety Guidelines
                            </h2>
                            <ul className="space-y-3 text-gray-300">
                                {activity.safety_guidelines.map((line, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="text-orange-500">•</span> {line}
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6 backdrop-blur-sm">
                            <div>
                                <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">Best Season</h3>
                                <div className="flex items-center gap-3 text-white">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{activity.operating_season?.best_months || 'All Year'}</span>
                                </div>
                            </div>

                            <Separator className="bg-white/10" />

                            <div>
                                <h3 className="text-xs font-bold uppercase text-gray-500 mb-3 tracking-wider">Opening Hours</h3>
                                {activity.opening_hours?.map((hours, i) => (
                                    <div key={i} className="flex items-center gap-3 mb-2 text-sm text-gray-300">
                                        <Clock className="h-4 w-4 text-primary" />
                                        <span>
                                            {hours.days}: {hours.open_time} - {hours.close_time}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Separator className="bg-white/10" />

                            <div>
                                <h3 className="text-xs font-bold uppercase text-gray-500 mb-4 tracking-wider">Ticket Options</h3>
                                <div className="space-y-3">
                                    {activity.ticket_options?.map((ticket, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm p-3 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-gray-300">{ticket.type}</span>
                                            <span className="font-bold text-white">₹{ticket.price_from}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Button size="lg" className="w-full text-lg font-bold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20" onClick={() => {
                                AdventureEvents.ACTIVITY_BOOK_CTA({
                                    experience_id: 'adventures',
                                    activity_slug: activity.slug
                                });
                                alert("Booking System Integration Pending");
                            }}>
                                <Ticket className="mr-2 h-5 w-5" /> Book Experience
                            </Button>
                            <Button variant="outline" className="w-full border-white/10 text-white hover:bg-white/10">
                                <Share2 className="mr-2 h-4 w-4" /> Share
                            </Button>
                        </div>

                        <div className="bg-blue-500/10 p-6 rounded-2xl border border-blue-500/20">
                            <h4 className="font-bold text-blue-200 mb-2">Need customization?</h4>
                            <p className="text-sm text-blue-300/80 mb-4">
                                Our AI travel agent can help you plan this adventure into a complete itinerary.
                            </p>
                            <Link to="/chat" state={{ message: `I want to customize my adventure: ${activity.title}` }}>
                                <Button variant="link" className="p-0 h-auto text-blue-400 font-semibold hover:text-blue-300">
                                    Ask AI Assistant &rarr;
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
