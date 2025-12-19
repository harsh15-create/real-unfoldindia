import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User, Map, Trophy, Loader2, Save, Shield } from 'lucide-react';
import { useAuth } from '@/auth/AuthContext';
import { ProgressTab } from './profile/ProgressTab';
import { AccountSettingsTab } from './profile/AccountSettingsTab';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const TRAVEL_STYLES = ['Budget', 'Luxury', 'Backpacking', 'Family', 'Adventure', 'Cultural', 'Relaxed'];
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Central India', 'North East India'];
const INTERESTS = ['Culture', 'Food', 'Nature', 'Spiritual', 'History', 'Wildlife', 'Nightlife', 'Shopping'];

const LANGUAGES = [
    "English", "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Urdu", "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", // Indian Languages
    "Spanish", "French", "German", "Italian", "Portuguese", "Russian", "Japanese", "Chinese", "Korean", "Arabic", "Turkish", "Dutch" // International
].sort();

export function ProfileTabs() {
    const { profile, refreshProfile } = useAuth();
    const [loading, setLoading] = useState(false);

    // Local state for form fields
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [country, setCountry] = useState('');
    const [phone, setPhone] = useState('');
    const [preferredLanguage, setPreferredLanguage] = useState('');
    const [travelStyles, setTravelStyles] = useState<string[]>([]);
    const [preferredRegions, setPreferredRegions] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);

    // Initialize state from profile when it loads
    useEffect(() => {
        if (profile) {
            setFullName(profile.full_name || '');
            setBio(profile.bio || '');
            setCountry(profile.country || '');
            setPhone(profile.phone || '');
            setPreferredLanguage(profile.preferred_language || 'English');
            setTravelStyles(Array.isArray(profile.travel_style) ? profile.travel_style : []);
            setPreferredRegions(Array.isArray(profile.preferred_regions) ? profile.preferred_regions : []);
            setInterests(Array.isArray(profile.interests) ? profile.interests : []);
        }
    }, [profile]);

    const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleSave = async () => {
        if (!profile) return;
        setLoading(true);

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    bio: bio,
                    country: country,
                    phone: phone,
                    preferred_language: preferredLanguage,
                    travel_style: travelStyles,
                    preferred_regions: preferredRegions,
                    interests: interests,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', profile.id);

            if (error) throw error;

            await refreshProfile();
            toast.success('Profile updated successfully!');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Tabs defaultValue="progress" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-transparent p-1 mb-8 gap-4">
                <TabsTrigger
                    value="info"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-full py-3 border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
                >
                    <User className="mr-2 h-4 w-4" /> Info
                </TabsTrigger>
                <TabsTrigger
                    value="preferences"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-full py-3 border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
                >
                    <Map className="mr-2 h-4 w-4" /> Travel
                </TabsTrigger>
                <TabsTrigger
                    value="progress"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-full py-3 border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
                >
                    <Trophy className="mr-2 h-4 w-4" /> Progress
                </TabsTrigger>
                <TabsTrigger
                    value="account"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg rounded-full py-3 border border-border/50 bg-card/50 hover:bg-card/80 transition-all duration-300"
                >
                    <Shield className="mr-2 h-4 w-4" /> Account
                </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-0">
                <Card className="glass-card border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Personal Information</CardTitle>
                        <CardDescription>
                            Manage your personal details and public profile.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Your full name"
                                    className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={profile?.email || ''} readOnly className="bg-muted/50 border-white/5" />
                            </div>
                            <div className="space-y-2">
                                <Label>Phone Number</Label>
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="+91 98765 43210"
                                    type="tel"
                                    className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Country</Label>
                                <Input
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    placeholder="Your country"
                                    className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Tell us a bit about yourself..."
                                className="resize-none h-32 bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                            />
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto rounded-full px-8">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-0">
                <Card className="glass-card border-none shadow-xl">
                    <CardHeader>
                        <CardTitle className="text-2xl">Travel Preferences</CardTitle>
                        <CardDescription>
                            Customize your travel recommendations.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Travel Style</Label>
                            <div className="flex flex-wrap gap-3">
                                {TRAVEL_STYLES.map(style => (
                                    <Badge
                                        key={style}
                                        variant={travelStyles.includes(style) ? "default" : "outline"}
                                        className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${travelStyles.includes(style)
                                            ? 'shadow-lg shadow-primary/20 scale-105'
                                            : 'hover:bg-primary/10 hover:border-primary/50'
                                            }`}
                                        onClick={() => toggleSelection(style, travelStyles, setTravelStyles)}
                                    >
                                        {style}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Preferred Regions</Label>
                            <div className="flex flex-wrap gap-3">
                                {REGIONS.map(region => (
                                    <Badge
                                        key={region}
                                        variant={preferredRegions.includes(region) ? "default" : "outline"}
                                        className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${preferredRegions.includes(region)
                                            ? 'shadow-lg shadow-primary/20 scale-105'
                                            : 'hover:bg-primary/10 hover:border-primary/50'
                                            }`}
                                        onClick={() => toggleSelection(region, preferredRegions, setPreferredRegions)}
                                    >
                                        {region}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Label className="text-lg font-semibold">Interests</Label>
                            <div className="flex flex-wrap gap-3">
                                {INTERESTS.map(interest => (
                                    <Badge
                                        key={interest}
                                        variant={interests.includes(interest) ? "default" : "outline"}
                                        className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${interests.includes(interest)
                                            ? 'shadow-lg shadow-primary/20 scale-105'
                                            : 'hover:bg-primary/10 hover:border-primary/50'
                                            }`}
                                        onClick={() => toggleSelection(interest, interests, setInterests)}
                                    >
                                        {interest}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-4 max-w-md">
                            <Label className="text-lg font-semibold">Preferred Language</Label>
                            <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                                <SelectTrigger className="bg-background/50 border-white/10">
                                    <SelectValue placeholder="Select a language" />
                                </SelectTrigger>
                                <SelectContent>
                                    {LANGUAGES.map(lang => (
                                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex justify-end pt-4">
                            <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto rounded-full px-8">
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                <Save className="mr-2 h-4 w-4" /> Save Preferences
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="progress" className="mt-0">
                <ProgressTab />
            </TabsContent>

            <TabsContent value="account" className="mt-0">
                <AccountSettingsTab />
            </TabsContent>
        </Tabs>
    );
}
