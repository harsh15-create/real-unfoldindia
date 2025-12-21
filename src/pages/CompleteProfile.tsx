import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/AuthContext';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

const TRAVEL_STYLES = ['Budget', 'Luxury', 'Backpacking', 'Family', 'Adventure', 'Cultural', 'Relaxed'];
const REGIONS = ['North India', 'South India', 'East India', 'West India', 'Central India', 'North East India'];
const INTERESTS = ['Culture', 'Food', 'Nature', 'Spiritual', 'History', 'Wildlife', 'Nightlife', 'Shopping'];

export default function CompleteProfile() {
    const { user, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [travelStyles, setTravelStyles] = useState<string[]>([]);
    const [regions, setRegions] = useState<string[]>([]);
    const [interests, setInterests] = useState<string[]>([]);

    const toggleSelection = (item: string, list: string[], setList: (l: string[]) => void) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    full_name: fullName,
                    country: country,
                    travel_style: travelStyles,
                    preferred_regions: regions,
                    interests: interests,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            await refreshProfile();
            toast.success('Profile updated successfully!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 py-8">
            <Card className="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Complete Your Profile</CardTitle>
                    <CardDescription>
                        Tell us more about yourself to personalize your Unfold India experience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="country">Country</Label>
                                <Input
                                    id="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                    placeholder="India"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Travel Style (Select multiple)</Label>
                            <div className="flex flex-wrap gap-2">
                                {TRAVEL_STYLES.map(style => (
                                    <Badge
                                        key={style}
                                        variant={travelStyles.includes(style) ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/80"
                                        onClick={() => toggleSelection(style, travelStyles, setTravelStyles)}
                                    >
                                        {style}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Preferred Regions</Label>
                            <div className="flex flex-wrap gap-2">
                                {REGIONS.map(region => (
                                    <Badge
                                        key={region}
                                        variant={regions.includes(region) ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/80"
                                        onClick={() => toggleSelection(region, regions, setRegions)}
                                    >
                                        {region}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label>Interests</Label>
                            <div className="flex flex-wrap gap-2">
                                {INTERESTS.map(interest => (
                                    <Badge
                                        key={interest}
                                        variant={interests.includes(interest) ? "default" : "outline"}
                                        className="cursor-pointer hover:bg-primary/80"
                                        onClick={() => toggleSelection(interest, interests, setInterests)}
                                    >
                                        {interest}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <Button className="w-full" type="submit" disabled={loading}>
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
