import { useState } from "react";
import { ArrowRight, Car, Train, Bus, Plane, MapPin, Navigation, Loader2, ArrowUpDown, Clock, IndianRupee, Filter, Armchair, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
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

interface CabOption {
    provider: "Uber" | "Ola" | "Rapido";
    price: string;
    eta: string;
    type: string;
    icon: string;
}

interface BusService {
    id: string;
    operator: string;
    type: string;
    departure: string;
    arrival: string;
    duration: string;
    price: string;
    rating: string;
}

interface TrainService {
    id: string;
    name: string;
    number: string;
    departure: string;
    arrival: string;
    duration: string;
    classes: {
        name: string;
        price: string;
        available: string;
    }[];
}

interface FlightService {
    id: string;
    airline: string;
    number: string;
    departure: string;
    arrival: string;
    duration: string;
    price: string;
    stops: string;
}

const mockCabs: CabOption[] = [
    { provider: "Uber", price: "₹450-520", eta: "4 min", type: "Uber Go", icon: "Car" },
    { provider: "Ola", price: "₹430-500", eta: "2 min", type: "Mini", icon: "Car" },
    { provider: "Rapido", price: "₹180-220", eta: "1 min", type: "Bike", icon: "Bike" },
];

const mockBuses: BusService[] = [
    { id: "1", operator: "Zingbus", type: "Volvo A/C Semi Sleeper (2+2)", departure: "22:00", arrival: "06:00", duration: "8h 00m", price: "₹899", rating: "4.5" },
    { id: "2", operator: "IntrCity SmartBus", type: "A/C Sleeper (2+1)", departure: "23:30", arrival: "07:15", duration: "7h 45m", price: "₹1,250", rating: "4.7" },
    { id: "3", operator: "RSRTC Express", type: "Non A/C Seater", departure: "21:00", arrival: "05:30", duration: "8h 30m", price: "₹450", rating: "3.8" },
];

const mockTrains: TrainService[] = [
    {
        id: "1", name: "Vande Bharat Exp", number: "20977", departure: "06:00", arrival: "11:30", duration: "5h 30m",
        classes: [
            { name: "CC", price: "₹1,450", available: "AVL 45" },
            { name: "EC", price: "₹2,800", available: "AVL 12" }
        ]
    },
    {
        id: "2", name: "Shatabdi Express", number: "12002", departure: "06:10", arrival: "12:15", duration: "6h 05m",
        classes: [
            { name: "CC", price: "₹1,200", available: "WL 10" },
            { name: "EC", price: "₹2,300", available: "AVL 5" }
        ]
    },
    {
        id: "3", name: "Ashram Express", number: "12916", departure: "15:20", arrival: "21:00", duration: "5h 40m",
        classes: [
            { name: "SL", price: "₹340", available: "AVL 120" },
            { name: "3A", price: "₹890", available: "RAC 5" },
            { name: "2A", price: "₹1,250", available: "AVL 2" },
            { name: "1A", price: "₹2,100", available: "WL 2" }
        ]
    }
];

const mockFlights: FlightService[] = [
    { id: "1", airline: "IndiGo", number: "6E-2045", departure: "08:00", arrival: "09:15", duration: "1h 15m", price: "₹3,450", stops: "Non-stop" },
    { id: "2", airline: "Air India", number: "AI-445", departure: "10:30", arrival: "11:50", duration: "1h 20m", price: "₹4,100", stops: "Non-stop" },
    { id: "3", airline: "Vistara", number: "UK-998", departure: "14:00", arrival: "15:15", duration: "1h 15m", price: "₹4,800", stops: "Non-stop" },
];

const FILTER_OPTIONS = {
    transit: [
        { id: "quota", label: "Quota", options: ["General", "Tatkal", "Ladies"] },
        { id: "class", label: "Class", options: ["1A", "2A", "3A", "SL", "CC"] },
        { id: "time", label: "Departure", options: ["Morning", "Afternoon", "Evening"] },
    ],
    bus: [
        { id: "type", label: "Bus Type", options: ["AC", "Non-AC", "Sleeper", "Seater"] },
        { id: "time", label: "Departure", options: ["Before 6AM", "6AM-12PM", "12PM-6PM", "After 6PM"] },
        { id: "operator", label: "Operator", options: ["Zingbus", "IntrCity", "RSRTC"] },
    ],
    flight: [
        { id: "stops", label: "Stops", options: ["Non-stop", "1 Stop"] },
        { id: "airline", label: "Airline", options: ["IndiGo", "Air India", "Vistara"] },
        { id: "time", label: "Departure", options: ["Morning", "Afternoon", "Evening"] },
    ]
};


const RoutePlanner = () => {
    const [showRoutes, setShowRoutes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedMode, setSelectedMode] = useState("flight");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [returnDate, setReturnDate] = useState<Date | undefined>();
    const [tripType, setTripType] = useState("oneway");
    const [travellers, setTravellers] = useState(1);
    const [travelClass, setTravelClass] = useState("Economy");
    const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = [new Date().getFullYear().toString(), (new Date().getFullYear() + 1).toString()];

    const updateDate = (type: 'date' | 'returnDate', part: 'day' | 'month' | 'year', value: string) => {
        const targetDate = type === 'date' ? (date || new Date()) : (returnDate || new Date());
        const newDate = new Date(targetDate);

        if (part === 'day') newDate.setDate(parseInt(value));
        if (part === 'month') newDate.setMonth(months.indexOf(value));
        if (part === 'year') newDate.setFullYear(parseInt(value));

        if (type === 'date') setDate(newDate);
        else setReturnDate(newDate);
    };

    const toggleFilter = (category: string, value: string) => {
        setActiveFilters(prev => {
            const current = prev[category] || [];
            const updated = current.includes(value)
                ? current.filter(item => item !== value)
                : [...current, value];
            return { ...prev, [category]: updated };
        });
    };

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
    const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

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

    const getPlaceholders = () => {
        switch (selectedMode) {
            case "flight": return { from: "From Airport", to: "To Airport" };
            case "transit": return { from: "From Station", to: "To Station" };
            case "bus": return { from: "From City", to: "To City" };
            default: return { from: "Pickup Location", to: "Drop Location" };
        }
    };

    const placeholders = getPlaceholders();

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

                                {/* Top Tabs: Travel Mode */}
                                <div className="grid grid-cols-4 bg-white/[0.03] p-1 rounded-2xl border border-white/[0.05]">
                                    {[
                                        { id: "flight", icon: Plane, label: "Flights" },
                                        { id: "transit", icon: Train, label: "Trains" },
                                        { id: "bus", icon: Bus, label: "Buses" },
                                        { id: "drive", icon: Car, label: "Cabs" },
                                    ].map((mode) => (
                                        <button
                                            key={mode.id}
                                            type="button"
                                            onClick={() => setSelectedMode(mode.id)}
                                            className={cn(
                                                "flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-300 gap-1.5",
                                                selectedMode === mode.id
                                                    ? "bg-white/10 text-white shadow-lg shadow-black/20"
                                                    : "text-white/40 hover:text-white/70 hover:bg-white/5"
                                            )}
                                        >
                                            <mode.icon className="w-4 h-4" />
                                            <span className="text-[10px] font-medium tracking-wide">{mode.label}</span>
                                        </button>
                                    ))}
                                </div>

                                {selectedMode === "flight" && (
                                    <div className="flex gap-4 px-1">
                                        <button
                                            type="button"
                                            onClick={() => setTripType("oneway")}
                                            className={cn("text-xs font-medium transition-colors", tripType === "oneway" ? "text-primary" : "text-white/40 hover:text-white/70")}
                                        >
                                            One Way
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setTripType("round")}
                                            className={cn("text-xs font-medium transition-colors", tripType === "round" ? "text-primary" : "text-white/40 hover:text-white/70")}
                                        >
                                            Round Trip
                                        </button>
                                    </div>
                                )}


                                <div className="flex flex-col gap-1 relative">
                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">From</Label>
                                        <div className="relative transition-all duration-500 focus-within:scale-[1.01] focus-within:z-10">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within/input:text-primary/80 transition-colors duration-500" />
                                            <Input
                                                value={origin}
                                                onChange={(e) => setOrigin(e.target.value)}
                                                placeholder={placeholders.from}
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
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">To</Label>
                                        <div className="relative transition-all duration-500 focus-within:scale-[1.01] focus-within:z-10">
                                            <Navigation className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within/input:text-primary/80 transition-colors duration-500" />
                                            <Input
                                                value={destination}
                                                onChange={(e) => setDestination(e.target.value)}
                                                placeholder={placeholders.to}
                                                className="pl-11 h-12 bg-white/[0.02] border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-0 rounded-b-2xl rounded-t-md text-[14px] text-white placeholder:text-white/20 shadow-none transition-all duration-500 ease-out"
                                            />
                                        </div>
                                    </div>

                                </div>

                                <div className={cn("grid gap-2", selectedMode === "flight" && tripType === "round" ? "grid-cols-2" : "grid-cols-1")}>
                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Departure</Label>
                                        <div className="flex gap-2">
                                            <Select value={date?.getDate().toString()} onValueChange={(v) => updateDate('date', 'day', v)}>
                                                <SelectTrigger className="w-[70px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                    <SelectValue placeholder="DD" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0f172a] border-white/10 text-white max-h-[300px]">
                                                    {days.map(d => <SelectItem key={d} value={d} className="focus:bg-white/10 focus:text-white cursor-pointer">{d}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <Select value={date ? months[date.getMonth()] : undefined} onValueChange={(v) => updateDate('date', 'month', v)}>
                                                <SelectTrigger className="flex-1 bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                    <SelectValue placeholder="Month" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                    {months.map(m => <SelectItem key={m} value={m} className="focus:bg-white/10 focus:text-white cursor-pointer">{m}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                            <Select value={date?.getFullYear().toString()} onValueChange={(v) => updateDate('date', 'year', v)}>
                                                <SelectTrigger className="w-[84px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                    {years.map(y => <SelectItem key={y} value={y} className="focus:bg-white/10 focus:text-white cursor-pointer">{y}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    {selectedMode === "flight" && tripType === "round" && (
                                        <div className="space-y-1.5 group/input">
                                            <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Return</Label>
                                            <div className="flex gap-2">
                                                <Select value={returnDate?.getDate().toString()} onValueChange={(v) => updateDate('returnDate', 'day', v)}>
                                                    <SelectTrigger className="w-[70px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                        <SelectValue placeholder="DD" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white max-h-[300px]">
                                                        {days.map(d => <SelectItem key={d} value={d} className="focus:bg-white/10 focus:text-white cursor-pointer">{d}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <Select value={returnDate ? months[returnDate.getMonth()] : undefined} onValueChange={(v) => updateDate('returnDate', 'month', v)}>
                                                    <SelectTrigger className="flex-1 bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                        <SelectValue placeholder="Month" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                        {months.map(m => <SelectItem key={m} value={m} className="focus:bg-white/10 focus:text-white cursor-pointer">{m}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                                <Select value={returnDate?.getFullYear().toString()} onValueChange={(v) => updateDate('returnDate', 'year', v)}>
                                                    <SelectTrigger className="w-[84px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                        <SelectValue placeholder="Year" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                        {years.map(y => <SelectItem key={y} value={y} className="focus:bg-white/10 focus:text-white cursor-pointer">{y}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {selectedMode === "flight" && (
                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Travellers & Class</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <motion.button
                                                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                                                    whileTap={{ scale: 0.98 }}
                                                    type="button"
                                                    className="w-full h-12 flex items-center justify-start text-left font-normal bg-white/[0.02] border border-white/[0.08] text-white rounded-2xl transition-all duration-300 pl-4 outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                                                >
                                                    <div className="p-1.5 rounded-full bg-white/5 mr-3 group-hover:bg-white/10 transition-colors">
                                                        <Armchair className="h-4 w-4 text-white/60" />
                                                    </div>
                                                    <span className="text-sm font-medium tracking-wide">
                                                        {travellers} Traveller{travellers > 1 ? 's' : ''}, {travelClass}
                                                    </span>
                                                </motion.button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-80 bg-[#0f172a]/95 backdrop-blur-xl border-white/10 p-5 text-white shadow-2xl rounded-2xl">
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold text-white/60">Travellers</label>
                                                        <div className="flex items-center justify-between bg-white/5 rounded-lg p-1 border border-white/10">
                                                            <button
                                                                type="button" // Prevent form submit
                                                                onClick={() => setTravellers(Math.max(1, travellers - 1))}
                                                                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                                                            >
                                                                -
                                                            </button>
                                                            <span className="font-medium">{travellers}</span>
                                                            <button
                                                                type="button" // Prevent form submit
                                                                onClick={() => setTravellers(Math.min(9, travellers + 1))}
                                                                className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-white/10 transition-colors"
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-semibold text-white/60">Class</label>
                                                        <div className="grid grid-cols-2 gap-2">
                                                            {["Economy", "Premium", "Business", "First"].map((cls) => (
                                                                <button
                                                                    key={cls}
                                                                    type="button" // Prevent form submit
                                                                    onClick={() => setTravelClass(cls)}
                                                                    className={cn(
                                                                        "px-3 py-2 rounded-lg text-xs font-medium border transition-all",
                                                                        travelClass === cls
                                                                            ? "bg-primary text-white border-primary"
                                                                            : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10"
                                                                    )}
                                                                >
                                                                    {cls}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )}

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
                                        className="w-full h-full p-8 relative z-20 flex flex-col overflow-y-auto"
                                    >
                                        <AnimatePresence mode="wait">
                                            {selectedMode === "drive" && (
                                                <motion.div
                                                    key="drive"
                                                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                                    transition={{ duration: 0.5, ease: appleEase }}
                                                    className="flex-1 flex flex-col min-h-0"
                                                >
                                                    <div className="flex justify-between items-end mb-6 shrink-0">
                                                        <div>
                                                            <motion.h2 layoutId={`name-${mainRoute.id}`} className="text-2xl font-semibold text-white mb-1 tracking-tight">
                                                                {mainRoute.name}
                                                            </motion.h2>
                                                            <div className="flex items-center gap-2">
                                                                <span className="flex h-1.5 w-1.5 relative">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                                                                </span>
                                                                <motion.p layoutId={`tag-${mainRoute.id}`} className={cn("font-medium text-xs tracking-wide uppercase", mainRoute.tagColor)}>{mainRoute.tag}</motion.p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <motion.p layoutId={`time-${mainRoute.id}`} className="text-4xl font-semibold text-white tracking-tighter">
                                                                {mainRoute.time}
                                                            </motion.p>
                                                            <p className="text-white/40 font-light mt-0.5 text-base">{mainRoute.distance}</p>
                                                        </div>
                                                    </div>

                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        transition={{ duration: 0.6, delay: 0.1, ease: appleEase }}
                                                        className="flex-1 bg-white/[0.02] rounded-[1.5rem] border border-white/[0.05] relative overflow-hidden mb-6 shadow-inner min-h-[200px]"
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

                                                    <div className="mt-auto">
                                                        <h3 className="text-base font-semibold text-white mb-3 tracking-tight">Ride Options</h3>
                                                        <div className="grid grid-cols-3 gap-3">
                                                            {mockCabs.map((cab, i) => (
                                                                <div key={i} className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.05] hover:bg-white/[0.05] transition-colors cursor-pointer group">
                                                                    <div className="flex justify-between items-start mb-2">
                                                                        <span className="text-xs font-medium text-white/60 group-hover:text-white transition-colors">{cab.provider}</span>
                                                                        <span className="text-xs font-bold text-primary">{cab.price}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <Car className="h-3 w-3 text-white/40" />
                                                                        <span className="text-xs text-white">{cab.type}</span>
                                                                    </div>
                                                                    <p className="text-[10px] text-emerald-400">{cab.eta} away</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {selectedMode === "bus" && (
                                                <motion.div
                                                    key="bus"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: appleEase }}
                                                    className="flex-1 flex flex-col gap-4 pr-2"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h2 className="text-2xl font-semibold text-white tracking-tight">Available Buses</h2>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs gap-2">
                                                                    <Filter className="w-3 h-3" /> Filters
                                                                    {Object.values(activeFilters).flat().length > 0 && (
                                                                        <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                                                            {Object.values(activeFilters).flat().length}
                                                                        </span>
                                                                    )}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-80 bg-[#0f172a] border-white/10 p-0 text-white">
                                                                <div className="p-4 border-b border-white/10">
                                                                    <h4 className="font-semibold">Filters</h4>
                                                                </div>
                                                                <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
                                                                    {FILTER_OPTIONS.bus.map((category) => (
                                                                        <div key={category.id} className="space-y-3">
                                                                            <h5 className="text-xs font-medium text-white/40 uppercase tracking-wider">{category.label}</h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {category.options.map((opt) => (
                                                                                    <button
                                                                                        key={opt}
                                                                                        onClick={() => toggleFilter(category.id, opt)}
                                                                                        className={cn(
                                                                                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                                                                                            activeFilters[category.id]?.includes(opt)
                                                                                                ? "bg-primary text-white border-primary"
                                                                                                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                                                                                        )}
                                                                                    >
                                                                                        {opt}
                                                                                    </button>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                                                                    <button
                                                                        onClick={() => setActiveFilters({})}
                                                                        className="text-xs text-white/60 hover:text-white transition-colors"
                                                                    >
                                                                        Clear all
                                                                    </button>
                                                                    <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 text-white text-xs">
                                                                        Apply
                                                                    </Button>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    {mockBuses.filter(bus => {
                                                        if (activeFilters.type?.length && !activeFilters.type.some(t => bus.type.includes(t))) return false;
                                                        if (activeFilters.operator?.length && !activeFilters.operator.includes(bus.operator)) return false;
                                                        return true;
                                                    }).map((bus) => (
                                                        <motion.div
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            key={bus.id}
                                                            className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05] hover:bg-white/[0.05] transition-all group"
                                                        >
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <h3 className="text-lg font-medium text-white group-hover:text-primary transition-colors">{bus.operator}</h3>
                                                                    <p className="text-sm text-white/40">{bus.type}</p>
                                                                </div>
                                                                <div className="text-right">
                                                                    <p className="text-xl font-bold text-white">{bus.price}</p>
                                                                    <div className="flex items-center justify-end gap-1 text-emerald-400">
                                                                        <span className="text-xs font-medium">{bus.rating}</span>
                                                                        <span className="text-[10px]">★</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center justify-between text-sm text-white/60 bg-white/[0.02] p-3 rounded-xl">
                                                                <div className="text-center">
                                                                    <p className="text-white font-medium">{bus.departure}</p>
                                                                    <p className="text-[10px] uppercase tracking-wider opacity-60">Departs</p>
                                                                </div>
                                                                <div className="flex flex-col items-center px-4">
                                                                    <p className="text-[10px] text-white/30 mb-1">{bus.duration}</p>
                                                                    <div className="w-16 h-[1px] bg-white/10 relative">
                                                                        <div className="absolute -top-1 right-0 w-2 h-2 border-t border-r border-white/20 rotate-45" />
                                                                    </div>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-white font-medium">{bus.arrival}</p>
                                                                    <p className="text-[10px] uppercase tracking-wider opacity-60">Arrives</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}

                                            {selectedMode === "transit" && (
                                                <motion.div
                                                    key="train"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: appleEase }}
                                                    className="flex-1 flex flex-col gap-4 pr-2"
                                                >
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex justify-between items-center">
                                                            <h2 className="text-2xl font-semibold text-white tracking-tight">Trains</h2>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs gap-2">
                                                                        <Filter className="w-3 h-3" /> Filters
                                                                        {Object.values(activeFilters).flat().length > 0 && (
                                                                            <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                                                                {Object.values(activeFilters).flat().length}
                                                                            </span>
                                                                        )}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-80 bg-[#0f172a] border-white/10 p-0 text-white">
                                                                    <div className="p-4 border-b border-white/10">
                                                                        <h4 className="font-semibold">Filters</h4>
                                                                    </div>
                                                                    <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
                                                                        {FILTER_OPTIONS.transit.map((category) => (
                                                                            <div key={category.id} className="space-y-3">
                                                                                <h5 className="text-xs font-medium text-white/40 uppercase tracking-wider">{category.label}</h5>
                                                                                <div className="flex flex-wrap gap-2">
                                                                                    {category.options.map((opt) => (
                                                                                        <button
                                                                                            key={opt}
                                                                                            onClick={() => toggleFilter(category.id, opt)}
                                                                                            className={cn(
                                                                                                "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                                                                                                activeFilters[category.id]?.includes(opt)
                                                                                                    ? "bg-primary text-white border-primary"
                                                                                                    : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                                                                                            )}
                                                                                        >
                                                                                            {opt}
                                                                                        </button>
                                                                                    ))}
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                                                                        <button
                                                                            onClick={() => setActiveFilters({})}
                                                                            className="text-xs text-white/60 hover:text-white transition-colors"
                                                                        >
                                                                            Clear all
                                                                        </button>
                                                                        <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 text-white text-xs">
                                                                            Apply
                                                                        </Button>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                        </div>
                                                    </div>
                                                    {mockTrains.filter(train => {
                                                        if (activeFilters.class?.length && !activeFilters.class.some(c => train.classes.some(cls => cls.name === c))) return false;
                                                        return true;
                                                    }).map((train) => (
                                                        <motion.div
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            key={train.id}
                                                            className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05] hover:bg-white/[0.05] transition-all"
                                                        >
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div>
                                                                    <div className="flex items-center gap-2 mb-1">
                                                                        <h3 className="text-lg font-medium text-white">{train.name}</h3>
                                                                        <span className="text-xs bg-white/10 px-1.5 py-0.5 rounded text-white/60">{train.number}</span>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 text-sm text-white/40">
                                                                        <span>{train.departure}</span>
                                                                        <span className="text-white/20">•</span>
                                                                        <span>{train.duration}</span>
                                                                        <span className="text-white/20">•</span>
                                                                        <span>{train.arrival}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="grid grid-cols-4 gap-2">
                                                                {train.classes.map((cls, idx) => (
                                                                    <div key={idx} className={cn(
                                                                        "bg-white/[0.02] p-2 rounded-lg border border-white/[0.05] hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-pointer text-center group/cls",
                                                                        activeFilters.class?.includes(cls.name) && "border-primary/50 bg-primary/10"
                                                                    )}>
                                                                        <div className="flex justify-between items-center mb-1">
                                                                            <span className="text-xs font-bold text-white group-hover/cls:text-primary">{cls.name}</span>
                                                                            <span className={cn("text-[10px]", cls.available.includes("AVL") ? "text-emerald-400" : "text-amber-400")}>
                                                                                {cls.available}
                                                                            </span>
                                                                        </div>
                                                                        <p className="text-sm font-medium text-white/80">{cls.price}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}

                                            {selectedMode === "flight" && (
                                                <motion.div
                                                    key="flight"
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.5, ease: appleEase }}
                                                    className="flex-1 flex flex-col gap-4 pr-2"
                                                >
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h2 className="text-2xl font-semibold text-white tracking-tight">Flights</h2>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" size="sm" className="h-8 border-white/10 bg-white/5 text-white hover:bg-white/10 text-xs gap-2">
                                                                    <Filter className="w-3 h-3" /> Filters
                                                                    {Object.values(activeFilters).flat().length > 0 && (
                                                                        <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
                                                                            {Object.values(activeFilters).flat().length}
                                                                        </span>
                                                                    )}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-80 bg-[#0f172a] border-white/10 p-0 text-white">
                                                                <div className="p-4 border-b border-white/10">
                                                                    <h4 className="font-semibold">Filters</h4>
                                                                </div>
                                                                <div className="p-4 space-y-6 max-h-[60vh] overflow-y-auto">
                                                                    {FILTER_OPTIONS.flight.map((category) => (
                                                                        <div key={category.id} className="space-y-3">
                                                                            <h5 className="text-xs font-medium text-white/40 uppercase tracking-wider">{category.label}</h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {category.options.map((opt) => (
                                                                                    <button
                                                                                        key={opt}
                                                                                        onClick={() => toggleFilter(category.id, opt)}
                                                                                        className={cn(
                                                                                            "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                                                                                            activeFilters[category.id]?.includes(opt)
                                                                                                ? "bg-primary text-white border-primary"
                                                                                                : "bg-white/5 text-white/80 border-white/10 hover:bg-white/10"
                                                                                        )}
                                                                                    >
                                                                                        {opt}
                                                                                    </button>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className="p-4 border-t border-white/10 bg-white/5 flex justify-between items-center">
                                                                    <button
                                                                        onClick={() => setActiveFilters({})}
                                                                        className="text-xs text-white/60 hover:text-white transition-colors"
                                                                    >
                                                                        Clear all
                                                                    </button>
                                                                    <Button size="sm" className="h-8 bg-primary hover:bg-primary/90 text-white text-xs">
                                                                        Apply
                                                                    </Button>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    {mockFlights.filter(flight => {
                                                        if (activeFilters.airline?.length && !activeFilters.airline.includes(flight.airline)) return false;
                                                        if (activeFilters.stops?.length && !activeFilters.stops.includes(flight.stops)) return false;
                                                        return true;
                                                    }).map((flight) => (
                                                        <motion.div
                                                            layout
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            key={flight.id}
                                                            className="bg-white/[0.03] rounded-2xl p-5 border border-white/[0.05] hover:bg-white/[0.05] transition-all group"
                                                        >
                                                            <div className="flex justify-between items-start mb-4">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center">
                                                                        <Plane className="h-5 w-5 text-white/60" />
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-lg font-medium text-white">{flight.airline}</h3>
                                                                        <p className="text-xs text-white/40">{flight.number}</p>
                                                                    </div>
                                                                </div>
                                                                <p className="text-xl font-bold text-white group-hover:text-primary transition-colors">{flight.price}</p>
                                                            </div>
                                                            <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-xl border border-white/[0.02]">
                                                                <div className="text-center">
                                                                    <p className="text-xl font-medium text-white">{flight.departure}</p>
                                                                    <p className="text-xs text-white/40">DEL</p>
                                                                </div>
                                                                <div className="flex flex-col items-center px-6 flex-1">
                                                                    <p className="text-[10px] text-white/40 mb-1">{flight.duration}</p>
                                                                    <div className="w-full h-[1px] bg-white/10 relative flex items-center justify-center">
                                                                        <Plane className="h-3 w-3 text-white/20 rotate-90 absolute" />
                                                                    </div>
                                                                    <p className="text-[10px] text-emerald-400 mt-1">{flight.stops}</p>
                                                                </div>
                                                                <div className="text-center">
                                                                    <p className="text-xl font-medium text-white">{flight.arrival}</p>
                                                                    <p className="text-xs text-white/40">BOM</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {selectedMode === "drive" && (
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
                                                                    <motion.h4 layoutId={`name-${route.id}`} className="font-medium text-white text-sm">{route.name}</motion.h4>
                                                                    <motion.span layoutId={`tag-${route.id}`} className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-white/5 uppercase tracking-wider", route.tagColor)}>
                                                                        {route.tag}
                                                                    </motion.span>
                                                                </div>
                                                                <div className="flex items-end justify-between relative z-10">
                                                                    <div>
                                                                        <motion.p layoutId={`time-${route.id}`} className="text-xl font-semibold text-white tracking-tight">{route.time}</motion.p>
                                                                        <p className="text-xs text-white/40 font-light">{route.distance}</p>
                                                                    </div>
                                                                    <div className="p-1.5 rounded-full bg-white/5 group-hover/route:bg-white/10 transition-colors">
                                                                        <ArrowRight className="h-3 w-3 text-white/60" />
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        )}
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
