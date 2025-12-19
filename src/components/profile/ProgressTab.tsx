import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExploration } from "@/context/ExplorationContext";
import { BadgeGrid } from "./BadgeGrid";
import { Loader2, Sparkles, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";

export function ProgressTab() {
    const { progress, badges, loading } = useExploration();
    const { profile } = useAuth();
    const [insight, setInsight] = useState<string | null>(null);
    const [loadingInsight, setLoadingInsight] = useState(false);

    // Calculate India Progress (Mock total cities for now, say 50 major cities)
    const TOTAL_CITIES = 50;
    const indiaProgress = Math.min(
        100,
        Math.round(((progress?.totalCitiesExplored || 0) / TOTAL_CITIES) * 100)
    );

    const fetchInsight = async () => {
        if (!profile) return;
        setLoadingInsight(true);
        try {
            // Prepare data for AI
            const payload = {
                india_progress: indiaProgress,
                region_progress: {}, // TODO: Implement region logic
                explored_regions: [], // TODO: Implement region logic
                unexplored_regions: ['North India', 'South India', 'East India', 'West India'], // Mock
                top_travel_styles: profile.travel_style || [],
                unlocked_badges: badges,
                insight_type: 'summary'
            };

            const { data, error } = await supabase.functions.invoke('generate_progress_insight', {
                body: payload
            });

            if (error) throw error;
            if (data?.insight) {
                setInsight(data.insight);
            }
        } catch (error) {
            console.error("Error fetching insight:", error);
            // Fallback if Edge Function isn't deployed yet
            setInsight("Kira is analyzing your journey... (Please deploy the Edge Function to see real insights!)");
        } finally {
            setLoadingInsight(false);
        }
    };

    // Fetch insight on mount if not present
    useEffect(() => {
        if (!insight && !loading) {
            fetchInsight();
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* AI Insight Panel */}
            <Card className="glass-card border-none relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />

                <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="flex items-center gap-2 text-xl text-gradient">
                        <Sparkles className="h-5 w-5 text-primary animate-pulse" />
                        Kira's Insight
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                    <div className="flex items-start gap-4">
                        <div className="flex-1">
                            {loadingInsight ? (
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Analyzing your exploration patterns...
                                </div>
                            ) : (
                                <p className="text-base italic text-foreground/90 leading-relaxed">
                                    "{insight || "Start exploring to unlock insights!"}"
                                </p>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={fetchInsight}
                            disabled={loadingInsight}
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary rounded-full"
                        >
                            <RefreshCw className={`h-4 w-4 ${loadingInsight ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* India Exploration Section */}
            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="text-2xl">India Exploration</CardTitle>
                    <CardDescription>
                        Your journey across the subcontinent based on your activity.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex flex-col items-center justify-center space-y-6 py-4">
                        <div className="relative h-48 w-48 flex items-center justify-center rounded-full shadow-2xl shadow-primary/10">
                            {/* Background Circle */}
                            <svg className="absolute top-0 left-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="8"
                                    className="text-muted/30"
                                />
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (283 * indiaProgress) / 100}
                                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_10px_rgba(255,153,51,0.5)]"
                                />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="var(--primary)" />
                                        <stop offset="100%" stopColor="var(--secondary)" />
                                    </linearGradient>
                                </defs>
                            </svg>

                            <div className="text-center z-10">
                                <span className="text-5xl font-bold text-gradient">{indiaProgress}%</span>
                                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">Explored</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground text-center max-w-sm">
                            Keep exploring cities, planning trips, and saving locations to increase your coverage.
                        </p>
                    </div>

                    {/* Region Progress (Mock data for now as we don't have region mapping yet) */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {['North India', 'South India', 'East India', 'West India'].map((region) => (
                            <div key={region} className="space-y-2 group">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="group-hover:text-primary transition-colors">{region}</span>
                                    <span className="text-muted-foreground">0%</span>
                                </div>
                                <Progress value={0} className="h-2 bg-muted/50" indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Badges Section */}
            <BadgeGrid unlockedBadgeIds={badges} />

            {/* Suggestions Section */}
            <Card className="glass-card border-none bg-gradient-to-r from-primary/5 to-transparent">
                <CardHeader>
                    <CardTitle className="text-xl">What to Explore Next</CardTitle>
                    <CardDescription>Recommended based on your travel style.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Start by exploring popular cities like <strong className="text-primary">Jaipur</strong>, <strong className="text-primary">Varanasi</strong>, or <strong className="text-primary">Kerala</strong> to unlock your first badges!
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
