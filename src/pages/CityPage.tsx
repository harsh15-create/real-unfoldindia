import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Calendar, Utensils, Train, Shield, Wallet, Moon, ShoppingBag, Clock, Info, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";

interface CityData {
    name: string;
    title: string;
    image: string;
    about: string;
    bestTime: { season: string; desc: string }[];
    attractions: {
        name: string;
        image: string;
        timings: string;
        entry: string;
        duration: string;
        desc?: string;
        bestTime?: string;
    }[];
    hiddenGems: string[];
    food: { area: string; spots: string }[];
    markets: string[];
    nightlife: string[];
    itineraries: {
        day1: string;
        day2: string;
        day3: string;
    };
    transport: {
        metro: string;
        cabs: { type: string; cost: string }[];
    };
    budget: { type: string; cost: string }[];
    stay: string[];
    safety: string[];
}

const CityPage = () => {
    const { cityId } = useParams<{ cityId: string }>();
    const [city, setCity] = useState<CityData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCityData = async () => {
            if (!cityId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`/city-data/${cityId.toLowerCase()}.json`);
                if (!response.ok) {
                    throw new Error("City data not found");
                }
                const data = await response.json();
                setCity(data);
            } catch (err) {
                setError("Failed to load city data. Please try again later.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCityData();
    }, [cityId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center pt-24">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !city) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex flex-col items-center justify-center pt-24">
                    <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
                    <p className="text-muted-foreground mb-6">{error || "The city you are looking for does not exist."}</p>
                    <Button asChild>
                        <Link to="/guide">Back to Guides</Link>
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background font-sans">
            <Header />
            <main className="flex-1 pt-24">
                {/* Hero Section */}
                <div className="relative h-[70vh] w-full overflow-hidden">
                    <img
                        src={city.image}
                        alt={city.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-black/40 to-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight"
                        >
                            {city.name}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-xl md:text-3xl text-gray-200 max-w-3xl font-light leading-relaxed"
                        >
                            {city.title}
                        </motion.p>
                    </div>
                </div>

                <div className="container px-4 md:px-8 py-12 max-w-7xl mx-auto">
                    <Button variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary" asChild>
                        <Link to="/guide" className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Guides
                        </Link>
                    </Button>

                    {/* About & Best Time */}
                    <div className="grid lg:grid-cols-3 gap-12 mb-24">
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold mb-6">About {city.name}</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                {city.about}
                            </p>

                            <h3 className="text-2xl font-bold mb-4">Best Time to Visit</h3>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {city.bestTime.map((time, index) => (
                                    <div key={index} className="bg-muted/30 p-4 rounded-xl border border-border/50">
                                        <p className="font-semibold text-primary mb-1">{time.season}</p>
                                        <p className="text-sm text-muted-foreground">{time.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Stats Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Wallet className="h-5 w-5 text-primary" /> Budget (Per Day)
                                </h3>
                                <div className="space-y-3">
                                    {city.budget.map((b, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{b.type}</span>
                                            <span className="font-medium">{b.cost}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-green-500" /> Safety Tips
                                </h3>
                                <ul className="space-y-2">
                                    {city.safety.map((tip, i) => (
                                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                                            <span className="text-green-500 mt-1">•</span> {tip}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Top Attractions */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-terracotta/10 p-3 rounded-xl text-terracotta">
                                <MapPin className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-bold">Top Attractions</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {city.attractions.map((spot, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="group rounded-2xl overflow-hidden border border-border/50 bg-card hover:shadow-xl transition-all duration-300 flex flex-col"
                                >
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={spot.image}
                                            alt={spot.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-3 right-3">
                                            <Badge variant="secondary" className="backdrop-blur-md bg-black/50 text-white border-none">
                                                {spot.duration}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow flex flex-col">
                                        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{spot.name}</h3>
                                        <div className="space-y-2 text-sm text-muted-foreground mb-4 flex-grow">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" /> {spot.timings}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Wallet className="h-4 w-4" /> {spot.entry}
                                            </div>
                                            {spot.desc && (
                                                <div className="flex items-start gap-2 mt-2">
                                                    <Info className="h-4 w-4 mt-0.5" /> {spot.desc}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Talk to Kira CTA */}
                    <section className="mb-24 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-purple-500/20 to-blue-500/20 border border-white/10 p-8 md:p-12 text-center">
                        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
                        <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto">
                            <div className="bg-background/50 backdrop-blur-md p-4 rounded-full mb-6 shadow-lg border border-white/20">
                                <Bot className="h-10 w-10 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Confused? Talk to Kira</h2>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                Overwhelmed by choices? Let our AI travel companion help you plan the perfect trip tailored to your preferences, budget, and pace.
                            </p>
                            <Button size="lg" className="rounded-full px-8 text-lg h-12 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20" asChild>
                                <Link to="/trip">
                                    Chat with Kira <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
                                </Link>
                            </Button>
                        </div>
                    </section>

                    {/* Itineraries */}
                    <section className="mb-24">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500">
                                <Calendar className="h-8 w-8" />
                            </div>
                            <h2 className="text-4xl font-bold">Itineraries</h2>
                        </div>

                        <Tabs defaultValue="day1" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 mb-8">
                                <TabsTrigger value="day1">1 Day</TabsTrigger>
                                <TabsTrigger value="day2">2 Days</TabsTrigger>
                                <TabsTrigger value="day3">3 Days</TabsTrigger>
                            </TabsList>
                            <TabsContent value="day1" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">The Essentials</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day1}</p>
                            </TabsContent>
                            <TabsContent value="day2" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Culture & Heritage Deep Dive</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day2}</p>
                            </TabsContent>
                            <TabsContent value="day3" className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-4">Complete Experience</h3>
                                <p className="text-lg leading-relaxed">{city.itineraries.day3}</p>
                            </TabsContent>
                        </Tabs>
                    </section>

                    {/* Food, Markets & Nightlife Grid */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {/* Food */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-600">
                                    <Utensils className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Food & Local Eats</h3>
                            </div>
                            <div className="space-y-4">
                                {city.food.map((item, i) => (
                                    <div key={i} className="border-b border-border/50 last:border-0 pb-3 last:pb-0">
                                        <p className="font-semibold">{item.area}</p>
                                        <p className="text-sm text-muted-foreground">{item.spots}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Markets */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-pink-500/10 p-2 rounded-lg text-pink-600">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Shopping Markets</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.markets.map((market, i) => (
                                    <Badge key={i} variant="outline" className="text-base py-1 px-3">
                                        {market}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Nightlife */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-600">
                                    <Moon className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Nightlife</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.nightlife.map((spot, i) => (
                                    <Badge key={i} variant="secondary" className="text-base py-1 px-3">
                                        {spot}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {/* Hidden Gems */}
                        <div className="bg-card rounded-2xl border border-border/50 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-indigo-500/10 p-2 rounded-lg text-indigo-600">
                                    <MapPin className="h-6 w-6" />
                                </div>
                                <h3 className="text-2xl font-bold">Hidden Gems</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {city.hiddenGems.map((gem, i) => (
                                    <Badge key={i} variant="outline" className="text-base py-1 px-3 border-indigo-200 text-indigo-700 bg-indigo-50/50">
                                        {gem}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Transport & Stay */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold mb-8">Practical Information</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Train className="h-5 w-5 text-primary" /> Transport
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-semibold mb-1">Metro</p>
                                        <p className="text-sm text-muted-foreground">Fare: {city.transport.metro}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold mb-2">Cabs (Ola/Uber)</p>
                                        <div className="space-y-2">
                                            {city.transport.cabs.map((cab, i) => (
                                                <div key={i} className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">{cab.type}</span>
                                                    <span className="font-medium">{cab.cost}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-muted/30 p-8 rounded-2xl border border-border/50">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" /> Best Areas to Stay
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {city.stay.map((area, i) => (
                                        <div key={i} className="bg-background px-4 py-2 rounded-lg border border-border shadow-sm">
                                            {area}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CityPage;
