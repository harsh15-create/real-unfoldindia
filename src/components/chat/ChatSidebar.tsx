import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
    MessageSquare,
    Plus,
    Search,
    Settings,
    MoreHorizontal,
    Trash2,
    Archive,
    History
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Shared interfaces (can be moved to types.ts later)
export interface ChatSession {
    id: string;
    title: string;
    date: Date;
    preview: string;
}

interface ChatSidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onNewChat: () => void;
    currentChatId?: string;
    onSelectChat: (id: string) => void;
    historyEnabled: boolean;
    sessions: ChatSession[]; // New Prop
    onDeleteChat?: (id: string) => void; // New Prop for proper management
}

export function ChatSidebar({
    isOpen,
    onToggle,
    onNewChat,
    currentChatId,
    onSelectChat,
    historyEnabled,
    sessions,
    onDeleteChat
}: ChatSidebarProps) {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Filter sessions by search query
    const filteredSessions = sessions.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Group history by date
    const groupedHistory = filteredSessions.reduce((groups, chat) => {
        const date = new Date(chat.date);
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 3600 * 24));

        let group = 'Older';
        if (diffDays === 0) group = 'Today';
        else if (diffDays === 1) group = 'Yesterday';
        else if (diffDays <= 7) group = 'Previous 7 Days';

        if (!groups[group]) groups[group] = [];
        groups[group].push(chat);
        return groups;
    }, {} as Record<string, ChatSession[]>);

    const groupOrder = ['Today', 'Yesterday', 'Previous 7 Days', 'Older'];

    return (
        <motion.div
            initial={false}
            animate={{ width: isOpen ? 260 : 0, opacity: isOpen ? 1 : 0 }}
            className="flex-shrink-0 h-full bg-[#0B0B15] border-r border-white/10 flex flex-col overflow-hidden"
        >
            <div className="p-3 space-y-2">
                <Button
                    onClick={onNewChat}
                    className="w-full justify-start gap-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                >
                    <Plus className="h-4 w-4" /> New Chat
                </Button>

                {/* Search (Optional, only show if open) */}
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-3 w-3 text-muted-foreground" />
                    <Input
                        placeholder="Search chats..."
                        className="h-8 pl-8 bg-white/5 border-white/5 text-xs focus-visible:ring-1 focus-visible:ring-primary/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            <ScrollArea className="flex-1 px-3">
                {!historyEnabled ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-4 opacity-70">
                        <History className="h-8 w-8 mb-2 opacity-50" />
                        <p className="text-sm font-medium">History is paused</p>
                        <p className="text-xs max-w-[150px]">Chats are not being saved to your history.</p>
                        <Button variant="link" asChild className="text-xs text-primary mt-2">
                            <Link to="/settings?tab=chat">Enable in Settings</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6 py-2">
                        {groupOrder.map(group => {
                            const sessions = groupedHistory[group];
                            if (!sessions || sessions.length === 0) return null;

                            return (
                                <div key={group}>
                                    <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                                        {group}
                                    </h4>
                                    <div className="space-y-1">
                                        {sessions.map(chat => (
                                            <div key={chat.id} className="group relative">
                                                <button
                                                    onClick={() => onSelectChat(chat.id)}
                                                    className={`
                                                    w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-all flex items-center gap-2
                                                    ${currentChatId === chat.id
                                                            ? 'bg-white/10 text-white'
                                                            : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                                                `}
                                                >
                                                    <MessageSquare className="h-3 w-3 shrink-0 opacity-70" />
                                                    <span className="truncate flex-1">{chat.title}</span>
                                                </button>

                                                {/* Context Menu Trigger (Only visible on hover or active) */}
                                                <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                                                                <MoreHorizontal className="h-3 w-3" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-40 bg-[#1e293b] border-white/10 text-white">
                                                            <DropdownMenuItem className="text-xs group-hover:bg-primary/20 cursor-pointer">
                                                                <Archive className="mr-2 h-3 w-3" /> Archive
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={(e) => { e.stopPropagation(); onDeleteChat?.(chat.id); }}
                                                                className="text-xs text-red-400 focus:text-red-400 focus:bg-red-900/20 cursor-pointer"
                                                            >
                                                                <Trash2 className="mr-2 h-3 w-3" /> Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </ScrollArea>

            {/* Footer / User Profile Area */}
            <div className="p-3 border-t border-white/10">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-2 h-auto py-2 px-2 hover:bg-white/5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs">
                                U
                            </div>
                            <div className="text-left flex-1 overflow-hidden">
                                <p className="text-sm font-medium truncate">User</p>
                                <p className="text-[10px] text-muted-foreground truncate">Free Plan</p>
                            </div>
                            <Settings className="h-4 w-4 text-muted-foreground" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-56 bg-[#1e293b] border-white/10 text-white mb-2">
                        <DropdownMenuItem onClick={() => navigate('/settings?tab=profile')} className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" /> Settings & Beta
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/settings?tab=chat')} className="cursor-pointer">
                            <History className="mr-2 h-4 w-4" /> History Controls
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </motion.div >
    );
}
