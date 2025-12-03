import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Mountain, Waves, Compass, Camera, Users, Sparkles } from "lucide-react";

const experiences = [
  {
    icon: Mountain,
    title: "Trekking & Hiking",
    description: "Explore scenic trails in the Himalayas and Western Ghats",
    color: "text-primary",
  },
  {
    icon: Waves,
    title: "Water Adventures",
    description: "Experience river rafting, backwater cruises, and beach activities",
    color: "text-secondary",
  },
  {
    icon: Compass,
    title: "Cultural Tours",
    description: "Immerse in local traditions, festivals, and heritage walks",
    color: "text-sage",
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description: "Capture stunning landscapes, wildlife, and architectural wonders",
    color: "text-terracotta",
  },
  {
    icon: Users,
    title: "Village Experiences",
    description: "Live with local communities and learn traditional crafts",
    color: "text-warmOrange",
  },
  {
    icon: Sparkles,
    title: "Spiritual Retreats",
    description: "Find peace in yoga ashrams and meditation centers",
    color: "text-primary",
  },
];

const Experiences = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Unique Experiences
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Create unforgettable memories with authentic Indian experiences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience, index) => {
                const Icon = experience.icon;
                return (
                  <Card
                    key={experience.title}
                    className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-border/50 bg-card animate-in fade-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className={`w-16 h-16 rounded-xl bg-background flex items-center justify-center group-hover:scale-110 transition-transform ${experience.color}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {experience.title}
                        </h3>
                        <p className="text-foreground/80">
                          {experience.description}
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

export default Experiences;
