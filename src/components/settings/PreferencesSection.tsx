import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Wallet } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const PreferencesSection = () => {
    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Personalization</h2>
                <p className="text-muted-foreground">Customize your app experience.</p>
            </div>

            <div className="space-y-6">
                {/* Language & Currency */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 m-2">
                            <Globe className="h-4 w-4 text-primary" /> Language
                        </Label>
                        <Select defaultValue="en">
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Select Language" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="en">English (US)</SelectItem>
                                <SelectItem value="hi">Hindi</SelectItem>
                                <SelectItem value="es">Spanish</SelectItem>
                                <SelectItem value="fr">French</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 m-2">
                            <Wallet className="h-4 w-4 text-primary" /> Currency
                        </Label>
                        <Select defaultValue="inr">
                            <SelectTrigger className="bg-white/5 border-white/10">
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="inr">INR (₹)</SelectItem>
                                <SelectItem value="usd">USD ($)</SelectItem>
                                <SelectItem value="eur">EUR (€)</SelectItem>
                                <SelectItem value="gbp">GBP (£)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Appearance */}
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base flex items-center gap-2">
                            <Moon className="h-4 w-4 text-primary" /> Dark Mode
                        </Label>
                        <p className="text-sm text-muted-foreground">Adjust the appearance of the application.</p>
                    </div>
                    {/* Assuming the app is always dark mode for now based on theme */}
                    <Switch defaultChecked disabled />
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Budget Preference (Per Day)</Label>
                        <div className="pt-2">
                            <Slider defaultValue={[2000]} max={10000} step={500} className="w-full" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>₹500</span>
                            <span>₹10,000+</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
