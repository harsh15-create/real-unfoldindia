import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Shield, Key, Smartphone, LogOut } from "lucide-react";

export const SecuritySection = () => {
    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Account Security</h2>
                <p className="text-muted-foreground">Manage your password and security settings.</p>
            </div>

            <div className="grid gap-8">
                {/* Password Change */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Key className="h-4 w-4 text-primary" /> Change Password
                    </h3>
                    <div className="grid gap-4 max-w-xl">
                        <div className="space-y-2">
                            <Label>Current Password</Label>
                            <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 focus:border-primary/50" />
                        </div>
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 focus:border-primary/50" />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirm New Password</Label>
                            <Input type="password" placeholder="••••••••" className="bg-white/5 border-white/10 focus:border-primary/50" />
                        </div>
                        <Button className="w-fit bg-white/10 hover:bg-white/20 text-white">Update Password</Button>
                    </div>
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* 2FA */}
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" /> Two-Factor Authentication
                        </Label>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                    </div>
                    <Switch />
                </div>

                <div className="h-[1px] bg-white/10" />

                {/* Sessions */}
                <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Smartphone className="h-4 w-4 text-primary" /> Active Sessions
                    </h3>
                    <div className="rounded-xl border border-white/5 bg-black/20 p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                                <Smartphone className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-medium">Chrome on macOS (Current)</p>
                                <p className="text-xs text-muted-foreground">New Delhi, India • Just now</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <LogOut className="h-4 w-4 mr-2" /> Revoke
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
