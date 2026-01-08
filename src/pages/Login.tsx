import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Mail, Phone, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [loading, setLoading] = useState(false);
    const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
    const [method, setMethod] = useState<'email' | 'phone'>('email');

    // Form States
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtpInput, setShowOtpInput] = useState(false);

    // Signup Specific States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [privacyAccepted, setPrivacyAccepted] = useState(false);

    // OAuth Handlers
    const handleOAuth = async (provider: 'google' | 'apple') => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}${from}`,
                },
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    };

    // Email Handler
    const handleEmailAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (authMode === 'signup') {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                if (!privacyAccepted) {
                    throw new Error("Please agree to the privacy policy");
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/complete-profile`,
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            full_name: `${firstName} ${lastName}`.trim(),
                        }
                    },
                });
                if (error) throw error;
                toast.success('Check your email for the confirmation link!', {
                    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
                });
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate(from, { replace: true });
            }
        } catch (error: any) {
            toast.error(error.message, {
                icon: <XCircle className="h-5 w-5 text-red-500" />
            });
        } finally {
            setLoading(false);
        }
    };

    // Phone Handlers
    const handlePhoneSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOtp({
                phone,
            });
            if (error) throw error;
            setShowOtpInput(true);
            toast.success('OTP sent to your phone!');
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase.auth.verifyOtp({
                phone,
                token: otp,
                type: 'sms',
            });
            if (error) throw error;
            navigate(from, { replace: true });
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Visual Side (Left on Desktop) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="hidden lg:flex flex-col justify-between p-12 pt-32 bg-zinc-900 text-white relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1776&auto=format')] bg-cover bg-center opacity-40 mix-blend-overlay" />

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl font-bold tracking-tight mb-6 leading-tight">
                        Experience the <br />
                        <span className="text-zinc-400">Extraordinary.</span>
                    </h1>
                    <p className="text-lg text-zinc-300 leading-relaxed">
                        Discover curated journeys, heritage stays, and the untold stories of India.
                        Your premium travel companion awaits.
                    </p>
                </div>
                <div className="relative z-10 text-sm text-zinc-500">
                    © 2024 Unfold India Inc.
                </div>
            </motion.div>

            {/* Form Side (Right) */}
            <div className="flex items-center justify-center p-6 lg:p-12 pt-20 lg:pt-24 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                    className="w-full max-w-sm space-y-4"
                >
                    {/* Header */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                            {authMode === 'signin' ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            {authMode === 'signin'
                                ? 'Enter your details to access your account'
                                : 'Start your journey with us today'}
                        </p>
                    </div>

                    {/* OAuth Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth('google')}
                            className="h-10 rounded-xl bg-card border-border hover:bg-accent hover:text-accent-foreground transition-all font-medium text-sm"
                            disabled={loading}
                        >
                            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => handleOAuth('apple')}
                            className="h-10 rounded-xl bg-card border-border hover:bg-accent hover:text-accent-foreground transition-all font-medium text-sm"
                            disabled={loading}
                        >
                            <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
                                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74s2.57-.99 4.35-.82c.87.05 1.88.47 2.6 1.32-3.86 1.89-3.35 6.44 2.18 8.16-.62 1.54-1.28 2.76-1.78 3.57-.61.94-1.4 1.77-2.43 2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                            </svg>
                            Apple
                        </Button>
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-wider">
                            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    {/* Method Toggle */}
                    <div className="grid grid-cols-2 p-1 bg-muted/50 rounded-xl">
                        <button
                            onClick={() => setMethod('email')}
                            className={`flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all duration-200 ${method === 'email'
                                ? 'bg-card shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                        </button>
                        <button
                            onClick={() => setMethod('phone')}
                            className={`flex items-center justify-center py-2 text-sm font-medium rounded-lg transition-all duration-200 ${method === 'phone'
                                ? 'bg-card shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Phone className="w-4 h-4 mr-2" />
                            Phone
                        </button>
                    </div>

                    {/* Login Forms */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {method === 'email' ? (
                                <motion.div
                                    key="email-form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full"
                                >
                                    <form onSubmit={handleEmailAuth} className="space-y-4">
                                        <AnimatePresence>
                                            {authMode === 'signup' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="grid grid-cols-2 gap-4 pb-2">
                                                        <div className="space-y-1">
                                                            <Label htmlFor="firstName" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">First Name</Label>
                                                            <Input
                                                                id="firstName"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                required
                                                                className="h-9 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-sm placeholder:text-zinc-700"
                                                                placeholder="John"
                                                            />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label htmlFor="lastName" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Last Name</Label>
                                                            <Input
                                                                id="lastName"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                                required
                                                                className="h-9 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-sm placeholder:text-zinc-700"
                                                                placeholder="Doe"
                                                            />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <div className="space-y-1">
                                            <Label htmlFor="email" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Email address</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="name@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-9 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-sm placeholder:text-zinc-700"
                                            />
                                        </div>

                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <Label htmlFor="password" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Password</Label>
                                                {authMode === 'signin' && (
                                                    <button type="button" onClick={() => navigate('/reset-password')} className="text-[10px] text-zinc-500 hover:text-white transition-colors">
                                                        Forgot?
                                                    </button>
                                                )}
                                            </div>
                                            <Input
                                                id="password"
                                                type="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-9 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-sm"
                                            />
                                        </div>

                                        <AnimatePresence>
                                            {authMode === 'signup' && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="pt-2 space-y-3">
                                                        <div className="space-y-1">
                                                            <Label htmlFor="confirmPassword" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Confirm Password</Label>
                                                            <Input
                                                                id="confirmPassword"
                                                                type="password"
                                                                value={confirmPassword}
                                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                                required
                                                                className="h-9 bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all text-sm"
                                                            />
                                                        </div>
                                                        <div className="flex items-center space-x-2 pt-2">
                                                            <Checkbox
                                                                id="privacy"
                                                                checked={privacyAccepted}
                                                                onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                                                                className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black h-4 w-4 rounded-sm"
                                                            />
                                                            <label
                                                                htmlFor="privacy"
                                                                className="text-[10px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-zinc-500"
                                                            >
                                                                I agree with <span className="text-white hover:underline cursor-pointer">privacy</span> and <span className="text-white hover:underline cursor-pointer">policy</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        <Button className="w-full h-10 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold transition-all duration-300 text-sm mt-4" disabled={loading}>
                                            {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                                            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                                            {!loading && <ArrowRight className="ml-2 h-3 w-3" />}
                                        </Button>
                                    </form>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="phone-form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-full"
                                >
                                    {!showOtpInput ? (
                                        <form onSubmit={handlePhoneSignIn} className="space-y-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="phone" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Phone Number</Label>
                                                <div className="relative">
                                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-zinc-500 font-medium text-sm">+91</span>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        placeholder="98765 43210"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        required
                                                        className="h-9 pl-8 bg-transparent border-0 border-b border-zinc-800 rounded-none focus-visible:ring-0 focus-visible:border-white transition-all text-sm placeholder:text-zinc-700"
                                                    />
                                                </div>
                                            </div>
                                            <Button className="w-full h-10 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold transition-all duration-300 text-sm mt-4" disabled={loading}>
                                                {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                                                Send One-Time Password
                                            </Button>
                                        </form>
                                    ) : (
                                        <form onSubmit={handleVerifyOtp} className="space-y-4">
                                            <div className="space-y-1">
                                                <Label htmlFor="otp" className="text-zinc-500 font-normal text-[10px] uppercase tracking-wider">Verification Code</Label>
                                                <Input
                                                    id="otp"
                                                    type="text"
                                                    placeholder="123456"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                    required
                                                    maxLength={6}
                                                    className="h-9 text-center text-lg tracking-widest bg-transparent border-0 border-b border-zinc-800 rounded-none px-0 focus-visible:ring-0 focus-visible:border-white transition-all"
                                                />
                                            </div>
                                            <Button className="w-full h-10 rounded-xl bg-white text-black hover:bg-zinc-200 font-semibold transition-all duration-300 text-sm mt-4" disabled={loading}>
                                                {loading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                                                Verify & Continue
                                            </Button>
                                            <button
                                                type="button"
                                                onClick={() => setShowOtpInput(false)}
                                                className="w-full text-[10px] text-zinc-500 hover:text-white transition-colors uppercase tracking-wider"
                                            >
                                                Change Phone Number
                                            </button>
                                        </form>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer Toggle */}
                    <div className="pt-1 text-center">
                        <p className="text-xs text-muted-foreground">
                            {authMode === 'signin' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                                className="font-semibold text-white hover:text-primary hover:underline underline-offset-4 transition-all"
                            >
                                {authMode === 'signin' ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
