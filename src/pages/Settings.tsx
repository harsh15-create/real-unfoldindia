import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SettingsSidebar } from "@/components/settings/SettingsSidebar";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { ChatHistorySection } from "@/components/settings/ChatHistorySection";
import { PrivacySection } from "@/components/settings/PrivacySection";
import { SecuritySection } from "@/components/settings/SecuritySection";
import { BillingSection } from "@/components/settings/BillingSection";
import { PreferencesSection } from "@/components/settings/PreferencesSection";
import { CommunitySection } from "@/components/settings/CommunitySection";
import { ExperimentalSection } from "@/components/settings/ExperimentalSection";
import { LegalSection } from "@/components/settings/LegalSection";
import { SupportSection } from "@/components/settings/SupportSection";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Settings() {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("profile");

    // Sync query param with activeTab on mount and when query changes
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get("tab");
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    // Update URL when activeTab changes (optional, but good UX)
    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tab);
        window.history.pushState({}, "", url.toString());
    };

    const renderContent = () => {
        switch (activeTab) {
            case "profile": return <ProfileSection />;
            case "chat": return <ChatHistorySection />;
            case "privacy": return <PrivacySection />;
            case "security": return <SecuritySection />;
            case "billing": return <BillingSection />;
            case "preferences": return <PreferencesSection />;
            case "community": return <CommunitySection />;
            case "beta": return <ExperimentalSection />;
            case "legal": return <LegalSection />;
            case "support": return <SupportSection />;
            default: return <ProfileSection />;
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />
            <main className="container max-w-7xl mx-auto pt-20 pb-12 px-4 md:px-8">
                <div className="flex flex-col md:flex-row gap-8 min-h-[80vh]">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-64 lg:w-72 flex-shrink-0"
                    >
                        <div className="sticky top-24">
                            <h1 className="text-3xl font-bold mb-2 px-4">Settings</h1>
                            <p className="text-muted-foreground text-sm px-4 mb-6">Manage your account and preferences.</p>
                            <SettingsSidebar activeTab={activeTab} setActiveTab={handleTabChange} isMobile={false} />
                        </div>

                        {/* Mobile Navigation (Visible only on small screens, hidden on md) */}
                        <div className="md:hidden">
                            {/* Re-using sidebar component but we might strictly want to render it differently for mobile.
                     The current sidebar component supports isMobile prop which adapts layout.
                     However, the sticky behavior above is for desktop. 
                  */}
                        </div>
                    </motion.div>

                    <Separator className="hidden md:block h-auto w-[1px] bg-border/40" />

                    {/* Main Content Area */}
                    <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 min-w-0"
                    >
                        <div className="bg-card/30 backdrop-blur-sm rounded-3xl border border-white/5 min-h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
