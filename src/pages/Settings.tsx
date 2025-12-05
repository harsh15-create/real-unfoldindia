import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, CreditCard, Bell } from "lucide-react";

const Settings = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");

    // Update URL when tab changes without reloading
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tab);
        window.history.pushState({}, "", url);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0f172a] text-white pt-24 pb-12 px-4 md:px-8">
            <div className="container max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <Button
                            variant="ghost"
                            onClick={() => handleTabChange("profile")}
                            className={cn("w-full justify-start", activeTab === "profile" ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60 hover:text-white")}
                        >
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => handleTabChange("security")}
                            className={cn("w-full justify-start", activeTab === "security" ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60 hover:text-white")}
                        >
                            <Shield className="mr-2 h-4 w-4" />
                            Security
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => handleTabChange("billing")}
                            className={cn("w-full justify-start", activeTab === "billing" ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60 hover:text-white")}
                        >
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing & Plans
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => handleTabChange("notifications")}
                            className={cn("w-full justify-start", activeTab === "notifications" ? "bg-white/10 text-white" : "hover:bg-white/5 text-white/60 hover:text-white")}
                        >
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-white/10 p-8 shadow-xl">
                        {activeTab === "profile" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Profile Information</h2>
                                    <p className="text-sm text-white/60">Update your account's profile information and email address.</p>
                                </div>

                                <Separator className="bg-white/10" />

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Display Name</Label>
                                        <Input
                                            id="name"
                                            defaultValue="Vedant"
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            defaultValue="vedant@example.com"
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button className="bg-primary hover:bg-primary/90 text-white">
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "billing" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Billing & Plans</h2>
                                    <p className="text-sm text-white/60">Manage your subscription and billing details.</p>
                                </div>
                                <Separator className="bg-white/10" />
                                <div className="p-6 bg-white/5 rounded-xl border border-white/10 text-center">
                                    <p className="text-white/40">You are currently on the Free Plan.</p>
                                    <Button className="mt-4 bg-primary text-white">Upgrade to Pro</Button>
                                </div>
                            </div>
                        )}

                        {/* Placeholders for other tabs */}
                        {(activeTab === "security" || activeTab === "notifications") && (
                            <div className="flex items-center justify-center h-[300px] text-white/40">
                                This section is under construction.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
