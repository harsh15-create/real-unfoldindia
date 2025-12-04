import { useState } from "react";
import { ArrowRight, Car, Train, Bus, Plane, MapPin, Navigation, Loader2, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface RouteData {
    id: string;
    name: string;
    tag: string;
    time: string;
    distance: string;
    safety: string;
    traffic: string;
    roadQuality: string;
    tagColor: string;
    stats: {
        safetyColor: string;
        trafficColor: string;
        roadColor: string;
    };
}



const RoutePlanner = () => {
    const [showRoutes, setShowRoutes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");

    const [mainRoute, setMainRoute] = useState<RouteData>({
        id: "recommended",
        name: "Recommended Route",
        tag: "Fastest & Safest Option",
        time: "5h 30m",
        distance: "268 km • NH48",
        safety: "98%",
        traffic: "Moderate",
        roadQuality: "Excellent",
        tagColor: "text-primary/90",
        stats: {
            safetyColor: "text-emerald-400",
            trafficColor: "text-amber-400",
            roadColor: "text-blue-400"
        }
    });

    const [otherRoutes, setOtherRoutes] = useState<RouteData[]>([
        {
            id: "scenic",
            name: "Scenic Route",
            tag: "Most Scenic",
            time: "6h 15m",
            distance: "285 km",
            safety: "95%",
            traffic: "Low",
            roadQuality: "Good",
            tagColor: "text-purple-400",
            stats: {
                safetyColor: "text-emerald-400",
                trafficColor: "text-emerald-400",
                roadColor: "text-blue-400"
            }
        },
        {
            id: "shortest",
            name: "Shortest Route",
            tag: "Heavy Traffic",
            time: "5h 45m",
            distance: "260 km",
            safety: "88%",
            traffic: "High",
            roadQuality: "Average",
            tagColor: "text-red-400",
            stats: {
                safetyColor: "text-yellow-400",
                trafficColor: "text-red-400",
                roadColor: "text-yellow-400"
            }
        }
    ]);

    const handleRouteSelect = (selected: RouteData) => {
        const oldMain = mainRoute;
        setMainRoute(selected);
        setOtherRoutes(prev => prev.map(r => r.id === selected.id ? oldMain : r));
    };

    const handlePlan = (e: React.FormEvent) => {
        e.preventDefault();
        if (!origin || !destination) return;

        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setShowRoutes(true);
        }, 2000);
    };

    // Apple-style easing: smooth, refined, non-bouncy
    const appleEase = [0.25, 0.1, 0.25, 1];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
                ease: appleEase,
                duration: 0.8
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: appleEase }
        },
    };

    return (
        <div className="h-screen bg-gradient-to-b from-[#050505] to-[#0f172a] text-foreground selection:bg-primary/30 selection:text-white relative overflow-hidden font-sans antialiased flex flex-col">
            {/* Subtle Noise Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

            {/* Deep Ambient Gradients */}
            <div className="fixed top-[-20%] left-[20%] w-[1000px] h-[1000px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

            <div className="container mx-auto max-w-7xl px-6 md:px-12 pt-20 pb-6 relative z-10 flex-1 flex flex-col h-full">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-12 gap-8 h-full"
                >
                    {/* Left Input Panel */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-center h-full">
                        <div className="mb-6 pl-2">
                            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">
                                Plan your <span className="text-primary/90">journey</span>.
                            </h1>
                            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
                                Precision routing tailored to your preferences.
                            </p>
                        </div>

                        {/* Apple Glass Card */}
                        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-6 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04]">
                            <form onSubmit={handlePlan} className="space-y-6 relative z-10">
                                <div className="flex flex-col gap-1 relative">
                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Origin</Label>
                                        <div className="relative transition-all duration-500 focus-within:scale-[1.01] focus-within:z-10">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within/input:text-primary/80 transition-colors duration-500" />
                                            <Input
                                                value={origin}
                                                onChange={(e) => setOrigin(e.target.value)}
                                                placeholder="Start location"
                                                className="pl-11 h-12 bg-white/[0.02] border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-0 rounded-t-2xl rounded-b-md text-[14px] text-white placeholder:text-white/20 shadow-none transition-all duration-500 ease-out"
                                            />
                                        </div>
                                    </div>

                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 mt-3">
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                const temp = origin;
                                                setOrigin(destination);
                                                setDestination(temp);
                                            }}
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 rounded-full bg-[#0a0a0a] border border-white/10 hover:bg-primary hover:border-primary hover:text-white hover:scale-110 hover:rotate-180 transition-all duration-500 shadow-lg group/swap"
                                        >
                                            <ArrowUpDown className="h-3.5 w-3.5 text-white/60 group-hover/swap:text-white transition-colors duration-300" />
                                        </Button>
                                    </div>

                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Destination</Label>
                                        <div className="relative transition-all duration-500 focus-within:scale-[1.01] focus-within:z-10">
                                            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within/input:text-primary/80 transition-colors duration-500" />
                                            <Input
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                placeholder="End location"
                                                className="pl-11 h-12 bg-white/[0.02] border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-0 rounded-b-2xl rounded-t-md text-[14px] text-white placeholder:text-white/20 shadow-none transition-all duration-500 ease-out"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Travel Mode</Label>
                                    <RadioGroup defaultValue="drive" className="grid grid-cols-4 gap-2">
                                        {[
                                            { id: "drive", icon: Car },
                                            { id: "transit", icon: Train },
                                            { id: "bus", icon: Bus },
                                            { id: "flight", icon: Plane },
                                        ].map((mode) => (
                                            <div key={mode.id}>
                                                <RadioGroupItem value={mode.id} id={mode.id} className="peer sr-only" />
                                                <Label
                                                    htmlFor={mode.id}
                                                    className="flex flex-col items-center justify-center h-12 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.06] peer-data-[state=checked]:border-primary/40 peer-data-[state=checked]:bg-primary/[0.15] peer-data-[state=checked]:text-primary cursor-pointer transition-all duration-500 ease-out group/mode"
                                                >
                                                    <mode.icon className="h-4 w-4 text-white/40 group-hover/mode:text-white/60 peer-data-[state=checked]:text-primary transition-colors duration-500" />
                                                </Label>
                                            </div>
                                        ))}
                                    </RadioGroup>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-12 text-[14px] font-medium bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 rounded-2xl shadow-[0_0_25px_-5px_rgba(255,145,77,0.3)] hover:shadow-[0_0_35px_-5px_rgba(255,145,77,0.5)] transition-all duration-500 ease-out group/btn overflow-hidden relative border-none"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 animate-spin opacity-80" />
                                                <span className="opacity-80">Calculating...</span>
                                            </>
                                        ) : (
                                            <>
                                                Find Best Routes
                                                <ArrowRight className="h-4 w-4 opacity-80 group-hover/btn:translate-x-1 transition-transform duration-500 ease-out" />
                                            </>
                                        )}
                                    </span>
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Preview Panel */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 relative h-full flex flex-col">
                        <div className="flex-1 backdrop-blur-3xl bg-white/[0.02] rounded-[2.5rem] border border-white/[0.05] relative overflow-hidden shadow-2xl flex items-center justify-center group/map">
                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] pointer-events-none z-10" />

                            <AnimatePresence mode="wait">
                                {!showRoutes ? (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        transition={{ duration: 0.8, ease: appleEase }}
                                        className="text-center relative z-20"
                                    >
                                        <div className="relative w-32 h-32 mx-auto mb-8">
                                            {/* Apple Watch-style Activity Rings */}
                                            <div className="absolute inset-0 border border-white/5 rounded-full" />
                                            <div className="absolute inset-0 border border-primary/20 rounded-full animate-[spin_8s_linear_infinite]" style={{ borderTopColor: 'transparent', borderLeftColor: 'transparent' }} />
                                            <div className="absolute inset-6 border border-white/5 rounded-full" />
                                            <div className="absolute inset-6 border border-blue-500/20 rounded-full animate-[spin_6s_linear_infinite_reverse]" style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }} />

                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                                                    <MapPin className="relative h-6 w-6 text-primary/90" />
                                                </div>
                                            </div>
                                        </div>
                                        <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">Ready to explore?</h3>
                                        <p className="text-white/40 max-w-xs mx-auto font-light text-base leading-relaxed">
                                            Enter your details to visualize the safest and fastest routes.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{ duration: 0.8, ease: appleEase }}
                                        className="w-full h-full p-8 relative z-20 flex flex-col"
                                    >
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={mainRoute.id}
                                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                                transition={{ duration: 0.5, ease: appleEase }}
                                                className="flex-1 flex flex-col min-h-0"
                                            >
                                                <div className="flex justify-between items-end mb-6 shrink-0">
                                                    <div>
                                                        <motion.h2
                                                            layoutId={`title-${mainRoute.id}`}
                                                            className="text-2xl font-semibold text-white mb-1 tracking-tight"
                                                        >
                                                            {mainRoute.name}
                                                        </motion.h2>
                                                        <div className="flex items-center gap-2">
                                                            <span className="flex h-1.5 w-1.5 relative">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                                                            </span>
                                                            <p className={cn("font-medium text-xs tracking-wide uppercase", mainRoute.tagColor)}>{mainRoute.tag}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <motion.p
                                                            layoutId={`time-${mainRoute.id}`}
                                                            className="text-4xl font-semibold text-white tracking-tighter"
                                                        >
                                                            {mainRoute.time}
                                                        </motion.p>
                                                        <p className="text-white/40 font-light mt-0.5 text-base">{mainRoute.distance}</p>
                                                    </div>
                                                </div>

                                                {/* Abstract Route Visualization - "Opening" Animation */}
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    transition={{ duration: 0.6, delay: 0.1, ease: appleEase }}
                                                    className="flex-1 bg-white/[0.02] rounded-[1.5rem] border border-white/[0.05] relative overflow-hidden mb-6 shadow-inner min-h-0"
                                                >
                                                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                                        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-medium">Interactive Map Preview</p>
                                                    </div>
                                                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                                                        <path
                                                            d="M100,350 C250,350 250,150 450,150 S650,250 850,250"
                                                            fill="none"
                                                            stroke="url(#gradient)"
                                                            strokeWidth="3"
                                                            strokeLinecap="round"
                                                            className="drop-shadow-[0_0_15px_rgba(255,145,77,0.4)]"
                                                        />
                                                        <defs>
                                                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                                <stop offset="0%" stopColor="#FF914D" stopOpacity="0" />
                                                                <stop offset="15%" stopColor="#FF914D" />
                                                                <stop offset="85%" stopColor="#FF914D" />
                                                                <stop offset="100%" stopColor="#FF914D" stopOpacity="0" />
                                                            </linearGradient>
                                                        </defs>
                                                    </svg>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.5, delay: 0.2, ease: appleEase }}
                                                    className="grid grid-cols-3 gap-4 shrink-0"
                                                >
                                                    {[
                                                        { label: "Safety Score", value: mainRoute.safety, color: mainRoute.stats.safetyColor },
                                                        { label: "Traffic", value: mainRoute.traffic, color: mainRoute.stats.trafficColor },
                                                        { label: "Road Quality", value: mainRoute.roadQuality, color: mainRoute.stats.roadColor },
                                                    ].map((stat, i) => (
                                                        <div key={i} className="bg-white/[0.03] rounded-2xl p-4 border border-white/[0.05] backdrop-blur-sm hover:bg-white/[0.05] transition-colors duration-500">
                                                            <p className="text-[9px] text-white/40 uppercase tracking-[0.15em] font-semibold mb-1">{stat.label}</p>
                                                            <p className={cn("text-xl font-medium tracking-tight", stat.color)}>{stat.value}</p>
                                                        </div>
                                                    ))}
                                                </motion.div>
                                            </motion.div>
                                        </AnimatePresence>

                                        <div className="mt-6 pt-4 border-t border-white/5 shrink-0">
                                            <h3 className="text-base font-semibold text-white mb-3 tracking-tight">Other Routes</h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                <AnimatePresence mode="popLayout">
                                                    {otherRoutes.map((route) => (
                                                        <motion.div
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            transition={{ duration: 0.4, ease: appleEase }}
                                                            key={route.id}
                                                            onClick={() => handleRouteSelect(route)}
                                                            className="bg-white/[0.02] rounded-xl p-4 border border-white/[0.05] hover:bg-white/[0.04] transition-colors duration-300 cursor-pointer group/route relative overflow-hidden"
                                                        >
                                                            <div className="flex justify-between items-start mb-2 relative z-10">
                                                                <div>
                                                                    <motion.h4 layoutId={`title-${route.id}`} className="text-white font-medium text-xs">{route.name}</motion.h4>
                                                                    <p className="text-white/40 text-[10px] mt-0.5">{route.distance}</p>
                                                                </div>
                                                                <span className={cn("text-[9px] uppercase tracking-wider font-semibold bg-white/5 px-1.5 py-0.5 rounded-full", route.tagColor)}>
                                                                    {route.tag}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-end justify-between relative z-10">
                                                                <motion.p layoutId={`time-${route.id}`} className="text-lg font-semibold text-white/90">{route.time}</motion.p>
                                                                <ArrowRight className="h-3.5 w-3.5 text-white/20 group-hover/route:text-white/60 group-hover/route:translate-x-1 transition-all duration-300" />
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default RoutePlanner;
