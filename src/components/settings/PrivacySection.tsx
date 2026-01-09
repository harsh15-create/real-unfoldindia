import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, MapPin, Bell, Share2, Lock } from "lucide-react";
import { useAuth } from "@/auth/AuthContext";
import { toast } from "sonner";
import {
    fetchPrivacySettings,
    updatePrivacySetting,
    requestAccountDeletion,
    PrivacySettings
} from "@/lib/privacyApi";

export const PrivacySection = () => {
    const { user } = useAuth();
    const [settings, setSettings] = useState<PrivacySettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (!user) return;
        const loadSettings = async () => {
            const data = await fetchPrivacySettings(user.id);
            setSettings(data);
            setLoading(false);
        };
        loadSettings();
    }, [user]);

    const handleToggle = async (key: keyof Omit<PrivacySettings, 'id' | 'user_id'>, value: boolean) => {
        if (!user || !settings) return;

        // Optimistic update
        setSettings({ ...settings, [key]: value });

        const success = await updatePrivacySetting(user.id, key, value);
        if (!success) {
            // Revert on failure
            setSettings({ ...settings, [key]: !value });
            toast.error("Failed to update setting");
        } else {
            toast.success("Privacy setting updated");
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;
        if (!confirm("Are you sure? This will request permanent account deletion.")) return;

        setDeleting(true);
        const success = await requestAccountDeletion(user.id);

        if (success) {
            toast.success("Deletion request submitted", {
                description: "Check your email for confirmation."
            });
        } else {
            toast.error("Could not submit request");
        }
        setDeleting(false);
    };

    if (loading) return <div className="text-sm text-muted-foreground p-6">Loading privacy settings...</div>;

    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Privacy & Permissions</h2>
                <p className="text-muted-foreground">Control how your data is shared and what permissions you grant.</p>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-primary" /> Location Access
                        </Label>
                        <p className="text-sm text-muted-foreground">Allow the app to access your current location for recommendations.</p>
                    </div>
                    <Switch
                        checked={settings?.location_access_enabled ?? false}
                        onCheckedChange={(checked) => handleToggle('location_access_enabled', checked)}
                    />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base flex items-center gap-2">
                            <Bell className="h-4 w-4 text-primary" /> Push Notifications
                        </Label>
                        <p className="text-sm text-muted-foreground">Receive updates about your trip, offers, and new guides.</p>
                    </div>
                    <Switch
                        checked={settings?.push_notifications_enabled ?? false}
                        onCheckedChange={(checked) => handleToggle('push_notifications_enabled', checked)}
                    />
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4">
                    <div className="space-y-0.5">
                        <Label className="text-base flex items-center gap-2">
                            <Share2 className="h-4 w-4 text-primary" /> Data Sharing
                        </Label>
                        <p className="text-sm text-muted-foreground">Share anonymous usage data to help us improve the app.</p>
                    </div>
                    <Switch
                        checked={settings?.analytics_data_sharing_enabled ?? false}
                        onCheckedChange={(checked) => handleToggle('analytics_data_sharing_enabled', checked)}
                    />
                </div>

                <div className="pt-6">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                        <h3 className="font-medium text-red-500 flex items-center gap-2 mb-2">
                            <Lock className="h-4 w-4" /> Delete Account
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Permanently delete your account and all associated data. This action cannot be undone.
                        </p>
                        <Button
                            variant="destructive"
                            className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20"
                            onClick={handleDeleteAccount}
                            disabled={deleting}
                        >
                            {deleting ? "Processing..." : "Delete Account"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
