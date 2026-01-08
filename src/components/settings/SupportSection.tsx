import { Button } from "@/components/ui/button";
import { MessageSquare, HelpCircle, Mail, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export const SupportSection = () => {
    return (
        <div className="space-y-8 p-6 md:p-10">
            <div className="space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">Support & Help</h2>
                <p className="text-muted-foreground">Get help with your account or trip planning.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-xl border border-white/5 bg-black/20 p-6 space-y-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Chat Support</h3>
                        <p className="text-sm text-muted-foreground mb-4">Chat with our AI assistant or support team.</p>
                        <Button className="w-full" asChild>
                            <Link to="/chat">Start Chat</Link>
                        </Button>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/20 p-6 space-y-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Mail className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold mb-1">Email Us</h3>
                        <p className="text-sm text-muted-foreground mb-4">Get in touch via email for detailed queries.</p>
                        <Button variant="outline" className="w-full bg-transparent border-white/10 hover:bg-white/5">
                            support@unfoldindia.com
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" /> Frequently Asked Questions
                </h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                        <AccordionContent>
                            You can reset your password from the "Account Security" tab in Settings, or by clicking "Forgot Password" on the login screen.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>Can I download maps offline?</AccordionTrigger>
                        <AccordionContent>
                            Offline maps feature is currently in beta. You can enable it from the "Experimental Features" tab in Settings.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>How is the budget calculated?</AccordionTrigger>
                        <AccordionContent>
                            Trip budgets are estimates based on average costs for accommodation, food, and transport in the selected cities.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
