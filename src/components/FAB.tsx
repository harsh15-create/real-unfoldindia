import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAB = () => {
    return (
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                size="lg"
                className="rounded-full h-14 px-6 shadow-lg bg-primary hover:bg-primary/90 text-white flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
                <Bot className="h-6 w-6" />
                <span className="font-medium">AI Assistance</span>
            </Button>
        </div>
    );
};

export default FAB;
