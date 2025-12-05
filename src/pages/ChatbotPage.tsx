import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, Sparkles, X, MapPin, Calendar, DollarSign, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    action?: 'itinerary';
}

const ChatbotPage = () => {
    const [searchParams] = useSearchParams();
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
    }, [searchParams]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
        }
    };

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: "That sounds like a great plan! I can help you find the best spots, food, and stays there. Would you like a day-by-day itinerary?",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
    };

    const handleGenerateItinerary = () => {
        setShowItineraryPopup(false);

        // Add a system message about the generated itinerary
        const userRequest: Message = {
            id: Date.now().toString(),
            text: `Generate a ${itineraryForm.days}-day itinerary for ${itineraryForm.city} with a ${itineraryForm.budget} budget.`,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userRequest]);
        setIsTyping(true);

        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: `Here is a curated ${itineraryForm.days}-day itinerary for ${itineraryForm.city}!\n\n**Day 1: Arrival & Exploration**\n- Morning: Visit the main city attractions.\n- Afternoon: Local lunch and market tour.\n- Evening: Sunset view and dinner.\n\n(This is a demo response. Full AI generation coming soon!)`,
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 2000);
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
                                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

                                    {msg.action === 'itinerary' && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-3 w-full border-primary/20 hover:bg-primary/5 text-primary"
                                            onClick={() => setShowItineraryPopup(true)}
                                        >
                                            <Sparkles className="mr-2 h-4 w-4" /> Plan a Trip
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
                                            placeholder="Enter destination"
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
