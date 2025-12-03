import { MapPin } from "lucide-react";

const MapPage = () => {
    return (
        <div className="min-h-screen bg-background pt-24 pb-12 px-4 md:px-8 flex flex-col">
            <h1 className="text-4xl font-bold mb-6">Interactive <span className="text-primary">Map</span></h1>

            <div className="flex-1 bg-muted/30 rounded-3xl border border-border relative overflow-hidden flex items-center justify-center group">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2074')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity" />

                <div className="relative z-10 text-center p-8 glass rounded-2xl max-w-md">
                    <div className="bg-primary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Map Integration</h3>
                    <p className="text-muted-foreground">
                        Interactive map with safety heatmaps, tourist spots, and live traffic will be rendered here.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
