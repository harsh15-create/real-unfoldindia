import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, CreditCard, Bell } from "lucide-react";

const Settings = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0f172a] text-white pt-24 pb-12 px-4 md:px-8">
            <div className="container max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Account Settings</h1>

                <div className="grid md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <div className="space-y-2">
                        <Button variant="ghost" className="w-full justify-start bg-white/5 hover:bg-white/10 text-white">
                            <User className="mr-2 h-4 w-4" />
                            Profile
                        </Button>
                        <Button variant="ghost" className="w-full justify-start hover:bg-white/5 text-white/60 hover:text-white">
                            <Shield className="mr-2 h-4 w-4" />
                            Security
                        </Button>
                        <Button variant="ghost" className="w-full justify-start hover:bg-white/5 text-white/60 hover:text-white">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Billing & Plans
                        </Button>
                        <Button variant="ghost" className="w-full justify-start hover:bg-white/5 text-white/60 hover:text-white">
                            <Bell className="mr-2 h-4 w-4" />
                            Notifications
                        </Button>
                    </div>

                    {/* Main Content */}
                    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] rounded-2xl border border-white/10 p-8 shadow-xl">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
