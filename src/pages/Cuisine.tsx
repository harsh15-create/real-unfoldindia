import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, Coffee, Soup, Pizza, IceCream, Wine } from "lucide-react";

const cuisineTypes = [
  {
    icon: Utensils,
    title: "North Indian Cuisine",
    description: "Rich curries, tandoori dishes, naan bread, and butter chicken. Known for its use of dairy and aromatic spices.",
  },
  {
    icon: Coffee,
    title: "South Indian Cuisine",
    description: "Rice-based dishes like dosa, idli, and uttapam. Coconut, curry leaves, and tangy flavors dominate.",
  },
  {
    icon: Soup,
    title: "Street Food",
    description: "Pani puri, samosas, vada pav, chaat, and more. Every region has its unique street food specialties.",
  },
  {
    icon: Pizza,
    title: "Regional Specialties",
    description: "Bengali fish curry, Goan vindaloo, Kashmiri wazwan, Rajasthani dal baati churma, and countless others.",
  },
  {
    icon: IceCream,
    title: "Sweets & Desserts",
    description: "Gulab jamun, jalebi, rasgulla, kulfi, and regional sweets made with milk, sugar, and nuts.",
  },
  {
    icon: Wine,
    title: "Beverages",
    description: "Masala chai, lassi, fresh fruit juices, and regional drinks like Sol Kadhi and Aam Panna.",
  },
];

const Cuisine = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Indian Cuisine
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Embark on a flavorful journey through India's diverse culinary landscape
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cuisineTypes.map((cuisine, index) => {
                const Icon = cuisine.icon;
                return (
                  <Card 
                    key={cuisine.title}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="w-16 h-16 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-terracotta" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {cuisine.title}
                        </h3>
                        <p className="text-foreground/80">
                          {cuisine.description}
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

export default Cuisine;
