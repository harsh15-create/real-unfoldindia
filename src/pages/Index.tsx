import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-terracotta selection:text-white">
      <Hero />
      <Features />
      <Testimonials />
      <About />
    </div>
  );
};

export default Index;
