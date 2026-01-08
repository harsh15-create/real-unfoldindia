import { FileText, Shield, Scale } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const LegalSection = () => {
    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Legal & Compliance</h2>
                <p className="text-muted-foreground">Read our terms, policies, and licenses.</p>
            </div>

            <div className="grid gap-4">
                <div className="rounded-xl border border-white/5 bg-black/20 p-4 hover:bg-black/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <FileText className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium group-hover:text-primary transition-colors">Terms of Service</h3>
                            <p className="text-sm text-muted-foreground">Last updated: January 2026</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-4 hover:bg-black/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">
                            <Shield className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium group-hover:text-primary transition-colors">Privacy Policy</h3>
                            <p className="text-sm text-muted-foreground">Last updated: January 2026</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-4 hover:bg-black/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                            <Scale className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-medium group-hover:text-primary transition-colors">Cookie Policy</h3>
                            <p className="text-sm text-muted-foreground">Last updated: January 2026</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center pt-8">
                <p className="text-xs text-muted-foreground">
                    Version 1.0.0
                    <br />
                    © 2026 Unfold India. All rights reserved.
                </p>
            </div>
        </div>
    );
};
