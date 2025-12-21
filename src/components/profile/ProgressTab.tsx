import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useExploration } from "@/context/ExplorationContext";
import { BadgeGrid } from "./BadgeGrid";
import { Loader2, Sparkles, RefreshCw, Compass, Trophy } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from "react-router-dom";

export function ProgressTab() {
    const { progress, badges, loading } = useExploration();
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [insightData, setInsightData] = useState<{
        insight: string;
        focus_area?: string;
        next_milestone?: string;
        action_tip?: string;
    } | null>(null);
    const [loadingInsight, setLoadingInsight] = useState(false);

    // Calculate India Progress
    const totalAppCities = progress?.totalAppCities || 22; // Fallback to known count
    const indiaProgress = Math.min(
        100,
        Math.round(((progress?.totalCitiesExplored || 0) / totalAppCities) * 100)
    );

    const fetchInsight = async () => {
        if (!profile) return;
        setLoadingInsight(true);
        try {
            // Prepare data for AI
            const regionProgress = progress?.regionProgress || {};
            const exploredRegions = Object.keys(regionProgress).filter(r => regionProgress[r] > 0);
            const unexploredRegions = ['North India', 'South India', 'East India', 'West India'].filter(r => !exploredRegions.includes(r));

            const payload = {
                india_progress: indiaProgress,
                region_progress: regionProgress,
                explored_regions: exploredRegions,
                unexplored_regions: unexploredRegions,
                top_travel_styles: profile.travel_style || [],
                unlocked_badges: badges,
                insight_type: 'summary'
            };

            const { data, error } = await supabase.functions.invoke('generate_progress_insight', {
                body: payload
            });

            if (error) throw error;

            if (data) {
                // Handle both old text format and new JSON format
                if (typeof data.insight === 'string' && data.insight.startsWith('{')) {
                    try {
                        setInsightData(JSON.parse(data.insight));
                    } catch {
                        setInsightData({ insight: data.insight });
                    }
                } else if (data.focus_area) {
                    // It's already the new JSON structure
                    setInsightData(data);
                } else {
                    // Fallback for old text
                    setInsightData({ insight: data.insight });
                }
            }
        } catch (error) {
            console.error("Error fetching insight:", error);
            setInsightData({ insight: "Kira is analyzing your journey... (Please deploy the Edge Function!)" });
        } finally {
            setLoadingInsight(false);
        }
    };

    // ... (keep useEffect)

    // ... (keep loading check)

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
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-4">
                            {loadingInsight ? (
                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Analyzing your exploration patterns...
                                </div>
                            ) : (
                                <>
                                    <p className="text-base italic text-foreground/90 leading-relaxed">
                                        "{insightData?.insight || "Start exploring to unlock insights!"}"
                                    </p>

                                    {/* Action Chips */}
                                    {(insightData?.focus_area || insightData?.next_milestone) && (
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {insightData.focus_area && (
                                                <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 flex items-center gap-1">
                                                    <Compass className="h-3 w-3" />
                                                    Focus: {insightData.focus_area}
                                                </div>
                                            )}
                                            {insightData.next_milestone && (
                                                <div className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium border border-secondary/20 flex items-center gap-1">
                                                    <Trophy className="h-3 w-3" />
                                                    Next: {insightData.next_milestone}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {insightData?.action_tip && (
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                            <span className="font-semibold text-primary">Tip:</span> {insightData.action_tip}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 justify-center min-w-[120px]">
                            <Button
                                className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                                onClick={() => navigate('/explore')}
                            >
                                Plan Trip
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={fetchInsight}
                                disabled={loadingInsight}
                                className="w-full text-xs text-muted-foreground hover:text-primary"
                            >
                                <RefreshCw className={`h-3 w-3 mr-1 ${loadingInsight ? 'animate-spin' : ''}`} />
                                Refresh Insight
                            </Button>
                        </div>
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

                    {/* Region Progress */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {['North India', 'South India', 'East India', 'West India'].map((region) => {
                            const regionExplored = progress?.regionProgress?.[region] || 0;
                            const regionTotal = progress?.regionTotals?.[region] || 1; // Avoid divide by zero
                            const regionPercent = Math.round((regionExplored / regionTotal) * 100);

                            return (
                                <div key={region} className="space-y-2 group">
                                    <div className="flex justify-between text-sm font-medium">
                                        <span className="group-hover:text-primary transition-colors">{region}</span>
                                        <span className="text-muted-foreground">{regionPercent}% ({regionExplored}/{regionTotal})</span>
                                    </div>
                                    <Progress value={regionPercent} className="h-2 bg-muted/50" indicatorClassName="bg-gradient-to-r from-primary to-secondary" />
                                </div>
                            );
                        })}
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
