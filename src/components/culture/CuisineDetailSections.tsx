
import { motion } from "framer-motion";
import { Utensils, Award, Tangent, MapPin, BadgeIndianRupee, AlertCircle, ChefHat, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CuisineDetail } from "@/lib/cuisine-api";
import GalleryCarousel from "./GalleryCarousel";

interface CuisineDetailSectionsProps {
    cuisine: CuisineDetail;
}

export function CuisineDetailSections({ cuisine }: CuisineDetailSectionsProps) {
    return (
        <div className="space-y-24 py-12">
            {/* About Section */}
            <section className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            About <span className="text-orange-400">{cuisine.title}</span>
                        </h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                                {cuisine.long_description}
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-1">Region</h4>
                                <p className="text-white font-medium flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-orange-400" /> {cuisine.origin_state_or_region}
                                </p>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
                                <h4 className="text-gray-400 text-sm uppercase tracking-wide mb-1">Cost for Two</h4>
                                <p className="text-white font-medium flex items-center gap-2">
                                    <BadgeIndianRupee className="w-4 h-4 text-orange-400" />
                                    ₹{cuisine.avg_meal_cost_range.from} - ₹{cuisine.avg_meal_cost_range.to}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="bg-black/20 backdrop-blur-sm border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Info className="w-5 h-5 text-blue-400" /> Travel Tips
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-gray-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">Best Time:</strong> {cuisine.best_months_to_visit_for_food}
                                    </span>
                                </li>
                                <li className="flex gap-3 text-gray-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">Etiquette:</strong> {cuisine.dining_etiquette}
                                    </span>
                                </li>
                                <li className="flex gap-3 text-gray-300">
                                    <span className="text-orange-400 font-bold">•</span>
                                    <span>
                                        <strong className="text-white">Precautions:</strong> {cuisine.recommended_precautions_for_travellers}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Signature Dishes */}
            <section className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Signature Dishes</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Must-try delicacies that define the soul of {cuisine.title}.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cuisine.signature_dishes.map((dish, idx) => (
                        <motion.div
                            key={dish.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors group"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{dish.name}</h3>
                                    <Badge variant="secondary" className="bg-orange-900/40 text-orange-300 border-orange-500/30">
                                        {dish.serving_style}
                                    </Badge>
                                </div>
                                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                    {dish.short_description}
                                </p>
                                <div className="space-y-2 pt-4 border-t border-white/5">
                                    <div className="flex items-start gap-2 text-xs text-gray-400">
                                        <MapPin className="w-3 h-3 mt-0.5" />
                                        <span>Best at: <span className="text-gray-300">{dish.best_place_to_try}</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <BadgeIndianRupee className="w-3 h-3" />
                                        <span>₹{dish.approx_price.from} - ₹{dish.approx_price.to}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Separator className="bg-white/10" />

            {/* Where to Eat */}
            <section className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Legendary Eateries</h2>
                    <p className="text-gray-400">
                        Iconic spots to experience authentic flavors.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {cuisine.top_restaurants.map((place, idx) => (
                        <div key={place.name} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                                <ChefHat className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">{place.name}</h4>
                                <p className="text-xs text-orange-400 mb-1">{place.location}</p>
                                <p className="text-sm text-gray-300 mb-2">{place.notes}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <BadgeIndianRupee className="w-3 h-3" /> {place.price_range}
                                </div>
                            </div>
                        </div>
                    ))}
                    {cuisine.best_markets_and_streets.map((market, idx) => (
                        <div key={market.name} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                            <div className="shrink-0 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                                <Utensils className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white">{market.name}</h4>
                                <p className="text-xs text-purple-400 mb-1">{market.location}</p>
                                <p className="text-sm text-gray-300 mb-2">Try: {market.what_to_try}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Tangent className="w-3 h-3" /> {market.how_to_reach}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


        </div>
    );
}
