import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Sparkles, X, MapPin, Calendar, DollarSign, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getApiUrl } from "@/config";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    action?: 'itinerary';
    excludeFromContext?: boolean; // New flag for ephemeral messages
}

const ChatbotPage = () => {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Kira, your AI travel companion. Where are you dreaming of going today?",
            sender: 'ai',
            timestamp: new Date(),
            action: 'itinerary'
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    // Itinerary Popup State
    const [showItineraryPopup, setShowItineraryPopup] = useState(false);
    const [itineraryForm, setItineraryForm] = useState({
        city: "",
        days: "3",
        budget: "Medium",
        interests: ""
    });

    useEffect(() => {
        // Check for itinerary action in URL
        const action = searchParams.get('action');
        const city = searchParams.get('city');

        if (action === 'itinerary' && city) {
            setItineraryForm(prev => ({ ...prev, city }));
            setShowItineraryPopup(true);
        }

        // Check for incoming message from navigation state
        if (location.state?.message) {
            const messageText = location.state.message;
            // Clear history state to prevent re-sending on refresh (optional but good practice, though complex in React Router v6 without functional updates, so we'll just guard with a ref if needed, or simple implementation for now)
            // Actually, simply setting it as input or directly sending it is better.
            // Let's directly send it.
            handleSendMessage(undefined, messageText);
            // Clear state so it doesn't persist if we navigate back? 
            // React Router location state persists. We might want to clear it.
            window.history.replaceState({}, document.title);
        }
    }, [searchParams, location.state]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async (e?: React.FormEvent, overrideText?: string) => {
        e?.preventDefault();
        const text = overrideText || inputValue;
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        const updatedMessages = [...messages, newUserMessage];
        setMessages(updatedMessages);

        if (!overrideText) setInputValue("");
        setIsTyping(true);

        // Prepare History for API (EXCLUDING filtered messages)
        const apiMessages = updatedMessages
            .filter(msg => !msg.excludeFromContext) // The Filter Logic
            .map(msg => ({
                role: msg.sender === 'ai' ? 'assistant' : 'user',
                content: msg.text
            }));

        try {
            const response = await fetch(getApiUrl("/api/chat"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (!response.ok) throw new Error("API Request Failed");

            const data = await response.json();

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: data.reply,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error("Chat Error:", error);
            const errorResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I'm having trouble connecting to the server. Please ensure the backend is running.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleGenerateItinerary = () => {
        setShowItineraryPopup(false);

        // Add a system message about the generated itinerary
        const prompt = `Create the BEST, most DETAILED ${itineraryForm.days}-day itinerary for ${itineraryForm.city} with a ${itineraryForm.budget} budget. 
        For EACH day, strictly provide: 
        1. Morning: Best spot + specific breakfast place.
        2. Afternoon: Hidden gem + activity.
        3. Evening: Sunset spot + dinner recommendation (dish name).
        Ignore brevity for this response.`;


        const userRequest: Message = {
            id: Date.now().toString(),
            text: prompt,
            sender: 'user',
            timestamp: new Date(),
            excludeFromContext: true // MARKED AS EXCLUDED
        };

        const updatedMessages = [...messages, userRequest];
        setMessages(updatedMessages);
        setIsTyping(true);

        // Prepare History correctly (Current Prompt MUST be sent, but not stored in future history)
        // We filter the history, THEN add the current prompt for *this* request only.
        const historyForApi = updatedMessages
            .filter(msg => !msg.excludeFromContext && msg.id !== userRequest.id) // Filter old excluded + current (added manually below)
            .map(msg => ({
                role: msg.sender === 'ai' ? 'assistant' : 'user',
                content: msg.text
            }));

        // Final API payload includes the filtered history + the current prompt
        const apiMessages = [...historyForApi, { role: 'user', content: prompt }];

        // Use the same handler logic (could slightly refactor, but calling the API directly here is cleaner for now)
        fetch(getApiUrl("/api/chat"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messages: apiMessages })
        })
            .then(res => res.json())
            .then(data => {
                const aiResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: data.reply,
                    sender: 'ai',
                    timestamp: new Date(),
                    excludeFromContext: true // RESPONSE ALSO EXCLUDED
                };
                setMessages(prev => [...prev, aiResponse]);
            })
            .catch(err => {
                const errorResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Sorry, I couldn't generate the itinerary. Please try again.",
                    sender: 'ai',
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, errorResponse]);
            })
            .finally(() => setIsTyping(false));
    };

    const messagesEndRef = useRef<HTMLDivElement>(null);

    return (
        <div className="h-screen flex flex-col bg-background font-sans overflow-hidden">
            <Header />

            <main className="flex-1 flex flex-col pt-16 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background -z-10" />
                <div className="absolute top-20 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-500/10 rounded-full blur-[80px] -z-10" />

                {/* Chat Container */}
                <div className="flex-1 container max-w-4xl mx-auto p-4 flex flex-col h-full">

                    {/* Messages Area */}
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
                                <div className={`max-w-[80%] p-4 rounded-2xl ${msg.sender === 'ai'
                                    ? 'bg-card border border-border/50 rounded-tl-none'
                                    : 'bg-primary text-primary-foreground rounded-tr-none'
                                    }`}>
                                    <div className="prose prose-sm dark:prose-invert max-w-none text-sm break-words">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {msg.text}
                                        </ReactMarkdown>
                                    </div>

                                    {msg.action === 'itinerary' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 w-full border-primary/20 hover:bg-primary/5 text-primary"
                                            onClick={() => setShowItineraryPopup(true)}
                                        >
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
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                                    <Bot className="h-5 w-5" />
                                </div>
                                <div className="bg-card border border-border/50 p-4 rounded-2xl rounded-tl-none flex gap-1">
                                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" />
                                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-100" />
                                    <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce delay-200" />
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="mt-4 bg-card/50 backdrop-blur-md border border-border/50 p-2 rounded-full flex items-center gap-2 shadow-lg">
                        <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Ask Kira anything about your trip..."
                            className="bg-transparent border-none focus-visible:ring-0 pl-6 h-12 text-base"
                            autoFocus
                        />
                        <Button
                            onClick={() => handleSendMessage()}
                            size="icon"
                            className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 shrink-0 mr-1"
                        >
                            <Send className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </main>

            {/* Itinerary Popup Modal */}
            <AnimatePresence>
                {showItineraryPopup && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-card border border-border w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-6 relative">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                                    onClick={() => setShowItineraryPopup(false)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>

                                <div className="flex items-center gap-3 mb-6">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <Sparkles className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold">Instant Itinerary</h2>
                                        <p className="text-sm text-muted-foreground">Let Kira plan your perfect trip</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-primary" /> Destination
                                        </label>
                                        <Input
                                            value={itineraryForm.city}
                                            onChange={(e) => setItineraryForm({ ...itineraryForm, city: e.target.value })}
                                            placeholder="Where to?"
                                            className="bg-background border-input font-semibold"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary" /> Days
                                            </label>
                                            <select
                                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                value={itineraryForm.days}
                                                onChange={(e) => setItineraryForm({ ...itineraryForm, days: e.target.value })}
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 10, 14].map(d => (
                                                    <option key={d} value={d}>{d} Days</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-primary" /> Budget
                                            </label>
                                            <select
                                                className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                                value={itineraryForm.budget}
                                                onChange={(e) => setItineraryForm({ ...itineraryForm, budget: e.target.value })}
                                            >
                                                <option value="Budget">Budget</option>
                                                <option value="Medium">Medium</option>
                                                <option value="Luxury">Luxury</option>
                                            </select>
                                        </div>
                                    </div>

                                    <Button
                                        className="w-full h-12 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:opacity-90 mt-4"
                                        onClick={handleGenerateItinerary}
                                    >
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
