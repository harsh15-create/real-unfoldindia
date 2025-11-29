import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Calendar, Info, Globe } from "lucide-react";

const infoCards = [
  {
    icon: Utensils,
    title: "Cuisine & Food",
    description: "Discover India's rich culinary heritage from spicy curries to sweet delicacies",
  },
  {
    icon: Calendar,
    title: "Best Time to Visit",
    description: "Plan your trip according to seasons and festivals for the best experience",
  },
  {
    icon: Info,
    title: "Travel Tips",
    description: "Essential information for a smooth and memorable journey through India",
  },
  {
    icon: Globe,
    title: "Culture & Traditions",
    description: "Immerse yourself in the diverse cultural tapestry of the subcontinent",
  },
];

export const TravelInfo = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Plan Your Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know for an unforgettable Indian adventure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card 
                key={card.title}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="w-14 h-14 mx-auto rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
