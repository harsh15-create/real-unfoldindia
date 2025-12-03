import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const regionData = {
  "north-india": {
    name: "Northern India",
    description: "Home to the majestic Himalayas, historic monuments like the Taj Mahal, and spiritual destinations including Varanasi and Rishikesh",
    highlights: [
      "Taj Mahal, Agra",
      "Golden Temple, Amritsar",
      "Varanasi Ghats",
      "Himalayan Treks",
      "Delhi's Historic Sites",
      "Rishikesh & Haridwar",
    ],
    climate: "Varied from tropical in plains to alpine in mountains. Best visited October to March.",
  },
  "south-india": {
    name: "Southern India",
    description: "Known for tropical beaches, lush backwaters, ancient temples, and rich cultural heritage spanning Tamil Nadu, Kerala, Karnataka, and beyond",
    highlights: [
      "Kerala Backwaters",
      "Hampi Ruins",
      "Goa Beaches",
      "Tamil Nadu Temples",
      "Coorg Hill Stations",
      "Mysore Palace",
    ],
    climate: "Tropical climate with monsoons. Pleasant weather from October to March.",
  },
  "east-india": {
    name: "Eastern India",
    description: "Features tea gardens of Darjeeling, wildlife sanctuaries, ancient Buddhist sites, and the vibrant culture of Bengal and Odisha",
    highlights: [
      "Darjeeling Tea Gardens",
      "Sundarbans National Park",
      "Kolkata Heritage",
      "Kaziranga Wildlife",
      "Konark Sun Temple",
      "Sikkim Monasteries",
    ],
    climate: "Humid subtropical with heavy monsoons. Best time: October to April.",
  },
  "west-india": {
    name: "Western India",
    description: "Desert landscapes of Rajasthan, royal palaces, vibrant cities like Mumbai, and the stunning beaches of Goa and Gujarat",
    highlights: [
      "Jaipur City Palace",
      "Udaipur Lakes",
      "Mumbai Skyline",
      "Gir Forest Lions",
      "Ajanta & Ellora Caves",
      "Rann of Kutch",
    ],
    climate: "Arid in desert regions, tropical on coast. Visit between November and February.",
  },
};

const RegionPage = () => {
  const { region } = useParams<{ region: string }>();
  const data = region ? regionData[region as keyof typeof regionData] : null;

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-2xl text-muted-foreground">Region not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                {data.name}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {data.description}
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              <Card className="border-border/50 bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Top Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 animate-in fade-in slide-in-from-left-4"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full mt-2"></div>
                        <p className="text-foreground/80">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-card">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-primary mb-4">Climate & Best Time</h2>
                  <p className="text-foreground/80">{data.climate}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RegionPage;
