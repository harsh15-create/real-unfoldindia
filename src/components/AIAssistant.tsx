import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, X, Send, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    text: string;
    sender: "user" | "ai";
}

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", text: "Hi, I am Kira, your travel buddy! Tell me how could I help you?", sender: "ai" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user"
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const responses = [
                "That sounds like a great plan! I'd recommend taking the scenic route via NH48 for the best views.",
                "I can help with that. Based on current traffic, leaving before 8 AM would save you about 45 minutes.",
                "Noted. I've updated your preferences for more stops along the way.",
                "The weather looks perfect for that trip. Don't forget to check out the local cafes near the highway!"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            const newAiMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: randomResponse,
                sender: "ai"
            };
            setMessages(prev => [...prev, newAiMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom left" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="pointer-events-auto mb-4 w-[350px] md:w-[380px] h-[500px] max-h-[80vh] bg-gradient-to-b from-[#1e293b]/95 to-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Bot className="h-6 w-6 text-white" />
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(false)}
                                className="text-white/40 hover:text-white hover:bg-white/10 rounded-full h-8 w-8 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex gap-3 max-w-[85%]",
                                        msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                        msg.sender === "ai" ? "bg-white/10 border border-white/5" : "bg-primary/20 border border-primary/20"
                                    )}>
                                        {msg.sender === "ai" ? <Sparkles className="h-4 w-4 text-primary" /> : <User className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                        msg.sender === "ai"
                                            ? "bg-white/5 text-white/90 rounded-tl-none border border-white/5"
                                            : "bg-primary text-white rounded-tr-none shadow-primary/20"
                                    )}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3 max-w-[85%]">
                                    <div className="h-8 w-8 rounded-full bg-white/10 border border-white/5 flex items-center justify-center shrink-0">
                                        <Sparkles className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-1 h-10">
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white/[0.02] border-t border-white/5">
                            <form onSubmit={handleSend} className="relative flex items-center gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Hi, I wanna know..."
                                    className="h-12 bg-white/5 border-white/10 focus:border-primary/50 focus:bg-white/10 rounded-full pl-5 pr-12 text-white placeholder:text-white/30 transition-all"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-1.5 h-9 w-9 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.div
                className="pointer-events-auto"
                initial="idle"
                whileHover="hover"
                whileTap="tap"
                variants={{
                    idle: { scale: 1, rotate: 0 },
                    hover: {
                        scale: 1.05,
                        rotate: [0, -3, 3, -3, 3, 0],
                        transition: { duration: 0.4, ease: "easeInOut" }
                    },
                    tap: { scale: 0.95 }
                }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                        "rounded-full h-14 w-14 p-0 aspect-square shadow-[0_8px_30px_rgba(255,145,77,0.4)] bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all duration-500 border border-white/10",
                        isOpen ? "rotate-90 bg-gradient-to-br from-[#1e293b] to-[#0f172a] text-primary border-primary/50 hover:from-[#334155] hover:to-[#1e293b]" : ""
                    )}
                >
                    {isOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <motion.div
                            variants={{
                                hover: {
                                    rotate: [0, -20, 20, -20, 20, 0],
                                    transition: { duration: 0.5, ease: "linear", repeat: Infinity, repeatDelay: 0.5 }
                                }
                            }}
                        >
                            <Bot className="h-[50px] w-[50px]" />
                        </motion.div>
                    )}
                </Button>
            </motion.div>
        </div>
    );
};

export default AIAssistant;
