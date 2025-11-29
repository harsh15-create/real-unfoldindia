import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-taj-mahal.jpg";
import indiaMap from "@/assets/india-map-bg.png";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] w-full overflow-hidden">
      {/* India Map Background */}
      <div 
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url(${indiaMap})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="container relative z-10 flex flex-col items-center justify-center px-4 py-16 md:py-24 text-center">
        <div className="max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            <span className="text-primary">Discover</span>{" "}
            <span className="text-secondary">India</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Explore the land of diverse cultures, ancient heritage, and breathtaking landscapes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/destinations">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Destinations
              </Button>
            </Link>
            <Link to="/guides">
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
                Plan Your Trip
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="mt-12 w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <img 
            src={heroImage} 
            alt="Taj Mahal at sunrise" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};
