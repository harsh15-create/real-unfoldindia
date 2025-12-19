import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, AlertTriangle, Key, Mail, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { useAuth } from '@/auth/AuthContext';

export function AccountSettingsTab() {
    const { profile, signOut } = useAuth();
    const [loading, setLoading] = useState(false);

    // Password State
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Email State
    const [newEmail, setNewEmail] = useState('');

    // Delete Account State
    const [deleteConfirmation, setDeleteConfirmation] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // --- Actions ---

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;

            toast.success("Password updated successfully");
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: any) {
            toast.error(error.message || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateEmail = async () => {
        if (!newEmail || !newEmail.includes('@')) {
            toast.error("Please enter a valid email");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({ email: newEmail });
            if (error) throw error;

            toast.success("Confirmation email sent to both addresses. Please verify to complete the change.");
            setNewEmail('');
        } catch (error: any) {
            toast.error(error.message || "Failed to update email");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        if (!profile?.email) return;

        setLoading(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });
            if (error) throw error;

            toast.success("Password reset email sent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset email");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmation !== "DELETE MY ACCOUNT") {
            toast.error("Please type the confirmation phrase exactly.");
            return;
        }

        setLoading(true);
        try {
            // Call Edge Function
            const { error } = await supabase.functions.invoke('delete_account');
            if (error) throw error;

            toast.success("Account deleted successfully. Goodbye!");
            await signOut();
            window.location.href = '/';
        } catch (error: any) {
            console.error("Delete account error:", error);
            toast.error(error.message || "Failed to delete account. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8">

            {/* Security Header */}
            <div className="flex items-center gap-3 text-muted-foreground bg-primary/5 p-4 rounded-lg border border-primary/10">
                <ShieldCheck className="h-6 w-6 text-primary" />
                <p className="text-sm">
                    Manage your account security and preferences. Sensitive actions may require re-authentication.
                </p>
            </div>

            {/* Change Password */}
            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Key className="h-5 w-5 text-primary" />
                        Change Password
                    </CardTitle>
                    <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-background/50 border-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="bg-background/50 border-white/10"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <Button
                            variant="link"
                            className="text-muted-foreground p-0 h-auto"
                            onClick={handleForgotPassword}
                            disabled={loading}
                        >
                            Forgot your password?
                        </Button>
                        <Button onClick={handleUpdatePassword} disabled={loading || !newPassword}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Update Email */}
            <Card className="glass-card border-none">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                        <Mail className="h-5 w-5 text-primary" />
                        Email Address
                    </CardTitle>
                    <CardDescription>Update your email address. Requires verification.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Current Email</Label>
                        <Input value={profile?.email || ''} readOnly disabled className="bg-muted/50" />
                    </div>
                    <div className="space-y-2">
                        <Label>New Email</Label>
                        <Input
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="new@example.com"
                            className="bg-background/50 border-white/10"
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button onClick={handleUpdateEmail} disabled={loading || !newEmail} variant="outline">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Update Email
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/30 bg-destructive/5 overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl text-destructive">
                        <AlertTriangle className="h-5 w-5" />
                        Danger Zone
                    </CardTitle>
                    <CardDescription>Irreversible actions. Proceed with caution.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {!showDeleteConfirm ? (
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-medium">Delete Account</h4>
                                <p className="text-sm text-muted-foreground">
                                    Permanently remove your account and all data.
                                </p>
                            </div>
                            <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
                                Delete Account
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4 bg-destructive/10 p-4 rounded-lg border border-destructive/20 animate-in fade-in slide-in-from-top-2">
                            <Alert variant="destructive" className="bg-transparent border-none p-0">
                                <AlertTitle className="flex items-center gap-2 font-bold">
                                    <Trash2 className="h-4 w-4" />
                                    Are you absolutely sure?
                                </AlertTitle>
                                <AlertDescription className="mt-2">
                                    This action cannot be undone. This will permanently delete your account
                                    and remove your data from our servers.
                                </AlertDescription>
                            </Alert>

                            <div className="space-y-2">
                                <Label className="text-destructive-foreground/80">
                                    Type <span className="font-bold select-all">DELETE MY ACCOUNT</span> to confirm
                                </Label>
                                <Input
                                    value={deleteConfirmation}
                                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                                    className="bg-background border-destructive/30 focus:border-destructive"
                                    placeholder="DELETE MY ACCOUNT"
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <Button variant="ghost" onClick={() => setShowDeleteConfirm(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmation !== "DELETE MY ACCOUNT" || loading}
                                >
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Confirm Deletion
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
