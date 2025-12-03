import { useState } from "react";
import { ArrowRight, Car, Train, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";

const RoutePlanner = () => {
    const [showRoutes, setShowRoutes] = useState(false);

    const handlePlan = (e: React.FormEvent) => {
        e.preventDefault();
        setShowRoutes(true);
    };

    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-4xl font-bold mb-8">Plan Your <span className="text-primary">Route</span></h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Input Form */}
                    <div className="lg:col-span-1">
                        <div className="glass-card p-6 rounded-2xl sticky top-24">
                            <form onSubmit={handlePlan} className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Start Location</Label>
                                    <Input placeholder="e.g., Delhi" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Destination</Label>
                                    <Input placeholder="e.g., Jaipur" />
                                </div>

                                <div className="space-y-3">
                                    <Label>Mode of Travel</Label>
                                    <RadioGroup defaultValue="drive" className="flex gap-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="drive" id="drive" />
                                            <Label htmlFor="drive" className="flex items-center gap-2 cursor-pointer">
                                                <Car className="h-4 w-4" /> Drive
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="transit" id="transit" />
                                            <Label htmlFor="transit" className="flex items-center gap-2 cursor-pointer">
                                                <Train className="h-4 w-4" /> Transit
                                            </Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">
                                    Find Routes
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2 space-y-6">
                        {!showRoutes ? (
                            <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-12 border-2 border-dashed border-border rounded-2xl">
                                <div className="bg-muted/50 p-4 rounded-full mb-4">
                                    <ArrowRight className="h-8 w-8 opacity-50" />
                                </div>
                                <p>Enter locations to see safe routes</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Recommended Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="glass-card p-6 rounded-2xl border-l-4 border-l-primary relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-xl font-medium">
                                        Recommended
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">Scenic Highway via NH48</h3>
                                            <p className="text-muted-foreground text-sm">Balanced speed & safety</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-primary">5h 30m</p>
                                            <p className="text-sm text-muted-foreground">268 km</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-green-500">
                                            <Shield className="h-4 w-4" /> 98% Safety Score
                                        </div>
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <Zap className="h-4 w-4" /> Moderate Traffic
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Shortest Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">Expressway Direct</h3>
                                            <p className="text-muted-foreground text-sm">Fastest route</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-blue-500">4h 45m</p>
                                            <p className="text-sm text-muted-foreground">250 km</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-yellow-500">
                                            <Shield className="h-4 w-4" /> 85% Safety Score
                                        </div>
                                        <div className="flex items-center gap-1 text-green-500">
                                            <Clock className="h-4 w-4" /> Fastest
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Safest Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="glass-card p-6 rounded-2xl border-l-4 border-l-green-500"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold">Main Tourist Corridor</h3>
                                            <p className="text-muted-foreground text-sm">Maximum safety & support</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-green-500">6h 15m</p>
                                            <p className="text-sm text-muted-foreground">285 km</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 text-sm">
                                        <div className="flex items-center gap-1 text-green-500">
                                            <Shield className="h-4 w-4" /> 99% Safety Score
                                        </div>
                                        <div className="flex items-center gap-1 text-blue-500">
                                            <Car className="h-4 w-4" /> Well Lit
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoutePlanner;
