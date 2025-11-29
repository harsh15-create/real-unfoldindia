import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { RegionCards } from "@/components/RegionCards";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { TravelInfo } from "@/components/TravelInfo";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <RegionCards />
        <FeaturedDestinations />
        <TravelInfo />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
