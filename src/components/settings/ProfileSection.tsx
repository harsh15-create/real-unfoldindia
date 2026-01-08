import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/auth/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Camera, Save, User, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { motion } from "framer-motion";

export const ProfileSection = () => {
    const { profile, refreshProfile } = useAuth();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || "");
            setBio(profile.bio || "");
            setCountry(profile.country || "");
            setPhone(profile.phone || "");
        }
    }, [profile]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${profile?.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from("profiles")
                .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
                .eq("id", profile?.id);

            if (updateError) throw updateError;

            await refreshProfile();
            toast.success("Avatar updated successfully!");
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        if (!profile) return;
        setLoading(true);

        try {
            const { error } = await supabase
                .from("profiles")
                .update({
                    full_name: fullName,
                    bio: bio,
                    country: country,
                    phone: phone,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", profile.id);

            if (error) throw error;

            await refreshProfile();
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">Profile & Identity</h2>
                    <p className="text-muted-foreground">Manage your public profile and personal details.</p>
                </div>
                <div className="flex-1" />
                <Button onClick={handleSave} disabled={loading} className="rounded-full px-6 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Avatar Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-1"
                >
                    <div className="rounded-2xl border border-white/5 bg-black/20 p-6 flex flex-col items-center text-center space-y-4">
                        <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-purple-600 opacity-75 group-hover:opacity-100 blur transition duration-500"></div>
                            <Avatar className="h-32 w-32 relative border-4 border-background">
                                <AvatarImage src={profile?.avatar_url} className="object-cover" />
                                <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                                    {profile?.full_name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                                {uploading ? (
                                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                                ) : (
                                    <Camera className="h-8 w-8 text-white" />
                                )}
                            </div>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={uploadAvatar}
                            accept="image/*"
                            className="hidden"
                            disabled={uploading}
                        />
                        <div>
                            <h3 className="font-medium">{profile?.email}</h3>
                            <p className="text-xs text-muted-foreground mt-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 inline-flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" /> Verified Account
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Form Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="md:col-span-2 space-y-6"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" /> Full Name</Label>
                            <Input
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="e.g. Aditi Sharma"
                                className="bg-white/5 border-white/10 focus:border-primary/50 h-10 transition-all focus:bg-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> Country</Label>
                            <Input
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                placeholder="e.g. India"
                                className="bg-white/5 border-white/10 focus:border-primary/50 h-10 transition-all focus:bg-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" /> Phone</Label>
                            <Input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+91 99999 99999"
                                type="tel"
                                className="bg-white/5 border-white/10 focus:border-primary/50 h-10 transition-all focus:bg-white/10"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4" /> Email</Label>
                            <Input
                                value={profile?.email || ""}
                                readOnly
                                disabled
                                className="bg-white/5 border-white/10 opacity-50 cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-muted-foreground">Bio</Label>
                        <Textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us a little about yourself..."
                            className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[120px] resize-none transition-all focus:bg-white/10"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
