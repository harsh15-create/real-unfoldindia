
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCityData, CityData } from '@/lib/royalLuxuryApi';
import RoyalHero from '@/components/royal-luxury/RoyalHero';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoyalCity = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const [city, setCity] = useState<CityData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cityId) {
            getCityData(cityId).then(data => {
                setCity(data);
                setLoading(false);
            });
        }
    }, [cityId]);

    if (loading) return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading City...</div>;
    if (!city) return <div className="h-screen flex items-center justify-center bg-background text-foreground">City Not Found</div>;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <div className="absolute top-6 left-6 z-50">
                <Button variant="ghost" className="text-white hover:bg-white/20" asChild>
                    <Link to="/experiences/royal-luxury">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
                    </Link>
                </Button>
            </div>

            <RoyalHero
                image={city.hero_image}
                title={city.title}
                subtitle={city.card_subtitle}
            />

            <section className="py-16 px-6 max-w-7xl mx-auto">
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <p className="text-xl leading-relaxed text-muted-foreground font-light whitespace-pre-line">
                        {city.long_description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mt-8">
                        {city.tags.map(tag => (
                            <span key={tag} className="px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-12">
                    {city.properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col md:flex-row bg-card rounded-xl overflow-hidden shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="md:w-2/5 h-[300px] md:h-auto overflow-hidden">
                                <img
                                    src={property.thumbnail_image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                />
                            </div>
                            <div className="md:w-3/5 p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-primary text-sm font-semibold tracking-wider uppercase">
                                            {property.card_subtitle}
                                        </p>
                                        <div className="flex items-center text-muted-foreground">
                                            <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                                            <span className="text-xs font-medium">Verified Property</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-serif mb-4 text-foreground">{property.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-6 font-light">
                                        {property.short_description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-border">
                                    <div className="flex items-center text-muted-foreground text-sm">
                                        <MapPin className="h-4 w-4 mr-2" />
                                        {city.title}
                                    </div>
                                    <Button
                                        className="bg-primary text-black hover:bg-primary/90 rounded-none px-8 py-6 transition-colors duration-300"
                                        asChild
                                    >
                                        <Link to={`/experiences/royal-luxury/${city.slug}/${property.slug}`}>
                                            View Residence
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RoyalCity;
