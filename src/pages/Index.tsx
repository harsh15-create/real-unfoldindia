import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-terracotta selection:text-white">
      <Hero />
      <Features />
      <About />
    </div>
  );
};

export default Index;
