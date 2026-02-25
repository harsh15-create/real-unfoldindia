import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { ArrowRight, Car, MapPin, Navigation, Loader2, ArrowUpDown, ShieldCheck, ChevronDown, Check, Gauge, AlertCircle, Crosshair, X, Locate, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { fetchRoutes, type RouteInfo, type RouteResponse, type Coordinate } from "@/lib/route-api";
import { MapContainer, TileLayer, Polyline, useMap, LayersControl, CircleMarker, Marker } from "react-leaflet";
import L from "leaflet";
import type { LatLngTuple, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigation } from "@/hooks/useNavigation";

// ─── Derived UI data from API response ───
interface RouteData {
    id: string;
    name: string;
    badges: { emoji: string; label: string }[];
    time: string;
    distance: string;
    safety: string;
    safetyScore: number;
    traffic: string;
    trafficLevel: "Low" | "Moderate" | "High";
    roadQuality: string;
    highwayLabel: string;
    tagColor: string;
    geometry: [number, number][];  // [lat, lng][] for Leaflet
    stats: {
        safetyColor: string;
        trafficColor: string;
        roadColor: string;
    };
}

// ─── Helpers ───

function formatDuration(minutes: number): string {
    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
}

function getStatColors(trafficLevel: string, safetyScore: number) {
    const safetyColor = safetyScore >= 7 ? "text-emerald-400" : safetyScore >= 5 ? "text-yellow-400" : "text-red-400";
    const trafficColor = trafficLevel === "Low" ? "text-emerald-400" : trafficLevel === "Moderate" ? "text-amber-400" : "text-red-400";
    const roadColor = "text-blue-400";
    return { safetyColor, trafficColor, roadColor };
}

function assignBadges(routes: RouteInfo[]): Map<string, { emoji: string; label: string }[]> {
    const badges = new Map<string, { emoji: string; label: string }[]>();
    if (!routes.length) return badges;
    const safest = routes.reduce((a, b) => a.safety_score >= b.safety_score ? a : b);
    const fastest = routes.reduce((a, b) => a.duration_minutes <= b.duration_minutes ? a : b);
    for (const r of routes) {
        const b: { emoji: string; label: string }[] = [];
        if (r.id === safest.id) b.push({ emoji: "🟢", label: "Safest Route" });
        if (r.id === fastest.id) b.push({ emoji: "⚡", label: "Fastest Route" });
        if (b.length === 0) b.push({ emoji: "🌄", label: "Most Scenic" });
        badges.set(r.id, b);
    }
    return badges;
}

function apiToRouteData(route: RouteInfo, badges: { emoji: string; label: string }[]): RouteData {
    const statColors = getStatColors(route.traffic_level, route.safety_score);
    const geometry: [number, number][] = route.geometry.coordinates.map(
        ([lng, lat]) => [lat, lng] as [number, number]
    );
    return {
        id: route.id,
        name: route.name,
        badges,
        time: formatDuration(route.duration_minutes),
        distance: `${route.distance_km} km`,
        safety: `${Math.round(route.safety_score * 10)}%`,
        safetyScore: route.safety_score,
        traffic: route.traffic_level,
        trafficLevel: route.traffic_level,
        roadQuality: route.road_quality,
        highwayLabel: route.road_summary,
        tagColor: route.safety_score >= 7 ? "text-primary/90" : route.safety_score >= 5 ? "text-yellow-400" : "text-red-400",
        geometry,
        stats: statColors,
    };
}

// ─── Map controller: invalidateSize + smooth animated fitBounds ───
function MapController({ positions }: { positions: LatLngTuple[] }) {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        if (positions.length > 1) {
            const bounds = L.latLngBounds(positions);
            map.fitBounds(bounds, {
                padding: [60, 60],
                maxZoom: 13,
                animate: true,
                duration: 0.5,
            });
        }
    }, [positions, map]);

    return null;
}

// ─── Navigation auto-center: smooth pan to user position ───
function NavigationAutoCenter({ position, enabled }: { position: [number, number] | null; enabled: boolean }) {
    const map = useMap();

    useEffect(() => {
        if (enabled && position) {
            map.panTo(position, { animate: true, duration: 0.4 });
        }
    }, [position, enabled, map]);

    // Disable auto-center when user drags the map
    useEffect(() => {
        const onDragStart = () => {
            // We don't set state here — the parent reads the toggle
        };
        map.on("dragstart", onDragStart);
        return () => { map.off("dragstart", onDragStart); };
    }, [map]);

    return null;
}

