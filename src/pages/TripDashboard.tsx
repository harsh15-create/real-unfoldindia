import { Calendar, Map, FileText, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const TripDashboard = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">My <span className="text-primary">Trips</span></h1>
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" /> New Trip
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Saved Trip Card */}
                    <div className="glass-card rounded-2xl overflow-hidden group">
                        <div className="h-48 bg-gray-800 relative">
                            <img
                                src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&q=80&w=1000"
                                alt="Trip"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/10">
                                Upcoming
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2">Golden Triangle Tour</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Dec 15-20</span>
                                <span className="flex items-center gap-1"><Map className="h-3 w-3" /> 3 Cities</span>
                            </div>
                            <div className="flex gap-2">
                                <Button className="flex-1 bg-primary text-white hover:bg-primary/90">View Itinerary</Button>
                                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
                            </div>
                        </div>
                    </div>

                    {/* Booking Essentials */}
                    <div className="glass-card rounded-2xl p-6 border-dashed border-2 border-border flex flex-col items-center justify-center text-center min-h-[300px]">
                        <div className="bg-secondary/10 p-4 rounded-full mb-4">
                            <FileText className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-lg font-bold mb-2">Booking Essentials</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-[200px]">
                            Keep your tickets, visas, and IDs handy in one secure place.
                        </p>
                        <Button variant="secondary">Upload Documents</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDashboard;
