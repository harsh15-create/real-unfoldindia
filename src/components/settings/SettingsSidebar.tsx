import { motion } from "framer-motion";
import { User, Lock, Shield, CreditCard, Sliders, Users, FlaskConical, Gavel, HelpCircle, MessageSquare } from "lucide-react";

interface SettingsSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    isMobile?: boolean;
}

export const SettingsSidebar = ({ activeTab, setActiveTab, isMobile = false }: SettingsSidebarProps) => {
    const sidebarItems = [
        { id: "profile", label: "Profile & Identity", icon: User },
        { id: "chat", label: "Chat History", icon: MessageSquare }, // New Item
        { id: "privacy", label: "Privacy & Permissions", icon: Lock },
        { id: "security", label: "Account Security", icon: Shield },
        { id: "billing", label: "Payments & Billing", icon: CreditCard },
        { id: "preferences", label: "Personalization", icon: Sliders },
        { id: "community", label: "Community & Social", icon: Users },
        { id: "beta", label: "Experimental Features", icon: FlaskConical },
        { id: "legal", label: "Legal & Compliance", icon: Gavel },
        { id: "support", label: "Support", icon: HelpCircle },
    ];

    return (
        <nav className={`space-y-1 ${isMobile ? 'flex flex-row overflow-x-auto space-y-0 space-x-2 pb-4 scrollbar-hide' : ''}`}>
            {sidebarItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
            group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200
            ${isMobile ? 'whitespace-nowrap flex-shrink-0' : 'w-full'}
            ${activeTab === item.id
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                            : 'text-muted-foreground hover:bg-white/5 hover:text-white'}
          `}
                >
                    <item.icon className={`
            mr-3 h-5 w-5 transition-colors
            ${activeTab === item.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'}
          `} />
                    {item.label}
                </button>
            ))}
        </nav>
    );
};