// ─── Custom arrow icon for user position marker ───
function createUserIcon(heading: number | null) {
    const rotation = heading ?? 0;
    return L.divIcon({
        className: "user-nav-marker",
        html: `<div style="transform: rotate(${rotation}deg); width: 24px; height: 24px; display: flex; align-items: center; justify-content: center;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="rgba(59,130,246,0.3)" />
                <circle cx="12" cy="12" r="6" fill="#3b82f6" stroke="#fff" stroke-width="2" />
                <polygon points="12,2 15,10 12,8 9,10" fill="#3b82f6" stroke="#fff" stroke-width="1" />
            </svg>
        </div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
    });
}

const RoutePlanner = () => {
    const [showRoutes, setShowRoutes] = useState(false);
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [showWhyRecommended, setShowWhyRecommended] = useState(false);
    const [compareMode, setCompareMode] = useState(false);
    const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Route data from API
    const [mainRoute, setMainRoute] = useState<RouteData | null>(null);
    const [otherRoutes, setOtherRoutes] = useState<RouteData[]>([]);
    const [originCoords, setOriginCoords] = useState<Coordinate | null>(null);
    const [destCoords, setDestCoords] = useState<Coordinate | null>(null);

    // Raw OSRM steps for navigation (from the main/recommended route)
    const [rawSteps, setRawSteps] = useState<any[] | null>(null);

    // Track if map has been shown at least once (prevents remount)
    const [mapReady, setMapReady] = useState(false);

    const mapRef = useRef<LeafletMap | null>(null);

    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = [new Date().getFullYear().toString(), (new Date().getFullYear() + 1).toString()];

    const updateDate = (part: 'day' | 'month' | 'year', value: string) => {
        const newDate = new Date(date || new Date());
        if (part === 'day') newDate.setDate(parseInt(value));
        if (part === 'month') newDate.setMonth(months.indexOf(value));
        if (part === 'year') newDate.setFullYear(parseInt(value));
        setDate(newDate);
    };

    const handleRouteSelect = (selected: RouteData) => {
        if (!mainRoute) return;
        const oldMain = mainRoute;
        setMainRoute(selected);
        setOtherRoutes(prev => prev.map(r => r.id === selected.id ? oldMain : r));
        setShowWhyRecommended(false);
    };

    const handlePlan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!origin || !destination) return;
        setLoading(true);
        setError(null);

        try {
            const response: RouteResponse = await fetchRoutes(origin, destination);
            const badgeMap = assignBadges(response.routes);
            const allRoutes = response.routes.map(r =>
                apiToRouteData(r, badgeMap.get(r.id) || [])
            );

            if (allRoutes.length > 0) {
                setMainRoute(allRoutes[0]);
                setOtherRoutes(allRoutes.slice(1));
                setOriginCoords(response.origin_coords);
                setDestCoords(response.destination_coords);
                setShowRoutes(true);
                setMapReady(true);

                // Store raw steps from the first (recommended) route for navigation
                const firstRoute = response.routes[0];
                if (firstRoute?.steps) {
                    setRawSteps(firstRoute.steps);
                }
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch routes. Please try again.");
            setShowRoutes(false);
        } finally {
            setLoading(false);
        }
    };

    // Invalidate map size after route data or loading state changes
    useEffect(() => {
        if (mapRef.current) {
            const timer = setTimeout(() => {
                mapRef.current?.invalidateSize();
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [showRoutes, mainRoute, loading]);

    // Map center
    const mapCenter = useMemo<LatLngTuple>(() => {
        if (originCoords && destCoords) {
            return [
                (originCoords.lat + destCoords.lat) / 2,
                (originCoords.lng + destCoords.lng) / 2,
            ];
        }
        return [22.5, 78.9];
    }, [originCoords, destCoords]);

    // Main route positions for fit bounds
    const mainPositions = useMemo<LatLngTuple[]>(() => {
        if (!mainRoute) return [];
        return mainRoute.geometry as LatLngTuple[];
    }, [mainRoute]);

    // ── Navigation hook ──
    const nav = useNavigation({
        routeSteps: rawSteps,
        routePolyline: mainPositions.length > 0 ? mainPositions as [number, number][] : null,
    });

    // Memoized user marker icon (updates on heading change)
    const userIcon = useMemo(
        () => createUserIcon(nav.position?.heading ?? null),
        [nav.position?.heading],
    );

    const appleEase: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2, ease: appleEase, duration: 0.8 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: appleEase } },
    };

    const trafficLevelColor = (level: string) => {
        switch (level) {
            case "Low": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
            case "Moderate": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
            case "High": return "text-red-400 bg-red-400/10 border-red-400/20";
            default: return "text-white/40 bg-white/5 border-white/10";
        }
    };

    const SafetyBar = ({ score, size = "md" }: { score: number; size?: "sm" | "md" }) => (
        <div className={cn("flex items-center", size === "sm" ? "gap-2" : "gap-3")}>
            <ShieldCheck className={cn("text-emerald-400 flex-shrink-0", size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5")} />
            <div className="flex-1 flex items-center gap-3">
                <div className={cn("flex-1 rounded-full bg-white/[0.06] overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5")}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(score / 10) * 100}%` }}
                        transition={{ duration: 1.2, ease: appleEase, delay: 0.3 }}
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                        style={{ boxShadow: "0 0 12px rgba(52, 211, 153, 0.3)" }}
                    />
                </div>
                <span className={cn("font-bold text-emerald-400 tabular-nums whitespace-nowrap", size === "sm" ? "text-xs" : "text-base")}>
                    {score.toFixed(1)}
                    <span className="text-white/30 font-normal text-xs">/10</span>
                </span>
            </div>
        </div>
    );

    // ─── Determine right panel content state ───
    const panelState: "placeholder" | "loading" | "error" | "results" =
        loading ? "loading" : error ? "error" : showRoutes && mainRoute ? "results" : "placeholder";

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0f172a] text-foreground selection:bg-primary/30 selection:text-white relative font-sans antialiased flex flex-col">
            {/* Subtle Noise Texture */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

            {/* Deep Ambient Gradients */}
            <div className="fixed top-[-20%] left-[20%] w-[1000px] h-[1000px] rounded-full bg-blue-900/10 blur-[150px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px] pointer-events-none" />

            {/* Keyframes */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                .shimmer-loading {
                    background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
                    background-size: 200% 100%;
                    animation: shimmer 1.8s ease-in-out infinite;
                }
                /* Dark Leaflet Overrides */
                .dark-map .leaflet-control-zoom a { background: rgba(15,23,42,0.9); color: #fff; border-color: rgba(255,255,255,0.1); }
                .dark-map .leaflet-control-zoom a:hover { background: rgba(30,41,59,0.95); }
                .dark-map .leaflet-control-attribution { background: rgba(15,23,42,0.7) !important; color: rgba(255,255,255,0.3) !important; font-size: 9px; }
                .dark-map .leaflet-control-attribution a { color: rgba(255,145,77,0.6) !important; }
                /* Layer control dark styling */
                .dark-map .leaflet-control-layers {
                    background: rgba(15,23,42,0.92) !important;
                    border: 1px solid rgba(255,255,255,0.08) !important;
                    border-radius: 12px !important;
                    backdrop-filter: blur(12px);
                    box-shadow: 0 8px 32px rgba(0,0,0,0.5) !important;
                    color: rgba(255,255,255,0.7) !important;
                    padding: 8px 12px !important;
                }
                .dark-map .leaflet-control-layers-toggle {
                    background-color: rgba(15,23,42,0.9) !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    border-radius: 8px !important;
                    width: 32px !important; height: 32px !important;
                    background-size: 18px 18px !important;
                }
                .dark-map .leaflet-control-layers-separator {
                    border-top-color: rgba(255,255,255,0.08) !important;
                }
                .dark-map .leaflet-control-layers label {
                    color: rgba(255,255,255,0.65) !important;
                    font-size: 11px !important;
                }
                .dark-map .leaflet-control-layers label:hover {
                    color: rgba(255,255,255,0.9) !important;
                }
                /* Ensure Leaflet containers fill width */
                .leaflet-container { width: 100% !important; }
                /* Route glow animation */
                @keyframes routePulse {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                /* User navigation marker */
                .user-nav-marker { background: none !important; border: none !important; }
                /* Navigation panel glass */
                .nav-instruction-panel {
                    background: rgba(15,23,42,0.88);
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                }
                .nav-off-route {
                    background: rgba(239,68,68,0.12);
                    border: 1px solid rgba(239,68,68,0.25);
                    border-radius: 12px;
                    backdrop-filter: blur(8px);
                }
            `}</style>

            <div className="container mx-auto max-w-7xl px-6 md:px-12 pt-20 pb-12 relative z-10 flex-1 flex flex-col">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid lg:grid-cols-12 gap-14"
                >
                    {/* ═══════════════════════════════════════════════════════ */}
                    {/* LEFT INPUT PANEL                                       */}
                    {/* ═══════════════════════════════════════════════════════ */}
                    <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col justify-start min-w-0">
                        <div className="mb-8 pl-2">
                            <h1 className="text-4xl font-semibold tracking-tight text-white mb-2">
                                Plan your <span className="text-primary/90">journey</span>.
                            </h1>
                            <p className="text-white/60 text-base font-light leading-relaxed tracking-wide">
                                Safety-first routing for every journey.
                            </p>
                        </div>

                        {/* Apple Glass Card */}
                        <div className="backdrop-blur-2xl bg-white/[0.03] border border-white/[0.06] p-6 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.04]">
                            <form onSubmit={handlePlan} className="space-y-6 relative z-10">

                                {/* Single Tab: Road Routes */}
                                <div className="bg-white/[0.03] p-1 rounded-2xl border border-white/[0.05]">
                                    <div className="flex items-center justify-center py-2.5 rounded-xl bg-white/10 text-white shadow-lg shadow-black/20 gap-2">
                                        <Car className="w-4 h-4" />
                                        <span className="text-xs font-medium tracking-wide">Road Routes</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1 relative">
                                    <div className="space-y-1.5 group/input">
                                        <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">From</Label>
                                        <div className="relative transition-all duration-500 focus-within:scale-[1.01] focus-within:z-10">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30 group-focus-within/input:text-primary/80 transition-colors duration-500" />
                                            <Input
                                                value={origin}
                                                onChange={(e) => setOrigin(e.target.value)}
                                                placeholder="e.g. Delhi"
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
                                                placeholder="e.g. Jaipur"
                                                className="pl-11 h-12 bg-white/[0.02] border-white/[0.08] focus:border-primary/30 focus:bg-white/[0.05] focus:ring-0 rounded-b-2xl rounded-t-md text-[14px] text-white placeholder:text-white/20 shadow-none transition-all duration-500 ease-out"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Departure Date */}
                                <div className="space-y-1.5 group/input">
                                    <Label className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] ml-1">Departure</Label>
                                    <div className="flex gap-2">
                                        <Select value={date?.getDate().toString()} onValueChange={(v) => updateDate('day', v)}>
                                            <SelectTrigger className="w-[70px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                <SelectValue placeholder="DD" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0f172a] border-white/10 text-white max-h-[300px]">
                                                {days.map(d => <SelectItem key={d} value={d} className="focus:bg-white/10 focus:text-white cursor-pointer">{d}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select value={date ? months[date.getMonth()] : undefined} onValueChange={(v) => updateDate('month', v)}>
                                            <SelectTrigger className="flex-1 bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                <SelectValue placeholder="Month" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                {months.map(m => <SelectItem key={m} value={m} className="focus:bg-white/10 focus:text-white cursor-pointer">{m}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <Select value={date?.getFullYear().toString()} onValueChange={(v) => updateDate('year', v)}>
                                            <SelectTrigger className="w-[84px] bg-white/[0.02] border-white/[0.08] text-white rounded-2xl h-12 focus:ring-primary/20">
                                                <SelectValue placeholder="Year" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-[#0f172a] border-white/10 text-white">
                                                {years.map(y => <SelectItem key={y} value={y} className="focus:bg-white/10 focus:text-white cursor-pointer">{y}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="space-y-2">
                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-12 text-[14px] font-medium bg-primary text-white hover:bg-primary/90 hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 rounded-2xl shadow-[0_0_25px_-5px_rgba(255,145,77,0.3)] hover:shadow-[0_0_35px_-5px_rgba(255,145,77,0.5)] transition-all duration-500 ease-out group/btn overflow-hidden relative border-none"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            {loading ? (
                                                <>
                                                    <Loader2 className="h-4 w-4 animate-spin opacity-80" />
                                                    <span className="opacity-80">Analyzing...</span>
                                                </>
                                            ) : (
                                                <>
                                                    Analyze Routes
                                                    <ArrowRight className="h-4 w-4 opacity-80 group-hover/btn:translate-x-1 transition-transform duration-500 ease-out" />
                                                </>
                                            )}
                                        </span>
                                    </Button>
                                    <p className="text-center text-[10px] text-white/30 tracking-wide font-light">
                                        AI-powered safety & efficiency analysis
                                    </p>
                                </div>

                            </form>
                        </div>
                    </motion.div>

                    {/* ═══════════════════════════════════════════════════════ */}
                    {/* RIGHT PANEL — Stable layout structure                  */}
                    {/* Map is ALWAYS mounted once shown, never remounted.     */}
                    {/* Route info + alternate cards are separate sections.    */}
                    {/* ═══════════════════════════════════════════════════════ */}
                    <motion.div variants={itemVariants} className="lg:col-span-8 flex flex-col gap-6 min-w-0">

                        {/* ── SECTION 1: MAP (always mounted after first load, never re-rendered) ── */}
                        <div
                            className={cn(
                                "w-full rounded-2xl border border-white/[0.05] overflow-hidden relative transition-opacity duration-500",
                                mapReady ? "opacity-100" : "opacity-0 pointer-events-none"
                            )}
                            style={{ minHeight: mapReady ? 400 : 0, height: mapReady ? 400 : 0 }}
                        >
                            {mapReady && (
                                <MapContainer
                                    center={mapCenter}
                                    zoom={7}
                                    className="dark-map"
                                    style={{ height: "100%", width: "100%", background: "#0a0f1a" }}
                                    zoomControl={true}
                                    attributionControl={true}
                                    scrollWheelZoom={false}
                                    ref={mapRef}
                                >
                                    <LayersControl position="topright">
                                        <LayersControl.BaseLayer checked name="Dark">
                                            <TileLayer
                                                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
                                            />
                                        </LayersControl.BaseLayer>
                                        <LayersControl.BaseLayer name="Standard">
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                        </LayersControl.BaseLayer>
                                        <LayersControl.BaseLayer name="Satellite">
                                            <TileLayer
                                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                                attribution='&copy; Esri, Maxar, Earthstar Geographics'
                                            />
                                        </LayersControl.BaseLayer>
                                        <LayersControl.BaseLayer name="Terrain">
                                            <TileLayer
                                                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
                                            />
                                        </LayersControl.BaseLayer>
                                    </LayersControl>

                                    {/* ── Alternate routes: shadow + line (behind) ── */}
                                    {otherRoutes.map((route) => {
                                        const isHovered = hoveredRouteId === route.id;
                                        return [
                                            /* Shadow layer */
                                            <Polyline
                                                key={`${route.id}-shadow`}
                                                positions={route.geometry as LatLngTuple[]}
                                                pathOptions={{
                                                    color: "#000000",
                                                    weight: isHovered ? 8 : 6,
                                                    opacity: 0.3,
                                                    dashArray: "6 4",
                                                }}
                                            />,
                                            /* Main line */
                                            <Polyline
                                                key={route.id}
                                                positions={route.geometry as LatLngTuple[]}
                                                pathOptions={{
                                                    color: isHovered ? "#60a5fa" : "#6b7280",
                                                    weight: isHovered ? 5 : 4,
                                                    opacity: isHovered ? 0.95 : 0.45,
                                                    dashArray: "6 4",
                                                }}
                                            />,
                                        ];
                                    })}

                                    {/* ── Safest route: triple-layer glow ── */}
                                    {mainRoute && (
                                        <>
                                            {/* Layer 1: shadow */}
                                            <Polyline
                                                positions={mainRoute.geometry as LatLngTuple[]}
                                                pathOptions={{
                                                    color: "#065f46",
                                                    weight: 14,
                                                    opacity: 0.2,
                                                    lineCap: "round",
                                                    lineJoin: "round",
                                                }}
                                            />
                                            {/* Layer 2: glow */}
                                            <Polyline
                                                positions={mainRoute.geometry as LatLngTuple[]}
                                                pathOptions={{
                                                    color: "#34d399",
                                                    weight: 10,
                                                    opacity: 0.25,
                                                    lineCap: "round",
                                                    lineJoin: "round",
                                                }}
                                            />
                                            {/* Layer 3: main line */}
                                            <Polyline
                                                positions={mainRoute.geometry as LatLngTuple[]}
                                                pathOptions={{
                                                    color: "#10b981",
                                                    weight: 7,
                                                    opacity: 0.9,
                                                    lineCap: "round",
                                                    lineJoin: "round",
                                                }}
                                            />
                                        </>
                                    )}

                                    {/* ── Origin / Destination markers ── */}
                                    {originCoords && (
                                        <CircleMarker
                                            center={[originCoords.lat, originCoords.lng] as LatLngTuple}
                                            pathOptions={{ color: "#ff916d", fillColor: "#ff916d", fillOpacity: 1, weight: 3 }}
                                            radius={7}
                                        />
                                    )}
                                    {destCoords && (
                                        <CircleMarker
                                            center={[destCoords.lat, destCoords.lng] as LatLngTuple}
                                            pathOptions={{ color: "#10b981", fillColor: "#10b981", fillOpacity: 1, weight: 3 }}
                                            radius={7}
                                        />
                                    )}

                                    {/* ── User live position marker ── */}
                                    {nav.active && nav.position && (
                                        <Marker
                                            position={[nav.position.lat, nav.position.lng] as LatLngTuple}
                                            icon={userIcon}
                                        />
                                    )}

                                    <MapController positions={nav.active ? [] : mainPositions} />
                                    {nav.active && (
                                        <NavigationAutoCenter
                                            position={nav.position ? [nav.position.lat, nav.position.lng] : null}
                                            enabled={nav.autoCenterEnabled}
                                        />
                                    )}
                                </MapContainer>
                            )}
                        </div>

                        {/* ── NAVIGATION CONTROLS (between map and content area) ── */}
                        {showRoutes && mainRoute && (
                            <div className="flex flex-col gap-3">
                                {/* Start / Stop button row */}
                                <div className="flex items-center gap-3">
                                    {!nav.active ? (
                                        <Button
                                            onClick={nav.startNavigation}
                                            className="flex-1 h-11 bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-[0_0_20px_-5px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.6)] transition-all duration-300 text-sm font-medium"
                                        >
                                            <Navigation className="h-4 w-4 mr-2" />
                                            Start Navigation
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={nav.stopNavigation}
                                                variant="ghost"
                                                className="flex-1 h-11 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl transition-all duration-300 text-sm font-medium"
                                            >
                                                <X className="h-4 w-4 mr-2" />
                                                Stop Navigation
                                            </Button>
                                            <Button
                                                onClick={nav.toggleAutoCenter}
                                                variant="ghost"
                                                size="icon"
                                                className={cn(
                                                    "h-11 w-11 rounded-xl border transition-all duration-300",
                                                    nav.autoCenterEnabled
                                                        ? "bg-blue-500/15 border-blue-500/30 text-blue-400"
                                                        : "bg-white/[0.03] border-white/[0.08] text-white/40"
                                                )}
                                                title={nav.autoCenterEnabled ? "Auto-center ON" : "Auto-center OFF"}
                                            >
                                                <Locate className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>

                                {/* GPS Error */}
                                {nav.gpsError && (
                                    <div className="flex items-center gap-2.5 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs">
                                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                        <span>{nav.gpsError}</span>
                                    </div>
                                )}

                                {/* Off-route warning */}
                                <AnimatePresence>
                                    {nav.active && nav.isOffRoute && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -8 }}
                                            className="nav-off-route flex items-center gap-2.5 px-4 py-3 text-red-300 text-xs"
                                        >
                                            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-red-400" />
                                            <span className="font-medium">You are off the planned route</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Current instruction panel */}
                                <AnimatePresence>
                                    {nav.active && nav.currentInstruction && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="nav-instruction-panel px-5 py-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="h-8 w-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Navigation className="h-4 w-4 text-blue-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-white/90 text-sm font-medium leading-snug">
                                                        {nav.currentInstruction}
                                                    </p>
                                                    {nav.distanceToNextManeuver !== null && (
                                                        <p className="text-white/40 text-xs mt-1 tabular-nums">
                                                            {nav.distanceToNextManeuver >= 1000
                                                                ? `${(nav.distanceToNextManeuver / 1000).toFixed(1)} km to next maneuver`
                                                                : `${nav.distanceToNextManeuver} m to next maneuver`
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                                {nav.position?.speed != null && nav.position.speed > 0 && (
                                                    <div className="text-right flex-shrink-0">
                                                        <div className="text-lg font-bold text-white/80 tabular-nums">
                                                            {Math.round(nav.position.speed * 3.6)}
                                                        </div>
                                                        <div className="text-[9px] text-white/30 uppercase tracking-wider">km/h</div>
                                                    </div>
                                                )}
                                            </div>
                                            {/* Step progress */}
                                            <div className="mt-3 flex items-center gap-2">
                                                <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-blue-500/60 transition-all duration-500"
                                                        style={{ width: `${Math.min(100, ((nav.currentStepIndex + 1) / Math.max(1, nav.maneuvers.length)) * 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-white/30 tabular-nums">
                                                    {nav.currentStepIndex + 1}/{nav.maneuvers.length}
                                                </span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}

                        {/* ── SECTION 2: Content area (placeholder / loading / error / route info) ── */}
                        <div
                            className="w-full backdrop-blur-3xl bg-white/[0.02] rounded-[2rem] border border-white/[0.05] relative overflow-hidden shadow-2xl"
                            style={{ minHeight: panelState === "placeholder" ? 420 : "auto" }}
                        >
                            {/* Subtle Inner Glow */}
                            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_60px_rgba(0,0,0,0.5)] pointer-events-none z-10" />

                            {/* ── PLACEHOLDER (before first search) ── */}
                            {panelState === "placeholder" && (
                                <div className="flex items-center justify-center w-full" style={{ minHeight: 420 }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                        transition={{ duration: 0.8, ease: appleEase }}
                                        className="text-center relative z-20"
                                    >
                                        <div className="relative w-32 h-32 mx-auto mb-8">
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
                                </div>
                            )}

                            {/* ── LOADING (reserves space to prevent layout jump) ── */}
                            {panelState === "loading" && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3, ease: appleEase }}
                                    className="w-full p-8 relative z-20 space-y-6"
                                    style={{ minHeight: 380 }}
                                >
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
                                            <Loader2 className="relative h-6 w-6 text-primary animate-spin" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm">Analyzing routes...</p>
                                            <p className="text-white/30 text-xs">Evaluating safety, traffic & road conditions</p>
                                        </div>
                                    </div>
                                    <div className="shimmer-loading h-36 rounded-2xl" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="shimmer-loading h-28 rounded-xl" />
                                        <div className="shimmer-loading h-28 rounded-xl" />
                                    </div>
                                    <div className="shimmer-loading h-48 rounded-2xl" />
                                </motion.div>
                            )}

                            {/* ── ERROR ── */}
                            {panelState === "error" && (
                                <div className="flex items-center justify-center w-full" style={{ minHeight: 380 }}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5, ease: appleEase }}
                                        className="text-center relative z-20 p-8"
                                    >
                                        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-400/10 flex items-center justify-center">
                                            <AlertCircle className="h-7 w-7 text-red-400" />
                                        </div>
                                        <h3 className="text-xl font-medium text-white mb-2">Couldn't find routes</h3>
                                        <p className="text-white/40 max-w-xs mx-auto font-light text-sm leading-relaxed mb-6">
                                            {error}
                                        </p>
                                        <Button
                                            onClick={() => { setError(null); }}
                                            variant="ghost"
                                            className="text-primary hover:text-primary/80 text-sm"
                                        >
                                            Try Again
                                        </Button>
                                    </motion.div>
                                </div>
                            )}

                            {/* ═══════════════════════════════════════════════════════ */}
                            {/* RESULTS — Route details + alternate routes             */}
                            {/* ═══════════════════════════════════════════════════════ */}
                            {panelState === "results" && mainRoute && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: appleEase }}
                                    className="w-full p-6 lg:p-8 relative z-20 flex flex-col gap-8"
                                >
                                    {/* ── RECOMMENDED ROUTE CARD ── */}
                                    <div
                                        className="bg-white/[0.035] rounded-2xl p-8 border border-primary/[0.12] relative overflow-hidden transition-all duration-500 hover:bg-white/[0.045]"
                                        style={{
                                            boxShadow: "0 0 50px -12px rgba(255,145,77,0.15), 0 25px 50px -12px rgba(0,0,0,0.5)",
                                        }}
                                    >
                                        {/* Soft primary glow top edge */}
                                        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                                        {/* Header Row */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="flex h-1.5 w-1.5 relative">
                                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                                                    </span>
                                                    <h2 className="text-xl font-semibold text-white tracking-tight">{mainRoute.name}</h2>
                                                </div>
                                                {/* Badges */}
                                                <div className="flex flex-wrap gap-2">
                                                    {mainRoute.badges.map((badge, i) => (
                                                        <span
                                                            key={i}
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-medium text-white/80"
                                                        >
                                                            <span>{badge.emoji}</span>
                                                            {badge.label}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-4xl font-bold text-white tracking-tighter">{mainRoute.time}</p>
                                                <p className="text-white/30 font-light mt-1 text-sm">{mainRoute.distance}</p>
                                                <span className="inline-block mt-1 text-[10px] font-medium text-primary/80 bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                                                    {mainRoute.highwayLabel}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Safety Score Bar */}
                                        <div className="mb-6 p-4 rounded-xl bg-white/[0.025] border border-white/[0.05]">
                                            <p className="text-[10px] font-semibold text-white/40 uppercase tracking-[0.15em] mb-3">Safety Score</p>
                                            <SafetyBar score={mainRoute.safetyScore} />
                                        </div>

                                        {/* Quick Stats Row */}
                                        <div className="grid grid-cols-3 gap-3 mb-6">
                                            <div className="bg-white/[0.025] rounded-xl p-3.5 border border-white/[0.05] text-center">
                                                <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1.5">Traffic</p>
                                                <span className={cn("text-[11px] font-semibold px-2.5 py-1 rounded-md border inline-block min-w-[56px]", trafficLevelColor(mainRoute.trafficLevel))}>
                                                    {mainRoute.trafficLevel}
                                                </span>
                                            </div>
                                            <div className="bg-white/[0.025] rounded-xl p-3.5 border border-white/[0.05] text-center">
                                                <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1.5">Road Quality</p>
                                                <span className="text-[11px] font-semibold text-blue-400">{mainRoute.roadQuality}</span>
                                            </div>
                                            <div className="bg-white/[0.025] rounded-xl p-3.5 border border-white/[0.05] text-center">
                                                <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mb-1.5">Safety</p>
                                                <span className="text-[11px] font-semibold text-emerald-400">{mainRoute.safety}</span>
                                            </div>
                                        </div>

                                        {/* Collapsible: Why This Route Is Recommended */}
                                        <div className="border border-white/[0.06] rounded-xl overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() => setShowWhyRecommended(!showWhyRecommended)}
                                                className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors group/why"
                                            >
                                                <span className="text-xs font-semibold text-white/60 tracking-wide group-hover/why:text-white/80 transition-colors">
                                                    Why This Route Is Recommended
                                                </span>
                                                <motion.div
                                                    animate={{ rotate: showWhyRecommended ? 180 : 0 }}
                                                    transition={{ duration: 0.3, ease: appleEase }}
                                                >
                                                    <ChevronDown className="h-4 w-4 text-white/30" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {showWhyRecommended && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.4, ease: appleEase }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-4 pb-4 pt-1 space-y-2.5 border-t border-white/[0.04]">
                                                            {[
                                                                "Higher safety score based on road data",
                                                                "Primarily highway segments",
                                                                "Fewer intersections and turns",
                                                                "Balanced duration and distance"
                                                            ].map((reason, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: i * 0.08, duration: 0.3, ease: appleEase }}
                                                                    className="flex items-center gap-2.5"
                                                                >
                                                                    <div className="flex-shrink-0 h-5 w-5 rounded-full bg-emerald-400/10 flex items-center justify-center">
                                                                        <Check className="h-3 w-3 text-emerald-400" />
                                                                    </div>
                                                                    <span className="text-xs text-white/60">{reason}</span>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>

                                    {/* ── ALTERNATE ROUTES (visually separated) ── */}
                                    {otherRoutes.length > 0 && (
                                        <div className="w-full">
                                            <div className="flex items-center justify-between mb-5">
                                                <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider">Other Routes</h3>
                                                <button
                                                    type="button"
                                                    onClick={() => setCompareMode(!compareMode)}
                                                    className="flex items-center gap-1.5 text-[11px] text-white/35 hover:text-white/55 transition-colors duration-300"
                                                >
                                                    <Gauge className="h-3 w-3" />
                                                    {compareMode ? "Exit Comparison" : "Compare All Routes"}
                                                </button>
                                            </div>

                                            <AnimatePresence mode="wait">
                                                {compareMode ? (
                                                    /* ── COMPARISON MODE ── */
                                                    <motion.div
                                                        key="compare"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.4, ease: appleEase }}
                                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start"
                                                    >
                                                        {[mainRoute, ...otherRoutes].map((route) => {
                                                            const isPrimary = route.id === mainRoute.id;
                                                            return (
                                                                <motion.div
                                                                    layout
                                                                    key={route.id}
                                                                    className={cn(
                                                                        "rounded-xl border transition-all duration-300 cursor-pointer",
                                                                        isPrimary
                                                                            ? "bg-white/[0.04] border-primary/20 p-6 shadow-[0_0_30px_-8px_rgba(255,145,77,0.12)] hover:scale-[1.015]"
                                                                            : "bg-white/[0.02] border-white/[0.05] p-5 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.2)] hover:border-white/[0.08] hover:scale-[1.01]"
                                                                    )}
                                                                    onClick={() => { if (!isPrimary) handleRouteSelect(route); }}
                                                                    onMouseEnter={() => setHoveredRouteId(route.id)}
                                                                    onMouseLeave={() => setHoveredRouteId(null)}
                                                                >
                                                                    <div className="mb-3">
                                                                        <h4 className={cn("font-semibold text-white mb-1", isPrimary ? "text-sm" : "text-[13px]")}>{route.name}</h4>
                                                                        <div className="flex flex-wrap gap-1">
                                                                            {route.badges.map((b, i) => (
                                                                                <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/60">
                                                                                    <span className="leading-none">{b.emoji}</span>
                                                                                    <span>{b.label}</span>
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <p className={cn("font-bold text-white tracking-tight", isPrimary ? "text-2xl" : "text-xl")}>{route.time}</p>
                                                                    <p className="text-xs text-white/25 mb-3">{route.distance}</p>
                                                                    <div className="space-y-3">
                                                                        <SafetyBar score={route.safetyScore} size="sm" />
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-[10px] text-white/30 uppercase tracking-wider">Traffic</span>
                                                                            <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border min-w-[48px] text-center", trafficLevelColor(route.trafficLevel))}>
                                                                                {route.trafficLevel}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-[9px] text-white/15 mt-2.5">{route.highwayLabel}</p>
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </motion.div>
                                                ) : (
                                                    /* ── STACKED LIST MODE ── */
                                                    <motion.div
                                                        key="list"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.4, ease: appleEase }}
                                                        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                                                    >
                                                        {otherRoutes.map((route) => (
                                                            <motion.div
                                                                layout
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ duration: 0.4, ease: appleEase }}
                                                                key={route.id}
                                                                onClick={() => handleRouteSelect(route)}
                                                                onMouseEnter={() => setHoveredRouteId(route.id)}
                                                                onMouseLeave={() => setHoveredRouteId(null)}
                                                                className="bg-white/[0.02] rounded-xl p-5 border border-white/[0.05] hover:bg-white/[0.035] hover:border-white/[0.08] hover:scale-[1.01] transition-all duration-300 cursor-pointer group/route relative overflow-hidden shadow-[0_4px_20px_-8px_rgba(0,0,0,0.25)]"
                                                            >
                                                                <div className="flex justify-between items-start mb-3 relative z-10">
                                                                    <div>
                                                                        <h4 className="font-semibold text-white text-sm mb-1">{route.name}</h4>
                                                                        <div className="flex gap-1">
                                                                            {route.badges.map((b, i) => (
                                                                                <span key={i} className="inline-flex items-center gap-1 text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/50">
                                                                                    <span className="leading-none">{b.emoji}</span>
                                                                                    <span>{b.label}</span>
                                                                                </span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                    <div className="p-1.5 rounded-full bg-white/5 group-hover/route:bg-white/10 transition-colors">
                                                                        <ArrowRight className="h-3 w-3 text-white/60 group-hover/route:text-white transition-colors" />
                                                                    </div>
                                                                </div>
                                                                <div className="relative z-10">
                                                                    <p className="text-2xl font-bold text-white tracking-tight">{route.time}</p>
                                                                    <p className="text-xs text-white/30 mb-3">{route.distance}</p>
                                                                    <SafetyBar score={route.safetyScore} size="sm" />
                                                                    <div className="flex items-center justify-between mt-3">
                                                                        <span className="text-[10px] text-white/30 uppercase tracking-wider">Traffic</span>
                                                                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded border min-w-[48px] text-center", trafficLevelColor(route.trafficLevel))}>
                                                                            {route.trafficLevel}
                                                                        </span>
                                                                    </div>
                                                                    <p className="text-[9px] text-white/15 mt-3">{route.highwayLabel}</p>
                                                                </div>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default RoutePlanner;
