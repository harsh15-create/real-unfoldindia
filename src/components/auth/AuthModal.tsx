
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
    const navigate = useNavigate();

    const handleOAuth = async (provider: "google" | "apple") => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 text-white">
                <DialogHeader className="space-y-4 text-center">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-tr from-orange-500 to-rose-500 rounded-xl mb-2 flex items-center justify-center shadow-lg shadow-orange-500/20">
                        <span className="text-2xl font-bold text-white">U</span>
                    </div>
                    <DialogTitle className="text-2xl font-bold tracking-tight">
                        Start Your Journey.
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400 text-base">
                        Create a free account to unlock exclusive experiences and curated itineraries.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-3 py-4">
                    <Button
                        variant="outline"
                        className="h-12 text-base font-medium bg-white text-black hover:bg-zinc-200 border-0 rounded-xl relative overflow-hidden transition-all"
                        onClick={() => handleOAuth("google")}
                    >
                        <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Continue with Google
                    </Button>

                    <Button
                        variant="outline"
                        className="h-12 text-base font-medium bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-white rounded-xl transition-all"
                        onClick={() => handleOAuth("apple")}
                    >
                        <svg className="mr-3 h-5 w-5 fill-current" viewBox="0 0 24 24">
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 4.35-.82c.87.05 1.88.47 2.6 1.32-3.86 1.89-3.35 6.44 2.18 8.16-.62 1.54-1.28 2.76-1.78 3.57-.61.94-1.4 1.77-2.43 2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                        Continue with Apple
                    </Button>

                    <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-800" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                            <span className="bg-zinc-950 px-2 text-zinc-500">Or</span>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="h-12 text-base font-medium bg-zinc-900/50 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 rounded-xl transition-all"
                        onClick={() => {
                            onOpenChange(false);
                            navigate("/login");
                        }}
                    >
                        <Mail className="mr-3 h-5 w-5" />
                        Continue with Email
                    </Button>
                </div>

                <DialogDescription className="text-center text-xs text-zinc-600 px-4">
                    By continuing, you verify that you are at least 18 years old and agree to our Terms of Service and Privacy Policy.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
}
