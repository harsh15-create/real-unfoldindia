import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, Shield, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Guide = () => {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const element = document.getElementById(hash.replace("#", ""));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [hash]);

    const visaArticles = [
        { title: "Complete Guide to Indian e-Visa", desc: "Step-by-step process for applying for an e-Tourist visa.", link: "/guide/entry/eVisa" },
        { title: "Visa on Arrival: Eligible Countries", desc: "Check if your country qualifies for Visa on Arrival facilities.", link: "/guide/entry/visaOnArrival" },
        { title: "Registration for Long-Term Stay", desc: "FRRO registration guidelines for stays exceeding 180 days.", link: "/guide/entry/frro" },
        { title: "Restricted Area Permits (RAP)", desc: "How to visit protected areas like Sikkim and Andaman.", link: "/guide/entry/rap" },
        { title: "Customs Regulations", desc: "What you can and cannot bring into India.", link: "/guide/entry/customs" },
        { title: "Money Exchange Process", desc: "Best places to exchange currency and understanding exchange rates.", link: "/guide/entry/moneyExchange" },
    ];

    const safetyArticles = [
        { title: "Solo Female Travel in India", desc: "Essential tips for a safe and empowering journey.", link: "/guide/safety/soloFemaleTravel" },
        { title: "Avoiding Common Tourist Scams", desc: "How to spot and avoid touts and overcharging.", link: "/guide/safety/touristScams" },
        { title: "Emergency Numbers & Contacts", desc: "Police, Ambulance, and Tourist Helpline numbers.", link: "/guide/safety/emergencyContacts" },
        { title: "Food & Water Safety", desc: "Eating street food safely and staying hydrated.", link: "/guide/safety/foodWaterSafety" },
        { title: "Transportation Safety", desc: "Using authorized taxis and navigating public transport.", link: "/guide/safety/transportSafety" },
    ];

    const cities = [
        { name: "Delhi", image: "https://images.unsplash.com/photo-1587474260584-136574528615?q=80&w=1000&auto=format&fit=crop", title: "The Capital's Heritage & Modern Vibe" },
        { name: "Mumbai", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1000&auto=format&fit=crop", title: "City of Dreams: Gateway to India" },
        { name: "Jaipur", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1000&auto=format&fit=crop", title: "The Pink City's Royal Palaces" },
        { name: "Agra", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop", title: "Home of the Taj Mahal" },
        { name: "Varanasi", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=1000&auto=format&fit=crop", title: "Spiritual Capital of India" },
        { name: "Goa", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1000&auto=format&fit=crop", title: "Sun, Sand, and Portuguese Heritage" },
        { name: "Kerala", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop", title: "God's Own Country: Backwaters" },
        { name: "Udaipur", image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?q=80&w=1000&auto=format&fit=crop", title: "City of Lakes & Romance" },
        { name: "Bangalore", image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1000&auto=format&fit=crop", title: "The Garden City & Tech Hub" },
        { name: "Chennai", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000&auto=format&fit=crop", title: "Gateway to South India" },
        { name: "Kolkata", image: "https://images.unsplash.com/photo-1558431382-27e30314225d?q=80&w=1000&auto=format&fit=crop", title: "City of Joy: Culture & Arts" },
        { name: "Hyderabad", image: "https://images.unsplash.com/photo-1572445271230-a78b5944a659?q=80&w=1000&auto=format&fit=crop", title: "City of Pearls & Biryani" },
        { name: "Rishikesh", image: "https://images.unsplash.com/photo-1589825935526-04faeb9f5bd3?q=80&w=1000&auto=format&fit=crop", title: "Yoga Capital of the World" },
        { name: "Manali", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=1000&auto=format&fit=crop", title: "Himalayan Resort Town" },
        { name: "Leh-Ladakh", image: "https://images.unsplash.com/photo-1581793434119-98f0af2f8d50?q=80&w=1000&auto=format&fit=crop", title: "Land of High Passes" },
    ];

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center">Travel <span className="text-primary">Guides</span></h1>
                <p className="text-xl text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
                    Everything you need to know for a smooth and memorable Indian adventure.
                </p>

                {/* Visa & Entry Section */}
                <section id="visa" className="mb-24 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-primary/20 p-3 rounded-xl text-primary">
                            <FileText className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Visa & Entry</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {visaArticles.map((article, index) => (
                            <Link to={article.link} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-5 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer flex flex-col h-full min-h-[200px]"
                                >
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                                    <p className="text-muted-foreground mb-3 flex-grow">{article.desc}</p>
                                    <div className="flex items-center text-sm text-primary font-medium mt-auto">
                                        Know More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Safety Tips Section */}
                <section id="safety" className="mb-24 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-green-500/20 p-3 rounded-xl text-green-500">
                            <Shield className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Safety Tips</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {safetyArticles.map((article, index) => (
                            <Link to={article.link} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-5 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border-l-4 border-l-green-500 flex flex-col h-full min-h-[200px]"
                                >
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-green-500 transition-colors">{article.title}</h3>
                                    <p className="text-muted-foreground mb-3 flex-grow">{article.desc}</p>
                                    <div className="flex items-center text-sm text-green-500 font-medium mt-auto">
                                        Know More <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Cities Section */}
                <section id="cities" className="mb-12 scroll-mt-28">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="bg-blue-500/20 p-3 rounded-xl text-blue-500">
                            <MapPin className="h-8 w-8" />
                        </div>
                        <h2 className="text-3xl font-bold">Cities</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {cities.map((city, index) => (
                            <Link to={`/guide/city/${city.name.toLowerCase()}`} key={index}>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer border border-white/10 h-full"
                                >
                                    <div className="relative h-40 overflow-hidden">
                                        <img
                                            src={city.image}
                                            alt={city.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-2 right-2 bg-black/30 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-red-500/80 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-[10px] font-semibold text-primary uppercase tracking-wider mb-1">{city.name}</p>
                                        <h3 className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {city.title}
                                        </h3>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Guide;
