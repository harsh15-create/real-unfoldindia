import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BADGES } from "@/lib/exploration";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BadgeGridProps {
    unlockedBadgeIds: string[];
}

export function BadgeGrid({ unlockedBadgeIds }: BadgeGridProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {BADGES.map((badge) => {
                        const isUnlocked = unlockedBadgeIds.includes(badge.id);
                        return (
                            <TooltipProvider key={badge.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            className={`flex flex-col items-center p-4 rounded-lg border transition-all ${isUnlocked
                                                    ? "bg-primary/10 border-primary/50"
                                                    : "bg-muted/50 border-muted grayscale opacity-60"
                                                }`}
                                        >
                                            <div className="text-4xl mb-2">{badge.icon}</div>
                                            <span className="font-semibold text-sm text-center">{badge.name}</span>
                                            {isUnlocked && (
                                                <Badge variant="secondary" className="mt-2 text-xs">
                                                    Unlocked
                                                </Badge>
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{badge.description}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
