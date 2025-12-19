import { ProfileTabs } from '@/components/ProfileTabs';
import { useAuth } from '@/auth/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from '@/components/Header';
import { useState, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from 'sonner';
import { Loader2, Camera } from 'lucide-react';

export default function Profile() {
    const { profile, refreshProfile } = useAuth();
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${profile?.id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
                .eq('id', profile?.id);

            if (updateError) {
                throw updateError;
            }

            await refreshProfile();
            toast.success('Avatar updated successfully!');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container max-w-4xl mx-auto pt-24 pb-12 px-4">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* Sidebar / User Card */}
                    <div className="w-full md:w-1/3">
                        <div className="glass-card rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden">
                            {/* Decorative background blur */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/20 to-transparent pointer-events-none" />

                            <div className="relative group cursor-pointer z-10" onClick={handleAvatarClick}>
                                <div className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                                <Avatar className="h-32 w-32 border-4 border-background relative">
                                    <AvatarImage src={profile?.avatar_url} className="object-cover" />
                                    <AvatarFallback className="text-4xl bg-muted text-muted-foreground">
                                        {profile?.full_name?.charAt(0) || 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
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

                            <div className="mt-6 z-10 space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">{profile?.full_name || 'User'}</h1>
                                <p className="text-muted-foreground font-medium">{profile?.email}</p>
                            </div>

                            <div className="mt-6 inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold tracking-wide uppercase">
                                {Array.isArray(profile?.travel_style) && profile?.travel_style.length > 0
                                    ? profile.travel_style[0]
                                    : 'Traveler'}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="w-full md:w-2/3">
                        <ProfileTabs />
                    </div>
                </div>
            </main>
        </div>
    );
}
