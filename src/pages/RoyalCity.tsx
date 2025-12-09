
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { getCityData, CityData } from '@/lib/royalLuxuryApi';
import RoyalHero from '@/components/royal-luxury/RoyalHero';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RoyalCity = () => {
    const { i18n } = useTranslation();
    const { cityId } = useParams<{ cityId: string }>();
    const [city, setCity] = useState<CityData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (cityId) {
            getCityData(cityId, i18n.language).then(data => {
                setCity(data);
                setLoading(false);
            });
        }
    }, [cityId, i18n.language]);

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
            >
                <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-white font-bold rounded-full px-8 shadow-lg transition-all duration-300 mt-6"
                    onClick={() => {
                        /* In a real scenario, this might open a specific plan modal or chat. 
                           For now, we link to chat with specific context. */
                    }}
                    asChild
                >
                    <Link to="/chat" state={{ message: `Create a detailed itinerary for ${city.title}, focusing on its royal heritage and palaces.` }}>
                        <Star className="w-5 h-5 mr-2" />
                        Get Itinerary for {city.title}
                    </Link>
                </Button>
            </RoyalHero>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {city.properties.map((property, index) => (
                        <motion.div
                            key={property.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative h-[320px] overflow-hidden rounded-xl shadow-lg border border-border hover:shadow-2xl transition-all duration-300"
                        >
                            <Link to={`/experiences/royal-luxury/${city.slug}/${property.slug}`} className="block w-full h-full">
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                                <img
                                    src={property.thumbnail_image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Location Icon Overlay */}
                                <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-md p-2 rounded-full text-white/90 border border-white/10 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MapPin className="h-5 w-5" />
                                </div>

                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="text-primary text-xs font-semibold tracking-wider uppercase">
                                            {property.card_subtitle}
                                        </p>
                                        <div className="flex items-center text-white/80">
                                            <Star className="h-3 w-3 fill-primary text-primary mr-1" />
                                            <span className="text-[10px] font-medium uppercase">Verified</span>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-serif mb-1 group-hover:text-primary transition-colors">{property.title}</h3>
                                    {/* Description Removed as requested */}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RoyalCity;
