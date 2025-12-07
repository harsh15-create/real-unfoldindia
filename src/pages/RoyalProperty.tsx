
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyData, PropertyData } from '@/lib/royalLuxuryApi';
import RoyalHero from '@/components/royal-luxury/RoyalHero';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Star, Users, Utensils, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const RoyalProperty = () => {
    const { propertySlug, cityId } = useParams<{ propertySlug: string, cityId: string }>();
    const [property, setProperty] = useState<PropertyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (propertySlug) {
            getPropertyData(propertySlug).then(data => {
                setProperty(data);
                setLoading(false);
            });
        }
    }, [propertySlug]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading Residence...</div>;
    if (!property) return <div className="h-screen flex items-center justify-center bg-background text-foreground">Property Not Found for {propertySlug}</div>;

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: property.price_currency,
        maximumFractionDigits: 0
    });

    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-20">
            <div className="absolute top-6 left-6 z-50">
                <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
                    <Link to={`/experiences/royal-luxury/${cityId}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to {cityId}
                    </Link>
                </Button>
            </div>

            <RoyalHero
                image={property.hero_image}
                title={property.title}
                subtitle="A Royal Residence"
                height="h-[80vh]"
            />

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-30">
                <div className="bg-card rounded-xl shadow-xl p-8 md:p-12 mb-12 border border-border">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-serif mb-6 text-foreground">About the Residence</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line font-light mb-8">
                                {property.long_description}
                            </p>

                            <h3 className="text-2xl font-serif mb-4 mt-8 text-foreground">Amenities & Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                                {property.amenities.map(item => (
                                    <div key={item} className="flex items-center text-muted-foreground">
                                        <Check className="h-4 w-4 text-primary mr-2" />
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>

                            {property.room_types.length > 0 && (
                                <>
                                    <h3 className="text-2xl font-serif mb-6 mt-12 text-foreground">Accommodations</h3>
                                    <div className="space-y-6">
                                        {property.room_types.map((room: any) => (
                                            <div key={room.name} className="bg-background/50 p-6 rounded-lg border border-border hover:border-primary/30 transition-colors">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-serif text-xl text-foreground">{room.name}</h4>
                                                    <p className="text-primary font-semibold">
                                                        {formatter.format(room.starting_price)}<span className="text-muted-foreground text-sm font-normal"> / night</span>
                                                    </p>
                                                </div>
                                                <p className="text-muted-foreground text-sm">{room.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-6">
                                <div className="bg-background/80 backdrop-blur border border-border text-foreground p-8 rounded-xl shadow-lg">
                                    <div className="mb-6">
                                        <p className="text-muted-foreground text-sm uppercase tracking-widest mb-1">Starting From</p>
                                        <div className="flex items-baseline">
                                            <span className="text-3xl font-serif">{formatter.format(property.room_price_from)}</span>
                                            <span className="text-muted-foreground ml-2">/ night</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <Star className="h-4 w-4 mr-3 text-primary" />
                                            <span>{property.pricing_metadata.price_confidence === 'verified' ? 'Verified Pricing' : 'Estimated Pricing'}</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <Calendar className="h-4 w-4 mr-3 text-primary" />
                                            <span>Best Season: {property.operating_season?.best_months?.[0]} - {property.operating_season?.best_months?.[1]}</span>
                                        </div>
                                        <div className="flex items-center text-muted-foreground text-sm">
                                            <MapPin className="h-4 w-4 mr-3 text-primary" />
                                            <span>{cityId?.charAt(0).toUpperCase() + cityId?.slice(1)}</span>
                                        </div>
                                    </div>

                                    <Button className="w-full bg-primary hover:bg-primary/90 text-black font-semibold h-12 text-lg mb-4" asChild>
                                        <a href={property.booking_url || property.source_reference?.[0]?.url} target="_blank" rel="noopener noreferrer">
                                            Check Availability <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                    <p className="text-center text-muted-foreground text-xs">Direct booking via {property.pricing_metadata.data_provider}</p>
                                </div>

                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h4 className="font-serif text-lg mb-4 text-foreground">Highlights</h4>
                                    <ul className="space-y-3">
                                        {property.highlights.map(highlight => (
                                            <li key={highlight} className="flex items-start text-sm text-muted-foreground">
                                                <span className="mr-2 text-primary">•</span>
                                                {highlight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center mb-6">
                            <Utensils className="h-6 w-6 text-primary mr-3" />
                            <h3 className="font-serif text-2xl text-foreground">Dining</h3>
                        </div>
                        <div className="space-y-4">
                            {property.dining_options.map((dining: any) => (
                                <div key={dining.name} className="border-b border-border pb-4 last:border-0 last:pb-0">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-foreground">{dining.name}</h4>
                                        <span className="text-xs px-2 py-1 bg-background rounded text-muted-foreground">{dining.cuisine}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{dining.reservation_required ? 'Reservation Recommended' : 'Walk-ins Welcome'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-card p-8 rounded-xl border border-border shadow-sm">
                        <div className="flex items-center mb-6">
                            <Users className="h-6 w-6 text-primary mr-3" />
                            <h3 className="font-serif text-2xl text-foreground">Events & Weddings</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-6">
                            Perfect for royal weddings and grand celebrations.
                        </p>
                        <div className="space-y-4">
                            {property.event_spaces.map((space: any) => (
                                <div key={space.name} className="bg-background/50 p-4 rounded-lg">
                                    <div className="flex justify-between">
                                        <h4 className="font-medium text-foreground">{space.name}</h4>
                                        <span className="text-sm text-muted-foreground">Cap: {space.capacity}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{space.notes}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoyalProperty;
