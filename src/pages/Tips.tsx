import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users, Utensils, Shirt, MessageCircle, Camera } from "lucide-react";

const tips = [
  {
    icon: Lightbulb,
    title: "Respect Local Customs",
    description: "Remove shoes before entering temples and homes, dress modestly in religious places, and always ask permission before taking photos of people.",
  },
  {
    icon: Users,
    title: "Interact with Locals",
    description: "Indians are known for their hospitality. Don't hesitate to ask for directions or recommendations - locals often provide the best travel insights.",
  },
  {
    icon: Utensils,
    title: "Try Street Food Wisely",
    description: "Indian street food is delicious but choose busy stalls with high turnover. Start with milder spices if you're not used to spicy food.",
  },
  {
    icon: Shirt,
    title: "Dress Appropriately",
    description: "Light, breathable clothing for hot weather. Cover shoulders and knees in religious sites. Carry a scarf or shawl for versatility.",
  },
  {
    icon: MessageCircle,
    title: "Learn Basic Phrases",
    description: "Knowing simple Hindi phrases like 'Namaste' (hello), 'Dhanyavaad' (thank you), and 'Kitna hai?' (how much?) goes a long way.",
  },
  {
    icon: Camera,
    title: "Photography Etiquette",
    description: "Some temples prohibit photography. Always ask permission before photographing people, especially women and in rural areas.",
  },
];

const Tips = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Travel Tips
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Essential advice to make your Indian adventure smooth and memorable
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <Card
                    key={tip.title}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-7 h-7 text-secondary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">
                          {tip.title}
                        </h3>
                        <p className="text-sm text-foreground/80">
                          {tip.description}
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

export default Tips;
