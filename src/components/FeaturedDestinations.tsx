import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import keralaImage from "@/assets/kerala-backwaters.jpg";
import rajasthanImage from "@/assets/rajasthan-desert.jpg";
import himalayaImage from "@/assets/himalayan-mountains.jpg";
import goaImage from "@/assets/goa-beach.jpg";

const destinations = [
  {
    name: "Kerala Backwaters",
    location: "Southern India",
    image: keralaImage,
    badge: "Nature",
    description: "Serene waterways through lush tropical landscapes",
  },
  {
    name: "Rajasthan",
    location: "Western India",
    image: rajasthanImage,
    badge: "Heritage",
    description: "Royal palaces and golden desert landscapes",
  },
  {
    name: "Himalayas",
    location: "Northern India",
    image: himalayaImage,
    badge: "Adventure",
    description: "Majestic mountain peaks and spiritual retreats",
  },
  {
    name: "Goa Beaches",
    location: "Western India",
    image: goaImage,
    badge: "Beach",
    description: "Pristine beaches and vibrant coastal culture",
  },
];

export const FeaturedDestinations = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Must-visit places that showcase the beauty and diversity of India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {destinations.map((destination, index) => (
            <Card 
              key={destination.name}
              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl border-border/50 animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  {destination.badge}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  {destination.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {destination.location}
                </p>
                <p className="text-foreground/80">
                  {destination.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
