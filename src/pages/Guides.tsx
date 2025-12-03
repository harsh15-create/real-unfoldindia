import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Hotel, MapPin, Calendar, Wallet, Shield } from "lucide-react";

const guideTopics = [
  {
    icon: Plane,
    title: "Getting There",
    description: "Flight information, visa requirements, and entry procedures for international travelers",
  },
  {
    icon: Hotel,
    title: "Accommodation",
    description: "From luxury hotels to budget hostels, find the perfect place to stay",
  },
  {
    icon: MapPin,
    title: "Transportation",
    description: "Navigate India's trains, buses, taxis, and domestic flights with ease",
  },
  {
    icon: Calendar,
    title: "Best Time to Visit",
    description: "Seasonal guide to help you plan your trip for optimal weather and experiences",
  },
  {
    icon: Wallet,
    title: "Budget Planning",
    description: "Cost estimates, money-saving tips, and currency exchange information",
  },
  {
    icon: Shield,
    title: "Safety & Health",
    description: "Important health precautions, safety tips, and emergency contacts",
  },
];

const Guides = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Travel Guides
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Essential information and practical tips for planning your perfect Indian journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guideTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <Card
                    key={topic.title}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {topic.title}
                        </h3>
                        <p className="text-foreground/80">
                          {topic.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Guides;
