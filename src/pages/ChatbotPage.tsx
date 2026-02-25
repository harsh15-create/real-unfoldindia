import { useState, useEffect, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Sparkles, X, MapPin, Calendar, DollarSign, PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { toast } from "sonner";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getApiUrl } from "@/config";
import { useAuth } from "@/auth/AuthContext";
import { fetchUserSessions, fetchMessages, sendMessage, deleteSession, ChatSession, ChatMessage } from "@/lib/chatApi";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    action?: 'itinerary';
    excludeFromContext?: boolean;
}

const ChatbotPage = () => {
    const { user } = useAuth();
    const [searchParams] = useSearchParams();
    const location = useLocation();

    // Core State
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isLoadingChats, setIsLoadingChats] = useState(true);

    // Sidebar State
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [currentChatId, setCurrentChatId] = useState<string | undefined>(undefined);
    const [sessions, setSessions] = useState<ChatSession[]>([]);

    // Itinerary Popup State
    const [showItineraryPopup, setShowItineraryPopup] = useState(false);
    const [itineraryForm, setItineraryForm] = useState({
        city: "",
        days: "3",
        budget: "Medium",
        interests: ""
    });

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 1. Load Sessions on Mount
    useEffect(() => {
        if (!user) return;

        const loadSessions = async () => {
            setIsLoadingChats(true);
            try {
                const fetchedSessions = await fetchUserSessions(user.id);
                setSessions(fetchedSessions);

                // If no chat selected, select the first one if available
                if (fetchedSessions.length > 0 && !currentChatId) {
                    setCurrentChatId(fetchedSessions[0].id);
                } else if (fetchedSessions.length === 0) {
                    handleNewChat();
                }
            } catch (error) {
                console.error("Failed to load sessions", error);
                toast.error("Could not load chat history");
            } finally {
                setIsLoadingChats(false);
            }
        };

        loadSessions();
    }, [user]);

    // 2. Load Messages when Active Chat Changes
    useEffect(() => {
        if (!currentChatId || !user) return;

        const loadMessages = async () => {
            try {
                const dbMessages = await fetchMessages(currentChatId);

                // Map DB messages to UI format
                const uiMessages: Message[] = dbMessages.map(msg => ({
                    id: msg.id,
                    text: msg.message_content,
                    sender: msg.message_type === 'assistant' ? 'ai' : 'user',
                    timestamp: new Date(msg.timestamp)
                }));

                setMessages(uiMessages);
            } catch (error) {
                console.error("Failed to load messages", error);
                toast.error("Could not load messages");
            }
        };

        loadMessages();
    }, [currentChatId, user]);

    // 3. Handle Auto-Scroll
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    }, [messages, isTyping]);


    const handleNewChat = () => {
        const newId = crypto.randomUUID(); // Generate a new ID for the frontend session
        setCurrentChatId(newId);
        setMessages([{
            id: 'welcome',
            text: "Hi! I'm Kira, your AI travel companion. Where are you dreaming of going today?",
            sender: 'ai',
            timestamp: new Date(),
            action: 'itinerary'
        }]);
    };

    const handleSelectChat = (id: string) => {
        setCurrentChatId(id);
    };

    const handleDeleteChat = async (id: string) => {
        if (!confirm("Are you sure you want to delete this chat?")) return;
        try {
            await deleteSession(id);
            setSessions(prev => prev.filter(s => s.id !== id));
            if (currentChatId === id) {
                handleNewChat();
            }
            toast.success("Conversation deleted");
        } catch (error) {
            toast.error("Failed to delete conversation");
        }
    };

    const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
        e?.preventDefault();
        const text = overrideText || inputValue;
        if (!text.trim() || !user || !currentChatId) return;

        // Optimistic UI Update
        const newUserMessage: Message = {
            id: 'temp-' + Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, newUserMessage]);
        if (!overrideText) setInputValue("");
        setIsTyping(true);

        try {
            // 1. Save User Message to DB
            await sendMessage(user.id, currentChatId, text, 'user');

            // 2. Prepare History for AI
            const apiMessages = messages
                .filter(msg => !msg.excludeFromContext)
                .map(msg => ({
                    role: msg.sender === 'ai' ? 'assistant' : 'user',
                    content: msg.text
                }));
            apiMessages.push({ role: 'user', content: text });

            // 3. Call AI Backend
            const response = await fetch(getApiUrl("/api/chat"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (!response.ok) throw new Error("AI Backend Error");
            const data = await response.json();
            const aiReplyText = data.reply;

            // 4. Update UI with AI Response
            const aiResponse: Message = {
                id: 'temp-ai-' + Date.now(),
                text: aiReplyText,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);

            // 5. Save AI Response to DB
            await sendMessage(user.id, currentChatId, aiReplyText, 'assistant');

            // 6. Update Session List (Move current to top or add new)
            refreshSessionList(currentChatId, text, aiReplyText);

        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                id: 'error-' + Date.now(),
                text: "Sorry, I'm having trouble connecting to the server.",
                sender: 'ai',
                timestamp: new Date()
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    // Helper to update the sidebar list locally without full re-fetch
    const refreshSessionList = (chatId: string, lastUserMsg: string, lastAiMsg: string) => {
        setSessions(prev => {
            const existingIndex = prev.findIndex(s => s.id === chatId);
            const updatedSession: ChatSession = {
                id: chatId,
                title: existingIndex >= 0 ? prev[existingIndex].title : (lastUserMsg.slice(0, 30) || "New Chat"),
                preview: lastAiMsg.slice(0, 50) + "...",
                date: new Date()
            };

            if (existingIndex >= 0) {
                const newSessions = [...prev];
                newSessions.splice(existingIndex, 1);
                return [updatedSession, ...newSessions];
            } else {
                return [updatedSession, ...prev];
            }
        });
    };

    const handleGenerateItinerary = () => {
        setShowItineraryPopup(false);
        const prompt = `Create the BEST, most DETAILED ${itineraryForm.days}-day itinerary for ${itineraryForm.city} with a ${itineraryForm.budget} budget...`; // Simplified for brevity in this replace
        handleSendMessage(undefined, prompt);
    };

    return (
        <div className="h-screen flex flex-col bg-background font-sans overflow-hidden">
            <Header />

            <div className="flex flex-1 pt-16 overflow-hidden relative">
                <ChatSidebar
                    isOpen={isSidebarOpen}
                    onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    onNewChat={handleNewChat}
                    currentChatId={currentChatId}
                    onSelectChat={handleSelectChat}
                    historyEnabled={true} // Always true for DB
                    sessions={sessions}
                    onDeleteChat={handleDeleteChat}
                />

                <main className="flex-1 flex flex-col relative overflow-hidden transition-all duration-300">
                    <div className="absolute top-4 left-4 z-30">
                        {!isSidebarOpen && (
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className="bg-background/50 backdrop-blur-md border border-white/10 hover:bg-white/10">
                                <PanelLeftOpen className="h-5 w-5" />
                            </Button>
                        )}
                        {isSidebarOpen && (
                            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="md:hidden bg-background/50 backdrop-blur-md border border-white/10">
                                <PanelLeftClose className="h-5 w-5" />
                            </Button>
                        )}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />

                    <div className="flex-1 max-w-4xl mx-auto w-full p-4 flex flex-col h-full">
                        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto space-y-6 py-4 px-2 scrollbar-hide">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'ai' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                                        {msg.sender === 'ai' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                                    </div>
                                    <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'ai' ? 'bg-card border border-border/50 rounded-tl-none' : 'bg-primary text-primary-foreground rounded-tr-none'}`}>
                                        <div className="prose prose-sm dark:prose-invert max-w-none text-sm break-words">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
                                        </div>
                                        {msg.sender === 'ai' && messages.filter(m => m.sender === 'ai').indexOf(msg) === 0 && (
                                            <Button variant="outline" size="sm" className="mt-3 w-full border-primary/20 hover:bg-primary/5 text-primary" onClick={() => setShowItineraryPopup(true)}>
                                                <Sparkles className="mr-2 h-4 w-4" /> Instant Itinerary
                                            </Button>
                                        )}
                                        <span className="text-[10px] opacity-50 block mt-2">
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                            {isTyping && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center"><Bot className="h-5 w-5" /></div>
                                    <div className="bg-card border border-border/50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="mt-4 bg-card/50 backdrop-blur-md border border-border/50 p-2 rounded-full flex items-center gap-2 shadow-lg">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask Kira anything about your trip..."
                                className="bg-transparent border-none focus-visible:ring-0 pl-6 h-12 text-base"
                                autoFocus
                            />
                            <Button onClick={() => handleSendMessage()} size="icon" className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shrink-0 mr-1">
                                <Send className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </main>
            </div>

            <AnimatePresence>
                {showItineraryPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-6 relative">
                                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-muted-foreground hover:text-foreground" onClick={() => setShowItineraryPopup(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary"><Sparkles className="h-6 w-6" /></div>
                                    <div><h2 className="text-xl font-bold">Instant Itinerary</h2><p className="text-sm text-muted-foreground">Let Kira plan your perfect trip</p></div>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Destination</label>
                                        <Input value={itineraryForm.city} onChange={(e) => setItineraryForm({ ...itineraryForm, city: e.target.value })} placeholder="Where to?" className="bg-background border-input font-semibold" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Days</label>
                                            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryForm.days} onChange={(e) => setItineraryForm({ ...itineraryForm, days: e.target.value })} >
                                                {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(d => <option key={d} value={d}>{d} Days</option>)}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2"><DollarSign className="h-4 w-4 text-primary" /> Budget</label>
                                            <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" value={itineraryForm.budget} onChange={(e) => setItineraryForm({ ...itineraryForm, budget: e.target.value })}>
                                                <option value="Budget">Budget</option><option value="Medium">Medium</option><option value="Luxury">Luxury</option>
                                            </select>
                                        </div>
                                    </div>
                                    <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 mt-4" onClick={handleGenerateItinerary}>
                                        <Sparkles className="mr-2 h-5 w-5" /> Generate Plan
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ChatbotPage;
