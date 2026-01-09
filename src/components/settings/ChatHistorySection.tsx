import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
// import { Switch } from '@/components/ui/switch'; // Assuming shadcn switch exists, if not using standard input
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
    Brain,
    Download,
    Trash2,
    Clock,
    History,
    ShieldAlert,
    ChevronRight,
    FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from "@/auth/AuthContext";
import { deleteAllUserChats } from "@/lib/chatApi";

export function ChatHistorySection() {
    const { user } = useAuth();
    // --- State Management ---
    const [historyEnabled, setHistoryEnabled] = useState(() => {
        const saved = localStorage.getItem('chat_history_enabled');
        return saved !== null ? JSON.parse(saved) : true;
    });

    useEffect(() => {
        localStorage.setItem('chat_history_enabled', JSON.stringify(historyEnabled));
    }, [historyEnabled]);


    const [personalizationEnabled, setPersonalizationEnabled] = useState(true);
    const [retentionPeriod, setRetentionPeriod] = useState("forever");
    const [isDeleting, setIsDeleting] = useState(false);

    // Mock Data for Devices


    // --- Actions ---
    // --- Actions ---
    const handleClearHistory = async () => {
        if (!user) return;

        setIsDeleting(true);
        try {
            await deleteAllUserChats(user.id);
            toast.success("Chat history cleared successfully.");
        } catch (error) {
            toast.error("Failed to clear history.");
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };



    const handleExport = (format: string) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: `Preparing ${format} export...`,
                success: `Your chat history has been exported as ${format}.`,
                error: 'Export failed',
            }
        );
    };

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-8 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header Section */}
            <div className="flex flex-col space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Chat Settings</h2>
                <p className="text-muted-foreground">Manage your conversation history, sync preferences, and privacy controls.</p>
            </div>

            {/* 1. History Visibility & Storage */}
            <motion.div variants={itemVariants}>
                <Card className="glass-card border-none overflow-hidden">
                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <History className="h-5 w-5 text-primary" />
                                    History & Storage
                                </CardTitle>
                                <CardDescription>Control how your conversations are saved and accessed.</CardDescription>
                            </div>
                            <Switch
                                checked={historyEnabled}
                                onCheckedChange={setHistoryEnabled}
                                className="data-[state=checked]:bg-primary"
                            />
                        </div>
                    </CardHeader>
                    {historyEnabled && (
                        <CardContent className="space-y-6 animate-in slide-in-from-top-4 fade-in duration-300">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10 flex items-center justify-between transition-colors hover:bg-white/10 group">
                                <div className="space-y-1">
                                    <h4 className="font-medium text-foreground">Auto-Delete Messages</h4>
                                    <p className="text-xs text-muted-foreground">Automatically remove chats older than a specific period.</p>
                                </div>
                                <Select value={retentionPeriod} onValueChange={setRetentionPeriod}>
                                    <SelectTrigger className="w-[140px] bg-background/50 border-white/10 focus:ring-primary/50">
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="30days">30 Days</SelectItem>
                                        <SelectItem value="6months">6 Months</SelectItem>
                                        <SelectItem value="1year">1 Year</SelectItem>
                                        <SelectItem value="forever">Keep Forever</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm font-medium text-muted-foreground">Detailed History Management</span>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="sm" className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20">
                                            <Trash2 className="mr-2 h-4 w-4" /> Clear All History
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="glass-card bg-[#0B0B15]/95 border-white/10">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This action cannot be undone. This will permanently delete your entire chat history from our servers.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="border-white/10 hover:bg-white/5 hover:text-white">Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleClearHistory} className="bg-destructive hover:bg-destructive/90 text-white">
                                                {isDeleting ? "Deleting..." : "Yes, Delete Everything"}
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </CardContent>
                    )}
                </Card>
            </motion.div>



            {/* 3. Memory & Personalization */}
            <motion.div variants={itemVariants}>
                <Card className="glass-card border-none">
                    <CardHeader>
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Brain className="h-5 w-5 text-primary" />
                                    Memory & Personalization
                                </CardTitle>
                                <CardDescription>Allow the system to learn from your chats to provide better recommendations.</CardDescription>
                            </div>
                            <Switch
                                checked={personalizationEnabled}
                                onCheckedChange={setPersonalizationEnabled}
                                className="data-[state=checked]:bg-primary"
                            />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm text-blue-200/80 flex gap-3">
                            <ShieldAlert className="h-5 w-5 shrink-0 text-blue-400" />
                            <p>
                                When enabled, Kira remembers details like your preferred airlines, dietary restrictions, and travel style.
                                This data is encrypted and never shared with third parties.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 4. Data Export */}
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
                <Card className="glass-card border-none hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => handleExport("PDF")}>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medium">Export as PDF</h4>
                                <p className="text-xs text-muted-foreground">Download your chat history</p>
                            </div>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                </Card>

                <Card className="glass-card border-none hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => handleExport("JSON")}>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <div className="text-xs font-bold text-primary">JSON</div>
                            </div>
                            <div>
                                <h4 className="font-medium">Export Data</h4>
                                <p className="text-xs text-muted-foreground">Machine-readable format</p>
                            </div>
                        </div>
                        <Download className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                </Card>
            </motion.div>

            {/* Footer / Privacy Links */}
            <motion.div variants={itemVariants} className="pt-4 flex flex-col items-center gap-2 text-center pb-8">
                <p className="text-sm text-muted-foreground">
                    Your data is securely stored and encrypted.
                    <a href="#" className="underline hover:text-primary ml-1">Privacy Policy</a> •
                    <a href="#" className="underline hover:text-primary ml-1">Terms of Service</a>
                </p>
                <button className="text-xs text-destructive hover:underline opacity-60 hover:opacity-100 transition-opacity">
                    Permanently Delete Account & Data
                </button>
            </motion.div>
        </motion.div>
    );
}
