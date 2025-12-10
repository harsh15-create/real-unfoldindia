import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { User, Shield, Bell, Save, Loader2 } from "lucide-react";

const Settings = () => {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "profile");
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        name: "Vedant",
        email: "vedant@example.com",
        age: ""
    });

    // Security State
    const [security, setSecurity] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
        twoFactor: false
    });

    // Notification State
    const [notifications, setNotifications] = useState({
        email: true,
        tripReminders: true,
        promos: false,
        securityAlerts: true
    });

    // Load simulation
    useEffect(() => {
        const savedProfile = localStorage.getItem("user_profile");
        if (savedProfile) setProfile(JSON.parse(savedProfile));

        const savedNotifs = localStorage.getItem("user_notifications");
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));

        const savedSecurity = localStorage.getItem("user_security_settings");
        if (savedSecurity) {
            const parsed = JSON.parse(savedSecurity);
            setSecurity(prev => ({ ...prev, twoFactor: parsed.twoFactor }));
        }
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tab);
        window.history.pushState({}, "", url);
    };

    const handleSaveProfile = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem("user_profile", JSON.stringify(profile));
            setIsLoading(false);
            toast({
                title: "Profile Updated",
                description: "Your profile information has been saved successfully.",
            });
        }, 800);
    };

    const handleSaveSecurity = () => {
        setIsLoading(true);
        setTimeout(() => {
            if (security.newPassword && security.newPassword !== security.confirmPassword) {
                setIsLoading(false);
                toast({
                    title: "Error",
                    description: "New passwords do not match.",
                    variant: "destructive"
                });
                return;
            }

            // Simulate saving 2FA preference
            localStorage.setItem("user_security_settings", JSON.stringify({ twoFactor: security.twoFactor }));

            setIsLoading(false);
            toast({
                title: "Security Settings Updated",
                description: "Your security preferences have been updated.",
            });
            // Clear password fields for security
            setSecurity(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
        }, 800);
    };

    const handleSaveNotifications = () => {
        setIsLoading(true);
        setTimeout(() => {
            localStorage.setItem("user_notifications", JSON.stringify(notifications));
            setIsLoading(false);
            toast({
                title: "Preferences Saved",
                description: "Your notification settings have been updated.",
            });
        }, 600);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0f172a] text-white pt-24 pb-12 px-4 md:px-8">
            <Toaster />
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
                                            value={profile.name}
                                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={profile.email}
                                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>

                                    <div className="grid gap-2">
                                        <Label htmlFor="age">Age</Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            value={profile.age}
                                            onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                                            placeholder="Enter your age"
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        onClick={handleSaveProfile}
                                        disabled={isLoading}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </div>
                        )}


                        {activeTab === "security" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Security Settings</h2>
                                    <p className="text-sm text-white/60">Manage your password and security preferences.</p>
                                </div>
                                <Separator className="bg-white/10" />

                                <div className="space-y-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input
                                            id="current-password"
                                            type="password"
                                            value={security.currentPassword}
                                            onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input
                                            id="new-password"
                                            type="password"
                                            value={security.newPassword}
                                            onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input
                                            id="confirm-password"
                                            type="password"
                                            value={security.confirmPassword}
                                            onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                                            className="bg-white/5 border-white/10 text-white focus:border-primary/50"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4 mt-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-white">Two-Factor Authentication</Label>
                                            <p className="text-sm text-white/60">Add an extra layer of security to your account.</p>
                                        </div>
                                        <Switch
                                            checked={security.twoFactor}
                                            onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        onClick={handleSaveSecurity}
                                        disabled={isLoading}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Update Security
                                    </Button>
                                </div>
                            </div>
                        )}

                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold mb-1">Notifications</h2>
                                    <p className="text-sm text-white/60">Choose what updates you want to receive.</p>
                                </div>
                                <Separator className="bg-white/10" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-white">Email Notifications</Label>
                                            <p className="text-sm text-white/60">Receive updates about your account activity via email.</p>
                                        </div>
                                        <Switch
                                            checked={notifications.email}
                                            onCheckedChange={(c) => setNotifications({ ...notifications, email: c })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-white">Trip Reminders</Label>
                                            <p className="text-sm text-white/60">Get notified about upcoming trips and itinerary changes.</p>
                                        </div>
                                        <Switch
                                            checked={notifications.tripReminders}
                                            onCheckedChange={(c) => setNotifications({ ...notifications, tripReminders: c })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-white">Promotional Offers</Label>
                                            <p className="text-sm text-white/60">Receive emails about new features and special offers.</p>
                                        </div>
                                        <Switch
                                            checked={notifications.promos}
                                            onCheckedChange={(c) => setNotifications({ ...notifications, promos: c })}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
                                        <div className="space-y-0.5">
                                            <Label className="text-base text-white">Security Alerts</Label>
                                            <p className="text-sm text-white/60">Get notified about suspicious logins and security updates.</p>
                                        </div>
                                        <Switch
                                            checked={notifications.securityAlerts}
                                            onCheckedChange={(c) => setNotifications({ ...notifications, securityAlerts: c })}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <Button
                                        onClick={handleSaveNotifications}
                                        disabled={isLoading}
                                        className="bg-primary hover:bg-primary/90 text-white"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                        Save Preferences
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
