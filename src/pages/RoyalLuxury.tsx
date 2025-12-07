
import React, { useEffect, useState } from 'react';
import { getMasterData, MasterData } from '@/lib/royalLuxuryApi';
import RoyalHero from '@/components/royal-luxury/RoyalHero';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

const RoyalLuxury = () => {
    const [data, setData] = useState<MasterData | null>(null);

    useEffect(() => {
        getMasterData().then(setData);
    }, []);

    if (!data) return <div className="h-screen flex items-center justify-center bg-background text-primary">Loading Royal Experience...</div>;

    return (
        <div className="min-h-screen bg-background font-sans text-foreground">
            <RoyalHero
                image={data.hero_image}
                title={data.intro_title}
                subtitle="Experience the grandeur of India's royal past"
            />

            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <Crown className="w-12 h-12 mx-auto text-primary mb-6" />
                    <h2 className="text-4xl md:text-5xl font-serif mb-8 text-foreground">{data.title}</h2>
                    <p className="text-lg md:text-xl leading-relaxed text-muted-foreground whitespace-pre-line font-light">
                        {data.intro_description}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.cities.map((city, index) => (
                        <Link to={`/experiences/royal-luxury/${city.slug}`} key={city.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative h-[300px] overflow-hidden rounded-lg cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 border border-border"
                            >
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                                <img
                                    src={city.thumbnail_image}
                                    alt={city.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
                                    <p className="text-primary text-xs font-medium tracking-widest uppercase mb-1 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        {city.card_subtitle}
                                    </p>
                                    <h3 className="text-2xl font-serif mb-1">{city.title}</h3>
                                    <p className="text-white/80 line-clamp-2 text-xs font-light leading-relaxed opacity-80 group-hover:opacity-100">
                                        {city.short_description}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default RoyalLuxury;
