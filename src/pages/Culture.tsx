import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Palette, Church, Drama, BookOpen, Heart } from "lucide-react";

const culturalAspects = [
  {
    icon: Music,
    title: "Music & Dance",
    description: "Classical Indian music, Bollywood, and traditional dance forms like Bharatanatyam and Kathak",
  },
  {
    icon: Palette,
    title: "Arts & Crafts",
    description: "Handicrafts, textiles, pottery, and intricate paintings from different regions",
  },
  {
    icon: Church,
    title: "Religious Traditions",
    description: "Diverse spiritual practices including Hinduism, Buddhism, Jainism, Sikhism, and more",
  },
  {
    icon: Drama,
    title: "Festivals",
    description: "Vibrant celebrations like Diwali, Holi, Durga Puja, and countless regional festivals",
  },
  {
    icon: BookOpen,
    title: "Literature & Philosophy",
    description: "Ancient texts, poetry, and philosophical traditions spanning thousands of years",
  },
  {
    icon: Heart,
    title: "Family & Values",
    description: "Strong family bonds, hospitality, and respect for elders are central to Indian culture",
  },
];

const Culture = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Indian Culture & Traditions
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore the rich tapestry of traditions, art, and spirituality that make India unique
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturalAspects.map((aspect, index) => {
                const Icon = aspect.icon;
                return (
                  <Card 
                    key={aspect.title}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {aspect.title}
                        </h3>
                        <p className="text-foreground/80">
                          {aspect.description}
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

export default Culture;
