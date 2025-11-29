import { Card, CardContent } from "@/components/ui/card";
import { Compass, Mountain, Waves, MapPin } from "lucide-react";

const regions = [
  {
    name: "Northern India",
    icon: Mountain,
    description: "Majestic Himalayas, historic monuments, and spiritual destinations",
    color: "text-primary",
  },
  {
    name: "Southern India",
    icon: Waves,
    description: "Tropical beaches, lush backwaters, and ancient temples",
    color: "text-secondary",
  },
  {
    name: "Eastern India",
    icon: Compass,
    description: "Tea gardens, wildlife sanctuaries, and rich cultural heritage",
    color: "text-sage",
  },
  {
    name: "Western India",
    icon: MapPin,
    description: "Desert landscapes, royal palaces, and vibrant cities",
    color: "text-terracotta",
  },
];

export const RegionCards = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Explore by Region
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the unique charm and character of each region across India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region, index) => {
            const Icon = region.icon;
            return (
              <Card 
                key={region.name}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 space-y-4">
                  <div className={`w-14 h-14 rounded-xl bg-background flex items-center justify-center group-hover:scale-110 transition-transform ${region.color}`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {region.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {region.description}
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
